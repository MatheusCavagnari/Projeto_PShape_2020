exports.up = function(knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('alunos', table => {
    table.increments('id').primary();
    table.string('observacoes').notNullable();
    table.string('objetivo').notNullable();
    table.string('sexo', 1).notNullable();
    table.string('telefone', 11).notNullable();
    table.string('whatsapp', 14).notNullable();
    table.date('data_nasc').notNullable();
    table.integer('id_personal').references('id').inTable('personal');
  })
}

exports.down = function(knex) {
  // VOLTAR ATRAS (DELETAR A TABELA)
  return knex.schema.dropTable('alunos');
}