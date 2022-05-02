import React from 'react';
import { Select } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { maxMidiNote, minMidiNote, scales } from 'lib/constants';
import { noteToString } from 'lib/midi';
import IncrementalParameter from '../Parameter/Incremental';
import ParameterContainer from '../Parameter/Container';

const defaultScale = 'dorian';

const scalesOptions = Object.keys(scales).map(scale => ({
  key: scale,
  label: scales[scale].title,
  value: scale,
}));

const SequencerGlobalControl = props => {
  const onChange = (...args) => console.log('change', ...args);

  return (
    <div className="global-control">
      <div>
        Base Note:{' '}
        <ParameterContainer active color="#999" inline>
          <IncrementalParameter
            max={maxMidiNote}
            min={minMidiNote}
            value={72}
            valueFormatter={noteToString}
          />
        </ParameterContainer>
      </div>
      <div>
        Scale:{' '}
        <Select
          defaultValue={defaultScale}
          onChange={onChange}
          options={scalesOptions}
          style={{ width: 120 }}
        ></Select>
      </div>
      <PlayCircleOutlined className="play-button" />
    </div>
  );
};

export default SequencerGlobalControl;
