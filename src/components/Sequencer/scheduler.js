import { useCallback, useEffect, useRef, useState } from 'react';
import { defaultBpm } from 'lib/constants';
import WorkerBuilder from 'worker/WorkerBuilder';
import IntervalWorker from 'worker/interval.worker';

const intervalWorkerInstance = new WorkerBuilder(IntervalWorker);

const useScheduler = sequences => {
  const [playing, setPlaying] = useState(false);
  const schedulerRef = useRef({
    currentStepTime: null,
    sequences,
    sequenceTimings: null,
    stepDuration: null,
    stepIdx: null,
  });

  // update ref sequence data when sequences changed
  useEffect(() => {
    if (sequences) {
      schedulerRef.current.sequences = sequences;
      if (!schedulerRef.current.sequenceTimings)
        schedulerRef.current.sequences = sequences.map(() => null);
    }
  }, [sequences]);

  const schedule = useCallback(initial => {
    const prepareForStep = schedulerRef.current.stepIdx + (initial ? 0 : 1);
    const currentTime = window.performance.now();

    const { sequences, sequenceTimings } = schedulerRef.current;
    for (let seqIdx; seqIdx < sequenceTimings.length; seqIdx++) {
      if (!sequences[seqIdx].active) continue;

      const { scheduledUntil } = sequenceTimings[seqIdx];
      //if(scheduledUntil)
    }
  }, []);

  useEffect(() => {
    if (playing) {
      schedulerRef.current.stepDuration = (60 * 1000) / ((defaultBpm * 16) / 4);
      schedulerRef.current.stepIdx = 0;
      schedulerRef.current.nextStepTime = window.performance.now();
      schedule(true);
    } else {
      schedulerRef.current.stepDuration = null;
      schedulerRef.current.stepIdx = null;
    }
  }, [playing, schedule]);

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
