import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import GetStateInteractor from 'interactors/GetStateInteractor';
import State from 'entities/State';

const test = around(tape)
  .before((t) => {
    const settingsStore = {
      getState: sinon.stub().resolves(State.CONFIGURATION),
    };
    t.next(settingsStore);
  });

test('calls getState on store', async (t, settingsStore) => {
  const interactor = new GetStateInteractor(settingsStore);

  await interactor.execute();

  t.true(settingsStore.getState.called);
  t.end();
});
