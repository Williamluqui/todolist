// LISTA DE TAREFAS //

exports.up = (knex) => 
   knex.schema.createTable('list', table =>{
    table.increments('id').primary();
    table.text('body').notNullable();
    table.boolean('checked').notNullable().default(false);
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id')
    .references('users.id')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    table.timestamps(true, true);
   
})


exports.down =(knex) => knex.schema.dropTable('list');
