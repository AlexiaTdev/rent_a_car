let apiInitialized = false;

module.exports = {
  initialize: async function () {
    if (!apiInitialized) {
      await require('../../src/containers/gateway').init();
      apiInitialized = true;
    }
  }
};
