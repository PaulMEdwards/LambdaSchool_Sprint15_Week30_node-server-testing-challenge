const bcrypt = require('bcryptjs');
const passwordStrength = 8;

exports.seed = function(knex) {
  return knex('users').insert([
    {
      //id: 1,
      username: 'TestAdmin',
      password: bcrypt.hashSync('AdminPassword', passwordStrength),
      email: 'testadmin@example.com',
      enabled: 1,
    },
    {
      //id: 2,
      username: 'TestUser1',
      password: bcrypt.hashSync('User1Password', passwordStrength),
      email: 'testuser1@example.com',
      enabled: 1,
    },
    {
      //id: 3,
      username: 'TestUser2',
      password: bcrypt.hashSync('User2Password', passwordStrength),
      email: 'testuser2@example.com',
      enabled: 1,
    },
    {
      //id: 4,
      username: 'TestUser3',
      password: bcrypt.hashSync('User3Password', passwordStrength),
      email: 'testuser3@example.com',
      enabled: 0,
    },
  ]);
};
