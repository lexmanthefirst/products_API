const express = require('express');
const router = express.Router();

const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const categoryRoute = require('./categoryRoute');
const authRoute = require('./authRoute');

router.use('/products', productRoute);
router.use('/users', userRoute);
router.use('/categories', categoryRoute);
router.use('/auth', authRoute); // e.g. /api/v1/auth/github

module.exports = router;
