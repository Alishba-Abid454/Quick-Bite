/**
 * API Endpoints
 * Central place for all API endpoint URLs
 */

// Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api';

const API_URL = `${API_BASE_URL}${API_PREFIX}`;

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  SIGNUP: `${API_URL}/auth/signup`,
  LOGIN: `${API_URL}/auth/login`,
  LOGOUT: `${API_URL}/auth/logout`,
  PROFILE: `${API_URL}/auth/profile`,
  UPDATE_PROFILE: `${API_URL}/auth/profile`,
  CHANGE_PASSWORD: `${API_URL}/auth/change-password`,
  ADD_ADDRESS: `${API_URL}/auth/address`,
};

// Restaurant Endpoints
export const RESTAURANT_ENDPOINTS = {
  GET_ALL: `${API_URL}/restaurants`,
  GET_ONE: (id) => `${API_URL}/restaurants/${id}`,
  CREATE: `${API_URL}/restaurants`,
  UPDATE: (id) => `${API_URL}/restaurants/${id}`,
  DELETE: (id) => `${API_URL}/restaurants/${id}`,
  GET_MENU: (id) => `${API_URL}/restaurants/${id}/menu`,
  GET_REVIEWS: (id) => `${API_URL}/restaurants/${id}/reviews`,
};

// Menu Endpoints
export const MENU_ENDPOINTS = {
  GET_ALL: `${API_URL}/menu`,
  GET_ONE: (id) => `${API_URL}/menu/${id}`,
  CREATE: `${API_URL}/menu`,
  UPDATE: (id) => `${API_URL}/menu/${id}`,
  DELETE: (id) => `${API_URL}/menu/${id}`,
  TOGGLE_AVAILABILITY: (id) => `${API_URL}/menu/${id}/toggle-availability`,
  GET_POPULAR: `${API_URL}/menu/popular`,
  GET_BY_CATEGORY: (category) => `${API_URL}/menu/category/${category}`,
};

// Order Endpoints
export const ORDER_ENDPOINTS = {
  PLACE: `${API_URL}/orders`,
  GET_ALL: `${API_URL}/orders`,
  GET_ONE: (id) => `${API_URL}/orders/${id}`,
  UPDATE_STATUS: (id) => `${API_URL}/orders/${id}/status`,
  CANCEL: (id) => `${API_URL}/orders/${id}`,
  GET_STATS: `${API_URL}/orders/stats`,
  GET_RESTAURANT_ORDERS: (id) => `${API_URL}/orders/restaurant/${id}`,
};

// Review Endpoints
export const REVIEW_ENDPOINTS = {
  SUBMIT: `${API_URL}/reviews`,
  GET_ALL: `${API_URL}/reviews`,
  GET_ONE: (id) => `${API_URL}/reviews/${id}`,
  UPDATE: (id) => `${API_URL}/reviews/${id}`,
  DELETE: (id) => `${API_URL}/reviews/${id}`,
  GET_BY_RESTAURANT: (id) => `${API_URL}/reviews/restaurant/${id}`,
  MARK_HELPFUL: (id) => `${API_URL}/reviews/${id}/helpful`,
  UNMARK_HELPFUL: (id) => `${API_URL}/reviews/${id}/helpful`,
  GET_STATS: (id) => `${API_URL}/reviews/stats/${id}`,
};

// User Endpoints
export const USER_ENDPOINTS = {
  GET_ALL: `${API_URL}/users`,
  GET_ONE: (id) => `${API_URL}/users/${id}`,
  UPDATE: (id) => `${API_URL}/users/${id}`,
  DELETE: (id) => `${API_URL}/users/${id}`,
  TOGGLE_STATUS: (id) => `${API_URL}/users/${id}/toggle-status`,
  GET_ORDERS: (id) => `${API_URL}/users/${id}/orders`,
  GET_STATS: `${API_URL}/users/stats`,
};

export default {
  API_URL,
  AUTH_ENDPOINTS,
  RESTAURANT_ENDPOINTS,
  MENU_ENDPOINTS,
  ORDER_ENDPOINTS,
  REVIEW_ENDPOINTS,
  USER_ENDPOINTS,
};