import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import SettingsService from 'services/SettingsService';
import Address from 'entities/Address';

const test = around(tape)
  .before((t) => {
    const isReadyInteractor = {
      execute: sinon.stub().resolves(true),
    };
    const getCloudInteractor = {
      execute: sinon.stub().resolves(new Address('localhost', 3000)),
    };
    const settingsService = new SettingsService(isReadyInteractor, getCloudInteractor);
    t.next(settingsService);
  });

test('isReady() calls IsReadyInteractor.execute()', async (t, settingsService) => {
  await settingsService.isReady();

  t.true(settingsService.isReadyInteractor.execute.called);
  t.end();
});

test('getCloud() calls GetCloudInteractor.execute()', async (t, settingsService) => {
  await settingsService.getCloud();

  t.true(settingsService.getCloudInteractor.execute.called);
  t.end();
});
