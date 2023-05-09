exports.up = (knex) => knex.schema.createTable('articles', (table) => {
  table.increments('id');
  table.string('title').notNullable();
  table.string('description').notNullable();
  table.integer('creatorId');
  table.integer('editorId');
});

exports.down = (knex) => knex.schema.dropTable('articles');
