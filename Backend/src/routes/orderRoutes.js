/**
 * Order Routes
 * All order related endpoints
 */

const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getRestaurantOrders,
  getOrderStats,
} = require('../controllers/orderController');
const { protect, authorize, canAccessOrder, isRestaurantOwner } = require('../middleware/authMiddleware');
const { validate, validatePagination } = require('../middleware/validationMiddleware');
const {
  placeOrderSchema,
  updateOrderStatusSchema,
  getOrdersQuerySchema,
  cancelOrderSchema,
  orderIdParamSchema,
} = require('../validators/orderValidator');

// All Order Routes are Protected

/**
 * @route   POST /api/orders
 * @desc    Place a new order
 * @access  Private (Customer)
 */
router.post(        // Access Customer
  '/',                           
  protect,
  validate(placeOrderSchema),
  placeOrder
);

/**
 * @route   GET /api/orders
 * @desc    Get all orders for current user
 * @access  Private (Customer)
 */
router.get(   // Access Customer
  '/',
  protect,
  validate(getOrdersQuerySchema, 'query'),
  validatePagination,
  getOrders
);

/**
 * @route   GET /api/orders/stats
 * @desc    Get order statistics
 * @access  Private (Admin/Restaurant Owner)
 */
router.get(
  '/stats',
  protect,
  authorize('admin', 'restaurant_owner'),
  getOrderStats
);

/**
 * @route   GET /api/orders/restaurant/:restaurantId
 * @desc    Get orders for a specific restaurant
 * @access  Private (Restaurant Owner)
 */
router.get(
  '/restaurant/:restaurantId',
  protect,
  isRestaurantOwner,
  validatePagination,
  getRestaurantOrders
);

/**
 * @route   GET /api/orders/:orderId
 * @desc    Get order by ID
 * @access  Private (Customer/Owner/Admin)
 */
router.get(
  '/:orderId',
  protect,
  canAccessOrder,
  getOrderById
);

/**
 * @route   PUT /api/orders/:orderId/status
 * @desc    Update order status
 * @access  Private (Admin/Restaurant Owner)
 */
router.put(
  '/:orderId/status',
  protect,
  authorize('admin', 'restaurant_owner'),
  validate(updateOrderStatusSchema),
  canAccessOrder,
  updateOrderStatus
);

/**
 * @route   DELETE /api/orders/:orderId
 * @desc    Cancel order
 * @access  Private (Customer/Admin)
 */
router.delete(
  '/:orderId',
  protect,
  validate(cancelOrderSchema),
  canAccessOrder,
  cancelOrder
);

module.exports = router;