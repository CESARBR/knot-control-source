import State from 'entities/State';
import InvalidStateError from 'entities/InvalidStateError';

class SetUserInteractor {
  constructor(settingsStore) {
    this.settingsStore = settingsStore;
  }

  async execute(userCredentials) {
    const currentState = await this.settingsStore.getState();
    if (currentState !== State.CONFIGURATION) {
      throw new InvalidStateError(currentState, `Can't configure cloud when not in 
        configuration mode.`);
    }
    await this.settingsStore.setUser(userCredentials);
  }
}

export default SetUserInteractor;
