import tape from 'tape';
import around from 'tape-around';
import fs from 'fs-extra';
import JsonSettingsStore from 'infrastructure/JsonSettingsStore';
import State from 'entities/State';
import Address from 'entities/Address';

const configDir = './data';
const configFilePath = `${configDir}/config.json`;
const configDataWithState = {
  state: State.READY.name,
};

const configDataWithStateCloud = {
  state: State.READY.name,
  cloud: {
    hostname: 'localhost',
    port: 3000,
  },
};

function createTest(data) {
  return around(tape)
    .before((t) => {
      fs.ensureFileSync(configFilePath);
      fs.writeJsonSync(configFilePath, data);

      const settingsStore = new JsonSettingsStore(configFilePath);
      t.next(settingsStore);
    })
    .after((t) => {
      try {
        fs.removeSync(configDir);
      } catch (e) { // eslint-disable-line no-emtpy
      }
      t.end();
    });
}

createTest(configDataWithState)('getState() returns state as State', async (t, settingsStore) => {
  const state = await settingsStore.getState();

  t.true(state instanceof State);
  t.end();
});

createTest(configDataWithState)(
  'getState() returns the state from the file',
  async (t, settingsStore) => {
    const state = await settingsStore.getState();

    t.equal(state, State.READY);
    t.end();
  },
);

createTest(configDataWithStateCloud)(
  'getCloud() returns cloud configuration as Address',
  async (t, settingsStore) => {
    const configuration = await settingsStore.getCloud();

    t.true(configuration instanceof Address);
    t.end();
  },
);

createTest(configDataWithStateCloud)(
  'getCloud() returns the configuration from the file',
  async (t, settingsStore) => {
    const configuration = await settingsStore.getCloud();

    t.deepEqual(configuration, new Address('localhost', 3000));
    t.end();
  },
);

createTest(configDataWithState)(
  'getCloud() returns null if the file doesn\'t contain the cloud object',
  async (t, settingsStore) => {
    const configuration = await settingsStore.getCloud();

    t.equal(configuration, null);
    t.end();
  },
);
