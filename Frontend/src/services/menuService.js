/**
 * menuService.js - Menu Service
 * Handles all menu item-related API calls
 */

import fetchWrapper from '../helpers/fetchWrapper';
import { MENU_ENDPOINTS } from '../utils/api';

// ============================================
// Menu Service
// ============================================
export const menuService = {
  /**
   * Get all menu items with filters
   * @param {Object} params - Query parameters
   * @param {string} params.restaurantId - Restaurant ID
   * @param {string} params.category - Category filter
   * @param {boolean} params.available - Availability filter
   * @param {number} params.minPrice - Minimum price
   * @param {number} params.maxPrice - Maximum price
   * @param {string} params.sortBy - Sort field
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} - API response with menu items
   */
  getAll: async (params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(MENU_ENDPOINTS.GET_ALL, cleanParams);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single menu item by ID
   * @param {string} id - Menu item ID
   * @returns {Promise} - API response with menu item
   */
  getById: async (id) => {
    try {
      const response = await fetchWrapper.get(MENU_ENDPOINTS.GET_ONE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get menu items by restaurant
   * @param {string} restaurantId - Restaurant ID
   * @param {Object} params - Additional filters
   * @returns {Promise} - API response with menu items
   */
  getByRestaurant: async (restaurantId, params = {}) => {
    try {
      const response = await menuService.getAll({
        restaurantId,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get menu items by category
   * @param {string} category - Category name
   * @param {Object} params - Additional filters
   * @returns {Promise} - API response with menu items
   */
  getByCategory: async (category, params = {}) => {
    try {
      const response = await fetchWrapper.get(
        MENU_ENDPOINTS.GET_BY_CATEGORY(category),
        params
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get popular menu items
   * @param {number} limit - Number of items
   * @param {string} restaurantId - Filter by restaurant
   * @returns {Promise} - API response with popular items
   */
  getPopular: async (limit = 10, restaurantId = null) => {
    try {
      const params = { limit };
      if (restaurantId) {
        params.restaurantId = restaurantId;
      }
      
      const response = await fetchWrapper.get(MENU_ENDPOINTS.GET_POPULAR, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new menu item (Admin/Restaurant Owner)
   * @param {Object} menuItemData - Menu item data
   * @returns {Promise} - API response with created menu item
   */
  create: async (menuItemData) => {
    try {
      const response = await fetchWrapper.post(MENU_ENDPOINTS.CREATE, menuItemData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update menu item (Admin/Restaurant Owner)
   * @param {string} id - Menu item ID
   * @param {Object} menuItemData - Menu item data to update
   * @returns {Promise} - API response with updated menu item
   */
  update: async (id, menuItemData) => {
    try {
      const response = await fetchWrapper.put(MENU_ENDPOINTS.UPDATE(id), menuItemData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete menu item (Admin/Restaurant Owner)
   * @param {string} id - Menu item ID
   * @returns {Promise} - API response
   */
  delete: async (id) => {
    try {
      const response = await fetchWrapper.delete(MENU_ENDPOINTS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Toggle menu item availability (Admin/Restaurant Owner)
   * @param {string} id - Menu item ID
   * @returns {Promise} - API response with updated menu item
   */
  toggleAvailability: async (id) => {
    try {
      const response = await fetchWrapper.patch(MENU_ENDPOINTS.TOGGLE_AVAILABILITY(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Bulk create menu items (Admin/Restaurant Owner)
   * @param {Array} menuItems - Array of menu item data
   * @returns {Promise} - API response with created menu items
   */
  bulkCreate: async (menuItems) => {
    try {
      const response = await fetchWrapper.post(`${MENU_ENDPOINTS.CREATE}/bulk`, { items: menuItems });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default menuService;