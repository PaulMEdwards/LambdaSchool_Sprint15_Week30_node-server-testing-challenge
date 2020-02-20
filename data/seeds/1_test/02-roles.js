exports.seed = function(knex) {
  return knex('roles').insert([
    {
      //id: 1,
      name: 'Talent',
      description: 'Actors & Actresses',
    },
    {
      //id: 2,
      name: 'Accounting',
      description: 'Number crunchers & Bean counters',
    },
    {
      //id: 3,
      name: 'Legal',
      description: 'Police, Detectives, Lawyers, Judges',
    },
    {
      //id: 4,
      name: 'Executive',
      description: 'Corporate stiffs & Swindlers',
    },
    {
      //id: 5,
      name: 'Transportation',
    },
    {
      //id: 6,
      name: 'Food Service',
    },
    {
      //id: 7,
      name: 'Deceased',
    },
  ]);
};
