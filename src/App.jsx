import React, { useState } from 'react';
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';

import { Shell } from './components/layout/Shell';
import { DashboardShellView } from './views/DashboardShellView';
import { SuperAdminDashboardView } from './views/SuperAdminDashboardView';
import { DesignSystemView } from './views/DesignSystemView';
import { PatientsShellView } from './views/PatientsShellView';
import { AppointmentsShellView } from './views/AppointmentsShellView';
import { SettingsShellView } from './views/SettingsShellView';

import { Modal } from './components/ui/Modal';
import { Input, Select } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { Alert } from './components/ui/Alert';
import { CheckCircle2, Siren, Bell, ShieldCheck, HeartPulse } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('super-admin');
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Dynamic titles per view tab
  const pageMeta = {
    'super-admin': {
      title: 'Super Admin - Multi-Tenant Hospital Management',
      subtitle: 'Create, register, and provision dedicated hospital instances with auto-generated Unique IDs'
    },
    dashboard: {
      title: 'Hospital Operations Dashboard',
      subtitle: 'Real-time telemetry, emergency patient queue, and department activity'
    },
    patients: {
      title: 'Patients Directory & Records',
      subtitle: 'Comprehensive electronic health record database'
    },
    appointments: {
      title: 'Outpatient Appointments Schedule',
      subtitle: 'Manage daily physician consult slots and telehealth requests'
    },
    doctors: {
      title: 'Physicians & Staff Roster',
      subtitle: 'Attending doctors, duty shifts, and specialty units'
    },
    departments: {
      title: 'Hospital Department Wings',
      subtitle: 'ICU, Trauma Unit, Cardiology, Neurology, and Pediatrics overview'
    },
    'design-system': {
      title: 'MediPulse Reusable UI Design System Kit',
      subtitle: 'Standardized UI design tokens, component matrix, typography, and interactive controls'
    },
    settings: {
      title: 'System Preferences & Compliance',
      subtitle: 'HIPAA privacy controls, facility defaults, and audit permissions'
    }
  };

  const currentMeta = pageMeta[activeTab] || pageMeta.dashboard;

  return (
    <Shell
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      pageTitle={currentMeta.title}
      pageSubtitle={currentMeta.subtitle}
      onOpenNewPatientModal={() => setIsNewPatientModalOpen(true)}
      onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      onOpenNotifications={() => setIsNotificationsOpen(true)}
    >
      {/* Active View Controller */}
      {activeTab === 'super-admin' && <SuperAdminDashboardView />}

      {activeTab === 'dashboard' && (
        <DashboardShellView
          onNavigateToDesignSystem={() => setActiveTab('design-system')}
          onOpenNewPatientModal={() => setIsNewPatientModalOpen(true)}
        />
      )}

      {activeTab === 'design-system' && <DesignSystemView />}

      {activeTab === 'patients' && (
        <PatientsShellView onOpenNewPatientModal={() => setIsNewPatientModalOpen(true)} />
      )}

      {activeTab === 'appointments' && <AppointmentsShellView />}

      {(activeTab === 'doctors' || activeTab === 'departments') && (
        <div className="flex flex-col gap-6">
          <Alert variant="info" title={`${activeTab.toUpperCase()} Module Shell`}>
            This structural shell view is styled with the MediPulse design system tokens and ready for custom feature data integration.
          </Alert>
          <DesignSystemView />
        </div>
      )}

      {activeTab === 'settings' && <SettingsShellView />}

      {/* Global Quick Action: New Patient Modal */}
      <Modal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
        title="Quick Patient Registration Shell"
        subtitle="Enter new patient intake details"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsNewPatientModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              icon={CheckCircle2}
              onClick={() => setIsNewPatientModalOpen(false)}
            >
              Register & Assign Bed
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Full Name" placeholder="e.g. Eleanor Vance" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date of Birth" type="date" />
            <Select
              label="Biological Sex"
              options={[
                { value: 'female', label: 'Female' },
                { value: 'male', label: 'Male' },
                { value: 'other', label: 'Other' }
              ]}
            />
          </div>
          <Select
            label="Initial Triage Priority"
            options={[
              { value: 'routine', label: 'Level 4 - Routine Consult' },
              { value: 'urgent', label: 'Level 2 - Urgent Care' },
              { value: 'emergency', label: 'Level 1 - Emergency Trauma' }
            ]}
          />
        </div>
      </Modal>

      {/* Global Emergency Code Modal */}
      <Modal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        title="🚨 Emergency Code Protocol Trigger"
        subtitle="Immediate broadcast to Trauma Unit & ICU On-Call Specialists"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsEmergencyModalOpen(false)}>
              Dismiss Protocol
            </Button>
            <Button variant="danger" icon={Siren} onClick={() => setIsEmergencyModalOpen(false)}>
              Broadcast Red Alert
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Alert variant="danger" title="Level 1 Red Code Protocol">
            Triggering this protocol will notify all on-duty trauma physicians and lock down elevator shaft B.
          </Alert>
          <Select
            label="Select Emergency Type"
            options={[
              { value: 'cardiac', label: 'Code Blue - Cardiac Arrest in ICU' },
              { value: 'trauma', label: 'Code Red - Severe Multi-Trauma Intake' },
              { value: 'stroke', label: 'Code Stroke - Acute Neurological Deficit' }
            ]}
          />
          <Input label="Emergency Room Bay" defaultValue="Resuscitation Bay 01" />
        </div>
      </Modal>

      {/* Notifications Drawer Modal */}
      <Modal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        title="System Notifications & Alerts"
        subtitle="Recent high-priority notifications"
      >
        <div className="flex flex-col gap-3">
          <Alert variant="danger" title="ICU Bed Capacity Alert (10 mins ago)">
            ICU Wing B reaching 90% occupancy limit. 2 beds remaining.
          </Alert>
          <Alert variant="warning" title="Lab Results Ready (25 mins ago)">
            Stat blood work returned for Patient #PAT-8095 (James Thorne).
          </Alert>
          <Alert variant="success" title="Telemetry Sync (1 hour ago)">
            Cardiac monitors in Room 302-A resynced with central server.
          </Alert>
        </div>
      </Modal>
    </Shell>
  );
}
