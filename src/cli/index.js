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
import CLISettingsAPI from 'cli/CLISettingsAPI';
import CLISettingsProgram from 'cli/CLISettingsProgram';

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
const cliSettingsAPI = new CLISettingsAPI(settingsService);
const cliSettingsProgram = new CLISettingsProgram(cliSettingsAPI);

async function run() {
  await settingsStoreInitializer.init();
  await cliSettingsProgram.run();
}

run();
