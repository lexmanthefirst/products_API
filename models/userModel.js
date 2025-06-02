const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // OAuth IDs (GitHub & Google)
    githubId: {
      type: String,
      unique: true,
      sparse: true, // Allows nulls (not required for everyone)
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Basic user details
    name: {
      type: String,
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      maxlength: [50, 'Email cannot exceed 50 characters'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },

    // Source of authentication
    provider: {
      type: String,
      enum: ['github', 'google', 'email'],
      required: [true, 'Provider is required'],
    },

    // User role
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    // Optional address
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zip: { type: String, trim: true },
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
