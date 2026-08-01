/**
 * authService.js - Authentication Service
 * Handles all authentication-related API calls
 */

import fetchWrapper from '../helpers/fetchWrapper';
import { AUTH_ENDPOINTS } from '../utils/api';

// Auth Service
export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - Full name
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password
   * @param {string} userData.passwordConfirm - Password confirmation
   * @param {string} userData.phone - Phone number
   * @param {string} userData.role - User role (default: 'customer')
   * @returns {Promise} - API response
   */
  signup: async (userData) => {
    try {
      const response = await fetchWrapper.post(AUTH_ENDPOINTS.SIGNUP, userData, {
        includeAuth: false,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - API response with token and user data
   */
  login: async (email, password) => {
    try {
      const response = await fetchWrapper.post(
        AUTH_ENDPOINTS.LOGIN,
        { email, password },
        { includeAuth: false }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user (client-side only, token removal handled in context)
   * @returns {Object} - Success response
   */
  logout: () => {
    return { success: true, message: 'Logged out successfully' };
  },

  /**
   * Get current user profile
   * @returns {Promise} - API response with user data
   */
  getProfile: async () => {
    try {
      const response = await fetchWrapper.get(AUTH_ENDPOINTS.PROFILE);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @param {string} profileData.name - Full name
   * @param {string} profileData.phone - Phone number
   * @param {string} profileData.profileImage - Profile image URL
   * @returns {Promise} - API response with updated user
   */
  updateProfile: async (profileData) => {
    try {
      const response = await fetchWrapper.put(AUTH_ENDPOINTS.UPDATE_PROFILE, profileData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} - API response
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await fetchWrapper.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Add new address
   * @param {Object} addressData - Address data
   * @param {string} addressData.type - Address type (home, office, other)
   * @param {string} addressData.address - Street address
   * @param {string} addressData.city - City
   * @param {string} addressData.zipCode - ZIP code
   * @param {boolean} addressData.isDefault - Set as default
   * @returns {Promise} - API response with updated user
   */
  addAddress: async (addressData) => {
    try {
      const response = await fetchWrapper.post(AUTH_ENDPOINTS.ADD_ADDRESS, addressData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update address
   * @param {string} addressId - Address ID
   * @param {Object} addressData - Address data to update
   * @returns {Promise} - API response with updated user
   */
  updateAddress: async (addressId, addressData) => {
    try {
      const response = await fetchWrapper.put(
        `${AUTH_ENDPOINTS.ADD_ADDRESS}/${addressId}`,
        addressData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete address
   * @param {string} addressId - Address ID
   * @returns {Promise} - API response
   */
  deleteAddress: async (addressId) => {
    try {
      const response = await fetchWrapper.delete(
        `${AUTH_ENDPOINTS.ADD_ADDRESS}/${addressId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Forgot password - Request reset
   * @param {string} email - User email
   * @returns {Promise} - API response
   */
  forgotPassword: async (email) => {
    try {
      const response = await fetchWrapper.post(
        `${AUTH_ENDPOINTS.SIGNUP}/forgot-password`,
        { email },
        { includeAuth: false }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} password - New password
   * @param {string} passwordConfirm - Password confirmation
   * @returns {Promise} - API response
   */
  resetPassword: async (token, password, passwordConfirm) => {
    try {
      const response = await fetchWrapper.post(
        `${AUTH_ENDPOINTS.SIGNUP}/reset-password`,
        { token, password, passwordConfirm },
        { includeAuth: false }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;