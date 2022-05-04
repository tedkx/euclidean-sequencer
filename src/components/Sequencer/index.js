import React from 'react';
import SequencerView from './View';
import { scales } from 'lib/constants';
import './Sequencer.less';

import { defaultSequences } from './mockData';

window.defaultSequences = defaultSequences;

const Sequencer = () => {
  const [sequences, setSequences] = React.useState(defaultSequences);

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

  const onScaleChange = React.useCallback(
    scale =>
      setSequences(seqs => {
        let currentNote = seqs[0].note;
        const intervals = scales[scale].intervals;
        return seqs.map((seq, idx) => {
          const newSeq = { ...seq, note: currentNote };
          currentNote += intervals[idx % intervals.length];
          return newSeq;
        });
      }),
    [setSequences]
  );

  return (
    <div>
      <SequencerView
        onOffsetChange={onOffsetChange}
        onScaleChange={onScaleChange}
        onStepCountChange={onStepCountChange}
        onToggleActive={onToggleActive}
        sequences={sequences}
      />
    </div>
  );
};

export default Sequencer;
