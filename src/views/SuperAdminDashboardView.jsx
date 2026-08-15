import React, { useState } from 'react';
import { Card, CardHeader, CardBody, StatCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select, SearchInput } from '../components/ui/Input';
import { Table, TableHead, TableBody, TableRow, TableCell, Pagination } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Alert } from '../components/ui/Alert';
import {
  Building2,
  Plus,
  Key,
  ShieldCheck,
  Globe,
  Users,
  Search,
  CheckCircle2,
  RefreshCw,
  Copy,
  ExternalLink,
  Activity,
  Lock,
  Mail,
  LogIn
} from 'lucide-react';

export const SuperAdminDashboardView = ({ onSelectHospitalAdminLogin }) => {
  const [hospitals, setHospitals] = useState([
    {
      id: 'HOSP-8921',
      name: 'St. Jude Medical Center',
      slug: 'stjude.medipulse.org',
      city: 'New York, NY',
      adminEmail: 'admin@stjude.org',
      adminPassword: 'StJudeAdmin@8921',
      plan: 'Enterprise',
      beds: '450 Beds',
      licenseKey: 'MP-8921-X9K2',
      status: 'Active',
      badge: 'success'
    },
    {
      id: 'HOSP-4410',
      name: 'City Care Trauma Institute',
      slug: 'citycare.medipulse.org',
      city: 'Chicago, IL',
      adminEmail: 'admin@citycare.org',
      adminPassword: 'CityCarePass@4410',
      plan: 'Premium',
      beds: '280 Beds',
      licenseKey: 'MP-4410-T4M1',
      status: 'Active',
      badge: 'success'
    },
    {
      id: 'HOSP-3109',
      name: 'Metro Pediatrics Hospital',
      slug: 'metroped.medipulse.org',
      city: 'Los Angeles, CA',
      adminEmail: 'admin@metroped.org',
      adminPassword: 'MetroPass@3109',
      plan: 'Enterprise',
      beds: '320 Beds',
      licenseKey: 'MP-3109-P8Q3',
      status: 'Active',
      badge: 'success'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  // Helper ID & Password Generators
  const generateUniqueId = () => `HOSP-${Math.floor(1000 + Math.random() * 9000)}`;
  const generatePassword = (id) => `HospAdmin@${id.replace('HOSP-', '')}`;

  const [formData, setFormData] = useState({
    hospitalName: '',
    uniqueId: generateUniqueId(),
    city: '',
    adminEmail: '',
    adminPassword: '',
    plan: 'Enterprise',
    beds: '200 Beds'
  });

  const handleOpenModal = () => {
    const newId = generateUniqueId();
    setFormData({
      hospitalName: '',
      uniqueId: newId,
      city: '',
      adminEmail: '',
      adminPassword: generatePassword(newId),
      plan: 'Enterprise',
      beds: '200 Beds'
    });
    setIsCreateModalOpen(true);
  };

  const handleRegenerateId = () => {
    const newId = generateUniqueId();
    setFormData((prev) => ({
      ...prev,
      uniqueId: newId,
      adminPassword: generatePassword(newId)
    }));
  };

  const handleCreateHospital = (e) => {
    e.preventDefault();
    if (!formData.hospitalName) return;

    const slug = `${formData.hospitalName.toLowerCase().replace(/[^a-z0-9]/g, '')}.medipulse.org`;
    const newHospital = {
      id: formData.uniqueId,
      name: formData.hospitalName,
      slug: slug,
      city: formData.city || 'Central Region',
      adminEmail: formData.adminEmail || `admin@${formData.hospitalName.toLowerCase().replace(/[^a-z0-9]/g, '')}.org`,
      adminPassword: formData.adminPassword,
      plan: formData.plan,
      beds: formData.beds,
      licenseKey: `MP-${formData.uniqueId.replace('HOSP-', '')}-KEY`,
      status: 'Active',
      badge: 'success'
    };

    setHospitals([newHospital, ...hospitals]);
    setIsCreateModalOpen(false);
    setAlertMsg(`Hospital "${newHospital.name}" created! Unique Hospital ID: ${newHospital.id}`);
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredHospitals = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Alert Notification */}
      {alertMsg && (
        <Alert variant="success" title="Hospital Registered Successfully" onClose={() => setAlertMsg(null)}>
          {alertMsg}
        </Alert>
      )}

      {/* Super Admin Summary KPI Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Registered Hospitals"
          value={hospitals.length.toString()}
          trend="+3 New"
          icon={Building2}
          iconTheme="teal"
        />
        <StatCard
          title="Active Tenant Instances"
          value={hospitals.filter((h) => h.status === 'Active').length.toString()}
          trend="100% Operational"
          icon={ShieldCheck}
          iconTheme="blue"
        />
        <StatCard
          title="Total Hospital Bed Capacity"
          value="1,050 Beds"
          trend="Multi-Tenant"
          icon={Activity}
          iconTheme="cyan"
        />
        <StatCard
          title="Hospital Admin Accounts"
          value={hospitals.length.toString()}
          trend="Assigned Logins"
          icon={Users}
          iconTheme="teal"
        />
      </div>

      {/* Hospital Management Table */}
      <Card>
        <CardHeader
          title="Super Admin - Multi-Tenant Hospitals Registry"
          subtitle="Add new hospitals, view auto-generated Unique IDs, and manage Hospital Admin credentials"
          action={
            <Button variant="primary" icon={Plus} onClick={handleOpenModal}>
              + Add New Hospital
            </Button>
          }
        />

        {/* Filter & Search */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }} className="flex items-center justify-between gap-4">
          <div style={{ flex: 1, maxWidth: 420 }}>
            <SearchInput
              placeholder="Search by Unique ID (e.g. HOSP-8921), Hospital Name, or Admin Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="text-xs font-semibold text-muted">
            Showing {filteredHospitals.length} Registered Hospitals
          </span>
        </div>

        {/* Hospitals Table */}
        <Table>
          <TableHead
            columns={[
              { header: 'Unique Hospital ID' },
              { header: 'Hospital Name & Subdomain' },
              { header: 'City / Location' },
              { header: 'Hospital Admin Email' },
              { header: 'Hospital Admin Password' },
              { header: 'Status' },
              { header: 'Action', width: '160px' }
            ]}
          />
          <TableBody>
            {filteredHospitals.map((hosp) => (
              <TableRow key={hosp.id}>
                <TableCell>
                  <span
                    className="font-mono text-xs font-bold"
                    style={{
                      padding: '0.25rem 0.55rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--primary-50)',
                      color: 'var(--primary-700)',
                      border: '1px solid var(--primary-200)'
                    }}
                  >
                    {hosp.id}
                  </span>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-semibold text-slate-900">{hosp.name}</div>
                    <div className="text-xs text-muted flex items-center gap-1">
                      <Globe size={12} /> {hosp.slug}
                    </div>
                  </div>
                </TableCell>
                <TableCell><span className="text-sm text-slate-700">{hosp.city}</span></TableCell>
                <TableCell>
                  <span className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                    <Mail size={13} style={{ color: 'var(--primary-600)' }} /> {hosp.adminEmail}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded">
                      {hosp.adminPassword}
                    </span>
                    <button
                      onClick={() => handleCopyKey(hosp.adminPassword)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: copiedKey === hosp.adminPassword ? 'var(--success-600)' : 'var(--slate-400)' }}
                      title="Copy Password"
                    >
                      {copiedKey === hosp.adminPassword ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </TableCell>
                <TableCell><Badge variant={hosp.badge}>{hosp.status}</Badge></TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={LogIn}
                    onClick={() => onSelectHospitalAdminLogin(hosp)}
                  >
                    Admin Login
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination currentPage={1} totalPages={1} totalItems={filteredHospitals.length} />
      </Card>

      {/* Modal: Add New Hospital with Unique ID & Admin Credentials */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="🏥 Add New Hospital (Super Admin)"
        subtitle="Provision a new hospital with an auto-generated Unique Hospital ID and Admin Credentials"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={CheckCircle2} onClick={handleCreateHospital}>
              Create Hospital & Admin Account
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateHospital} className="flex flex-col gap-4">
          {/* Unique ID Generator */}
          <div
            style={{
              padding: '0.875rem 1.25rem',
              backgroundColor: 'var(--primary-50)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--primary-200)'
            }}
            className="flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-muted uppercase">Auto-Generated Unique Hospital ID</span>
              <div className="font-mono text-lg font-bold text-teal-800" style={{ color: 'var(--primary-800)' }}>
                {formData.uniqueId}
              </div>
            </div>
            <Button variant="secondary" size="sm" icon={RefreshCw} onClick={handleRegenerateId} type="button">
              Regenerate ID
            </Button>
          </div>

          <Input
            label="Hospital Name"
            placeholder="e.g. St. Jude Hospital"
            value={formData.hospitalName}
            onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City / Location"
              placeholder="e.g. New York, NY"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <Input
              label="Hospital Bed Capacity"
              placeholder="e.g. 350 Beds"
              value={formData.beds}
              onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
            />
          </div>

          {/* Admin Credentials Setup */}
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
              <Lock size={14} /> Hospital Admin Login Credentials
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Admin Email"
                placeholder="admin@hospital.org"
                type="email"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
              />
              <Input
                label="Initial Admin Password"
                value={formData.adminPassword}
                onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
