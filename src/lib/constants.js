const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteOffStart = 128;
const noteOnStart = 144;
const minMidiNote = 0;
const maxMidiNote = 127;
const numOfChannels = 16;

const scales = {
  all: {
    title: 'All Notes',
    intervals: Array.from(Array(12)).map((_, idx) => 1),
  },
  harmonic: {
    title: 'Harmonic Minor',
    intervals: [2, 1, 2, 2, 1, 3, 1],
  },
  melodic: {
    title: 'Melodic Minor',
    intervals: [2, 1, 2, 2, 1, 3, 1],
  },
  ionian: {
    title: 'Ionian',
    intervals: [2, 2, 1, 2, 2, 2, 1],
  },
  dorian: {
    title: 'Dorian',
    intervals: [2, 1, 2, 2, 2, 1, 2],
  },
  phrygian: {
    title: 'Phrygian',
    intervals: [1, 2, 2, 2, 1, 2, 2],
  },
  lydian: {
    title: 'Lydian',
    intervals: [2, 2, 2, 1, 2, 2, 1],
  },
  mixolydian: {
    title: 'Mixolydian',
    intervals: [2, 2, 1, 2, 2, 1, 2],
  },
  aeolian: {
    title: 'Aeolian',
    intervals: [2, 1, 2, 2, 1, 2, 2],
  },
  locrian: {
    title: 'Locrian',
    intervals: [1, 2, 2, 1, 2, 2, 2],
  },
  altered: {
    title: 'Altered',
    intervals: [1, 2, 1, 2, 2, 2, 2],
  },
};

export {
  maxMidiNote,
  minMidiNote,
  noteOnStart,
  noteOffStart,
  notes,
  numOfChannels,
  scales,
};
