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
    attributes: ['name', 'email', 'role'],
    where: { email: userEmail, password: cryptoPassword },
  });

  if (!user) throw errorGenerate(404, 'Not found');

  const token = generateToken(user.dataValues);
  return { name: user.name,
    email: user.email,
    role: user.dataValues.role,
    token,
   };
};

module.exports = {
  authenticate,
};