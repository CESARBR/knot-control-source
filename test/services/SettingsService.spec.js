import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import SettingsService from 'services/SettingsService';
import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';
import Address from 'entities/Address';
import Credentials from 'entities/Credentials';
import { SetUserRequest } from 'services/SetUserRequest';
import { SetGatewayRequest } from 'services/SetGatewayRequest';

const test = around(tape)
  .before((t) => {
    const isReadyInteractor = {
      execute: sinon.stub().resolves(true),
    };
    const getCloudInteractor = {
      execute: sinon.stub().resolves(new Address('localhost', 3000)),
    };
    const getUserInteractor = {
      execute: sinon.stub().resolves(new Credentials(
        'aea3138d-a43e-45c6-9cd6-626c77790005',
        '427eaeced6dca774e4c62409074a256f04701f8d',
      )),
    };
    const getGatewayInteractor = {
      execute: sinon.stub().resolves(new Credentials(
        'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
        '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
      )),
    };
    const configureCloudInteractor = {
      execute: sinon.stub().resolves(),
    };
    const setUserInteractor = {
      execute: sinon.stub().resolves(),
    };
    const setGatewayInteractor = {
      execute: sinon.stub().resolves(),
    };
    const settingsService = new SettingsService(
      isReadyInteractor,
      getCloudInteractor,
      getUserInteractor,
      getGatewayInteractor,
      configureCloudInteractor,
      setUserInteractor,
      setGatewayInteractor,
    );
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

test('configureCloud() calls ConfigureCloudInteractor.execute()', async (t, settingsService) => {
  const request = new ConfigureCloudRequest('localhost', 3000);
  await settingsService.configureCloud(request);

  t.true(settingsService.configureCloudInteractor.execute.called);
  t.end();
});

test(
  'configureCloud() calls ConfigureCloudInteractor.execute() with request',
  async (t, settingsService) => {
    const request = new ConfigureCloudRequest('localhost', 3000);
    await settingsService.configureCloud(request);

    const actualRequest = settingsService.configureCloudInteractor.execute.getCall(0).args[0];
    t.deepEqual(actualRequest, request);
    t.end();
  },
);

test('configureCloud() validates request', async (t, settingsService) => {
  try {
    await settingsService.configureCloud();
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('setUser() calls SetUserInteractor.execute()', async (t, settingsService) => {
  const request = new SetUserRequest(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );
  await settingsService.setUser(request);

  t.true(settingsService.setUserInteractor.execute.called);
  t.end();
});

test('setUser() calls SetUserInteractor.execute() with request', async (t, settingsService) => {
  const request = new SetUserRequest(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );
  await settingsService.setUser(request);

  const actualRequest = settingsService.setUserInteractor.execute.getCall(0).args[0];
  t.deepEqual(actualRequest, request);
  t.end();
});

test('setUser() validates request', async (t, settingsService) => {
  try {
    await settingsService.setUser();
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('getUser() calls GetUserInteractor.execute()', async (t, settingsService) => {
  await settingsService.getUser();

  t.true(settingsService.getUserInteractor.execute.called);
  t.end();
});

test('getUser() returns Credentials returned by GetUserInteractor', async (t, settingsService) => {
  const expectedCredentials = new Credentials(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );
  const actualCredentials = await settingsService.getUser();

  t.deepEqual(actualCredentials, expectedCredentials);
  t.end();
});

test('setGateway() calls SetGatewayInteractor.execute()', async (t, settingsService) => {
  const request = new SetGatewayRequest(
    'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  );
  await settingsService.setGateway(request);

  t.true(settingsService.setGatewayInteractor.execute.called);
  t.end();
});

test(
  'setGateway() calls SetGatewayInteractor.execute() with request',
  async (t, settingsService) => {
    const request = new SetGatewayRequest(
      'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
      '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
    );
    await settingsService.setGateway(request);

    const actualRequest = settingsService.setGatewayInteractor.execute.getCall(0).args[0];
    t.deepEqual(actualRequest, request);
    t.end();
  },
);

test('setGateway() validates request', async (t, settingsService) => {
  try {
    await settingsService.setGateway();
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('getGateway() calls GetGatewayInteractor.execute()', async (t, settingsService) => {
  await settingsService.getGateway();

  t.true(settingsService.getGatewayInteractor.execute.called);
  t.end();
});

test(
  'getGateway() returns the Credentials returned by GetGatewayInteractor',
  async (t, settingsService) => {
    const expectedCredentials = new Credentials(
      'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
      '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
    );
    const actualCredentials = await settingsService.getGateway();

    t.deepEqual(actualCredentials, expectedCredentials);
    t.end();
  },
);
