exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.text('username')
        .notNullable()
        .unique();
      tbl.text('password')
        .notNullable()
        .unique();
      tbl.text('email');
      tbl.boolean('enabled')
        .notNullable()
        .defaultTo(1);
    })
    .createTable('roles', tbl => {
      tbl.increments();
      tbl.text('name')
        .notNullable()
        .unique();
      tbl.text('description');
    })
    .createTable('user_roles', tbl => {
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('role_id')
        .notNullable()
        .unsigned()
        .references('roles.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.primary(['user_id', 'role_id']);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_roles')
    .dropTableIfExists('roles')
    .dropTableIfExists('users');
};
