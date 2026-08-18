/**
 * MediCore OS - Super Admin Dashboard Control Center
 */

// Initial Seed Hospitals Data matching reference design
let hospitalsData = [
  {
    hospital_id: 'HOSP-1001',
    name: 'Al-Shifa General Hospital',
    slug: 'alshifa.medicore.os',
    city: 'Lahore',
    admin_name: 'Farhan Iqbal',
    admin_email: 'farhan@alshifa.org',
    admin_password: 'AlShifaPass@1001',
    doctor_count: 34,
    patient_count: 5210,
    join_date: '2026-01-15',
    beds: '450 Beds',
    status: 'Active'
  },
  {
    hospital_id: 'HOSP-1002',
    name: 'City Care Medical Complex',
    slug: 'citycare.medicore.os',
    city: 'Karachi',
    admin_name: 'Sana Malik',
    admin_email: 'sana@citycare.org',
    admin_password: 'CityCarePass@1002',
    doctor_count: 21,
    patient_count: 3110,
    join_date: '2026-02-01',
    beds: '320 Beds',
    status: 'Active'
  },
  {
    hospital_id: 'HOSP-1003',
    name: 'Green Valley Hospital',
    slug: 'greenvalley.medicore.os',
    city: 'Islamabad',
    admin_name: 'Bilal Ahmed',
    admin_email: 'bilal@greenvalley.org',
    admin_password: 'GreenValley@1003',
    doctor_count: 9,
    patient_count: 940,
    join_date: '2026-08-10',
    beds: '150 Beds',
    status: 'Trial'
  },
  {
    hospital_id: 'HOSP-1004',
    name: 'Al-Noor Clinic Network',
    slug: 'alnoor.medicore.os',
    city: 'Faisalabad',
    admin_name: 'Ayesha Raza',
    admin_email: 'ayesha@alnoor.org',
    admin_password: 'AlNoorPass@1004',
    doctor_count: 6,
    patient_count: 480,
    join_date: '2026-03-20',
    beds: '80 Beds',
    status: 'Suspended'
  },
  {
    hospital_id: 'HOSP-1005',
    name: "Sunrise Children's Hospital",
    slug: 'sunrise.medicore.os',
    city: 'Multan',
    admin_name: 'Usman Tariq',
    admin_email: 'usman@sunrise.org',
    admin_password: 'SunrisePass@1005',
    doctor_count: 14,
    patient_count: 2075,
    join_date: '2026-04-05',
    beds: '200 Beds',
    status: 'Active'
  },
  {
    hospital_id: 'HOSP-1006',
    name: 'Metro Care Hospital',
    slug: 'metrocare.medicore.os',
    city: 'Rawalpindi',
    admin_name: 'Dr. Tariq Shah',
    admin_email: 'tariq@metrocare.org',
    admin_password: 'MetroPass@1006',
    doctor_count: 10,
    patient_count: 1200,
    join_date: '2026-05-12',
    beds: '180 Beds',
    status: 'Active'
  },
  {
    hospital_id: 'HOSP-1007',
    name: 'Apex Heart Institute',
    slug: 'apexheart.medicore.os',
    city: 'Peshawar',
    admin_name: 'Dr. Zaid Khan',
    admin_email: 'zaid@apexheart.org',
    admin_password: 'ApexPass@1007',
    doctor_count: 6,
    patient_count: 435,
    join_date: '2026-08-02',
    beds: '100 Beds',
    status: 'Active'
  }
];

let currentFilterStatus = 'All';
let currentSearchQuery = '';

// Unique ID Generator
function generateUniqueHospitalId() {
  return `HOSP-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Render Header Platform Stat Cards
function renderStatCards() {
  const totalHospitalsElem = document.getElementById('stat-total-hospitals');
  const activeSubtextElem = document.getElementById('stat-active-subtext');
  const totalDoctorsElem = document.getElementById('stat-total-doctors');
  const totalPatientsElem = document.getElementById('stat-total-patients');
  const newHospitalsElem = document.getElementById('stat-new-hospitals');

  const totalCount = hospitalsData.length;
  const activeCount = hospitalsData.filter(h => h.status === 'Active').length;
  const totalDoctors = hospitalsData.reduce((sum, h) => sum + (parseInt(h.doctor_count) || 0), 0);
  const totalPatients = hospitalsData.reduce((sum, h) => sum + (parseInt(h.patient_count) || 0), 0);
  
  // Joined in current month (August 2026)
  const newThisMonth = hospitalsData.filter(h => h.join_date && h.join_date.includes('2026-08')).length;

  if (totalHospitalsElem) totalHospitalsElem.textContent = totalCount;
  if (activeSubtextElem) activeSubtextElem.textContent = `${activeCount} active now`;
  if (totalDoctorsElem) totalDoctorsElem.textContent = totalDoctors.toLocaleString();
  if (totalPatientsElem) totalPatientsElem.textContent = totalPatients.toLocaleString();
  if (newHospitalsElem) newHospitalsElem.textContent = newThisMonth;
}

// Render Filtered Hospitals Table
function renderHospitalsTable() {
  const tbody = document.getElementById('hospitals-table-body');
  if (!tbody) return;

  const filtered = hospitalsData.filter(h => {
    // Status Filter Tab
    const matchesStatus = (currentFilterStatus === 'All') || (h.status === currentFilterStatus);
    
    // Live Search Input
    const query = currentSearchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      h.name.toLowerCase().includes(query) ||
      h.city.toLowerCase().includes(query) ||
      h.admin_name.toLowerCase().includes(query) ||
      h.hospital_id.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--text-muted); padding: 2.5rem;">No hospitals found matching criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(h => {
    let statusClass = 'active';
    if (h.status === 'Trial') statusClass = 'trial';
    if (h.status === 'Suspended') statusClass = 'suspended';

    return `
      <tr onclick="openHospitalDetailsModal('${h.hospital_id}', event)">
        <td>
          <div class="hospital-name-bold">${h.name}</div>
          <div class="hospital-city-sub">${h.city}</div>
        </td>
        <td>
          <div class="admin-name-text">${h.admin_name}</div>
        </td>
        <td>
          <div class="count-number-cell">${h.doctor_count}</div>
        </td>
        <td>
          <div class="count-number-cell">${(h.patient_count || 0).toLocaleString()}</div>
        </td>
        <td>
          <span class="status-pill ${statusClass}">
            ${h.status}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// Tab Filter Change Handler
function filterByStatus(status, btnElement) {
  currentFilterStatus = status;

  if (btnElement) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }

  renderHospitalsTable();
}

// Suspend or Reactivate Hospital Status
async function toggleHospitalStatus(hospitalId, event) {
  if (event) event.stopPropagation();

  const hospital = hospitalsData.find(h => h.hospital_id === hospitalId);
  if (!hospital) return;

  const newStatus = hospital.status === 'Suspended' ? 'Active' : 'Suspended';
  hospital.status = newStatus;

  renderStatCards();
  renderHospitalsTable();

  if (document.getElementById('modal-hospital-details').classList.contains('open')) {
    openHospitalDetailsModal(hospitalId);
  }

  // Update backend API
  try {
    await fetch('api/hospitals.php', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hospital_id: hospitalId, status: newStatus })
    });
  } catch (err) {
    console.log('Status updated locally.');
  }
}

// Open Clicked Row Hospital Details Modal
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
  document.getElementById('detail-hosp-doctors').textContent = hospital.doctor_count;
  document.getElementById('detail-hosp-patients').textContent = (hospital.patient_count || 0).toLocaleString();
  document.getElementById('detail-hosp-joindate').textContent = hospital.join_date || '2026-01-15';
  
  const statusBadge = document.getElementById('detail-hosp-status');
  if (statusBadge) {
    statusBadge.textContent = hospital.status;
    let statusClass = 'active';
    if (hospital.status === 'Trial') statusClass = 'trial';
    if (hospital.status === 'Suspended') statusClass = 'suspended';
    statusBadge.className = `status-pill ${statusClass}`;
  }

  const actionsDiv = document.getElementById('modal-detail-actions');
  if (actionsDiv) {
    const isSuspended = hospital.status === 'Suspended';
    actionsDiv.innerHTML = `
      <button 
        class="${isSuspended ? 'btn-btn-success' : 'btn-btn-danger'}" 
        onclick="toggleHospitalStatus('${hospital.hospital_id}', event)"
      >
        ${isSuspended ? 'Activate Hospital' : 'Suspend Hospital'}
      </button>
      <button 
        class="btn-btn-outline" 
        style="margin-left: 0.5rem;"
        onclick="closeHospitalDetailsModal(); loginAsHospitalAdmin('${hospital.hospital_id}');"
      >
        Login Portal
      </button>
    `;
  }

  document.getElementById('modal-hospital-details').classList.add('open');
}

function closeHospitalDetailsModal() {
  document.getElementById('modal-hospital-details').classList.remove('open');
}

// Add New Hospital Modal Functions
function openAddHospitalModal() {
  const newId = generateUniqueHospitalId();
  document.getElementById('input-unique-id').value = newId;
  document.getElementById('modal-add-hospital').classList.add('open');
}

function closeAddHospitalModal() {
  document.getElementById('modal-add-hospital').classList.remove('open');
}

function regenerateModalId() {
  const newId = generateUniqueHospitalId();
  document.getElementById('input-unique-id').value = newId;
}

// Form Submission Handler
async function handleCreateHospitalSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('input-hospital-name').value;
  const uniqueId = document.getElementById('input-unique-id').value;
  const city = document.getElementById('input-city').value;
  const adminName = document.getElementById('input-admin-name').value;
  const doctors = parseInt(document.getElementById('input-doctors').value) || 20;
  const patients = parseInt(document.getElementById('input-patients').value) || 1000;
  const status = document.getElementById('input-status-plan').value || 'Active';

  const cleanSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.medicore.os';
  const cleanEmail = `admin@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.org`;
  const todayStr = new Date().toISOString().split('T')[0];

  const newHospital = {
    hospital_id: uniqueId,
    name: name,
    slug: cleanSlug,
    city: city,
    admin_name: adminName,
    admin_email: cleanEmail,
    admin_password: `Pass@${uniqueId.replace('HOSP-', '')}`,
    doctor_count: doctors,
    patient_count: patients,
    join_date: todayStr,
    beds: '250 Beds',
    status: status
  };

  hospitalsData.unshift(newHospital);
  renderStatCards();
  renderHospitalsTable();
  closeAddHospitalModal();

  document.getElementById('form-add-hospital').reset();

  // API Call
  try {
    await fetch('api/hospitals.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHospital)
    });
  } catch (err) {
    console.log('Added hospital locally.');
  }
}

// Hospital Admin Switching Portal
function loginAsHospitalAdmin(hospitalId) {
  const hospital = hospitalsData.find(h => h.hospital_id === hospitalId);
  if (!hospital) return;

  if (hospital.status === 'Suspended') {
    alert(`⛔ ACCESS DENIED: "${hospital.name}" is SUSPENDED. Reactivate hospital to access portal.`);
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
  document.getElementById('admin-hosp-patients-val').textContent = (hospital.patient_count || 0).toLocaleString();
  document.getElementById('admin-hosp-doctors-val').textContent = hospital.doctor_count;
  document.getElementById('admin-hosp-status-val').textContent = hospital.status;
}

function showDashboardView() {
  document.getElementById('view-hospital-admin').style.display = 'none';
  const hospView = document.getElementById('view-hospitals');
  if (hospView) hospView.style.display = 'none';
  document.getElementById('view-super-admin').style.display = 'block';

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const dashNav = document.getElementById('nav-item-dashboard');
  if (dashNav) dashNav.classList.add('active');

  closeMobileSidebar();
  initDashboardCharts();
}

function showHospitalsView() {
  document.getElementById('view-hospital-admin').style.display = 'none';
  document.getElementById('view-super-admin').style.display = 'none';
  const hospView = document.getElementById('view-hospitals');
  if (hospView) hospView.style.display = 'block';

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const hospNav = document.getElementById('nav-item-hospitals');
  if (hospNav) hospNav.classList.add('active');

  closeMobileSidebar();
}

// Chart.js Analytics & Growth Charts Controller (Exact Reference Image Match)
let growthChartInstance = null;
let patientVolumeChartInstance = null;
let planDistributionChartInstance = null;
let statusBreakdownChartInstance = null;

function initDashboardCharts() {
  if (typeof Chart === 'undefined') return;

  // 1. Hospital Growth Bar Chart
  const ctxGrowth = document.getElementById('chart-hospital-growth');
  if (ctxGrowth) {
    if (growthChartInstance) growthChartInstance.destroy();
    growthChartInstance = new Chart(ctxGrowth, {
      type: 'bar',
      data: {
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          data: [4, 3, 6, 5, 8, 7],
          backgroundColor: '#0d4e46',
          borderRadius: 4,
          barThickness: 26
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#8e9e9a', font: { family: 'Plus Jakarta Sans', size: 12 } } },
          y: { min: 0, max: 10, ticks: { stepSize: 2, color: '#8e9e9a', font: { family: 'Plus Jakarta Sans', size: 12 } }, grid: { color: '#f0f5f3' } }
        }
      }
    });
  }

  // 2. Patient Volume Line Chart
  const ctxVolume = document.getElementById('chart-patient-volume');
  if (ctxVolume) {
    if (patientVolumeChartInstance) patientVolumeChartInstance.destroy();
    patientVolumeChartInstance = new Chart(ctxVolume, {
      type: 'line',
      data: {
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          data: [6800, 8000, 9200, 10500, 12000, 13450],
          borderColor: '#10b981',
          borderWidth: 2.5,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4.5,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#8e9e9a', font: { family: 'Plus Jakarta Sans', size: 12 } } },
          y: { min: 0, max: 15000, ticks: { stepSize: 5000, color: '#8e9e9a', font: { family: 'Plus Jakarta Sans', size: 12 } }, grid: { color: '#f0f5f3' } }
        }
      }
    });
  }

  // 3. Plan Distribution Donut Chart
  const ctxPlan = document.getElementById('chart-plan-distribution');
  if (ctxPlan) {
    if (planDistributionChartInstance) planDistributionChartInstance.destroy();
    planDistributionChartInstance = new Chart(ctxPlan, {
      type: 'doughnut',
      data: {
        labels: ['Premium', 'Basic', 'Trial'],
        datasets: [{
          data: [4, 2, 1],
          backgroundColor: ['#0d4e46', '#14b8a6', '#a7f3d0'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { display: false } }
      }
    });
  }

  // 4. Status Breakdown Donut Chart
  const ctxStatus = document.getElementById('chart-status-breakdown');
  if (ctxStatus) {
    if (statusBreakdownChartInstance) statusBreakdownChartInstance.destroy();
    statusBreakdownChartInstance = new Chart(ctxStatus, {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Trial', 'Suspended'],
        datasets: [{
          data: [5, 1, 1],
          backgroundColor: ['#10b981', '#2563eb', '#ef4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { display: false } }
      }
    });
  }
}

// Mobile Sidebar Drawer Toggle Controller
function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar && overlay) {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
  }
}

// Fetch Initial Data from PHP API Backend
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
    console.log('Running with MediCore OS local state.');
  }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderStatCards();
  renderHospitalsTable();
  initDashboardCharts();

  const searchInput = document.getElementById('search-hospitals');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderHospitalsTable();
    });
  }

  // Close mobile sidebar on clicking nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      closeMobileSidebar();
    });
  });

  fetchHospitalsFromAPI();
});
