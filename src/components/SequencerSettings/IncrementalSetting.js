import React from 'react';
import { func, number } from 'prop-types';

const pixelsForValueChange = 10;

const useClickValueChanging = ({ max, min, onSetValue, value }) => {
  const ref = React.useRef({
    y: null,
    pixelsMoved: 0,
    justPressed: false,
    mouseMovelistener: null,
    mouseUplistener: null,
    mouseDown: false,
    value: value,
  });
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    ref.current.value = value;
  }, [value]);

  const handleMouseUp = React.useCallback(
    e => {
      if (e.button === 0) {
        setDragging(false);
        window.removeEventListener('mousemove', ref.current.mouseMovelistener);
        window.removeEventListener('mouseup', ref.current.mouseUplistener);
        ref.current.listener = null;
      }
    },
    [setDragging]
  );

  const handleMouseMove = React.useCallback(
    e => {
      ref.current.pixelsMoved += ref.current.y - e.pageY;

      if (
        Math.abs(ref.current.pixelsMoved) >= pixelsForValueChange ||
        ref.current.justPressed
      ) {
        const newValue = Math.min(
          max,
          Math.max(min, ref.current.value + (ref.current.y > e.pageY ? 1 : -1))
        );
        onSetValue(newValue);

        ref.current.justPressed = false;
        ref.current.pixelsMoved = 0;
      }
      ref.current.y = e.pageY;
    },
    [onSetValue, min, max]
  );

  const onMouseDown = React.useCallback(e => {
    if (e.button === 0) {
      setDragging(true);
      ref.current.y = e.pageY;

      ref.current.mouseMovelistener = handleMouseMove;
      ref.current.mouseUplistener = handleMouseUp;
      ref.current.justPressed = true;

      window.addEventListener('mousemove', ref.current.mouseMovelistener);
      window.addEventListener('mouseup', ref.current.mouseUplistener);
    }
  }, []);

  return { dragging, onMouseDown };
};

const IncrementalSetting = props => {
  const { value } = props;
  const { dragging, onMouseDown } = useClickValueChanging(props);

  return (
    <div className="incremental-setting">
      <div className="setting-overlay" onMouseDown={onMouseDown}></div>
      {dragging && <div className="window-overlay"></div>}
      {value}
    </div>
  );
};

IncrementalSetting.propTypes = {
  max: number,
  min: number,
  onSetValue: func,
  value: number,
};

export default IncrementalSetting;
