/* eslint-disable no-unused-vars */
import { notes, numOfChannels, noteOffStart, noteOnStart } from './constants';

const MidiMessages = {
  ...Array.from(Array(numOfChannels)).reduce((obj, _, idx) => {
    obj[`Channel${idx + 1}NoteOff`] = noteOffStart + idx;
    obj[`Channel${idx + 1}NoteOn`] = noteOnStart + idx;
    return obj;
  }, {}),
};

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

const playerDefaults = {
  channels: Array.from(Array(numOfChannels)).map((_, idx) => idx + 1),
  sustain: 150,
};

const playNote = (output, { note, velocity, timestamp }, sequence) => {
  const channels = sequence.midiChannels || playerDefaults.channels;

  channels.forEach(channel => {
    output.send(
      [MidiMessages[`Channel${channel}NoteOn`], note, velocity],
      timestamp
    );

    output.send(
      [MidiMessages[`Channel${channel}NoteOn`], note, 0],
      timestamp + playerDefaults.sustain
    );
  });
};

export {
  MidiPortState,
  MidiPortConnection,
  noteToMidi,
  noteToString,
  playNote,
};
