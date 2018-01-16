import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import SetUserInteractor from 'interactors/SetUserInteractor';
import State from 'entities/State';
import Credentials from 'entities/Credentials';
import InvalidStateError from 'entities/InvalidStateError';

const test = around(tape)
  .before((t) => {
    const userCredentials = new Credentials(
      'aea3138d-a43e-45c6-9cd6-626c77790005',
      '427eaeced6dca774e4c62409074a256f04701f8d',
    );
    const settingsStore = {
      getState: sinon.stub().resolves(State.CONFIGURATION),
      setUser: sinon.stub().resolves(),
    };
    t.next(settingsStore, userCredentials);
  });

test('calls setUser() on store', async (t, settingsStore, userCredentials) => {
  const interactor = new SetUserInteractor(settingsStore);

  await interactor.execute(userCredentials);

  t.true(settingsStore.setUser.called);
  t.end();
});

test('calls setUser() on store with new credentials', async (t, settingsStore, userCredentials) => {
  const interactor = new SetUserInteractor(settingsStore);

  await interactor.execute(userCredentials);

  const actualUserCredentials = settingsStore.setUser.getCall(0).args[0];
  t.deepEqual(actualUserCredentials, userCredentials);
  t.end();
});

test('throws InvalidStateError when state is READY', async (t, settingsStore, userCredentials) => {
  settingsStore.getState.resolves(State.READY);
  const interactor = new SetUserInteractor(settingsStore);

  try {
    await interactor.execute(userCredentials);
    t.fail('should throw');
  } catch (e) {
    t.true(e instanceof InvalidStateError);
  }
  t.end();
});
