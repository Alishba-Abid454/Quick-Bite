/**
 * restaurantService.js - Restaurant Service
 * Handles all restaurant-related API calls
 */

import fetchWrapper from '../helpers/fetchWrapper';
import { RESTAURANT_ENDPOINTS } from '../utils/api';

// Restaurant Service
export const restaurantService = {
  /**
   * Get all restaurants with filters
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search term
   * @param {string} params.cuisine - Cuisine type
   * @param {string} params.city - City name
   * @param {number} params.minRating - Minimum rating
   * @param {boolean} params.isOpen - Open status
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.sortBy - Sort field
   * @returns {Promise} - API response with restaurants
   */
  getAll: async (params = {}) => {
    try {
      // Remove undefined values
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(RESTAURANT_ENDPOINTS.GET_ALL, cleanParams);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single restaurant by ID
   * @param {string} id - Restaurant ID
   * @returns {Promise} - API response with restaurant data
   */
  getById: async (id) => {
    try {
      const response = await fetchWrapper.get(RESTAURANT_ENDPOINTS.GET_ONE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search restaurants
   * @param {string} query - Search query
   * @param {Object} params - Additional filters
   * @returns {Promise} - API response with matching restaurants
   */
  search: async (query, params = {}) => {
    try {
      const response = await restaurantService.getAll({
        search: query,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get restaurants by cuisine
   * @param {string} cuisine - Cuisine type
   * @param {Object} params - Additional filters
   * @returns {Promise} - API response with restaurants
   */
  getByCuisine: async (cuisine, params = {}) => {
    try {
      const response = await restaurantService.getAll({
        cuisine,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get top rated restaurants
   * @param {number} limit - Number of restaurants
   * @returns {Promise} - API response with top restaurants
   */
  getTopRated: async (limit = 10) => {
    try {
      const response = await restaurantService.getAll({
        sortBy: 'rating',
        limit,
        minRating: 4,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get nearby restaurants
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {number} radius - Search radius in km
   * @param {Object} params - Additional filters
   * @returns {Promise} - API response with nearby restaurants
   */
  getNearby: async (lat, lng, radius = 10, params = {}) => {
    try {
      const response = await restaurantService.getAll({
        lat,
        lng,
        radius,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new restaurant (Admin/Restaurant Owner)
   * @param {Object} restaurantData - Restaurant data
   * @returns {Promise} - API response with created restaurant
   */
  create: async (restaurantData) => {
    try {
      const response = await fetchWrapper.post(RESTAURANT_ENDPOINTS.CREATE, restaurantData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update restaurant (Admin/Restaurant Owner)
   * @param {string} id - Restaurant ID
   * @param {Object} restaurantData - Restaurant data to update
   * @returns {Promise} - API response with updated restaurant
   */
  update: async (id, restaurantData) => {
    try {
      const response = await fetchWrapper.put(RESTAURANT_ENDPOINTS.UPDATE(id), restaurantData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete restaurant (Admin only)
   * @param {string} id - Restaurant ID
   * @returns {Promise} - API response
   */
  delete: async (id) => {
    try {
      const response = await fetchWrapper.delete(RESTAURANT_ENDPOINTS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get restaurant menu
   * @param {string} id - Restaurant ID
   * @param {Object} params - Query parameters
   * @param {string} params.category - Category filter
   * @param {boolean} params.available - Availability filter
   * @param {number} params.minPrice - Minimum price
   * @param {number} params.maxPrice - Maximum price
   * @param {string} params.sortBy - Sort field
   * @returns {Promise} - API response with menu items
   */
  getMenu: async (id, params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(RESTAURANT_ENDPOINTS.GET_MENU(id), cleanParams);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get restaurant reviews
   * @param {string} id - Restaurant ID
   * @param {Object} params - Query parameters
   * @param {number} params.rating - Rating filter
   * @param {boolean} params.hasComment - Has comment filter
   * @param {string} params.sortBy - Sort field
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} - API response with reviews
   */
  getReviews: async (id, params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(RESTAURANT_ENDPOINTS.GET_REVIEWS(id), cleanParams);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default restaurantService;