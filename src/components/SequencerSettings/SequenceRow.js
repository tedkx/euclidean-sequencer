import React from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { PoweroffOutlined } from '@ant-design/icons';
import IncrementalParameter from '../Parameter/Incremental';
import ParameterContainer from '../Parameter/Container';
import { minMidiNote, maxMidiNote } from 'lib/constants';
import { noteToString } from 'lib/midi';

const SequenceRow = ({
  active,
  color,
  offset,
  note,
  onNoteChange,
  onOffsetChange,
  onStepCountChange,
  onToggleActive,
  steps,
}) => {
  const { stepCount, pulses } = React.useMemo(
    () => ({
      pulses: steps.filter(s => s.pulse).length,
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
        <IncrementalParameter max={stepCount} min={0} value={pulses} />
      </ParameterContainer>
      <ParameterContainer active={active} color={color}>
        <IncrementalParameter
          max={Math.min(24, stepCount)}
          min={Math.max(-24, stepCount * -1)}
          onSetValue={onOffsetChange}
          value={offset}
        />
      </ParameterContainer>
      <ParameterContainer active={active} color={color}>
        <IncrementalParameter
          max={maxMidiNote}
          min={minMidiNote}
          onSetValue={onNoteChange}
          value={note}
          valueFormatter={noteToString}
        />
      </ParameterContainer>
    </div>
  );
};

SequenceRow.propTypes = {
  active: bool,
  color: string,
  note: number,
  offset: number,
  onOffsetChange: func,
  onStepCountChange: func,
  onToggleActive: func,
  steps: arrayOf(shape({ pulse: bool })),
};

export default SequenceRow;
