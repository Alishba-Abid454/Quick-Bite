/**
 * Response Helper
 * Standardized API responses for consistency
 */

const { HTTP_STATUS } = require('../utils/constants');

/**
 * Send success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {any} data - Response data
 * @param {string} message - Success message
 * @returns {object} - Express response
 */
const successResponse = (res, statusCode = HTTP_STATUS.OK, data = null, message = 'Success') => {
  const response = {
    success: true,
    message,
    ...(data !== null && { data }), //Only include data if it's not null
    timestamp: new Date().toISOString(),
  };

  return res.status(statusCode).json(response);
};

/**
 * Send error response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {any} error - Additional error details (only in development)
 * @returns {object} - Express response
 */
const errorResponse = (res, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, message = 'Something went wrong', error = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && error && { error: error.message || error }),
    ...(process.env.NODE_ENV === 'development' && error && error.stack && { stack: error.stack }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Send paginated response
 * @param {object} res - Express response object
 * @param {Array} data - Paginated data
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items count
 * @param {string} message - Success message
 * @returns {object} - Express response
 */
const paginatedResponse = (res, data, page, limit, total, message = 'Data fetched successfully') => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const response = {
    success: true,
    message,
    data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages,
      hasNext,
      hasPrev,
      nextPage: hasNext ? page + 1 : null,
      prevPage: hasPrev ? page - 1 : null,
    },
    timestamp: new Date().toISOString(),
  };

  return res.status(HTTP_STATUS.OK).json(response);
};

/**
 * Send created response (201)
 * @param {object} res - Express response object
 * @param {any} data - Created data
 * @param {string} message - Success message
 * @returns {object} - Express response
 */
const createdResponse = (res, data = null, message = 'Resource created successfully') => {
  return successResponse(res, HTTP_STATUS.CREATED, data, message);
};

/**
 * Send no content response (204)
 * @param {object} res - Express response object
 * @returns {object} - Express response
 */
const noContentResponse = (res) => {
  return res.status(HTTP_STATUS.NO_CONTENT).send();
};

/**
 * Send validation error response (422)
 * @param {object} res - Express response object
 * @param {Array} errors - Validation errors
 * @param {string} message - Error message
 * @returns {object} - Express response
 */
const validationErrorResponse = (res, errors = [], message = 'Validation failed') => {
  const response = {
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  };

  return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(response);
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
  createdResponse,
  noContentResponse,
  validationErrorResponse,
};