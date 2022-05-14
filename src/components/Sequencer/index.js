import React from 'react';
import SequencerView from './View';
import './Sequencer.less';
//import { defaultSequences } from './constants';
import { defaultSequences } from './mockData';
import {
  useGlobalControlHandlers,
  useKeyboardEvents,
  useSequences,
} from './hooks';

const Sequencer = () => {
  const { sequences, setSequences } = useSequences();
  const { baseNote, scale, onBaseNoteChange, onScaleChange } =
    useGlobalControlHandlers(setSequences);

  const onToggleActive = React.useCallback(
    idx =>
      setSequences(seqs =>
        seqs.map((s, i) => (i === idx ? { ...s, active: !s.active } : s))
      ),
    [setSequences]
  );

  const onStepCountChange = React.useCallback(
    (idx, value) =>
      setSequences(seqs =>
        seqs.map((s, i) =>
          i === idx
            ? { ...s, steps: defaultSequences[idx].steps.slice(0, value) }
            : s
        )
      ),
    [setSequences]
  );

  const onOffsetChange = React.useCallback(
    (idx, offset) =>
      setSequences(seqs =>
        seqs.map((s, i) => (i === idx ? { ...s, offset } : s))
      ),
    [setSequences]
  );

  const onNoteChange = React.useCallback(
    (idx, note) =>
      setSequences(seqs =>
        seqs.map((s, i) => (i === idx ? { ...s, note } : s))
      ),
    [setSequences]
  );

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
