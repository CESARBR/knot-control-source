import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import DBusSettingsAPI from 'daemon/DBusSettingsAPI';
import Address from 'entities/Address';
import { SetCloudRequest } from 'services/SetCloudRequest';
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
      setCloud: sinon.stub().resolves(),
      setUser: sinon.stub().resolves(),
      setGateway: sinon.stub().resolves(),
    };
    const dbusSettingsAPI = new DBusSettingsAPI(settingsService);
    t.next(dbusSettingsAPI);
  });

test('isReady() calls SettingsService.isReady()', async (t, dbusSettingsAPI) => {
  await dbusSettingsAPI.isReady();

  t.true(dbusSettingsAPI.settingsService.isReady.called);
  t.end();
});

test('isReady() returns result returned by SettingsService', async (t, dbusSettingsAPI) => {
  const expectedResult = true;

  const actualResult = await dbusSettingsAPI.isReady();

  t.equal(actualResult, expectedResult);
  t.end();
});

test('getCloud() calls SettingsService.getCloud()', async (t, dbusSettingsAPI) => {
  await dbusSettingsAPI.getCloud();

  t.true(dbusSettingsAPI.settingsService.getCloud.called);
  t.end();
});

test('getCloud() returns Address returned by SettingsService', async (t, dbusSettingsAPI) => {
  const expectedAddress = new Address('localhost', 3000);

  const actualAddress = await dbusSettingsAPI.getCloud();

  t.deepEquals(actualAddress, expectedAddress);
  t.end();
});

test('getUser() calls SettingsService.getUser()', async (t, dbusSettingsAPI) => {
  await dbusSettingsAPI.getUser();

  t.true(dbusSettingsAPI.settingsService.getUser.called);
  t.end();
});

test('getUser() returns Credentials returned by SettingsService', async (t, dbusSettingsAPI) => {
  const expectedCredentials = new Credentials(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );
  const actualCredentials = await dbusSettingsAPI.getUser();

  t.deepEquals(actualCredentials, expectedCredentials);
  t.end();
});

test('setCloud() calls SettingsService.setCloud()', async (t, dbusSettingsAPI) => {
  const address = {
    hostname: 'localhost',
    port: 3000,
  };
  await dbusSettingsAPI.setCloud(address);

  t.true(dbusSettingsAPI.settingsService.setCloud.called);
  t.end();
});

test('setCloud() pass request with received arguments', async (t, dbusSettingsAPI) => {
  const address = {
    hostname: 'localhost',
    port: 3000,
  };
  await dbusSettingsAPI.setCloud(address);

  const expectedRequest = new SetCloudRequest('localhost', 3000);
  const actualRequest = dbusSettingsAPI.settingsService.setCloud.getCall(0).args[0];
  t.deepEqual(actualRequest, expectedRequest);
  t.end();
});

test('setUser() calls SettingsService.setUser()', async (t, dbusSettingsAPI) => {
  const credentials = {
    uuid: 'aea3138d-a43e-45c6-9cd6-626c77790005',
    token: '427eaeced6dca774e4c62409074a256f04701f8d',
  };
  await dbusSettingsAPI.setUser(credentials);

  t.true(dbusSettingsAPI.settingsService.setUser.called);
  t.end();
});

test('setUser() pass request with received arguments', async (t, dbusSettingsAPI) => {
  const credentials = {
    uuid: 'aea3138d-a43e-45c6-9cd6-626c77790005',
    token: '427eaeced6dca774e4c62409074a256f04701f8d',
  };
  await dbusSettingsAPI.setUser(credentials);

  const expectedRequest = new SetUserRequest(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );
  const actualRequest = dbusSettingsAPI.settingsService.setUser.getCall(0).args[0];
  t.deepEqual(actualRequest, expectedRequest);
  t.end();
});

test('setGateway() calls SettingsService.setGateway()', async (t, dbusSettingsAPI) => {
  const credentials = {
    uuid: 'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    token: '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  };
  await dbusSettingsAPI.setGateway(credentials);

  t.true(dbusSettingsAPI.settingsService.setGateway.called);
  t.end();
});

test('setGateway() pass request with received arguments', async (t, dbusSettingsAPI) => {
  const credentials = {
    uuid: 'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    token: '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  };
  await dbusSettingsAPI.setGateway(credentials);

  const expectedRequest = new SetGatewayRequest(
    'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  );
  const actualRequest = dbusSettingsAPI.settingsService.setGateway.getCall(0).args[0];
  t.deepEqual(actualRequest, expectedRequest);
  t.end();
});
