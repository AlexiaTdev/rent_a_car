const Registry = require('./Registry');

/**
 * A car.
 * @typedef {Object} Car.
 * @property {string} domain - The domain.
 * @property {string} key - The API Key.
 */

class Cars extends Registry {
  constructor(db) {
    super(db, 'cars');
  }

  /**
   * Finds all cars.
   * @returns {Promise<Car[]>} the found cars.
   */
  async findAll() {
    return this.collection.find({}).toArray();
  }

  /**
   * Finds a car by its id.
   * @returns {Promise<Car>} the found car.
   */
  async findById(id) {
    const query = { _id: id };
    return this.collection.findOne(query);
  }
}

module.exports = Cars;
