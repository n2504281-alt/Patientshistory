import React from 'react';

/**
 * Status Badge Component
 * Variants: teal, success, warning, danger, info, neutral
 */
export const Badge = ({
  children,
  variant = 'teal',
  hasDot = true,
  className = '',
  ...props
}) => {
  const dotColorClass =
    variant === 'success' ? 'success' :
    variant === 'danger' ? 'danger' :
    variant === 'warning' ? 'warning' : 'teal';

  return (
    <span className={`badge badge-${variant} ${className}`} {...props}>
      {hasDot && <span className={`pulse-dot ${dotColorClass}`} />}
      {children}
    </span>
  );
};
