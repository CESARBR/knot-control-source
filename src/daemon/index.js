// Domain
import GetStateInteractor from 'interactors/GetStateInteractor';
import SettingsService from 'services/SettingsService';

// Infrastructure
import JsonSettingsStore from 'infrastructure/JsonSettingsStore';
import JsonSettingsStoreInitializer from 'infrastructure/JsonSettingsStoreInitializer';
import DBusSettingsAPI from 'daemon/DBusSettingsAPI';
import DBusSettingsServer from 'daemon/DBusSettingsServer';

const SETTINGS_FILE = './data/config.json';

const settingsStore = new JsonSettingsStore(SETTINGS_FILE);
const settingsStoreInitializer = new JsonSettingsStoreInitializer(SETTINGS_FILE);
const getStateInteractor = new GetStateInteractor(settingsStore);
const settingsService = new SettingsService(getStateInteractor);
const dbusSettingsAPI = new DBusSettingsAPI(settingsService);
const dbusSettingsServer = new DBusSettingsServer(dbusSettingsAPI);

async function run() {
  await settingsStoreInitializer.init();
  await dbusSettingsServer.start();
}

run();
