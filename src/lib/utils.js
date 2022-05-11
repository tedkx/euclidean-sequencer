const defaultOpts = {
  startWithPulse: true,
  velocity: 127,
};

const generateEuclideanSequence = (total, pulses, opts) => {
  const { startWithPulse, velocity } = { ...defaultOpts, ...opts };
  const arr = Array.from(Array(total));

  let bucket = 0;

  for (let stepIdx = 0; stepIdx < total; stepIdx++) {
    bucket += pulses;
    if (bucket > total) {
      arr[stepIdx] = velocity;
      bucket -= total;
    } else {
      arr[stepIdx] = 0;
    }
  }

  if (!startWithPulse) return arr;

  const slice = arr.splice(
    0,
    arr.findIndex(item => item > 0)
  );
  return arr.concat(slice);
};

export { generateEuclideanSequence };
