// Domain
import GetStateInteractor from 'interactors/GetStateInteractor';
import SettingsService from 'services/SettingsService';

// Infrastructure
import JsonSettingsStore from 'infrastructure/JsonSettingsStore';
import JsonSettingsStoreInitializer from 'infrastructure/JsonSettingsStoreInitializer';
import CLISettingsAPI from 'cli/CLISettingsAPI';
import CLISettingsProgram from 'cli/CLISettingsProgram';

const SETTINGS_FILE = './data/config.json';

const settingsStore = new JsonSettingsStore(SETTINGS_FILE);
const settingsStoreInitializer = new JsonSettingsStoreInitializer(SETTINGS_FILE);
const getStateInteractor = new GetStateInteractor(settingsStore);
const settingsService = new SettingsService(getStateInteractor);
const cliSettingsAPI = new CLISettingsAPI(settingsService);
const cliSettingsProgram = new CLISettingsProgram(cliSettingsAPI);

async function run() {
  await settingsStoreInitializer.init();
  await cliSettingsProgram.run();
}

run();
