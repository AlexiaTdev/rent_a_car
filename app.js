const container = require('./src/containers/gateway');

(async () => {
  try {
    await container.init();
  } catch (e) {
    console.error(e);
  }
})();