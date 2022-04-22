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

const SequencerView = ({ patterns }) => {
  return (
    <Card className="sequencer-container" bordered={false}>
      <div>
        <SequencerSettings />
      </div>
      <div>
        <PatternDisplay patterns />
      </div>
    </Card>
  );
};

export default SequencerView;
