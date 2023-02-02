import React, { useState, useEffect } from 'react';
import { requestLogin, requestData } from '../services/requests';
import NavbarAdmin from '../components/NavbarAdmin';
import dataTestsId from '../utils/dataTests/dataTestId';
import dataTestsNoId from '../utils/dataTests/dataTestNoId';

function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setSelectRole] = useState('');
  // const [createUserSet, msgCreateUserSet] = useState('');
  const [listaUsers, setListUsers] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(true);
  const [okMessage, setOkMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const errorMessage = 'Algo deu errado';

  const handleChange = (target) => {
    const { id, value } = target;
    if (id === 'nameId') setName(value);
    if (id === 'emailId') setEmail(value);
    if (id === 'passwordId') setPassword(value);
  };

  function emailRegex(validEmailTest) {
    const regex = /^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig;
    return regex.test(validEmailTest);
  }

  const getName = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    setName(data.name);
  };

  const getUsers = async () => {
    const data = await requestData('/users');
    setListUsers(data);
  };

  useEffect(() => {
    getName();
    getUsers();
  }, []);

  const userRegisterAdmin = async () => {
    try {
      // await requestLogin('/login', { email, password });
      await requestLogin('/createPanelAdmin', { name, email, password, role });
      setOkMessage('Uhuu! Usuário cadastrado');
    } catch (error) {
      setInvalidMessage(false);
      setErrorMessage('Ops! Algo deu errado');
    }
  };

  useEffect(() => {
    const fieldsValidation = () => {
      const rangeName = 12;
      const rangePassword = 6;
      const validEmail = emailRegex(email);
      const validName = name.length >= rangeName;
      const validPassword = password.length >= rangePassword;
      const selects = role.length !== 0;
      return (validEmail && validName && validPassword && selects);
    };
    setDisableBtn(fieldsValidation());
  }, [password, role, email, name]);

  return (
    <div>
      <NavbarAdmin />
      <section>
        <form>
          <label htmlFor="nameId">
            Nome
            <input
              data-testid={ dataTestsNoId().inputName }
              type="text"
              id="nameId"
              placeholder="Nome"
              value={ name }
              onChange={ (e) => handleChange(e.target) }
            />
          </label>
          <label htmlFor="emailId">
            Email
            <input
              data-testid={ dataTestsNoId().inputEmail }
              type="email"
              id="emailId"
              placeholder="Email"
              value={ email }
              onChange={ (e) => handleChange(e.target) }
            />
          </label>
          <label htmlFor="passwordId">
            Senha
            <input
              data-testid={ dataTestsNoId().inputPassword }
              type="password"
              id="passwordId"
              placeholder="Senha"
              value={ password }
              onChange={ (e) => handleChange(e.target) }
            />
          </label>
          <select
            name="role"
            id="roleId"
            data-testid={ dataTestsNoId().inputRole }
            onChange={ (e) => setSelectRole(e.target.value) }
          >
            <option
              value="empy"
              id="roleId"
              defaultValue="role"
              disable
              hidden
            >
              ---Role---
            </option>
            <option
              value="seller"
              id="roleId"
            >
              Seller
            </option>
            <option
              value="administrator"
              id="roleId"
            >
              Administrator
            </option>
            <option
              value="customer"
              id="roleId"
            >
              Customer
            </option>
          </select>
          <button
            data-testid={ dataTestsId('').buttonRegister }
            type="button"
            onClick={ () => userRegisterAdmin() }
            disabled={ !disableBtn }
          >
            Cadastrar
          </button>
        </form>
        {' '}
        <div hidden={ invalidMessage }>
          <p data-testid={ dataTestsNoId().invalidButtonRegister }>
            { okMessage || errorMessage }
          </p>
        </div>
        <section>
          <div>
            Lista de usuários
          </div>
          <div>
            <span>[Item]</span>
            <span>[Nome]</span>
            <span>[E-mail]</span>
            <span>[Tipo]</span>
            <span>[Excluir]</span>
          </div>
          { listaUsers.map((listaUser, index) => (
            <div key={ index + 1 }>
              <span
                data-testid={ dataTestsId(index + 1).itemList }
              >
                { index + 1 }
                { ' ' }
              </span>
              <span
                data-testid={ dataTestsId(index + 1).nomeList }
              >
                { listaUser.name }
                { ' ' }
              </span>
              <span
                data-testid={ dataTestsId('').emailList }
              >
                { listaUser.email }
                { ' ' }
              </span>
              <span
                data-testid={ dataTestsId(index + 1).tipoList }
              >
                { listaUser.role }
                { ' ' }
              </span>
              <button
                type="submit"
                data-testid={ dataTestsId(index + 1).excluirList }
              >
                Excluir
              </button>
            </div>
          )) }
        </section>
      </section>
    </div>
  );
}

export default AdminManage;
