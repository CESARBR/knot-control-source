import yargs from 'yargs';

class CLISettingsProgram {
  constructor(settingsApi) {
    this.settingsApi = settingsApi;
  }

  /* eslint-disable no-unused-expressions, no-console */
  async run() {
    yargs
      .command('get <property>', 'Gets the property value', _yargs => _yargs
        .command('ready', 'Gets whether this gateway is ready', {}, async () => {
          try {
            const isReady = await this.settingsApi.isReady();
            console.log(isReady ? 'Ready' : 'Not ready');
          } catch (err) {
            console.error(err.message);
          }
        })
        .command('cloud', 'Gets the cloud configuration', {}, async () => {
          try {
            const configuration = await this.settingsApi.getCloud();
            if (configuration) {
              console.log(`${configuration.hostname}:${configuration.port}`);
            } else {
              console.log('Not configured');
            }
          } catch (err) {
            console.error(err.message);
          }
        }))
      .command('set <property>', 'Sets the property value', _yargs => _yargs
        .command('cloud <hostname> <port>', 'Sets the cloud configuration', {}, async (argv) => {
          try {
            await this.settingsApi.configureCloud(argv.hostname, argv.port);
            console.log('Done');
          } catch (err) {
            console.error(err.message);
          }
        }))
      .demandCommand()
      .strict()
      .argv;
  }
}
/* eslint-enable */

export default CLISettingsProgram;
