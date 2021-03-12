const connection = require('../database/connection')


module.exports = {
  async create( request, response ) {
    const { nome, maquina, tipo } = request.body
    const personal_id = request.headers.personal

    const exercicio = await connection('exercicio').insert({
      nome, 
      maquina,
      tipo, 
      personal_id
    })

    return response.json(exercicio)
  },

  async update(request, response) {
    const { nome, maquina, tipo } = request.body
    const { id } = request.params

    const exercicio = await connection('exercicio')
      .where('exercicio.id', '=', id)
      .update({
        nome, 
        maquina,
        tipo
      })

    return response.json(exercicio)

  },

  async delete(request, response) {
    const { id } = request.params

    await connection('exercicio')
      .where('id', id)
      .delete()

    return response.status(204).send()
  },

  async index(request, response) {
    const exercicios = await connection('exercicio')
      .where('exercicio.personal_id', '=', personal_id)

    return response.json(exercicios)

  }
}