import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const Alert = ({
  variant = 'info', // info, success, warning, danger
  title,
  children,
  onClose,
  className = ''
}) => {
  const Icon =
    variant === 'success' ? CheckCircle2 :
    variant === 'danger' ? AlertCircle :
    variant === 'warning' ? AlertTriangle : Info;

  return (
    <div className={`alert alert-${variant} ${className}`}>
      <Icon size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        {title && <h4 className="font-semibold" style={{ marginBottom: '0.25rem', color: 'inherit' }}>{title}</h4>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '0.25rem' }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
