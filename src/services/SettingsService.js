class SettingsService {
  constructor(isReadyInteractor, getCloudInteractor) {
    this.isReadyInteractor = isReadyInteractor;
    this.getCloudInteractor = getCloudInteractor;
  }

  async isReady() {
    return this.isReadyInteractor.execute();
  }

  async getCloud() {
    return this.getCloudInteractor.execute();
  }
}

export default SettingsService;
