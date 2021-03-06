/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { func, number } from 'prop-types';
import './Parameter.less';
import { debounce } from 'lodash';

const pixelsForValueChange = 10;
const defaultStep = 1;

const useWheelValueChanging = ({
  max,
  min,
  onSetValue,
  step = defaultStep,
  value,
}) => {
  const ref = React.useRef({
    max,
    min,
    step,
    value,
  });
  const elementRef = React.useRef();

  React.useEffect(() => {
    ref.current.step = step;
    ref.current.value = value;
    ref.current.min = min;
    ref.current.max = max;
  }, [value, step, min, max]);

  React.useEffect(() => {
    if (typeof onSetValue !== 'function') return;

    const onWheel = debounce(e => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();

      const { value, step, min, max } = ref.current;
      const newValue = value + step * (e.deltaY < 0 ? 1 : -1);
      onSetValue(Math.min(max, Math.max(min, newValue)), {
        changeType: value > newValue ? 'decrease' : 'increase',
        previousValue: ref.current.value,
      });
      if (newValue <= max && newValue >= min) ref.current.value = newValue;
    }, 5);

    elementRef.current.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      if (elementRef.current)
        elementRef.current.removeEventListener('wheel', onWheel, {
          passive: false,
        });
    };
  }, [onSetValue]);

  return { elementRef };
};

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
        onSetValue(newValue, {
          changeType: ref.current.y < e.pageY ? 'decrease' : 'increase',
          previousValue: ref.current.value,
        });

        ref.current.justPressed = false;
        ref.current.pixelsMoved = 0;
      }
      ref.current.y = e.pageY;
    },
    [onSetValue, min, max]
  );

  const onMouseDown = React.useCallback(
    e => {
      if (typeof onSetValue !== 'function') return;
      if (e.button === 0) {
        setDragging(true);
        ref.current.y = e.pageY;

        ref.current.mouseMovelistener = handleMouseMove;
        ref.current.mouseUplistener = handleMouseUp;
        ref.current.justPressed = true;

        window.addEventListener('mousemove', ref.current.mouseMovelistener);
        window.addEventListener('mouseup', ref.current.mouseUplistener);
      }
    },
    [onSetValue]
  );

  return { dragging, onMouseDown };
};

const IncrementalSetting = props => {
  const { valueFormatter, value } = props;
  const { dragging, onMouseDown } = useClickValueChanging(props);
  const { elementRef } = useWheelValueChanging(props);

  const formattedValue = React.useMemo(
    () =>
      typeof valueFormatter === 'function' ? valueFormatter(value) : value,
    [value, valueFormatter]
  );

  return (
    <div className="incremental-parameter">
      <div
        className="parameter-overlay"
        onMouseDown={onMouseDown}
        ref={elementRef}
      ></div>
      {dragging && <div className="window-overlay"></div>}
      {formattedValue}
    </div>
  );
};

IncrementalSetting.propTypes = {
  max: number,
  min: number,
  onSetValue: func,
  step: number,
  value: number,
  valueFormatter: func,
};

export default IncrementalSetting;
