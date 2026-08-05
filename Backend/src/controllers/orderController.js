/**
 * Order Controller
 * Handles all order-related operations
 */

const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { processOrder, canCancelOrder, getOrderTimeline } = require('../services/orderService');
const { successResponse, errorResponse, paginatedResponse } = require('../helpers/responseHelper');
const { HTTP_STATUS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');
const MenuItem = require('../models/MenuItem');

/**
 * @desc    Place a new order
 * @route   POST /api/orders
 * @access  Private
 */
const placeOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orderData = req.body;

    // Process order through service
    const order = await processOrder(orderData, userId);

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      { order },
      'Order placed successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all orders for current user
 * @route   GET /api/orders
 * @access  Private
 */
const getOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    const {
      page = 1,
      limit = 10,
      status,
      startDate,
      endDate,
      sortBy,
    } = req.query;

    const filters = {
      status,
      startDate,
      endDate,
      sortBy,
    };

    console.log("Role:", role);

    let result;

    if (role === "admin") {
      result = await Order.getAllOrders(filters, page, limit);
    } else {
      result = await Order.getUserOrders(
        userId,
        filters,
        page,
        limit
      );
    }

    return paginatedResponse(
      res,
      result.orders,
      result.pagination.page,
      result.pagination.limit,
      result.pagination.total,
      "Orders fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:orderId
 * @access  Private
 */
const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;
    const role = req.user.role;

    // Build query based on role
    let query = { _id: orderId };
    
    if (role === 'customer') {
      query.userId = userId;
    } else if (role === 'restaurant_owner') {
      // Find restaurants owned by this user
      const restaurants = await Restaurant.find({ createdBy: userId });
      const restaurantIds = restaurants.map(r => r._id);
      query.restaurantId = { $in: restaurantIds };
    }
    // Admin can see all orders

    const order = await Order.findOne(query)
      .populate('restaurantId', 'name image address phone')
      .populate('userId', 'name email phone')
      .populate('items.menuItemId', 'name image');

    if (!order) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Order not found');
    }

    // Get order timeline
    const timeline = getOrderTimeline(order);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { order, timeline },
      'Order fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:orderId/status
 * @access  Private (Admin/Restaurant Owner)
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status, deliveryPersonId, deliveryPersonName, deliveryPersonPhone, deliveryPersonVehicle, cancellationReason } = req.body;
    const userId = req.user._id;
    const role = req.user.role;

    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Order not found');
    }

    // Check authorization
    if (role === 'restaurant_owner') {
      const restaurant = await Restaurant.findById(order.restaurantId);
      if (!restaurant || restaurant.createdBy.toString() !== userId.toString()) {
        throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not own this restaurant');
      }
    } else if (role !== 'admin') {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You are not authorized to update order status');
    }

    // Prepare update data
    const updateData = {};
    if (status === 'out_for_delivery') {
      updateData.deliveryPersonId = deliveryPersonId;
      updateData.deliveryPersonName = deliveryPersonName;
      updateData.deliveryPersonPhone = deliveryPersonPhone;
      updateData.deliveryPersonVehicle = deliveryPersonVehicle;
    }

    if (status === 'cancelled') {
      updateData.reason = cancellationReason;
      updateData.cancelledBy = role === 'admin' ? 'admin' : 'restaurant';
    }

    if (order.status === status) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            `Order is already ${status}`
        );
    }
    // Update status
    await order.updateStatus(status, updateData);

    // Populate order for response
    const updatedOrder = await Order.findById(order._id)
      .populate('restaurantId', 'name')
      .populate('userId', 'name email phone');

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { order: updatedOrder },
      'Order status updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel order
 * @route   DELETE /api/orders/:orderId
 * @access  Private
 */
const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const userId = req.user._id;
    const role = req.user.role;

    // Find order
    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        'Order not found'
      );
    }

// Already cancelled
if (order.status === 'cancelled') {
    throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        'Order is already cancelled'
    );
}

// Cannot cancel
  if (!canCancelOrder(order, userId, role)) {
      throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          'Order cannot be cancelled at this stage'
      );
  }

    // Update order status
    await order.updateStatus('cancelled', {
      reason: reason || 'Cancelled by user',
      cancelledBy: role === 'admin' ? 'admin' : 'user',
    });

    // Restore menu stock
    for (const item of order.items) {
      const menuItem = await MenuItem.findById(item.menuItemId);

      if (menuItem) {
        menuItem.stock += item.quantity;
        await menuItem.save(); // pre('save') middleware runs
      }
    }

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { order },
      'Order cancelled successfully'
    );

  } catch (error) {
    next(error);
  }
};
/**
 * @desc    Get restaurant orders (for restaurant owner)
 * @route   GET /api/orders/restaurant/:restaurantId
 * @access  Private (Restaurant Owner)
 */
const getRestaurantOrders = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const userId = req.user._id;
    const { page = 1, limit = 20, status, startDate, endDate } = req.query;

    // Verify restaurant ownership
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Restaurant not found');
    }

    if (restaurant.createdBy.toString() !== userId.toString() && req.user.role !== 'admin') {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not own this restaurant');
    }

    const filters = { status, startDate, endDate };
    const result = await Order.getRestaurantOrders(restaurantId, filters, page, limit);

    return paginatedResponse(
      res,
      result.orders,
      result.pagination.page,
      result.pagination.limit,
      result.pagination.total,
      'Restaurant orders fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order statistics
 * @route   GET /api/orders/stats
 * @access  Private (Admin/Restaurant Owner)
 */
const getOrderStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;
    const { restaurantId } = req.query;

    let stats;

    if (role === 'admin') {
      // Admin can see all stats or specific restaurant
      stats = await Order.getOrderStats(restaurantId);
    } else if (role === 'restaurant_owner') {
      // Restaurant owner can only see their own restaurants
      const restaurants = await Restaurant.find({ createdBy: userId });
      const restaurantIds = restaurants.map(r => r._id);
      
      // If specific restaurant requested, check ownership
      if (restaurantId) {
        const restaurant = restaurants.find(r => r._id.toString() === restaurantId);
        if (!restaurant) {
          throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not own this restaurant');
        }
        stats = await Order.getOrderStats(restaurantId);
      } else {
        // Aggregate stats for all restaurants
        let totalStats = {
          totalOrders: 0,
          totalRevenue: 0,
          averageOrderValue: 0,
          completedOrders: 0,
          cancelledOrders: 0,
          pendingOrders: 0,
          preparingOrders: 0,
          outForDeliveryOrders: 0,
        };

        for (const r of restaurantIds) {
          const restaurantStats = await Order.getOrderStats(r);
          totalStats.totalOrders += restaurantStats.totalOrders;
          totalStats.totalRevenue += restaurantStats.totalRevenue;
          totalStats.completedOrders += restaurantStats.completedOrders;
          totalStats.cancelledOrders += restaurantStats.cancelledOrders;
          totalStats.pendingOrders += restaurantStats.pendingOrders;
          totalStats.preparingOrders += restaurantStats.preparingOrders;
          totalStats.outForDeliveryOrders += restaurantStats.outForDeliveryOrders;
        }
        totalStats.averageOrderValue = totalStats.totalOrders > 0 
          ? totalStats.totalRevenue / totalStats.totalOrders 
          : 0;
        stats = totalStats;
      }
    } else {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You are not authorized to view statistics');
    }

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { stats },
      'Order statistics fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getRestaurantOrders,
  getOrderStats,
};