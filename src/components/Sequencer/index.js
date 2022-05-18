import React from 'react';
import SequencerView from './View';
import './Sequencer.less';
import {
  useGlobalControlHandlers,
  useKeyboardEvents,
  useSequences,
} from './handlers';
import { useScheduler } from './scheduler';

const Sequencer = () => {
  const {
    onNoteChange,
    onOffsetChange,
    onPulsesCountChange,
    onStepCountChange,
    onToggleActive,
    sequences,
    setSequences,
  } = useSequences();
  const { baseNote, scale, onBaseNoteChange, onScaleChange } =
    useGlobalControlHandlers(setSequences);

  useKeyboardEvents(setSequences);

  const { onTogglePlay, playing } = useScheduler();

  return sequences ? (
    <div>
      <SequencerView
        baseNote={baseNote}
        onBaseNoteChange={onBaseNoteChange}
        onNoteChange={onNoteChange}
        onOffsetChange={onOffsetChange}
        onPulsesCountChange={onPulsesCountChange}
        onScaleChange={onScaleChange}
        onStepCountChange={onStepCountChange}
        onToggleActive={onToggleActive}
        onTogglePlay={onTogglePlay}
        playing={playing}
        scale={scale}
        sequences={sequences}
      />
    </div>
  ) : null;
};

export default Sequencer;
