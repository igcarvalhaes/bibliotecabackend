# API de Gerenciamento de Biblioteca

## Visão Geral

Esta é uma API RESTful robusta para o gerenciamento de uma biblioteca. Desenvolvida com Node.js, Fastify e TypeScript, a API oferece um sistema completo para administrar livros e usuários, com um forte foco em performance, segurança e boas práticas de desenvolvimento.

A arquitetura do projeto é modular e bem definida, separando responsabilidades em rotas, controladores, serviços e schemas de validação, o que facilita a manutenção e a escalabilidade.

## Tabela de Conteúdos

- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Pilha de Tecnologias](#pilha-de-tecnologias)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Como Começar](#como-começar)
  - [Instalação](#instalação)
  - [Configurando o Ambiente](#configurando-o-ambiente)
  - [Scripts Disponíveis](#scripts-disponíveis)
- [Documentação da API](#documentação-da-api)
  - [Autenticação](#autenticação)
  - [Usuários](#usuários)
  - [Livros](#livros)
- [Schema do Banco de Dados](#schema-do-banco-de-dados)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Arquitetura do Projeto

O projeto segue uma arquitetura em camadas para garantir a separação de interesses e a organização do código:

- **`src/`**: Diretório raiz do código-fonte.
  - **`server.ts`**: Ponto de entrada da aplicação. Configura o servidor Fastify, registra plugins (como JWT e Zod) e as rotas.
  - **`routes/`**: Define os endpoints da API e os associa aos seus respectivos controladores. Utiliza o `fastify-type-provider-zod` para validar os schemas de entrada e saída.
  - **`controllers/`**: Recebe as requisições das rotas, extrai dados (body, params, headers) e chama os serviços correspondentes para executar a lógica de negócio.
  - **`services/`**: Contém a lógica de negócio principal. Interage com o banco de dados através do Prisma Client e realiza as operações necessárias.
  - **`schemas/`**: Define os schemas de validação de dados usando **Zod**. Esses schemas garantem a integridade dos dados recebidos e enviados pela API.
  - **`lib/`**: Contém a inicialização e exportação de clientes, como a instância do Prisma.
  - **`utils/`**: Funções utilitárias, como a de hash de senhas (`hash.ts`) e o carregamento de variáveis de ambiente (`env.ts`).
  - **`prisma/`**: Contém o `schema.prisma` que define o modelo de dados e o diretório de migrações.

## Pilha de Tecnologias

- **Backend**: [Node.js](https://nodejs.org/)
- **Framework**: [Fastify](https://www.fastify.io/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: [MySQL](https://www.mysql.com/)
- **Validação**: [Zod](https://zod.dev/)
- **Autenticação**: [JWT](https://jwt.io/) com `@fastify/jwt`
- **Hashing de Senha**: [BcryptJS](https://github.com/dcodeIO/bcrypt.js)

## Funcionalidades

- ✅ **Autenticação de Usuários**: Sistema seguro de login baseado em JWT.
- ✅ **Gerenciamento de Usuários**: Cadastro de novos usuários com validação e hashing de senha.
- ✅ **Perfil de Usuário**: Rota protegida para visualização dos dados do usuário logado.
- ✅ **CRUD de Livros**: Funcionalidades completas para Criar, Ler, Atualizar e Deletar livros no acervo.
- ✅ **Validação de Dados**: Validação estrita de todas as requisições e respostas com Zod.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Um servidor de banco de dados [MySQL](https://www.mysql.com/) em execução.

## Como Começar

git clone https://github.com/tg-igor/biblioteca.git
cd biblioteca
```

2.  **Inicie os containers:**
    ```bash
    docker-compose up -d
    ```

A API estará disponível em `http://localhost:3000`.

### Manualmente

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/biblioteca.git
    cd biblioteca
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Configurando o Ambiente

1.  Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o exemplo:

    ```bash
    cp .env.example .env
    ```

2.  Edite o arquivo `.env` com as suas credenciais:

    ```dotenv
    # String de conexão para o seu banco de dados MySQL
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

    # Chave secreta para a geração dos tokens JWT
    JWT_SECRET="SUA_CHAVE_SECRETA_AQUI"
    ```

3.  **Execute as migrações do Prisma** para criar as tabelas no banco de dados:
    ```bash
    npx prisma migrate dev
    ```
    Isso aplicará as migrações e gerará o Prisma Client.

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload usando `tsx`.
- `npm run build`: Compila o código TypeScript para JavaScript no diretório `dist/`.
- `npm run start`: Inicia o servidor em modo de produção a partir dos arquivos compilados.

Após iniciar com `npm run dev`, a API estará disponível em `http://localhost:3000`.

## Documentação da API

---

### Autenticação

#### `POST /login`

Autentica um usuário e retorna um token JWT.

- **Request Body**: `application/json`
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Validações**:
  - `email`: Deve ser um e-mail válido.
  - `password`: Mínimo de 1 caractere.
- **Success Response (200)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Response (400)**: `Credenciais inválidas.`

---

### Usuários

#### `POST /user`

Cria um novo usuário.

- **Request Body**: `application/json`
  ```json
  {
    "nome": "Nome do Usuário",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Validações**:
  - `nome`: Mínimo de 1 caractere.
  - `email`: Deve ser um e-mail válido.
  - `password`: Mínimo de 8 caracteres.
- **Success Response (201)**:
  ```json
  {
    "id": "clx5b0v2o000012m9c8f7a6b5",
    "nome": "Nome do Usuário",
    "email": "user@example.com"
  }
  ```
- **Error Response (409)**: `E-mail já cadastrado.`

#### `GET /profile`

Retorna os dados do usuário autenticado.

- **Authentication**: **Obrigatória**.
- **Headers**:
  - `Authorization`: `Bearer <SEU_TOKEN_JWT>`
- **Success Response (200)**:
  ```json
  {
    "id": "clx5b0v2o000012m9c8f7a6b5",
    "nome": "Nome do Usuário",
    "email": "user@example.com"
  }
  ```
- **Error Response (401)**: `Você precisa estar logado.`

---

### Livros

#### `POST /livros`

Adiciona um novo livro ao acervo.

- **Request Body**: `application/json`
  ```json
  {
    "nome": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien",
    "preco": 59.9,
    "quantidade": 15
  }
  ```
- **Validações**:
  - `nome`, `autor`: Mínimo de 1 caractere.
  - `preco`, `quantidade`: Devem ser números positivos.
- **Success Response (201)**: Retorna o objeto do livro criado.

#### `GET /livros`

Lista todos os livros cadastrados.

- **Success Response (200)**: Retorna um array de objetos de livros.

#### `PUT /livros/:id`

Atualiza os dados de um livro específico.

- **URL Params**:
  - `id`: O ID do livro a ser atualizado.
- **Request Body**: `application/json` (mesmo formato do `POST /livros`)
- **Success Response (200)**: Retorna o objeto do livro atualizado.
- **Error Response (404)**: `Livro não encontrado.`

#### `DELETE /livros/:id`

Remove um livro do acervo.

- **URL Params**:
  - `id`: O ID do livro a ser removido.
- **Success Response (204)**: Sem conteúdo.
- **Error Response (404)**: `Livro não encontrado.`

## Schema do Banco de Dados

O schema é definido em `prisma/schema.prisma` e utiliza um banco de dados MySQL.

### Modelo `User`

| Campo       | Tipo       | Atributos              | Descrição                   |
| ----------- | ---------- | ---------------------- | --------------------------- |
| `id`        | `String`   | `@id @default(uuid())` | ID único do usuário (UUID)  |
| `nome`      | `String`   |                        | Nome do usuário             |
| `email`     | `String`   | `@unique`              | Email do usuário (único)    |
| `password`  | `String`   |                        | Senha criptografada         |
| `createdAt` | `DateTime` | `@default(now())`      | Data de criação do registro |
| `updatedAt` | `DateTime` | `@updatedAt`           | Data da última atualização  |

### Modelo `Livros`

| Campo        | Tipo       | Atributos              | Descrição                   |
| ------------ | ---------- | ---------------------- | --------------------------- |
| `id`         | `String`   | `@id @default(uuid())` | ID único do livro (UUID)    |
| `nome`       | `String`   |                        | Nome do livro               |
| `autor`      | `String`   |                        | Autor do livro              |
| `preco`      | `Float`    |                        | Preço do livro              |
| `quantidade` | `Int`      |                        | Quantidade em estoque       |
| `createdAt`  | `DateTime` | `@default(now())`      | Data de criação do registro |
| `updatedAt`  | `DateTime` | `@updatedAt`           | Data da última atualização  |

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

1.  Faça um _fork_ do projeto.
2.  Crie uma nova _branch_ (`git checkout -b feature/nova-funcionalidade`).
3.  Faça o _commit_ de suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4.  Faça o _push_ para a _branch_ (`git push origin feature/nova-funcionalidade`).
5.  Abra um _Pull Request_.

## Licença

Este projeto está licenciado sob a [Licença ISC](https://opensource.org/licenses/ISC).
