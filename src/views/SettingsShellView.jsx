import React from 'react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Input, Select, ToggleSwitch } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Shield, Bell, Lock, Database } from 'lucide-react';

export const SettingsShellView = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <CardHeader title="Hospital System Preferences" subtitle="General configuration settings" />
        <CardBody className="flex flex-col gap-4">
          <Input label="Hospital Facility Name" defaultValue="St. Jude MediPulse Medical Center" />
          <Select
            label="Timezone & Regional Locale"
            options={[
              { value: 'est', label: 'Eastern Standard Time (EST) UTC-5' },
              { value: 'pst', label: 'Pacific Standard Time (PST) UTC-8' },
              { value: 'gmt', label: 'Greenwich Mean Time (GMT) UTC+0' }
            ]}
          />
          <ToggleSwitch label="Auto-sync ICU telemetry monitors every 30s" checked={true} readOnly />
          <ToggleSwitch label="Enable Emergency Red Alert Push Notifications" checked={true} readOnly />
          <Button variant="primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
            Save Preferences
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Security & Compliance Shell" subtitle="HIPAA audit trails and access control" />
        <CardBody className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
            <Shield size={24} style={{ color: 'var(--primary-600)' }} />
            <div>
              <h4 className="text-sm font-semibold">HIPAA Level 4 Audit Encryption</h4>
              <p className="text-xs text-muted">All patient records encrypted using AES-256 at rest.</p>
            </div>
          </div>
          <Select
            label="Default Staff Role Permission Scope"
            options={[
              { value: 'cmo', label: 'Chief Officer (Full Read / Write / Delete)' },
              { value: 'physician', label: 'Attending Physician (Read / Write Patients)' },
              { value: 'nurse', label: 'Nursing Staff (Vitals & Observations)' }
            ]}
          />
          <Button variant="outline" icon={Lock} style={{ alignSelf: 'flex-start' }}>
            Configure Security Keys
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
