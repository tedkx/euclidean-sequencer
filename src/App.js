import React from 'react';
import Sequencer from 'components/Sequencer';
import MidiContextProvider from './components/MidiContext/Provider';
import Layout from './components/Layout';

function App() {
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
