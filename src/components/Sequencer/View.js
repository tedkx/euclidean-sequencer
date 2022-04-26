import React from 'react';
import { Card } from 'antd';
import SequencerSettings from '../SequencerSettings';
import SequenceDisplay from '../SequenceDisplay';
import palettes from 'nice-color-palettes/100.json';

const colorPalette = [
  '#197278',
  ...palettes[3].slice(1, 4),
  '#A4236E',
  ...palettes[84].slice(0, 4),
  '#84CC92',
];

const SequencerView = ({ sequences, ...props }) => {
  return (
    <Card className="sequencer-container" bordered={false}>
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
