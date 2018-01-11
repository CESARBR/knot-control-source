import fs from 'fs-extra';
import State from 'entities/State';

const DEFAULT_SETTINGS = {
  state: State.CONFIGURATION.name,
};

class JsonSettingsStoreInitializer {
  constructor(filename) {
    this.filename = filename;
  }

  async init() {
    const exists = await fs.pathExists(this.filename);
    if (!exists) {
      await fs.ensureFile(this.filename);
      await fs.writeJson(this.filename, DEFAULT_SETTINGS);
    }
  }
}

export default JsonSettingsStoreInitializer;
