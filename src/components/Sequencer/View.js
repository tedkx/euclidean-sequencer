import React from 'react';
import { Card } from 'antd';
import SequencerGlobalControl from '../SequencerGlobalControl';
import SequencerSettings from '../SequencerSettings';
import SequenceDisplay from '../SequenceDisplay';
import { colorPalette } from './constants';

const SequencerView = ({
  baseNote,
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

export default SequencerView;
