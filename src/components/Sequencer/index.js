import React from 'react';
import SequencerView from './View';
import { scales, setSequencesScale } from 'lib/scales';
import './Sequencer.less';
//import { defaultSequences } from './constants';
import { defaultSequences } from './mockData';

const defaultScale = scales.dorian.name;
const defaultBaseNote = 60;

const useSequences = () => {
  const [sequences, setSequences] = React.useState(null);
  const [scale, _setScale] = React.useState(scales.dorian.name);
  const [baseNote, setBaseNote] = React.useState(defaultBaseNote);

  const onScaleChange = React.useCallback(
    scale => {
      _setScale(scale);
      setSequences(seqs => {
        let currentNote = seqs[0].note;
        const intervals = scales[scale].intervals;
        return seqs.map((seq, idx) => {
          const newSeq = { ...seq, note: currentNote };
          currentNote += intervals[idx % intervals.length];
          return newSeq;
        });
      });
    },
    [setSequences]
  );

  React.useEffect(
    () =>
      setSequences(
        setSequencesScale(defaultSequences, defaultScale, defaultBaseNote)
      ),
    []
  );

  return {
    baseNote,
    onScaleChange,
    scale,
    sequences,
    setBaseNote,
    setSequences,
  };
};

const Sequencer = props => {
  const { baseNote, scale, sequences, setSequences, onScaleChange } =
    useSequences(props);

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

  return sequences ? (
    <div>
      <SequencerView
        baseNote={baseNote}
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
