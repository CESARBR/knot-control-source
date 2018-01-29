class GetUserInteractor {
  constructor(settingsStore) {
    this.settingsStore = settingsStore;
  }

  async execute() {
    return this.settingsStore.getUser();
  }
}

export default GetUserInteractor;
