/**
 * Route Path Constants
 * Central place for all route paths
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  RESTAURANT_DETAILS: '/restaurant/:id',

  // Protected Routes
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  PROFILE: '/profile',
  ORDER_SUCCESS: '/order-success/:id',
  ORDER_TRACKING: '/order-tracking/:id',

  // Admin Routes
  ADMIN: '/admin',
  ADMIN_RESTAURANTS: '/admin/restaurants',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',

  // 404
  NOT_FOUND: '/404',
};

/**
 * Generate dynamic route paths
 */
export const routeHelpers = {
  restaurantDetails: (id) => `/restaurant/${id}`,
  orderSuccess: (id) => `/order-success/${id}`,
  orderTracking: (id) => `/order-tracking/${id}`,
  adminRestaurantEdit: (id) => `/admin/restaurants/${id}`,
  adminOrderDetails: (id) => `/admin/orders/${id}`,
};

export default ROUTES;