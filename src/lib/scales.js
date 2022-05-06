const scales = {
  all: {
    name: 'all',
    title: 'All Notes',
    intervals: Array.from(Array(12)).map((_, idx) => 1),
  },
  harmonic: {
    name: 'harmonic',
    title: 'Harmonic Minor',
    intervals: [2, 1, 2, 2, 1, 3, 1],
  },
  melodic: {
    name: 'melodic',
    title: 'Melodic Minor',
    intervals: [2, 1, 2, 2, 1, 3, 1],
  },
  ionian: {
    name: 'ionian',
    title: 'Ionian',
    intervals: [2, 2, 1, 2, 2, 2, 1],
  },
  dorian: {
    name: 'dorian',
    title: 'Dorian',
    intervals: [2, 1, 2, 2, 2, 1, 2],
  },
  phrygian: {
    name: 'phrygian',
    title: 'Phrygian',
    intervals: [1, 2, 2, 2, 1, 2, 2],
  },
  lydian: {
    name: 'lydian',
    title: 'Lydian',
    intervals: [2, 2, 2, 1, 2, 2, 1],
  },
  mixolydian: {
    name: 'mixolydian',
    title: 'Mixolydian',
    intervals: [2, 2, 1, 2, 2, 1, 2],
  },
  aeolian: {
    name: 'aeolian',
    title: 'Aeolian',
    intervals: [2, 1, 2, 2, 1, 2, 2],
  },
  locrian: {
    name: 'locrian',
    title: 'Locrian',
    intervals: [1, 2, 2, 1, 2, 2, 2],
  },
  altered: {
    name: 'altered',
    title: 'Altered',
    intervals: [1, 2, 1, 2, 2, 2, 2],
  },
};

const setSequencesScale = (sequencesArr, scaleName, baseNote) => {
  if (!Array.isArray(sequencesArr)) return [];

  const { intervals } = scales[scaleName] || {};
  if (!intervals) throw new Error(`No scale ${scaleName} found`);

  let currentNote = baseNote;
  return sequencesArr.map((seq, idx) => {
    const note = currentNote;
    currentNote += intervals[idx % intervals.length];
    return { ...seq, note };
  });
};

export { scales, setSequencesScale };
