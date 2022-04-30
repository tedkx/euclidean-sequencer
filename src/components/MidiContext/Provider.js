import React from 'react';
import MidiContext from './index';

const preferredOutputName = 'MODX-1';

const defaultContextValue = {
  error: null,
  initialize: null,
  ready: false,
  selectedInput: null,
  selectedOutput: null,
  sysex: false,
};

const MidiContextProvider = ({ children }) => {
  const ref = React.useRef({
    midi: null,
    selectedInput: null,
  });

  const [contextValue, setContextValue] = React.useState(defaultContextValue);

  // Update ref when selected input changed
  React.useEffect(() => {
    if (contextValue?.selectedInput) {
      ref.current.selectedInput = contextValue.selectedInput;
      /// TODO: Change subscriptions accordingly
    }
  }, [contextValue?.selectedInput]);

  const initialize = React.useCallback(
    sysex => {
      setContextValue(defaultContextValue);
      return navigator
        .requestMIDIAccess({ sysex: sysex === true })
        .then(midi => {
          ref.current.midi = midi;

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

            // try to preserve previous outpu, if available
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
    [setContextValue]
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
