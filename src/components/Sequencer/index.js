import React from 'react';
import { debounce } from 'lodash';
import SequencerView from './View';
import { scales, setSequencesScale } from 'lib/scales';
import './Sequencer.less';
//import { defaultSequences } from './constants';
import { defaultSequences } from './mockData';

const defaultScale = scales.dorian.name;
const defaultBaseNote = 60;
const baseNoteChangeDelay = 25;

const useSequences = () => {
  const [sequences, setSequences] = React.useState(null);
  const [scale, setScale] = React.useState(scales.dorian.name);
  const [baseNote, setBaseNote] = React.useState(defaultBaseNote);
  const baseNoteChangeRef = React.useRef({ initialValue: null });

  const onScaleChange = React.useCallback(
    scale => {
      setScale(scale);
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

  const changeBaseNote = React.useMemo(
    () =>
      debounce(baseNote => {
        const diff = baseNote - baseNoteChangeRef.current.initialValue;
        baseNoteChangeRef.current.initialValue = null;
        setBaseNote(baseNote);
        setSequences(seqs =>
          seqs.map(s => ({
            ...s,
            note: s.note + diff,
          }))
        );
      }, baseNoteChangeDelay),
    []
  );

  // keep track of base note changes, debounce call to actual change
  const onBaseNoteChange = React.useCallback(
    (baseNote, { previousValue }) => {
      if (!baseNoteChangeRef.current.initialValue)
        baseNoteChangeRef.current.initialValue = previousValue;

      changeBaseNote(baseNote);
    },
    [changeBaseNote]
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
    onBaseNoteChange,
    onScaleChange,
    scale,
    sequences,
    setSequences,
  };
};

const useKeyboardEvents = setSequences => {
  const keyDownHandler = React.useCallback(
    e => {
      if (typeof e.key === 'string' && e.key.match(/^\d$/)) {
        const idx = (parseInt(e.key) || 10) - 1;
        setSequences(seqs =>
          seqs.map((s, i) => (i === idx ? { ...s, active: !s.active } : s))
        );
      }
    },
    [setSequences]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []); // eslint-disable-line
};

const Sequencer = props => {
  const {
    baseNote,
    scale,
    sequences,
    setSequences,
    onBaseNoteChange,
    onScaleChange,
  } = useSequences(props);

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
