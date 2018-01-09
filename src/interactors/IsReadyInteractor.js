import State from 'entities/State';

class IsReadyInteractor {
  constructor(settingsStore) {
    this.settingsStore = settingsStore;
  }

  async execute() {
    return await this.settingsStore.getState() === State.READY;
  }
}

export default IsReadyInteractor;
