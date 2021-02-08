const connection = require('../database/connection')
const bcrypt = require('bcrypt-nodejs')

module.exports = {
  //  encryptPassword (password)  {
  //   const salt = bcrypt.genSaltSync(10)
  //   return bcrypt.hashSync(password, salt)
  // },

  async create( request, response ) {
    const { nome, email, senha, confirmarSenha } = request.body

    if(senha !== confirmarSenha){
      return response.status(400).send("Senhas não conferem.")
    }

    const salt = bcrypt.genSaltSync(10);

    var senhaCrypt = bcrypt.hashSync(senha, salt)

    const personal = await connection('personal').insert({
      nome, 
      email,
      senha: senhaCrypt
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