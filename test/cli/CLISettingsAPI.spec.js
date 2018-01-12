import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import CLISettingsAPI from 'cli/CLISettingsAPI';
import Address from 'entities/Address';
import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';

const test = around(tape)
  .before((t) => {
    const settingsService = {
      isReady: sinon.stub().resolves(true),
      getCloud: sinon.stub().resolves(new Address('localhost', 3000)),
      configureCloud: sinon.stub().resolves(),
    };
    const cliSettingsAPI = new CLISettingsAPI(settingsService);
    t.next(cliSettingsAPI);
  });

test('isReady() calls SettingsService.isReady()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.isReady();

  t.true(cliSettingsAPI.settingsService.isReady.called);
  t.end();
});

test('getCloud() calls SettingsService.getCloud()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.getCloud();

  t.true(cliSettingsAPI.settingsService.getCloud.called);
  t.end();
});

test('configureCloud() calls SettingsService.configureCloud()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.configureCloud('localhost', 3000);

  t.true(cliSettingsAPI.settingsService.configureCloud.called);
  t.end();
});

test('configureCloud() pass request with the arguments received', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.configureCloud('localhost', 3000);

  const expectedRequest = new ConfigureCloudRequest('localhost', 3000);
  const actualRequest = cliSettingsAPI.settingsService.configureCloud.getCall(0).args[0];
  t.deepEqual(actualRequest, expectedRequest);
  t.end();
});
