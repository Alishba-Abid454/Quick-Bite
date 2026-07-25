/**
 * Review Model
 * Stores customer reviews and ratings for restaurants
 */

const mongoose = require('mongoose');

// Review Schema
const ReviewSchema = new mongoose.Schema({
  // ===== References =====
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    unique: true, // One review per order
    index: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  // ===== User Info (denormalized for quick display) =====
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  userImage: {
    type: String,
    default: 'https://via.placeholder.com/50x50',
  },

  // ===== Ratings (1-5 stars) =====
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  foodQuality: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  deliverySpeed: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  packaging: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  valueForMoney: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  // ===== Review Text =====
  comment: {
    type: String,
    trim: true,
    maxlength: 500,
  },

  // ===== Images =====
  images: [{
    type: String,
  }],

  // ===== Response from Restaurant =====
  restaurantReply: {
    comment: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    repliedAt: {
      type: Date,
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  // ===== Status =====
  isVerified: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: true,
  },

  // ===== Helpful Votes =====
  helpfulCount: {
    type: Number,
    default: 0,
  },
  helpfulUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

}, {
  timestamps: true,
});

// Indexes for Faster Queries
ReviewSchema.index({ restaurantId: 1, createdAt: -1 });
ReviewSchema.index({ restaurantId: 1, rating: -1 });
ReviewSchema.index({ userId: 1, createdAt: -1 });

// Compound Indexes
ReviewSchema.index({ restaurantId: 1, isApproved: 1 });

// Pre-Save Middleware

// Auto-calculate average rating if all sub-ratings exist
ReviewSchema.pre('save', function () {
  if (
    this.isModified('foodQuality') ||
    this.isModified('deliverySpeed') ||
    this.isModified('packaging') ||
    this.isModified('valueForMoney')
  ) {
    const total =
      this.foodQuality +
      this.deliverySpeed +
      this.packaging +
      this.valueForMoney;

    this.rating = Math.round((total / 4) * 10) / 10;
  }
});

// Post-Save Middleware

// Update restaurant rating after review is saved
ReviewSchema.post('save', async function () {
  try {
    const Restaurant = mongoose.model('Restaurant');
    await Restaurant.findById(this.restaurantId).then(async (restaurant) => {
      if (restaurant) {
        await restaurant.updateRating();
      }
    });
  } catch (error) {
    console.error('Error updating restaurant rating:', error);
  }
});

// Update restaurant rating after review is removed
ReviewSchema.post('remove', async function () {
  try {
    const Restaurant = mongoose.model('Restaurant');
    await Restaurant.findById(this.restaurantId).then(async (restaurant) => {
      if (restaurant) {
        await restaurant.updateRating();
      }
    });
  } catch (error) {
    console.error('Error updating restaurant rating:', error);
  }
});

// Instance Methods

/**
 * Check if user can edit this review
 */
ReviewSchema.methods.canEdit = function (userId) {
  return this.userId.toString() === userId.toString();
};

/**
 * Check if user can delete this review
 */
ReviewSchema.methods.canDelete = function (userId, isAdmin = false) {
  if (isAdmin) return true;
  return this.userId.toString() === userId.toString();
};

/**
 * Mark review as helpful by a user
 */
ReviewSchema.methods.markHelpful = async function (userId) {
  if (this.helpfulUsers.includes(userId)) {
    throw new Error('User already marked this review as helpful');
  }

  this.helpfulUsers.push(userId);
  this.helpfulCount = this.helpfulUsers.length;
  await this.save();
  return this;
};

/**
 * Remove helpful mark from a user
 */
ReviewSchema.methods.unmarkHelpful = async function (userId) {
  const index = this.helpfulUsers.indexOf(userId);
  if (index === -1) {
    throw new Error('User has not marked this review as helpful');
  }

  this.helpfulUsers.splice(index, 1);
  this.helpfulCount = this.helpfulUsers.length;
  await this.save();
  return this;
};

// Static Methods

/**
 * Get reviews for a restaurant with filters
 */
ReviewSchema.statics.getRestaurantReviews = async function (
  restaurantId,
  filters = {},
  page = 1,
  limit = 10
) {
  const query = { restaurantId, isApproved: true };

  if (filters.rating) {
    query.rating = { $gte: parseFloat(filters.rating) };
  }

  if (filters.hasComment) {
    query.comment = { $ne: '', $exists: true };
  }

  if (filters.startDate) {
    query.createdAt = { $gte: new Date(filters.startDate) };
  }

  if (filters.endDate) {
    query.createdAt = { ...query.createdAt, $lte: new Date(filters.endDate) };
  }

  // Sort
  let sort = { createdAt: -1 };
  if (filters.sortBy === 'rating') {
    sort = { rating: -1 };
  } else if (filters.sortBy === 'helpful') {
    sort = { helpfulCount: -1 };
  } else if (filters.sortBy === 'latest') {
    sort = { createdAt: -1 };
  }

  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    this.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)),
    this.countDocuments(query),
  ]);

  // Calculate rating distribution
  const distribution = await this.aggregate([
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

  // Calculate average ratings by category
  const avgRatings = await this.aggregate([
    { $match: { restaurantId: new mongoose.Types.ObjectId(restaurantId) } },
    {
      $group: {
        _id: null,
        avgFoodQuality: { $avg: '$foodQuality' },
        avgDeliverySpeed: { $avg: '$deliverySpeed' },
        avgPackaging: { $avg: '$packaging' },
        avgValueForMoney: { $avg: '$valueForMoney' },
        avgOverall: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const averages = avgRatings[0] || {
    avgFoodQuality: 0,
    avgDeliverySpeed: 0,
    avgPackaging: 0,
    avgValueForMoney: 0,
    avgOverall: 0,
    totalReviews: 0,
  };

  return {
    reviews,
    summary: {
      averageRating: Math.round(averages.avgOverall * 10) / 10,
      totalReviews: total,
      ratingDistribution,
      averages: {
        foodQuality: Math.round(averages.avgFoodQuality * 10) / 10,
        deliverySpeed: Math.round(averages.avgDeliverySpeed * 10) / 10,
        packaging: Math.round(averages.avgPackaging * 10) / 10,
        valueForMoney: Math.round(averages.avgValueForMoney * 10) / 10,
      },
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get user reviews
 */
ReviewSchema.statics.getUserReviews = async function (userId, page = 1, limit = 10) {
  const query = { userId };

  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    this.find(query)
      .populate('restaurantId', 'name image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    this.countDocuments(query),
  ]);

  return {
    reviews,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = mongoose.model('Review', ReviewSchema);