class SettingsService {
  constructor(getStateInteractor) {
    this.getStateInteractor = getStateInteractor;
  }

  async getState() {
    return this.getStateInteractor.execute();
  }
}

export default SettingsService;
