import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';
import { validUser, invalidUser } from '../mocks/registerMocks';

describe('Avalia a Tela de Register', () => {
  it('1 - Os elementos básicos estão sendo exibidos?', () => {
    render(<App />);

    const nome = screen.getByRole('textbox', { name: /nome/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoCadastro = screen.getByRole('button', { name: /cadastrar/i });

    expect(nome).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(botaoCadastro).not.toBeInTheDocument();
  });

  it('2 - Botão cadastro é liberado com dados válidos?', () => {
    render(<App />);

    const nome = screen.getByRole('textbox', { name: /nome/i });
    const senha = screen.getByLabelText(/senha/i);
    const email = screen.getByRole('textbox', { name: /email/i });
    const botaoCadastro = screen.getByRole('button', { name: /cadastrar/i });
    expect(botaoCadastro).toBeDisabled();

    userEvent.type(nome, validUser.nome);
    userEvent.type(senha, validUser.senha);
    userEvent.type(email, validUser.email);
    expect(botaoCadastro).not.toBeDisabled();
  });

  it('3 - Nome inválido bloqueia cadastro?', () => {
    render(<App />);

    const nome = screen.getByRole('textbox', { name: /nome/i });
    const senha = screen.getByLabelText(/senha/i);
    const email = screen.getByRole('textbox', { name: /email/i });
    const botaoCadastro = screen.getByRole('button', { name: /cadastrar/i });
    expect(botaoCadastro).toBeDisabled();

    userEvent.type(nome, invalidUser.nome);
    userEvent.type(senha, validUser.senha);
    userEvent.type(email, validUser.email);
    expect(botaoCadastro).toBeDisabled();
  });

  it('4 - Senha inválida bloqueia cadastro?', () => {
    render(<App />);

    const nome = screen.getByRole('textbox', { name: /nome/i });
    const senha = screen.getByLabelText(/senha/i);
    const email = screen.getByRole('textbox', { name: /email/i });
    const botaoCadastro = screen.getByRole('button', { name: /cadastrar/i });
    expect(botaoCadastro).toBeDisabled();

    userEvent.type(nome, validUser.nome);
    userEvent.type(senha, invalidUser.senha);
    userEvent.type(email, validUser.email);
    expect(botaoCadastro).toBeDisabled();
  });

  it('5 - Email inválido bloqueia cadastro?', () => {
    render(<App />);

    const nome = screen.getByRole('textbox', { name: /nome/i });
    const senha = screen.getByLabelText(/senha/i);
    const email = screen.getByRole('textbox', { name: /email/i });
    const botaoCadastro = screen.getByRole('button', { name: /cadastrar/i });
    expect(botaoCadastro).toBeDisabled();

    userEvent.type(nome, validUser.nome);
    userEvent.type(senha, validUser.senha);
    userEvent.type(email, invalidUser.email);
    expect(botaoCadastro).toBeDisabled();
  });
});
