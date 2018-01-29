import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import GetUserInteractor from 'interactors/GetUserInteractor';
import Credentials from 'entities/Credentials';

const test = around(tape)
  .before((t) => {
    const settingsStore = {
      getUser: sinon.stub().resolves(new Credentials(
        'aea3138d-a43e-45c6-9cd6-626c77790005',
        '427eaeced6dca774e4c62409074a256f04701f8d',
      )),
    };
    t.next(settingsStore);
  });

test('calls getUser() on store', async (t, settingsStore) => {
  const interactor = new GetUserInteractor(settingsStore);

  await interactor.execute();

  t.true(settingsStore.getUser.called);
  t.end();
});

test('returns Credentials returned by store', async (t, settingsStore) => {
  const expectedCredentials = new Credentials(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );
  const interactor = new GetUserInteractor(settingsStore);

  const actualCredentials = await interactor.execute();
  t.deepEqual(actualCredentials, expectedCredentials);
  t.end();
});
