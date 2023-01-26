import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function Navbar() {
  const { token, setToken } = useContext(Context);
  const history = useHistory();
  const [name, setName] = useState('');

  const logout = () => {
    localStorage.clear('user');
    setToken('');
    history.push('/');
  };

  const getName = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    setName(data.name);
  };

  const tokenValidation = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    if (token !== data.token) {
      history.push('/');
    }
    history.push('/customer/products');
  };

  useEffect(() => {
    getName();
    tokenValidation();
  }, []);

  return (
    <nav>
      <section>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </button>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </button>
      </section>

      <section>
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </span>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => logout() }
        >
          SAIR
        </button>
      </section>

    </nav>
  );
}

export default Navbar;
