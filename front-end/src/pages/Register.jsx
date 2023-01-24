import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

const testIdInputName = 'common_register__input-name';
const testIdInputEmail = 'common_register__input-email';
const testIdInputPassword = 'common_register__input-password';
const testIdBtnRegister = 'common_register__button-register';
const testIdInvalidMessage = 'common_register__element-invalid_register';
const errorMessage = 'Algo deu errado';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableRegisterBtn, setDisableBtn] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(true);

  function emailRegex(validEmailTest) {
    const regex = /^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig;
    return regex.test(validEmailTest);
  }

  const handleChange = (target) => {
    const { id, value } = target;
    if (id === 'nameId') setName(value);
    if (id === 'emailId') setEmail(value);
    if (id === 'passwordId') setPassword(value);
  };

  useEffect(() => {
    const fieldsValidation = () => {
      const rangeName = 12;
      const rangePassword = 6;
      const validEmail = emailRegex(email);
      const validName = name.length >= rangeName;
      const validPassword = password.length >= rangePassword;
      return (validEmail && validName && validPassword);
    };
    setDisableBtn(fieldsValidation());
    setInvalidMessage(true);
  }, [name, email, password]);

  return (
    <div>
      <form>
        <label htmlFor="nameId">
          Nome
          <input
            data-testid={ testIdInputName }
            type="text"
            id="nameId"
            placeholder="Seu nome"
            value={ name }
            onChange={ (e) => handleChange(e.target) }
            required
          />
        </label>
        <label htmlFor="emailId">
          Email
          <input
            data-testid={ testIdInputEmail }
            type="email"
            id="emailId"
            placeholder="seu-email@site.com.br"
            value={ email }
            onChange={ (e) => handleChange(e.target) }
            required
          />
        </label>
        <label htmlFor="passwordId">
          Senha
          <input
            data-testid={ testIdInputPassword }
            type="password"
            id="passwordId"
            placeholder="*******"
            value={ password }
            onChange={ (e) => handleChange(e.target) }
            required
          />
        </label>
        <button
          data-testid={ testIdBtnRegister }
          type="button"
          disabled={ !disableRegisterBtn }
        >
          Cadastrar
        </button>
      </form>
      <div hidden={ invalidMessage }>
        <p data-testid={ testIdInvalidMessage }>
          { errorMessage }
        </p>
      </div>
    </div>
  );
}

export default Register;
