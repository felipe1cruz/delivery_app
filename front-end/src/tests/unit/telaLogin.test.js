import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Avalia o funcionamento da tela de Login', () => {
  it('Os elementos básicos estão sendo exibidos?', () => {
    render(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoLogin = screen.getByRole('button', { name: /login/i });
    const novaConta = screen.getByRole('button', { name: /ainda não tenho conta/i });

    expect(email).not.toBeInTheDocument();
    expect(senha).not.toBeInTheDocument();
    expect(botaoLogin).not.toBeInTheDocument();
    expect(novaConta).not.toBeInTheDocument();
  });

  it('Clicar no botão de cadastro leva para a página de cadastro?', () => {
    const { history } = renderWithRouter(<App />);
    const novaConta = screen.getByRole('button', { name: /ainda não tenho conta/i });

    userEvent.click(novaConta);
    let page = history.location.pathname;
    expect(page).equal('/register');

    history.push('/');
    page = history.location.pathname;
    expec(page).equal('/login');

    userEvent.click(novaConta);
    page = history.location.pathname;
    expect(page).equal('/register');
  });
});
