const mongoose = require('mongoose');
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the category name'],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [(true, 'Please enter a category description')],
      maxlenght: 500,
    },
    slug: {
      type: String,
      required: [true, 'Please enter a slug for the category'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    parentCategory: {
      type: String,
      ref: 'category',
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featuredImage: {
      type: String,
      required: [true, 'Please upload a featured image for the category'],
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model('categories', categorySchema);
module.exports = Category;
