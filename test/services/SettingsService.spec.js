import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import SettingsService from 'services/SettingsService';

const test = around(tape)
  .before((t) => {
    const getStateInteractor = {
      execute: sinon.stub().resolves(),
    };
    const settingsService = new SettingsService(getStateInteractor);
    t.next(settingsService);
  });

test('getState() calls GetStateInteractor.execute()', async (t, settingsService) => {
  await settingsService.getState();

  t.true(settingsService.getStateInteractor.execute.called);
  t.end();
});
