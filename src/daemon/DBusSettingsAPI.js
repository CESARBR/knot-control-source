import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';
import { SetUserRequest } from 'services//SetUserRequest';

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

  async setUser(credentials) {
    const request = new SetUserRequest(credentials.uuid, credentials.token);
    await this.settingsService.setUser(request);
  }
}

export default DBusSettingsAPI;
