/**
 * Restaurant Model
 * Stores restaurant information, ratings, and operating hours
 */

const mongoose = require('mongoose');
const { CUISINE_TYPES } = require('../utils/constants');

// Restaurant Schema
const RestaurantSchema = new mongoose.Schema({
  // ===== Basic Info =====
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },

  // ===== Location =====
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },

  // ===== Images =====
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300',
  },
  coverImage: {
    type: String,
    default: 'https://via.placeholder.com/1200x400',
  },
  images: [{
    type: String,
  }],

  // ===== Ratings =====
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    set: function(value) {
      return Math.round(value * 10) / 10; // Round to 1 decimal
    },
  },
  totalReviews: {
    type: Number,
    default: 0,
  },

  // ===== Cuisine & Menu =====
  cuisineType: [{
    type: String,
    enum: CUISINE_TYPES,
  }],
  categories: [{
    type: String,
    trim: true,
  }],

  // ===== Delivery =====
  deliveryTime: {
    type: Number, // in minutes
    required: true,
    default: 30,
    min: [5, 'Delivery time cannot be less than 5 minutes'],
    max: [180, 'Delivery time cannot exceed 180 minutes'],
  },
  deliveryFee: {
    type: Number,
    required: true,
    default: 100,
    min: [0, 'Delivery fee cannot be negative'],
  },
  minOrderAmount: {
    type: Number,
    required: true,
    default: 300,
    min: [0, 'Minimum order amount cannot be negative'],
  },
  freeDeliveryAbove: {
    type: Number,
    default: 1000,
  },

  // ===== Operating Hours =====
  isOpen: {
    type: Boolean,
    default: true,
  },
  openTime: {
    type: String,
    default: '10:00',
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'],
  },
  closeTime: {
    type: String,
    default: '23:00',
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'],
  },
  is24Hours: {
    type: Boolean,
    default: false,
  },
  operatingDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  }],

  // ===== Status =====
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },

  // ===== Owner =====
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  // ===== Statistics =====
  totalOrders: {
    type: Number,
    default: 0,
  },
  averagePreparationTime: {
    type: Number,
    default: 20, // minutes
  },

}, {
  timestamps: true,
});

// Indexes for Faster Queries
RestaurantSchema.index({ name: 'text', cuisineType: 'text' });
RestaurantSchema.index({ rating: -1 });
RestaurantSchema.index({ isOpen: 1, isActive: 1 });
RestaurantSchema.index({ coordinates: '2dsphere' });

// Instance Methods

/**
 * Update restaurant rating based on all reviews
 */
RestaurantSchema.methods.updateRating = async function () {
  try {
    const Review = mongoose.model('Review');
    const result = await Review.aggregate([
      { $match: { restaurantId: this._id } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    if (result.length > 0) {
      this.rating = Math.round(result[0].avgRating * 10) / 10;
      this.totalReviews = result[0].count;
      await this.save();
    }
    return this;
  } catch (error) {
    console.error('Error updating restaurant rating:', error);
    throw error;
  }
};

/**
 * Check if restaurant is currently open
 */
RestaurantSchema.methods.isCurrentlyOpen = function () {
  if (this.is24Hours) return true;

  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });

  // Check if operating on this day
  if (this.operatingDays && this.operatingDays.length > 0) {
    if (!this.operatingDays.includes(currentDay)) {
      return false;
    }
  }

  // Check time
  const currentTime = now.toTimeString().slice(0, 5);
  if (this.openTime && this.closeTime) {
    return currentTime >= this.openTime && currentTime <= this.closeTime;
  }

  return this.isOpen;
};

// Static Methods

/**
 * Get restaurants with pagination and filters
 */
RestaurantSchema.statics.getFilteredRestaurants = async function (filters = {}, page = 1, limit = 10) {
  const query = { isActive: true };

  // Apply filters
  if (filters.search) {
    query.$text = { $search: filters.search };
  }

  if (filters.cuisine) {
    query.cuisineType = { $in: Array.isArray(filters.cuisine) ? filters.cuisine : [filters.cuisine] };
  }

  if (filters.isOpen !== undefined) {
    query.isOpen = filters.isOpen;
  }

  if (filters.minRating) {
    query.rating = { $gte: parseFloat(filters.minRating) };
  }

  if (filters.city) {
    query.city = { $regex: filters.city, $options: 'i' };
  }

  // Near me (location-based)
  if (filters.lat && filters.lng && filters.radius) {
    query.coordinates = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(filters.lng), parseFloat(filters.lat)],
        },
        $maxDistance: parseFloat(filters.radius) * 1000, // convert km to meters
      },
    };
  }

  // Sort
  let sort = { rating: -1 };
  if (filters.sortBy === 'deliveryTime') {
    sort = { deliveryTime: 1 };
  } else if (filters.sortBy === 'minOrder') {
    sort = { minOrderAmount: 1 };
  } else if (filters.sortBy === 'name') {
    sort = { name: 1 };
  }

  const skip = (page - 1) * limit;

  const [restaurants, total] = await Promise.all([ // run parallel
    this.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)), // get data 
    this.countDocuments(query), //get count 
    //queries run at the same time 
  ]);

  return {
    restaurants,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = mongoose.model('Restaurant', RestaurantSchema);