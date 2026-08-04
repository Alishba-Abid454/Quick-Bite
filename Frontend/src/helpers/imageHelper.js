/**
 * imageHelper.js - Image URL Helper
 * Handles image URLs from backend
 */

// ============================================
// Base URL Configuration
// ============================================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Get full image URL
 * @param {string} imagePath - Image path from database
 * @param {string} defaultImage - Default image if path is empty
 * @returns {string} - Full image URL
 */
export const getImageUrl = (imagePath, defaultImage = 'https://via.placehold.com/400x300?text=No+Image') => {
  if (!imagePath) {
    return defaultImage;
  }

  // If it's already a full URL (starts with http), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a relative path starting with /uploads/ or uploads/
  if (imagePath.startsWith('/uploads/') || imagePath.startsWith('uploads/')) {
    const cleanPath = imagePath.replace(/^\/+/, '');
    return `${API_BASE_URL}/${cleanPath}`;
  }

  // If it's just a filename, prepend /uploads/
  return `${API_BASE_URL}/uploads/${imagePath}`;
};

/**
 * Get restaurant image URL
 * @param {string} image - Restaurant image path
 * @returns {string} - Full restaurant image URL
 */
export const getRestaurantImage = (image) => {
  return getImageUrl(image, 'https://via.placehold.com/400x300?text=Restaurant');
};

/**
 * Get menu item image URL
 * @param {string} image - Menu item image path
 * @returns {string} - Full menu item image URL
 */
export const getMenuItemImage = (image) => {
  return getImageUrl(image, 'https://via.placehold.com/300x200?text=Food+Item');
};

/**
 * Get user avatar image URL
 * @param {string} image - User image path
 * @returns {string} - Full user image URL
 */
export const getUserImage = (image) => {
  return getImageUrl(image, 'https://via.placehold.com/80x80?text=User');
};

export default {
  getImageUrl,
  getRestaurantImage,
  getMenuItemImage,
  getUserImage,
};