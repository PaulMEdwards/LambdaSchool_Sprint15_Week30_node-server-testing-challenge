exports.seed = function(knex) {
  return knex('user_roles').insert([
    //TestAdmin
    { user_id: 1, role_id: 1 },   //Administrator
    { user_id: 1, role_id: 2 },   //User
    //TestUser1
    { user_id: 2, role_id: 2 },   //User
    //TestUser2
    { user_id: 3, role_id: 2 },   //User
    //TestUser3
    { user_id: 4, role_id: 2 },   //User
  ]);
};
