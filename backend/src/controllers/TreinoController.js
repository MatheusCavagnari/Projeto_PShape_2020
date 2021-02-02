const connection = require('../database/connection')

module.exports = {
  async create( request, response ) {
    const { nome, exercicios } = request.body
    const aluno_id = request.query.aluno

    const treino_id = await connection('treino').insert({
      nome
    })

    const data = new Date()
    const aluno_treino_id = await connection('aluno_treino').insert({
      aluno_id,
      treino_id,
      data 
    })

    exercicios.forEach( async exercicio => {
      const tipo = await connection('exercicio')
      .select('tipo')
      .where('exercicio.id', '=', exercicio.exercicio_id)

      if(tipo[0].tipo === 'R') {
        const repeticao_id = await connection('repeticao').insert({
          series: exercicio.detalhes.series,
          repeticao: exercicio.detalhes.repeticao,
          carga: exercicio.detalhes.carga,
          observacoes: exercicio.detalhes.observacoes
        })

        await connection('treino_exercicio')
          .insert({
            treino_id,
            exercicio_id: exercicio.exercicio_id,
            repeticao_id
          })

      } else {
        const tempo_id = await connection('tempo').insert({
          tempo: exercicio.detalhes.tempo,
          observacoes: exercicio.detalhes.observacoes
        })

        await connection('treino_exercicio')
          .insert({
            treino_id,
            exercicio_id: exercicio.exercicio_id,
            tempo_id
          })
      }

    });

    return response.json(aluno_treino_id)
  },

  async update(request, response) {
    const { id } = request.params
    const { nome, exercicios } = request.body
    
    const treino_id = await connection('treino')
      .where('treino.id', '=', id) 
      .update({
        nome
      })

    
  },

  async delete() {

  },

  async index() {

  }
}