class DBusSettingsAPI {
  constructor(settingsService) {
    this.settingsService = settingsService;
  }

  async getState() {
    const state = await this.settingsService.getState();
    return state.name;
  }
}

export default DBusSettingsAPI;
