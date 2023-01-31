const { generateToken } = require('../../utils/JWT');

const validUser = {
  name: 'Joselito Hermes',
  senha: 'Sem Noção',
  email: 'candidato@semnocao.com',
};

const invalidUser = {
  name: 'Renato',
  senha: '1234',
  email: 'vi@rus@sem.no.cao.com',
};

const customerUser = {
  name: 'Cliente Zé Birita',
  senha: '$#zebirita#$',
  email: 'zebirita@email.com',
  role: 'customer',
  senhaCriptografada: '1c37466c159755ce1fa181bd247cb925',
};

const adminUser = {
  name: 'Delivery App Admin',
  senha: '--adm2@21!!--',
  email: 'adm@deliveryapp.com',
  role: 'administrator',
  senhaCriptografada: 'a4c86edecc5aee06eff8fdeda69e0d04',
};

const sellerUser = {
  name: 'Fulana Pereira',
  senha: 'fulana@123',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
  senhaCriptografada: '3c28d2b0881bf46457a853e0b07531c6',
};

const findOneUser = (user) => {
 return { dataValues: { name: user.name, email: user.email, role: user.role } };
};

const loginRes = (user) => {
 const { dataValues: response } = findOneUser(user);
 response.token = generateToken(response);
 return response;
};

module.exports = {
  validUser,
  invalidUser,
  customerUser,
  adminUser,
  sellerUser,
  findOneUser,
  loginRes,
};