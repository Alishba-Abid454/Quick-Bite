/**
 * Menu Routes
 * All menu item related endpoints
 */

const express = require('express');
const router = express.Router();
const {
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
  getPopularItems,
  getItemsByCategory,
} = require('../controllers/menuController');
const { protect, authorize, isRestaurantOwner } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const {
  createMenuItemSchema,
  updateMenuItemSchema,
} = require('../validators/restaurantValidator');

// Public Routes

/**
 * @route   GET /api/menu/popular
 * @desc    Get popular menu items
 * @access  Public
 */
router.get('/popular', getPopularItems);

/**
 * @route   GET /api/menu/category/:category
 * @desc    Get menu items by category
 * @access  Public
 */
router.get('/category/:category', getItemsByCategory);

/**
 * @route   GET /api/menu/:id
 * @desc    Get menu item by ID
 * @access  Public
 */
router.get('/:id', getMenuItemById);

// Protected Routes (Admin/Restaurant Owner)

/**
 * @route   POST /api/menu
 * @desc    Create new menu item
 * @access  Private (Admin/Restaurant Owner)
 */
router.post(
  '/',
  protect,
  authorize('admin', 'restaurant_owner'),
  validate(createMenuItemSchema),
  createMenuItem
);

/**
 * @route   PUT /api/menu/:id
 * @desc    Update menu item
 * @access  Private (Admin/Restaurant Owner)
 */
router.put(
  '/:id',
  protect,
  authorize('admin', 'restaurant_owner'),
  validate(updateMenuItemSchema),
  isRestaurantOwner,
  updateMenuItem
);

/**
 * @route   DELETE /api/menu/:id
 * @desc    Delete menu item
 * @access  Private (Admin/Restaurant Owner)
 */
router.delete(
  '/:id',
  protect,
  authorize('admin', 'restaurant_owner'),
  isRestaurantOwner,
  deleteMenuItem
);

/**
 * @route   PATCH /api/menu/:id/toggle-availability
 * @desc    Toggle menu item availability
 * @access  Private (Admin/Restaurant Owner)
 */
router.patch(
  '/:id/toggle-availability',
  protect,
  authorize('admin', 'restaurant_owner'),
  isRestaurantOwner,
  toggleAvailability
);

module.exports = router;