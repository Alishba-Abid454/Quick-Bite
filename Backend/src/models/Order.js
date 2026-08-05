/**
 * Order Model
 * Stores complete order information with status tracking
 * This is the MOST COMPLEX model in the application
 */

const mongoose = require('mongoose');
const {
  ORDER_STATUS,
  ORDER_STATUS_TRANSITIONS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
} = require('../utils/constants');

// Order Item Sub-Schema
const OrderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 50,
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
  options: [{
    name: String,
    price: Number,
  }],
  addOns: [{
    name: String,
    price: Number,
  }],
  specialInstructions: {
    type: String,
    trim: true,
    maxlength: 200,
  },
});

// Main Order Schema
const OrderSchema = new mongoose.Schema({
  // ===== Order Identifier =====
  orderId: {
    type: String,
    unique: true,
    required: true,
  },

  // ===== References =====
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
    index: true,
  },

  // ===== Order Items =====
  items: [OrderItemSchema],

  // ===== Price Breakdown =====
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
  deliveryFee: {
    type: Number,
    required: true,
    min: 0,
  },
  tax: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  couponCode: {
    type: String,
    trim: true,
  },
  couponDiscount: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  // ===== Delivery Info =====
  deliveryAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  deliveryPhone: {
    type: String,
    required: true,
  },
  deliveryInstructions: {
    type: String,
    trim: true,
    maxlength: 200,
  },

  // ===== Payment =====
  paymentMethod: {
    type: String,
    enum: Object.values(PAYMENT_METHODS),
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: Object.values(PAYMENT_STATUS),
    default: PAYMENT_STATUS.PENDING,
  },
  paymentId: {
    type: String,
    trim: true,
  },
  paymentDetails: {
    type: mongoose.Schema.Types.Mixed,
  },

  // ===== Order Status =====
  status: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.PENDING,
    index: true,
  },

  // ===== Status Timestamps =====
  confirmedAt: {
    type: Date,
  },
  preparingAt: {
    type: Date,
  },
  readyAt: {
    type: Date,
  },
  outForDeliveryAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
  cancelledAt: {
    type: Date,
  },
  declinedAt: {
    type: Date,
  },

  // ===== Estimated Times =====
  estimatedPreparationTime: {
    type: Number, // minutes
  },
  estimatedDeliveryTime: {
    type: Date,
  },
  actualDeliveryTime: {
    type: Date,
  },

  // ===== Delivery Person =====
  deliveryPersonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  deliveryPersonName: {
    type: String,
    trim: true,
  },
  deliveryPersonPhone: {
    type: String,
    trim: true,
  },
  deliveryPersonVehicle: {
    type: String,
    trim: true,
  },
  deliveryAssignedAt: {
    type: Date,
  },

  // ===== Customer Notes =====
  notes: {
    type: String,
    trim: true,
    maxlength: 200,
  },

  // ===== Review =====
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  reviewedAt: {
    type: Date,
  },

  // ===== System Info =====
  source: {
    type: String,
    enum: ['web', 'mobile', 'admin'],
    default: 'web',
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },

  // ===== Cancellation =====
  cancelledBy: {
    type: String,
    enum: ['user', 'restaurant', 'admin', 'system'],
  },
  cancellationReason: {
    type: String,
    trim: true,
  },

}, {
  timestamps: true,
});

// Indexes for Faster Queries
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ restaurantId: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ deliveryPersonId: 1, status: 1 });
OrderSchema.index({ createdAt: -1 });

// Compound Indexes
OrderSchema.index({ userId: 1, status: 1 });
OrderSchema.index({ restaurantId: 1, status: 1 });

// Pre-Save Middleware

// Calculate subtotal for each item before saving
OrderSchema.pre('save', function () {
  if (this.isModified('items')) {
    this.items.forEach((item) => {
      item.subtotal = item.price * item.quantity;
    });
  }
});

/**
 * Update order status with automatic timestamp
 */
OrderSchema.methods.updateStatus = async function (newStatus, data = {}) {
  if (this.status === newStatus) {
    throw new Error(`Order is already ${newStatus}`);
}
  // Validate status transition
  if (!ORDER_STATUS_TRANSITIONS[this.status]) {
    throw new Error(`Invalid current status: ${this.status}`);
  }

  if (!ORDER_STATUS_TRANSITIONS[this.status].includes(newStatus)) {
    throw new Error(
      `Cannot transition from ${this.status} to ${newStatus}`
    );
  }

  // Update status
  this.status = newStatus;

  // Set timestamp based on new status
  const statusTimestampMap = {
    confirmed: 'confirmedAt',
    preparing: 'preparingAt',
    ready: 'readyAt',
    out_for_delivery: 'outForDeliveryAt',
    delivered: 'deliveredAt',
    cancelled: 'cancelledAt',
  };

  if (statusTimestampMap[newStatus]) {
    this[statusTimestampMap[newStatus]] = new Date();
  }

  // Handle delivery person assignment
  if (newStatus === 'out_for_delivery' && data.deliveryPersonId) {
    this.deliveryPersonId = data.deliveryPersonId;
    this.deliveryPersonName = data.deliveryPersonName;
    this.deliveryPersonPhone = data.deliveryPersonPhone;
    this.deliveryPersonVehicle = data.deliveryPersonVehicle;
    this.deliveryAssignedAt = new Date();
  }

  // Handle cancellation reason
  if (newStatus === 'cancelled' && data.reason) {
    this.cancelledBy = data.cancelledBy || 'user';
    this.cancellationReason = data.reason;
  }

  // Handle delivery time
  if (newStatus === 'delivered') {
    this.actualDeliveryTime = new Date();
  }

  await this.save();
  return this;
};

/**
 * Check if order can be cancelled
 */
OrderSchema.methods.canBeCancelled = function () {
  const cancellableStatuses = [ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED, ORDER_STATUS.PREPARING ];
  return cancellableStatuses.includes(this.status);
};

/**
 * Check if order can be modified (before confirmation)
 */
OrderSchema.methods.canBeModified = function () {
  return this.status === ORDER_STATUS.PENDING;
};

/**
 * Get estimated delivery time
 */
OrderSchema.methods.getEstimatedDeliveryTime = function () {
  if (this.estimatedDeliveryTime) {
    return this.estimatedDeliveryTime;
  }

  // Calculate based on preparation time + delivery time
  if (this.estimatedPreparationTime) {
    const now = new Date();
    const estimated = new Date(now.getTime() + this.estimatedPreparationTime * 60000);
    return estimated;
  }

  return null;
};

/**
 * Check if order is complete (delivered or cancelled)
 */
OrderSchema.methods.isComplete = function () {
  return [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED].includes(this.status);
};

/**
 * Get formatted order timeline
 */
OrderSchema.methods.getTimeline = function () {
  const timeline = [];

  const statusMap = {
    pending: { label: 'Order Placed', date: this.createdAt, icon: '📝' },
    confirmed: { label: 'Order Confirmed', date: this.confirmedAt, icon: '✅' },
    preparing: { label: 'Preparing Your Food', date: this.preparingAt, icon: '👨‍🍳' },
    ready: { label: 'Food is Ready', date: this.readyAt, icon: '🍽️' },
    out_for_delivery: { label: 'Out for Delivery', date: this.outForDeliveryAt, icon: '🚴' },
    delivered: { label: 'Delivered', date: this.deliveredAt, icon: '📦' },
    cancelled: { label: 'Cancelled', date: this.cancelledAt, icon: '❌' },
  };

  for (const [status, info] of Object.entries(statusMap)) {
    if (info.date) {
      timeline.push({
        status,
        label: info.label,
        date: info.date,
        icon: info.icon,
        isActive: this.status === status,
        isCompleted: this.status !== status && info.date,
      });
    }
  }

  return timeline;
};

/**
 * Generate unique order ID
 */
OrderSchema.statics.generateOrderId = function () {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `ORD-${timestamp}${random}`;
};

/**
 * Get orders with filters for user
 */
OrderSchema.statics.getUserOrders = async function (userId, filters = {}, page = 1, limit = 10) {
  const query = { userId };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.startDate) {
    query.createdAt = { $gte: new Date(filters.startDate) };
  }

  if (filters.endDate) {
    query.createdAt = { ...query.createdAt, $lte: new Date(filters.endDate) };
  }

  const sort = { createdAt: -1 };
  if (filters.sortBy === 'total') {
    sort.totalPrice = -1;
  }

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    this.find(query)
      .populate('restaurantId', 'name image')
      .populate('items.menuItemId', 'name image')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)),
    this.countDocuments(query),
  ]);

  return {
    orders,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get restaurant orders (for restaurant owner)
 */
OrderSchema.statics.getRestaurantOrders = async function (restaurantId, filters = {}, page = 1, limit = 20) {
  const query = { restaurantId };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.startDate) {
    query.createdAt = { $gte: new Date(filters.startDate) };
  }

  if (filters.endDate) {
    query.createdAt = { ...query.createdAt, $lte: new Date(filters.endDate) };
  }

  const sort = { createdAt: -1 };
  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    this.find(query)
      .populate('userId', 'name email phone')
      .populate('items.menuItemId', 'name image')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)),
    this.countDocuments(query),
  ]);

  return {
    orders,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get order statistics for dashboard
 */
OrderSchema.statics.getOrderStats = async function (restaurantId = null) {
  const match = {};
  if (restaurantId) {
    match.restaurantId = new mongoose.Types.ObjectId(restaurantId);
  }

  const stats = await this.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$totalPrice' },
        averageOrderValue: { $avg: '$totalPrice' },
        completedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] },
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] },
        },
        pendingOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
        },
        preparingOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'preparing'] }, 1, 0] },
        },
        outForDeliveryOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'out_for_delivery'] }, 1, 0] },
        },
      },
    },
  ]);

  return stats[0] || {
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    pendingOrders: 0,
    preparingOrders: 0,
    outForDeliveryOrders: 0,
  };
};

/**
 * Get all orders (Admin)
 */
OrderSchema.statics.getAllOrders = async function (
  filters = {},
  page = 1,
  limit = 20
) {
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.startDate) {
    query.createdAt = { $gte: new Date(filters.startDate) };
  }

  if (filters.endDate) {
    query.createdAt = {
      ...query.createdAt,
      $lte: new Date(filters.endDate),
    };
  }

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    this.find(query)
      .populate("userId", "name email")
      .populate("restaurantId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    this.countDocuments(query),
  ]);

  return {
    orders,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = mongoose.model('Order', OrderSchema);