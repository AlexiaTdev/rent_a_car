const { expect } = require('chai');
const request = require('superagent');
const { MongoClient } = require('mongodb');
const CARS_DATA = require('../../data/cars');

const gatewayUtils = require('../gateway.utils');

describe('GET /cars', function () {
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

  it('should return a list of cars', async () => {
    const { body } = await request.get('http://localhost:3333/cars');
    const expectedCars = [CARS_DATA['AA-768-RT'], CARS_DATA['DR-985-PO']].map((car) => {
      return {
        _links: {
          self: { href: `http://localhost:3333/cars/${car._id}` }
        },
        id: car._id,
        brand: car.brand,
        model: car.model
      };
    });
    const expectedBody = {
      total: expectedCars.length,
      _links: {
        self: { href: 'http://localhost:3333/cars' }
      },
      _embedded: { cars: expectedCars }
    };
    expect(body).to.be.deep.equal(expectedBody);
  });
});

describe('GET /cars/filtre', function () {
  it('should return a list of filtered cars list by model with an existing model', async () => {
    //const { body } = await request.get('http://localhost:3333/cars/filtre?');
    //const expectedCars = [].map((car) => {});
    //const expectedBody = {};
    //expect(body).to.be.deep.equal(expectedBody);
  });
  it('should NOT return a list of filtered cars list by model with a non existing model', async () => {
    //const { body } = await request.get('http://localhost:3333/cars/filtre?');
    //const expectedCars = [].map((car) => {});
    //const expectedBody = {};
    //expect(body).to.be.deep.equal(expectedBody);
  });

  it('should return a list of filtered cars list by brand with an existing brand', async () => {
    //const { body } = await request.get('http://localhost:3333/cars/filtre?');
    //const expectedCars = [].map((car) => {});
    //const expectedBody = {};
    //expect(body).to.be.deep.equal(expectedBody);
  });
  it('should return a list of filtered cars list by brand with a non existing brand', async () => {
    //const { body } = await request.get('http://localhost:3333/cars/filtre?');
    //const expectedCars = [].map((car) => {});
    //const expectedBody = {};
    //expect(body).to.be.deep.equal(expectedBody);
  });

  it('should NOT return a list of filtered cars with a wrong filter', async () => {
    //const { body } = await request.get('http://localhost:3333/cars/filtre?');
    //const expectedCars = [].map((car) => {});
    //const expectedBody = {};
    //expect(body).to.be.deep.equal(expectedBody);
  });
})
