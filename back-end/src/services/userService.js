const Joi = require('joi');
const errorGenerate = require('../utils/genericErrorHandler');
const { User } = require('../database/models');
const { generateToken } = require('../utils/JWT');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const authenticate = async (userEmail, userPassword) => {
  console.log(userEmail, userPassword);
  const { error } = userSchema.validate({ email: userEmail, password: userPassword });
  if (error) throw errorGenerate(400, 'Some required fields are missing');

  const user = await User.findOne({
    attributes: ['name', 'email', 'role'],
    where: { email: userEmail, password: userPassword },
  });
  console.log(user);

  if (!user) throw errorGenerate(400, 'Invalid fields');

  const token = generateToken(user.dataValues);
  console.log(user.role);
  return { nome: user.name,
    email: user.email,
    role: user.dataValues.role,
    token,
   };
};

module.exports = {
  authenticate,
};