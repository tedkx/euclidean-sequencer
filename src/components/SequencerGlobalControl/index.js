import React from 'react';
import { Select } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { maxMidiNote, minMidiNote } from 'lib/constants';
import { scales } from 'lib/scales';
import { noteToString } from 'lib/midi';
import IncrementalParameter from '../Parameter/Incremental';
import ParameterContainer from '../Parameter/Container';

const defaultScale = 'dorian';

const scalesOptions = Object.keys(scales).map(scale => ({
  key: scale,
  label: scales[scale].title,
  value: scale,
}));

const SequencerGlobalControl = ({ onScaleChange }) => {
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
          onChange={onScaleChange}
          options={scalesOptions}
          style={{ width: 120 }}
        ></Select>
      </div>
      <PlayCircleOutlined className="play-button" />
    </div>
  );
};

export default SequencerGlobalControl;
