const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoute');
const userRoutes = require('./userRoute');

router.use('/products', productRoutes);
router.use('/users', userRoutes);

module.exports = router;
