import React from 'react';
import SequencerView from './View';
import { defaultSequences } from './mockData';
import './Sequencer.less';

const Sequencer = () => {
  const [sequences, setSequences] = React.useState(defaultSequences);

  const onToggleActive = React.useCallback(
    idx =>
      setSequences(seqs =>
        seqs.map((s, i) => (i === idx ? { ...s, active: !s.active } : s))
      ),
    [setSequences]
  );

  return (
    <div>
      <SequencerView onToggleActive={onToggleActive} sequences={sequences} />
    </div>
  );
};

export default Sequencer;
