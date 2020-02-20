exports.seed = function(knex) {
  return knex('user_roles').insert([
    //RogerRabbit
    { user_id: 1, role_id: 1 },   //Talent
    { user_id: 1, role_id: 7 },   //Deceased
    //BabyHerman
    { user_id: 2, role_id: 1 },   //Talent
    //JessicaRabbit
    { user_id: 3, role_id: 2 },   //Accounting
    { user_id: 3, role_id: 1 },   //Talent
    //EddieValiant
    { user_id: 4, role_id: 3 },   //Legal
    //JudgeDoom
    { user_id: 5, role_id: 3 },   //Legal
    { user_id: 5, role_id: 4 },   //Executive
    //BennyTheCab
    { user_id: 6, role_id: 5 },   //Transportation
    //Dolores
    { user_id: 7, role_id: 6 },   //Food Service
    //LtSantino
    { user_id: 8, role_id: 3 },   //Legal
    //TeddyValiant
    { user_id: 9, role_id: 3 },   //Legal
    { user_id: 9, role_id: 7 },   //Deceased
    //RKMaroon
    { user_id: 10, role_id: 4 },  //Executive
    //MarvinAcme
    { user_id: 11, role_id: 4 },  //Executive
  ]);
};
