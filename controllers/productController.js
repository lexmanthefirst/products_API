const BaseController = require('./BaseController');
const Product = require('../models/productModel');

class ProductController extends BaseController {
  constructor() {
    super(Product);
  }
}
module.exports = new ProductController();
