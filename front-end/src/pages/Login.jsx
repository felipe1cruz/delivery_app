import React from 'react';
import { Link } from 'react-router-dom';

const testIdInputEmail = 'common_login__input-email';
const testIdInputPassword = 'common_login__input-password';
const testIdBtnLogin = 'common_login__button-login';
const testIdBtnRegister = 'common_login__button-register';
// const testIdInvalidMessage = 'common_login__element-invalid-email';

function Login() {
  return (
    <div>
      <form>
        <label htmlFor="login">
          Login
          <input
            data-testid={ testIdInputEmail }
            type="email"
            id="email"
            placeholder="email@etrybeer.com.br"
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
          data-testid={ testIdBtnLogin }
          type="button"
        >
          Login
        </button>
        <Link to="/register">
          <button
            data-testid={ testIdBtnRegister }
            type="button"
          >
            Ainda não tenho conta
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
