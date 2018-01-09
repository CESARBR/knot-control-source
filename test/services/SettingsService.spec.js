import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import SettingsService from 'services/SettingsService';

const test = around(tape)
  .before((t) => {
    const isReadyInteractor = {
      execute: sinon.stub().resolves(true),
    };
    const settingsService = new SettingsService(isReadyInteractor);
    t.next(settingsService);
  });

test('isReady() calls IsReadyInteractor.execute()', async (t, settingsService) => {
  await settingsService.isReady();

  t.true(settingsService.isReadyInteractor.execute.called);
  t.end();
});
