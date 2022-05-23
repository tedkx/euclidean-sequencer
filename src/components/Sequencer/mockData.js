import { generateEuclideanRhythm } from 'lib/utils';

const defaultSequences = [
  {
    active: true,
    offset: 0,
    steps: generateEuclideanRhythm(16, 4),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanRhythm(16, 8),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanRhythm(16, 12),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanRhythm(16, 5),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanRhythm(16, 3),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanRhythm(16, 8),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanRhythm(16, 12),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanRhythm(16, 12),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanRhythm(16, 5),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanRhythm(16, 3),
  },
];

export { defaultSequences };
