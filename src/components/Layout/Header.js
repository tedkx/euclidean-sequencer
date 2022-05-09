import React from 'react';
import { Button, Layout } from 'antd';
import PreferencesModal from './PreferencesModal';
import { ControlOutlined } from '@ant-design/icons';

const Header = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <Layout.Header className="layout-header">
        <Button
          onClick={() => setModalVisible(true)}
          type="primary"
          size="large"
        >
          Preferences <ControlOutlined />
        </Button>
      </Layout.Header>
      <PreferencesModal
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
      />
    </>
  );
};

export default Header;
