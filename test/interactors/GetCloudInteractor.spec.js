import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import GetCloudInteractor from 'interactors/GetCloudInteractor';
import Address from 'entities/Address';

const test = around(tape)
  .before((t) => {
    const settingsStore = {
      getCloud: sinon.stub().resolves(new Address('localhost', 3000)),
    };
    t.next(settingsStore);
  });

test('calls getCloud() on store', async (t, settingsStore) => {
  const interactor = new GetCloudInteractor(settingsStore);

  await interactor.execute();

  t.true(settingsStore.getCloud.called);
  t.end();
});

test('returns Address returned by store', async (t, settingsStore) => {
  const expectedAddress = new Address('localhost', 3000);
  const interactor = new GetCloudInteractor(settingsStore);

  const actualAddress = await interactor.execute();

  t.deepEqual(actualAddress, expectedAddress);
  t.end();
});
