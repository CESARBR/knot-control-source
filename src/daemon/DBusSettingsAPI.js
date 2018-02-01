import { SetCloudRequest } from 'services/SetCloudRequest';
import { SetUserRequest } from 'services/SetUserRequest';
import { SetGatewayRequest } from 'services/SetGatewayRequest';

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

  async getUser() {
    const configuration = await this.settingsService.getUser();
    return configuration || {};
  }

  async getGateway() {
    const configuration = await this.settingsService.getGateway();
    return configuration || {};
  }

  async setCloud(address) {
    const request = new SetCloudRequest(address.hostname, address.port);
    await this.settingsService.setCloud(request);
  }

  async setUser(credentials) {
    const request = new SetUserRequest(credentials.uuid, credentials.token);
    await this.settingsService.setUser(request);
  }

  async setGateway(credentials) {
    const request = new SetGatewayRequest(credentials.uuid, credentials.token);
    await this.settingsService.setGateway(request);
  }
}

export default DBusSettingsAPI;
