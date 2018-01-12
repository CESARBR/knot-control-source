import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import ConfigureCloudInteractor from 'interactors/ConfigureCloudInteractor';
import State from 'entities/State';
import Address from 'entities/Address';
import InvalidStateError from 'entities/InvalidStateError';

const test = around(tape)
  .before((t) => {
    const settingsStore = {
      getState: sinon.stub().resolves(State.CONFIGURATION),
      setCloud: sinon.stub().resolves(),
    };
    t.next(settingsStore);
  });

test('calls setCloud() on store', async (t, settingsStore) => {
  const interactor = new ConfigureCloudInteractor(settingsStore);
  const cloudAddress = new Address('localhost', 3000);

  await interactor.execute(cloudAddress);

  t.true(settingsStore.setCloud.called);
  t.end();
});

test('calls setCloud() on store with new address', async (t, settingsStore) => {
  const interactor = new ConfigureCloudInteractor(settingsStore);
  const cloudAddress = new Address('localhost', 3000);

  await interactor.execute(cloudAddress);

  const actualAddress = settingsStore.setCloud.getCall(0).args[0];
  t.deepEqual(actualAddress, cloudAddress);
  t.end();
});

test('throws InvalidStateError when state is READY', async (t, settingsStore) => {
  settingsStore.getState.resolves(State.READY);
  const interactor = new ConfigureCloudInteractor(settingsStore);
  const cloudAddress = new Address('localhost', 3000);

  try {
    await interactor.execute(cloudAddress);
    t.fail('should throw');
  } catch (e) {
    t.true(e instanceof InvalidStateError);
  }
  t.end();
});
