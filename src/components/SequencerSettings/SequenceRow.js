import React from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import SettingContainer from './SettingContainer';
import { PoweroffOutlined } from '@ant-design/icons';
import IncrementalSetting from './IncrementalSetting';

const SequenceRow = ({
  active,
  color,
  offset,
  onOffsetChange,
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
        <IncrementalSetting max={stepCount} min={0} value={hits} />
      </SettingContainer>
      <SettingContainer active={active} color={color}>
        <IncrementalSetting
          max={24}
          min={-24}
          onSetValue={onOffsetChange}
          value={offset}
        />
      </SettingContainer>
    </div>
  );
};

SequenceRow.propTypes = {
  active: bool,
  color: string,
  offset: number,
  onOffsetChange: func,
  onStepCountChange: func,
  onToggleActive: func,
  steps: arrayOf(shape({ hit: bool })),
};

export default SequenceRow;
