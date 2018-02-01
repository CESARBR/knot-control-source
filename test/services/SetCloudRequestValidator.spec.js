import test from 'tape';
import { SetCloudRequest, SetCloudRequestValidator } from 'services/SetCloudRequest';

test('throws if request is empty', (t) => {
  try {
    SetCloudRequestValidator.validate();
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if hostname is empty', (t) => {
  const request = new SetCloudRequest(null, 3000);
  try {
    SetCloudRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if hostname is empty string', (t) => {
  const request = new SetCloudRequest('', 3000);
  try {
    SetCloudRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if hostname is invalid', (t) => {
  const request = new SetCloudRequest('invalid host', 3000);
  try {
    SetCloudRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if port is empty', (t) => {
  const request = new SetCloudRequest('localhost');
  try {
    SetCloudRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if port is invalid (below limit)', (t) => {
  const request = new SetCloudRequest('localhost', 0);
  try {
    SetCloudRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if port is invalid (above limit)', (t) => {
  const request = new SetCloudRequest('localhost', 65536);
  try {
    SetCloudRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('succeeds if request is valid', (t) => {
  const request = new SetCloudRequest('localhost', 3000);
  try {
    SetCloudRequestValidator.validate(request);
    t.pass('should succeed');
  } catch (e) {
    t.fail('should succeed');
  }
  t.end();
});
