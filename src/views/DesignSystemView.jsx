import React, { useState } from 'react';
import {
  Button
} from '../components/ui/Button';
import {
  Input,
  Select,
  SearchInput,
  ToggleSwitch,
  Checkbox
} from '../components/ui/Input';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  StatCard
} from '../components/ui/Card';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination
} from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { Tabs } from '../components/ui/Tabs';
import { Modal } from '../components/ui/Modal';
import {
  Plus,
  Send,
  Trash2,
  Filter,
  Download,
  Activity,
  Users,
  Calendar,
  HeartPulse,
  Mail,
  UserCheck,
  Building,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const DesignSystemView = () => {
  const [activeDesignTab, setActiveDesignTab] = useState('components');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [toggleState, setToggleState] = useState(true);
  const [checkState, setCheckState] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(true);

  const simulateLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  const samplePatients = [
    { id: 'PAT-8092', name: 'Eleanor Vance', age: 34, gender: 'Female', condition: 'Acute Appendicitis', room: 'ICU-B04', status: 'Emergency', badge: 'danger' },
    { id: 'PAT-8093', name: 'Marcus Brody', age: 58, gender: 'Male', condition: 'Post-Op Cardiac Monitoring', room: '302-A', status: 'Admitted', badge: 'success' },
    { id: 'PAT-8094', name: 'Sophia Chen', age: 29, gender: 'Female', condition: 'Routine Maternal Scan', room: 'Outpatient', status: 'Scheduled', badge: 'info' },
    { id: 'PAT-8095', name: 'James Thorne', age: 46, gender: 'Male', condition: 'Severe Asthma Exacerbation', room: '204-B', status: 'Pending Lab', badge: 'warning' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Design System Category Navigation Tabs */}
      <Card>
        <CardBody style={{ padding: '0.75rem 1.25rem' }}>
          <Tabs
            activeTab={activeDesignTab}
            onChange={setActiveDesignTab}
            tabs={[
              { id: 'components', label: 'UI Component Matrix', icon: Sliders, badge: '8 Categories' },
              { id: 'typography', label: 'Typography & Colors', icon: Activity },
              { id: 'tables', label: 'Data Tables & Lists', icon: Users, badge: 'Interactive' },
            ]}
          />
        </CardBody>
      </Card>

      {/* Category 1: Component Matrix */}
      {activeDesignTab === 'components' && (
        <>
          {/* Alert Banners Demo */}
          {showAlert && (
            <Alert
              variant="info"
              title="Design System Active"
              onClose={() => setShowAlert(false)}
            >
              This live design system showcase demonstrates all modular UI components built using custom CSS design tokens (soft medical teal, clinical cyan, clean ice slate, and deep slate typography).
            </Alert>
          )}

          {/* 1. BUTTON MATRIX */}
          <Card>
            <CardHeader
              title="1. Button Matrix"
              subtitle="Primary, secondary, outline, ghost, danger buttons with sizes and loading states"
            />
            <CardBody className="flex flex-col gap-6">
              <div>
                <h4 className="text-xs font-bold text-muted uppercase" style={{ marginBottom: '0.75rem' }}>Variants</h4>
                <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
                  <Button variant="primary" icon={Plus}>Primary Button</Button>
                  <Button variant="secondary" icon={Download}>Secondary Button</Button>
                  <Button variant="outline" icon={Filter}>Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger" icon={Trash2}>Danger Button</Button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-muted uppercase" style={{ marginBottom: '0.75rem' }}>Sizes & Interactive States</h4>
                <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
                  <Button variant="primary" size="sm">Small (sm)</Button>
                  <Button variant="primary" size="md">Medium (md)</Button>
                  <Button variant="primary" size="lg">Large (lg)</Button>
                  <Button variant="primary" isLoading={btnLoading} onClick={simulateLoading} icon={Send}>
                    {btnLoading ? 'Processing...' : 'Click to Load'}
                  </Button>
                  <Button variant="outline" disabled>Disabled State</Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* 2. FORM CONTROLS */}
          <Card>
            <CardHeader
              title="2. Form Controls & Inputs"
              subtitle="Clean input fields, selects, toggle switches, and custom checkboxes"
            />
            <CardBody className="grid grid-cols-2 gap-6">
              <Input
                label="Patient Full Name"
                placeholder="e.g. Dr. Alexander Fleming"
                icon={UserCheck}
                helperText="Enter official identification name"
              />

              <Input
                label="Doctor Email Address"
                placeholder="doctor@medipulse.org"
                icon={Mail}
                error="Please enter a valid hospital domain email"
              />

              <Select
                label="Department Category"
                icon={Building}
                options={[
                  { value: 'cardiology', label: 'Cardiology & Vascular Services' },
                  { value: 'neurology', label: 'Neurology & Brain Sciences' },
                  { value: 'emergency', label: 'Emergency & Trauma Unit' },
                  { value: 'pediatrics', label: 'Pediatrics & Child Health' }
                ]}
              />

              <div className="flex flex-col gap-3">
                <span className="form-label">Toggles & Checkboxes</span>
                <div className="flex items-center gap-6" style={{ marginTop: '0.5rem' }}>
                  <ToggleSwitch
                    label="Enable SMS Alerts"
                    checked={toggleState}
                    onChange={(e) => setToggleState(e.target.checked)}
                  />
                  <Checkbox
                    label="Emergency Escalation"
                    checked={checkState}
                    onChange={(e) => setCheckState(e.target.checked)}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* 3. BADGES & MODAL TRIGGER */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader title="3. Status Badges & Pills" subtitle="Contextual medical state badges" />
              <CardBody className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
                <Badge variant="teal">Medical Teal</Badge>
                <Badge variant="success">Admitted (Active)</Badge>
                <Badge variant="warning">Pending Lab Review</Badge>
                <Badge variant="danger">Emergency ICU</Badge>
                <Badge variant="info">Scheduled Scan</Badge>
                <Badge variant="neutral">Discharged</Badge>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="4. Glassmorphism Dialog Modal" subtitle="Test modal dialog with backdrop blur" />
              <CardBody className="flex items-center justify-between">
                <p className="text-sm text-muted">Click button to open the responsive accessible dialog modal.</p>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Launch Modal
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* 5. STAT METRIC CARDS */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>5. Stat KPI Metric Cards</h3>
            <div className="grid grid-cols-4 gap-6">
              <StatCard
                title="Total Admitted Patients"
                value="1,420"
                trend="+12.4%"
                icon={Users}
                iconTheme="teal"
              />
              <StatCard
                title="Emergency Cases (24h)"
                value="48"
                trend="+8.1%"
                icon={HeartPulse}
                iconTheme="danger"
              />
              <StatCard
                title="Available ICU Beds"
                value="14 / 60"
                trend="-3.2%"
                icon={Activity}
                iconTheme="warning"
              />
              <StatCard
                title="Appointments Today"
                value="218"
                trend="+15.0%"
                icon={Calendar}
                iconTheme="blue"
              />
            </div>
          </div>
        </>
      )}

      {/* Category 2: Typography & Colors */}
      {activeDesignTab === 'typography' && (
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Typography Scale (Plus Jakarta Sans)" />
            <CardBody className="flex flex-col gap-4">
              <div>
                <h1>Display H1 - 28px Bold</h1>
                <p className="text-xs text-muted">Used for main page header titles and hero numbers.</p>
              </div>
              <div>
                <h2>Section Title H2 - 21.6px SemiBold</h2>
                <p className="text-xs text-muted">Used for card titles and section headers.</p>
              </div>
              <div>
                <h3>Card Header H3 - 18px SemiBold</h3>
                <p className="text-xs text-muted">Used for widget headers and modal titles.</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Body Standard - 14px Regular / Medium</p>
                <p className="text-sm text-muted">Used for main body copy, form fields, and table rows.</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Medical-Tech Color Swatches" />
            <CardBody className="grid grid-cols-2 gap-4">
              <div style={{ background: 'var(--primary-600)', color: '#fff', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Primary Medical Teal</strong>
                <p className="text-xs">#0D9488 (hsl 173, 80%, 40%)</p>
              </div>
              <div style={{ background: 'var(--cyan-500)', color: '#fff', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Clinical Cyan Accent</strong>
                <p className="text-xs">#06B6D4 (hsl 187, 92%, 43%)</p>
              </div>
              <div style={{ background: 'var(--blue-600)', color: '#fff', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Trust Blue</strong>
                <p className="text-xs">#2563EB (hsl 217, 91%, 60%)</p>
              </div>
              <div style={{ background: 'var(--slate-900)', color: '#fff', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Deep Slate Dark Accent</strong>
                <p className="text-xs">#0F172A (hsl 222, 47%, 11%)</p>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Category 3: Data Tables */}
      {activeDesignTab === 'tables' && (
        <Card>
          <CardHeader
            title="Interactive Data Table Component"
            subtitle="Clean medical records table with responsive layout and status badges"
            action={<SearchInput placeholder="Filter records..." style={{ width: 240 }} />}
          />
          <Table>
            <TableHead
              columns={[
                { header: 'Patient ID' },
                { header: 'Patient Name' },
                { header: 'Age / Gender' },
                { header: 'Diagnosis / Unit' },
                { header: 'Room / Bed' },
                { header: 'Current Status' },
                { header: 'Actions', width: '120px' }
              ]}
            />
            <TableBody>
              {samplePatients.map((pt) => (
                <TableRow key={pt.id}>
                  <TableCell><span className="font-mono text-xs font-bold text-slate-700">{pt.id}</span></TableCell>
                  <TableCell>
                    <div className="font-semibold text-slate-900">{pt.name}</div>
                  </TableCell>
                  <TableCell><span className="text-sm text-muted">{pt.age} yrs • {pt.gender}</span></TableCell>
                  <TableCell><span className="font-medium text-slate-800">{pt.condition}</span></TableCell>
                  <TableCell><span className="text-sm font-semibold">{pt.room}</span></TableCell>
                  <TableCell>
                    <Badge variant={pt.badge}>{pt.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={4}
            totalItems={38}
            onPageChange={setCurrentPage}
          />
        </Card>
      )}

      {/* Sample Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Patient Admission Form (Design System Demo)"
        subtitle="Example modal layout built with design system components"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={CheckCircle2} onClick={() => setIsModalOpen(false)}>
              Confirm Admission
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Full Name" placeholder="e.g. John Doe" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Age" placeholder="42" type="number" />
            <Select
              label="Assigned Ward"
              options={[
                { value: 'icu', label: 'ICU Ward A' },
                { value: 'general', label: 'General Male Ward' },
                { value: 'maternity', label: 'Maternity Unit' }
              ]}
            />
          </div>
          <Alert variant="warning" title="Bed Capacity Note">
            ICU Ward A currently has 3 beds remaining.
          </Alert>
        </div>
      </Modal>
    </div>
  );
};
