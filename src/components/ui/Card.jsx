import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const Card = ({ children, className = '', hoverable = false, ...props }) => {
  return (
    <div className={`card ${hoverable ? 'card-hover' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`card-header ${className}`}>
      <div>
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardBody = ({ children, className = '' }) => {
  return <div className={`card-body ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return <div className={`card-footer ${className}`}>{children}</div>;
};

/**
 * Stat Metrics Card
 */
export const StatCard = ({
  title,
  value,
  trend,
  trendLabel = 'vs last month',
  icon: Icon,
  iconTheme = 'teal', // teal, blue, cyan, danger, warning
  className = ''
}) => {
  const isTrendUp = trend && trend.startsWith('+');

  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-card-top">
        <span className="stat-label">{title}</span>
        {Icon && (
          <div className={`stat-icon-wrapper stat-icon-${iconTheme}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="stat-value">{value}</div>
      {trend && (
        <div className="flex items-center gap-2">
          <span className={`stat-trend ${isTrendUp ? 'up' : 'down'}`}>
            {isTrendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </span>
          <span className="text-xs text-muted">{trendLabel}</span>
        </div>
      )}
    </div>
  );
};
