import React from 'react';

/**
 * Reusable Button Component
 * Supports variants: primary, secondary, outline, ghost, danger
 * Supports sizes: sm, md, lg
 * Supports loading state & icon slots
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'icon-only' ? 'btn-icon-only' : `btn-${size}`;

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : null}

      {children && <span>{children}</span>}

      {!isLoading && IconRight && (
        <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
    </button>
  );
};
