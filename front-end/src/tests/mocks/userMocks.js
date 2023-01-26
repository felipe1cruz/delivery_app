const validUser = {
  nome: 'Joselito Hermes',
  senha: 'Sem Noção',
  email: 'candidato@semnocao.com',
};

const invalidUser = {
  nome: 'Renato',
  senha: '1234',
  email: 'vi@rus@sem.no.cao.com',
};

const registeredUser = {
  nome: 'Cliente Zé Birita',
  senha: '$#zebirita#$',
  email: 'zebirita@email.com',
  role: 'customer',
  senhaCriptografada: '1c37466c159755ce1fa181bd247cb925',
};

export {
  validUser,
  invalidUser,
  registeredUser,
};
