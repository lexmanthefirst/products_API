const BaseController = require('./baseController');
const Category = require('../models/categoryModel');

class CategoryController extends BaseController {
  constructor() {
    super(Category);
  }
}
module.exports = new CategoryController();
