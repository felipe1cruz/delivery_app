const express = require('express');
const customerOrdersController = require('../controllers/customerOrdersController');

const router = express.Router();

router.get('/customer/orders', customerOrdersController.sales);

module.exports = router;
