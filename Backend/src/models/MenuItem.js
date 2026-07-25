/**
 * Menu Item Model
 * Stores food items offered by restaurants
 */

const mongoose = require('mongoose');
const { MENU_CATEGORIES } = require('../utils/constants');

// Menu Item Schema
const MenuItemSchema = new mongoose.Schema({
  // ===== Restaurant Reference =====
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant ID is required'],
    index: true,
  },

  // ===== Basic Info =====
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },

  // ===== Pricing =====
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  originalPrice: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    // Original price before discount
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },

  // ===== Images =====
  image: {
    type: String,
    default: 'https://via.placeholder.com/150x150',
  },
  images: [{
    type: String,
  }],

  // ===== Category =====
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: MENU_CATEGORIES,
  },
  subCategory: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],

  // ===== Dietary Info =====
  isVeg: {
    type: Boolean,
    default: true,
  },
  isVegan: {
    type: Boolean,
    default: false,
  },
  isGlutenFree: {
    type: Boolean,
    default: false,
  },
  hasNuts: {
    type: Boolean,
    default: false,
  },
  calories: {
    type: Number,
    min: 0,
  },
  allergens: [{
    type: String,
    trim: true,
  }],

  // ===== Availability =====
  available: {
    type: Boolean,
    default: true,
  },
  preparationTime: {
    type: Number, // in minutes
    default: 15,
    min: [0, 'Preparation time cannot be negative'],
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  isRecommended: {
    type: Boolean,
    default: false,
  },
  isNew: {
    type: Boolean,
    default: false,
  },

  // ===== Stock =====
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  isOutOfStock: {
    type: Boolean,
    default: false,
  },

  // ===== Customization =====
  options: [{
    name: {
      type: String,
      required: true,
    },
    choices: [{
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        default: 0,
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
    }],
    required: {
      type: Boolean,
      default: false,
    },
    maxChoices: {
      type: Number,
      default: 1,
    },
  }],

  // ===== Add-ons =====
  addOns: [{
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  }],

  // ===== Statistics =====
  totalOrders: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

}, {
  timestamps: true,
});

// Indexes for Faster Queries
MenuItemSchema.index({ restaurantId: 1, category: 1 });
MenuItemSchema.index({ restaurantId: 1, isPopular: -1 }); // sort in desc order
MenuItemSchema.index({ restaurantId: 1, available: 1 });
MenuItemSchema.index({ name: 'text' });

// Compound Index for Common Queries
MenuItemSchema.index({ restaurantId: 1, category: 1, available: 1 });

// Pre-Save Middleware

// Auto-update isOutOfStock based on stock
MenuItemSchema.pre('save', function () {

  if (this.isModified('stock')) {
    this.isOutOfStock = this.stock <= 0;
  }

  if (this.originalPrice && this.price < this.originalPrice) {
    this.discountPercentage = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  } else {
    this.discountPercentage = 0;
  }

});

// Instance Methods

/**
 * Check if item is available
 */
MenuItemSchema.methods.isAvailable = function () {
  return this.available && !this.isOutOfStock;
};

/**
 * Get final price including options and add-ons
 */
MenuItemSchema.methods.getFinalPrice = function (options = [], addOns = []) {
  let price = this.price;

  // Add option prices
  if (options && this.options) {
    this.options.forEach(option => {
      option.choices.forEach(choice => {
        if (options.includes(choice._id.toString())) {
          price += choice.price;
        }
      });
    });
  }

  // Add add-on prices
  if (addOns && this.addOns) {
    this.addOns.forEach(addOn => {
      if (addOns.includes(addOn._id.toString())) {
        price += addOn.price;
      }
    });
  }

  return price;
};

// Static Methods

/**
 * Get menu items for a restaurant with filters
 */
MenuItemSchema.statics.getRestaurantMenu = async function (
  restaurantId,
  filters = {},
  page = 1,
  limit = 20
) {
  const query = { restaurantId, available: true };

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.isVeg !== undefined) {
    query.isVeg = filters.isVeg;
  }

  if (filters.isPopular) {
    query.isPopular = true;
  }

  if (filters.search) {
    query.$text = { $search: filters.search };
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = parseFloat(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = parseFloat(filters.maxPrice);
  }

  const sort = {};
  if (filters.sortBy === 'price') {
    sort.price = filters.sortOrder === 'desc' ? -1 : 1;
  } else if (filters.sortBy === 'popularity') {
    sort.totalOrders = -1;
  } else if (filters.sortBy === 'rating') {
    sort.averageRating = -1;
  } else {
    sort.createdAt = -1;
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    this.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)),
    this.countDocuments(query),
  ]);

  // Group by category for organized display
  const categories = {};
  items.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });

  return {
    items,
    categories,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = mongoose.model('MenuItem', MenuItemSchema);