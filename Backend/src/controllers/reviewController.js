/**
 * Review Controller
 * Handles all review operations
 */

const Review = require('../models/Review');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { successResponse, errorResponse, paginatedResponse } = require('../helpers/responseHelper');
const { HTTP_STATUS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Submit a review for an order
 * @route   POST /api/reviews
 * @access  Private
 */
const submitReview = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { orderId, rating, comment, foodQuality, deliverySpeed, packaging, valueForMoney, images } = req.body;

    // Check if order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Order not found');
    }

    if (order.userId.toString() !== userId.toString()) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You can only review your own orders');
    }

    // Check if order is delivered
    if (order.status !== 'delivered') {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'You can only review delivered orders');
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ orderId });
    if (existingReview) {
      throw new ApiError(HTTP_STATUS.CONFLICT, 'You have already reviewed this order');
    }

    // Get user name
    const user = req.user;

    // Create review
    const review = await Review.create({
      orderId,
      restaurantId: order.restaurantId,
      userId,
      userName: user.name,
      userImage: user.profileImage,
      rating,
      comment,
      foodQuality,
      deliverySpeed,
      packaging,
      valueForMoney: valueForMoney || rating,
      images: images || [],
    });

    // Update order with rating and review
    order.rating = rating;
    order.review = comment;
    order.reviewedAt = new Date();
    await order.save();

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      { review },
      'Review submitted successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get reviews by current user
 * @route   GET /api/reviews
 * @access  Private
 */
const getReviews = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const result = await Review.getUserReviews(userId, page, limit);

    return paginatedResponse(
      res,
      result.reviews,
      result.pagination.page,
      result.pagination.limit,
      result.pagination.total,
      'Reviews fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get review by ID
 * @route   GET /api/reviews/:id
 * @access  Public
 */
const getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id)
      .populate('userId', 'name email profileImage')
      .populate('restaurantId', 'name image')
      .populate('orderId', 'orderId items totalPrice');

    if (!review) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Review not found');
    }

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { review },
      'Review fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update review
 * @route   PUT /api/reviews/:id
 * @access  Private
 */
const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { rating, comment, foodQuality, deliverySpeed, packaging, valueForMoney } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Review not found');
    }

    // Check ownership
    if (review.userId.toString() !== userId.toString()) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You can only update your own reviews');
    }

    // Update fields
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    if (foodQuality) review.foodQuality = foodQuality;
    if (deliverySpeed) review.deliverySpeed = deliverySpeed;
    if (packaging) review.packaging = packaging;
    if (valueForMoney) review.valueForMoney = valueForMoney;

    await review.save();

    // Update order rating
    await Order.findByIdAndUpdate(review.orderId, {
      rating: review.rating,
      review: review.comment,
    });

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { review },
      'Review updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete review
 * @route   DELETE /api/reviews/:id
 * @access  Private
 */
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const role = req.user.role;

    const review = await Review.findById(id);
    if (!review) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Review not found');
    }

    // Check ownership (admin can delete any)
    if (role !== 'admin' && review.userId.toString() !== userId.toString()) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You can only delete your own reviews');
    }

    // Remove review
    await review.deleteOne();

    // Remove rating from order
    await Order.findByIdAndUpdate(review.orderId, {
      rating: null,
      review: null,
    });

    return successResponse(
      res,
      HTTP_STATUS.OK,
      null,
      'Review deleted successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get restaurant reviews
 * @route   GET /api/reviews/restaurant/:restaurantId
 * @access  Public
 */
const getRestaurantReviews = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { rating, hasComment, sortBy, page = 1, limit = 10 } = req.query;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    const filters = {
      rating: rating ? parseFloat(rating) : undefined,
      hasComment: hasComment !== undefined ? hasComment === 'true' : undefined,
      sortBy,
    };

    const result = await Review.getRestaurantReviews(restaurantId, filters, page, limit);

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

/**
 * @desc    Mark review as helpful
 * @route   POST /api/reviews/:id/helpful
 * @access  Private
 */
const markHelpful = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(id);
    if (!review) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Review not found');
    }

    // Can't mark your own review as helpful
    if (review.userId.toString() === userId.toString()) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'You cannot mark your own review as helpful');
    }

    await review.markHelpful(userId);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { helpfulCount: review.helpfulCount },
      'Review marked as helpful'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove helpful mark
 * @route   DELETE /api/reviews/:id/helpful
 * @access  Private
 */
const unmarkHelpful = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(id);
    if (!review) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Review not found');
    }

    await review.unmarkHelpful(userId);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { helpfulCount: review.helpfulCount },
      'Helpful mark removed'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get review statistics
 * @route   GET /api/reviews/stats/:restaurantId
 * @access  Public
 */
const getReviewStats = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const stats = await Review.aggregate([
      { $match: { restaurantId: new mongoose.Types.ObjectId(restaurantId) } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          averageFoodQuality: { $avg: '$foodQuality' },
          averageDeliverySpeed: { $avg: '$deliverySpeed' },
          averagePackaging: { $avg: '$packaging' },
          averageValueForMoney: { $avg: '$valueForMoney' },
        },
      },
    ]);

    // Get rating distribution
    const distribution = await Review.aggregate([
      { $match: { restaurantId: new mongoose.Types.ObjectId(restaurantId) } },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const ratingDistribution = {};
    for (let i = 1; i <= 5; i++) {
      const found = distribution.find(d => d._id === i);
      ratingDistribution[i] = found ? found.count : 0;
    }

    const result = stats[0] || {
      totalReviews: 0,
      averageRating: 0,
      averageFoodQuality: 0,
      averageDeliverySpeed: 0,
      averagePackaging: 0,
      averageValueForMoney: 0,
    };

    return successResponse(
      res,
      HTTP_STATUS.OK,
      {
        ...result,
        ratingDistribution,
      },
      'Review statistics fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getRestaurantReviews,
  markHelpful,
  unmarkHelpful,
  getReviewStats,
};