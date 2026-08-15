import React from 'react';
import {
  Activity,
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Building2,
  Palette,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export const Sidebar = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse
}) => {
  const navItems = [
    { id: 'super-admin', label: 'Super Admin (Hospitals)', icon: Building2, highlight: true },
    { id: 'hospital-admin', label: 'Hospital Admin Portal', icon: ShieldCheck },
    { id: 'design-system', label: 'Design System Kit', icon: Palette }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <a href="#home" className="brand-logo" onClick={(e) => { e.preventDefault(); onSelectTab('dashboard'); }}>
          <div className="brand-icon">
            <Activity size={22} />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="brand-title">MediPulse</h2>
              <span className="brand-subtitle">Health System v2.4</span>
            </div>
          )}
        </a>
        <button
          className="btn btn-ghost btn-sm"
          onClick={onToggleCollapse}
          style={{ color: 'var(--slate-400)', padding: '0.35rem' }}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {!isCollapsed && <div className="nav-section-title">Main Navigation</div>}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectTab(item.id);
              }}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} style={{ flexShrink: 0 }} />
              {!isCollapsed && (
                <div className="flex items-center justify-between" style={{ width: '100%' }}>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.45rem',
                        borderRadius: '99px',
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !item.badge && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--cyan-500)' }} />
                  )}
                </div>
              )}
            </a>
          );
        })}
      </nav>

      {/* Sidebar Footer User Info */}
      <div className="sidebar-footer">
        <div className="user-profile-badge">
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120"
              alt="Dr. Sarah Jenkins"
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: 'var(--success-500)',
                border: '2px solid var(--bg-sidebar)'
              }}
            />
          </div>

          {!isCollapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center gap-1">
                <h4 style={{ fontSize: '0.8125rem', color: '#ffffff', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  Dr. Sarah Jenkins
                </h4>
                <ShieldCheck size={14} style={{ color: 'var(--primary-400)', flexShrink: 0 }} />
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>Chief Medical Officer</p>
            </div>
          )}

          {!isCollapsed && (
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--slate-400)', padding: '0.25rem' }}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
