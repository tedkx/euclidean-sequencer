import React from 'react';

const SettingContainer = ({ children, className, color, dashed, rounded }) => {
  const containerClassName = `sequence-setting ${rounded ? 'rounded' : ''} ${
    dashed ? 'dashed' : ''
  } ${className || ''}`;

  return (
    <div className={containerClassName} style={{ borderColor: color }}>
      <div className="bg" style={{ backgroundColor: color }}></div>
      {children}
    </div>
  );
};

export default SettingContainer;
