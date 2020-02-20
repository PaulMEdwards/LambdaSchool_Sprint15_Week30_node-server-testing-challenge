exports.seed = function(knex) {
  return knex('roles').insert([
    {
      //id: 1,
      name: 'Administrator',
    },
    {
      //id: 2,
      name: 'User',
    },
  ]);
};
