const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/sellers', userController.getSellers);

module.exports = router;