require('dotenv').config();
require('../src/helpers/module-alias');

module.exports = {
  App: {
    port: '1234',
    env: 'development',
    mongoUri: 'fake-mongo-uri',
  },
};
