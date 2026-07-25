/**
 * User Controller
 * User management (Admin only)
 */

const User = require('../models/User');
const Order = require('../models/Order');
const { successResponse, errorResponse, paginatedResponse } = require('../helpers/responseHelper');
const { HTTP_STATUS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private (Admin)
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role, isActive, search } = req.query;

    const query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query),
    ]);

    return paginatedResponse(
      res,
      users,
      parseInt(page),
      parseInt(limit),
      total,
      'Users fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private (Admin)
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { user },
      'User fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private (Admin)
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, profileImage, isActive } = req.body;

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // Update fields
    if (name) user.name = name;
    if (email) {
      const existingEmail = await User.findOne({ email, _id: { $ne: id } });
      if (existingEmail) {
        throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already in use');
      }
      user.email = email;
    }
    if (phone) {
      const existingPhone = await User.findOne({ phone, _id: { $ne: id } });
      if (existingPhone) {
        throw new ApiError(HTTP_STATUS.CONFLICT, 'Phone already in use');
      }
      user.phone = phone;
    }
    if (role) user.role = role;
    if (profileImage) user.profileImage = profileImage;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { user },
      'User updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private (Admin)
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // Don't allow deleting yourself
    if (id === req.user._id.toString()) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'You cannot delete yourself');
    }

    await user.deleteOne();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      null,
      'User deleted successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle user active status
 * @route   PATCH /api/users/:id/toggle-status
 * @access  Private (Admin)
 */
const toggleUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // Don't allow toggling yourself
    if (id === req.user._id.toString()) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'You cannot deactivate yourself');
    }

    user.isActive = !user.isActive;
    await user.save();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { 
        user: { id: user._id, name: user.name, isActive: user.isActive } 
      },
      `User ${user.isActive ? 'activated' : 'deactivated'} successfully`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's orders (Admin only)
 * @route   GET /api/users/:id/orders
 * @access  Private (Admin)
 */
const getUserOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      Order.find({ userId: id })
        .populate('restaurantId', 'name image')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments({ userId: id }),
    ]);

    return paginatedResponse(
      res,
      orders,
      parseInt(page),
      parseInt(limit),
      total,
      'User orders fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user statistics (Admin only)
 * @route   GET /api/users/stats
 * @access  Private (Admin)
 */
const getUserStats = async (req, res, next) => {
  try {
    const [totalUsers, activeUsers, totalOrders, totalRevenue] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),
    ]);

    const stats = {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
    };

    return successResponse(
      res,
      HTTP_STATUS.OK,
      { stats },
      'User statistics fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserOrders,
  getUserStats,
};