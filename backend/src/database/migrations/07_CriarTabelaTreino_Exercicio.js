exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('treino_exercicio', table => {
      table.increments('id').primary();
      table.integer('treino_id').references('id').inTable('treino').notNullable().unsigned();
      table.integer('exercicio_id').references('id').inTable('exercicio').notNullable().unsigned();
      table.integer('tempo_id').references('id').inTable('tempo').notNullable().unsigned();
      table.integer('repeticao_id').references('id').inTable('repeticao').notNullable().unsigned();
      
    })
}

exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('treino_exercicio');
}