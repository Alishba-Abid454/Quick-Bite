/**
 * userService.js - User Service
 * Handles user management API calls (Admin only)
 */

import fetchWrapper from '../helpers/fetchWrapper';
import { USER_ENDPOINTS } from '../utils/api';

// User Service

export const userService = {
  /**
   * Get all users (Admin only)
   * @param {Object} params - Query parameters
   * @param {string} params.role - Filter by role
   * @param {boolean} params.isActive - Filter by active status
   * @param {string} params.search - Search term
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} - API response with users
   */
  getAll: async (params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(USER_ENDPOINTS.GET_ALL, cleanParams);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single user by ID (Admin only)
   * @param {string} id - User ID
   * @returns {Promise} - API response with user data
   */
  getById: async (id) => {
    try {
      const response = await fetchWrapper.get(USER_ENDPOINTS.GET_ONE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user (Admin only)
   * @param {string} id - User ID
   * @param {Object} userData - User data to update
   * @param {string} userData.name - Full name
   * @param {string} userData.email - Email address
   * @param {string} userData.phone - Phone number
   * @param {string} userData.role - User role
   * @param {boolean} userData.isActive - Active status
   * @param {string} userData.profileImage - Profile image URL
   * @returns {Promise} - API response with updated user
   */
  update: async (id, userData) => {
    try {
      const response = await fetchWrapper.put(USER_ENDPOINTS.UPDATE(id), userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete user (Admin only)
   * @param {string} id - User ID
   * @returns {Promise} - API response
   */
  delete: async (id) => {
    try {
      const response = await fetchWrapper.delete(USER_ENDPOINTS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Toggle user active status (Admin only)
   * @param {string} id - User ID
   * @returns {Promise} - API response with updated user
   */
  toggleStatus: async (id) => {
    try {
      const response = await fetchWrapper.patch(USER_ENDPOINTS.TOGGLE_STATUS(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user orders (Admin only)
   * @param {string} id - User ID
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} - API response with user orders
   */
  getUserOrders: async (id, params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(USER_ENDPOINTS.GET_ORDERS(id), cleanParams);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user statistics (Admin only)
   * @returns {Promise} - API response with user stats
   */
  getStats: async () => {
    try {
      const response = await fetchWrapper.get(USER_ENDPOINTS.GET_STATS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search users (Admin only)
   * @param {string} query - Search term
   * @param {Object} params - Additional filters
   * @returns {Promise} - API response with matching users
   */
  search: async (query, params = {}) => {
    try {
      const response = await userService.getAll({
        search: query,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get users by role (Admin only)
   * @param {string} role - User role (customer, restaurant_owner, admin)
   * @param {Object} params - Additional filters
   * @returns {Promise} - API response with users
   */
  getByRole: async (role, params = {}) => {
    try {
      const response = await userService.getAll({
        role,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get active users (Admin only)
   * @param {Object} params - Additional filters
   * @returns {Promise} - API response with active users
   */
  getActive: async (params = {}) => {
    try {
      const response = await userService.getAll({
        isActive: true,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get inactive users (Admin only)
   * @param {Object} params - Additional filters
   * @returns {Promise} - API response with inactive users
   */
  getInactive: async (params = {}) => {
    try {
      const response = await userService.getAll({
        isActive: false,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;