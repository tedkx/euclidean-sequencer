import { setSequencesScale } from 'lib/scales';

const defaultScale = 'dorian';
const defaultBaseNote = 60;

const defaultSequences = setSequencesScale(
  [
    {
      active: true,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 2 === 0 })),
    },
    {
      active: true,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 4) - 1 !== 0 })),
    },
    {
      active: true,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 4 !== 0 })),
    },
    {
      active: true,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 3) - 1 === 0 })),
    },
    {
      active: false,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: (i + 2) % 5 === 0 })),
    },
    {
      active: true,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 2 === 0 })),
    },
    {
      active: true,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 4) - 1 !== 0 })),
    },
    {
      active: true,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 4 !== 0 })),
    },
    {
      active: false,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 3) - 1 === 0 })),
    },
    {
      active: true,
      offset: 0,
      steps: Array.from(Array(16)).map((_, i) => ({ hit: (i + 2) % 5 === 0 })),
    },
  ],
  defaultScale,
  defaultBaseNote
);

export { defaultSequences };
