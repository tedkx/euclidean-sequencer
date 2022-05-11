/* eslint-disable no-unused-vars */
import { notes } from './constants';

const MidiPortState = {
  Connected: 'connected',
  Disconnected: 'disconected',
};

const MidiPortConnection = {
  Connected: 'connected',
  Disconnected: 'disconected',
  Pending: 'pending',
};

const noteToString = number => {
  const octave = Math.floor(number / notes.length);
  const note = number % notes.length;
  return `${notes[note]}${octave}`;
};

const noteToMidi = str => {
  const [_, note, octave] = (str || '').match(/(.{1,2})(\d{1})/) || [];
  return !note || !octave
    ? null
    : parseInt(octave) * notes.length +
        notes.findIndex(n => n === note.toUpperCase());
};

export { MidiPortState, MidiPortConnection, noteToMidi, noteToString };
