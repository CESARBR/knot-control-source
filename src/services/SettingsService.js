import { ConfigureCloudRequestValidator } from 'services/ConfigureCloudRequest';
import { SetUserRequestValidator } from 'services/SetUserRequest';

class SettingsService {
  constructor(
    isReadyInteractor,
    getCloudInteractor,
    configureCloudInteractor,
    setUserInteractor,
    getUserInteractor,
  ) {
    this.isReadyInteractor = isReadyInteractor;
    this.getCloudInteractor = getCloudInteractor;
    this.configureCloudInteractor = configureCloudInteractor;
    this.setUserInteractor = setUserInteractor;
    this.getUserInteractor = getUserInteractor;
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
}

export default SettingsService;
