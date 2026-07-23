/**
 * Menu Controller
 * Handles menu item operations
 */

const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { HTTP_STATUS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Get menu item by ID
 * @route   GET /api/menu/:id
 * @access  Public
 */
const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findById(id)
      .populate('restaurantId', 'name image rating');

    if (!menuItem) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Menu item not found');
    }

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { menuItem },
      'Menu item fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new menu item
 * @route   POST /api/menu
 * @access  Private (Admin/Restaurant Owner)
 */
const createMenuItem = async (req, res, next) => {
  try {
    const { restaurantId, ...itemData } = req.body;
    const userId = req.user._id;
    const role = req.user.role;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    // Check authorization
    if (role !== 'admin' && restaurant.createdBy.toString() !== userId.toString()) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not own this restaurant');
    }

    // Check if item already exists with same name
    const existingItem = await MenuItem.findOne({
      restaurantId,
      name: { $regex: new RegExp(`^${itemData.name}$`, 'i') },
    });
    if (existingItem) {
      throw new ApiError(HTTP_STATUS.CONFLICT, 'Item with this name already exists in this restaurant');
    }

    // Create menu item
    const menuItem = await MenuItem.create({
      ...itemData,
      restaurantId,
    });

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      { menuItem },
      'Menu item created successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update menu item
 * @route   PUT /api/menu/:id
 * @access  Private (Admin/Restaurant Owner)
 */
const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const role = req.user.role;
    const updates = req.body;

    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Menu item not found');
    }

    // Check restaurant ownership
    const restaurant = await Restaurant.findById(menuItem.restaurantId);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    if (role !== 'admin' && restaurant.createdBy.toString() !== userId.toString()) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not own this restaurant');
    }

    // Update fields
    const allowedUpdates = [
      'name', 'description', 'price', 'originalPrice', 
      'image', 'category', 'subCategory', 'isVeg', 'isVegan',
      'isGlutenFree', 'hasNuts', 'calories', 'allergens',
      'available', 'preparationTime', 'isPopular', 'isRecommended',
      'isNew', 'stock', 'options', 'addOns'
    ];

    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        menuItem[field] = updates[field];
      }
    });

    await menuItem.save();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { menuItem },
      'Menu item updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete menu item
 * @route   DELETE /api/menu/:id
 * @access  Private (Admin/Restaurant Owner)
 */
const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const role = req.user.role;

    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Menu item not found');
    }

    // Check restaurant ownership
    const restaurant = await Restaurant.findById(menuItem.restaurantId);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    if (role !== 'admin' && restaurant.createdBy.toString() !== userId.toString()) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not own this restaurant');
    }

    await menuItem.deleteOne();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      null,
      'Menu item deleted successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle menu item availability
 * @route   PATCH /api/menu/:id/toggle-availability
 * @access  Private (Admin/Restaurant Owner)
 */
const toggleAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const role = req.user.role;

    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Menu item not found');
    }

    // Check restaurant ownership
    const restaurant = await Restaurant.findById(menuItem.restaurantId);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    if (role !== 'admin' && restaurant.createdBy.toString() !== userId.toString()) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not own this restaurant');
    }

    // Toggle availability
    menuItem.available = !menuItem.available;
    await menuItem.save();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { 
        menuItem,
        isAvailable: menuItem.available 
      },
      `Menu item ${menuItem.available ? 'activated' : 'deactivated'} successfully`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get popular menu items
 * @route   GET /api/menu/popular
 * @access  Public
 */
const getPopularItems = async (req, res, next) => {
  try {
    const { limit = 10, restaurantId } = req.query;

    const query = { isPopular: true, available: true };
    if (restaurantId) {
      query.restaurantId = restaurantId;
    }

    const items = await MenuItem.find(query)
      .populate('restaurantId', 'name image rating')
      .sort({ totalOrders: -1 })
      .limit(parseInt(limit));

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { items },
      'Popular items fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get menu items by category
 * @route   GET /api/menu/category/:category
 * @access  Public
 */
const getItemsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { restaurantId, limit = 20, page = 1 } = req.query;

    const query = { category, available: true };
    if (restaurantId) {
      query.restaurantId = restaurantId;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [items, total] = await Promise.all([
      MenuItem.find(query)
        .populate('restaurantId', 'name image rating')
        .sort({ isPopular: -1, price: 1 })
        .skip(skip)
        .limit(parseInt(limit)),
      MenuItem.countDocuments(query),
    ]);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      {
        category,
        items,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
      'Items by category fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
  getPopularItems,
  getItemsByCategory,
};