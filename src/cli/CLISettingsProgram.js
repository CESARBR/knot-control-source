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
        }))
      .demandCommand()
      .strict()
      .argv;
  }
}
/* eslint-enable */

export default CLISettingsProgram;
