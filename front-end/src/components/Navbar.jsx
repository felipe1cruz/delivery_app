import React from 'react';

function Navbar() {
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
          $Nome de usuário
        </span>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
        >
          SAIR
        </button>
      </section>

    </nav>
  );
}

export default Navbar;
