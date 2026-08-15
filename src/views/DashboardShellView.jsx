import React from 'react';
import { StatCard, Card, CardHeader, CardBody } from '../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Users,
  Activity,
  Calendar,
  HeartPulse,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  UserPlus
} from 'lucide-react';

export const DashboardShellView = ({ onNavigateToDesignSystem, onOpenNewPatientModal }) => {
  const recentAdmissions = [
    { id: 'ADM-901', name: 'Robert Vance', dept: 'Cardiology', bed: 'ICU-02', status: 'Critical', badge: 'danger', time: '12 mins ago' },
    { id: 'ADM-902', name: 'Emily Watson', dept: 'Orthopedics', bed: '304-B', status: 'Admitted', badge: 'success', time: '45 mins ago' },
    { id: 'ADM-903', name: 'David Miller', dept: 'Neurology', bed: '201-A', status: 'Under Observation', badge: 'warning', time: '2 hours ago' },
    { id: 'ADM-904', name: 'Sarah Jenkins', dept: 'Pediatrics', bed: 'OPD-04', status: 'Scheduled', badge: 'info', time: '3 hours ago' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Metric Overview */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Active Patients"
          value="1,420"
          trend="+12.4%"
          icon={Users}
          iconTheme="teal"
        />
        <StatCard
          title="Emergency Trauma Cases"
          value="38"
          trend="+5.2%"
          icon={HeartPulse}
          iconTheme="danger"
        />
        <StatCard
          title="ICU Occupancy Rate"
          value="88%"
          trend="+2.1%"
          icon={Activity}
          iconTheme="warning"
        />
        <StatCard
          title="Daily Consultations"
          value="240"
          trend="+14.8%"
          icon={Calendar}
          iconTheme="blue"
        />
      </div>

      {/* Main Grid: Recent Admissions & System Banner */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="grid-cols-2" style={{ gridColumn: 'span 2' }}>
          <CardHeader
            title="Recent Patient Admissions"
            subtitle="Real-time intake stream across all hospital wings"
            action={
              <Button variant="ghost" size="sm" iconRight={ArrowRight}>
                View All Stream
              </Button>
            }
          />
          <Table>
            <TableHead
              columns={[
                { header: 'Admission ID' },
                { header: 'Patient Name' },
                { header: 'Department' },
                { header: 'Bed Unit' },
                { header: 'Status' },
                { header: 'Intake Time' }
              ]}
            />
            <TableBody>
              {recentAdmissions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell><span className="font-mono text-xs font-bold text-slate-700">{item.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-slate-900">{item.name}</span></TableCell>
                  <TableCell><span className="text-sm text-muted">{item.dept}</span></TableCell>
                  <TableCell><span className="text-sm font-semibold">{item.bed}</span></TableCell>
                  <TableCell><Badge variant={item.badge}>{item.status}</Badge></TableCell>
                  <TableCell><span className="text-xs text-muted flex items-center gap-1"><Clock size={12} /> {item.time}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Quick Shell Actions Card */}
        <div className="flex flex-col gap-6">
          <Card style={{ background: 'linear-gradient(135deg, var(--slate-900), var(--slate-800))', color: '#ffffff' }}>
            <CardBody className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div style={{ padding: '0.625rem', background: 'rgba(13, 148, 136, 0.2)', borderRadius: 'var(--radius-md)', color: 'var(--primary-300)' }}>
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem' }}>Design System Shell</h3>
                  <p style={{ color: 'var(--slate-400)', fontSize: '0.8125rem' }}>Hospital Shell & UI Architecture</p>
                </div>
              </div>
              <p style={{ color: 'var(--slate-300)', fontSize: '0.875rem' }}>
                Explore the complete reusable component library, buttons, color tokens, tables, and modal triggers built for MediPulse.
              </p>
              <div className="flex items-center gap-3" style={{ marginTop: '0.5rem' }}>
                <Button variant="primary" icon={UserPlus} onClick={onOpenNewPatientModal}>
                  + Register Patient
                </Button>
                <Button variant="outline" style={{ color: '#ffffff', borderColor: 'var(--slate-600)' }} onClick={onNavigateToDesignSystem}>
                  Explore Design System
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
