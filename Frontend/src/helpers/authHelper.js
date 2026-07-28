/**
 * authHelper.js - Authentication Helpers
 * Token management, user validation, and auth utilities
 */

import { STORAGE_KEYS } from '../utils/constants';
import { getItem, setItem, removeItem } from './localStorageHelper';

// Token Management

/**
 * Get authentication token
 * @returns {string|null} - JWT token or null
 */
export const getToken = () => {
  return getItem(STORAGE_KEYS.TOKEN, null);
};

/**
 * Set authentication token
 * @param {string} token - JWT token
 * @returns {boolean} - Success status
 */
export const setToken = (token) => {
  return setItem(STORAGE_KEYS.TOKEN, token);
};

/**
 * Remove authentication token
 * @returns {boolean} - Success status
 */
export const removeToken = () => {
  return removeItem(STORAGE_KEYS.TOKEN);
};

// ============================================
// User Management
// ============================================

/**
 * Get stored user data
 * @returns {object|null} - User object or null
 */
export const getUser = () => {
  return getItem(STORAGE_KEYS.USER, null);
};

/**
 * Set user data
 * @param {object} user - User object
 * @returns {boolean} - Success status
 */
export const setUser = (user) => {
  return setItem(STORAGE_KEYS.USER, user);
};

/**
 * Remove user data
 * @returns {boolean} - Success status
 */
export const removeUser = () => {
  return removeItem(STORAGE_KEYS.USER);
};

// ============================================
// Auth Status
// ============================================

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Check if token is expired (JWT decode)
 * @param {string} token - JWT token
 * @returns {boolean} - True if expired
 */
export const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    
    // Decode JWT token (without verification)
    const base64Url = token.split('.')[1];
    if (!base64Url) return true;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const payload = JSON.parse(jsonPayload);
    const exp = payload.exp;
    
    if (!exp) return true;
    
    // Check if token is expired (exp is in seconds)
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (error) {
    console.error('Error checking token expiry:', error);
    return true;
  }
};

/**
 * Get user role from token or stored user
 * @returns {string} - User role (customer, restaurant_owner, admin)
 */
export const getUserRole = () => {
  const user = getUser();
  return user?.role || 'customer';
};

/**
 * Check if user is admin
 * @returns {boolean} - True if admin
 */
export const isAdmin = () => {
  return getUserRole() === 'admin';
};

/**
 * Check if user is restaurant owner
 * @returns {boolean} - True if restaurant owner
 */
export const isRestaurantOwner = () => {
  return getUserRole() === 'restaurant_owner';
};

/**
 * Check if user is customer
 * @returns {boolean} - True if customer
 */
export const isCustomer = () => {
  return getUserRole() === 'customer';
};

// ============================================
// Logout
// ============================================

/**
 * Clear all auth data (logout)
 * @returns {void}
 */
export const clearAuthData = () => {
  removeToken();
  removeUser();
};

// ============================================
// Header Helper
// ============================================

/**
 * Get authorization header for API requests
 * @returns {object} - Headers object with Authorization
 */
export const getAuthHeader = () => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// ============================================
// Export
// ============================================
export default {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
  isAuthenticated,
  isTokenExpired,
  getUserRole,
  isAdmin,
  isRestaurantOwner,
  isCustomer,
  clearAuthData,
  getAuthHeader,
};