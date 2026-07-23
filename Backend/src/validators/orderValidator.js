/**
 * Order Validators
 * Joi validation schemas for order endpoints
 */

const Joi = require('joi');
const { PAYMENT_METHODS, ORDER_STATUS } = require('../utils/constants');

/**
 * Place order validation schema
 */
const placeOrderSchema = Joi.object({
  restaurantId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.empty': 'Restaurant ID is required',
      'string.pattern.base': 'Invalid restaurant ID format',
    }),

  items: Joi.array()
    .items(
      Joi.object({
        menuItemId: Joi.string()
          .required()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .messages({
            'string.empty': 'Menu item ID is required',
            'string.pattern.base': 'Invalid menu item ID format',
          }),

        quantity: Joi.number()
          .required()
          .integer()
          .min(1)
          .max(50)
          .messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity must be at least 1',
            'number.max': 'Quantity cannot exceed 50',
          }),

        options: Joi.array()
          .items(Joi.string())
          .default([]),

        addOns: Joi.array()
          .items(Joi.string())
          .default([]),

        specialInstructions: Joi.string()
          .max(200)
          .trim()
          .allow(''),
      })
    )
    .min(1)
    .max(50)
    .required()
    .messages({
      'array.min': 'Order must contain at least one item',
      'array.max': 'Order cannot contain more than 50 items',
    }),

  deliveryAddress: Joi.object({
    address: Joi.string()
      .required()
      .trim()
      .min(5)
      .max(200)
      .messages({
        'string.empty': 'Delivery address is required',
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

    zipCode: Joi.string()
      .trim()
      .allow(''),

    coordinates: Joi.object({
      lat: Joi.number().min(-90).max(90),
      lng: Joi.number().min(-180).max(180),
    }),
  }).required(),

  deliveryPhone: Joi.string()
    .required()
    .pattern(/^(\+92|0)?[3][0-9]{9}$/)
    .messages({
      'string.empty': 'Delivery phone is required',
      'string.pattern.base': 'Please provide a valid Pakistani phone number',
    }),

  paymentMethod: Joi.string()
    .required()
    .valid(...Object.values(PAYMENT_METHODS))
    .messages({
      'string.empty': 'Payment method is required',
      'any.only': 'Invalid payment method',
    }),

  deliveryInstructions: Joi.string()
    .max(200)
    .trim()
    .allow(''),

  notes: Joi.string()
    .max(200)
    .trim()
    .allow(''),

  couponCode: Joi.string()
    .trim()
    .allow(''),
});

/**
 * Update order status validation schema
 */
const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .required()
    .valid(...Object.values(ORDER_STATUS))
    .messages({
      'string.empty': 'Status is required',
      'any.only': 'Invalid order status',
    }),

  deliveryPersonId: Joi.when('status', {
    is: 'out_for_delivery',
    then: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        'string.pattern.base': 'Invalid delivery person ID format',
      }),
    otherwise: Joi.string().allow(''),
  }),

  deliveryPersonName: Joi.when('status', {
    is: 'out_for_delivery',
    then: Joi.string().required().trim().min(2).messages({
      'string.empty': 'Delivery person name is required',
      'string.min': 'Delivery person name must be at least 2 characters',
    }),
    otherwise: Joi.string().allow(''),
  }),

  deliveryPersonPhone: Joi.when('status', {
    is: 'out_for_delivery',
    then: Joi.string().required().pattern(/^(\+92|0)?[3][0-9]{9}$/).messages({
      'string.empty': 'Delivery person phone is required',
      'string.pattern.base': 'Please provide a valid Pakistani phone number',
    }),
    otherwise: Joi.string().allow(''),
  }),

  deliveryPersonVehicle: Joi.when('status', {
    is: 'out_for_delivery',
    then: Joi.string().required().trim().messages({
      'string.empty': 'Vehicle information is required',
    }),
    otherwise: Joi.string().allow(''),
  }),

  cancellationReason: Joi.when('status', {
    is: 'cancelled',
    then: Joi.string().required().trim().min(5).max(200).messages({
      'string.empty': 'Cancellation reason is required',
      'string.min': 'Reason must be at least 5 characters',
      'string.max': 'Reason cannot exceed 200 characters',
    }),
    otherwise: Joi.string().allow(''),
  }),
});

/**
 * Get orders query validation schema
 */
const getOrdersQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.base': 'Page must be a number',
      'number.min': 'Page must be at least 1',
    }),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      'number.base': 'Limit must be a number',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 100',
    }),

  status: Joi.string()
    .valid(...Object.values(ORDER_STATUS), 'all')
    .default('all')
    .messages({
      'any.only': 'Invalid status filter',
    }),

  startDate: Joi.date()
    .iso()
    .messages({
      'date.base': 'Invalid start date format',
    }),

  endDate: Joi.date()
    .iso()
    .min(Joi.ref('startDate'))
    .messages({
      'date.base': 'Invalid end date format',
      'date.min': 'End date must be after start date',
    }),

  sortBy: Joi.string()
    .valid('newest', 'oldest', 'highest', 'lowest')
    .default('newest')
    .messages({
      'any.only': 'Invalid sort option',
    }),
});

/**
 * Cancel order validation schema
 */
const cancelOrderSchema = Joi.object({
  reason: Joi.string()
    .required()
    .trim()
    .min(5)
    .max(200)
    .messages({
      'string.empty': 'Cancellation reason is required',
      'string.min': 'Reason must be at least 5 characters',
      'string.max': 'Reason cannot exceed 200 characters',
    }),
});

/**
 * Order ID param validation
 */
const orderIdParamSchema = Joi.object({
  orderId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.empty': 'Order ID is required',
      'string.pattern.base': 'Invalid order ID format',
    }),
});

module.exports = {
  placeOrderSchema,
  updateOrderStatusSchema,
  getOrdersQuerySchema,
  cancelOrderSchema,
  orderIdParamSchema,
};