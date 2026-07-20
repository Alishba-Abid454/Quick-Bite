/**
 * Custom Error Class for API Errors
 * Extends native Error with status code
 */

class ApiError extends Error {
  /**
   * Create a new API error
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {boolean} isOperational - Is this an operational error?
   * @param {string} stack - Optional stack trace
   */
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message); //Calls the parent Error class with the message
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    // Capture stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
      // creates a stack trace (a list of where the error happened) and attaches it to your error object.
    }
  }

  /**
   * Convert error to JSON
   */
  toJSON() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: this.stack }),
    };
  }

  /**
   * Create a Bad Request error (400)
   */
  static badRequest(message = 'Bad Request') {
    return new ApiError(400, message);
  }

  /**
   * Create an Unauthorized error (401)
   */
  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  /**
   * Create a Forbidden error (403)
   */
  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  /**
   * Create a Not Found error (404)
   */
  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  /**
   * Create a Conflict error (409)
   */
  static conflict(message = 'Conflict') {
    return new ApiError(409, message);
  }

  /**
   * Create an Unprocessable Entity error (422)
   */
  static unprocessable(message = 'Unprocessable Entity') {
    return new ApiError(422, message);
  }

  /**
   * Create an Internal Server Error (500)
   */
  static internal(message = 'Internal Server Error') {
    return new ApiError(500, message, true);
  }
}

module.exports = ApiError;