import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import CLISettingsAPI from 'cli/CLISettingsAPI';

const test = around(tape)
  .before((t) => {
    const settingsService = {
      isReady: sinon.stub().resolves(true),
    };
    const cliSettingsAPI = new CLISettingsAPI(settingsService);
    t.next(cliSettingsAPI);
  });

test('isReady() calls SettingsService.isReady()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.isReady();

  t.true(cliSettingsAPI.settingsService.isReady.called);
  t.end();
});
