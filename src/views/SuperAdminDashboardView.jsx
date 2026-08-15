import React, { useState } from 'react';
import { Card, CardHeader, CardBody, StatCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select, SearchInput } from '../components/ui/Input';
import { Table as TableComp, TableHead as TH, TableBody as TB, TableRow as TR, TableCell as TC, Pagination as Pagi } from '../components/ui/Table';
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
  Sliders,
  ExternalLink,
  Activity
} from 'lucide-react';

export const SuperAdminDashboardView = () => {
  const [hospitals, setHospitals] = useState([
    {
      id: 'HOSP-8921',
      name: 'St. Jude Medical Center',
      slug: 'stjude.medipulse.org',
      city: 'New York, NY',
      adminEmail: 'director@stjude.org',
      plan: 'Enterprise',
      beds: '450 Beds',
      licenseKey: 'MP-8921-X9K2-9021',
      status: 'Active',
      badge: 'success'
    },
    {
      id: 'HOSP-4410',
      name: 'City Care Trauma Institute',
      slug: 'citycare.medipulse.org',
      city: 'Chicago, IL',
      adminEmail: 'admin@citycare.org',
      plan: 'Premium',
      beds: '280 Beds',
      licenseKey: 'MP-4410-T4M1-4410',
      status: 'Active',
      badge: 'success'
    },
    {
      id: 'HOSP-3109',
      name: 'Metro Pediatrics & Children Hospital',
      slug: 'metroped.medipulse.org',
      city: 'Los Angeles, CA',
      adminEmail: 'super@metroped.org',
      plan: 'Enterprise',
      beds: '320 Beds',
      licenseKey: 'MP-3109-P8Q3-3109',
      status: 'Active',
      badge: 'success'
    },
    {
      id: 'HOSP-7023',
      name: 'Apex Heart & Vascular Clinic',
      slug: 'apexheart.medipulse.org',
      city: 'Houston, TX',
      adminEmail: 'cmo@apexheart.org',
      plan: 'Standard',
      beds: '120 Beds',
      licenseKey: 'MP-7023-A2W9-7023',
      status: 'Provisioning',
      badge: 'warning'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  // Form State for New Hospital Creation
  const generateUniqueId = () => `HOSP-${Math.floor(1000 + Math.random() * 9000)}`;
  const generateLicenseKey = (id) => `MP-${id.replace('HOSP-', '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const [formData, setFormData] = useState({
    hospitalName: '',
    uniqueId: generateUniqueId(),
    city: '',
    adminEmail: '',
    plan: 'Enterprise',
    beds: '200 Beds',
    licenseKey: ''
  });

  const handleOpenModal = () => {
    const newId = generateUniqueId();
    setFormData({
      hospitalName: '',
      uniqueId: newId,
      city: '',
      adminEmail: '',
      plan: 'Enterprise',
      beds: '150 Beds',
      licenseKey: generateLicenseKey(newId)
    });
    setIsCreateModalOpen(true);
  };

  const handleRegenerateId = () => {
    const newId = generateUniqueId();
    setFormData((prev) => ({
      ...prev,
      uniqueId: newId,
      licenseKey: generateLicenseKey(newId)
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
      city: formData.city || 'Central City',
      adminEmail: formData.adminEmail || 'admin@hospital.org',
      plan: formData.plan,
      beds: formData.beds,
      licenseKey: formData.licenseKey,
      status: 'Active',
      badge: 'success'
    };

    setHospitals([newHospital, ...hospitals]);
    setIsCreateModalOpen(false);
    setAlertMsg(`Hospital "${newHospital.name}" successfully created with Unique ID: ${newHospital.id}!`);
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
      h.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Alert Banner */}
      {alertMsg && (
        <Alert variant="success" title="Hospital Instance Created" onClose={() => setAlertMsg(null)}>
          {alertMsg}
        </Alert>
      )}

      {/* Super Admin Top Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Registered Hospitals"
          value={hospitals.length.toString()}
          trend="+2 this month"
          icon={Building2}
          iconTheme="teal"
        />
        <StatCard
          title="Active System Licenses"
          value={hospitals.filter((h) => h.status === 'Active').length.toString()}
          trend="100% Operational"
          icon={ShieldCheck}
          iconTheme="blue"
        />
        <StatCard
          title="Global Patient Network"
          value="48,250"
          trend="+18.5%"
          icon={Users}
          iconTheme="cyan"
        />
        <StatCard
          title="Multi-Tenant System Status"
          value="Online"
          trend="99.99% Uptime"
          icon={Activity}
          iconTheme="teal"
        />
      </div>

      {/* Main Hospitals Table Card */}
      <CardComp>
        <CardHeaderComp
          title="Super Admin - Hospital Provisioning & Multi-Tenant Registry"
          subtitle="Create, configure, and issue unique ID keys for hospital instances"
          action={
            <Button variant="primary" icon={Plus} onClick={handleOpenModal}>
              + Create New Hospital
            </Button>
          }
        />

        {/* Filter & Search Bar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }} className="flex items-center justify-between gap-4">
          <div style={{ flex: 1, maxWidth: 400 }}>
            <SearchInput
              placeholder="Search by Hospital Name, Unique ID (e.g. HOSP-8921), or City..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="text-xs font-semibold text-muted">
            Showing {filteredHospitals.length} of {hospitals.length} Hospital Institutions
          </span>
        </div>

        {/* Table List */}
        <TableComp>
          <TH
            columns={[
              { header: 'Unique Hospital ID' },
              { header: 'Hospital Name & Subdomain' },
              { header: 'Location' },
              { header: 'Subscription Plan' },
              { header: 'Unique Access License Key' },
              { header: 'Status' },
              { header: 'Actions', width: '130px' }
            ]}
          />
          <TB>
            {filteredHospitals.map((hosp) => (
              <TR key={hosp.id}>
                <TC>
                  <span
                    className="font-mono text-xs font-bold"
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--primary-50)',
                      color: 'var(--primary-700)',
                      border: '1px solid var(--primary-200)'
                    }}
                  >
                    {hosp.id}
                  </span>
                </TC>
                <TC>
                  <div>
                    <div className="font-semibold text-slate-900">{hosp.name}</div>
                    <div className="text-xs text-muted flex items-center gap-1">
                      <Globe size={12} /> {hosp.slug}
                    </div>
                  </div>
                </TC>
                <TC><span className="text-sm text-slate-700">{hosp.city}</span></TC>
                <TC>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: hosp.plan === 'Enterprise' ? 'var(--blue-50)' : 'var(--slate-100)',
                      color: hosp.plan === 'Enterprise' ? 'var(--blue-600)' : 'var(--slate-700)'
                    }}
                  >
                    {hosp.plan}
                  </span>
                </TC>
                <TC>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded">
                      {hosp.licenseKey}
                    </span>
                    <button
                      onClick={() => handleCopyKey(hosp.licenseKey)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: copiedKey === hosp.licenseKey ? 'var(--success-600)' : 'var(--slate-400)' }}
                      title="Copy Key"
                    >
                      {copiedKey === hosp.licenseKey ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </TC>
                <TC><Badge variant={hosp.badge}>{hosp.status}</Badge></TC>
                <TC>
                  <Button variant="ghost" size="sm" icon={ExternalLink}>
                    Manage
                  </Button>
                </TC>
              </TR>
            ))}
          </TB>
        </TableComp>
        <Pagi currentPage={1} totalPages={1} totalItems={filteredHospitals.length} />
      </CardComp>

      {/* Modal Dialog: Create New Hospital with Unique ID */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="🏥 Create New Hospital Instance"
        subtitle="Provision a dedicated hospital tenant with an auto-generated Unique Hospital ID & Access Key"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={CheckCircle2} onClick={handleCreateHospital}>
              Provision & Register Hospital
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateHospital} className="flex flex-col gap-4">
          {/* Unique ID Generator Block */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--primary-50)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--primary-200)'
            }}
            className="flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-muted uppercase">Assigned Unique Hospital ID</span>
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
            placeholder="e.g. St. Luke International Hospital"
            value={formData.hospitalName}
            onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Facility Location / City"
              placeholder="e.g. San Francisco, CA"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <Input
              label="Director / Admin Email"
              placeholder="director@hospital.org"
              type="email"
              value={formData.adminEmail}
              onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Subscription Tier"
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              options={[
                { value: 'Enterprise', label: 'Enterprise (Unlimited Wards & Beds)' },
                { value: 'Premium', label: 'Premium (Up to 500 Beds)' },
                { value: 'Standard', label: 'Standard (Up to 150 Beds)' }
              ]}
            />
            <Input
              label="Bed Capacity"
              placeholder="e.g. 350 Beds"
              value={formData.beds}
              onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
            />
          </div>

          <Input
            label="Generated System Access Key"
            value={formData.licenseKey}
            readOnly
            icon={Key}
            helperText="Share this unique access token with the designated hospital administrator."
          />
        </form>
      </Modal>
    </div>
  );
};

// Aliases for Card to avoid naming conflict
const CardComp = Card;
const CardHeaderComp = CardHeader;
