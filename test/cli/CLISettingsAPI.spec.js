import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import CLISettingsAPI from 'cli/CLISettingsAPI';
import Address from 'entities/Address';
import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';
import { SetUserRequest } from 'services//SetUserRequest';

const test = around(tape)
  .before((t) => {
    const settingsService = {
      isReady: sinon.stub().resolves(true),
      getCloud: sinon.stub().resolves(new Address('localhost', 3000)),
      configureCloud: sinon.stub().resolves(),
      setUser: sinon.stub().resolves(),
    };
    const cliSettingsAPI = new CLISettingsAPI(settingsService);
    t.next(cliSettingsAPI);
  });

test('isReady() calls SettingsService.isReady()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.isReady();

  t.true(cliSettingsAPI.settingsService.isReady.called);
  t.end();
});

test('isReady() returns result returned by SettingsService', async (t, cliSettingsAPI) => {
  const expectedResult = true;

  const actualResult = await cliSettingsAPI.isReady();

  t.equal(actualResult, expectedResult);
  t.end();
});

test('getCloud() calls SettingsService.getCloud()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.getCloud();

  t.true(cliSettingsAPI.settingsService.getCloud.called);
  t.end();
});

test('getCloud() returns Address returned by SettingsService', async (t, cliSettingsAPI) => {
  const expectedAddress = new Address('localhost', 3000);

  const actualAddress = await cliSettingsAPI.getCloud();

  t.deepEquals(actualAddress, expectedAddress);
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

test('setUser() calls SettingsService.setUser()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.setUser(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );

  t.true(cliSettingsAPI.settingsService.setUser.called);
  t.end();
});

test('setUser() pass request with the arguments received', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.setUser(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );

  const expectedRequest = new SetUserRequest(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );
  const actualRequest = cliSettingsAPI.settingsService.setUser.getCall(0).args[0];
  t.deepEqual(actualRequest, expectedRequest);
  t.end();
});
