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
