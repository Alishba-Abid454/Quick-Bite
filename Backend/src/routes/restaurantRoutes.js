/**
 * Restaurant Routes
 * All restaurant related endpoints
 */

const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantMenu,
  getRestaurantReviews,
} = require('../controllers/restaurantController');
const { protect, authorize, isRestaurantOwner } = require('../middleware/authMiddleware');
const { validate, validatePagination } = require('../middleware/validationMiddleware');
const {
  createRestaurantSchema,
  updateRestaurantSchema,
  getRestaurantsQuerySchema,
  restaurantIdParamSchema,
} = require('../validators/restaurantValidator');

// Public Routes

/**
 * @route   GET /api/restaurants
 * @desc    Get all restaurants with filters
 * @access  Public
 */
router.get(
  '/',
  validate(getRestaurantsQuerySchema, 'query'), //	Validate query parameters (search, cuisine, city, etc.)
  validatePagination,
  getAllRestaurants
);

/**
 * @route   GET /api/restaurants/:id
 * @desc    Get restaurant by ID
 * @access  Public
 */
router.get(
  '/:id',
  validate(restaurantIdParamSchema, 'params'),// Validate ID format
  getRestaurantById //Controller that fetches single restaurant
);

/**
 * @route   GET /api/restaurants/:id/menu
 * @desc    Get restaurant menu with categories
 * @access  Public
 */
router.get(
  '/:id/menu',
  validate(restaurantIdParamSchema, 'params'),
  validatePagination,
  getRestaurantMenu
);

/**
 * @route   GET /api/restaurants/:id/reviews
 * @desc    Get restaurant reviews
 * @access  Public
 */
router.get(
  '/:id/reviews',
  validate(restaurantIdParamSchema, 'params'),
  validatePagination,
  getRestaurantReviews
);

// ============================================
// Protected Routes (Admin/Restaurant Owner)
// ============================================

/**
 * @route   POST /api/restaurants
 * @desc    Create new restaurant
 * @access  Private (Admin/Restaurant Owner)
 */
router.post(
  '/',
  protect,
  authorize('admin', 'restaurant_owner'),
  validate(createRestaurantSchema),
  createRestaurant
);

/**
 * @route   PUT /api/restaurants/:id
 * @desc    Update restaurant
 * @access  Private (Admin/Restaurant Owner)
 */
router.put(
  '/:id',
  protect,
  authorize('admin', 'restaurant_owner'),
  validate(restaurantIdParamSchema, 'params'),
  validate(updateRestaurantSchema),
  isRestaurantOwner,
  updateRestaurant
);

/**
 * @route   DELETE /api/restaurants/:id
 * @desc    Delete restaurant
 * @access  Private (Admin only)
 */
router.delete(
  '/:id',
  protect,
  authorize('admin'),
  validate(restaurantIdParamSchema, 'params'),
  deleteRestaurant
);

module.exports = router;

/*
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT REQUEST                              │
│                    POST /api/restaurants                      │
│                    Headers: Authorization: Bearer token      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    ROUTE FILE                                  │
├─────────────────────────────────────────────────────────────────┤
│  router.post('/',                                              │
│    protect,                       ← STEP 2                    │
│    authorize('admin', 'restaurant_owner'), ← STEP 3          │
│    validate(createRestaurantSchema), ← STEP 4                │
│    createRestaurant                ← STEP 5                  │
│  );                                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 1: MATCH ROUTE                         │
│  Express checks: "Does this URL match /api/restaurants?"      │
│  ✅ Yes! Route matches.                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 2: AUTH MIDDLEWARE (protect)          │
│  1. Extract token from Authorization header                   │
│  2. Verify JWT token                                         │
│  3. Find user in database                                    │
│  4. Attach user to req.user                                 │
│  ❌ If invalid → 401 Unauthorized                            │
│  ✅ If valid → Continue                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 3: AUTHORIZATION (authorize)          │
│  1. Check req.user.role                                      │
│  2. Is role in ['admin', 'restaurant_owner']?               │
│  ❌ If not → 403 Forbidden                                   │
│  ✅ If yes → Continue                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 4: VALIDATION                          │
│  validate(createRestaurantSchema)                            │
│  - Validates request body                                    │
│  ❌ If invalid → 422 Unprocessable Entity                   │
│  ✅ If valid → Continue                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 5: CONTROLLER                          │
│  createRestaurant(req, res, next)                            │
│  - Creates restaurant with req.user._id as createdBy        │
│  - Returns created restaurant                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT RESPONSE                             │
│                    201 Created with restaurant                │
└─────────────────────────────────────────────────────────────────┘
*/