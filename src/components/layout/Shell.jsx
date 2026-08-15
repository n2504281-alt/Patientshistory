import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ChevronRight, Home } from 'lucide-react';

export const Shell = ({
  children,
  activeTab,
  onSelectTab,
  pageTitle,
  pageSubtitle,
  actions,
  onOpenNewPatientModal,
  onOpenEmergencyModal,
  onOpenNotifications
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Workspace */}
      <div className="main-wrapper">
        {/* Top Header Bar */}
        <Topbar
          onOpenNewPatientModal={onOpenNewPatientModal}
          onOpenEmergencyModal={onOpenEmergencyModal}
          onOpenNotifications={onOpenNotifications}
        />

        {/* Viewport Area */}
        <main className="content-viewport animate-fade-in">
          {/* Breadcrumbs & Page Header */}
          <div className="flex items-center justify-between" style={{ marginBottom: '1.75rem' }}>
            <div>
              <div className="flex items-center gap-2 text-xs text-muted" style={{ marginBottom: '0.35rem' }}>
                <Home size={14} />
                <span>MediPulse HMS</span>
                <ChevronRight size={12} />
                <span className="font-semibold text-slate-700" style={{ textTransform: 'capitalize' }}>
                  {activeTab.replace('-', ' ')}
                </span>
              </div>
              <h1 style={{ color: 'var(--slate-900)' }}>{pageTitle}</h1>
              {pageSubtitle && <p className="text-sm text-muted" style={{ marginTop: '0.2rem' }}>{pageSubtitle}</p>}
            </div>

            {/* Optional Header Level Actions */}
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>

          {/* Child View */}
          {children}
        </main>
      </div>
    </div>
  );
};
