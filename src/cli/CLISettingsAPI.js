import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';

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
}

export default CLISettingsAPI;
