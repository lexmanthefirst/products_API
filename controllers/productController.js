const BaseController = require('./baseController');
const Product = require('../models/productModel');

class ProductController extends BaseController {
  constructor() {
    super(Product);
  }
}
module.exports = new ProductController();
