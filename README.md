# Delivery App

## Sobre
O Delivery App é um projeto Full Stack desenvolvido em grupo como parte do curso da Trybe. Trata-se do desenvolvimento de um aplicativo de entrega de bebidas, no qual os usuários podem realizar as seguintes ações, dependendo do tipo de login:

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
2. Se você já possui o MySQL instalado em sua máquina, configure as variáveis de ambiente no arquivo `.env`. Caso contrário, você pode executar um banco de dados usando o comando `docker-compose up -d`.
3. Execute o comando `npm start` na raiz do projeto. Isso migrará o banco de dados e iniciará o front-end e o back-end da aplicação.
4. Sua aplicação estará pronta! Acesse-a em seu navegador utilizando o endereço `http://localhost:3000/`.
5. Para testar e acessar como cliente, utilize as seguintes credenciais: 
   - Login: 'zebirita@email.com'
   - Senha: '$#zebirita#$'

6. Para testar e acessar como vendedor, utilize as seguintes credenciais: 
   - Login: fulana@deliveryapp.com
   - Senha: fulana@123

7. Para testar e acessar como administrador, utilize as seguintes credenciais: 
   - Login: adm@deliveryapp.com
   - Senha: --adm2@21!!--

