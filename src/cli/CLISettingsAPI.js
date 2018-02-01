import { SetCloudRequest } from 'services/SetCloudRequest';
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

  async setCloud(hostname, port) {
    const request = new SetCloudRequest(hostname, port);
    await this.settingsService.setCloud(request);
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
