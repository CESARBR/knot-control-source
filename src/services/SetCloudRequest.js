import joi from 'joi';

class SetCloudRequest {
  constructor(hostname, port) {
    this.hostname = hostname;
    this.port = port;
  }
}

const setCloudRequestSchema = joi
  .object()
  .keys({
    hostname: joi
      .string()
      .hostname()
      .required(),
    port: joi
      .number()
      .integer().min(1).max(65535)
      .required(),
  })
  .required();

class SetCloudRequestValidator {
  static validate(setCloudRequest) {
    joi.assert(setCloudRequest, setCloudRequestSchema);
  }
}

export { SetCloudRequest, SetCloudRequestValidator };
