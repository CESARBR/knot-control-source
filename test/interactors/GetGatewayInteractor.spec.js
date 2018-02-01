import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import GetGatewayInteractor from 'interactors/GetGatewayInteractor';
import Credentials from 'entities/Credentials';

const test = around(tape)
  .before((t) => {
    const settingsStore = {
      getGateway: sinon.stub().resolves(new Credentials(
        'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
        '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
      )),
    };
    t.next(settingsStore);
  });

test('calls getGateway() on store', async (t, settingsStore) => {
  const interactor = new GetGatewayInteractor(settingsStore);

  await interactor.execute();

  t.true(settingsStore.getGateway.called);
  t.end();
});

test('returns Credentials returned by store', async (t, settingsStore) => {
  const expectedCredentials = new Credentials(
    'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  );
  const interactor = new GetGatewayInteractor(settingsStore);

  const actualCredentials = await interactor.execute();
  t.deepEqual(actualCredentials, expectedCredentials);
  t.end();
});
