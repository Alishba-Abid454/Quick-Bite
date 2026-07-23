/**
 * Auth Validators
 * Joi validation schemas for authentication endpoints
 */

const Joi = require('joi');

/**
 * Signup validation schema
 */
const signupSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(2)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'string.pattern.base': 'Name can only contain letters and spaces',
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

  password: Joi.string()
    .required()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password cannot exceed 30 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),

  passwordConfirm: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'string.empty': 'Please confirm your password',
      'any.only': 'Passwords do not match',
    }),

  phone: Joi.string()
    .required()
    .pattern(/^(\+92|0)?[3][0-9]{9}$/)
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please provide a valid Pakistani phone number (e.g., 0300-1234567)',
    }),

  role: Joi.string()
    .valid('customer', 'restaurant_owner')
    .default('customer'),
});

/**
 * Login validation schema
 */
const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .lowercase()
    .trim()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
    }),
});

/**
 * Change password validation schema
 */
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'string.empty': 'Current password is required',
    }),

  newPassword: Joi.string()
    .required()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .messages({
      'string.empty': 'New password is required',
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password cannot exceed 30 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),

  newPasswordConfirm: Joi.string()
    .required()
    .valid(Joi.ref('newPassword'))
    .messages({
      'string.empty': 'Please confirm your new password',
      'any.only': 'Passwords do not match',
    }),
});

/**
 * Forgot password validation schema
 */
const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .lowercase()
    .trim()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),
});

/**
 * Reset password validation schema
 */
const resetPasswordSchema = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      'string.empty': 'Reset token is required',
    }),

  password: Joi.string()
    .required()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password cannot exceed 30 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),

  passwordConfirm: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'string.empty': 'Please confirm your password',
      'any.only': 'Passwords do not match',
    }),
});

/**
 * Update profile validation schema
 */
const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'string.pattern.base': 'Name can only contain letters and spaces',
    }),

  phone: Joi.string()
    .pattern(/^(\+92|0)?[3][0-9]{9}$/)
    .messages({
      'string.pattern.base': 'Please provide a valid Pakistani phone number',
    }),

  profileImage: Joi.string()
    .uri()
    .messages({
      'string.uri': 'Please provide a valid image URL',
    }),
});

/**
 * Add address validation schema
 */
const addAddressSchema = Joi.object({
  type: Joi.string()
    .valid('home', 'office', 'other')
    .default('home'),

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

  state: Joi.string()
    .trim()
    .max(50),

  zipCode: Joi.string()
    .trim()
    .pattern(/^[0-9]{4,6}$/)
    .messages({
      'string.pattern.base': 'Please provide a valid zip code',
    }),

  country: Joi.string()
    .default('Pakistan')
    .trim(),

  landmark: Joi.string()
    .trim()
    .max(100),

  isDefault: Joi.boolean()
    .default(false),

  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90),
    lng: Joi.number().min(-180).max(180),
  }),
});

/**
 * Add payment method validation schema
 */
const addPaymentMethodSchema = Joi.object({
  type: Joi.string()
    .valid('card', 'bank', 'mobile_wallet')
    .required()
    .messages({
      'string.empty': 'Payment type is required',
    }),

  cardNumber: Joi.when('type', {
    is: 'card',
    then: Joi.string().required().min(4).max(19).messages({
      'string.empty': 'Card number is required',
      'string.min': 'Card number must be at least 4 digits',
      'string.max': 'Card number cannot exceed 19 digits',
    }),
    otherwise: Joi.string().optional(),
  }),

  cardHolder: Joi.when('type', {
    is: 'card',
    then: Joi.string().required().trim().min(2).messages({
      'string.empty': 'Card holder name is required',
      'string.min': 'Card holder name must be at least 2 characters',
    }),
    otherwise: Joi.string().optional(),
  }),

  expiry: Joi.when('type', {
    is: 'card',
    then: Joi.string().required().pattern(/^(0[1-9]|1[0-2])\/\d{2}$/).messages({
      'string.empty': 'Expiry date is required',
      'string.pattern.base': 'Please provide a valid expiry date (MM/YY)',
    }),
    otherwise: Joi.string().optional(),
  }),

  bankName: Joi.when('type', {
    is: 'bank',
    then: Joi.string().required().trim().messages({
      'string.empty': 'Bank name is required',
    }),
    otherwise: Joi.string().optional(),
  }),

  accountNumber: Joi.when('type', {
    is: 'bank',
    then: Joi.string().required().trim().messages({
      'string.empty': 'Account number is required',
    }),
    otherwise: Joi.string().optional(),
  }),

  isDefault: Joi.boolean()
    .default(false),
});

module.exports = {
  signupSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  addAddressSchema,
  addPaymentMethodSchema,
};