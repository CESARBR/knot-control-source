class SettingsService {
  constructor(isReadyInteractor) {
    this.isReadyInteractor = isReadyInteractor;
  }

  async isReady() {
    return this.isReadyInteractor.execute();
  }
}

export default SettingsService;
