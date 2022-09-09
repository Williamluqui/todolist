
exports.up = (knex) => 
   knex.schema.createTable('users', table =>{
    table.increments('id').primary();
    table.string('name',100).notNullable();
    table.string('email',50).unique().notNullable();
    table.string('password',250).notNullable();
    table.string('id_photo');
    table.string('confirm_email').notNullable();
    table.timestamps(true, true);
   

})


exports.down = (knex) => knex.schema.dropTable('users');
  



