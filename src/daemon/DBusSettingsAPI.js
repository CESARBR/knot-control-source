class DBusSettingsAPI {
  constructor(settingsService) {
    this.settingsService = settingsService;
  }

  async isReady() {
    return this.settingsService.isReady();
  }

  async getCloud() {
    const configuration = await this.settingsService.getCloud();
    return configuration || {};
  }
}

export default DBusSettingsAPI;
