import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import CLISettingsAPI from 'cli/CLISettingsAPI';
import Address from 'entities/Address';

const test = around(tape)
  .before((t) => {
    const settingsService = {
      isReady: sinon.stub().resolves(true),
      getCloud: sinon.stub().resolves(new Address('localhost', 3000)),
    };
    const cliSettingsAPI = new CLISettingsAPI(settingsService);
    t.next(cliSettingsAPI);
  });

test('isReady() calls SettingsService.isReady()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.isReady();

  t.true(cliSettingsAPI.settingsService.isReady.called);
  t.end();
});

test('isReady() returns result returned by SettingsService', async (t, cliSettingsAPI) => {
  const expectedResult = true;

  const actualResult = await cliSettingsAPI.isReady();

  t.equal(actualResult, expectedResult);
  t.end();
});

test('getCloud() calls SettingsService.getCloud()', async (t, cliSettingsAPI) => {
  await cliSettingsAPI.getCloud();

  t.true(cliSettingsAPI.settingsService.getCloud.called);
  t.end();
});

test('getCloud() returns Address returned by SettingsService', async (t, cliSettingsAPI) => {
  const expectedAddress = new Address('localhost', 3000);

  const actualAddress = await cliSettingsAPI.getCloud();

  t.deepEquals(actualAddress, expectedAddress);
  t.end();
});
