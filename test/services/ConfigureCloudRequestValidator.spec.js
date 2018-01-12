import test from 'tape';
import { ConfigureCloudRequest, ConfigureCloudRequestValidator } from 'services/ConfigureCloudRequest';

test('throws if request is empty', (t) => {
  try {
    ConfigureCloudRequestValidator.validate();
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if hostname is empty', (t) => {
  const request = new ConfigureCloudRequest(null, 3000);
  try {
    ConfigureCloudRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if hostname is empty string', (t) => {
  const request = new ConfigureCloudRequest('', 3000);
  try {
    ConfigureCloudRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if hostname is invalid', (t) => {
  const request = new ConfigureCloudRequest('invalid host', 3000);
  try {
    ConfigureCloudRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if port is empty', (t) => {
  const request = new ConfigureCloudRequest('localhost');
  try {
    ConfigureCloudRequestValidator.validate(request);
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if port is invalid (below limit)', (t) => {
  const request = new ConfigureCloudRequest('localhost', 0);
  try {
    ConfigureCloudRequestValidator.validate(request);
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if port is invalid (above limit)', (t) => {
  const request = new ConfigureCloudRequest('localhost', 65536);
  try {
    ConfigureCloudRequestValidator.validate(request);
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('succeeds if request is valid', (t) => {
  const request = new ConfigureCloudRequest('localhost', 3000);
  try {
    ConfigureCloudRequestValidator.validate(request);
    t.pass('should succeed');
  } catch (e) {
    t.fail('shouldn\'t throw');
  }
  t.end();
});
