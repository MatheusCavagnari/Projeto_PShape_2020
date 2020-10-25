exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('repeticao', table => {
      table.increments('id').primary();
      table.string('observacoes').notNullable();
      table.integer('series').notNullable();
      table.integer('serepeticaoies').notNullable();
      table.integer('carga');
      

  
      
    })
  }
  
  exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('repeticao');
  }