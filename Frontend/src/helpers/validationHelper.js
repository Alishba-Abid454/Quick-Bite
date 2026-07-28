/**
 * validationHelper.js - Form Validation
 * Validation functions for forms and input data
 */

import { REGEX } from '../utils/constants';

// Email Validation

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return REGEX.EMAIL.test(email.trim());
};

/**
 * Validate phone number (Pakistani format)
 * @param {string} phone - Phone to validate
 * @returns {boolean} - True if valid
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  return REGEX.PHONE.test(phone.trim());
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - { valid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (password && !REGEX.PASSWORD.test(password)) {
    errors.push('Password must contain uppercase, lowercase, number, and special character');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Check if passwords match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {boolean} - True if match
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Address Validation

/**
 * Validate address
 * @param {object} address - Address object
 * @param {string} address.address - Street address
 * @param {string} address.city - City
 * @param {string} address.zipCode - ZIP code (optional)
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validateAddress = (address) => {
  const errors = {};
  
  if (!address.address || address.address.trim().length < 5) {
    errors.address = 'Address must be at least 5 characters';
  }
  
  if (!address.city || address.city.trim().length < 2) {
    errors.city = 'City is required';
  }
  
  if (address.zipCode && !REGEX.ZIP_CODE.test(address.zipCode.trim())) {
    errors.zipCode = 'Invalid ZIP code format';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

// Order Validation

/**
 * Validate order items
 * @param {Array} items - Order items
 * @returns {object} - { valid: boolean, errors: string[] }
 */
export const validateOrderItems = (items) => {
  const errors = [];
  
  if (!items || items.length === 0) {
    errors.push('Cart is empty');
  }
  
  items.forEach((item, index) => {
    if (!item.id) {
      errors.push(`Item ${index + 1}: Missing ID`);
    }
    if (!item.quantity || item.quantity < 1) {
      errors.push(`Item ${index + 1}: Invalid quantity`);
    }
    if (!item.price || item.price < 0) {
      errors.push(`Item ${index + 1}: Invalid price`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

// General Validation

/**
 * Check if string is empty or whitespace
 * @param {string} value - Value to check
 * @returns {boolean} - True if empty
 */
export const isEmptyString = (value) => {
  return !value || value.trim().length === 0;
};

/**
 * Check if value is within range
 * @param {number} value - Value to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} - True if within range
 */
export const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Sanitize string (remove special characters)
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate credit card number (basic)
 * @param {string} cardNumber - Card number
 * @returns {boolean} - True if valid
 */
export const isValidCardNumber = (cardNumber) => {
  if (!cardNumber || typeof cardNumber !== 'string') return false;
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
};

/**
 * Validate expiry date (MM/YY)
 * @param {string} expiry - Expiry date
 * @returns {boolean} - True if valid
 */
export const isValidExpiry = (expiry) => {
  if (!expiry || typeof expiry !== 'string') return false;
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  
  const month = parseInt(match[1]);
  const year = parseInt(match[2]);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  
  if (month < 1 || month > 12) return false;
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  
  return true;
};

export default {
  isValidEmail,
  isValidPhone,
  validatePassword,
  passwordsMatch,
  validateAddress,
  validateOrderItems,
  isEmptyString,
  isInRange,
  sanitizeString,
  isValidUrl,
  isValidCardNumber,
  isValidExpiry,
};