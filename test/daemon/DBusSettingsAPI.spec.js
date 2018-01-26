import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import DBusSettingsAPI from 'daemon/DBusSettingsAPI';
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

test('configureCloud() calls SettingsService.configureCloud()', async (t, dbusSettingsAPI) => {
  const address = {
    hostname: 'localhost',
    port: 3000,
  };
  await dbusSettingsAPI.configureCloud(address);

  t.true(dbusSettingsAPI.settingsService.configureCloud.called);
  t.end();
});

test('configureCloud() pass request with received arguments', async (t, dbusSettingsAPI) => {
  const address = {
    hostname: 'localhost',
    port: 3000,
  };
  await dbusSettingsAPI.configureCloud(address);

  const expectedRequest = new ConfigureCloudRequest('localhost', 3000);
  const actualRequest = dbusSettingsAPI.settingsService.configureCloud.getCall(0).args[0];
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
