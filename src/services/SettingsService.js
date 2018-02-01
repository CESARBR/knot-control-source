import { SetCloudRequestValidator } from 'services/SetCloudRequest';
import { SetUserRequestValidator } from 'services/SetUserRequest';
import { SetGatewayRequestValidator } from 'services/SetGatewayRequest';

class SettingsService {
  constructor(
    isReadyInteractor,
    getCloudInteractor,
    getUserInteractor,
    getGatewayInteractor,
    setCloudInteractor,
    setUserInteractor,
    setGatewayInteractor,
  ) {
    this.isReadyInteractor = isReadyInteractor;
    this.getCloudInteractor = getCloudInteractor;
    this.getUserInteractor = getUserInteractor;
    this.getGatewayInteractor = getGatewayInteractor;
    this.setCloudInteractor = setCloudInteractor;
    this.setUserInteractor = setUserInteractor;
    this.setGatewayInteractor = setGatewayInteractor;
  }

  async isReady() {
    return this.isReadyInteractor.execute();
  }

  async getCloud() {
    return this.getCloudInteractor.execute();
  }

  async setCloud(request) {
    SetCloudRequestValidator.validate(request);
    await this.setCloudInteractor.execute(request);
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

  async getGateway() {
    return this.getGatewayInteractor.execute();
  }
}

export default SettingsService;
