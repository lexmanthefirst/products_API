const { body, validationResult } = require('express-validator');
const validate = {};
const userModel = require('../models/userModel');

validate.userValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email address is required.')
      .isEmail()
      .withMessage('A valid email address is required.')
      .custom(async value => {
        const user = await userModel.findOne({ email: value });
        if (user) {
          return Promise.reject('Email already in use');
        }
      }),

    body('address')
      .notEmpty()
      .withMessage('Address is required')
      .isObject()
      .withMessage('Address must be an object'),
  ];
};

//Middleware to validate the request
validate.ValidateUser = (req, res, next) => {
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
