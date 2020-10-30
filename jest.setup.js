const database = require('./src/database')

afterAll(async () => {
  await database.disconnect();
});
