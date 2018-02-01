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
        .command(
          'ready',
          'Gets whether this gateway is ready',
          {},
          createHandler(this.isReady.bind(this)),
        )
        .command(
          'cloud',
          'Gets the cloud configuration',
          {},
          createHandler(this.getCloud.bind(this)),
        )
        .command(
          'user',
          'Gets the user configuration',
          {},
          createHandler(this.getUser.bind(this)),
        ))
      .command('set <property>', 'Sets the property value', _yargs => _yargs
        .command(
          'cloud <hostname> <port>',
          'Sets the cloud configuration',
          {},
          createHandler(this.setCloud.bind(this)),
        )
        .command(
          'user <uuid> <token>',
          'Sets the user configuration',
          {},
          createHandler(this.setUser.bind(this)),
        )
        .command(
          'gateway <uuid> <token>',
          'Sets the gateway configuration',
          {},
          createHandler(this.setGateway.bind(this)),
        ))
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

  async getUser() {
    const configuration = await this.settingsApi.getUser();
    if (configuration) {
      console.log(`UUID: ${configuration.uuid}\nToken: ${configuration.token}`);
    } else {
      console.log('Not configured');
    }
  }

  async setCloud(args) {
    await this.settingsApi.setCloud(args.hostname, args.port);
    console.log('Done');
  }

  async setUser(args) {
    await this.settingsApi.setUser(args.uuid, args.token);
    console.log('Done');
  }

  async setGateway(args) {
    await this.settingsApi.setGateway(args.uuid, args.token);
    console.log('Done');
  }
}
/* eslint-enable */

export default CLISettingsProgram;
