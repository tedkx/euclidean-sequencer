import React from 'react';
import { array, func, number, string } from 'prop-types';
import { Card } from 'antd';
import SequencerGlobalControl from '../SequencerGlobalControl';
import SequencerSettings from '../SequencerSettings';
import SequenceDisplay from '../SequenceDisplay';
import { colorPalette } from './constants';

const SequencerView = ({
  baseNote,
  onBaseNoteChange,
  onScaleChange,
  scale,
  sequences,
  ...props
}) => {
  return (
    <Card
      className="sequencer-container"
      bordered={false}
      title={
        <SequencerGlobalControl
          baseNote={baseNote}
          onBaseNoteChange={onBaseNoteChange}
          onScaleChange={onScaleChange}
          scale={scale}
        />
      }
    >
      <div>
        <SequencerSettings
          colorPalette={colorPalette}
          sequences={sequences}
          {...props}
        />
      </div>
      <div>
        <SequenceDisplay colorPalette={colorPalette} sequences={sequences} />
      </div>
    </Card>
  );
};

SequencerView.propTypes = {
  baseNote: number,
  onBaseNoteChange: func,
  onNoteChange: func,
  onOffsetChange: func,
  onPulsesCountChange: func,
  onScaleChange: func,
  onStepCountChange: func,
  onToggleActive: func,
  scale: string,
  sequences: array,
};

export default SequencerView;
