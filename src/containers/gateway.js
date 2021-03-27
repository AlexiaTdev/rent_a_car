const { MongoClient } = require('mongodb');
const express = require('express');

async function init() {
  const db = (await MongoClient.connect('mongodb://localhost:27017/rent-a-car', { useUnifiedTopology: true })).db();
  const registries = _initRegistries(db);

  const port = 3333;
  const app = express();
  app.use(express.json());

  require('../api/cars/routes')(app, registries);

  app.listen(port, () => {
    console.log(`Rent A Car app listening at http://localhost:${port}`);
  });
}

module.exports = {
  init
};

/**
 * Initializes all registries needed for the gateway.
 * @param {Db} db - The Mongo database.
 * @returns {Object} the initialized registries.
 * @private
 */
function _initRegistries(db) {
  const Cars = require('../registries/Cars');

  return {
    cars: new Cars(db)
  };
}