import React, { useState } from 'react';
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';

import { Shell } from './components/layout/Shell';
import { SuperAdminDashboardView } from './views/SuperAdminDashboardView';
import { HospitalAdminDashboardView } from './views/HospitalAdminDashboardView';
import { DesignSystemView } from './views/DesignSystemView';

import { Modal } from './components/ui/Modal';
import { Input, Select } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { Alert } from './components/ui/Alert';
import { CheckCircle2, Siren } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('super-admin');

  // Default selected hospital for Hospital Admin portal
  const [selectedHospital, setSelectedHospital] = useState({
    id: 'HOSP-8921',
    name: 'St. Jude Medical Center',
    slug: 'stjude.medipulse.org',
    city: 'New York, NY',
    adminEmail: 'admin@stjude.org',
    adminPassword: 'StJudeAdmin@8921',
    plan: 'Enterprise',
    beds: '450 Beds',
    licenseKey: 'MP-8921-X9K2',
    status: 'Active'
  });

  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Dynamic titles per view tab
  const pageMeta = {
    'super-admin': {
      title: 'Super Admin - Hospitals & Multi-Tenant Management',
      subtitle: 'Create new hospitals with auto-generated Unique IDs, setup hospital admin credentials, and monitor summary metrics'
    },
    'hospital-admin': {
      title: `Hospital Admin Dashboard (${selectedHospital ? selectedHospital.name : 'Hospital Portal'})`,
      subtitle: `Admin management portal for Unique Hospital ID: ${selectedHospital ? selectedHospital.id : 'HOSP-8921'}`
    },
    'design-system': {
      title: 'MediPulse Reusable UI Design System Kit',
      subtitle: 'Standardized UI design tokens, component matrix, typography, and interactive controls'
    }
  };

  const currentMeta = pageMeta[activeTab] || pageMeta['super-admin'];

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
      {activeTab === 'super-admin' && (
        <SuperAdminDashboardView
          onSelectHospitalAdminLogin={(hosp) => {
            setSelectedHospital(hosp);
            setActiveTab('hospital-admin');
          }}
        />
      )}

      {activeTab === 'hospital-admin' && (
        <HospitalAdminDashboardView
          hospital={selectedHospital}
          onLogoutToSuperAdmin={() => setActiveTab('super-admin')}
        />
      )}

      {activeTab === 'design-system' && <DesignSystemView />}

      {/* Global Quick Action: New Patient Modal */}
      <Modal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
        title="Quick Patient Registration"
        subtitle="Enter patient intake details"
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
            Triggering this protocol will notify all on-duty trauma physicians.
          </Alert>
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
          <Alert variant="success" title="New Hospital Registered (Just Now)">
            Hospital instance created with Unique ID: HOSP-8921.
          </Alert>
          <Alert variant="info" title="Telemetry Sync">
            Central multi-tenant database active.
          </Alert>
        </div>
      </Modal>
    </Shell>
  );
}
