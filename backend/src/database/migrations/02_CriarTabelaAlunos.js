exports.up = async function(knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('alunos', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('observacoes').notNullable();
    table.string('objetivo').notNullable();
    table.specificType('sexo', 'char(1)').notNullable();
    table.specificType('telefone', 'char(11)').notNullable();
    table.specificType('whatsapp', 'char(14)').notNullable();
    table.integer('personal_id').references('id').inTable('personal').notNullable().unsigned();
    table.date('data_nasc').notNullable();

    
  })
}

exports.down = async function(knex) {
  // VOLTAR ATRAS (DELETAR A TABELA)
  return knex.schema.dropTable('alunos');
}