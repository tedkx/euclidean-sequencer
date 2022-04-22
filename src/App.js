import React from 'react';
import { Layout } from 'antd';
import Header from 'components/Header';
import Sequencer from 'components/Sequencer';

function App() {
  return (
    <div className="app">
      <Layout>
        <Header />
        <Layout.Content className="content">
          <Sequencer />
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
