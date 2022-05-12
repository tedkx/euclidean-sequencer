import { generateEuclideanSequence } from 'lib/utils';

const defaultSequences = [
  {
    active: true,
    offset: 0,
    steps: generateEuclideanSequence(16, 8),
  },
  {
    active: true,
    offset: 0,
    steps: generateEuclideanSequence(16, 12),
  },
  {
    active: true,
    offset: 0,
    steps: generateEuclideanSequence(16, 12),
  },
  {
    active: true,
    offset: 0,
    steps: generateEuclideanSequence(16, 5),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanSequence(16, 3),
  },
  {
    active: true,
    offset: 0,
    steps: generateEuclideanSequence(16, 8),
  },
  {
    active: true,
    offset: 0,
    steps: generateEuclideanSequence(16, 12),
  },
  {
    active: true,
    offset: 0,
    steps: generateEuclideanSequence(16, 12),
  },
  {
    active: false,
    offset: 0,
    steps: generateEuclideanSequence(16, 5),
  },
  {
    active: true,
    offset: 0,
    steps: generateEuclideanSequence(16, 3),
  },
];

export { defaultSequences };
