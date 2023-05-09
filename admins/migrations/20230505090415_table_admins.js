exports.up = (knex) => knex.schema.createTable('admins', (table) => {
  table.increments('id');
  table.string('name').notNullable();
  table.string('surname').notNullable();
  table.string('login').notNullable().unique();
  table.string('password').notNullable();
  table.enu('role', ['admin']);
});

exports.down = (knex) => knex.schema.dropTable('admins');
