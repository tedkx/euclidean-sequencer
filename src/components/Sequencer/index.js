import React from 'react';
import SequencerView from './View';
import './Sequencer.less';
import {
  useGlobalControlHandlers,
  useKeyboardEvents,
  useSequences,
} from './handlers';
import { useScheduler } from './scheduler';
import MidiContext from '../MidiContext';
import { playNote } from 'lib/midi';

const Sequencer = () => {
  const { selectedOutput } = React.useContext(MidiContext);

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

  const onPlayNote = React.useCallback(
    (note, sequence) => playNote(selectedOutput, note, sequence),
    [selectedOutput]
  );

  const { onTogglePlay, playing } = useScheduler(sequences, onPlayNote);

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
