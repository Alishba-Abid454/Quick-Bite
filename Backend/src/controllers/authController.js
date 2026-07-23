/**
 * Auth Controller
 * Handles authentication and user management
 */

const User = require('../models/User');
const { signToken } = require('../helpers/jwtHelper');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { HTTP_STATUS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Register new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already registered');
    }

    // Check if phone already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      throw new ApiError(HTTP_STATUS.CONFLICT, 'Phone number already registered');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'customer',
    });

    // Generate JWT token
    const token = signToken({ 
      id: user._id, 
      email: user.email,
      role: user.role 
    });

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      { user, token },
      'User registered successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Your account has been deactivated');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = signToken({ 
      id: user._id, 
      email: user.email,
      role: user.role 
    });

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { user, token },
      'Login successful'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = async (req, res, next) => {
  try {
    // JWT is stateless, just return success
    return successResponse(
      res,
      HTTP_STATUS.OK,
      null,
      'Logged out successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    return successResponse(
      res,
      HTTP_STATUS.OK,
      { user },
      'Profile fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, profileImage } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // Update fields
    if (name) user.name = name;
    if (phone) {
      // Check if phone already exists for another user
      const existingPhone = await User.findOne({ 
        phone, 
        _id: { $ne: user._id } 
      });
      if (existingPhone) {
        throw new ApiError(HTTP_STATUS.CONFLICT, 'Phone number already in use');
      }
      user.phone = phone;
    }
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { user },
      'Profile updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Change password
 * @route   POST /api/auth/change-password
 * @access  Private
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      null,
      'Password changed successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add new address
 * @route   POST /api/auth/address
 * @access  Private
 */
const addAddress = async (req, res, next) => {
  try {
    const { type, address, city, state, zipCode, country, landmark, isDefault, coordinates } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // If this is default, unset other defaults
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    // Add new address
    user.addresses.push({
      type,
      address,
      city,
      state,
      zipCode,
      country,
      landmark,
      isDefault: isDefault || false,
      coordinates,
    });

    await user.save();

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      { addresses: user.addresses },
      'Address added successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update address
 * @route   PUT /api/auth/address/:addressId
 * @access  Private
 */
const updateAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const updates = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // Find address index
    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === addressId
    );
    if (addressIndex === -1) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Address not found');
    }

    // If setting as default, unset other defaults
    if (updates.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    // Update address
    const address = user.addresses[addressIndex];
    Object.keys(updates).forEach(key => {
      if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt') {
        address[key] = updates[key];
      }
    });

    await user.save();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { addresses: user.addresses },
      'Address updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete address
 * @route   DELETE /api/auth/address/:addressId
 * @access  Private
 */
const deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // Remove address
    user.addresses = user.addresses.filter(
      addr => addr._id.toString() !== addressId
    );

    // If no default address, set first as default
    if (user.addresses.length > 0 && !user.addresses.some(a => a.isDefault)) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { addresses: user.addresses },
      'Address deleted successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  addAddress,
  updateAddress,
  deleteAddress,
};