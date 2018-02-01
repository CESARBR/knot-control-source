import fs from 'fs-extra';
import State from 'entities/State';
import Address from 'entities/Address';
import Credentials from 'entities/Credentials';

class JsonSettingsStore {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async getSettings() {
    return fs.readJson(this.fileName);
  }

  async saveSettings(settings) {
    await fs.writeJson(this.fileName, settings);
  }

  async getState() {
    const settings = await this.getSettings();
    return State.enumValueOf(settings.state);
  }

  async getCloud() {
    const settings = await this.getSettings();
    return settings.cloud ? new Address(settings.cloud.hostname, settings.cloud.port) : null;
  }

  async getUser() {
    const settings = await this.getSettings();
    return settings.user ? new Credentials(settings.user.uuid, settings.user.token) : null;
  }

  async getGateway() {
    const settings = await this.getSettings();
    return settings.gateway ? new Credentials(settings.gateway.uuid, settings.gateway.token) : null;
  }

  async setCloud(address) {
    const settings = await this.getSettings();
    settings.cloud = address;
    await this.saveSettings(settings);
  }

  async setUser(credentials) {
    const settings = await this.getSettings();
    settings.user = credentials;
    await this.saveSettings(settings);
  }

  async setGateway(credentials) {
    const settings = await this.getSettings();
    settings.gateway = credentials;
    await this.saveSettings(settings);
  }
}

export default JsonSettingsStore;
