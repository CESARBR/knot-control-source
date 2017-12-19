const cleanFiles = require('./factoryReset/cleanFiles');

module.exports = (done) => {
  cleanFiles((errFiles) => {
    if (errFiles) {
      console.error(errFiles);
      done(errFiles);
    }
    done();
  });
};
