import React from 'react';
import { Card } from 'antd';
import SequencerSettings from '../SequencerSettings';
import PatternDisplay from '../PatternDisplay';

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

const defaultPatterns = [
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => (i % 2 === 0 ? 127 : 0)),
  },
  {
    active: false,
    steps: [
      127, 127, 127, 0, 127, 127, 127, 0, 127, 127, 127, 0, 127, 127, 127, 0,
    ],
  },
  {
    active: true,
    steps: [127, 0, 0, 0, 127, 0, 0, 0, 127, 0, 0, 0, 127, 0, 0, 0],
  },
];

const SequencerView = ({ patterns = defaultPatterns }) => {
  return (
    <Card className="sequencer-container" bordered={false}>
      <div>
        <SequencerSettings />
      </div>
      <div>
        <PatternDisplay colorPalette={colorPalette} patterns={patterns} />
      </div>
    </Card>
  );
};

export default SequencerView;
