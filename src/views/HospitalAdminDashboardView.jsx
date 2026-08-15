import React from 'react';
import { Card, CardHeader, CardBody, StatCard } from '../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Building2,
  Users,
  Calendar,
  Activity,
  ShieldCheck,
  Key,
  LogOut,
  UserPlus,
  HeartPulse,
  Mail
} from 'lucide-react';

export const HospitalAdminDashboardView = ({ hospital, onLogoutToSuperAdmin }) => {
  if (!hospital) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Banner: Hospital Admin Header Info */}
      <Card style={{ background: 'linear-gradient(135deg, var(--slate-900), var(--slate-800))', color: '#ffffff' }}>
        <CardBody className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow-teal)'
              }}
            >
              <Building2 size={28} style={{ color: '#ffffff' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 style={{ color: '#ffffff', fontSize: '1.4rem' }}>{hospital.name}</h2>
                <span
                  className="font-mono text-xs font-bold"
                  style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(13, 148, 136, 0.3)',
                    color: 'var(--primary-300)',
                    border: '1px solid var(--primary-500)'
                  }}
                >
                  {hospital.id}
                </span>
              </div>
              <p style={{ color: 'var(--slate-400)', fontSize: '0.875rem' }}>
                Subdomain: <strong style={{ color: 'var(--cyan-500)' }}>{hospital.slug}</strong> • City: {hospital.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div style={{ textAlign: 'right', paddingRight: '1rem', borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="text-xs text-muted" style={{ color: 'var(--slate-400)' }}>Logged in as Hospital Admin</div>
              <div className="font-semibold text-sm flex items-center justify-end gap-1" style={{ color: '#ffffff' }}>
                <Mail size={14} style={{ color: 'var(--primary-400)' }} /> {hospital.adminEmail}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={onLogoutToSuperAdmin}
              style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              Switch to Super Admin
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Hospital Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Hospital Patients"
          value="1,240"
          trend="+8.5%"
          icon={Users}
          iconTheme="teal"
        />
        <StatCard
          title="Active Doctors & Nurses"
          value="84"
          trend="Fully Staffed"
          icon={ShieldCheck}
          iconTheme="blue"
        />
        <StatCard
          title="Available Bed Capacity"
          value={hospital.beds || '250 Beds'}
          trend="85% Occupied"
          icon={Activity}
          iconTheme="cyan"
        />
        <StatCard
          title="Emergency Trauma"
          value="12 Active"
          trend="Level 1 Protocol"
          icon={HeartPulse}
          iconTheme="danger"
        />
      </div>

      {/* Credentials & Access Info */}
      <Card>
        <CardHeader
          title="Hospital Security & Login Credentials"
          subtitle="Unique ID and Admin Access Details issued by Super Admin"
        />
        <CardBody className="grid grid-cols-3 gap-6">
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <span className="text-xs font-bold text-muted uppercase">Unique Hospital ID</span>
            <div className="font-mono text-base font-bold text-teal-800" style={{ color: 'var(--primary-700)' }}>
              {hospital.id}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <span className="text-xs font-bold text-muted uppercase">Admin Email Login</span>
            <div className="font-semibold text-sm text-slate-800">
              {hospital.adminEmail}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <span className="text-xs font-bold text-muted uppercase">Admin System Password / Key</span>
            <div className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1" style={{ marginTop: '0.2rem' }}>
              <Key size={14} style={{ color: 'var(--warning-600)' }} /> {hospital.adminPassword || hospital.licenseKey || 'Secured'}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
