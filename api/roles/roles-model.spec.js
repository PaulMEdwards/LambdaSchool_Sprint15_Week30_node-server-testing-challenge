const db = require('../../data/dbConfig.js');
const Roles = require('./roles-model.js');

describe('roles model', () => {
  describe('insert', () => {
    const d = new Date().toISOString();

    it('should insert the provided roles into the db', async () => {
      const roles1 = await db('roles');
      const l = roles1.length;
      // console.log(`TCL: roles1.length`, l);

      await Roles.createRole({ name: 'TestRole_0_'+d });
      await Roles.createRole({ name: 'TestRole_1_'+d, description: 'TestRoleDescription_1_'+d });

      const roles2 = await db('roles');
      // console.log(`TCL: roles2.length`, roles2.length);
      expect(roles2).toHaveLength(l+2);
    });

    it('should return the inserted roles from the db', async () => {
      const roles1 = await db('roles');

      const r1 = await Roles.createRole({ name: 'TestRole_2_'+d, description: 'TestRoleDescription_'+d });
      expect(r1.name).toBe('TestRole_2_'+d);
      expect(r1.description).toBe('TestRoleDescription_'+d);

      const r2 = await Roles.createRole({ name: 'TestRole_3_'+d, description: 'TestRoleDescription_'+d });
      expect(r2.name).toBe('TestRole_3_'+d);
      expect(r2.description).toBe('TestRoleDescription_'+d);
      //Also tests that description doesn't need to be unique.
    });

    // it('should reject duplicate role name insertion', async () => {
    //   const roles1 = await db('roles');
    //   const l = roles1.length;

    //   const r1 = await Roles.createRole({ name: 'TestRole_4_'+d });
    //   console.log(`TCL: r1`, r1);
    //   const r2 = await Roles.createRole({ name: 'TestRole_4_'+d, description: 'TestRoleDescription_4_'+d });
    //   console.log(`TCL: r2`, r2);

    //   const roles2 = await db('roles');
    //   // console.log(`TCL: roles2.length`, roles2.length);
    //   expect(roles2).toHaveLength(l);
    // });
  });
});
