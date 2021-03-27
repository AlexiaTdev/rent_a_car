function formatCar(car) {
  car.id = car._id;
  delete car._id;
  return {
    _links: {
      self: { href: `http://localhost:3333/cars/${car.id}` }
    },
    ...car
  }
}

function formatCars(cars) {
  return {
    total: cars.length,
    _links: {
      self: { href: 'http://localhost:3333/cars' }
    },
    _embedded: { cars: cars.map(formatCar) }
  }
}

module.exports = {
  formatCar,
  formatCars
};
