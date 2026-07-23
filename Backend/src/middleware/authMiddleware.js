/**
 * Authentication Middleware
 * Handles JWT verification and user authorization
 */

const { verifyToken, extractTokenFromHeader } = require('../helpers/jwtHelper');
const User = require('../models/User');
const { errorResponse } = require('../helpers/responseHelper');
const { HTTP_STATUS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');

/**
 * Protect routes - Verify JWT token and attach user to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const protect = async (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return errorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        'Not authorized. Please login to access this resource.'
      );
    }

    // 2. Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return errorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        'Invalid or expired token. Please login again.'
      );
    }

    // 3. Check if user exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return errorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        'User no longer exists. Please login again.'
      );
    }
// Scenario:
// 1. User gets token
// 2. Admin deletes the user
// 3. User tries to use old token
// 4. Token is valid BUT user doesn't exist

// Middleware checks:
// User.findById(decoded.id) → null
// ❌ Token invalid! User no longer exists.

    // 4. Check if user is active
    if (!user.isActive) {
      return errorResponse(
        res,
        HTTP_STATUS.FORBIDDEN,
        'Your account has been deactivated. Please contact support.'
      );
    }

    // 5. Check if password was changed after token was issued
    if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
      return errorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        'Password recently changed. Please login again.'
      );
    }

    // 6. Attach user to request
    req.user = user;
    next(); //Pass control to next middleware/route
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Authentication error',
      error
    );
  }
};

/**
 * Authorize based on user roles
 * @param  {...string} roles - Allowed roles
 * @returns {Function} - Middleware function
 */
const authorize = (...roles) => { //Spread operator - accepts multiple role names
  return (req, res, next) => {
    try {
      // Check if user exists on request
      if (!req.user) {
        return errorResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          'Not authorized. User not found.'
        );
      }

      // Check if user role is allowed
      if (!roles.includes(req.user.role)) {
        return errorResponse(
          res,
          HTTP_STATUS.FORBIDDEN,
          `Access denied. ${req.user.role} role is not authorized for this action.`
        );
      }

      next();
    } catch (error) {
      return errorResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'Authorization error',
        error
      );
    }
  };
};

/**
 * Check if user owns a resource
 * @param {Function} getResourceId - Function to extract resource ID from request
 * @param {Function} getUserId - Function to get user ID from resource
 * @param {string} resourceName - Name of resource for error message
 * @returns {Function} - Middleware function
 */
const checkOwnership = (getResourceId, getUserId, resourceName = 'resource') => {
  return async (req, res, next) => {
    try {
      const resourceId = getResourceId(req);
      const userId = req.user._id;

      // Get the resource (implementation depends on model)
      // This is a generic pattern - actual implementation will vary
      // For example: const resource = await Model.findById(resourceId);
      // if (!resource) return errorResponse(res, 404, `${resourceName} not found`);
      // if (getUserId(resource).toString() !== userId.toString()) {
      //   return errorResponse(res, 403, `You don't own this ${resourceName}`);
      // }

      next();
    } catch (error) {
      return errorResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        `Error checking ${resourceName} ownership`,
        error
      );
    }
  };
};

/**
 * Check if user is restaurant owner for a specific restaurant
 * @returns {Function} - Middleware function
 */
const isRestaurantOwner = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Restaurant ID is required'
      );
    }

    // Check if user is admin (admins can do everything)
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user owns the restaurant
    const Restaurant = require('../models/Restaurant');
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return errorResponse(
        res,
        HTTP_STATUS.NOT_FOUND,
        'Restaurant not found'
      );
    }

    if (restaurant.createdBy.toString() !== req.user._id.toString()) {
      return errorResponse(
        res,
        HTTP_STATUS.FORBIDDEN,
        'You are not the owner of this restaurant'
      );
    }

    // Attach restaurant to request for later use
    req.restaurant = restaurant;
    next();
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Error checking restaurant ownership',
      error
    );
  }
};

/**
 * Check if user can access an order
 * - Customer can access their own orders
 * - Restaurant owner can access orders for their restaurants
 * - Admin can access all orders
 * @returns {Function} - Middleware function
 */
const canAccessOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const Order = require('../models/Order');

    if (!orderId) {
      return errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Order ID is required'
      );
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return errorResponse(
        res,
        HTTP_STATUS.NOT_FOUND,
        'Order not found'
      );
    }

    // Admin can access everything
    if (req.user.role === 'admin') {
      req.order = order;
      return next();
    }

    // Customer can access their own orders
    if (req.user.role === 'customer') {
      if (order.userId.toString() !== req.user._id.toString()) {
        return errorResponse(
          res,
          HTTP_STATUS.FORBIDDEN,
          'You can only access your own orders'
        );
      }
      req.order = order;
      return next();
    }

    // Restaurant owner can access orders for their restaurants
    if (req.user.role === 'restaurant_owner') {
      const Restaurant = require('../models/Restaurant');
      const restaurant = await Restaurant.findById(order.restaurantId);

      if (!restaurant || restaurant.createdBy.toString() !== req.user._id.toString()) {
        return errorResponse(
          res,
          HTTP_STATUS.FORBIDDEN,
          'You can only access orders for your restaurants'
        );
      }
      req.order = order;
      return next();
    }

    return errorResponse(
      res,
      HTTP_STATUS.FORBIDDEN,
      'Access denied'
    );
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Error checking order access',
      error
    );
  }
};

/**
 * Rate limiter for API endpoints (simple version)
 * @param {Object} options - Rate limiter options
 * @returns {Function} - Middleware function
 */
const rateLimiter = (options = {}) => {
  const {
    windowMs = 60 * 1000, // 1 minute
    max = 10, // Max requests per window
    message = 'Too many requests, please try again later.'
  } = options;

  const requests = new Map();//Creates a Map (like a dictionary/object)

// Store data:
//requests.set('192.168.1.1', [1721567445, 1721567450, 1721567455]);
// Key: IP address → Value: Array of timestamps
// Get data:
//const userRequests = requests.get('192.168.1.1');
// Returns: [1721567445, 1721567450, 1721567455]

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    // Get existing requests for this IP
    let userRequests = requests.get(key) || [];

    // Remove expired requests
    userRequests = userRequests.filter(time => now - time < windowMs);

    // Check if limit exceeded
    if (userRequests.length >= max) {
      return errorResponse(
        res,
        HTTP_STATUS.TOO_MANY_REQUESTS,
        message,
        { retryAfter: Math.ceil(windowMs / 1000) }
      );
    }

    // Add current request
    userRequests.push(now);
    requests.set(key, userRequests);

    // Clean up old entries
    if (requests.size > 10000) {
      for (const [ip, times] of requests) {
        if (times.length === 0) {
          requests.delete(ip);// remove  from memory
        }
      }
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
  checkOwnership,
  isRestaurantOwner,
  canAccessOrder,
  rateLimiter,
};