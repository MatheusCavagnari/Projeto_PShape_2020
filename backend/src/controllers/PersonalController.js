const connection = require('../database/connection')

module.exports = {
  async create( request, response ) {
    const { nome, email, senha } = request.body

    const personal = await connection('personal').insert({
      nome, 
      email,
      senha
    })
      return response.json(personal)
  },

  async update(request, response ) {
    const { nome } = request.body
    const { id } = request.params

    const personal = await connection('personal')
      .where('personal.id', '=', id)
      .update({ nome })

    return response.json(personal)
  },

  async delete() {

  },

}