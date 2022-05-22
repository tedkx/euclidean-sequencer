import { useCallback, useEffect, useRef, useState } from 'react';
import { defaultBpm, defaultNoteValue } from 'lib/constants';
import WorkerBuilder from 'worker/WorkerBuilder';
import IntervalWorker from 'worker/interval.worker';

const intervalWorkerInstance = new WorkerBuilder(IntervalWorker);

/**
 * Sequence type
 * @typedef {Object} Sequence
 * @property {bool} active
 * @property {number} offset
 * @property {Array<Object>} steps - [{ pulse, velocity }]
 * @property {number} note
 */

/** Calculates the step duration in milliseconds, based on bpm and noteValue
 * The division by 4 is because bpm usually concertns quarter notes.
 */
const calculateStepDuration = (bpm, noteValue) =>
  (60 * 1000) / ((bpm * noteValue) / 4);

const createPlayableNote = (note, velocity, timestamp) => ({
  note,
  velocity,
  timestamp,
});

/**
 * Determines which notes to play, updating the sequencesScheduledUntil timestamps
 * @param {Array<Sequence>} sequences - Teh sequencez
 * @param {number} forTimestamp - High definition timestamp to schedule note for
 * @param {boolean} isInitial - Whether it's the first sequence tick
 * @param {Object} schedulerRef - ref to get stepIdx and update scheduled untils
 * @returns
 */
const getNotesToPlay = (sequences, forTimestamp, isInitial, schedulerRef) => {
  const { sequencesScheduledUntil, stepIdx } = schedulerRef.current;
  const notesToPlay = [];

  for (let seqIdx = 0; seqIdx < sequencesScheduledUntil.length; seqIdx++) {
    const sequence = sequences[seqIdx];
    if (!sequence.active) continue;

    if (
      !sequencesScheduledUntil[seqIdx] ||
      sequencesScheduledUntil[seqIdx] < forTimestamp
    ) {
      sequencesScheduledUntil[seqIdx] = forTimestamp;

      const sequenceStep =
        sequence.steps[(stepIdx + (isInitial ? 0 : 1)) % sequence.steps.length];

      if (sequenceStep.pulse)
        notesToPlay.push([
          createPlayableNote(
            sequence.note,
            sequenceStep.velocity,
            sequencesScheduledUntil[seqIdx]
          ),
          sequence,
        ]);
    }
  }

  return notesToPlay;
};

/**Given an array of sequences, containing note, pulse and velocity,
 * schedule notes to be played on the next sequencer step. The scheduling
 * is performed during the next `t + stepDuration` window
 * @param {Array<Sequence>} sequences
 * @param {function} onPlayNote - Func(note, sequencer), currently only midi implementation
 */
const useScheduler = (sequences, onPlayNote) => {
  const [playing, setPlaying] = useState(false);
  const schedulerRef = useRef({
    currentStepTime: null,
    onPlayNote: null,
    sequences,
    sequencesScheduledUntil: null, // [timestamp]
    stepDuration: null,
    stepIdx: null,
  });

  // update ref sequence data when sequences changed
  useEffect(() => {
    if (sequences) {
      schedulerRef.current.sequences = sequences;
      if (!schedulerRef.current.sequencesScheduledUntil)
        schedulerRef.current.sequencesScheduledUntil = sequences.map(
          () => null
        );
    }
  }, [sequences]);

  useEffect(() => {
    schedulerRef.current.onPlayNote = onPlayNote;
  }, [onPlayNote]);

  const schedule = useCallback(initialTime => {
    const { currentStepTime, sequences, stepDuration } = schedulerRef.current;

    const currentTime = initialTime || window.performance.now();
    const nextStepTime = currentStepTime + stepDuration;

    // advance step if time elapsed
    if (currentTime > nextStepTime) {
      schedulerRef.current.stepIdx++;
      schedulerRef.current.currentStepTime = nextStepTime;
    }

    // determine notes to play, update `scheduledUntil` timings per sequence
    const notesToPlay = getNotesToPlay(
      sequences,
      initialTime || nextStepTime,
      !!initialTime,
      schedulerRef // sequencesScheduledUntil will be updated by ref
    );

    notesToPlay.forEach(([note, sequence]) =>
      schedulerRef.current.onPlayNote(note, sequence)
    );
  }, []);

  useEffect(() => {
    if (playing) {
      schedulerRef.current.stepDuration = calculateStepDuration(
        defaultBpm,
        defaultNoteValue
      );
      schedulerRef.current.stepIdx = 0;
      schedulerRef.current.currentStepTime = window.performance.now();
      schedule(schedulerRef.current.currentStepTime);
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
