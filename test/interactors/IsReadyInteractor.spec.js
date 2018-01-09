import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import IsReadyInteractor from 'interactors/IsReadyInteractor';
import State from 'entities/State';

const test = around(tape)
  .before((t) => {
    const settingsStore = {
      getState: sinon.stub().resolves(State.CONFIGURATION),
    };
    t.next(settingsStore);
  });

test('calls getState() on store', async (t, settingsStore) => {
  const interactor = new IsReadyInteractor(settingsStore);

  await interactor.execute();

  t.true(settingsStore.getState.called);
  t.end();
});

test('returns false when state is CONFIGURATION', async (t, settingsStore) => {
  const interactor = new IsReadyInteractor(settingsStore);

  const isReady = await interactor.execute();

  t.false(isReady);
  t.end();
});

test('returns true when state is READY', async (t, settingsStore) => {
  settingsStore.getState = sinon.stub().resolves(State.READY); // eslint-disable-line no-param-reassign, max-len
  const interactor = new IsReadyInteractor(settingsStore);

  const isReady = await interactor.execute();

  t.true(isReady);
  t.end();
});
