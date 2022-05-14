import React from 'react';
import SequencerView from './View';
import './Sequencer.less';
import {
  useGlobalControlHandlers,
  useKeyboardEvents,
  useSequences,
} from './hooks';

const Sequencer = () => {
  const {
    onNoteChange,
    onOffsetChange,
    onStepCountChange,
    onToggleActive,
    sequences,
    setSequences,
  } = useSequences();
  const { baseNote, scale, onBaseNoteChange, onScaleChange } =
    useGlobalControlHandlers(setSequences);

  useKeyboardEvents(setSequences);

  return sequences ? (
    <div>
      <SequencerView
        baseNote={baseNote}
        onBaseNoteChange={onBaseNoteChange}
        onNoteChange={onNoteChange}
        onOffsetChange={onOffsetChange}
        onScaleChange={onScaleChange}
        onStepCountChange={onStepCountChange}
        onToggleActive={onToggleActive}
        scale={scale}
        sequences={sequences}
      />
    </div>
  ) : null;
};

export default Sequencer;
