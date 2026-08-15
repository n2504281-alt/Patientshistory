/**
 * MediPulse HMS - Super Admin Dashboard Control Center
 * Manages Stat Cards, Hospitals Table, Row Click Details Modal, and Suspend/Activate Toggles
 */

// Initial Platform State
let hospitalsData = [
  {
    hospital_id: 'HOSP-8921',
    name: 'St. Jude Medical Center',
    slug: 'stjude.medipulse.org',
    city: 'New York, NY',
    admin_name: 'Dr. Sarah Jenkins',
    admin_email: 'admin@stjude.org',
    admin_password: 'StJudeAdmin@8921',
    doctor_count: 48,
    patient_count: 1420,
    join_date: '2026-01-10',
    plan: 'Enterprise',
    beds: '450 Beds',
    status: 'Active'
  },
  {
    hospital_id: 'HOSP-4410',
    name: 'City Care Trauma Institute',
    slug: 'citycare.medipulse.org',
    city: 'Chicago, IL',
    admin_name: 'Dr. Marcus Brody',
    admin_email: 'admin@citycare.org',
    admin_password: 'CityCarePass@4410',
    doctor_count: 32,
    patient_count: 890,
    join_date: '2026-02-01',
    plan: 'Premium',
    beds: '280 Beds',
    status: 'Active'
  },
  {
    hospital_id: 'HOSP-3109',
    name: 'Metro Pediatrics Hospital',
    slug: 'metroped.medipulse.org',
    city: 'Los Angeles, CA',
    admin_name: 'Dr. Elena Rostova',
    admin_email: 'admin@metroped.org',
    admin_password: 'MetroPass@3109',
    doctor_count: 26,
    patient_count: 610,
    join_date: '2026-02-12',
    plan: 'Enterprise',
    beds: '320 Beds',
    status: 'Active'
  },
  {
    hospital_id: 'HOSP-7023',
    name: 'Apex Heart Clinic',
    slug: 'apexheart.medipulse.org',
    city: 'Houston, TX',
    admin_name: 'Dr. Arthur Pendelton',
    admin_email: 'admin@apexheart.org',
    admin_password: 'ApexPass@7023',
    doctor_count: 18,
    patient_count: 340,
    join_date: '2026-08-05',
    plan: 'Standard',
    beds: '120 Beds',
    status: 'Suspended'
  }
];

// Helper Generators
function generateUniqueHospitalId() {
  return `HOSP-${Math.floor(1000 + Math.random() * 9000)}`;
}

function generateAdminPassword(id) {
  return `HospAdmin@${id.replace('HOSP-', '')}`;
}

// Render Platform Stat Cards: Total Hospitals, Total Doctors, Total Patients, New Hospitals This Month
function renderStatCards() {
  const totalHospitalsElem = document.getElementById('stat-total-hospitals');
  const totalDoctorsElem = document.getElementById('stat-total-doctors');
  const totalPatientsElem = document.getElementById('stat-total-patients');
  const newHospitalsElem = document.getElementById('stat-new-hospitals');

  const totalHospitals = hospitalsData.length;
  const totalDoctors = hospitalsData.reduce((sum, h) => sum + (parseInt(h.doctor_count) || 0), 0);
  const totalPatients = hospitalsData.reduce((sum, h) => sum + (parseInt(h.patient_count) || 0), 0);
  
  // Calculate new hospitals created in current month (August 2026)
  const newThisMonth = hospitalsData.filter(h => h.join_date && h.join_date.startsWith('2026-08')).length;

  if (totalHospitalsElem) totalHospitalsElem.textContent = totalHospitals;
  if (totalDoctorsElem) totalDoctorsElem.textContent = totalDoctors.toLocaleString();
  if (totalPatientsElem) totalPatientsElem.textContent = totalPatients.toLocaleString();
  if (newHospitalsElem) newHospitalsElem.textContent = newThisMonth;
}

// Render Searchable Hospitals Table
function renderHospitalsTable(filterQuery = '') {
  const tbody = document.getElementById('hospitals-table-body');
  if (!tbody) return;

  const filtered = hospitalsData.filter(h =>
    h.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    h.city.toLowerCase().includes(filterQuery.toLowerCase()) ||
    h.admin_name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    h.hospital_id.toLowerCase().includes(filterQuery.toLowerCase())
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--slate-500); padding: 2rem;">No hospitals match "${filterQuery}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(h => {
    const isActive = h.status === 'Active';
    return `
      <tr style="cursor: pointer;" onclick="openHospitalDetailsModal('${h.hospital_id}', event)">
        <td>
          <div style="font-weight: 700; color: var(--slate-900); font-size: 0.95rem;">${h.name}</div>
          <div style="font-size: 0.75rem; color: var(--slate-500); font-family: monospace;">${h.hospital_id} • ${h.slug}</div>
        </td>
        <td><span style="color: var(--slate-700); font-weight: 500;">${h.city}</span></td>
        <td>
          <div style="font-weight: 600; color: var(--slate-800);">${h.admin_name}</div>
          <div style="font-size: 0.75rem; color: var(--slate-500);">${h.admin_email}</div>
        </td>
        <td>
          <span class="badge-status ${isActive ? 'active' : 'suspended'}">
            ${isActive ? '🟢 Active' : '🔴 Suspended'}
          </span>
        </td>
        <td onclick="event.stopPropagation()">
          <button 
            class="btn ${isActive ? 'btn-danger' : 'btn-primary'}" 
            style="padding: 0.35rem 0.75rem; font-size: 0.78rem;" 
            onclick="toggleHospitalStatus('${h.hospital_id}', event)"
          >
            ${isActive ? 'Suspend' : 'Activate'}
          </button>
          <button 
            class="btn btn-secondary" 
            style="padding: 0.35rem 0.65rem; font-size: 0.78rem; margin-left: 0.25rem;"
            onclick="loginAsHospitalAdmin('${h.hospital_id}')"
          >
            Login Portal
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Toggle Suspend / Activate Status
async function toggleHospitalStatus(hospitalId, event) {
  if (event) event.stopPropagation();

  const hospital = hospitalsData.find(h => h.hospital_id === hospitalId);
  if (!hospital) return;

  const newStatus = hospital.status === 'Active' ? 'Suspended' : 'Active';
  hospital.status = newStatus;

  renderStatCards();
  renderHospitalsTable(document.getElementById('search-hospitals')?.value || '');

  // Notify backend API
  try {
    await fetch('api/hospitals.php', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hospital_id: hospitalId, status: newStatus })
    });
  } catch (err) {
    console.log('Local status updated.');
  }
}

// Open Clickable Row Hospital Details Modal (showing doctor count, patient count, join date)
function openHospitalDetailsModal(hospitalId, event) {
  if (event) event.stopPropagation();

  const hospital = hospitalsData.find(h => h.hospital_id === hospitalId);
  if (!hospital) return;

  document.getElementById('detail-hosp-name').textContent = hospital.name;
  document.getElementById('detail-hosp-id').textContent = hospital.hospital_id;
  document.getElementById('detail-hosp-slug').textContent = hospital.slug;
  document.getElementById('detail-hosp-city').textContent = hospital.city;
  document.getElementById('detail-hosp-admin').textContent = hospital.admin_name;
  document.getElementById('detail-hosp-email').textContent = hospital.admin_email;
  document.getElementById('detail-hosp-doctors').textContent = hospital.doctor_count || 24;
  document.getElementById('detail-hosp-patients').textContent = (hospital.patient_count || 450).toLocaleString();
  document.getElementById('detail-hosp-joindate').textContent = hospital.join_date || '2026-01-15';
  
  const statusBadge = document.getElementById('detail-hosp-status');
  if (statusBadge) {
    statusBadge.textContent = hospital.status;
    statusBadge.className = `badge-status ${hospital.status === 'Active' ? 'active' : 'suspended'}`;
  }

  document.getElementById('modal-hospital-details').classList.add('open');
}

function closeHospitalDetailsModal() {
  document.getElementById('modal-hospital-details').classList.remove('open');
}

// Add New Hospital Modal Handlers
function openAddHospitalModal() {
  const newId = generateUniqueHospitalId();
  document.getElementById('input-unique-id').value = newId;
  document.getElementById('input-admin-password').value = generateAdminPassword(newId);
  document.getElementById('modal-add-hospital').classList.add('open');
}

function closeAddHospitalModal() {
  document.getElementById('modal-add-hospital').classList.remove('open');
}

function regenerateModalId() {
  const newId = generateUniqueHospitalId();
  document.getElementById('input-unique-id').value = newId;
  document.getElementById('input-admin-password').value = generateAdminPassword(newId);
}

// Handle Add Hospital Form Submission
async function handleCreateHospitalSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('input-hospital-name').value;
  const uniqueId = document.getElementById('input-unique-id').value;
  const city = document.getElementById('input-city').value || 'Central Region';
  const adminName = document.getElementById('input-admin-name').value || 'Dr. Hospital Director';
  const email = document.getElementById('input-admin-email').value || `admin@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.org`;
  const password = document.getElementById('input-admin-password').value;
  const doctors = document.getElementById('input-doctors').value || 20;
  const patients = document.getElementById('input-patients').value || 150;

  const todayStr = new Date().toISOString().split('T')[0];

  const newHospital = {
    hospital_id: uniqueId,
    name: name,
    slug: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.medipulse.org`,
    city: city,
    admin_name: adminName,
    admin_email: email,
    admin_password: password,
    doctor_count: parseInt(doctors),
    patient_count: parseInt(patients),
    join_date: todayStr,
    plan: 'Enterprise',
    beds: '200 Beds',
    status: 'Active'
  };

  hospitalsData.unshift(newHospital);
  renderStatCards();
  renderHospitalsTable();
  closeAddHospitalModal();

  document.getElementById('form-add-hospital').reset();

  // POST to PHP REST API
  try {
    await fetch('api/hospitals.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHospital)
    });
  } catch (err) {
    console.log('Hospital added locally.');
  }

  alert(`Hospital "${name}" successfully created with Unique ID: ${uniqueId}!`);
}

// Login Portal Handler (Enforces Suspend Protection)
function loginAsHospitalAdmin(hospitalId) {
  const hospital = hospitalsData.find(h => h.hospital_id === hospitalId);
  if (!hospital) return;

  if (hospital.status === 'Suspended') {
    alert(`⛔ ACCESS DENIED: Hospital "${hospital.name}" (${hospital.hospital_id}) is SUSPENDED. Users cannot log in until reactivated by Super Admin.`);
    return;
  }

  document.getElementById('view-super-admin').style.display = 'none';
  document.getElementById('view-hospital-admin').style.display = 'block';

  document.getElementById('admin-hosp-name').textContent = hospital.name;
  document.getElementById('admin-hosp-id').textContent = hospital.hospital_id;
  document.getElementById('admin-hosp-slug').textContent = hospital.slug;
  document.getElementById('admin-hosp-city').textContent = hospital.city;
  document.getElementById('admin-hosp-admin').textContent = hospital.admin_name;
  document.getElementById('admin-hosp-email').textContent = hospital.admin_email;
  document.getElementById('admin-hosp-password').textContent = hospital.admin_password;
  document.getElementById('admin-hosp-beds').textContent = hospital.beds || '200 Beds';
}

function logoutToSuperAdmin() {
  document.getElementById('view-hospital-admin').style.display = 'none';
  document.getElementById('view-super-admin').style.display = 'block';
}

// Fetch Initial Data from PHP API
async function fetchHospitalsFromAPI() {
  try {
    const response = await fetch('api/hospitals.php');
    if (response.ok) {
      const resData = await response.json();
      if (resData.status === 'success' && Array.isArray(resData.data) && resData.data.length > 0) {
        hospitalsData = resData.data;
        renderStatCards();
        renderHospitalsTable();
      }
    }
  } catch (err) {
    console.log('Running with local platform state.');
  }
}

// On DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderStatCards();
  renderHospitalsTable();

  const searchInput = document.getElementById('search-hospitals');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderHospitalsTable(e.target.value));
  }

  fetchHospitalsFromAPI();
});
