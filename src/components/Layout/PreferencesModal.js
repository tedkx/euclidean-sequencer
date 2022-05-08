import React from 'react';
import { Button, Form, Modal, Select } from 'antd';
import MidiContext from '../MidiContext';
import { ReloadOutlined } from '@ant-design/icons';

const formatOption = inputOutput => ({
  disabled: inputOutput.state !== 'connected',
  label: inputOutput.name,
  value: inputOutput.id,
});

const PreferencesModal = props => {
  const { onCancel, visible } = props;
  const { initialize, onSetOutput, outputs, selectedOutput } =
    React.useContext(MidiContext);

  const outputOptions = React.useMemo(
    () => (visible && outputs ? outputs.map(formatOption) : []),
    [outputs, visible]
  );

  const handleOutputSelect = React.useCallback(
    id => onSetOutput(outputs.find(output => output.id === id)),
    [outputs, onSetOutput]
  );

  return (
    <Modal
      destroyOnClose
      title="Settings"
      footer={[
        <Button type="primary" onClick={onCancel}>
          Close
        </Button>,
      ]}
      {...props}
    >
      <div>Midi</div>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Output">
          <Select
            name="selectedOutput"
            options={outputOptions}
            onSelect={handleOutputSelect}
            value={selectedOutput?.id || null}
          />
        </Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={initialize}>
            Re-Initialize Midi <ReloadOutlined />
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PreferencesModal;
