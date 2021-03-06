import test from 'tape';
import { SetUserRequest, SetUserRequestValidator } from 'services/SetUserRequest';

test('throws if request is empty', (t) => {
  try {
    SetUserRequestValidator.validate();
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if uuid is empty', (t) => {
  const request = new SetUserRequest(null, '427eaeced6dca774e4c62409074a256f04701f8d');
  try {
    SetUserRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if uuid is invalid (don\'t follow the UUID/GUID valid format)', (t) => {
  const request = new SetUserRequest(
    'aea313-a4d3e-458dc6-9cdd6-626c790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );
  try {
    SetUserRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if token is empty', (t) => {
  const request = new SetUserRequest('aea3138d-a43e-45c6-9cd6-626c77790005');
  try {
    SetUserRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('throws if token is invalid (not fully hexadecimal)', (t) => {
  const request = new SetUserRequest(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '4w7eae@ed6dca7#4e4c62-0907*a256f0z701x8d',
  );
  try {
    SetUserRequestValidator.validate(request);
    t.fail('should throw');
  } catch (e) {
    t.pass('should throw');
  }
  t.end();
});

test('succeeds if request is valid', (t) => {
  const request = new SetUserRequest(
    'aea3138d-a43e-45c6-9cd6-626c77790005',
    '427eaeced6dca774e4c62409074a256f04701f8d',
  );
  try {
    SetUserRequestValidator.validate(request);
    t.pass('should succeed');
  } catch (e) {
    t.fail('should succeed');
  }
  t.end();
});
