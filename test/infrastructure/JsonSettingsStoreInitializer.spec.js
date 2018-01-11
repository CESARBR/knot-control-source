import tape from 'tape';
import around from 'tape-around';
import fs from 'fs-extra';
import JsonSettingsStoreInitializer from 'infrastructure/JsonSettingsStoreInitializer';
import State from 'entities/State';

const configFilePath = './data/config.json';

const test = around(tape)
  .before((t) => {
    try {
      fs.removeSync(configFilePath);
    } catch (e) { // eslint-disable-line no-emtpy
    }

    const initializer = new JsonSettingsStoreInitializer(configFilePath);
    t.next(initializer);
  })
  .after((t) => {
    try {
      fs.removeSync(configFilePath);
    } catch (e) { // eslint-disable-line no-emtpy
    }

    t.end();
  });

test('init() creates file when it doesn\'t exist', async (t, initializer) => {
  await initializer.init();

  const exists = await fs.pathExists(configFilePath);
  t.true(exists);
  t.end();
});

test('init() creates file with state as CONFIGURATION when it doesn\'t exist', async (t, initializer) => {
  await initializer.init();

  const config = await fs.readJson(configFilePath);
  const actualState = config.state;
  const expectedState = State.CONFIGURATION.name;

  t.deepEqual(actualState, expectedState);
  t.end();
});

test('init() doesn\'t change file when it exists', async (t, initializer) => {
  const expectedConfig = {
    state: State.READY.name,
  };
  await fs.writeJson(configFilePath, expectedConfig);

  await initializer.init();

  const actualConfig = await fs.readJson(configFilePath);
  t.deepEqual(actualConfig, expectedConfig);
  t.end();
});
