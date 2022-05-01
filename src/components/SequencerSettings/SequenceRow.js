import React from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { PoweroffOutlined } from '@ant-design/icons';
import IncrementalParameter from '../Parameter/Incremental';
import ParameterContainer from '../Parameter/Container';

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
      <ParameterContainer
        active={active}
        color={color}
        onClick={onToggleActive}
        rounded
      >
        <PoweroffOutlined className="active-switch" style={{ color }} />
      </ParameterContainer>
      <ParameterContainer active={active} color={color}>
        <IncrementalParameter
          max={16}
          min={0}
          onSetValue={onStepCountChange}
          value={stepCount}
        />
      </ParameterContainer>
      <ParameterContainer active={active} color={color}>
        <IncrementalParameter max={stepCount} min={0} value={hits} />
      </ParameterContainer>
      <ParameterContainer active={active} color={color}>
        <IncrementalParameter
          max={24}
          min={-24}
          onSetValue={onOffsetChange}
          value={offset}
        />
      </ParameterContainer>
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
