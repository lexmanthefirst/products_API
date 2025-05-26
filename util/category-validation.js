const { body, validationResult } = require('express-validator');
const validate = {};
const categoryModel = require('../models/categoryModel');
validate.categoryValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long')
      .custom(async value => {
        const category = await categoryModel.findOne({ name: value });
        if (category) {
          return Promise.reject('Category name already exists');
        }
      }),
    body('description')
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters long'),

    body('slug')
      .notEmpty()
      .withMessage('Slug is required')
      .isLength({ min: 3 })
      .withMessage('Slug must be at least 3 characters long')
      .custom(async value => {
        const category = await categoryModel.findOne({ slug: value });
        if (category) {
          return Promise.reject('Slug already exists');
        }
      }),
    body('parentCategory')
      .notEmpty()
      .withMessage('Parent Category is required')
      .isLength({ min: 3 })
      .withMessage('parent Category must be at least 3 characters long'),

    body('isActive')
      .isBoolean()
      .withMessage('isActive must be a boolean value'),

    body('featuredImage')
      .notEmpty()
      .withMessage('Featured image is required')
      .isURL()
      .withMessage('Featured image must be a valid URL'),
  ];
};

// Middleware to validate the request
validate.ValidateCategory = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = validate;
