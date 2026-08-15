import React from 'react';
import {
  Bell,
  Plus,
  Siren,
  Menu,
  Sparkles,
  Search
} from 'lucide-react';
import { Button } from '../ui/Button';

export const Topbar = ({
  onToggleMobileSidebar,
  onOpenNewPatientModal,
  onOpenEmergencyModal,
  onOpenNotifications,
  notificationCount = 3
}) => {
  return (
    <header className="topbar">
      {/* Left section: Mobile menu & Quick Search */}
      <div className="flex items-center gap-4">
        <button
          className="btn btn-ghost btn-sm md-hidden"
          onClick={onToggleMobileSidebar}
          style={{ display: 'none' }} // handles smaller screens via CSS if needed
        >
          <Menu size={20} />
        </button>

        {/* Global Search Input with Shortcut */}
        <div className="search-box">
          <span className="form-input-icon-prefix">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control has-prefix"
            placeholder="Search patient, record ID, doctor..."
            style={{ borderRadius: 'var(--radius-full)', backgroundColor: 'var(--slate-50)', paddingRight: '3.5rem' }}
          />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      {/* Right section: System Status, Notifications & Actions */}
      <div className="flex items-center gap-3">
        {/* System Health Badge */}
        <div
          className="flex items-center gap-2"
          style={{
            backgroundColor: 'var(--success-50)',
            border: '1px solid var(--success-100)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)'
          }}
        >
          <span className="pulse-dot success" />
          <span className="text-xs font-semibold text-slate-700">ICU & Emergency Sync Active</span>
        </div>

        {/* Emergency Trigger Button */}
        <Button
          variant="danger"
          size="sm"
          icon={Siren}
          onClick={onOpenEmergencyModal}
          style={{ backgroundColor: '#be123c' }}
        >
          Emergency Code
        </Button>

        {/* New Patient Quick Action Button */}
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onOpenNewPatientModal}
        >
          New Patient
        </Button>

        {/* Notifications Icon Button */}
        <div style={{ position: 'relative' }}>
          <Button
            variant="outline"
            size="icon-only"
            onClick={onOpenNotifications}
            aria-label="Notifications"
            style={{ borderRadius: '50%', width: 38, height: 38 }}
          >
            <Bell size={18} />
          </Button>

          {notificationCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                backgroundColor: 'var(--danger-500)',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 800,
                width: 18,
                height: 18,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff'
              }}
            >
              {notificationCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
