const { body, validationResult } = require('express-validator');
const validate = {};

validate.productValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long'),

    body('quantity')
      .notEmpty()
      .withMessage('Quantity is required')
      .isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer'),

    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isFloat({ gt: 0 })
      .withMessage('Price must be a positive number'),

    body('image').optional().isURL().withMessage('Image must be a valid URL'),
  ];
};

//Middleware to validate the request
validate.ValidateProduct = (req, res, next) => {
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
