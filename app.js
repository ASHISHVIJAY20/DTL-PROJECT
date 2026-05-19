// ============================================
// SCANIT - Core App State & Navigation
// ============================================

const App = {
  currentView: 'landing',
  currentRole: null,
  isLoggedIn: false,
  sidebarOpen: false
};

// ---- Navigation ----
function navigateTo(view) {
  App.currentView = view;
  document.getElementById('mobile-menu')?.classList.add('hidden');
  document.getElementById('role-dropdown')?.classList.add('hidden');
  renderView();
  window.scrollTo(0, 0);
}

function switchRole(role) {
  App.currentRole = role;
  App.isLoggedIn = true;
  document.getElementById('role-dropdown')?.classList.add('hidden');
  const firstView = {
    superadmin: 'sa-overview',
    institutionadmin: 'ia-command',
    faculty: 'f-workspace',
    student: 'st-dashboard'
  };
  navigateTo(firstView[role] || 'sa-overview');
}

function logout() {
  App.isLoggedIn = false;
  App.currentRole = null;
  navigateTo('landing');
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('dashboard-sidebar');
  const overlay = document.getElementById('mobile-overlay');
  App.sidebarOpen = !App.sidebarOpen;
  sidebar.classList.toggle('mobile-open', App.sidebarOpen);
  overlay.classList.toggle('hidden', !App.sidebarOpen);
}

// ---- Toast Notifications ----
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const icons = { success: 'fa-check-circle', warning: 'fa-exclamation-triangle', error: 'fa-times-circle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ---- Modal ----
function openModal(html) {
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('active');
}
function closeModal(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('modal-overlay').classList.remove('active');
}

// ---- Time updater ----
function updateTime() {
  const el = document.getElementById('topbar-time');
  if (el) el.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateTime, 1000);

// ---- Render dispatcher ----
function renderView() {
  const v = App.currentView;
  const isPublic = ['landing', 'features', 'pricing', 'login'].includes(v);
  const isDash = !isPublic;

  // Toggle layout
  document.getElementById('public-header').classList.toggle('hidden', isDash);
  document.getElementById('public-footer').classList.toggle('hidden', !isPublic || v === 'login');
  document.getElementById('dashboard-sidebar').classList.toggle('hidden', !isDash);
  document.getElementById('dashboard-topbar').classList.toggle('hidden', !isDash);

  const main = document.getElementById('main-content');
  main.style.marginLeft = isDash ? '260px' : '0';
  main.style.paddingTop = isDash ? '64px' : '0';
  if (isDash) main.className = 'bg-[#FBF7F0] min-h-screen'; else main.className = '';

  // Update sidebar & topbar
  if (isDash) {
    updateSidebar();
    updateTopbar();
    updateTime();
    document.getElementById('latency-badge').className = 'hidden sm:flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-terra-100 text-terra-700';
  }

  // Render content
  const views = {
    landing: renderLanding, features: renderFeatures, pricing: renderPricing, login: renderLogin,
    'sa-overview': renderSAOverview, 'sa-institutions': renderSAInstitutions, 'sa-hardware': renderSAHardware,
    'ia-command': renderIACommand, 'ia-academic': renderIAAcademic, 'ia-devices': renderIADevices,
    'f-workspace': renderFWorkspace, 'f-classroom': renderFClassroom,
    'st-dashboard': renderSTDashboard, 'st-history': renderSTHistory,
    'pipeline': renderPipeline, 'reports': renderReports, 'audit': renderAudit
  };
  if (views[v]) views[v](main);
}

// ---- Sidebar config ----
const sidebarConfigs = {
  superadmin: {
    label: 'Super Admin', icon: 'fa-shield-halved', color: 'navy',
    user: { name: 'Super Admin', email: 'admin@scanit.io', initials: 'SA' },
    links: [
      { id: 'sa-overview', icon: 'fa-chart-line', label: 'Overview Analytics' },
      { id: 'sa-institutions', icon: 'fa-building-columns', label: 'Institutions' },
      { id: 'sa-hardware', icon: 'fa-microchip', label: 'Global Hardware' },
      { divider: true },
      { id: 'pipeline', icon: 'fa-diagram-project', label: 'AI Pipeline' },
      { id: 'reports', icon: 'fa-file-chart-column', label: 'Reports Engine' },
      { id: 'audit', icon: 'fa-scroll', label: 'Audit Logs' }
    ]
  },
  institutionadmin: {
    label: 'Institution Admin', icon: 'fa-building-columns', color: 'terra',
    user: { name: 'Dr. VP Sharma', email: 'admin@dtu.ac.in', initials: 'VS' },
    links: [
      { id: 'ia-command', icon: 'fa-gauge-high', label: 'Command Center' },
      { id: 'ia-academic', icon: 'fa-graduation-cap', label: 'Academic Directory' },
      { id: 'ia-devices', icon: 'fa-server', label: 'Device Operations' },
      { divider: true },
      { id: 'pipeline', icon: 'fa-diagram-project', label: 'AI Pipeline' },
      { id: 'reports', icon: 'fa-file-chart-column', label: 'Reports Engine' },
      { id: 'audit', icon: 'fa-scroll', label: 'Audit Logs' }
    ]
  },
  faculty: {
    label: 'Faculty Portal', icon: 'fa-chalkboard-user', color: 'amber',
    user: { name: 'Dr. Rajesh Kumar', email: 'rajesh.k@dtu.ac.in', initials: 'RK' },
    links: [
      { id: 'f-workspace', icon: 'fa-desktop', label: 'Daily Workspace' },
      { id: 'f-classroom', icon: 'fa-users-rectangle', label: 'Classroom Monitor' },
      { divider: true },
      { id: 'pipeline', icon: 'fa-diagram-project', label: 'AI Pipeline' },
      { id: 'reports', icon: 'fa-file-chart-column', label: 'Reports' }
    ]
  },
  student: {
    label: 'Student Portal', icon: 'fa-user-graduate', color: 'purple',
    user: { name: 'Aarav Sharma', email: 'aarav.s@student.dtu.ac.in', initials: 'AS' },
    links: [
      { id: 'st-dashboard', icon: 'fa-house', label: 'My Dashboard' },
      { id: 'st-history', icon: 'fa-clock-rotate-left', label: 'History Logs' },
      { divider: true },
      { id: 'pipeline', icon: 'fa-diagram-project', label: 'AI Pipeline' }
    ]
  }
};

function updateSidebar() {
  const cfg = sidebarConfigs[App.currentRole];
  if (!cfg) return;
  document.getElementById('sidebar-role-badge').innerHTML = `<i class="fas ${cfg.icon} mr-1"></i> ${cfg.label}`;
  document.getElementById('sidebar-avatar').textContent = cfg.user.initials;
  document.getElementById('sidebar-username').textContent = cfg.user.name;
  document.getElementById('sidebar-email').textContent = cfg.user.email;
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = cfg.links.map(l => {
    if (l.divider) return '<div class="border-t border-slate-700/50 my-3 mx-2"></div>';
    const active = App.currentView === l.id ? 'active' : '';
    return `<a class="sidebar-link ${active}" onclick="navigateTo('${l.id}')"><i class="fas ${l.icon} w-5 text-center"></i><span>${l.label}</span></a>`;
  }).join('');
  document.getElementById('current-role-label').textContent = cfg.label;
}

function updateTopbar() {
  const titles = {
    'sa-overview': 'Overview Analytics', 'sa-institutions': 'Institution Management', 'sa-hardware': 'Global Hardware Controls',
    'ia-command': 'Command Center', 'ia-academic': 'Academic Directory', 'ia-devices': 'Device Operations',
    'f-workspace': 'Daily Workspace', 'f-classroom': 'Classroom Monitor',
    'st-dashboard': 'My Dashboard', 'st-history': 'History Logs',
    'pipeline': 'AI Verification Pipeline', 'reports': 'Reports & Analytics', 'audit': 'System Audit Logs'
  };
  document.getElementById('topbar-title').textContent = titles[App.currentView] || 'Dashboard';
}

// ---- Helper: Status badge ----
function statusBadge(status) {
  const map = {
    'Active': 'badge-success', 'Online': 'badge-success', 'Verified': 'badge-success', 'Completed': 'badge-success', 'Success': 'badge-success', 'Enrolled': 'badge-success',
    'Inactive': 'badge-danger', 'Offline': 'badge-danger', 'Failed': 'badge-danger', 'Absent': 'badge-danger', 'Alert': 'badge-danger',
    'Late': 'badge-warning', 'Pending': 'badge-warning', 'Maintenance': 'badge-warning', 'Warning': 'badge-warning', 'Override': 'badge-warning',
    'In Progress': 'badge-info', 'Upcoming': 'badge-neutral'
  };
  return `<span class="badge ${map[status] || 'badge-neutral'}">${status}</span>`;
}

// ---- Helper: Widget card ----
function widget(icon, iconColor, label, value, sub = '') {
  return `<div class="dash-widget animate-fade-in">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">${label}</span>
      <div class="w-9 h-9 rounded-lg bg-${iconColor}-100 flex items-center justify-center"><i class="fas ${icon} text-${iconColor}-600 text-sm"></i></div>
    </div>
    <div class="text-2xl font-bold text-slate-800 counter-value">${value}</div>
    ${sub ? `<div class="text-xs text-slate-500 mt-1">${sub}</div>` : ''}
  </div>`;
}

// Init
window.addEventListener('DOMContentLoaded', () => navigateTo('landing'));
