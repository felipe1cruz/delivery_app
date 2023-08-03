# Delivery App

## Sobre
O Delivery App é um projeto Full Stack desenvolvido em grupo. Trata-se do desenvolvimento de um aplicativo de entrega de bebidas, no qual os usuários podem realizar as seguintes ações, dependendo do tipo de login:

- Cliente: Adicionar produtos ao carrinho e fazer pedidos.
- Vendedor: Aprovar, gerenciar compras e organizar as entregas.
- Administrador: Gerenciar o acesso dos usuários ao sistema.

Este projeto foi desenvolvido por mim e pelos meus colegas: @gabe-ao, @Gusvioli, @FORT3S e @Giovani-devp.

## Desafios
Este projeto foi bastante trabalhoso e divertido de desenvolver. Envolveu o aprimoramento de habilidades interpessoais, utilização de metodologias ágeis, divisão de tarefas, dailys, cumprimento de prazos, e muita ajuda mútua, incluindo pair programming com aqueles que estavam enfrentando mais dificuldades ou atrasos nas tarefas.

## Arquivos
Os seguintes arquivos foram desenvolvidos pelo grupo:

- Dockerfiles.
- Todos os arquivos na pasta `/back-end/`.
- Todos os arquivos na pasta `/front-end/`.

A Trybe forneceu a configuração inicial do projeto no arquivo `package.json`.

## Tecnologias
As seguintes tecnologias foram aplicadas pelo grupo neste projeto:

**Back-end:**
- Javascript.
- Express.
- Sequelize.
- Mocha.
- Chai.
- MySQL.
- Docker.

**Front-end:**
- React.
- React Router.
- RTL - React Testing Library.

## Como executar a aplicação em sua máquina

1. Clone o repositório.
2. Após clonar, entre na pasta raiz do projeto.
3. Se você já possui o MySQL instalado em sua máquina, configure as variáveis de ambiente em um arquivo `.env`. na raiz do projeto. Caso contrário, você pode subir um banco de dados dockerizado utilizando o comando `docker-compose up -d`.
4. O comando `docker-compose up -d` irá executar o arquivo docker-compose.yml e vai containizar um banco de dados mysql:8.0.23 com usuário padrão 'root' e senha 'password', previamente configurado no arquivo 'back-end/database/config/config.js';
5. Execute o comando `npm install` na raiz do projeto para instalar as dependências.
6. Após instalar as dependências, execute o comando `npm start` na raiz do projeto. Isso migrará o banco de dados e iniciará o front-end e o back-end da aplicação.
7. Após o término das rotinas do comando `npm start`, seu programa estará rodando e pronto para testar! Acesse-a em seu navegador utilizando o endereço `http://localhost:3000/`.
8. Para testar e acessar como cliente, utilize as seguintes credenciais: 
   - Login: 'zebirita@email.com'
   - Senha: '$#zebirita#$'

9. Para testar e acessar como vendedor, utilize as seguintes credenciais: 
   - Login: fulana@deliveryapp.com
   - Senha: fulana@123

10. Para testar e acessar como administrador, utilize as seguintes credenciais: 
   - Login: adm@deliveryapp.com
   - Senha: --adm2@21!!--
  

## Arquitetura e Estrutura do Projeto - Back-end
`back-end/src/database`- Na pasta database está a configuração do banco de dados na pasta `/config`, a configuração das Models, as migrations e os seeders do banco de dados utilizando o Sequelize.

`back-end/src/services` - Na pasta service fazemos o tratamento dos dados antes de fazer a requisição ao banco de dados e/ou checamos e tratamos a resposta do banco de dados. É onde chamamos a função para criptografia das senhas, verificamos se não estamos tentanto criar um usuário que já existe no banco de dados e fazemos o lançamento de erros caso algo não saia como o esperado.

`back-end/src/controllers` - Na pasta Controllers pegamos os dados das requisições. (ex: email e senha do login do usuário), e enviamos para o service fazer o tratamento de dados. Se tudo ocorrer bem, retornamos o 'status' para o usuário conforme o que foi feito (ex:  status 201 - CREATED ou status 200 - OK) e um json personalizado conforme requisição. Se algo não ocorrer bem, capturamos o erro com try/catch e passamos para o gerenciador de erros genérico através do 'next'.

`back-end/src/routes` - na pasta routes é onde separamos e organizamos as rotas.

`back-end/src/api` - pasta onde é configurado o servidor no arquivo 'server.js' e é chamado o servidor e as rotas na pasta 'app.js'

`back-end/src/middlewares` - pasta onde temos nosso middleware de erros, captura o status e a mensagem de erro personalizado e retorna ao usuário, e, caso seja um erro desconhecido, retorna um status 500 com a mensagem 'Internal Server Error'.

`back-end/src/utils` -  pasta onde fica os utilitários 'genericErrorHandler.js' para gerar o status e o erro da mensagem personalizada, e o 'JWT.js', responsável pela validação e geração de token para cada usuário.

`back-end/src/tests`- pasta onde está centralizado os testes unitários de back-end;


## Arquitetura e Estrutura do Projeto - Front-end
`front-end/src/components` - Na pasta componentes é onde foi componetizado elementos que seriam usados mais de uma vez nas paginas, como Navbar e a ordenzação dos produtos.

`front-end/src/context` - Usamos o context para gerir o estado global das 'props'.

`front-end/src/pages` - Na pasta page é onde está montado cada pagina do projeto, como página de login e página de compras.

`front-end/src/tests` - Pasta onde está centralizado os testes unitários do front-end.

`front-end/src/utils` - Na pasta utils, separamos dois arquivos  com o 'data-test-ids' utilizados no projeto.

`front-end/App.js` - No arquivo App.js é onde é chamado e rendenizado as páginas e as rotas do projeto.


obs: ainda falta a estilização do projeto.








