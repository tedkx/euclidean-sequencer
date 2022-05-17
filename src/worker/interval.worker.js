/* eslint-disable no-restricted-globals */

const worker = () => {
  let timerID = null;
  let intervalMillis = 100;

  const scheduleTick = interval =>
    setInterval(() => postMessage('tick'), interval);

  self.onmessage = e => {
    console.log('message', e);
    if (e.data === 'start' && timerID === null) {
      timerID = scheduleTick(intervalMillis);
    } else if (e.data === 'stop') {
      clearInterval(timerID);
      timerID = null;
    }
  };

  postMessage('interval worker initialized');
};

export default worker;
