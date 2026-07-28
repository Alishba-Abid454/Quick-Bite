/**
 * localStorageHelper.js - Local Storage Management
 * Set, get, and remove items from localStorage with type safety
 */

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store (will be JSON stringified)
 * @returns {boolean} - Success status
 */
export const setItem = (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    console.error('Error setting localStorage item:', error);
    return false;
  }
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key not found
 * @returns {any} - Parsed value or default
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      return defaultValue;
    }
    return JSON.parse(value);
  } catch (error) {
    console.error('Error getting localStorage item:', error);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} - Success status
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing localStorage item:', error);
    return false;
  }
};

/**
 * Clear all localStorage
 * @returns {boolean} - Success status
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Check if key exists in localStorage
 * @param {string} key - Storage key
 * @returns {boolean} - True if key exists
 */
export const hasItem = (key) => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error('Error checking localStorage item:', error);
    return false;
  }
};

/**
 * Get all localStorage keys
 * @returns {string[]} - Array of keys
 */
export const getAllKeys = () => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Error getting localStorage keys:', error);
    return [];
  }
};

/**
 * Get all localStorage items as object
 * @returns {object} - All key-value pairs
 */
export const getAllItems = () => {
  try {
    const items = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          items[key] = JSON.parse(localStorage.getItem(key));
        } catch {
          items[key] = localStorage.getItem(key);
        }
      }
    }
    return items;
  } catch (error) {
    console.error('Error getting all localStorage items:', error);
    return {};
  }
};

// ============================================
// Storage Keys
// ============================================
export const STORAGE_KEYS = {
  TOKEN: 'food_app_token',
  USER: 'food_app_user',
  CART: 'food_app_cart',
  THEME: 'food_app_theme',
  LANGUAGE: 'food_app_language',
  RECENT_SEARCHES: 'food_app_recent_searches',
  FAVORITES: 'food_app_favorites',
};

export default {
  setItem,
  getItem,
  removeItem,
  clearStorage,
  hasItem,
  getAllKeys,
  getAllItems,
  STORAGE_KEYS,
};