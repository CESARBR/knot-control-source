import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import SettingsService from 'services/SettingsService';
import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';
import Address from 'entities/Address';

const test = around(tape)
  .before((t) => {
    const isReadyInteractor = {
      execute: sinon.stub().resolves(true),
    };
    const getCloudInteractor = {
      execute: sinon.stub().resolves(new Address('localhost', 3000)),
    };
    const configureCloudInteractor = {
      execute: sinon.stub().resolves(),
    };
    const settingsService = new SettingsService(
      isReadyInteractor,
      getCloudInteractor,
      configureCloudInteractor,
    );
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

test('configureCloud() calls ConfigureCloudInteractor.execute()', async (t, settingsService) => {
  const request = new ConfigureCloudRequest('localhost', 3000);
  await settingsService.configureCloud(request);

  t.true(settingsService.configureCloudInteractor.execute.called);
  t.end();
});

test('configureCloud() calls ConfigureCloudInteractor.execute() with request', async (t, settingsService) => {
  const request = new ConfigureCloudRequest('localhost', 3000);
  await settingsService.configureCloud(request);

  const actualRequest = settingsService.configureCloudInteractor.execute.getCall(0).args[0];
  t.deepEqual(actualRequest, request);
  t.end();
});

test('configureCloud() validates request', async (t, settingsService) => {
  try {
    await settingsService.configureCloud();
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }

  t.end();
});
