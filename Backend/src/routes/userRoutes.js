/**
 * User Routes
 * User management endpoints (Admin only)
 */

const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserOrders,
  getUserStats,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { validate, validatePagination } = require('../middleware/validationMiddleware');
const {
  updateProfileSchema,
} = require('../validators/authValidator');

// ============================================

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin only)
 * @access  Private (Admin)
 */
router.get(
  '/',
  protect,
  validatePagination,
  getAllUsers
);

/**
 * @route   GET /api/users/stats
 * @desc    Get user statistics (Admin only)
 * @access  Private (Admin)
 */
router.get(
  '/stats',
  protect,
  authorize('admin'),
  getUserStats
);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID (Admin only)
 * @access  Private (Admin)
 */
router.get(
  '/:id',
  protect,
  authorize('admin'),
  getUserById
);

/**
 * @route   GET /api/users/:id/orders
 * @desc    Get user's orders (Admin only)
 * @access  Private (Admin)
 */
router.get(
  '/:id/orders',
  protect,
  authorize('admin'),
  validatePagination,
  getUserOrders
);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user (Admin only)
 * @access  Private (Admin)
 */
router.put(
  '/:id',
  protect,
  authorize('admin'),
  validate(updateProfileSchema),
  updateUser
);

/**
 * @route   PATCH /api/users/:id/toggle-status
 * @desc    Toggle user active status (Admin only)
 * @access  Private (Admin)
 */
router.patch(
  '/:id/toggle-status',
  protect,
  authorize('admin'),
  toggleUserStatus
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user (Admin only)
 * @access  Private (Admin)
 */
router.delete(
  '/:id',
  protect,
  authorize('admin'),
  deleteUser
);

module.exports = router;