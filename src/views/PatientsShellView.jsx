import React from 'react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, SearchInput } from '../components/ui/Input';
import { Table, TableHead, TableBody, TableRow, TableCell, Pagination } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Plus, Filter, Download, UserCheck } from 'lucide-react';

export const PatientsShellView = ({ onOpenNewPatientModal }) => {
  const patientData = [
    { id: 'PAT-1001', name: 'Eleanor Vance', age: 34, gender: 'Female', blood: 'O+', phone: '+1 (555) 234-5678', status: 'Admitted', badge: 'success' },
    { id: 'PAT-1002', name: 'Marcus Brody', age: 58, gender: 'Male', blood: 'A+', phone: '+1 (555) 876-5432', status: 'Emergency ICU', badge: 'danger' },
    { id: 'PAT-1003', name: 'Sophia Chen', age: 29, gender: 'Female', blood: 'B-', phone: '+1 (555) 345-6789', status: 'Scheduled Scan', badge: 'info' },
    { id: 'PAT-1004', name: 'James Thorne', age: 46, gender: 'Male', blood: 'AB+', phone: '+1 (555) 901-2345', status: 'Pending Lab', badge: 'warning' },
    { id: 'PAT-1005', name: 'Olivia Martinez', age: 22, gender: 'Female', blood: 'O-', phone: '+1 (555) 678-9012', status: 'Discharged', badge: 'neutral' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader
          title="Patients Directory Shell"
          subtitle="Search, filter, and manage medical patient records"
          action={
            <div className="flex items-center gap-3">
              <Button variant="outline" icon={Filter} size="sm">Filter</Button>
              <Button variant="outline" icon={Download} size="sm">Export CSV</Button>
              <Button variant="primary" icon={Plus} size="sm" onClick={onOpenNewPatientModal}>Add Patient</Button>
            </div>
          }
        />
        <CardBody style={{ borderBottom: '1px solid var(--border-subtle)', padding: '1rem 1.5rem' }}>
          <div className="grid grid-cols-3 gap-4">
            <SearchInput placeholder="Search patient name, ID, or phone..." />
            <Input type="date" label="" placeholder="Filter by date" />
            <Button variant="secondary" size="md">Apply Search</Button>
          </div>
        </CardBody>
        <Table>
          <TableHead
            columns={[
              { header: 'Patient ID' },
              { header: 'Patient Name' },
              { header: 'Age / Gender' },
              { header: 'Blood Group' },
              { header: 'Contact Phone' },
              { header: 'Current Status' },
              { header: 'Actions' }
            ]}
          />
          <TableBody>
            {patientData.map((pt) => (
              <TableRow key={pt.id}>
                <TableCell><span className="font-mono text-xs font-bold text-slate-700">{pt.id}</span></TableCell>
                <TableCell><span className="font-semibold text-slate-900">{pt.name}</span></TableCell>
                <TableCell><span className="text-sm text-muted">{pt.age} yrs • {pt.gender}</span></TableCell>
                <TableCell><span className="font-semibold text-teal-700" style={{ color: 'var(--primary-700)' }}>{pt.blood}</span></TableCell>
                <TableCell><span className="text-sm text-slate-700">{pt.phone}</span></TableCell>
                <TableCell><Badge variant={pt.badge}>{pt.status}</Badge></TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Manage Record</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination currentPage={1} totalPages={14} totalItems={142} />
      </Card>
    </div>
  );
};
