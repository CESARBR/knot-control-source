import State from 'entities/State';
import InvalidStateError from 'entities/InvalidStateError';

class ConfigureCloudInteractor {
  constructor(settingsStore) {
    this.settingsStore = settingsStore;
  }

  async execute(cloudAddress) {
    const currentState = await this.settingsStore.getState();
    if (currentState !== State.CONFIGURATION) {
      throw new InvalidStateError(
        currentState,
        'Can\'t configure cloud when not in configuration mode.',
      );
    }
    await this.settingsStore.setCloud(cloudAddress);
  }
}

export default ConfigureCloudInteractor;
