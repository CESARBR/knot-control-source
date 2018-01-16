import joi from 'joi';

class SetUserRequest {
  constructor(uuid, token) {
    this.uuid = uuid;
    this.token = token;
  }
}

const setUserRequestSchema = joi
  .object()
  .keys({
    uuid: joi
      .string().guid('uuidv4')
      .required(),
    token: joi
      .string().hex()
      .required(),
  })
  .required();

class SetUserRequestValidator {
  static validate(setUserRequest) {
    joi.assert(setUserRequest, setUserRequestSchema);
  }
}

export { SetUserRequest, SetUserRequestValidator };
