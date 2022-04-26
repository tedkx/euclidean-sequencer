import React from 'react';
import SettingContainer from './SettingContainer';
import { PoweroffOutlined } from '@ant-design/icons';

const SequenceRow = ({ active, color: colorProp, offset, steps }) => {
  const color = active ? colorProp : '#1f1f1f';

  const { stepsCount, hits } = React.useMemo(
    () => ({
      hits: steps.filter(s => s.hit).length,
      offset,
      stepsCount: steps.length,
    }),
    [steps, offset]
  );

  return (
    <div className="sequence">
      <SettingContainer color={color} rounded dashed={!active}>
        <PoweroffOutlined className="active-switch" style={{ color }} />
      </SettingContainer>
      <SettingContainer color={color}>{stepsCount}</SettingContainer>
      <SettingContainer color={color}>{hits}</SettingContainer>
      <SettingContainer color={color}>{offset}</SettingContainer>
    </div>
  );
};

export default SequenceRow;
