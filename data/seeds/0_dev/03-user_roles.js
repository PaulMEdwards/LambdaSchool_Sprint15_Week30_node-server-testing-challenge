exports.seed = function(knex) {
  return knex('user_roles').insert([
    //Test
    { user_id: 1, role_id: 1 },   //Administrator
    { user_id: 1, role_id: 2 },   //User
  ]);
};
