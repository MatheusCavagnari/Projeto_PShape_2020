exports.up = async function(knex) {
        // CRIAR A TABELA
        return knex.schema.createTable('treino', table => {
          table.increments('id').primary();
          table.string('nome').notNullable();
        })
    }
    
    exports.down = async function(knex) {
        // VOLTAR ATRAS (DELETAR A TABELA)
        return knex.schema.dropTable('treino');
    }