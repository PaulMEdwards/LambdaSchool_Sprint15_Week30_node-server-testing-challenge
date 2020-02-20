const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').insert([
    {
      //id: 1,
      username: 'Test',
      password: bcrypt.hashSync('Test', 10),
      email: 'test@example.com',
      enabled: 1,
    },
  ]);
};
