import React from 'react';
import Sequencer from 'components/Sequencer';
import MidiContextProvider from './components/MidiContext/Provider';
import Layout from './components/Layout';
import WorkerBuilder from './worker/WorkerBuilder';
import IntervalWorker from './worker/interval.worker';

const intervalWorkerInstance = new WorkerBuilder(IntervalWorker);

function App() {
  React.useEffect(() => {
    intervalWorkerInstance.onmessage = msg => {
      console.log(msg?.type, 'from interval worker:', msg?.data);
    };
  }, []);

  return (
    <MidiContextProvider>
      <div className="app">
        <Layout>
          <Sequencer />
        </Layout>
      </div>
    </MidiContextProvider>
  );
}

export default App;
