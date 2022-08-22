
exports.up = (knex) => 
   knex.schema.createTable('users', table =>{
    table.increments('id').primary();
    table.string('name',100).notNullable();
    table.string('last_name',100);
    table.string('email',50).unique().notNullable();
    table.string('password',50).notNullable();
    table.string('id_photo');
    table.timestamps(true, true);

})


exports.down =(knex) => knex.schema.dropTable('users');
  



