const defaultSequences = [
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 2 === 0 })),
    offset: 0,
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 4) - 1 !== 0 })),
    offset: 0,
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 4 !== 0 })),
    offset: 0,
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 3) - 1 === 0 })),
    offset: 0,
  },
  {
    active: false,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: (i + 2) % 5 === 0 })),
    offset: 0,
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 2 === 0 })),
    offset: 0,
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 4) - 1 !== 0 })),
    offset: 0,
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: i % 4 !== 0 })),
    offset: 0,
  },
  {
    active: false,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: (i % 3) - 1 === 0 })),
    offset: 0,
  },
  {
    active: true,
    steps: Array.from(Array(16)).map((_, i) => ({ hit: (i + 2) % 5 === 0 })),
    offset: 0,
  },
];

export { defaultSequences };
