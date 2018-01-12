import joi from 'joi';

class ConfigureCloudRequest {
  constructor(hostname, port) {
    this.hostname = hostname;
    this.port = port;
  }
}

const configureCloudRequestSchema = joi
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

class ConfigureCloudRequestValidator {
  static validate(configureCloudRequest) {
    joi.assert(configureCloudRequest, configureCloudRequestSchema);
  }
}

export { ConfigureCloudRequest, ConfigureCloudRequestValidator };
