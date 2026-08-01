/**
 * orderService.js - Order Service
 * Handles all order-related API calls
 */

import fetchWrapper from '../helpers/fetchWrapper';
import { ORDER_ENDPOINTS } from '../utils/api';

// Order Service
export const orderService = {
  /**
   * Place a new order
   * @param {Object} orderData - Order data
   * @param {string} orderData.restaurantId - Restaurant ID
   * @param {Array} orderData.items - Order items [{menuItemId, quantity}]
   * @param {Object} orderData.deliveryAddress - Delivery address
   * @param {string} orderData.deliveryPhone - Delivery phone
   * @param {string} orderData.paymentMethod - Payment method
   * @param {string} orderData.notes - Additional notes
   * @param {string} orderData.couponCode - Coupon code (optional)
   * @returns {Promise} - API response with created order
   */
  placeOrder: async (orderData) => {
    try {
      const response = await fetchWrapper.post(ORDER_ENDPOINTS.PLACE, orderData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all orders for current user
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status
   * @param {string} params.startDate - Start date filter
   * @param {string} params.endDate - End date filter
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} - API response with orders
   */
  getAll: async (params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(ORDER_ENDPOINTS.GET_ALL, cleanParams);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single order by ID
   * @param {string} id - Order ID
   * @returns {Promise} - API response with order details
   */
  getById: async (id) => {
    try {
      const response = await fetchWrapper.get(ORDER_ENDPOINTS.GET_ONE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get order status
   * @param {string} id - Order ID
   * @returns {Promise} - API response with order status
   */
  getStatus: async (id) => {
    try {
      const response = await orderService.getById(id);
      return {
        success: response.success,
        status: response.data?.order?.status || 'unknown',
        order: response.data?.order,
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update order status (Admin/Restaurant Owner)
   * @param {string} id - Order ID
   * @param {string} status - New status
   * @param {Object} data - Additional data (delivery person info)
   * @returns {Promise} - API response with updated order
   */
  updateStatus: async (id, status, data = {}) => {
    try {
      const response = await fetchWrapper.put(
        ORDER_ENDPOINTS.UPDATE_STATUS(id),
        { status, ...data }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancel order
   * @param {string} id - Order ID
   * @param {string} reason - Cancellation reason
   * @returns {Promise} - API response with cancelled order
   */
  cancel: async (id, reason = '') => {
    try {
      const response = await fetchWrapper.delete(ORDER_ENDPOINTS.CANCEL(id), {
        data: { reason },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get restaurant orders (Restaurant Owner)
   * @param {string} restaurantId - Restaurant ID
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status
   * @param {string} params.startDate - Start date filter
   * @param {string} params.endDate - End date filter
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} - API response with orders
   */
  getRestaurantOrders: async (restaurantId, params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      
      const response = await fetchWrapper.get(
        ORDER_ENDPOINTS.GET_RESTAURANT_ORDERS(restaurantId),
        cleanParams
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get order statistics (Admin/Restaurant Owner)
   * @param {string} restaurantId - Restaurant ID (optional)
   * @returns {Promise} - API response with order stats
   */
  getStats: async (restaurantId = null) => {
    try {
      const params = restaurantId ? { restaurantId } : {};
      const response = await fetchWrapper.get(ORDER_ENDPOINTS.GET_STATS, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get order history with filters
   * @param {Object} filters - Filter options
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise} - API response with filtered orders
   */
  getOrderHistory: async (filters = {}, page = 1, limit = 10) => {
    try {
      const response = await orderService.getAll({
        ...filters,
        page,
        limit,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;