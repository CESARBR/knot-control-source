import yargs from 'yargs';

/* eslint-disable no-unused-expressions, no-console */
async function execute(handler, args) {
  try {
    await handler(args);
  } catch (e) {
    console.error(e.message);
  }
}

function createHandler(handlerImpl) {
  return async (args) => {
    await execute(handlerImpl, args);
  };
}

class CLISettingsProgram {
  constructor(settingsApi) {
    this.settingsApi = settingsApi;
  }

  async run() {
    yargs
      .command('get <property>', 'Gets the property value', _yargs => _yargs
        .command('ready', 'Gets whether this gateway is ready', {}, createHandler(this.isReady.bind(this)))
        .command('cloud', 'Gets the cloud configuration', {}, createHandler(this.getCloud.bind(this))))
      .demandCommand()
      .strict()
      .argv;
  }

  async isReady() {
    const isReady = await this.settingsApi.isReady();
    console.log(isReady ? 'Ready' : 'Not ready');
  }

  async getCloud() {
    const configuration = await this.settingsApi.getCloud();
    if (configuration) {
      console.log(`${configuration.hostname}:${configuration.port}`);
    } else {
      console.log('Not configured');
    }
  }
}
/* eslint-enable */

export default CLISettingsProgram;
