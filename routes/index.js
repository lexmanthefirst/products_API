const express = require('express');
const router = express.Router();

// Imported route modules
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const categoryRoute = require('./categoryRoute');

//Base routes for each module
router.use('/products', productRoute);
router.use('/users', userRoute);
router.use('/categories', categoryRoute);

module.exports = router;
