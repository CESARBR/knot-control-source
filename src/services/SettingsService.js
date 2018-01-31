import { ConfigureCloudRequestValidator } from 'services/ConfigureCloudRequest';
import { SetUserRequestValidator } from 'services/SetUserRequest';
import { SetGatewayRequestValidator } from 'services/SetGatewayRequest';

class SettingsService {
  constructor(
    isReadyInteractor,
    getCloudInteractor,
    getUserInteractor,
    configureCloudInteractor,
    setUserInteractor,
    setGatewayInteractor,
  ) {
    this.isReadyInteractor = isReadyInteractor;
    this.getCloudInteractor = getCloudInteractor;
    this.getUserInteractor = getUserInteractor;
    this.configureCloudInteractor = configureCloudInteractor;
    this.setUserInteractor = setUserInteractor;
    this.setGatewayInteractor = setGatewayInteractor;
  }

  async isReady() {
    return this.isReadyInteractor.execute();
  }

  async getCloud() {
    return this.getCloudInteractor.execute();
  }

  async configureCloud(request) {
    ConfigureCloudRequestValidator.validate(request);
    await this.configureCloudInteractor.execute(request);
  }

  async setUser(request) {
    SetUserRequestValidator.validate(request);
    await this.setUserInteractor.execute(request);
  }

  async getUser() {
    return this.getUserInteractor.execute();
  }

  async setGateway(request) {
    SetGatewayRequestValidator.validate(request);
    await this.setGatewayInteractor.execute(request);
  }
}

export default SettingsService;
