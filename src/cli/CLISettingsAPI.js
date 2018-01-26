import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';
import { SetUserRequest } from 'services/SetUserRequest';

class CLISettingsAPI {
  constructor(settingsService) {
    this.settingsService = settingsService;
  }

  async isReady() {
    return this.settingsService.isReady();
  }

  async getCloud() {
    return this.settingsService.getCloud();
  }

  async configureCloud(hostname, port) {
    const request = new ConfigureCloudRequest(hostname, port);
    await this.settingsService.configureCloud(request);
  }

  async setUser(uuid, token) {
    const request = new SetUserRequest(uuid, token);
    await this.settingsService.setUser(request);
  }
}

export default CLISettingsAPI;
