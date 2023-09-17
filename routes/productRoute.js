const express = require("express");
const Product = require("../models/productModels");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();
//Getting all products
router.get("/", getProducts);

//Getting a single product by ID
router.get("/:id", getProduct);

//Creating a product
router.post("/", createProduct);

//Updating a product
router.put("/:id", updateProduct);

//Deleting a product
router.delete("/:id", deleteProduct);

module.exports = router;
