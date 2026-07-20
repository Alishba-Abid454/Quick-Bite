/**
 * Error Handling Middleware
 * Centralized error handling for the application
 */

const { HTTP_STATUS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');

/**
 * 404 Not Found handler
 */
const notFound = (req, res, next) => {
  const error = new ApiError(HTTP_STATUS.NOT_FOUND, `Route ${req.originalUrl} not found`);
  next(error); //Pass to error handler
};

/**
 * Global error handler
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('❌ Error:', err);

  // Mongoose Specific Errors

  // 1. Validation Error
  if (err.name === 'ValidationError') { //Check if error is from Mongoose validation
    const errors = Object.values(err.errors).map((val) => ({ //object.values - Get all validation errors
        // .map -- convert to readable format
        field: val.path,
      message: val.message,
    }));
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed',
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  // 2. MongoDB Duplicate Key Error (MongoDB 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]; //err.keyPattern -- Which field caused the duplicate
    const message = `${field} already exists`;
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message,
      field,
      timestamp: new Date().toISOString(),
    });
  }
//const user1 = new User({ email: 'john@email.com' }); // Success
//const user2 = new User({ email: 'john@email.com' }); // Duplicate!
// Error code: 11000


  // 3. Cast Error (Invalid ObjectId)
  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}: ${err.value}`; //err.path -- Which field had invalid value
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message,
      field: err.path,
      timestamp: new Date().toISOString(),
    });
  }

  // 4. Mongoose Document Not Found
  if (err.name === 'DocumentNotFoundError') {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: 'Document not found',
      timestamp: new Date().toISOString(),
    });
  }

  // JWT Errors(Token is invalid/fake)

  if (err.name === 'JsonWebTokenError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid token',
      timestamp: new Date().toISOString(),
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Token expired',
      timestamp: new Date().toISOString(),
    });
  }

  // Custom ApiError

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        ...(err.isOperational && { isOperational: true }),
      }),
      timestamp: new Date().toISOString(),
    });
  }

  // Default: Internal Server Error

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err,
    }),
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  notFound,
  errorHandler,
};