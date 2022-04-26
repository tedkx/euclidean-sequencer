import React from 'react';

const SettingContainer = ({ active, children, className, color, rounded }) => {
  const containerClassName = `sequence-setting ${rounded ? 'rounded' : ''} ${
    active ? 'active' : ''
  } ${className || ''}`;

  return (
    <div className={containerClassName} style={{ borderColor: color, color }}>
      <div className="bg" style={{ backgroundColor: color }}></div>
      {children}
    </div>
  );
};

export default SettingContainer;
