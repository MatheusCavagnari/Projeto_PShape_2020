exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('exercicio', table => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('maquina').notNullable();
      table.specificType('tipo', 'char(1)').notNullable();     
    })
  }
  
  exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('exercicio');
  }