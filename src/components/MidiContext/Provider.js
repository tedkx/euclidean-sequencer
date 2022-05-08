import React from 'react';
import MidiContext from './index';
import { debounce } from 'lodash';
import { MidiPortState } from 'lib/midi';

const preferredOutputName = 'MODX-1';

const connectionStateChangeDelayMillis = 25;

const defaultContextValue = {
  error: null,
  initialize: null,
  outputs: [],
  ready: false,
  selectedOutput: null,
  sysex: false,
};

const MidiContextProvider = ({ children }) => {
  const ref = React.useRef({
    midi: null,
    selectedOutput: null,
  });

  const [contextValue, setContextValue] = React.useState({
    ...defaultContextValue,
    onSetOutput: output =>
      setContextValue(ctx => ({ ...ctx, selectedOutput: output })),
  });

  // Update ref when selected input changed
  React.useEffect(() => {
    if (contextValue?.selectedOutput) {
      ref.current.selectedOutput = contextValue.selectedOutput;
      /// TODO: Change subscriptions accordingly
    }
  }, [contextValue?.selectedOutput]);

  // update outputs, check if selected output no longer available
  const handleConnectionStateChanged = React.useMemo(
    () =>
      debounce(() => {
        console.log('handling connection change');
        const outputs = Array.from(ref.current.midi.outputs.values()).filter(
          input => input.state === MidiPortState.Connected
        );
        setContextValue(ctx => {
          const selectedOutputGone = !outputs.some(
            output => output.name === ctx.selectedOutput?.name
          );

          return {
            ...ctx,
            outputs,
            selectedOutput: selectedOutputGone
              ? outputs[0]
              : ctx.selectedOutput,
          };
        });
      }, connectionStateChangeDelayMillis),
    []
  );

  const onConnectionStateChanged = React.useCallback(
    e => {
      console.log('connection state changed', e);
      handleConnectionStateChanged(e);
    },
    [handleConnectionStateChanged]
  );

  const initialize = React.useCallback(
    sysex => {
      setContextValue(defaultContextValue);
      return navigator
        .requestMIDIAccess({ sysex: sysex === true })
        .then(midi => {
          ref.current.midi = midi;

          midi.onstatechange = onConnectionStateChanged;

          setContextValue(ctx => {
            const outputs = Array.from(midi.outputs.values()).filter(
              o => o.state === 'connected'
            );

            const newContext = {
              ...ctx,
              outputs,
              ready: true,
              sysex: sysex === true,
            };

            // try to preserve previous output, if available
            newContext.selectedOutput =
              outputs.find(o => o.id === ctx.selectedOutput) ||
              outputs.find(o => o.name.indexOf(preferredOutputName) >= 0) ||
              outputs[0] ||
              null;

            return newContext;
          });
        })
        .catch(ex =>
          setContextValue({
            ...defaultContextValue,
            initialize,
            error: ex.message,
          })
        );
    },
    [setContextValue] // eslint-disable-line
  );

  React.useEffect(() => {
    initialize();
  }, []); // eslint-disable-line

  return (
    <>
      <MidiContext.Provider value={contextValue}>
        {children}
      </MidiContext.Provider>
    </>
  );
};

export default MidiContextProvider;
