/**
 * Restaurant Controller
 * Handles restaurant operations
 */

const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const { successResponse, errorResponse, paginatedResponse } = require('../helpers/responseHelper');
const { HTTP_STATUS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Get all restaurants with filters
 * @route   GET /api/restaurants
 * @access  Public
 */
const getAllRestaurants = async (req, res, next) => {
  try {
    const { 
      search, cuisine, city, isOpen, minRating, 
      lat, lng, radius, sortBy,
      page = 1, limit = 10 
    } = req.query;

    const filters = {
      search,
      cuisine,
      city,
      isOpen: isOpen !== undefined ? isOpen === 'true' : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
      radius: radius ? parseFloat(radius) : undefined,
      sortBy,
    };

    const result = await Restaurant.getFilteredRestaurants(filters, page, limit);

    return paginatedResponse(
      res,
      result.restaurants,
      result.pagination.page,
      result.pagination.limit,
      result.pagination.total,
      'Restaurants fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get restaurant by ID
 * @route   GET /api/restaurants/:id
 * @access  Public
 */
const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id)
      .populate('createdBy', 'name email phone');

    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    // Check if restaurant is currently open
    const isCurrentlyOpen = restaurant.isCurrentlyOpen();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { 
        restaurant,
        isCurrentlyOpen,
        operatingHours: {
          openTime: restaurant.openTime,
          closeTime: restaurant.closeTime,
          is24Hours: restaurant.is24Hours,
          operatingDays: restaurant.operatingDays,
        }
      },
      'Restaurant fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new restaurant
 * @route   POST /api/restaurants
 * @access  Private (Admin/Restaurant Owner)
 */
const createRestaurant = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const restaurantData = req.body;

    // Check if restaurant already exists
    const existingRestaurant = await Restaurant.findOne({ 
      email: restaurantData.email 
    });
    if (existingRestaurant) {
      throw new ApiError(HTTP_STATUS.CONFLICT, 'Restaurant with this email already exists');
    }

    // Create restaurant
    const restaurant = await Restaurant.create({
      ...restaurantData,
      createdBy: userId,
    });

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      { restaurant },
      'Restaurant created successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update restaurant
 * @route   PUT /api/restaurants/:id
 * @access  Private (Admin/Restaurant Owner)
 */
const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const role = req.user.role;
    const updates = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    // Check authorization
    if (role !== 'admin' && restaurant.createdBy.toString() !== userId.toString()) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not own this restaurant');
    }

    // Update fields
    const allowedUpdates = [
      'name', 'email', 'phone', 'address', 'city', 'coordinates',
      'image', 'coverImage', 'cuisineType', 'categories',
      'deliveryTime', 'deliveryFee', 'minOrderAmount', 'freeDeliveryAbove',
      'isOpen', 'openTime', 'closeTime', 'is24Hours', 'operatingDays',
      'isActive', 'isFeatured'
    ];

    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        restaurant[field] = updates[field];
      }
    });

    await restaurant.save();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { restaurant },
      'Restaurant updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete restaurant
 * @route   DELETE /api/restaurants/:id
 * @access  Private (Admin only)
 */
const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = req.user.role;

    if (role !== 'admin') {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Only admin can delete restaurants');
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    // Delete all menu items
    await MenuItem.deleteMany({ restaurantId: id });

    // Delete restaurant
    await restaurant.deleteOne();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      null,
      'Restaurant deleted successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get restaurant menu with categories
 * @route   GET /api/restaurants/:id/menu
 * @access  Public
 */
const getRestaurantMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      category, isVeg, isPopular, search, 
      minPrice, maxPrice, sortBy, sortOrder,
      page = 1, limit = 20 
    } = req.query;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    const filters = {
      category,
      isVeg: isVeg !== undefined ? isVeg === 'true' : undefined,
      isPopular: isPopular !== undefined ? isPopular === 'true' : undefined,
      search,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy,
      sortOrder: sortOrder || 'asc',
    };

    const result = await MenuItem.getRestaurantMenu(id, filters, page, limit);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      {
        restaurant: {
          id: restaurant._id,
          name: restaurant.name,
          image: restaurant.image,
        },
        categories: result.categories,
        pagination: result.pagination,
      },
      'Menu fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get restaurant reviews
 * @route   GET /api/restaurants/:id/reviews
 * @access  Public
 */
const getRestaurantReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, hasComment, sortBy, page = 1, limit = 10 } = req.query;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    const Review = require('../models/Review');
    const filters = {
      rating: rating ? parseFloat(rating) : undefined,
      hasComment: hasComment !== undefined ? hasComment === 'true' : undefined,
      sortBy,
    };

    const result = await Review.getRestaurantReviews(id, filters, page, limit);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      {
        restaurant: {
          id: restaurant._id,
          name: restaurant.name,
          rating: restaurant.rating,
          totalReviews: restaurant.totalReviews,
        },
        summary: result.summary,
        reviews: result.reviews,
        pagination: result.pagination,
      },
      'Reviews fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantMenu,
  getRestaurantReviews,
};