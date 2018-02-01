import { ConfigureCloudRequest } from 'services/ConfigureCloudRequest';
import { SetUserRequest } from 'services/SetUserRequest';
import { SetGatewayRequest } from 'services/SetGatewayRequest';

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

  async getUser() {
    return this.settingsService.getUser();
  }

  async getGateway() {
    return this.settingsService.getGateway();
  }

  async configureCloud(hostname, port) {
    const request = new ConfigureCloudRequest(hostname, port);
    await this.settingsService.configureCloud(request);
  }

  async setUser(uuid, token) {
    const request = new SetUserRequest(uuid, token);
    await this.settingsService.setUser(request);
  }

  async setGateway(uuid, token) {
    const request = new SetGatewayRequest(uuid, token);
    await this.settingsService.setGateway(request);
  }
}

export default CLISettingsAPI;
