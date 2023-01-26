const userService = require('../services/userService');

const user = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authenticate = await userService.authenticate(email, password);
    return res.send(authenticate);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    await userService.createUser(req.body);
    return res.status(201).json('created');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  user,
  createUser,
};