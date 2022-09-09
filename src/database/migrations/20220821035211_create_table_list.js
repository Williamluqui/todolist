// LISTA DE TAREFAS //

exports.up = (knex) => 
   knex.schema.createTable('list', table =>{
    table.increments('id').primary();
    table.text('body').notNullable();
    table.boolean('checked').notNullable().default(false);
    table.integer('id_user').unsigned().notNullable();
    table.foreign('id_user')
    .unsigned()
    .references('users.id')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    table.timestamps(true, true);
   
})


exports.down =(knex) => knex.schema.dropTable('list');
