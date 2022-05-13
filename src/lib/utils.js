const defaultOpts = {
  offset: 0,
  startWithPulse: true,
  stepFormatter: (pulse, opts) => ({
    pulse,
    velocity: pulse ? opts.velocity || defaultOpts.velocity : 0,
  }),
  velocity: 127,
};

const generateEuclideanSequence = (total, pulses, opts) => {
  const options = { ...defaultOpts, ...opts };
  const { offset, startWithPulse, stepFormatter } = options;
  const arr = Array.from(Array(total));

  let bucket = 0;

  for (let stepIdx = 0; stepIdx < total; stepIdx++) {
    bucket += pulses;
    if (bucket >= total) {
      arr[stepIdx] = stepFormatter(true, options);
      bucket -= total;
    } else {
      arr[stepIdx] = stepFormatter(false, options);
    }
  }

  // offset takes precedence over `startWithPulse`
  if (offset) {
    const offsetSlice = arr.splice(offset * -1, arr.length);
    return offsetSlice.concat(arr);
  }

  if (!startWithPulse) return arr;

  const slice = arr.splice(
    0,
    arr.findIndex(a => a > 0)
  );
  return arr.concat(slice);
};

export { generateEuclideanSequence };
