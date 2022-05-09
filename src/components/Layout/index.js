import React from 'react';
import { Layout as AntLayout } from 'antd';
import Header from './Header';
import './Layout.less';

const Layout = ({ children }) => (
  <AntLayout>
    <Header />
    <AntLayout.Content className="content">{children}</AntLayout.Content>
  </AntLayout>
);

export default Layout;
