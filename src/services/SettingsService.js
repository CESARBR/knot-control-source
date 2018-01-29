import { ConfigureCloudRequestValidator } from 'services/ConfigureCloudRequest';
import { SetUserRequestValidator } from 'services/SetUserRequest';

class SettingsService {
  constructor(
    isReadyInteractor,
    getCloudInteractor,
    getUserInteractor,
    configureCloudInteractor,
    setUserInteractor,
  ) {
    this.isReadyInteractor = isReadyInteractor;
    this.getCloudInteractor = getCloudInteractor;
    this.getUserInteractor = getUserInteractor;
    this.configureCloudInteractor = configureCloudInteractor;
    this.setUserInteractor = setUserInteractor;
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
