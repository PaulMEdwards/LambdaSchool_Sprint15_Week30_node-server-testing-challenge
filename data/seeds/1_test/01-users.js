const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').insert([
    {
      //id: 1,
      username: 'RogerRabbit',
      password: bcrypt.hashSync('I<3J3ss!c4', 10),
      email: 'roger@rabbit.net',
      enabled: 0,
    },
    {
      //id: 2,
      username: 'BabyHerman',
      password: bcrypt.hashSync('I<3c!g4rs', 10),
      email: 'MrBaby@HermanCigars.com',
      enabled: 1,
    },
    {
      //id: 3,
      username: 'JessicaRabbit',
      password: bcrypt.hashSync('I<3R0g3r!', 10),
      email: 'jessica@rabbit.net',
      enabled: 1,
    },
    {
      //id: 4,
      username: 'EddieValiant',
      password: bcrypt.hashSync('D3t3ct1v3', 10),
      email: 'eddie@valiantdetectives.com',
      enabled: 1,
    },
    {
      //id: 5,
      username: 'JudgeDoom',
      password: bcrypt.hashSync('Ruthl3ss1', 10),
      email: 'doom@courts.toontown.gov',
      enabled: 1,
    },
    {
      //id: 6,
      username: 'BennyTheCab',
      password: bcrypt.hashSync('Vr00m!', 10),
      enabled: 1,
    },
    {
      //id: 7,
      username: 'Dolores',
      password: bcrypt.hashSync('0rd3rUp!', 10),
      enabled: 1,
    },
    {
      //id: 8,
      username: 'LtSantino',
      password: bcrypt.hashSync('L13ut3n4nt', 10),
      email: 'santino@police.toontown.gov',
      enabled: 1,
    },
    {
      //id: 9,
      username: 'TeddyValiant',
      password: bcrypt.hashSync('D34db33f', 10),
      email: 'teddy@valiantdetectives.com',
      enabled: 0,
    },
    {
      //id: 10,
      username: 'RKMaroon',
      password: bcrypt.hashSync('C4rt00n$', 10),
      email: 'rk@marooncartoons.com',
      enabled: 1,
    },
    {
      //id: 11,
      username: 'MarvinAcme',
      password: bcrypt.hashSync('G4gK1ng', 10),
      email: 'marvin@acme.com',
      enabled: 1,
    },
  ]);
};
