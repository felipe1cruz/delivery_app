const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.user);

router.post('/login', userController.user);

module.exports = router;