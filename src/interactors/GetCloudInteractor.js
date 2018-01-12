class GetCloudInteractor {
  constructor(settingsStore) {
    this.settingsStore = settingsStore;
  }

  async execute() {
    return this.settingsStore.getCloud();
  }
}

export default GetCloudInteractor;
