class GetStateInteractor {
  constructor(settingsStore) {
    this.settingsStore = settingsStore;
  }

  async execute() {
    return this.settingsStore.getState();
  }
}

export default GetStateInteractor;
