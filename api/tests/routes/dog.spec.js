/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  id: '670b9562-b30d-52d5-b827-655787665500', 
  weight: '2 - 7',
  height: '30 - 65',
  life_span: '10 - 15',
  temperament: "Active",
  image: 'https://t1.uc.ltmcdn.com/images/3/7/7/img_como_cuidar_de_un_braco_aleman_4773_orig.jpg'
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});
