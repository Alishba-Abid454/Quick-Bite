/**
 * Restaurant Validators
 * Joi validation schemas for restaurant endpoints
 */

const Joi = require('joi');
const { CUISINE_TYPES, MENU_CATEGORIES } = require('../utils/constants');

/**
 * Create restaurant validation schema
 */
const createRestaurantSchema = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(100)
    .messages({
      'string.empty': 'Restaurant name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 100 characters',
    }),

  email: Joi.string()
    .required()
    .email()
    .lowercase()
    .trim()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),

  phone: Joi.string()
    .required()
    .pattern(/^(\+92|0)?[3][0-9]{9}$/)
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please provide a valid Pakistani phone number',
    }),

  address: Joi.string()
    .required()
    .trim()
    .min(5)
    .max(200)
    .messages({
      'string.empty': 'Address is required',
      'string.min': 'Address must be at least 5 characters',
      'string.max': 'Address cannot exceed 200 characters',
    }),

  city: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(50)
    .messages({
      'string.empty': 'City is required',
      'string.min': 'City must be at least 2 characters',
      'string.max': 'City cannot exceed 50 characters',
    }),

  coordinates: Joi.object({
    lat: Joi.number()
      .required()
      .min(-90)
      .max(90)
      .messages({
        'number.required': 'Latitude is required',
        'number.min': 'Latitude must be between -90 and 90',
        'number.max': 'Latitude must be between -90 and 90',
      }),
    lng: Joi.number()
      .required()
      .min(-180)
      .max(180)
      .messages({
        'number.required': 'Longitude is required',
        'number.min': 'Longitude must be between -180 and 180',
        'number.max': 'Longitude must be between -180 and 180',
      }),
  }).required(),

  cuisineType: Joi.array()
    .items(Joi.string().valid(...CUISINE_TYPES))
    .min(1)
    .messages({
      'array.min': 'At least one cuisine type is required',
      'any.only': 'Invalid cuisine type',
    }),

  categories: Joi.array()
    .items(Joi.string().trim())
    .default([]),

  deliveryTime: Joi.number()
    .required()
    .integer()
    .min(5)
    .max(180)
    .default(30)
    .messages({
      'number.base': 'Delivery time must be a number',
      'number.min': 'Delivery time cannot be less than 5 minutes',
      'number.max': 'Delivery time cannot exceed 180 minutes',
    }),

  deliveryFee: Joi.number()
    .required()
    .min(0)
    .default(100)
    .messages({
      'number.base': 'Delivery fee must be a number',
      'number.min': 'Delivery fee cannot be negative',
    }),

  minOrderAmount: Joi.number()
    .required()
    .min(0)
    .default(300)
    .messages({
      'number.base': 'Minimum order amount must be a number',
      'number.min': 'Minimum order amount cannot be negative',
    }),

  freeDeliveryAbove: Joi.number()
    .min(0)
    .messages({
      'number.min': 'Free delivery amount cannot be negative',
    }),

  isOpen: Joi.boolean()
    .default(true),

  openTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .default('10:00')
    .messages({
      'string.pattern.base': 'Invalid time format (use HH:MM)',
    }),

  closeTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .default('23:00')
    .messages({
      'string.pattern.base': 'Invalid time format (use HH:MM)',
    }),

  is24Hours: Joi.boolean()
    .default(false),

  operatingDays: Joi.array()
    .items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'))
    .default(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),

  image: Joi.string()
    .uri()
    .default('https://via.placeholder.com/400x300')
    .messages({
      'string.uri': 'Please provide a valid image URL',
    }),

  coverImage: Joi.string()
    .uri()
    .default('https://via.placeholder.com/1200x400')
    .messages({
      'string.uri': 'Please provide a valid cover image URL',
    }),
});

/**
 * Update restaurant validation schema
 */
const updateRestaurantSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  email: Joi.string()
    .email()
    .lowercase()
    .trim(),

  phone: Joi.string()
    .pattern(/^(\+92|0)?[3][0-9]{9}$/),

  address: Joi.string()
    .trim()
    .min(5)
    .max(200),

  city: Joi.string()
    .trim()
    .min(2)
    .max(50),

  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90),
    lng: Joi.number().min(-180).max(180),
  }),

  cuisineType: Joi.array()
    .items(Joi.string().valid(...CUISINE_TYPES))
    .min(1),

  categories: Joi.array()
    .items(Joi.string().trim()),

  deliveryTime: Joi.number()
    .integer()
    .min(5)
    .max(180),

  deliveryFee: Joi.number()
    .min(0),

  minOrderAmount: Joi.number()
    .min(0),

  freeDeliveryAbove: Joi.number()
    .min(0),

  isOpen: Joi.boolean(),

  openTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),

  closeTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),

  is24Hours: Joi.boolean(),

  operatingDays: Joi.array()
    .items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),

  image: Joi.string()
    .uri(),

  coverImage: Joi.string()
    .uri(),

  isActive: Joi.boolean(),

  isFeatured: Joi.boolean(),
});

/**
 * Get restaurants query validation schema
 */
const getRestaurantsQuerySchema = Joi.object({
  search: Joi.string()
    .trim()
    .allow(''),

  cuisine: Joi.alternatives()
    .try(
      Joi.string(),
      Joi.array().items(Joi.string())
    )
    .default([]),

  city: Joi.string()
    .trim(),

  isOpen: Joi.boolean(),

  minRating: Joi.number()
    .min(0)
    .max(5),

  lat: Joi.number()
    .min(-90)
    .max(90),

  lng: Joi.number()
    .min(-180)
    .max(180),

  radius: Joi.number()
    .min(1)
    .max(50)
    .default(10),

  sortBy: Joi.string()
    .valid('rating', 'deliveryTime', 'minOrder', 'name')
    .default('rating'),

  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
});

/**
 * Restaurant ID param validation
 */
const restaurantIdParamSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.empty': 'Restaurant ID is required',
      'string.pattern.base': 'Invalid restaurant ID format',
    }),
});

/**
 * Create menu item validation schema
 */
const createMenuItemSchema = Joi.object({
  restaurantId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.empty': 'Restaurant ID is required',
      'string.pattern.base': 'Invalid Restaurant ID',
    }),

  name: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(100)
    .messages({
      'string.empty': 'Item name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 100 characters',
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow(''),

  price: Joi.number()
    .required()
    .min(0)
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
    }),

  originalPrice: Joi.number()
    .min(0),

  category: Joi.string()
    .required()
    .valid(...MENU_CATEGORIES)
    .messages({
      'string.empty': 'Category is required',
      'any.only': 'Invalid category',
    }),

  subCategory: Joi.string()
    .trim()
    .allow(''),

  image: Joi.string()
    .uri()
    .default('https://via.placeholder.com/150x150')
    .messages({
      'string.uri': 'Please provide a valid image URL',
    }),

  isVeg: Joi.boolean()
    .default(true),

  isVegan: Joi.boolean()
    .default(false),

  isGlutenFree: Joi.boolean()
    .default(false),

  hasNuts: Joi.boolean()
    .default(false),

  calories: Joi.number()
    .min(0),

  allergens: Joi.array()
    .items(Joi.string().trim()),

  available: Joi.boolean()
    .default(true),

  preparationTime: Joi.number()
    .integer()
    .min(0)
    .default(15),

  isPopular: Joi.boolean()
    .default(false),

  isRecommended: Joi.boolean()
    .default(false),

  isNew: Joi.boolean()
    .default(false),

  stock: Joi.number()
    .integer()
    .min(0)
    .default(0),

  options: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().trim(),
        choices: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required().trim(),
              price: Joi.number().min(0).default(0),
              isDefault: Joi.boolean().default(false),
            })
          )
          .min(1),
        required: Joi.boolean().default(false),
        maxChoices: Joi.number().integer().min(1).default(1),
      })
    ),

  addOns: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().trim(),
        price: Joi.number().required().min(0),
        isDefault: Joi.boolean().default(false),
      })
    ),
});

/**
 * Update menu item validation schema
 */
const updateMenuItemSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  description: Joi.string()
    .trim()
    .max(500)
    .allow(''),

  price: Joi.number()
    .min(0),

  originalPrice: Joi.number()
    .min(0),

  category: Joi.string()
    .valid(...MENU_CATEGORIES),

  subCategory: Joi.string()
    .trim()
    .allow(''),

  image: Joi.string()
    .uri()
    .messages({
      'string.uri': 'Please provide a valid image URL',
    }),

  isVeg: Joi.boolean(),

  isVegan: Joi.boolean(),

  isGlutenFree: Joi.boolean(),

  hasNuts: Joi.boolean(),

  calories: Joi.number()
    .min(0),

  allergens: Joi.array()
    .items(Joi.string().trim()),

  available: Joi.boolean(),

  preparationTime: Joi.number()
    .integer()
    .min(0),

  isPopular: Joi.boolean(),

  isRecommended: Joi.boolean(),

  isNew: Joi.boolean(),

  stock: Joi.number()
    .integer()
    .min(0),

  options: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().trim(),
        choices: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required().trim(),
              price: Joi.number().min(0).default(0),
              isDefault: Joi.boolean().default(false),
            })
          )
          .min(1),
        required: Joi.boolean().default(false),
        maxChoices: Joi.number().integer().min(1).default(1),
      })
    ),

  addOns: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().trim(),
        price: Joi.number().required().min(0),
        isDefault: Joi.boolean().default(false),
      })
    ),
});

module.exports = {
  createRestaurantSchema,
  updateRestaurantSchema,
  getRestaurantsQuerySchema,
  restaurantIdParamSchema,
  createMenuItemSchema,
  updateMenuItemSchema,
};