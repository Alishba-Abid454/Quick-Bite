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
    enum: Object.values(ADDRESS_TYPES), //Only allow specific values
    default: ADDRESS_TYPES.HOME,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true, //Remove extra spaces
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
  // Mongoose automatically adds:
    //createdAt: Date  // When document was created
    //updatedAt: Date  // When document was last updated
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
    // Store only last 4 digits
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
  // ===== Basic Info =====
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
    select: false, // Don't return password by default
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

  // ===== Role =====
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.CUSTOMER,
  },

  // ===== Addresses =====
  addresses: [AddressSchema],

  // ===== Payment Methods =====
  paymentMethods: [PaymentMethodSchema],

  // ===== Preferences =====
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

  // ===== Account Status =====
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

  // ===== Security =====
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

  // ===== Statistics =====
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
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });


// Pre-Save Middleware

// Hash password before saving
UserSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await hashPassword(this.password);
    this.passwordChangedAt = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

// Ensure only one default address
UserSchema.pre('save', function (next) {
  if (this.addresses && this.addresses.length > 0) {
    const defaultAddresses = this.addresses.filter(addr => addr.isDefault);
    if (defaultAddresses.length > 1) {
      // Keep only the last one as default
      defaultAddresses.forEach((addr, index) => {
        if (index < defaultAddresses.length - 1) {
          addr.isDefault = false;
        }
      });
    }
  }
  next();
});

// Ensure only one default payment method
UserSchema.pre('save', function (next) {
  if (this.paymentMethods && this.paymentMethods.length > 0) {
    const defaultMethods = this.paymentMethods.filter(pm => pm.isDefault);
    if (defaultMethods.length > 1) {
      defaultMethods.forEach((pm, index) => {
        if (index < defaultMethods.length - 1) {
          pm.isDefault = false;
        }
      });
    }
  }
  next();
});

// Instance Methods

// Compare password for login
UserSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.password);
};

// Check if user changed password after JWT was issued
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    //JWTTimestamp --- When the JWT token was created
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
//if token generate at 10am and user chnage password at 10 30am so token is invalid otherwise valid.
};

// Get default address
UserSchema.methods.getDefaultAddress = function () {
  if (!this.addresses || this.addresses.length === 0) {
    return null;
  }
  const defaultAddress = this.addresses.find(addr => addr.isDefault);
  return defaultAddress || this.addresses[0]; //if no default address then pick 1st address
};

// Get default payment method
UserSchema.methods.getDefaultPaymentMethod = function () {
  if (!this.paymentMethods || this.paymentMethods.length === 0) {
    return null;
  }
  const defaultMethod = this.paymentMethods.find(pm => pm.isDefault);
  return defaultMethod || this.paymentMethods[0];
};

// Static Methods

// Find user by email (including password)
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }).select('+password');
};

// Transform to JSON (Remove sensitive data)
// auto convert mongodb doc into json e.g., when sending a response
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  return user;
};
module.exports = mongoose.model('User', UserSchema);


/*
┌─────────────────────────────────────────────────────────────────┐
│                    USER LOGIN FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1: User submits email & password                          │
│     ↓                                                           │
│  Step 2: Find user by email (static method)                     │
│     const user = await User.findByEmail(email);                 │
│     ↓                                                           │
│  Step 3: findByEmail includes password (select: +password)      │
│     ↓                                                           │
│  Step 4: Compare password (instance method)                     │
│     const isMatch = await user.comparePassword(password);       │
│     ↓                                                           │
│  Step 5: Password matches → Create JWT token                    │
│     ↓                                                           │
│  Step 6: Send user data to client                               │
│     res.json({ user });                                         │
│     ↓                                                           │
│  Step 7: toJSON() AUTOMATICALLY runs!                           │
│     ↓                                                           │
│  Step 8: Password and reset tokens removed!                     │
│     ↓                                                           │
│  Step 9: Client receives safe data!                             │
│     {                                                           │
│       "id": "123",                                              │
│       "name": "John",                                           │
│       "email": "john@email.com",                                │
│       // ✅ No password!                                        │
│     }                                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
*/