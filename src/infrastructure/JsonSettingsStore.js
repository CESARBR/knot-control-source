import fs from 'fs-extra';
import State from 'entities/State';

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
}

export default JsonSettingsStore;
