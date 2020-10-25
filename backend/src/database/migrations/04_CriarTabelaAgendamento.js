exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('agendamento', table => {
      table.increments('id').primary();
      table.string('observacoes');
      table.date('data_hora_agendamento').notNullable();
      table.date('data_hora_execucao').notNullable();
      table.string('string').notNullable();
      table.integer('personal_id').references('id').inTable('personal').notNullable().unsigned();
      table.integer('aluno_id').references('id').inTable('aluno').notNullable().unsigned();

      
    })
  }
  
  exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('agendamento');
  }