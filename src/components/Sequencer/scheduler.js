import { useCallback, useEffect, useState } from 'react';
import { defaultBpm } from 'lib/constants';
import WorkerBuilder from 'worker/WorkerBuilder';
import IntervalWorker from 'worker/interval.worker';

const intervalWorkerInstance = new WorkerBuilder(IntervalWorker);

const useScheduler = () => {
  const [playing, setPlaying] = useState(false);
  const [bpm, onSetBpm] = useState(defaultBpm);

  const onTogglePlay = useCallback(
    () =>
      setPlaying(current => {
        const newValue = !current;
        intervalWorkerInstance.postMessage(newValue ? 'start' : 'stop');
        return newValue;
      }),
    []
  );

  useEffect(() => {
    intervalWorkerInstance.onmessage = msg => {
      console.log(msg?.type, 'from interval worker:', msg?.data);
    };
  }, []);

  return {
    bpm,
    onSetBpm,
    onTogglePlay,
    playing,
  };
};

export { useScheduler };
