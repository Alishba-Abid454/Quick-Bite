/**
 * Order Service
 * Business logic for order processing, validation, and calculations
 */

const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');
const { APP_CONSTANTS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');

/**
 * Validate order before placement
 * @param {string} restaurantId - Restaurant ID
 * @param {Array} items - Order items
 * @returns {Promise<Object>} - Validated restaurant and items
 */
const validateOrder = async (restaurantId, items) => {
  // 1. Check if restaurant exists and is open
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }

  if (!restaurant.isOpen) {
    throw new ApiError(400, 'Restaurant is currently closed');
  }

  if (!restaurant.isActive) {
    throw new ApiError(400, 'Restaurant is not active');
  }

  // 2. Check if all items exist and are available
  const menuItemIds = items.map(item => item.menuItemId);
  const menuItems = await MenuItem.find({
    _id: { $in: menuItemIds },
    restaurantId,
    available: true,
  });

  if (menuItems.length !== items.length) {
    const foundIds = menuItems.map(item => item._id.toString());
    const missingIds = menuItemIds.filter(id => !foundIds.includes(id));
    throw new ApiError(400, `Some items are not available: ${missingIds.join(', ')}`);
  }

  // 3. Check stock for each item
  for (const item of items) {
    const menuItem = menuItems.find(m => m._id.toString() === item.menuItemId);
    if (menuItem.stock !== undefined && menuItem.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${menuItem.name}. Available: ${menuItem.stock}`);
    }
  }

  return { restaurant, menuItems };
};

/**
 * Calculate order totals
 * @param {Array} items - Order items with quantities
 * @param {Array} menuItems - Menu items with prices
 * @param {Object} restaurant - Restaurant object
 * @param {string} couponCode - Optional coupon code
 * @returns {Object} - Calculated totals
 */
const calculateOrderTotals = (items, menuItems, restaurant, couponCode = null) => {
  let subtotal = 0;
  const enrichedItems = [];

  // Calculate subtotal for each item
  for (const item of items) {
    const menuItem = menuItems.find(m => m._id.toString() === item.menuItemId);
    const itemTotal = menuItem.price * item.quantity;
    subtotal += itemTotal;

    enrichedItems.push({
      menuItemId: menuItem._id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: item.quantity,
      subtotal: itemTotal,
      options: item.options || [],
      addOns: item.addOns || [],
      specialInstructions: item.specialInstructions || '',
    });
  }

  // Calculate tax (10% of subtotal)
  const tax = Math.round(subtotal * APP_CONSTANTS.TAX_RATE);

  // Calculate delivery fee (free if above threshold)
  let deliveryFee = restaurant.deliveryFee || APP_CONSTANTS.DELIVERY_FEE;
  if (restaurant.freeDeliveryAbove && subtotal >= restaurant.freeDeliveryAbove) {
    deliveryFee = 0;
  }

  // Calculate coupon discount (if any)
  let couponDiscount = 0;
  if (couponCode) {
    // This would integrate with a coupon system
    // For now, placeholder logic
    couponDiscount = Math.min(subtotal * 0.10, 200); // Max 10% or Rs.200
  }

  const total = subtotal + tax + deliveryFee - couponDiscount;

  return {
    subtotal,
    tax,
    deliveryFee,
    couponDiscount,
    total: Math.max(total, 0),
    items: enrichedItems,
  };
};

/**
 * Generate unique order ID
 * @returns {string} - Unique order ID
 */
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `ORD-${timestamp}${random}`;
};

/**
 * Create order in database
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} - Created order
 */
const createOrder = async (orderData) => {
  const {
    userId,
    restaurantId,
    items,
    subtotal,
    tax,
    deliveryFee,
    couponDiscount,
    total,
    deliveryAddress,
    deliveryPhone,
    paymentMethod,
    notes,
    couponCode,
  } = orderData;

  // Create order
  const order = await Order.create({
    orderId: generateOrderId(),
    userId,
    restaurantId,
    items,
    subtotal,
    tax,
    deliveryFee,
    discount: couponDiscount,
    couponCode: couponCode || '',
    couponDiscount: couponDiscount || 0,
    totalPrice: total,
    deliveryAddress,
    deliveryPhone,
    paymentMethod,
    notes: notes || '',
    status: 'confirmed',
    confirmedAt: new Date(),
  });

  // Update restaurant statistics
  await Restaurant.findByIdAndUpdate(restaurantId, {
    $inc: { totalOrders: 1 },
  });

  // Update menu item stock
  for (const item of items) {
    await MenuItem.findByIdAndUpdate(item.menuItemId, {
      $inc: { 
        stock: -item.quantity,
        totalOrders: 1,
      },
    });
  }

  return order;
};

/**
 * Process order (complete workflow)
 * @param {Object} data - Order data
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Processed order
 */
const processOrder = async (data, userId) => {
  const { restaurantId, items, deliveryAddress, deliveryPhone, paymentMethod, notes, couponCode } = data;

  // 1. Validate order
  const { restaurant, menuItems } = await validateOrder(restaurantId, items);

  // 2. Check minimum order amount
  const subtotal = items.reduce((sum, item) => {
    const menuItem = menuItems.find(m => m._id.toString() === item.menuItemId);
    return sum + (menuItem.price * item.quantity);
  }, 0);

  if (subtotal < restaurant.minOrderAmount) {
    throw new ApiError(400, `Minimum order amount is Rs. ${restaurant.minOrderAmount}`);
  }

  // 3. Calculate totals
  const totals = calculateOrderTotals(items, menuItems, restaurant, couponCode);

  // 4. Create order
  const order = await createOrder({
    userId,
    restaurantId,
    items: totals.items,
    subtotal: totals.subtotal,
    tax: totals.tax,
    deliveryFee: totals.deliveryFee,
    couponDiscount: totals.couponDiscount,
    total: totals.total,
    deliveryAddress,
    deliveryPhone,
    paymentMethod,
    notes,
    couponCode,
  });

  // 5. Populate order for response
  const populatedOrder = await Order.findById(order._id)
    .populate('restaurantId', 'name image address phone') // exclude all fields except name image address phone 
    .populate('userId', 'name email phone');

  return populatedOrder;
};

/**
 * Check if order can be cancelled
 * @param {Object} order - Order object
 * @param {string} userId - User ID
 * @param {string} role - User role
 * @returns {boolean} - True if cancellable
 */
const canCancelOrder = (order, userId, role) => {
  // Admin can cancel any order
  if (role === 'admin') return true;

  // Only customer can cancel their own order
  if (role === 'customer' && order.userId.toString() !== userId) {
    return false;
  }

  // Check if order is in cancellable status
  return order.canBeCancelled();
};

/**
 * Get order status history
 * @param {Object} order - Order object
 * @returns {Array} - Status timeline
 */
const getOrderTimeline = (order) => {
  const timeline = [];
  
  const statuses = [
    { key: 'createdAt', label: 'Order Placed', icon: '📝' },
    { key: 'confirmedAt', label: 'Order Confirmed', icon: '✅' },
    { key: 'preparingAt', label: 'Preparing Your Food', icon: '👨‍🍳' },
    { key: 'readyAt', label: 'Food is Ready', icon: '🍽️' },
    { key: 'outForDeliveryAt', label: 'Out for Delivery', icon: '🚴' },
    { key: 'deliveredAt', label: 'Delivered', icon: '📦' },
    { key: 'cancelledAt', label: 'Cancelled', icon: '❌' },
  ];

  for (const status of statuses) {
    const date = order[status.key];
    if (date) {
      timeline.push({
        status: status.key.replace('At', ''),
        label: status.label,
        date: date,
        icon: status.icon,
        isActive: order.status === status.key.replace('At', ''),
        isCompleted: date && order.status !== status.key.replace('At', ''),
      });
    }
  }

  return timeline;
};

/**
 * Calculate estimated delivery time
 * @param {Object} order - Order object
 * @param {Object} restaurant - Restaurant object
 * @returns {Date} - Estimated delivery time
 */
const calculateEstimatedDelivery = (order, restaurant) => {
  const now = new Date();
  const prepTime = restaurant.averagePreparationTime || 20;
  const deliveryTime = restaurant.deliveryTime || 30;
  const totalMinutes = prepTime + deliveryTime;
  
  const estimated = new Date(now.getTime() + totalMinutes * 60000);
  return estimated;
};

module.exports = {
  validateOrder,
  calculateOrderTotals,
  generateOrderId,
  createOrder,
  processOrder,
  canCancelOrder,
  getOrderTimeline,
  calculateEstimatedDelivery,
};


/*
┌─────────────────────────────────────────────────────────────────┐
│                    CONTROLLER                                  │
│  orderController.js                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  const createOrder = async (req, res) => {                    │
│    const order = await orderService.processOrder(            │
│      req.body,                                               │
│      req.user.id                                             │
│    );                                                        │
│    res.json(order);                                          │
│  };                                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICE (THIS FILE)                         │
│  orderService.js                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. validateOrder()                                            │
│     - Check restaurant exists and is open                    │
│     - Check items exist and are available                    │
│     - Check stock availability                               │
│                         ↓                                     │
│  2. calculateOrderTotals()                                    │
│     - Calculate subtotal                                     │
│     - Calculate tax (10%)                                    │
│     - Calculate delivery fee                                 │
│     - Apply coupon discount                                  │
│     - Calculate total                                        │
│                         ↓                                     │
│  3. generateOrderId()                                         │
│     - Create unique order ID                                 │
│                         ↓                                     │
│  4. createOrder()                                             │
│     - Save order to database                                 │
│     - Update restaurant statistics                           │
│     - Update menu item stock                                 │
│                         ↓                                     │
│  5. Return populated order                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CONTROLLER                                  │
│  Sends response back to client                                │
└─────────────────────────────────────────────────────────────────┘
*/