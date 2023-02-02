import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import dataTestsNoId from '../utils/dataTests/dataTestNoId';

function NavbarAdmin() {
  const [nameNavBar, setNameNavBar] = useState('');
  const history = useHistory();
  const { setToken } = useContext(Context);

  const goAdminManager = () => {
    history.push('/admin/manage');
  };

  const getName = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    setNameNavBar(data.name);
  };

  const logout = () => {
    localStorage.clear('user');
    setToken('');
    history.push('/');
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <section>
      <button
        type="button"
        data-testid={ dataTestsNoId().navbarLinkOrders }
        onClick={ () => goAdminManager() }
      >
        GERENCIAR USUÁRIOS
      </button>
      <span
        data-testid={ dataTestsNoId().navbarUserFullName }
      >
        { nameNavBar }
      </span>

      <button
        // data-testid={  }
        type="button"
        data-testid={ dataTestsNoId().navbarLinkLogout }
        onClick={ () => logout() }
      >
        SAIR
      </button>
    </section>
  );
}

export default NavbarAdmin;
