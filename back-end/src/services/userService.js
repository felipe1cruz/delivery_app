const md5 = require('md5');
const Joi = require('joi');
const errorGenerate = require('../utils/genericErrorHandler');
const { User } = require('../database/models');
const { generateToken } = require('../utils/JWT');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const authenticate = async (userEmail, userPassword) => {
  const cryptoPassword = md5(userPassword);
  const { error } = userSchema.validate({ email: userEmail, password: userPassword });
  if (error) throw errorGenerate(400, 'Some required fields are missing');

  const user = await User.findOne({
    attributes: ['id', 'name', 'email', 'role'],
    where: { email: userEmail, password: cryptoPassword },
  });

  if (!user) throw errorGenerate(404, 'Not found');

  const token = generateToken(user.dataValues);
  console.log('user', user.id);
  return { 
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.dataValues.role,
    token,
   };
};

const createUser = async ({ name, email, password }) => {
  const cryptoPassword = md5(password);
  const checkCreatedUsers = await User.findOne({
    where: {
      email,
    },
  });

  if (checkCreatedUsers) {
    throw errorGenerate(409, 'User already registered');
  }
  const newUser = await User.create({ name, email, password: cryptoPassword, role: 'customer' });
  const token = generateToken(newUser.dataValues);
  return token;
};

const getSellers = async () => {
  const sellers = await User.findAll({
    attributes: ['id', 'name'],
    where: {
      role: 'seller',
    },
  });
  return sellers;
};

module.exports = {
  authenticate,
  createUser,
  getSellers,
};
