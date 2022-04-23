import React from 'react';

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

const PatternDisplay = ({ colorPalette, patterns }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (Array.isArray(patterns)) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (let i = 0; i < patterns.length; i++) {
        const { active, steps } = patterns[i];
        if (Array.isArray(steps)) {
          drawCircle(
            ctx,
            baseRadius - i * circlePadding,
            active ? colorPalette[i] : inactiveColor
          );
        }
      }
    }
  }, [colorPalette, patterns]);

  return <canvas height={canvasHeight} width={canvasWidth} ref={canvasRef} />;
};

export default PatternDisplay;
