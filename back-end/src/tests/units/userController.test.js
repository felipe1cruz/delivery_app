const { expect } = require('chai');
const sinon = require('sinon');

const userService = require('../../services/userService');
const userController = require('../../controllers/userController');
const { loginRes, sellerUser } = require('../mocks/userMocks');

describe('#### Avalia camada userController ####', function () {
  const reqBody = { email: sellerUser.email, password: sellerUser.senha };
  const mockRequest = { body: reqBody };
  const sendSpy = sinon.spy();
  const mockResponse = { send: sendSpy };
  const nextSpy = sinon.spy();

  afterEach(() => {
    sinon.restore();
    sendSpy.resetHistory();
    nextSpy.resetHistory();
  });

  it('1 - Retorna o objeto de validação de login corretamente?', async function () {
    const sellerRes = loginRes(sellerUser);
    sinon.stub(userService, 'authenticate').resolves(sellerRes);

    await userController.user(mockRequest, mockResponse, () => {});
    expect(sendSpy.calledOnce).true;
    expect(sendSpy.calledWith(sellerRes)).true;
    expect(nextSpy.notCalled).true;
  });

  it('2 - Captura erros e os envia para tratamento?', async function () {
    const testError = new Error('Testerson is testing...');
    sinon.stub(userService, 'authenticate').throws(testError);
    
    await userController.user(mockRequest, mockResponse, nextSpy);
    expect(nextSpy.calledOnce).true;
    expect(nextSpy.calledWith(testError)).true;
    expect(sendSpy.notCalled).true;
  });
});

