const supertest = require('supertest');
const server = require('../api/server.js');

const apiBase = '/api/auth';
const json = 'application/json';

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('server.js', () => {

  const apiEndpoint = apiBase+'/register';
  describe('POST '+apiEndpoint, () => {

    it('(missing required data)', async (done) => {
      const reqBody = null;
      const expStatus = 400;
      const resBody = { message: "Required data missing" };
      const res = await supertest(server).post(apiEndpoint);
      expect(res.status).toBe(expStatus);
      expect(res.type).toBe(json);
      expect(res.body).toEqual(resBody);
      expect(res.body.user).toBeUndefined();
      done();
    });

    it('(valid)', async (done) => {
      const password = "T3$tP4$$w0rd!";
      const d = new Date().toISOString();
      const body = {
        username: `TestUser_${d}`,
        email: "TestUser@example.com",
        enabled: 1
      };
      const reqBody = {
        password: password,
        ...body
      };
      const expStatus = 201;
      const resBody = body;

      const res = await supertest(server)
        .post(apiEndpoint)
        .send(reqBody)
        .set('Accept', json)
        ;

      expect(res.status).toBe(expStatus);
      expect(res.type).toBe('application/json');
      expect(res.body).toMatchObject(resBody);
      expect(res.body.id).toBeGreaterThanOrEqual(5);
      expect(res.body.password).toMatch(/^\$2a\$\d{1,}\$.*/);
      done();
    });

  });
});
