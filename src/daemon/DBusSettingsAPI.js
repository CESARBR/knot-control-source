import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';

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

  async configureCloud(address) {
    const request = new ConfigureCloudRequest(address.hostname, address.port);
    await this.settingsService.configureCloud(request);
  }
}

export default DBusSettingsAPI;
