/**
 * Review Routes
 * All review related endpoints
 */

const express = require('express');
const router = express.Router();
const {
  submitReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getRestaurantReviews,
  markHelpful,
  unmarkHelpful,
  getReviewStats,
} = require('../controllers/reviewController');
const { protect, authorize, canAccessOrder } = require('../middleware/authMiddleware');
const { validate, validatePagination } = require('../middleware/validationMiddleware');
const {
  submitReviewSchema,
  updateReviewSchema,
  reviewIdParamSchema,
  restaurantIdParamSchema,
} = require('../validators/reviewValidator');

// Public Routes

/**
 * @route   GET /api/reviews/restaurant/:restaurantId
 * @desc    Get reviews for a restaurant
 * @access  Public
 */
router.get(
  '/restaurant/:restaurantId',
  validate(restaurantIdParamSchema, 'params'),
  validatePagination,
  getRestaurantReviews
);

/**
 * @route   GET /api/reviews/stats/:restaurantId
 * @desc    Get review statistics for a restaurant
 * @access  Public
 */
router.get(
  '/stats/:restaurantId',
  validate(restaurantIdParamSchema, 'params'),
  getReviewStats
);

/**
 * @route   GET /api/reviews/:id
 * @desc    Get review by ID
 * @access  Public
 */
router.get(
  '/:id',
  validate(reviewIdParamSchema, 'params'),
  getReviewById
);

// Protected Routes

/**
 * @route   POST /api/reviews
 * @desc    Submit a review for an order
 * @access  Private (Customer)
 */
router.post(
  '/',
  protect,
  validate(submitReviewSchema),
  submitReview
);

/**
 * @route   GET /api/reviews
 * @desc    Get all reviews by current user
 * @access  Private
 */
router.get(
  '/',
  protect,
  validatePagination,
  getReviews
);

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update review
 * @access  Private (Customer)
 */
router.put(
  '/:id',
  protect,
  validate(reviewIdParamSchema, 'params'),
  validate(updateReviewSchema),
  updateReview
);

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Delete review
 * @access  Private (Customer/Admin)
 */
router.delete(
  '/:id',
  protect,
  validate(reviewIdParamSchema, 'params'),
  deleteReview
);

/**
 * @route   POST /api/reviews/:id/helpful
 * @desc    Mark review as helpful
 * @access  Private
 */
router.post(
  '/:id/helpful',
  protect,
  validate(reviewIdParamSchema, 'params'),
  markHelpful
);

/**
 * @route   DELETE /api/reviews/:id/helpful
 * @desc    Remove helpful mark from review
 * @access  Private
 */
router.delete(
  '/:id/helpful',
  protect,
  validate(reviewIdParamSchema, 'params'),
  unmarkHelpful
);

module.exports = router;