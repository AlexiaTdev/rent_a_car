module.exports = function (app, registries) {
  app.use('/cars',
    require('./get-car')(registries),
    require('./get-cars')(registries));
};