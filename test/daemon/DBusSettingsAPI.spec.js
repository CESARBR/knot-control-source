import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import DBusSettingsAPI from 'daemon/DBusSettingsAPI';
import Address from 'entities/Address';

const test = around(tape)
  .before((t) => {
    const settingsService = {
      isReady: sinon.stub().resolves(true),
      getCloud: sinon.stub().resolves(new Address('localhost', 3000)),
    };
    const dbusSettingsAPI = new DBusSettingsAPI(settingsService);
    t.next(dbusSettingsAPI);
  });

test('isReady() calls SettingsService.isReady()', async (t, dbusSettingsAPI) => {
  await dbusSettingsAPI.isReady();

  t.true(dbusSettingsAPI.settingsService.isReady.called);
  t.end();
});

test('getCloud() calls SettingsService.getCloud()', async (t, dbusSettingsAPI) => {
  await dbusSettingsAPI.getCloud();

  t.true(dbusSettingsAPI.settingsService.getCloud.called);
  t.end();
});
