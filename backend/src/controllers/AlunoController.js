const connection = require('../database/connection')

module.exports = {
  async create( request, response ) {
    const { nome, telefone, whatsapp, objetivo, observacoes, sexo, data_nasc } = request.body
    const personal_id = request.headers.personal

    const aluno = await connection('alunos').insert({
      personal_id,
      nome,
      telefone,
      whatsapp,
      objetivo,
      observacoes,
      sexo,
      data_nasc
    })

    return response.json(aluno)
  },

  async update(request, response) {
    const { nome, telefone, whatsapp, objetivo, observacoes, sexo, data_nasc } = request.body
    const { id } = request.params

    const aluno = await connection('alunos')
      .where('alunos.id', '=', id)
      .update({
        nome,
        telefone,
        whatsapp,
        objetivo,
        observacoes,
        sexo,
        data_nasc
      })

    return response.json(aluno)
  },

  async delete() {

  },

  async index(request, response) {
    const personal_id = request.headers.personal
    const alunos = await connection('alunos')
      .where('alunos.personal_id', '=', personal_id)

    return response.json(alunos)
  }
}