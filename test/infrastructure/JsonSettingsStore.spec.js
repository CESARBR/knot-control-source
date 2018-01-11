import tape from 'tape';
import around from 'tape-around';
import fs from 'fs-extra';
import JsonSettingsStore from 'infrastructure/JsonSettingsStore';
import State from 'entities/State';

const configDir = './data';
const configFilePath = `${configDir}/config.json`;
const configData = {
  state: State.READY.name,
};

const test = around(tape)
  .before((t) => {
    fs.ensureFileSync(configFilePath);
    fs.writeJsonSync(configFilePath, configData);

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

test('getState() returns state as State', async (t, settingsStore) => {
  const state = await settingsStore.getState();

  t.true(state instanceof State);
  t.end();
});

test('getState() returns the state from the file', async (t, settingsStore) => {
  const state = await settingsStore.getState();

  t.equal(state, State.READY);
  t.end();
});
