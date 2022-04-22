import React from 'react';

const PatternDisplay = ({ patterns }) => {
  const canvasRef = React.useRef(null);

  return <canvas ref={canvasRef} />;
};

export default PatternDisplay;
