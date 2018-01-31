import joi from 'joi';

class SetGatewayRequest {
  constructor(uuid, token) {
    this.uuid = uuid;
    this.token = token;
  }
}

const setGatewayRequestSchema = joi
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

class SetGatewayRequestValidator {
  static validate(setGatewayRequest) {
    joi.assert(setGatewayRequest, setGatewayRequestSchema);
  }
}

export { SetGatewayRequest, SetGatewayRequestValidator };
