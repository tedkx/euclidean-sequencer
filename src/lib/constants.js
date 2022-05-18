const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteOffStart = 128;
const noteOnStart = 144;
const minMidiNote = 0;
const maxMidiNote = 127;
const numOfChannels = 16;
const defaultBpm = 90;

export {
  defaultBpm,
  maxMidiNote,
  minMidiNote,
  noteOnStart,
  noteOffStart,
  notes,
  numOfChannels,
};
