import { ConfigureCloudRequestValidator } from 'services/ConfigureCloudRequest';

class SettingsService {
  constructor(isReadyInteractor, getCloudInteractor, configureCloudInteractor) {
    this.isReadyInteractor = isReadyInteractor;
    this.getCloudInteractor = getCloudInteractor;
    this.configureCloudInteractor = configureCloudInteractor;
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
}

export default SettingsService;
