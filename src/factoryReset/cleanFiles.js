const fs = require('fs');

const defaultKeys = {
  keys: [],
};
const defaultGatewayConfig = {
  radio: {
    mac: null,
  },
  cloud: {
    serverName: 'localhost',
    port: 3000,
    uuid: '4dea9c68-b2d1-4c52-b286-4ef30b94860a',
    token: '217775f6dad47c9a34f17ba59349c84ad5bb7d30',
  },
};
const fileNameKeys = '/etc/knot/keys.json';
const fileNameConfig = '/etc/knot/gatewayConfig.json';

function cleanKeys(done) {
  const strDefaultKeys = JSON.stringify(defaultKeys, null, 2);
  fs.writeFile(fileNameKeys, strDefaultKeys, 'utf8', (errWrite) => {
    if (errWrite) {
      console.error(errWrite);
      done(errWrite);
    }
    done();
  });
}

function cleanConfig(done) {
  const strDefaultGatewayConfig = JSON.stringify(defaultGatewayConfig, null, 2);
  fs.writeFile(fileNameConfig, strDefaultGatewayConfig, 'utf8', (errWrite) => {
    if (errWrite) {
      console.error(errWrite);
      done(errWrite);
    }
    done();
  });
}

module.exports = function cleanFiles(done) {
  cleanKeys((err) => {
    if (err) {
      console.error(err);
    }
    cleanConfig(done);
  });
};
