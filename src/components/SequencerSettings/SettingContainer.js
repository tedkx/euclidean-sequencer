import React from 'react';

const SettingContainer = ({
  active,
  children,
  className,
  color,
  onClick,
  rounded,
}) => {
  const containerClassName = `sequence-setting ${rounded ? 'rounded' : ''} ${
    active ? 'active' : ''
  } ${className || ''}`;

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

export default SettingContainer;
