const { MongoClient } = require('mongodb');
const config = require('config');

const databaseUri = `mongodb://${config.get('mongodb.host')}:${config.get('mongodb.port')}/${config.get('mongodb.db_fog')}`;

module.exports = (done) => {
  MongoClient.connect(databaseUri, (err, client) => {
    if (err) {
      console.error(err);
      done(err);
    }
    const dbFog = client.db(config.get('mongodb.db_fog'));
    const dbWeb = client.db(config.get('mongodb.db_web'));
    dbFog.dropDatabase();
    dbWeb.dropDatabase();
    client.close();
    done();
  });
};
