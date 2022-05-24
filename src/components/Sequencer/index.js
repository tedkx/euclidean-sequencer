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
  const [stepIdx, setStepIdx] = React.useState(null);

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

  const onPlayNote = React.useCallback(
    (note, sequence) => playNote(selectedOutput, note, sequence),
    [selectedOutput]
  );

  const { onTogglePlay, playing } = useScheduler(
    sequences,
    onPlayNote,
    setStepIdx
  );

  useKeyboardEvents(setSequences, onTogglePlay);

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
        stepIdx={stepIdx}
      />
    </div>
  ) : null;
};

export default Sequencer;
