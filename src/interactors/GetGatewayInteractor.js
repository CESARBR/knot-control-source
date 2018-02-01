class GetGatewayInteractor {
  constructor(settingsStore) {
    this.settingsStore = settingsStore;
  }

  async execute() {
    return this.settingsStore.getGateway();
  }
}

export default GetGatewayInteractor;
