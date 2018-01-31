import tape from 'tape';
import around from 'tape-around';
import fs from 'fs-extra';
import JsonSettingsStore from 'infrastructure/JsonSettingsStore';
import State from 'entities/State';
import Address from 'entities/Address';
import Credentials from 'entities/Credentials';

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

const configDataWithStateUser = {
  state: State.READY.name,
  user: {
    uuid: 'aea3138d-a43e-45c6-9cd6-626c77790005',
    token: '427eaeced6dca774e4c62409074a256f04701f8d',
  },
};

const configDataWithStateGateway = {
  state: State.READY.name,
  gateway: {
    uuid: 'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    token: '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
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

createTest(configDataWithStateUser)(
  'getUser() returns user configuration as Credentials',
  async (t, settingsStore) => {
    const user = await settingsStore.getUser();

    t.true(user instanceof Credentials);
    t.end();
  },
);

createTest(configDataWithStateUser)(
  'getUser() returns the user configuration from the file',
  async (t, settingsStore) => {
    const user = await settingsStore.getUser();
    const credentials = new Credentials(
      'aea3138d-a43e-45c6-9cd6-626c77790005',
      '427eaeced6dca774e4c62409074a256f04701f8d',
    );

    t.deepEqual(user, credentials);
    t.end();
  },
);

createTest(configDataWithState)(
  'getUser() returns null if the file doesn\'t contain the user object',
  async (t, settingsStore) => {
    const user = await settingsStore.getUser();

    t.equal(user, null);
    t.end();
  },
);

createTest(configDataWithState)(
  'setCloud() writes cloud object on the file',
  async (t, settingsStore) => {
    const address = new Address('localhost', 3000);
    await settingsStore.setCloud(address);

    const fileData = await fs.readJson(configFilePath);
    t.true(fileData.cloud);
    t.end();
  },
);

createTest(configDataWithState)(
  'setCloud() writes cloud object on the file with the address contents',
  async (t, settingsStore) => {
    const address = new Address('localhost', 3000);
    await settingsStore.setCloud(address);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.cloud, address);
    t.end();
  },
);

createTest(configDataWithStateCloud)(
  'setCloud() update the cloud object if it exists',
  async (t, settingsStore) => {
    const address = new Address('remotehost', 3001);
    await settingsStore.setCloud(address);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.cloud, address);
    t.end();
  },
);

createTest(configDataWithStateUser)(
  'setCloud() writes cloud object without changing the user credentials',
  async (t, settingsStore) => {
    const address = new Address('localhost', 3000);
    const credentials = new Credentials(
      'aea3138d-a43e-45c6-9cd6-626c77790005',
      '427eaeced6dca774e4c62409074a256f04701f8d',
    );
    await settingsStore.setCloud(address);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.user, credentials);
    t.end();
  },
);

createTest(configDataWithStateGateway)(
  'setCloud() writes cloud object without changing the gateway credentials',
  async (t, settingsStore) => {
    const address = new Address('localhost', 3000);
    const credentials = new Credentials(
      'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
      '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
    );
    await settingsStore.setCloud(address);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.gateway, credentials);
    t.end();
  },
);

createTest(configDataWithState)(
  'setUser() writes user object on the file',
  async (t, settingsStore) => {
    const credentials = new Credentials(
      'aea3138d-a43e-45c6-9cd6-626c77790005',
      '427eaeced6dca774e4c62409074a256f04701f8d',
    );
    await settingsStore.setUser(credentials);

    const fileData = await fs.readJson(configFilePath);
    t.true(fileData.user);
    t.end();
  },
);

createTest(configDataWithState)(
  'setUser() writes user object on the file with the credentials contents',
  async (t, settingsStore) => {
    const credentials = new Credentials(
      'aea3138d-a43e-45c6-9cd6-626c77790005',
      '427eaeced6dca774e4c62409074a256f04701f8d',
    );
    await settingsStore.setUser(credentials);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.user, credentials);
    t.end();
  },
);

createTest(configDataWithStateUser)(
  'setUser() update user object if it exists',
  async (t, settingsStore) => {
    const credentials = new Credentials(
      'e97f690b-3c3b-40e8-956d-584956580000',
      '255a93fb56248669315d269a16c889ae2aa20ca2',
    );
    await settingsStore.setUser(credentials);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.user, credentials);
    t.end();
  },
);

createTest(configDataWithStateCloud)(
  'setUser() writes user object without changing the cloud credentials',
  async (t, settingsStore) => {
    const credentials = new Credentials(
      'aea3138d-a43e-45c6-9cd6-626c77790005',
      '427eaeced6dca774e4c62409074a256f04701f8d',
    );
    await settingsStore.setUser(credentials);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.user, credentials);
    t.end();
  },
);

createTest(configDataWithStateGateway)(
  'setUser() writes user object without changing the gateway credentials',
  async (t, settingsStore) => {
    const userCredentials = new Credentials(
      'aea3138d-a43e-45c6-9cd6-626c77790005',
      '427eaeced6dca774e4c62409074a256f04701f8d',
    );
    const gatewayCredentials = new Credentials(
      'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
      '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
    );
    await settingsStore.setUser(userCredentials);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.gateway, gatewayCredentials);
    t.end();
  },
);

createTest(configDataWithState)(
  'setGateway() writes gateway object on the file',
  async (t, settingsStore) => {
    const credentials = new Credentials(
      'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
      '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
    );
    await settingsStore.setGateway(credentials);

    const fileData = await fs.readJson(configFilePath);
    t.true(fileData.gateway);
    t.end();
  },
);

createTest(configDataWithState)(
  'setGateway() writes gateway object on the file with the credentials contents',
  async (t, settingsStore) => {
    const credentials = new Credentials(
      'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
      '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
    );
    await settingsStore.setGateway(credentials);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.gateway, credentials);
    t.end();
  },
);

createTest(configDataWithStateGateway)(
  'setGateway() updates gateway object if it exists',
  async (t, settingsStore) => {
    const credentials = new Credentials(
      'e97f690b-3c3b-40e8-956d-584956580000',
      '255a93fb56248669315d269a16c889ae2aa20ca2',
    );
    await settingsStore.setGateway(credentials);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.gateway, credentials);
    t.end();
  },
);

createTest(configDataWithStateCloud)(
  'setGateway() writes gateway object without changing the cloud address',
  async (t, settingsStore) => {
    const address = new Address('localhost', 3000);
    const credentials = new Credentials(
      'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
      '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
    );
    await settingsStore.setGateway(credentials);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.cloud, address);
    t.end();
  },
);

createTest(configDataWithStateUser)(
  'setGateway() writes gateway object without changing the user credentials',
  async (t, settingsStore) => {
    const userCredentials = new Credentials(
      'aea3138d-a43e-45c6-9cd6-626c77790005',
      '427eaeced6dca774e4c62409074a256f04701f8d',
    );
    const gatewayCredentials = new Credentials(
      'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
      '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
    );
    await settingsStore.setGateway(gatewayCredentials);

    const fileData = await fs.readJson(configFilePath);
    t.deepEqual(fileData.user, userCredentials);
    t.end();
  },
);
