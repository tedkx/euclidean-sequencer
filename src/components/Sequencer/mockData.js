import { scales } from 'lib/constants';

const defaultScale = scales.dorian;
const defaultSequences = [
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
];

let currentNote = 60;
defaultSequences.forEach((seq, idx) => {
  seq.note = currentNote;
  currentNote += defaultScale.intervals[idx % defaultScale.intervals.length];
});

export { defaultSequences };
