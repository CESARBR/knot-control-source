import { Enum } from 'enumify';

class State extends Enum {}
State.initEnum(['CONFIGURATION', 'READY']);

export default State;
