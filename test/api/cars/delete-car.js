const { expect } = require('chai');
const request = require('superagent');
const { MongoClient } = require('mongodb');
const CARS_DATA = require('../../data/cars');

const gatewayUtils = require('../gateway.utils');

describe('DELETE /car/:id', function() {
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
  it('should delete a car', function(done) {
    const car = CARS_DATA['AA-768-RT'];
    request.delete('/car/' + car._id)
      .expect(201)
      .end(function(err, res) {
        done(err);
      });
  });

  it('should NOT delete a car if car does not exist', async () => {
    const car = { _id: 'A', brand: 'S', model: 'A' };
    request.delete('/car/' + car._id)
      .expect(400)
      .end(function(err, res) {
        done(err);
      });
  });
});

