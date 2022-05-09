import React from 'react';
import { Button, Form, Modal, Select } from 'antd';
import MidiContext from '../MidiContext';
import { ControlOutlined, ReloadOutlined } from '@ant-design/icons';

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
      footer={[
        <Button type="primary" onClick={onCancel}>
          Close
        </Button>,
      ]}
      title={
        <>
          <ControlOutlined /> Preferences
        </>
      }
      wrapClassName="preferences-modal"
      {...props}
    >
      <h3 className="section-title">
        Midi
        <Button type="primary" onClick={initialize} size="small">
          Re-Initialize Midi <ReloadOutlined />
        </Button>
      </h3>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Output">
          <Select
            name="selectedOutput"
            options={outputOptions}
            onSelect={handleOutputSelect}
            value={selectedOutput?.id || null}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PreferencesModal;
