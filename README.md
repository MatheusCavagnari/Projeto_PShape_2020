# Personal Shape - Sistema de Informação para Personal Trainers

## Descrição

O Personal Shape é um sistema de informação desenvolvido para facilitar o trabalho de Personal Trainers no gerenciamento de alunos, treinos, avaliações físicas e agendamentos. Com esta aplicação, os Personal Trainers podem manter um registro detalhado de seus alunos, criar treinos personalizados, acompanhar o progresso das avaliações físicas e agendar sessões de treinamento.

## Funcionalidades

- Cadastro e gerenciamento de Personal Trainers.
- Cadastro e gerenciamento de Alunos.
- Agendamento de sessões de treinamento para Alunos.
- Registro e acompanhamento de avaliações físicas.
- Criação e gerenciamento de treinos personalizados.

## Tecnologias Utilizadas

- Backend:

  - Node.js
  - Express.js
  - MySQL (Banco de Dados)
  - Knex.js (Query Builder)
  - Autenticação (Login) usando JWT (JSON Web Tokens)

- Frontend:
  - React.js
  - Axios (para fazer as requisições HTTP ao backend)

## Instalação e Execução

### Backend

1. Instale as dependências do projeto:
2. Instale o Knex globalmente:
3. Rode as migrações para criar o banco de dados e as tabelas necessárias:

### Frontend

1. Navegue até a pasta "frontend":
2. Instale as dependências do projeto:
3. Inicie o frontend:

Acesse o aplicativo em seu navegador em http://localhost:3000.

## Endpoints da API

A API do Personal Shape possui os seguintes endpoints:

- **PERSONAL:**
- Cadastro personal
- Alterar personal

- **ALUNOS:**
- Cadastro aluno
- Alterar Aluno
- Deletar Aluno
- Lista Aluno

- **AGENDAMENTO:**
- Cadastro Agendamento
- Alterar Agendamento
- Deletar Agendamento
- Lista Agendamento

- **AVALIAÇÃO:**
- Cadastro Avaliação
- Alterar Avaliação
- Deletar Avaliação
- Lista Avaliação

- **EXERCÍCIO:**
- Cadastro Exercício
- Alterar Exercício
- Deletar Exercício
- Lista Exercício

- **TREINO:**
- Cadastro Treino
- Alterar Treino
- Deletar Treino
- Lista Treino

- **AUTENTICAÇÃO:**
- Login (para acesso ao sistema)

## Como utilizar

1. Faça login utilizando as credenciais do Personal Trainer.

2. Cadastre seus alunos no sistema.

3. Cadastre exercícios e crie treinos personalizados para seus alunos.

4. Realize avaliações físicas para acompanhar o progresso dos alunos.

5. Agende sessões de treinamento para os alunos.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum bug, tiver alguma sugestão de melhoria ou desejar adicionar novos recursos, sinta-se à vontade para abrir um pull request.

Esperamos que o Personal Shape seja útil para personal trainers no gerenciamento de seus alunos e treinamentos. Caso tenha alguma dúvida ou precise de ajuda, entre em contato.

## Licença

[MIT License](https://opensource.org/licenses/MIT)
