const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a user name'],
      trim: true,
      maxlenght: [50, 'User name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter a user email'],
      unique: true,
      trim: true,
      maxlenght: [50, 'User email cannot exceed 50 characters'],
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    address: {
      street: {
        type: String,
        required: [true, 'Please enter a street address'],
      },
      city: {
        type: String,
        required: [true, 'Please enter a city'],
      },
      state: {
        type: String,
        required: [true, 'Please enter a state'],
      },
      country: {
        type: String,
        required: [true, 'Please enter a country'],
      },
      zip: {
        type: String,
        required: [true, 'Please enter a zip code'],
      },
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model('users', userSchema);
module.exports = User;
