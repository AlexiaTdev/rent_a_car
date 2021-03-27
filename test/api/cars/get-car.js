const { expect } = require('chai');
const request = require('superagent');
const { MongoClient } = require('mongodb');
const CARS_DATA = require('../../data/cars');

const gatewayUtils = require('../gateway.utils');

describe('GET /car/:id', function () {
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
      CARS_DATA['DR-985-PO']
    ]);
  });

  afterEach(async () => {
    await collections.cars.deleteMany({});
  });

  it('should return the requested car', async () => {
    const { body } = await request.get('http://localhost:3333/cars/AA-768-RT');
    const car = CARS_DATA['AA-768-RT'];
    const expectedCar = {
      _links: {
        self: { href: 'http://localhost:3333/cars/AA-768-RT' }
      },
      id: car._id,
      brand: car.brand,
      model: car.model
    };
    expect(body).to.be.deep.equal(expectedCar);
  });

  it('should return the a 404 not found error if requested car does not exist', async () => {
    try {
      await request.get('http://localhost:3333/cars/UNKNOWN');
      fail('must return a 404 not found error');
    } catch (error) {
      const { status, response } = error;
      expect(status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'the requested car does not exist' });
    }
  });
});
