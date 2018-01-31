import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import SetGatewayInteractor from 'interactors/SetGatewayInteractor';
import State from 'entities/State';
import Credentials from 'entities/Credentials';
import InvalidStateError from 'entities/InvalidStateError';

const test = around(tape)
  .before((t) => {
    const gatewayCredentials = new Credentials(
      'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
      '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
    );
    const settingsStore = {
      getState: sinon.stub().resolves(State.CONFIGURATION),
      setGateway: sinon.stub().resolves(),
    };
    t.next(settingsStore, gatewayCredentials);
  });

test('calls setGateway() on store', async (t, settingsStore, gatewayCredentials) => {
  const interactor = new SetGatewayInteractor(settingsStore);

  await interactor.execute(gatewayCredentials);

  t.true(settingsStore.setGateway.called);
  t.end();
});

test('calls setGateway() on store with new credentials', async (t, settingsStore, gatewayCredentials) => {
  const interactor = new SetGatewayInteractor(settingsStore);

  await interactor.execute(gatewayCredentials);

  const actualGatewayCredentials = settingsStore.setGateway.getCall(0).args[0];
  t.deepEqual(actualGatewayCredentials, gatewayCredentials);
  t.end();
});

test('throws InvalidStateError when state is READY', async (t, settingsStore, gatewayCredentials) => {
  settingsStore.getState.resolves(State.READY);
  const interactor = new SetGatewayInteractor(settingsStore);

  try {
    await interactor.execute(gatewayCredentials);
    t.fail('should throw');
  } catch (e) {
    t.true(e instanceof InvalidStateError);
  }
  t.end();
});
