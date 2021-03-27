const router = require('express').Router();
const formatters = require('../formatters.utils');

module.exports = (registries) => {

  router.get('/', async (req, res, next) => {
    const cars = await registries.cars.findAll();
    res.json(formatters.formatCars(cars));
  });

  router.get('')

  return router;
};