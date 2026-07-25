/**
 * User Model
 * Stores user information, addresses, and payment methods
 */

const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../helpers/passwordHelper');
const { ADDRESS_TYPES, USER_ROLES } = require('../utils/constants');

// Address Sub-Schema
const AddressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(ADDRESS_TYPES),
    default: ADDRESS_TYPES.HOME,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  zipCode: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    default: 'Pakistan',
  },
  landmark: {
    type: String,
    trim: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  coordinates: {
    lat: Number,
    lng: Number,
  },
}, {
  timestamps: true,
});


// Payment Method Sub-Schema
const PaymentMethodSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['card', 'bank', 'mobile_wallet'],
    required: true,
  },
  cardNumber: {
    type: String,
    trim: true,
    set: function(value) {
      if (value && value.length > 4) {
        return value.slice(-4);
      }
      return value;
    },
  },
  cardHolder: {
    type: String,
    trim: true,
  },
  expiry: {
    type: String,
    trim: true,
  },
  bankName: {
    type: String,
    trim: true,
  },
  accountNumber: {
    type: String,
    trim: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Main User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [
      /^(\+92|0)?[3][0-9]{9}$/,
      'Please provide a valid Pakistani phone number',
    ],
  },
  profileImage: {
    type: String,
    default: 'https://via.placeholder.com/150x150',
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.CUSTOMER,
  },
  addresses: [AddressSchema],
  paymentMethods: [PaymentMethodSchema],
  preferences: {
    language: {
      type: String,
      default: 'en',
    },
    currency: {
      type: String,
      default: 'PKR',
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
  },
  passwordChangedAt: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  totalSpent: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes for Faster Queries
UserSchema.index({ phone: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

// SINGLE Pre-Save Middleware (FIXED)
UserSchema.pre('save', async function () {

  // Hash password only if modified
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
    this.passwordChangedAt = new Date();
  }

  // Ensure only one default address
  if (this.addresses?.length > 0) {
    const defaultAddresses = this.addresses.filter(addr => addr.isDefault);

    if (defaultAddresses.length > 1) {
      defaultAddresses.forEach((addr, index) => {
        if (index < defaultAddresses.length - 1) {
          addr.isDefault = false;
        }
      });
    }
  }

  // Ensure only one default payment method
  if (this.paymentMethods?.length > 0) {
    const defaultMethods = this.paymentMethods.filter(pm => pm.isDefault);

    if (defaultMethods.length > 1) {
      defaultMethods.forEach((pm, index) => {
        if (index < defaultMethods.length - 1) {
          pm.isDefault = false;
        }
      });
    }
  }

});
// Instance Methods
UserSchema.methods.comparePassword = async function(password) {
  return await comparePassword(password, this.password);
};

UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

UserSchema.methods.getDefaultAddress = function() {
  if (!this.addresses || this.addresses.length === 0) {
    return null;
  }
  const defaultAddress = this.addresses.find(addr => addr.isDefault);
  return defaultAddress || this.addresses[0];
};

UserSchema.methods.getDefaultPaymentMethod = function() {
  if (!this.paymentMethods || this.paymentMethods.length === 0) {
    return null;
  }
  const defaultMethod = this.paymentMethods.find(pm => pm.isDefault);
  return defaultMethod || this.paymentMethods[0];
};

// ============================================
// Static Methods
// ============================================
UserSchema.statics.findByEmail = function(email) {
  return this.findOne({ email }).select('+password');
};

// Transform to JSON (Remove sensitive data)
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  return user;
};

module.exports = mongoose.model('User', UserSchema);