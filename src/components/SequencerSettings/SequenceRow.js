import React from 'react';
import SettingContainer from './SettingContainer';
import { PoweroffOutlined } from '@ant-design/icons';

const SequenceRow = ({ active, color: colorProp, steps }) => {
  const color = active ? colorProp : '#1f1f1f';

  return (
    <div className="sequence">
      <SettingContainer color={color} rounded dashed={!active}>
        <PoweroffOutlined className="active-switch" style={{ color }} />
      </SettingContainer>
      <SettingContainer color={color}>{steps.length}</SettingContainer>
    </div>
  );
};

export default SequenceRow;
