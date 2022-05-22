const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteOffStart = 128;
const noteOnStart = 144;
const minMidiNote = 0;
const maxMidiNote = 127;
const numOfChannels = 16;
const defaultBpm = 90;
const defaultNoteValue = 16;

export {
  defaultBpm,
  defaultNoteValue,
  maxMidiNote,
  minMidiNote,
  noteOnStart,
  noteOffStart,
  notes,
  numOfChannels,
};
