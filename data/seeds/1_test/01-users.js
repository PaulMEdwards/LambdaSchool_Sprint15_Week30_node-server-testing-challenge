const bcrypt = require('bcryptjs');
const passwordStrength = 8;

exports.seed = function(knex) {
  return knex('users').insert([
    {
      //id: 1,
      username: 'RogerRabbit',
      password: bcrypt.hashSync('I<3J3ss!c4', passwordStrength),
      email: 'roger@rabbit.net',
      enabled: 0,
    },
    {
      //id: 2,
      username: 'BabyHerman',
      password: bcrypt.hashSync('I<3c!g4rs', passwordStrength),
      email: 'MrBaby@HermanCigars.com',
      enabled: 1,
    },
    {
      //id: 3,
      username: 'JessicaRabbit',
      password: bcrypt.hashSync('I<3R0g3r!', passwordStrength),
      email: 'jessica@rabbit.net',
      enabled: 1,
    },
    {
      //id: 4,
      username: 'EddieValiant',
      password: bcrypt.hashSync('D3t3ct1v3', passwordStrength),
      email: 'eddie@valiantdetectives.com',
      enabled: 1,
    },
    {
      //id: 5,
      username: 'JudgeDoom',
      password: bcrypt.hashSync('Ruthl3ss1', passwordStrength),
      email: 'doom@courts.toontown.gov',
      enabled: 1,
    },
    {
      //id: 6,
      username: 'BennyTheCab',
      password: bcrypt.hashSync('Vr00m!', passwordStrength),
      enabled: 1,
    },
    {
      //id: 7,
      username: 'Dolores',
      password: bcrypt.hashSync('0rd3rUp!', passwordStrength),
      enabled: 1,
    },
    {
      //id: 8,
      username: 'LtSantino',
      password: bcrypt.hashSync('L13ut3n4nt', passwordStrength),
      email: 'santino@police.toontown.gov',
      enabled: 1,
    },
    {
      //id: 9,
      username: 'TeddyValiant',
      password: bcrypt.hashSync('D34db33f', passwordStrength),
      email: 'teddy@valiantdetectives.com',
      enabled: 0,
    },
    {
      //id: 10,
      username: 'RKMaroon',
      password: bcrypt.hashSync('C4rt00n$', passwordStrength),
      email: 'rk@marooncartoons.com',
      enabled: 1,
    },
    {
      //id: 11,
      username: 'MarvinAcme',
      password: bcrypt.hashSync('G4gK1ng', passwordStrength),
      email: 'marvin@acme.com',
      enabled: 1,
    },
  ]);
};
