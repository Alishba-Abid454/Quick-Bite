/**
 * Application Constants
 * Central place for all app-wide constants
 */

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_ICONS = {
  pending: '🕒',
  confirmed: '✅',
  preparing: '👨‍🍳',
  ready: '📦',
  out_for_delivery: '🚚',
  delivered: '🎉',
  cancelled: '❌',
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Order Placed',
  [ORDER_STATUS.CONFIRMED]: 'Order Confirmed',
  [ORDER_STATUS.PREPARING]: 'Preparing Your Food',
  [ORDER_STATUS.READY]: 'Food is Ready',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#F59E0B',          // Amber
  [ORDER_STATUS.CONFIRMED]: '#3B82F6',        // Blue
  [ORDER_STATUS.PREPARING]: '#8B5CF6',        // Purple
  [ORDER_STATUS.READY]: '#10B981',            // Emerald Green
  [ORDER_STATUS.OUT_FOR_DELIVERY]: '#FF6B35', // Brand Orange
  [ORDER_STATUS.DELIVERED]: '#22C55E',        // Green
  [ORDER_STATUS.CANCELLED]: '#EF4444',        // Red
};

// Payment Methods
export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: 'cash_on_delivery',
  CARD: 'card',
  ONLINE_BANKING: 'online_banking',
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CASH_ON_DELIVERY]: 'Cash on Delivery',
  [PAYMENT_METHODS.CARD]: 'Card Payment',
  [PAYMENT_METHODS.ONLINE_BANKING]: 'Online Banking',
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  RESTAURANT_OWNER: 'restaurant_owner',
  ADMIN: 'admin',
};

// App Constants
export const APP_CONSTANTS = {
  TAX_RATE: 0.10,
  DELIVERY_FEE: 100,
  MIN_ORDER_AMOUNT: 300,
  APP_NAME: 'Food Ordering App',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'food_app_token',
  USER: 'food_app_user',
  CART: 'food_app_cart',
  THEME: 'food_app_theme',
};

// API Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

// Regex Patterns
export const REGEX = {
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  PHONE: /^(\+92|0)?[3][0-9]{9}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
};