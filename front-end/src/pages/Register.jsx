import React from 'react';
// import { Link } from 'react-router-dom';

const testIdInputName = 'common_register__input-name';
const testIdInputEmail = 'common_register__input-email';
const testIdInputPassword = 'common_register__input-password';
const testIdBtnRegister = 'common_register__button-register';
// const testIdInvalidMessage = 'common_register__element-invalid_register';

function Register() {
  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid={ testIdInputName }
            type="text"
            id="name"
            placeholder="Seu nome"
            required
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid={ testIdInputEmail }
            type="email"
            id="email"
            placeholder="seu-email@site.com.br"
            required
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            data-testid={ testIdInputPassword }
            type="password"
            id="senha"
            placeholder="*******"
            required
          />
        </label>
        <button
          data-testid={ testIdBtnRegister }
          type="button"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Register;
