/**
 * Review Validators
 * Joi validation schemas for review endpoints
 */

const Joi = require('joi');

/**
 * Submit review validation schema
 */
const submitReviewSchema = Joi.object({
  orderId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.empty': 'Order ID is required',
      'string.pattern.base': 'Invalid order ID format',
    }),

  rating: Joi.number()
    .required()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot exceed 5',
    }),

  comment: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'Comment cannot exceed 500 characters',
    }),

  foodQuality: Joi.number()
    .required()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Food quality rating must be a number',
      'number.min': 'Food quality must be at least 1',
      'number.max': 'Food quality cannot exceed 5',
    }),

  deliverySpeed: Joi.number()
    .required()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Delivery speed rating must be a number',
      'number.min': 'Delivery speed must be at least 1',
      'number.max': 'Delivery speed cannot exceed 5',
    }),

  packaging: Joi.number()
    .required()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Packaging rating must be a number',
      'number.min': 'Packaging must be at least 1',
      'number.max': 'Packaging cannot exceed 5',
    }),

  valueForMoney: Joi.number()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Value for money rating must be a number',
      'number.min': 'Value for money must be at least 1',
      'number.max': 'Value for money cannot exceed 5',
    }),

  images: Joi.array()
    .items(Joi.string().uri())
    .default([])
    .messages({
      'string.uri': 'Please provide a valid image URL',
    }),
});

/**
 * Update review validation schema
 */
const updateReviewSchema = Joi.object({
  rating: Joi.number()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot exceed 5',
    }),

  comment: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'Comment cannot exceed 500 characters',
    }),

  foodQuality: Joi.number()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Food quality rating must be a number',
      'number.min': 'Food quality must be at least 1',
      'number.max': 'Food quality cannot exceed 5',
    }),

  deliverySpeed: Joi.number()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Delivery speed rating must be a number',
      'number.min': 'Delivery speed must be at least 1',
      'number.max': 'Delivery speed cannot exceed 5',
    }),

  packaging: Joi.number()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Packaging rating must be a number',
      'number.min': 'Packaging must be at least 1',
      'number.max': 'Packaging cannot exceed 5',
    }),

  valueForMoney: Joi.number()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Value for money rating must be a number',
      'number.min': 'Value for money must be at least 1',
      'number.max': 'Value for money cannot exceed 5',
    }),
});

/**
 * Review ID param validation
 */
const reviewIdParamSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.empty': 'Review ID is required',
      'string.pattern.base': 'Invalid review ID format',
    }),
});

/**
 * Restaurant ID param validation
 */
const restaurantIdParamSchema = Joi.object({
  restaurantId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.empty': 'Restaurant ID is required',
      'string.pattern.base': 'Invalid restaurant ID format',
    }),
});

module.exports = {
  submitReviewSchema,
  updateReviewSchema,
  reviewIdParamSchema,
  restaurantIdParamSchema,
};