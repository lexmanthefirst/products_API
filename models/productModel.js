const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a product name'],
      trim: true,
      maxlenght: [50, 'Product name cannot exceed 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a product description'],
      trim: true,
      maxlenght: [500, 'Product description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please enter a product category'],
      trim: true,
      maxlenght: [50, 'Product category cannot exceed 50 characters'],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Quantity cannot be less than 0'],
    },
    price: {
      type: Number,
      required: true,
    },
    image: [
      {
        type: String,
        required: false,
      },
    ],
    rating: {
      type: 'object',
      ref: 'Rating',
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model('products', productSchema);
module.exports = Product;
