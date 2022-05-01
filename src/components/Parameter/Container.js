import React from 'react';
import './Parameter.less';

const ParameterContainer = ({
  active,
  children,
  className,
  color,
  inline,
  onClick,
  rounded,
}) => {
  const containerClassName = `sequence-parameter ${rounded ? 'rounded' : ''} ${
    active ? 'active' : ''
  } ${inline ? 'inline' : ''} ${className || ''}`;

  return (
    <div
      className={containerClassName}
      onClick={onClick}
      style={{ borderColor: color, color }}
    >
      <div className="bg" style={{ backgroundColor: color }}></div>
      {children}
    </div>
  );
};

export default ParameterContainer;
