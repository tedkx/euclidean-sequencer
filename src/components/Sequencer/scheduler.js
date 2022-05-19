import { useCallback, useEffect, useRef, useState } from 'react';
import { defaultBpm } from 'lib/constants';
import WorkerBuilder from 'worker/WorkerBuilder';
import IntervalWorker from 'worker/interval.worker';

const intervalWorkerInstance = new WorkerBuilder(IntervalWorker);

const useScheduler = sequences => {
  const [playing, setPlaying] = useState(false);
  const schedulerRef = useRef({
    currentTime: null,
    sequences,
    sequenceTimings: null,
    stepDuration: null,
  });

  // update ref sequence data when sequences changed
  useEffect(() => {
    if (sequences) {
      schedulerRef.current.sequences = sequences;
      if (!schedulerRef.current.sequenceTimings)
        schedulerRef.current.sequences = sequences.map(() => null);
    }
  }, [sequences]);

  useEffect(() => {
    if (playing) {
      schedulerRef.current.stepDuration = (60 * 1000) / ((defaultBpm * 16) / 4);
    } else {
      schedulerRef.current.stepDuration = null;
    }
  }, [playing]);

  const onTogglePlay = useCallback(
    () =>
      setPlaying(current => {
        const newPlaying = !current;
        intervalWorkerInstance.postMessage(newPlaying ? 'start' : 'stop');
        return newPlaying;
      }),
    []
  );

  // initialization effect
  useEffect(() => {
    intervalWorkerInstance.onmessage = msg => {
      console.log(msg?.type, 'from interval worker:', msg?.data);
    };
  }, []);

  return {
    onTogglePlay,
    playing,
  };
};

export { useScheduler };
