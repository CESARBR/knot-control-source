const cleanDatabase = require('./factoryReset/cleanDatabase');

module.exports = (done) => {
  cleanDatabase((errDb) => {
    if (errDb) {
      console.error(errDb);
      done(errDb);
    }
    done();
  });
};
