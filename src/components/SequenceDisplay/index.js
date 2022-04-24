import React from 'react';
import { arrayOf, bool, number, shape } from 'prop-types';
import { cardBackground } from 'assets/styles/colors';

const baseRadius = 120;
const circlePadding = 15;
const canvasWidth = 360;
const canvasHeight = 400;
const canvasCenter = { x: canvasWidth / 2, y: canvasHeight / 2 };
const inactiveColor = '#383838';
const lineWidth = 1;
const stepSize = 4;

const drawCircle = (ctx, radius, strokeColor) => {
  ctx.moveTo(canvasCenter.x, canvasCenter.y);
  ctx.beginPath();
  ctx.arc(canvasCenter.x, canvasCenter.y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};

const drawSequenceStep = (ctx, radius, angle, color, hit) => {
  var x = canvasCenter.x + radius * Math.cos((-angle * Math.PI) / 180);
  var y = canvasCenter.y + radius * Math.sin((-angle * Math.PI) / 180);

  ctx.moveTo(x, y);
  ctx.beginPath();
  ctx.arc(x, y, stepSize, 0, 2 * Math.PI);
  ctx.lineWidth = lineWidth;
  if (hit) {
    ctx.fillStyle = color;
  } else {
    ctx.fillStyle = cardBackground;
    ctx.strokeStyle = color;
  }
  ctx.stroke();
  ctx.fill();
};

const SequenceDisplay = ({ colorPalette, sequences }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (Array.isArray(sequences)) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (let i = 0; i < sequences.length; i++) {
        const { active, steps } = sequences[i];
        if (Array.isArray(steps)) {
          const radius = baseRadius - i * circlePadding;
          const color = active ? colorPalette[i] : inactiveColor;

          drawCircle(ctx, radius, active ? colorPalette[i] : color);

          const angleStep = 360 / steps.length;
          for (let si = 0; si < steps.length; si++) {
            const { hit } = steps[si];
            drawSequenceStep(ctx, radius, si * angleStep, color, hit);
          }
        }
      }
    }
  }, [colorPalette, sequences]);

  return <canvas height={canvasHeight} width={canvasWidth} ref={canvasRef} />;
};

SequenceDisplay.propTypes = {
  sequences: arrayOf(
    shape({
      active: bool,
      steps: {
        hit: bool,
        velocity: number,
      },
    })
  ),
};

export default SequenceDisplay;
