import React from 'react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Table, TableHead, TableBody, TableRow, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Calendar, Clock, Plus, Video } from 'lucide-react';

export const AppointmentsShellView = () => {
  const appointments = [
    { id: 'APT-401', time: '09:00 AM', patient: 'Arthur Pendelton', doctor: 'Dr. Sarah Jenkins', dept: 'Cardiology', type: 'In-Person', status: 'Confirmed', badge: 'success' },
    { id: 'APT-402', time: '10:30 AM', patient: 'Clara Oswald', doctor: 'Dr. Gregory House', dept: 'Diagnostics', type: 'Telehealth', status: 'In-Progress', badge: 'warning' },
    { id: 'APT-403', time: '11:15 AM', patient: 'Bruce Wayne', doctor: 'Dr. Stephen Strange', dept: 'Neurology', type: 'In-Person', status: 'Scheduled', badge: 'info' },
    { id: 'APT-404', time: '02:00 PM', patient: 'Diana Prince', doctor: 'Dr. Sarah Jenkins', dept: 'Cardiology', type: 'Follow-Up', status: 'Pending', badge: 'neutral' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader
          title="Appointments & Consultations Shell"
          subtitle="Outpatient calendar schedule and consultation slots"
          action={<Button variant="primary" icon={Plus} size="sm">Book Appointment</Button>}
        />
        <Table>
          <TableHead
            columns={[
              { header: 'Appt ID' },
              { header: 'Scheduled Time' },
              { header: 'Patient Name' },
              { header: 'Attending Physician' },
              { header: 'Department' },
              { header: 'Visit Type' },
              { header: 'Status' }
            ]}
          />
          <TableBody>
            {appointments.map((apt) => (
              <TableRow key={apt.id}>
                <TableCell><span className="font-mono text-xs font-bold text-slate-700">{apt.id}</span></TableCell>
                <TableCell><span className="font-semibold text-slate-900 flex items-center gap-1"><Clock size={14} /> {apt.time}</span></TableCell>
                <TableCell><span className="font-semibold text-slate-800">{apt.patient}</span></TableCell>
                <TableCell><span className="text-sm text-slate-700">{apt.doctor}</span></TableCell>
                <TableCell><span className="text-sm text-muted">{apt.dept}</span></TableCell>
                <TableCell>
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded-full text-slate-700 flex items-center gap-1" style={{ display: 'inline-flex' }}>
                    {apt.type === 'Telehealth' && <Video size={12} />} {apt.type}
                  </span>
                </TableCell>
                <TableCell><Badge variant={apt.badge}>{apt.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
