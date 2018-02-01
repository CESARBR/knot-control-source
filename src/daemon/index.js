// Domain
import IsReadyInteractor from 'interactors/IsReadyInteractor';
import GetCloudInteractor from 'interactors/GetCloudInteractor';
import GetUserInteractor from 'interactors/GetUserInteractor';
import GetGatewayInteractor from 'interactors/GetGatewayInteractor';
import ConfigureCloudInteractor from 'interactors/ConfigureCloudInteractor';
import SetUserInteractor from 'interactors/SetUserInteractor';
import SetGatewayInteractor from 'interactors/SetGatewayInteractor';
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
const getUserInteractor = new GetUserInteractor(settingsStore);
const getGatewayInteractor = new GetGatewayInteractor(settingsStore);
const configureCloudInteractor = new ConfigureCloudInteractor(settingsStore);
const setUserInteractor = new SetUserInteractor(settingsStore);
const setGatewayInteractor = new SetGatewayInteractor(settingsStore);
const settingsService = new SettingsService(
  isReadyInteractor,
  getCloudInteractor,
  getUserInteractor,
  getGatewayInteractor,
  configureCloudInteractor,
  setUserInteractor,
  setGatewayInteractor,
);
const dbusSettingsAPI = new DBusSettingsAPI(settingsService);
const dbusSettingsServer = new DBusSettingsServer(dbusSettingsAPI);

async function run() {
  await settingsStoreInitializer.init();
  await dbusSettingsServer.start();
}

run();
