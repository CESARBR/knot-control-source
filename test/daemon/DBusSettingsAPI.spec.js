import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import DBusSettingsAPI from 'daemon/DBusSettingsAPI';

const test = around(tape)
  .before((t) => {
    const settingsService = {
      isReady: sinon.stub().resolves(true),
    };
    const dbusSettingsAPI = new DBusSettingsAPI(settingsService);
    t.next(dbusSettingsAPI);
  });

test('isReady() calls SettingsService.isReady()', async (t, dbusSettingsAPI) => {
  await dbusSettingsAPI.isReady();

  t.true(dbusSettingsAPI.settingsService.isReady.called);
  t.end();
});
