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

//alexia a codé ici
describe('GET /cars/filter', function () {
  /**
   * TESTS filter by model
   * grrr pas beau et certainement pas juste
   */
  it('should return a list of filtered cars list by model', async () => {
    const { body } = await request.get('http://localhost:3333/cars/filter?model=Ateca');
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

  it('should NOT return a list of filtered cars list by model with a non existing model', async () => {
    try {
      await request.get('http://localhost:3333/cars/filter?UNKNOWN=Ateca');
      fail('must return a 404 not found error');
    } catch (error) {
      const { status, response } = error;
      expect(status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'unknown filter' });
    }
  });

  /**
   * TESTS filter by brand
   * grrr pas fini
   */
  it('should return a list of filtered cars list by brand', async () => {
    const { body } = await request.get('http://localhost:3333/cars/filtre');
    const expectedCars = [CARS_DATA['AA-768-RT']].map((car) => {
      return {
        _links: {
          self: { href: `http://localhost:3333/cars/filter?model=${car.brand}` }
        },
        id: car._id,
        brand: car.brand,
        model: car.model
      };
    });
    //const expectedBody = {};
    //expect(body).to.be.deep.equal(expectedBody);
  });
  it('should return a list of filtered cars list by brand with a non existing brand', async () => {
    //const { body } = await request.get('http://localhost:3333/cars/filtre?');
    //const expectedCars = [].map((car) => {});
    //const expectedBody = {};
    //expect(body).to.be.deep.equal(expectedBody);
  });

  /**
   * TEST a combined filter of brand and model
   */
   it('should return a list of filtered cars list by brand and model', async () => {
    //const { body } = await request.get('http://localhost:3333/cars/filtre?');
    //const expectedCars = [].map((car) => {});
    //const expectedBody = {};
    //expect(body).to.be.deep.equal(expectedBody);
  });

  /**
   * TESTS filter by with the wrong filter 
   */
  it('should NOT return a list of filtered cars with a wrong filter', async () => {
    //const { body } = await request.get('http://localhost:3333/cars/filtre?');
    //const expectedCars = [].map((car) => {});
    //const expectedBody = {};
    //expect(body).to.be.deep.equal(expectedBody);
  });

  /**
   * TESTS filter by with wrong route
   */
  it('should NOT return a list of filtered cars without filter parameter', async () => {
    try {
      await request.get('http://localhost:3333/cars/UNKNOWN');
      fail('must return a 404 not found error');
    } catch (error) {
      const { status, response } = error;
      expect(status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'this filter does not exist : try "filter"' });
    }
  });
});
