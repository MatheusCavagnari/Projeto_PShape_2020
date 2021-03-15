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
    
    await connection('treino')
      .where('treino.id', '=', id) 
      .update({
        nome
      })

      const exerciciosRepeticaoBco = await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .select('repeticao_id')
      
      
      const exerciciosTempoBco = await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .select('tempo_id')
      
      await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .del()


      exerciciosRepeticaoBco.forEach(async exercicio => {
        if(exercicio.repeticao_id !== null){
          await connection('repeticao')
            .where('repeticao.id', '=', exercicio.repeticao_id)
            .del()
        }
        // console.log("repeticao =",exercicio.repeticao_id)
      })


    exerciciosTempoBco.forEach(async exercicio => {
      if(exercicio.tempo_id !== null){
        await connection('tempo')
          .where('tempo.id', '=', exercicio.tempo_id)
          .del()
      }
      // console.log("tempo =", exercicio.tempo_id)
    })


      exercicios.forEach( async (exercicio) => {
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
              treino_id: id,
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
              treino_id: id,
              exercicio_id: exercicio.exercicio_id,
              tempo_id
            })
        }
  
      });

    
    return response.status(204).send()
  },

  async delete(request, response) {
    const { id } = request.params

    const exerciciosRepeticaoBco = await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .select('repeticao_id')
      
      
      const exerciciosTempoBco = await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .select('tempo_id')

      await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .del()


      exerciciosRepeticaoBco.forEach(async exercicio => {
        if(exercicio.repeticao_id !== null){
          await connection('repeticao')
            .where('repeticao.id', '=', exercicio.repeticao_id)
            .del()
        }
        // console.log("repeticao =",exercicio.repeticao_id)
      })

      exerciciosTempoBco.forEach(async exercicio => {
        if(exercicio.tempo_id !== null){
          await connection('tempo')
            .where('tempo.id', '=', exercicio.tempo_id)
            .del()
        }
        // console.log("tempo =", exercicio.tempo_id)
      })

      await connection('treino')
        .where('treino.id', '=', id)
        .del()

  
    return response.status(204).send()
  },

  async index(request, response) {
    const aluno_id = request.query.aluno
    const nomeTreino = request.query.nome
    console.log(aluno_id)
    if(aluno_id){
      const treinos = await connection('aluno_treino')
        .join('treino', 'aluno_treino.treino_id', '=', 'treino.id')
        .where('aluno_treino.aluno_id', '=', aluno_id )
      return response.json(treinos)
    }else if(nomeTreino) {
      const treinos = await connection('aluno_treino')
        // .join('treino', 'aluno_treino.treino_id', '=', 'treino.id')
        .whereNull('aluno_treino.aluno_id')
        .join('treino', 'aluno_treino.treino_id', '=', 'treino.id')
        .andWhere("treino.nome", "=", nomeTreino)
      return response.json(treinos)
    }else {
      const treinos = await connection('treino')
        .whereNotNull('treino.nome')
      return response.json(treinos)
    }
    
    // return response.json(treinos)
  }
}