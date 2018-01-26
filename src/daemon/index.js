// Domain
import IsReadyInteractor from 'interactors/IsReadyInteractor';
import GetCloudInteractor from 'interactors/GetCloudInteractor';
import ConfigureCloudInteractor from 'interactors/ConfigureCloudInteractor';
import SetUserInteractor from 'interactors/SetUserInteractor';
import SettingsService from 'services/SettingsService';

// Infrastructure
import JsonSettingsStore from 'infrastructure/JsonSettingsStore';
import JsonSettingsStoreInitializer from 'infrastructure/JsonSettingsStoreInitializer';
import DBusSettingsAPI from 'daemon/DBusSettingsAPI';
import DBusSettingsServer from 'daemon/DBusSettingsServer';

const SETTINGS_FILE = './data/config.json';

const settingsStore = new JsonSettingsStore(SETTINGS_FILE);
const settingsStoreInitializer = new JsonSettingsStoreInitializer(SETTINGS_FILE);
const isReadyInteractor = new IsReadyInteractor(settingsStore);
const getCloudInteractor = new GetCloudInteractor(settingsStore);
const configureCloudInteractor = new ConfigureCloudInteractor(settingsStore);
const setUserInteractor = new SetUserInteractor(settingsStore);
const settingsService = new SettingsService(
  isReadyInteractor,
  getCloudInteractor,
  configureCloudInteractor,
  setUserInteractor,
);
const dbusSettingsAPI = new DBusSettingsAPI(settingsService);
const dbusSettingsServer = new DBusSettingsServer(dbusSettingsAPI);

async function run() {
  await settingsStoreInitializer.init();
  await dbusSettingsServer.start();
}

run();
