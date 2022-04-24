import React from 'react';
import { Card } from 'antd';
import SequencerSettings from '../SequencerSettings';
import SequenceDisplay from '../SequenceDisplay';

/*
pattern: {
  hits,
  offset,
  note,
  ratio,
  steps,
}
*/

const colorPalette = [
  'cyan',
  'orange',
  'blue',
  'red',
  'green',
  'purple',
  'yellow',
  'pink',
];

const defaultSequences = [
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 2 === 0 })),
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 4) - 1 !== 0 })),
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 4 !== 0 })),
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 3) - 1 === 0 })),
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: (i + 2) % 5 === 0 })),
  },
];

const SequencerView = ({ sequences = defaultSequences }) => {
  return (
    <Card className="sequencer-container" bordered={false}>
      <div>
        <SequencerSettings />
      </div>
      <div>
        <SequenceDisplay colorPalette={colorPalette} sequences={sequences} />
      </div>
    </Card>
  );
};

export default SequencerView;
