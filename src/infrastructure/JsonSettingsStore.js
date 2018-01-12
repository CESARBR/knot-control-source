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

  async getState() {
    const settings = await this.getSettings();
    return State.enumValueOf(settings.state);
  }

  async getCloud() {
    const settings = await this.getSettings();
    return settings.cloud ? new Address(settings.cloud.hostname, settings.cloud.port) : null;
  }
}

export default JsonSettingsStore;
