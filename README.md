Projeto de sistema de informação Personal Shape

Banco de dados MySQL
Criar novo schema com nome "pshape".

Pasta backend
comandos no terminal:
$ npm i
$ npm install knex -g
$ npx knex migrate:latest
$ npm start

População de banco
  Insomnia

  ----------------------PERSONAL--------------------------------------------------

  Cadastro personal => POST http://localhost:3333/personal
    Body: 
      {
	      "nome": "Maria Barbosa",
	      "email": "maria@gmail.com",
	      "senha": "password",
	      "confirmarSenha": "password"
      }
  Alterar personal => PUT http://localhost:3333/personal/:id
    Body: 
      {
        "nome": "João Silva",
        "senhaAntiga": "password",
        "novaSenha": "PASSWORD",
        "confirmarNovaSenha": "PASSWORD"
      }

----------------------ALUNOS--------------------------------------------------
  
  Cadastro aluno => POST http://localhost:3333/alunos
    Body: 
      {
        "nome": "Tais de Paula",
        "telefone": "42999999999",
        "whatsapp": "+5542999999999", 
        "objetivo": "Ganho de massa", 
        "observacoes": "", 
        "sexo": "F", 
        "data_nasc": "2000-01-01"
      }
    Header
      personal :id 
  Alterar Aluno => PUT http://localhost:3333/alunos/:id
    Body: 
      {
        "nome": "Luiz Carlos",
        "telefone": "42999999999",
        "whatsapp": "+5542999999999", 
        "objetivo": "Ganho de massa", 
        "observacoes": "", 
        "sexo": "M", 
        "data_nasc": "2000-01-01"
      }
    Header
      personal :id 
  Deletar Aluno => DELETE http://localhost:3333/alunos/:id
    Header
      personal :id 
  Lista Aluno => GET http://localhost:3333/alunos
    Header
      personal :id 

----------------------AGENDAMENTO--------------------------------------------------
  
  Cadastro Agendamento => POST http://localhost:3333/agendamento
    Body: 
      {
        "tipo": "A",
        "observacoes": "",
        "data_hora_agendamento": "2020-11-10 08:00:00",
        "data_hora_execucao": "",
        "aluno_id": "3"
      }
    Header
      personal :id 
  Alterar Agendamento => PUT http://localhost:3333/agendamento/:id
    Body: 
      {
        "tipo": "A",
        "observacoes": "",
        "data_hora_agendamento": "2020-12-10 10:00:00",
        "data_hora_execucao": "",
        "aluno_id": "3"
      }
    Header
      personal :id 
  Deletar Agendamento => DELETE http://localhost:3333/agendamento/:id
    Header
      personal :id 
  Lista Agendamento => GET http://localhost:3333/agendamento
    Header
      personal :id 

----------------------AVALIAÇÃO--------------------------------------------------

  Cadastro Avaliação => POST http://localhost:3333/avaliacao
    Body: 
      {
        "peso": 80.0, 
        "altura": 1.80, 
        "dobra_tricipal": 5, 
        "dobra_bicipal": 5,
        "dobra_toracica": 5,
        "dobra_panturrilha": 5,
        "dobra_abdominal": 5,
        "dobra_coxa": 5,
        "dobra_subescapular": 5,
        "dobra_supra_iliaca": 5,
        "dobra_axilar": 5,
        "data_avaliacao": "2020-01-01"
      }
    Query:
      aluno :id 
  Alterar Avaliação => PUT http://localhost:3333/avaliacao/:id 
    Body: 
      {
        "peso": 80.0, 
        "altura": 1.80, 
        "dobra_tricipal": 5.5, 
        "dobra_bicipal": 5.5,
        "dobra_toracica": 5.5,
        "dobra_panturrilha": 5.5,
        "dobra_abdominal": 5,
        "dobra_coxa": 5,
        "dobra_subescapular": 5,
        "dobra_supra_iliaca": 5,
        "dobra_axilar": 5,
        "data_avaliacao": "2020-01-01"
      }
  Deletar Avaliação => DELETE http://localhost:3333/avaliacao/:id
    Header
      personal :id 
  Lista Avaliação => GET http://localhost:3333/avaliacao
    Query
      aluno :id 

----------------------EXERCÍCIO--------------------------------------------------

  Cadastro Exercício => POST http://localhost:3333/exercicio
    Body: 
      {
        "nome": "Supino Inclinado",
        "maquina": "Banco de Supino",
        "tipo": "R"
      }
    Header:
      personal :id 
  Alterar Exercício => PUT http://localhost:3333/exercicio/:id 
    Body: 
      {
        "nome": "Corrida",
        "maquina": "Esteira",
        "tipo": "T"
      }
    Header: 
      personal :id 
  Deletar Exercício => DELETE http://localhost:3333/exercicio/:id
    Header
      personal :id 
  Lista Exercício => GET http://localhost:3333/exercicio
    Header
      personal :id 

----------------------TREINO--------------------------------------------------

  Cadastro Treino => POST http://localhost:3333/treino
    Body: 
      {
        "nome": "Iniciante",
        "exercicios": [{
          "exercicio_id": "2",
          "detalhes": {
            "tempo": "30",
            "observacoes": ""
          }
        }, {
          "exercicio_id": "3",
          "detalhes": {
            "series": "5",
            "repeticao": "15",
            "carga": "50",
            "observacoes": ""
          }
        }]
      }
    Query:
      aluno :id
    Header:
      personal :id 
  Alterar Treino => PUT http://localhost:3333/treino/:id 
    Body: 
      {
        "nome": "Avançado",
        "exercicios": [{
          "exercicio_id": "2",
          "detalhes": {
            "tempo": "30",
            "observacoes": ""
          }
        }, {
          "exercicio_id": "3",
          "detalhes": {
            "series": "5",
            "repeticao": "15",
            "carga": "50",
            "observacoes": ""
          }
        }]
      }
    Query:
      aluno :id
    Header: 
      personal :id 
  Deletar Treino => DELETE http://localhost:3333/treino/:id
    Header
      personal :id 
  Lista Treino => GET http://localhost:3333/treino
    Query
      aluno :id 
      nome :nomeTreino

----------------------AUTENTICAÇÃO----------------------------------------------

  Login => POST http://localhost:3333/personal/login
    Body:
      {
        "email": "joao@silva.com.br",
        "senha": "PASSWORD"
      }



Pasta frontend
comandos no terminal:
$ npm i
$ npm start