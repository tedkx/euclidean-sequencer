import React from 'react';
import { arrayOf, bool, number, shape } from 'prop-types';

const baseRadius = 120;
const circlePadding = 15;
const canvasWidth = 360;
const canvasHeight = 400;
const canvasCenter = { x: canvasWidth / 2, y: canvasHeight / 2 };
const inactiveColor = '#383838';

const drawCircle = (ctx, radius, strokeColor) => {
  ctx.moveTo(canvasCenter.x, canvasCenter.y);
  ctx.beginPath();
  ctx.arc(canvasCenter.x, canvasCenter.y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1;
  ctx.stroke();
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
          drawCircle(
            ctx,
            baseRadius - i * circlePadding,
            active ? colorPalette[i] : inactiveColor
          );
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
