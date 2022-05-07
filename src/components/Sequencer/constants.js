const totalSequences = 10;

const defaultSequences = Array.from(Array(totalSequences)).map(() => ({
  active: false,
  offset: 0,
  steps: Array.from(Array(16)).map((_, i) => ({ hit: false })),
}));

export { defaultSequences };
