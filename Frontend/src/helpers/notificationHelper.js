/**
 * notificationHelper.js - Toast Notifications
 * Wrapper for toast notifications using react-toastify
 */

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast Configuration
const defaultOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

// Notification Functions

/**
 * Show success toast
 * @param {string} message - Toast message
 * @param {object} options - Additional options
 */
export const showSuccess = (message, options = {}) => {
  toast.success(message, { ...defaultOptions, ...options });
};

/**
 * Show error toast
 * @param {string} message - Toast message
 * @param {object} options - Additional options
 */
export const showError = (message, options = {}) => {
  toast.error(message, { ...defaultOptions, ...options });
};

/**
 * Show warning toast
 * @param {string} message - Toast message
 * @param {object} options - Additional options
 */
export const showWarning = (message, options = {}) => {
  toast.warning(message, { ...defaultOptions, ...options });
};

/**
 * Show info toast
 * @param {string} message - Toast message
 * @param {object} options - Additional options
 */
export const showInfo = (message, options = {}) => {
  toast.info(message, { ...defaultOptions, ...options });
};

/**
 * Show loading toast (returns toast id for updates)
 * @param {string} message - Toast message
 * @param {object} options - Additional options
 * @returns {string} - Toast ID
 */
export const showLoading = (message, options = {}) => {
  return toast.loading(message, { ...defaultOptions, autoClose: false, ...options });
};

/**
 * Update loading toast
 * @param {string} id - Toast ID
 * @param {string} message - New message
 * @param {string} type - Toast type (success, error, warning, info)
 * @param {object} options - Additional options
 */
export const updateToast = (id, message, type = 'info', options = {}) => {
  const toastOptions = {
    ...defaultOptions,
    ...options,
    isLoading: false,
    autoClose: 3000,
  };

  switch (type) {
    case 'success':
      toast.update(id, { render: message, type: toast.TYPE.SUCCESS, ...toastOptions });
      break;
    case 'error':
      toast.update(id, { render: message, type: toast.TYPE.ERROR, ...toastOptions });
      break;
    case 'warning':
      toast.update(id, { render: message, type: toast.TYPE.WARNING, ...toastOptions });
      break;
    default:
      toast.update(id, { render: message, type: toast.TYPE.INFO, ...toastOptions });
      break;
  }
};

/**
 * Dismiss toast
 * @param {string} id - Toast ID (optional, dismisses all if not provided)
 */
export const dismissToast = (id) => {
  if (id) {
    toast.dismiss(id);
  } else {
    toast.dismiss();
  }
};

// Helper to show API error

/**
 * Show API error notification
 * @param {object} error - Error object from API
 * @param {string} fallbackMessage - Fallback message if error has no message
 */
export const showApiError = (error, fallbackMessage = 'Something went wrong') => {
  const message = error?.response?.data?.message || 
                  error?.message || 
                  error?.data?.message || 
                  fallbackMessage;
  showError(message);
};

/**
 * Show success notification for API response
 * @param {object} response - API response
 * @param {string} fallbackMessage - Fallback message
 */
export const showApiSuccess = (response, fallbackMessage = 'Success') => {
  const message = response?.message || fallbackMessage;
  showSuccess(message);
};

export default {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showLoading,
  updateToast,
  dismissToast,
  showApiError,
  showApiSuccess,
};