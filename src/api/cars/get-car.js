const router = require('express').Router();
const formatters = require('../formatters.utils');

module.exports = (registries) => {

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const car = await registries.cars.findById(id);
    if (car === null) {
      return res.status(404).json({ message: 'the requested car does not exist' })
    }

    res.json(formatters.formatCar(car));
  });

  return router;
};