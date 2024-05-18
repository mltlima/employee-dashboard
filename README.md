# Teste para Desenvolvedor Full Stack - RBR Digital

Uma aplicação de dashboard administrativo simples para gerenciar uma lista de funcionários, incluindo a criação, leitura, atualização e exclusão de registros de funcionários.

## Tecnologias Utilizadas

- Frontend:
  - React
  - Next.js
  - Chakra UI
  - TypeScript

- Backend:
  - Node.js
  - Express.js
  - MongoDB (Mongoose)

## Pré-requisitos

- Node.js (v14 ou superior)
- Docker (optional para o MongoDB)
- MongoDB (Se não usar o docker)

## Configuração do Ambiente

1. **Clone o Repositório**

   ```sh
   git clone https://github.com/seu-usuario/employee-dashboard.git
   cd employee-dashboard

2. **Configuração do Backend**

- Navegue até o diretório backend e instale as dependências:

    ``` 
    cd backend
    npm install
- Adicione conexão MongoDB no .env 27020 se usar docker, 27017 ou outra porta para conexão local
    ```
    MONGO_URI=mongodb://localhost:27020/employee-dashboard

3. **Configuração do Frontend**

- Navegue até o diretório frontend e instale as dependências:

    ```
    cd ../frontend
    npm install
- Adicione a conexão do server backend no .env 
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
4. **Configuração do MongoDB com Docker**
- Navegue até o diretório backend e inicie o MongoDB usando Docker:
    ```
    cd ../backend
    docker-compose up -d
## Executando a Aplicação

### Iniciar o Backend

No diretório `backend`, execute:

```sh
npm run dev
```

O servidor backend estará disponível em `http://localhost:5000`.

### Iniciar o Frontend

No diretório `frontend`, execute:

```sh
npm run dev
```

O servidor frontend estará disponível em `http://localhost:3000`.

## Funcionalidades

### Página Inicial do Dashboard:

- Exibir uma tabela de funcionários com colunas para nome, cargo, departamento e ações (editar/excluir).
- Incluir um botão para adicionar um novo funcionário.
- Implementar funcionalidade de ordenação e busca na lista de funcionários.

### Página de Adicionar Funcionário:

- Um formulário para adicionar um novo funcionário com campos para nome, cargo, departamento e data de admissão.
- Validar os campos do formulário antes de enviar.

### Página de Editar Funcionário:

- Um formulário para editar os detalhes de um funcionário existente.
- Preencher o formulário com os detalhes atuais do funcionário.
- Validar os campos do formulário antes de enviar.

## API do Backend

Implementar endpoints RESTful para operações CRUD:

- `GET /api/employees` - Recuperar todos os funcionários.
- `GET /api/employees/:id` - Recuperar um único funcionário pelo ID.
- `POST /api/employees` - Criar um novo funcionário.
- `PUT /api/employees/:id` - Atualizar um funcionário pelo ID.
- `DELETE /api/employees/:id` - Excluir um funcionário pelo ID.

