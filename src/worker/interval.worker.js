/* eslint-disable no-restricted-globals */

const worker = () => {
  self.onmessage = e => {
    console.log('message to worker: ', e.data);
  };

  postMessage('interval worker initialized');
};

export default worker;
