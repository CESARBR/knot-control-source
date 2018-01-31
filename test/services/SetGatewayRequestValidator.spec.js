import test from 'tape';
import { SetGatewayRequest, SetGatewayRequestValidator } from 'services/SetGatewayRequest';

test('throws if request is empty', (t) => {
  try {
    SetGatewayRequestValidator.validate();
    t.fail('should  throw');
  } catch (e) {
    t.pass('shoudl throw');
  }
  t.end();
});

test('throws if uuid is empty', (t) => {
  const request = new SetGatewayRequest(null, '32c834929f24e0a5603bdb1f7420be9f6f7d84bc');
  try {
    SetGatewayRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if uuid is invalid (don\'t follow the UUID/GUID valid format', (t) => {
  const request = new SetGatewayRequest(
    'a79e0e9e-43b123-4c9839-96c3-12a81000',
    '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  );
  try {
    SetGatewayRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if token is empty', (t) => {
  const request = new SetGatewayRequest('a79e0e9e-43b3-4c39-96c3-12a8132f0000', null);
  try {
    SetGatewayRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if token is invalid (not fully hexadecimal)', (t) => {
  const request = new SetGatewayRequest(
    'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    '32c8@4929f24?0a5603bdbzf74y0be9f!f7d84-c',
  );
  try {
    SetGatewayRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('succeeds if request is valid', (t) => {
  const request = new SetGatewayRequest(
    'a79e0e9e-43b3-4c39-96c3-12a8132f0000',
    '32c834929f24e0a5603bdb1f7420be9f6f7d84bc',
  );
  try {
    SetGatewayRequestValidator.validate(request);
    t.pass('should succeed');
  } catch (e) {
    t.fail('should succeed');
  }
  t.end();
});
