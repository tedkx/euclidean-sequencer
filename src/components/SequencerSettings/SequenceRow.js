import React from 'react';
import SettingContainer from './SettingContainer';
import { PoweroffOutlined } from '@ant-design/icons';

const SequenceRow = ({ active, color, offset, steps }) => {
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
      <SettingContainer active={active} color={color} rounded dashed={!active}>
        <PoweroffOutlined className="active-switch" style={{ color }} />
      </SettingContainer>
      <SettingContainer active={active} color={color}>
        {stepsCount}
      </SettingContainer>
      <SettingContainer active={active} color={color}>
        {hits}
      </SettingContainer>
      <SettingContainer active={active} color={color}>
        {offset}
      </SettingContainer>
    </div>
  );
};

export default SequenceRow;
