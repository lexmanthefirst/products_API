const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    // OAuth IDs (GitHub & Google)
    githubId: {
      type: String,
      unique: true,
      sparse: true, // Allows null for non-GitHub users
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null for non-Google users
    },

    // User details (now optional for OAuth)
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
      maxlength: [50, 'Email cannot exceed 50 characters'],
    },

    // Auth provider (github, google, or email)
    provider: {
      type: String,
      enum: ['github', 'google', 'email'],
      required: true,
    },

    // Role (user or admin)
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    // Address (optional)
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
