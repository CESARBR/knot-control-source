import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import CLISettingsAPI from 'cli/CLISettingsAPI';
import Address from 'entities/Address';
import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';
import { SetUserRequest } from 'services/SetUserRequest';
import { SetGatewayRequest } from 'services/SetGatewayRequest';
import Credentials from 'entities/Credentials';

const test = around(tape)
  .before((t) => {
    const settingsService = {
      isReady: sinon.stub().resolves(true),
      getCloud: sinon.stub().resolves(new Address('localhost', 3000)),
      getUser: sinon.stub().resolves(new Credentials(
        'aea3138d-a43e-45c6-9cd6-626c77790005',
        '427eaeced6dca774e4c62409074a256f04701f8d',
      )),
      getGateway: sinon.stub().resolves(new Credentials(
        'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
        '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
      )),
      configureCloud: sinon.stub().resolves(),
      setUser: sinon.stub().resolves(),
      setGateway: sinon.stub().resolves(),
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

test('getUser() calls SettingsService.getUser()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.getUser();

  t.true(cliSettingsAPI.settingsService.getUser.called);
  t.end();
});

test('getUser() returns Credentials returned by SettingsService', async (t, cliSettingsAPI) => {
  const expectedCredentials = new Credentials(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );

  const actualCredentials = await cliSettingsAPI.getUser();

  t.deepEquals(actualCredentials, expectedCredentials);
  t.end();
});

test('getGateway() calls SettingsService.getGateway()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.getGateway();

  t.true(cliSettingsAPI.settingsService.getGateway.called);
  t.end();
});

test('getGateway() returns Credentials returned by SettingsService', async (t, cliSettingsAPI) => {
  const expectedCredentials = new Credentials(
    'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  );

  const actualCredentials = await cliSettingsAPI.getGateway();

  t.deepEquals(actualCredentials, expectedCredentials);
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

test('setGateway() calls SettingsService.setGateway()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.setGateway(
    'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  );

  t.true(cliSettingsAPI.settingsService.setGateway.called);
  t.end();
});

test('setGateway() pass request with the arguments received', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.setGateway(
    'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  );

  const expectedRequest = new SetGatewayRequest(
    'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  );
  const actualRequest = cliSettingsAPI.settingsService.setGateway.getCall(0).args[0];
  t.deepEqual(actualRequest, expectedRequest);
  t.end();
});
