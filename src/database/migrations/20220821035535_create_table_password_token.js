exports.up = (knex) => 
   knex.schema.createTable('password_token', table =>{
    table.increments('id').primary();
    table.integer('id_user').unsigned().notNullable();
    table.tinyint('used',3).unsigned().notNullable();
    table.string('token').notNullable();
    table.timestamps(true,true);
    table.foreign('id_user')
    .references('users.id')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
})


exports.down =(knex) => knex.schema.dropTable('password_token');