import React from 'react';
import './SequencerSettings.less';
import SequenceRow from './SequenceRow';

const SequencerSettings = ({ colorPalette, sequences }) => {
  return (
    <div className="sequencer-settings-container">
      {sequences.map((sequence, idx) => (
        <SequenceRow {...sequence} color={colorPalette[idx]} key={idx} />
      ))}
    </div>
  );
};

export default SequencerSettings;
