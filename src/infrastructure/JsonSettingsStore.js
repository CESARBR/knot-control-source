import fs from 'fs-extra';
import State from 'entities/State';
import Address from 'entities/Address';

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

  async setCloud(address) {
    const settings = await this.getSettings();
    settings.cloud = address;
    await this.saveSettings(settings);
  }
}

export default JsonSettingsStore;
