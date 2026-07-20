/**
 * Application Constants
 * Central place for all app-wide constants
 */

// ORDER STATUS
const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Status transition rules (which statuses can transition to which)
const ORDER_STATUS_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.CONFIRMED]: [ORDER_STATUS.PREPARING, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PREPARING]: [ORDER_STATUS.READY, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.READY]: [ORDER_STATUS.OUT_FOR_DELIVERY],
  [ORDER_STATUS.OUT_FOR_DELIVERY]: [ORDER_STATUS.DELIVERED],
  [ORDER_STATUS.DELIVERED]: [],
  [ORDER_STATUS.CANCELLED]: [],
};

// PAYMENT METHODS
const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: 'cash_on_delivery',
  CARD: 'card',
  ONLINE_BANKING: 'online_banking',
};

// PAYMENT STATUS
const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// USER ROLES
const USER_ROLES = {
  CUSTOMER: 'customer',
  RESTAURANT_OWNER: 'restaurant_owner',
  ADMIN: 'admin',
};

// APP CONSTANTS
const APP_CONSTANTS = {
  TAX_RATE: 0.10, // 10% tax
  DELIVERY_FEE: 100, // Default delivery fee in Rs
  MIN_ORDER_AMOUNT: 300, // Minimum order amount in Rs
  MAX_CART_ITEMS: 50, // Maximum items per order
};

// MENU CATEGORIES
const MENU_CATEGORIES = [
  'Pizza',
  'Burgers',
  'Biryani',
  'Beverages',
  'Desserts',
  'Appetizers',
  'Main Course',
  'Fast Food',
  'Sandwiches',
  'Salads',
  'Seafood',
  'BBQ',
  'Chinese',
  'Italian',
  'Mexican',
];

// CUISINE TYPES
const CUISINE_TYPES = [
  'Italian',
  'Pakistani',
  'Chinese',
  'Mexican',
  'Japanese',
  'Thai',
  'Indian',
  'Turkish',
  'American',
  'Fast Food',
  'Seafood',
  'BBQ',
  'Vegan',
  'Vegetarian',
];

// ADDRESS TYPES
const ADDRESS_TYPES = {
  HOME: 'home',
  OFFICE: 'office',
  OTHER: 'other',
};

// HTTP STATUS CODES
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

// SORTING OPTIONS
const SORT_OPTIONS = {
  RESTAURANTS: {
    RATING: 'rating',
    DELIVERY_TIME: 'deliveryTime',
    NAME: 'name',
    RELEVANCE: 'relevance',
  },
  ORDERS: {
    NEWEST: 'newest',
    OLDEST: 'oldest',
    HIGHEST_AMOUNT: 'highest',
    LOWEST_AMOUNT: 'lowest',
  },
};

// EXPORT ALL
module.exports = {
  ORDER_STATUS,
  ORDER_STATUS_TRANSITIONS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  USER_ROLES,
  APP_CONSTANTS,
  MENU_CATEGORIES,
  CUISINE_TYPES,
  ADDRESS_TYPES,
  HTTP_STATUS,
  SORT_OPTIONS,
};