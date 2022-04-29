import React from 'react';
import SequencerView from './View';
import { defaultSequences } from './mockData';
import './Sequencer.less';

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

  return (
    <div>
      <SequencerView
        onOffsetChange={onOffsetChange}
        onStepCountChange={onStepCountChange}
        onToggleActive={onToggleActive}
        sequences={sequences}
      />
    </div>
  );
};

export default Sequencer;
