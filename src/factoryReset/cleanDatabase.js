const { MongoClient } = require('mongodb');

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/knot_fog';
const databaseName = 'knot_fog';
module.exports = (done) => {
  MongoClient.connect(databaseUri, (err, client) => {
    if (err) {
      console.error(err);
      done(err);
    }
    const db = client.db(databaseName);
    db.dropDatabase();
    client.close();
    done();
  });
};
