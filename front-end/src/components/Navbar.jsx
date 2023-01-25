import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  const [name, setName] = useState('');

  const logout = () => {
    localStorage.clear('user');
    history.push('/');
  }

  const getName = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    setName(data.name);
  }

  const tokenValidation = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    console.log(data.token);
    if (!data) {
      history.push('/');
    }
    try {
           
    } catch (error) {
      history.push('/');
    }
  }

  useEffect(() => {
    getName();
    tokenValidation();
  }, [])

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
