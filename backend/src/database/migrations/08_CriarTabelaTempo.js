exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('tempo', table => {
      table.increments('id').primary();
      table.string('observacoes');
      table.specificType('tempo', 'char(30)').notNullable();
 

  
      
    })
  }
  
  exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('tempo');
  }