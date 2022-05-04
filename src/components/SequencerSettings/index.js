import React from 'react';
import { array, arrayOf, func, string } from 'prop-types';
import './SequencerSettings.less';
import SequenceRow from './SequenceRow';

const SequencerSettings = ({
  colorPalette,
  onNoteChange,
  onOffsetChange,
  onStepCountChange,
  onToggleActive,
  sequences,
}) => {
  return (
    <div className="sequencer-settings-container">
      <div className="settings-labels-container">
        <div className="setting-label"></div>
        <div className="setting-label">Steps</div>
        <div className="setting-label">Hits</div>
        <div className="setting-label">Offset</div>
        <div className="setting-label">Note</div>
      </div>
      {sequences.map((sequence, idx) => (
        <SequenceRow
          {...sequence}
          color={colorPalette[idx]}
          key={idx}
          onNoteChange={value => onNoteChange(idx, value)}
          onOffsetChange={value => onOffsetChange(idx, value)}
          onStepCountChange={value => onStepCountChange(idx, value)}
          onToggleActive={() => onToggleActive(idx)}
        />
      ))}
    </div>
  );
};

SequencerSettings.propTypes = {
  colorPalette: arrayOf(string),
  onNoteChange: func,
  onOffsetChange: func,
  onStepCountChange: func,
  onToggleActive: func,
  sequences: array,
};

export default SequencerSettings;
