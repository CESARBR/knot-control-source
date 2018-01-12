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

test('isReady() returns result returned by IsReadyInteractor', async (t, settingsService) => {
  const expectedResult = true;

  const actualResult = await settingsService.isReady();

  t.equal(actualResult, expectedResult);
  t.end();
});

test('getCloud() calls GetCloudInteractor.execute()', async (t, settingsService) => {
  await settingsService.getCloud();

  t.true(settingsService.getCloudInteractor.execute.called);
  t.end();
});

test('getCloud() returns Address returned by GetCloudInteractor', async (t, settingsService) => {
  const expectedAddress = new Address('localhost', 3000);

  const actualAddress = await settingsService.getCloud();

  t.deepEqual(actualAddress, expectedAddress);
  t.end();
});
