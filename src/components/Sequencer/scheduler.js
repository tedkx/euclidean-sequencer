import { useCallback, useEffect, useRef, useState } from 'react';
import { defaultBpm, defaultNoteValue } from 'lib/constants';
import WorkerBuilder from 'worker/WorkerBuilder';
import IntervalWorker from 'worker/interval.worker';

const intervalWorkerInstance = new WorkerBuilder(IntervalWorker);

/** Calculates the step duration in milliseconds, based on bpm and noteValue
 * The division by 4 is because bpm usually concertns quarter notes.
 */
const calculateStepDuration = (bpm, noteValue) =>
  (60 * 1000) / ((defaultBpm * noteValue) / 4);

/* Given an array of sequences, containing note, pulse and velocity,
 * schedule notes to be played on the next sequencer step. The scheduling
 * is performed during the next `t + stepDuration` window
 */
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
    const { currentStepTime, sequences, sequenceTimings, stepDuration } =
      schedulerRef.current;

    console.log('tick', initial);

    // const prepareForStep = schedulerRef.current.stepIdx + (initial ? 0 : 1);
    const currentTime = window.performance.now();

    if (currentTime > currentStepTime + stepDuration) {
      schedulerRef.current.stepIdx++;
      schedulerRef.current.currentStepTime += stepDuration;
      console.log(
        'step',
        schedulerRef.current.stepIdx,
        schedulerRef.current.currentStepTime
      );
    }

    // for (let seqIdx; seqIdx < sequenceTimings.length; seqIdx++) {
    //   if (!sequences[seqIdx].active) continue;

    //   const { scheduledUntil } = sequenceTimings[seqIdx];
    //   if(scheduledUntil)
    // }
  }, []);

  useEffect(() => {
    if (playing) {
      schedulerRef.current.stepDuration = calculateStepDuration(
        defaultBpm,
        defaultNoteValue
      );
      schedulerRef.current.stepIdx = 0;
      schedulerRef.current.currentStepTime = window.performance.now();
      console.log('beginning, duration:', schedulerRef.current.stepDuration);
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
      if (msg?.data === 'tick') schedule();
    };
  }, [schedule]);

  return {
    onTogglePlay,
    playing,
  };
};

export { useScheduler };
