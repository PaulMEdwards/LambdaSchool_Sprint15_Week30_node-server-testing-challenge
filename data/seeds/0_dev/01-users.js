const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').insert([
    {
      //id: 1,
      username: 'TestAdmin',
      password: bcrypt.hashSync('AdminPassword', 10),
      email: 'testadmin@example.com',
      enabled: 1,
    },
    {
      //id: 2,
      username: 'TestUser1',
      password: bcrypt.hashSync('User1Password', 10),
      email: 'testuser1@example.com',
      enabled: 1,
    },
    {
      //id: 3,
      username: 'TestUser2',
      password: bcrypt.hashSync('User2Password', 10),
      email: 'testuser2@example.com',
      enabled: 1,
    },
    {
      //id: 4,
      username: 'TestUser3',
      password: bcrypt.hashSync('User3Password', 10),
      email: 'testuser3@example.com',
      enabled: 0,
    },
  ]);
};
