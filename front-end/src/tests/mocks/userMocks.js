import stringGenerator from '../helpers/stringGenerator';

const minValidLengthOfUserName = 12;
const minValidLengthOfPassword = 6;
const randomEmailLength = 8;

const validUser = {
  nome: stringGenerator(minValidLengthOfUserName),
  senha: stringGenerator(minValidLengthOfPassword),
  email: `${stringGenerator(randomEmailLength)}@email.com`,
};

const invalidUser = {
  nome: 'Renato',
  senha: '1234',
  email: 'vi@rus@sem.no.cao.com',
};

const customerUser = {
  nome: 'Cliente Zé Birita',
  senha: '$#zebirita#$',
  email: 'zebirita@email.com',
  role: 'customer',
  senhaCriptografada: '1c37466c159755ce1fa181bd247cb925',
};

const adminUser = {
  nome: 'Delivery App Admin',
  senha: '--adm2@21!!--',
  email: 'adm@deliveryapp.com',
  role: 'administrator',
  senhaCriptografada: 'a4c86edecc5aee06eff8fdeda69e0d04',
};

const sellerUser = {
  nome: 'Fulana Pereira',
  senha: 'fulana@123',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
  senhaCriptografada: '3c28d2b0881bf46457a853e0b07531c6',
};

export {
  validUser,
  invalidUser,
  customerUser,
  adminUser,
  sellerUser,
};
