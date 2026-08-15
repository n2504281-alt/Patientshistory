/**
 * MediPulse HMS - Super Admin Dashboard Script
 * Handles Hospital Creation with Unique Hospital IDs, Local & PHP API Sync, and Admin Login Switcher
 */

// Global State
let hospitalsData = [
  {
    hospital_id: 'HOSP-8921',
    name: 'St. Jude Medical Center',
    slug: 'stjude.medipulse.org',
    city: 'New York, NY',
    admin_email: 'admin@stjude.org',
    admin_password: 'StJudeAdmin@8921',
    plan: 'Enterprise',
    beds: '450 Beds',
    status: 'Active'
  },
  {
    hospital_id: 'HOSP-4410',
    name: 'City Care Trauma Institute',
    slug: 'citycare.medipulse.org',
    city: 'Chicago, IL',
    admin_email: 'admin@citycare.org',
    admin_password: 'CityCarePass@4410',
    plan: 'Premium',
    beds: '280 Beds',
    status: 'Active'
  },
  {
    hospital_id: 'HOSP-3109',
    name: 'Metro Pediatrics Hospital',
    slug: 'metroped.medipulse.org',
    city: 'Los Angeles, CA',
    admin_email: 'admin@metroped.org',
    admin_password: 'MetroPass@3109',
    plan: 'Enterprise',
    beds: '320 Beds',
    status: 'Active'
  }
];

// Helper Generator Functions
function generateUniqueHospitalId() {
  return `HOSP-${Math.floor(1000 + Math.random() * 9000)}`;
}

function generateAdminPassword(id) {
  return `HospAdmin@${id.replace('HOSP-', '')}`;
}

// Render Summary Metrics
function renderMetrics() {
  const totalElem = document.getElementById('metric-total-hospitals');
  const activeElem = document.getElementById('metric-active-hospitals');
  const adminsElem = document.getElementById('metric-admin-accounts');

  if (totalElem) totalElem.textContent = hospitalsData.length;
  if (activeElem) activeElem.textContent = hospitalsData.filter(h => h.status === 'Active').length;
  if (adminsElem) adminsElem.textContent = hospitalsData.length;
}

// Render Hospitals Table
function renderHospitalsTable(filterTerm = '') {
  const tbody = document.getElementById('hospitals-table-body');
  if (!tbody) return;

  const filtered = hospitalsData.filter(h =>
    h.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    h.hospital_id.toLowerCase().includes(filterTerm.toLowerCase()) ||
    h.admin_email.toLowerCase().includes(filterTerm.toLowerCase())
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--slate-500); padding: 2rem;">No hospitals found matching "${filterTerm}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(h => `
    <tr>
      <td><span class="badge-id">${h.hospital_id}</span></td>
      <td>
        <div style="font-weight: 700; color: var(--slate-900);">${h.name}</div>
        <div style="font-size: 0.75rem; color: var(--slate-500);">${h.slug}</div>
      </td>
      <td>${h.city}</td>
      <td><strong style="color: var(--slate-800);">${h.admin_email}</strong></td>
      <td><code style="background: var(--slate-100); padding: 0.2rem 0.4rem; border-radius: 4px;">${h.admin_password}</code></td>
      <td><span class="badge-status">${h.status}</span></td>
      <td>
        <button class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;" onclick="loginAsHospitalAdmin('${h.hospital_id}')">
          Admin Login
        </button>
      </td>
    </tr>
  `).join('');
}

// Initialize New Hospital Form Modal
function openAddHospitalModal() {
  const newId = generateUniqueHospitalId();
  const idInput = document.getElementById('input-unique-id');
  const passInput = document.getElementById('input-admin-password');
  const modal = document.getElementById('modal-add-hospital');

  if (idInput) idInput.value = newId;
  if (passInput) passInput.value = generateAdminPassword(newId);
  if (modal) modal.classList.add('open');
}

function closeAddHospitalModal() {
  const modal = document.getElementById('modal-add-hospital');
  if (modal) modal.classList.remove('open');
}

function regenerateModalId() {
  const newId = generateUniqueHospitalId();
  document.getElementById('input-unique-id').value = newId;
  document.getElementById('input-admin-password').value = generateAdminPassword(newId);
}

// Submit New Hospital
function handleCreateHospitalSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('input-hospital-name').value;
  const uniqueId = document.getElementById('input-unique-id').value;
  const city = document.getElementById('input-city').value || 'Central Region';
  const beds = document.getElementById('input-beds').value || '200 Beds';
  const email = document.getElementById('input-admin-email').value || `admin@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.org`;
  const password = document.getElementById('input-admin-password').value;

  const newHospital = {
    hospital_id: uniqueId,
    name: name,
    slug: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.medipulse.org`,
    city: city,
    admin_email: email,
    admin_password: password,
    plan: 'Enterprise',
    beds: beds,
    status: 'Active'
  };

  hospitalsData.unshift(newHospital);
  renderMetrics();
  renderHospitalsTable();
  closeAddHospitalModal();

  // Reset form
  document.getElementById('form-add-hospital').reset();
  alert(`Hospital "${name}" successfully registered with Unique Hospital ID: ${uniqueId}!`);
}

// Switch Context to Hospital Admin
function loginAsHospitalAdmin(hospitalId) {
  const hospital = hospitalsData.find(h => h.hospital_id === hospitalId);
  if (!hospital) return;

  // Hide Super Admin view, Show Hospital Admin view
  document.getElementById('view-super-admin').style.display = 'none';
  document.getElementById('view-hospital-admin').style.display = 'block';

  // Fill Hospital Admin view fields
  document.getElementById('admin-hosp-name').textContent = hospital.name;
  document.getElementById('admin-hosp-id').textContent = hospital.hospital_id;
  document.getElementById('admin-hosp-slug').textContent = hospital.slug;
  document.getElementById('admin-hosp-city').textContent = hospital.city;
  document.getElementById('admin-hosp-email').textContent = hospital.admin_email;
  document.getElementById('admin-hosp-password').textContent = hospital.admin_password;
  document.getElementById('admin-hosp-beds').textContent = hospital.beds;
}

function logoutToSuperAdmin() {
  document.getElementById('view-hospital-admin').style.display = 'none';
  document.getElementById('view-super-admin').style.display = 'block';
}

// Fetch Initial Data from PHP REST API if available
async function fetchHospitalsFromAPI() {
  try {
    const response = await fetch('api/hospitals.php');
    if (response.ok) {
      const resData = await response.json();
      if (resData.status === 'success' && Array.isArray(resData.data) && resData.data.length > 0) {
        hospitalsData = resData.data;
        renderMetrics();
        renderHospitalsTable();
      }
    }
  } catch (err) {
    console.log('PHP API offline, running with local memory state.');
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderMetrics();
  renderHospitalsTable();

  // Search input listener
  const searchInput = document.getElementById('search-hospitals');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderHospitalsTable(e.target.value));
  }

  fetchHospitalsFromAPI();
});
