const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../database/models');
const { authenticate } = require('../../services/userService');
const { adminUser, findOneUser, loginRes, invalidUser } = require('../mocks/userMocks');

describe('#### Avalia camada userService ####', function () {
  afterEach(() => sinon.restore());
  
  it('1 - Autentica login válido?', async function () {
    sinon.stub(User, 'findOne').resolves(findOneUser(adminUser));

    const response = await authenticate(adminUser.email, adminUser.senha);
    expect(response).deep.equal(loginRes(adminUser));
  });

  it('2 - Rejeita login com senha inválido?', async function () {
    try {
      await authenticate(adminUser.email, invalidUser.senha);
    } catch (error) {
      expect(error).deep.equal({ status: 400, message: 'Some required fields are missing' });
    }
  });

  it('3 - Rejeita login com email inválido?', async function () {
    try {
      await authenticate(invalidUser.email, adminUser.senha);
    } catch (error) {
      expect(error).deep.equal({ status: 400, message: 'Some required fields are missing' });
    }
  });

  it('4 - Retorna erro quando o usuário não é encontrado?', async function () {
    sinon.stub(User, 'findOne').resolves(null);

    try {
      await authenticate(adminUser.email, adminUser.senha);
    } catch (error) {
      expect(error).deep.equal({ status: 404, message: 'Not found' });
    }
  });
});