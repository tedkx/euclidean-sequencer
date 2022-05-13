import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { scales, setSequencesScale } from 'lib/scales';
import './Sequencer.less';
//import { defaultSequences } from './constants';
import { defaultSequences } from './mockData';

const defaultScale = scales.dorian.name;
const defaultBaseNote = 60;
const baseNoteChangeDelay = 25;

const useSequences = () => {
  const [sequences, setSequences] = useState(null);
  const [scale, setScale] = useState(scales.dorian.name);
  const [baseNote, setBaseNote] = useState(defaultBaseNote);
  const baseNoteChangeRef = useRef({ initialValue: null });

  const onScaleChange = useCallback(
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

  const changeBaseNote = useMemo(
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
  const onBaseNoteChange = useCallback(
    (baseNote, { previousValue }) => {
      if (!baseNoteChangeRef.current.initialValue)
        baseNoteChangeRef.current.initialValue = previousValue;

      changeBaseNote(baseNote);
    },
    [changeBaseNote]
  );

  useEffect(
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
  const keyDownHandler = useCallback(
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

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []); // eslint-disable-line
};

export { useKeyboardEvents, useSequences };
