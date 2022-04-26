import React from 'react';
import './SequencerSettings.less';
import SequenceRow from './SequenceRow';

const SequencerSettings = ({ colorPalette, onToggleActive, sequences }) => {
  return (
    <div className="sequencer-settings-container">
      <div className="settings-labels-container">
        <div className="setting-label"></div>
        <div className="setting-label">Steps</div>
        <div className="setting-label">Hits</div>
        <div className="setting-label">Offset</div>
      </div>
      {sequences.map((sequence, idx) => (
        <SequenceRow
          {...sequence}
          color={colorPalette[idx]}
          key={idx}
          onToggleActive={() => onToggleActive(idx)}
        />
      ))}
    </div>
  );
};

export default SequencerSettings;
