/**
 * fetchWrapper.js - HTTP Request Wrapper
 * Handles all API calls with authentication, error handling, and interceptors
 */

import { STORAGE_KEYS } from '../utils/constants';

// Base Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api';
const BASE_URL = `${API_BASE_URL}${API_PREFIX}`;

// Request Interceptor
const getHeaders = (includeAuth = true, customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...customHeaders,
  };

  if (includeAuth) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

// Handle Response

const handleResponse = async (response) => { // Response Received ->Parse response body JSON or Text -> Check Status                                     
  // Get response data
  let data;
  const contentType = response.headers.get('content-type');
  
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  // Handle 401 Unauthorized - Token expired
  if (response.status === 401) {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    // Redirect to login (handled by router)
    window.location.href = '/login';
    return Promise.reject({ 
      status: 401, 
      message: 'Session expired. Please login again.',
      data 
    });
  }

  // Handle 403 Forbidden
  if (response.status === 403) {
    return Promise.reject({ 
      status: 403, 
      message: data?.message || 'You do not have permission to perform this action.',
      data 
    });
  }

  // Handle 404 Not Found
  if (response.status === 404) {
    return Promise.reject({ 
      status: 404, 
      message: data?.message || 'Resource not found.',
      data 
    });
  }

  // Handle 422 Validation Error
  if (response.status === 422) {
    return Promise.reject({ 
      status: 422, 
      message: data?.message || 'Validation failed.',
      errors: data?.errors || data?.data || [],
      data 
    });
  }

  // Handle other error statuses
  if (!response.ok) {
    return Promise.reject({ 
      status: response.status, 
      message: data?.message || data || 'Something went wrong.',
      data 
    });
  }

  return data;
};

// HTTP Methods

/**
 * GET request
 * @param {string} url - Endpoint URL
 * @param {Object} params - Query parameters
 * @param {Object} options - Additional options
 * @returns {Promise} - Response data
 */
const get = async (url, params = {}, options = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: getHeaders(options.includeAuth !== false, options.headers),
    ...options,
  });

  return handleResponse(response);
};

/**
 * POST request
 * @param {string} url - Endpoint URL
 * @param {Object} data - Request body
 * @param {Object} options - Additional options
 * @returns {Promise} - Response data
 */
const post = async (url, data = {}, options = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(options.includeAuth !== false, options.headers),
    body: JSON.stringify(data),
    ...options,
  });

  return handleResponse(response);
};

/**
 * PUT request
 * @param {string} url - Endpoint URL
 * @param {Object} data - Request body
 * @param {Object} options - Additional options
 * @returns {Promise} - Response data
 */
const put = async (url, data = {}, options = {}) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: getHeaders(options.includeAuth !== false, options.headers),
    body: JSON.stringify(data),
    ...options,
  });

  return handleResponse(response);
};

/**
 * PATCH request
 * @param {string} url - Endpoint URL
 * @param {Object} data - Request body
 * @param {Object} options - Additional options
 * @returns {Promise} - Response data
 */
const patch = async (url, data = {}, options = {}) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders(options.includeAuth !== false, options.headers),
    body: JSON.stringify(data),
    ...options,
  });

  return handleResponse(response);
};

/**
 * DELETE request
 * @param {string} url - Endpoint URL
 * @param {Object} options - Additional options
 * @returns {Promise} - Response data
 */
const del = async (url, options = {}) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(options.includeAuth !== false, options.headers),
    ...options,
  });

  return handleResponse(response);
};

/**
 * File Upload (multipart/form-data)
 * @param {string} url - Endpoint URL
 * @param {FormData} formData - Form data with file
 * @param {Object} options - Additional options
 * @returns {Promise} - Response data
 */
const upload = async (url, formData, options = {}) => {
  const headers = getHeaders(options.includeAuth !== false, options.headers);
  // Remove Content-Type for FormData (browser will set it with boundary)
  delete headers['Content-Type'];

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
    ...options,
  });

  return handleResponse(response);
};

export const fetchWrapper = {
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
  BASE_URL,
};

export default fetchWrapper;