const { expect } = require('chai');
const request = require('superagent');
const { MongoClient } = require('mongodb');
const CARS_DATA = require('../../data/cars');

const gatewayUtils = require('../gateway.utils');

describe('POST /cars/', function () {
  const collections = {};

  before(async () => {
    await gatewayUtils.initialize();
    const db = (await MongoClient.connect('mongodb://localhost:27017/rent-a-car', { useUnifiedTopology: true })).db();
    collections.cars = db.collection('cars');

    await collections.cars.deleteMany({});
  });

  beforeEach(async () => {
    await collections.cars.insertMany([
      CARS_DATA['AA-768-RT'],
      CARS_DATA['DR-985-PO'],
      CARS_DATA['AT-029-PO']
    ]);
  });

  afterEach(async () => {
    await collections.cars.deleteMany({});
  });

  /** JE ME BASE SUR L'EXEMPLE SUIVANT 
   * https://medium.com/@Jscrambler/testing-apis-with-mocha-1d75bd4bcc0f
   * https://developer.mozilla.org/fr/docs/Web/HTTP/Status
   */
  it('should save one or several cars from a list', async () => {
    request.post('/cars')
        .send([{ _id: 'AT-029-PO', brand: 'Porsche', model: 'Cayman' }])
        .expect(201)
        .end(function(err, res) {
            done(err);
        });
  });

  it('should NOT save one or several cars from a list if a car is not made according to the specific data model', async () => {
    request.post('/car')
        .send([{ _id: 'AT-029-PO', brand: 'Porsche'}])
        .expect(422)
        .end(function(err, res) {
          done(err);
        });
  });
});