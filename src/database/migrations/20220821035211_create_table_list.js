// LISTA DE TAREFAS //

exports.up = (knex) => 
   knex.schema.createTable('list', table =>{
    table.increments('id').primary();
    table.text('body').notNullable();
    table.boolean('checked').notNullable().default(false);
    table.timestamps(true, true);

})


exports.down =(knex) => knex.schema.dropTable('list');
