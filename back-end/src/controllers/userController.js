const jwt = require('jsonwebtoken');
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

const createUserPanelAdmin = async (req, res, next) => {
  console.log('Controller', req.body);
  // const token = req.headers.authorization;
  // const jwtVery = jwt.verify(token, 'segredoJWT')
  try {
    const date = await userService.createUserPanelAdmin(req.body);
    if (!date) {
      return res.status(409).json('Conflict');
    }
    return res.status(201).json('created'); 
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = await userService.getUserId(name);
    return res.status(201).json(userId);
  } catch (error) {
    next(error);
  }
};

const getSellers = async (req, res, next) => {
  try {
    const sellers = await userService.getSellers();
    return res.status(201).json(sellers);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await userService.getUsers();
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  user,
  createUser,
  getSellers,
  getUserId,
  getUsers,
  createUserPanelAdmin,
};
