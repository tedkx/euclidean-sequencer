import React from 'react';
import SettingContainer from './SettingContainer';
import { PoweroffOutlined } from '@ant-design/icons';
import IncrementalSetting from './IncrementalSetting';

const SequenceRow = ({
  active,
  color,
  offset,
  onStepCountChange,
  onToggleActive,
  steps,
}) => {
  const { stepCount, hits } = React.useMemo(
    () => ({
      hits: steps.filter(s => s.hit).length,
      offset,
      stepCount: steps.length,
    }),
    [steps, offset]
  );

  return (
    <div className="sequence">
      <SettingContainer
        active={active}
        color={color}
        onClick={onToggleActive}
        rounded
      >
        <PoweroffOutlined className="active-switch" style={{ color }} />
      </SettingContainer>
      <SettingContainer active={active} color={color}>
        <IncrementalSetting
          max={16}
          min={0}
          onSetValue={onStepCountChange}
          value={stepCount}
        />
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
