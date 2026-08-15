import React from 'react';
import { Search } from 'lucide-react';

/**
 * Text Input Component
 */
export const Input = ({
  label,
  helperText,
  error,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <div className="form-input-wrapper">
        {Icon && (
          <span className="form-input-icon-prefix">
            <Icon size={16} />
          </span>
        )}
        <input
          id={inputId}
          type={type}
          className={`form-control ${Icon ? 'has-prefix' : ''} ${error ? 'is-invalid' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="form-error-text">{error}</span>}
      {!error && helperText && <span className="form-helper-text">{helperText}</span>}
    </div>
  );
};

/**
 * Select Dropdown Component
 */
export const Select = ({
  label,
  options = [],
  helperText,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && <label htmlFor={selectId} className="form-label">{label}</label>}
      <div className="form-input-wrapper">
        {Icon && (
          <span className="form-input-icon-prefix">
            <Icon size={16} />
          </span>
        )}
        <select
          id={selectId}
          className={`form-control ${Icon ? 'has-prefix' : ''} ${error ? 'is-invalid' : ''} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="form-error-text">{error}</span>}
      {!error && helperText && <span className="form-helper-text">{helperText}</span>}
    </div>
  );
};

/**
 * Search Bar Input
 */
export const SearchInput = ({ placeholder = 'Search patients, doctors, records...', value, onChange, ...props }) => {
  return (
    <div className="form-input-wrapper" style={{ width: '100%' }}>
      <span className="form-input-icon-prefix">
        <Search size={16} />
      </span>
      <input
        type="text"
        className="form-control has-prefix"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

/**
 * Toggle Switch Component
 */
export const ToggleSwitch = ({ label, checked, onChange, id, ...props }) => {
  const toggleId = id || `toggle-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <label htmlFor={toggleId} className="toggle-label">
      <input
        type="checkbox"
        id={toggleId}
        className="toggle-checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className="toggle-switch" />
      {label && <span className="form-label" style={{ marginBottom: 0 }}>{label}</span>}
    </label>
  );
};

/**
 * Custom Checkbox Component
 */
export const Checkbox = ({ label, checked, onChange, id, ...props }) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <label htmlFor={checkboxId} className="checkbox-label">
      <input
        type="checkbox"
        id={checkboxId}
        style={{ display: 'none' }}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <div className="custom-checkbox">
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};
