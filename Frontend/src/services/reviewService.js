/**
 * reviewService.js - Review Service
 * Handles all review-related API calls
 */

import fetchWrapper from '../helpers/fetchWrapper';
import { REVIEW_ENDPOINTS } from '../utils/api';

// Review Service
export const reviewService = {
  /**
   * Submit a review for an order
   * @param {Object} reviewData - Review data
   * @param {string} reviewData.orderId - Order ID
   * @param {number} reviewData.rating - Overall rating (1-5)
   * @param {string} reviewData.comment - Review comment
   * @param {number} reviewData.foodQuality - Food quality rating (1-5)
   * @param {number} reviewData.deliverySpeed - Delivery speed rating (1-5)
   * @param {number} reviewData.packaging - Packaging rating (1-5)
   * @param {number} reviewData.valueForMoney - Value for money rating (1-5)
   * @param {Array} reviewData.images - Review images (optional)
   * @returns {Promise} - API response with created review
   */
  submit: async (reviewData) => {
    try {
      const response = await fetchWrapper.post(REVIEW_ENDPOINTS.SUBMIT, reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all reviews for current user
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} - API response with reviews
   */
  getMyReviews: async (params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(REVIEW_ENDPOINTS.GET_ALL, cleanParams);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single review by ID
   * @param {string} id - Review ID
   * @returns {Promise} - API response with review
   */
  getById: async (id) => {
    try {
      const response = await fetchWrapper.get(REVIEW_ENDPOINTS.GET_ONE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get reviews for a restaurant
   * @param {string} restaurantId - Restaurant ID
   * @param {Object} params - Query parameters
   * @param {number} params.rating - Filter by rating
   * @param {boolean} params.hasComment - Filter by comment
   * @param {string} params.sortBy - Sort field
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} - API response with reviews
   */
  getRestaurantReviews: async (restaurantId, params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(
        REVIEW_ENDPOINTS.GET_BY_RESTAURANT(restaurantId),
        cleanParams
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get review statistics for a restaurant
   * @param {string} restaurantId - Restaurant ID
   * @returns {Promise} - API response with review stats
   */
  getStats: async (restaurantId) => {
    try {
      const response = await fetchWrapper.get(REVIEW_ENDPOINTS.GET_STATS(restaurantId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a review
   * @param {string} id - Review ID
   * @param {Object} reviewData - Review data to update
   * @returns {Promise} - API response with updated review
   */
  update: async (id, reviewData) => {
    try {
      const response = await fetchWrapper.put(REVIEW_ENDPOINTS.UPDATE(id), reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a review
   * @param {string} id - Review ID
   * @returns {Promise} - API response
   */
  delete: async (id) => {
    try {
      const response = await fetchWrapper.delete(REVIEW_ENDPOINTS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mark a review as helpful
   * @param {string} id - Review ID
   * @returns {Promise} - API response with updated review
   */
  markHelpful: async (id) => {
    try {
      const response = await fetchWrapper.post(REVIEW_ENDPOINTS.MARK_HELPFUL(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Remove helpful mark from a review
   * @param {string} id - Review ID
   * @returns {Promise} - API response with updated review
   */
  unmarkHelpful: async (id) => {
    try {
      const response = await fetchWrapper.delete(REVIEW_ENDPOINTS.UNMARK_HELPFUL(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check if user has reviewed an order
   * @param {string} orderId - Order ID
   * @returns {Promise} - API response with review status
   */
  hasReviewed: async (orderId) => {
    try {
      const response = await fetchWrapper.get(`${REVIEW_ENDPOINTS.SUBMIT}/check/${orderId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default reviewService;