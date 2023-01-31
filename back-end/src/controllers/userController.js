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

module.exports = {
  user,
};