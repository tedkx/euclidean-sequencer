import React from 'react';
import { Select } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { scales } from 'lib/constants';

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
