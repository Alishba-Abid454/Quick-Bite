/**
 * Authentication Routes
 * All authentication and user profile related endpoints
 */

const express = require('express');
const router = express.Router(); //Create a new router instance (for grouping routes)
const {
  signup,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  addAddress,
  updateAddress,
  deleteAddress,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const {
  signupSchema,
  loginSchema,
  changePasswordSchema,
  updateProfileSchema,
  addAddressSchema,
} = require('../validators/authValidator');

// Public Routes

/**
 * @route   POST /api/auth/signup
 * @desc    Register new user
 * @access  Public
 */
router.post('/signup', validate(signupSchema), signup);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validate(loginSchema), login);

// Protected Routes (Require Authentication)

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', protect, logout);


/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', protect, getProfile);
// protect means it verify JWT Token then fetch data 

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', protect, validate(updateProfileSchema), updateProfile);

/**
 * @route   POST /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.post('/change-password', protect, validate(changePasswordSchema), changePassword);

// Address Management Routes

/**
 * @route   POST /api/auth/address
 * @desc    Add new address
 * @access  Private
 */
router.post('/address', protect, validate(addAddressSchema), addAddress);

/**
 * @route   PUT /api/auth/address/:addressId
 * @desc    Update address
 * @access  Private
 */
router.put('/address/:addressId', protect, validate(addAddressSchema), updateAddress);//URL with dynamic parameter

/**
 * @route   DELETE /api/auth/address/:addressId
 * @desc    Delete address
 * @access  Private
 */
router.delete('/address/:addressId', protect, deleteAddress);

module.exports = router;