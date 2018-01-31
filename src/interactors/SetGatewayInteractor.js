import State from 'entities/State';
import InvalidStateError from 'entities/InvalidStateError';

class SetGatewayInteractor {
  constructor(settingsStore) {
    this.settingsStore = settingsStore;
  }

  async execute(gatewayCredentials) {
    const currentState = await this.settingsStore.getState();
    if (currentState !== State.CONFIGURATION) {
      throw new InvalidStateError(
        currentState,
        'Can\'t configure gateway when not in configuration mode',
      );
    }
    await this.settingsStore.setGateway(gatewayCredentials);
  }
}

export default SetGatewayInteractor;
