import yargs from 'yargs';

class CLISettingsProgram {
  constructor(settingsApi) {
    this.settingsApi = settingsApi;
  }

  /* eslint-disable no-unused-expressions, no-console */
  async run() {
    yargs
      .command('get <property>', 'Gets the property value', _yargs => _yargs
        .command('state', 'Gets the current state', {}, async () => {
          try {
            const state = await this.settingsApi.getState();
            console.log(state);
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
