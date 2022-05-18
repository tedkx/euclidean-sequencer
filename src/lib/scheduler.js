import { defaultBpm } from './constants';

class SequenceScheduler {
  constructor(output) {
    console.log('constructing');
    this.bpm = defaultBpm;
    this.output = output;
  }

  setOutput(output) {
    this.output = output;
  }

  start() {
    console.log('starting');
  }
  stop() {
    console.log('stopping');
  }
}

export default SequenceScheduler;
