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

  async update() {

  },

  async delete() {

  },

}