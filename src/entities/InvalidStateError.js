class InvalidStateError extends Error {
  constructor(state, message) {
    super(message);
    this.state = state;
  }
}

export default InvalidStateError;
