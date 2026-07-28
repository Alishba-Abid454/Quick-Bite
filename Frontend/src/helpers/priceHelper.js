/**
 * priceHelper.js - Price Calculations
 * Formatting and calculation utilities for prices
 */

import { APP_CONSTANTS } from '../utils/constants';

// Currency Formatting

/**
 * Format price with currency symbol
 * @param {number} amount - Price amount
 * @param {string} currency - Currency symbol (default: 'Rs')
 * @returns {string} - Formatted price
 */
export const formatPrice = (amount, currency = 'Rs') => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return `${currency} 0`;
  }
  return `${currency} ${Math.round(amount).toLocaleString()}`;
};

/**
 * Format price with decimal
 * @param {number} amount - Price amount
 * @param {string} currency - Currency symbol (default: 'Rs')
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted price with decimals
 */
export const formatPriceWithDecimal = (amount, currency = 'Rs', decimals = 2) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return `${currency} 0.00`;
  }
  return `${currency} ${amount.toFixed(decimals)}`;
};

// Cart Calculations

/**
 * Calculate subtotal from cart items
 * @param {Array} items - Cart items with price and quantity
 * @returns {number} - Subtotal
 */
export const calculateSubtotal = (items) => {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    return sum + (price * quantity);
  }, 0);
};

/**
 * Calculate tax amount
 * @param {number} subtotal - Subtotal amount
 * @param {number} taxRate - Tax rate (default: from constants)
 * @returns {number} - Tax amount
 */
export const calculateTax = (subtotal, taxRate = APP_CONSTANTS.TAX_RATE) => {
  if (subtotal <= 0) return 0;
  return Math.round(subtotal * taxRate);
};

/**
 * Calculate delivery fee (free if above threshold)
 * @param {number} subtotal - Subtotal amount
 * @param {number} fee - Base delivery fee (default: from constants)
 * @param {number} freeAbove - Free delivery threshold (default: 1000)
 * @returns {number} - Delivery fee
 */
export const calculateDeliveryFee = (subtotal, fee = APP_CONSTANTS.DELIVERY_FEE, freeAbove = 1000) => {
  if (subtotal <= 0) return 0;
  if (subtotal >= freeAbove) return 0;
  return fee;
};

/**
 * Calculate discount amount
 * @param {number} subtotal - Subtotal amount
 * @param {number} discountPercent - Discount percentage
 * @param {number} maxDiscount - Maximum discount amount (optional)
 * @returns {number} - Discount amount
 */
export const calculateDiscount = (subtotal, discountPercent, maxDiscount = null) => {
  if (subtotal <= 0 || discountPercent <= 0) return 0;
  let discount = subtotal * (discountPercent / 100);
  if (maxDiscount !== null && discount > maxDiscount) {
    discount = maxDiscount;
  }
  return Math.round(discount);
};

/**
 * Calculate total price
 * @param {number} subtotal - Subtotal amount
 * @param {number} tax - Tax amount
 * @param {number} deliveryFee - Delivery fee
 * @param {number} discount - Discount amount (default: 0)
 * @returns {number} - Total price
 */
export const calculateTotal = (subtotal, tax, deliveryFee, discount = 0) => {
  return Math.max(0, subtotal + tax + deliveryFee - discount);
};

/**
 * Get complete price breakdown
 * @param {Array} items - Cart items
 * @param {Object} options - Options for calculation
 * @returns {Object} - Price breakdown
 */
export const getPriceBreakdown = (items, options = {}) => {
  const {
    taxRate = APP_CONSTANTS.TAX_RATE,
    deliveryFee = APP_CONSTANTS.DELIVERY_FEE,
    freeDeliveryAbove = 1000,
    discountPercent = 0,
    maxDiscount = null,
  } = options;

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal, taxRate);
  const delivery = calculateDeliveryFee(subtotal, deliveryFee, freeDeliveryAbove);
  const discount = calculateDiscount(subtotal, discountPercent, maxDiscount);
  const total = calculateTotal(subtotal, tax, delivery, discount);

  return {
    subtotal,
    tax,
    deliveryFee: delivery,
    discount,
    total,
    itemCount: items.reduce((sum, item) => sum + (item.quantity || 0), 0),
  };
};

// Price Comparison

/**
 * Check if price is within range
 * @param {number} price - Price to check
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {boolean} - True if within range
 */
export const isPriceInRange = (price, min, max) => {
  if (price === undefined || price === null) return false;
  if (min !== undefined && price < min) return false;
  if (max !== undefined && price > max) return false;
  return true;
};

/**
 * Get price range label
 * @param {number} price - Price amount
 * @param {Array} ranges - Array of { min, max, label } objects
 * @returns {string} - Range label
 */
export const getPriceRangeLabel = (price, ranges) => {
  if (!price || !ranges || ranges.length === 0) return '';
  
  for (const range of ranges) {
    if (isPriceInRange(price, range.min, range.max)) {
      return range.label;
    }
  }
  return '';
};

export default {
  formatPrice,
  formatPriceWithDecimal,
  calculateSubtotal,
  calculateTax,
  calculateDeliveryFee,
  calculateDiscount,
  calculateTotal,
  getPriceBreakdown,
  isPriceInRange,
  getPriceRangeLabel,
};