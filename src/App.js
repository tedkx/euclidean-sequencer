import React from 'react';
import Sequencer from 'components/Sequencer';
import MidiContextProvider from './components/MidiContext/Provider';
import Layout from './components/Layout';
import WorkerBuilder from './worker/WorkerBuilder';
import IntervalWorker from './worker/interval.worker';
import { Button } from 'antd';
const intervalWorkerInstance = new WorkerBuilder(IntervalWorker);

function App() {
  React.useEffect(() => {
    intervalWorkerInstance.onmessage = msg => {
      console.log(msg?.type, 'from interval worker:', msg?.data);
    };
  }, []);

  const play = React.useCallback(
    () => intervalWorkerInstance.postMessage('start'),
    []
  );
  const stop = React.useCallback(
    () => intervalWorkerInstance.postMessage('stop'),
    []
  );

  return (
    <MidiContextProvider>
      <div className="app">
        <Button onClick={play}>Play</Button>
        <Button onClick={stop}>Stop</Button>
        <Layout>
          <Sequencer />
        </Layout>
      </div>
    </MidiContextProvider>
  );
}

export default App;
