import React from 'react';
import { Layout } from 'antd';
import Header from 'components/Header';
import Sequencer from 'components/Sequencer';
import MidiContextProvider from './components/MidiContext/Provider';

function App() {
  return (
    <MidiContextProvider>
      <div className="app">
        <Layout>
          <Header />
          <Layout.Content className="content">
            <Sequencer />
          </Layout.Content>
        </Layout>
      </div>
    </MidiContextProvider>
  );
}

export default App;
