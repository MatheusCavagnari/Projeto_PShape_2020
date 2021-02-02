const express = require('express')
const PersonalController = require('./controllers/PersonalController')
const AlunoController = require('./controllers/AlunoController')
const AvaliacaoController = require('./controllers/AvaliacaoController')
const AgendamentoController = require('./controllers/AgendamentoController')
const ExercicioController = require('./controllers/ExercicioController')
const TreinoController = require('./controllers/TreinoController')


const routes = express.Router()

routes.post('/personal', PersonalController.create)

routes.post('/alunos', AlunoController.create)
routes.get('/alunos', AlunoController.index)
routes.put('/alunos/:id', AlunoController.update)

routes.post('/avaliacao', AvaliacaoController.create)
routes.get('/avaliacao', AvaliacaoController.index)
routes.put('/avaliacao/:id', AvaliacaoController.update)

routes.post('/agendamento', AgendamentoController.create)
routes.get('/agendamento', AgendamentoController.index)
routes.put('/agendamento/:id', AgendamentoController.update)

routes.post('/exercicio', ExercicioController.create)
routes.get('/exercicio', ExercicioController.index)
routes.put('/exercicio/:id', ExercicioController.update)

routes.post('/treino', TreinoController.create)
// routes.put('/treino/:id', TreinoController.update)

module.exports =  routes