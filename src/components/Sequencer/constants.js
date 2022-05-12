import palettes from 'nice-color-palettes/100.json';
import { generateEuclideanSequence } from 'lib/utils';

const totalSequences = 10;

const defaultSequences = Array.from(Array(totalSequences)).map(() => ({
  active: false,
  offset: 0,
  steps: generateEuclideanSequence(16, 0),
}));

const colorPalette = [
  '#197278',
  ...palettes[3].slice(1, 4),
  '#A4236E',
  ...palettes[84].slice(0, 4),
  '#84CC92',
];

export { colorPalette, defaultSequences };
