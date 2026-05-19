// ============================================
// SCANIT - Production Enhancements
// ============================================

// ---- Loading Screen ----
function showLoading(container) {
  container.innerHTML = `<div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center animate-fade-in">
      <div class="w-16 h-16 mx-auto mb-4 border-4 border-slate-200 border-t-terra-500 rounded-full" style="animation:spin 0.8s linear infinite"></div>
      <p class="text-sm text-slate-500 font-medium">Loading view...</p>
    </div></div>`;
}

// ---- 404 / Error View ----
function render404(container) {
  container.innerHTML = `<div class="flex items-center justify-center min-h-[70vh] animate-fade-in">
    <div class="text-center max-w-md">
      <div class="text-8xl font-black text-slate-200 mb-4">404</div>
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
      <p class="text-slate-500 mb-6">The view you're looking for doesn't exist or has been moved.</p>
      <button onclick="navigateTo('landing')" class="btn-primary"><i class="fas fa-home mr-1"></i> Go Home</button>
    </div></div>`;
}

// ---- Session Timeout Manager ----
const Session = {
  timeout: 30 * 60 * 1000, // 30 min
  lastActivity: Date.now(),
  warningShown: false,
  timer: null,
  init() {
    ['click','keydown','mousemove','scroll','touchstart'].forEach(e =>
      document.addEventListener(e, () => { Session.lastActivity = Date.now(); Session.warningShown = false; }, { passive: true })
    );
    Session.timer = setInterval(() => Session.check(), 30000);
  },
  check() {
    if (!App.isLoggedIn) return;
    const elapsed = Date.now() - Session.lastActivity;
    const remaining = Session.timeout - elapsed;
    if (remaining <= 0) {
      showToast('Session expired. Please log in again.', 'error');
      logout();
    } else if (remaining < 5 * 60 * 1000 && !Session.warningShown) {
      Session.warningShown = true;
      showToast('Session expires in 5 minutes. Stay active to remain logged in.', 'warning');
    }
  }
};

// ---- Dark Mode Toggle ----
const DarkMode = {
  enabled: false,
  init() {
    const saved = localStorage.getItem('scanit-darkmode');
    if (saved === 'true') DarkMode.enable();
  },
  toggle() {
    DarkMode.enabled ? DarkMode.disable() : DarkMode.enable();
  },
  enable() {
    DarkMode.enabled = true;
    document.documentElement.classList.add('dark');
    localStorage.setItem('scanit-darkmode', 'true');
    DarkMode.updateBtn();
  },
  disable() {
    DarkMode.enabled = false;
    document.documentElement.classList.remove('dark');
    localStorage.setItem('scanit-darkmode', 'false');
    DarkMode.updateBtn();
  },
  updateBtn() {
    const btn = document.getElementById('darkmode-btn');
    if (btn) btn.innerHTML = DarkMode.enabled
      ? '<i class="fas fa-sun text-amber-400"></i>'
      : '<i class="fas fa-moon text-slate-500"></i>';
  }
};

// ---- Table Pagination ----
function paginateTable(tableId, page = 1, perPage = 10) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  const totalPages = Math.ceil(rows.length / perPage);
  const start = (page - 1) * perPage;
  rows.forEach((r, i) => r.style.display = (i >= start && i < start + perPage) ? '' : 'none');

  let pag = table.parentElement.querySelector('.pagination-bar');
  if (!pag) { pag = document.createElement('div'); pag.className = 'pagination-bar'; table.parentElement.appendChild(pag); }
  if (totalPages <= 1) { pag.innerHTML = ''; return; }
  pag.className = 'pagination-bar flex items-center justify-between px-4 py-3 border-t border-slate-100';
  pag.innerHTML = `
    <span class="text-xs text-slate-500">Showing ${start+1}-${Math.min(start+perPage,rows.length)} of ${rows.length}</span>
    <div class="flex gap-1">
      <button onclick="paginateTable('${tableId}',${Math.max(1,page-1)},${perPage})" class="btn-secondary btn-sm ${page<=1?'opacity-40 pointer-events-none':''}" ${page<=1?'disabled':''}><i class="fas fa-chevron-left"></i></button>
      ${Array.from({length:Math.min(totalPages,5)},(_,i)=> {
        const p = i+1;
        return `<button onclick="paginateTable('${tableId}',${p},${perPage})" class="btn-sm ${p===page?'btn-primary':'btn-secondary'} min-w-[32px]">${p}</button>`;
      }).join('')}
      ${totalPages > 5 ? `<span class="text-slate-400 px-1">...</span><button onclick="paginateTable('${tableId}',${totalPages},${perPage})" class="btn-sm ${totalPages===page?'btn-primary':'btn-secondary'} min-w-[32px]">${totalPages}</button>` : ''}
      <button onclick="paginateTable('${tableId}',${Math.min(totalPages,page+1)},${perPage})" class="btn-secondary btn-sm ${page>=totalPages?'opacity-40 pointer-events-none':''}" ${page>=totalPages?'disabled':''}><i class="fas fa-chevron-right"></i></button>
    </div>`;
}

// ---- Keyboard Navigation ----
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    // Escape closes modals
    if (e.key === 'Escape') {
      document.getElementById('modal-overlay')?.classList.remove('active');
      document.getElementById('role-dropdown')?.classList.add('hidden');
    }
    // Ctrl+K opens search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
  });
}

function openSearchModal() {
  if (!App.isLoggedIn) return;
  const cfg = sidebarConfigs[App.currentRole];
  if (!cfg) return;
  const links = cfg.links.filter(l => !l.divider);
  openModal(`
    <div class="relative">
      <i class="fas fa-search absolute left-3 top-3.5 text-slate-400"></i>
      <input type="text" id="search-input" class="form-input pl-10 text-base" placeholder="Search views... (type to filter)" autofocus
        oninput="filterSearchResults(this.value)">
    </div>
    <div id="search-results" class="mt-3 space-y-1 max-h-[300px] overflow-y-auto">
      ${links.map(l => `<a onclick="closeModal(event);navigateTo('${l.id}')" class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors text-slate-700">
        <i class="fas ${l.icon} w-5 text-center text-slate-400"></i><span class="text-sm font-medium">${l.label}</span>
      </a>`).join('')}
    </div>
    <div class="mt-3 pt-3 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-400">
      <span><kbd class="px-1.5 py-0.5 bg-slate-100 rounded text-xs">↑↓</kbd> Navigate</span>
      <span><kbd class="px-1.5 py-0.5 bg-slate-100 rounded text-xs">↵</kbd> Select</span>
      <span><kbd class="px-1.5 py-0.5 bg-slate-100 rounded text-xs">Esc</kbd> Close</span>
    </div>
  `);
  setTimeout(() => document.getElementById('search-input')?.focus(), 100);
}

function filterSearchResults(query) {
  const items = document.querySelectorAll('#search-results a');
  items.forEach(a => {
    a.style.display = a.textContent.toLowerCase().includes(query.toLowerCase()) ? '' : 'none';
  });
}

// ---- Breadcrumbs ----
function getBreadcrumb() {
  const v = App.currentView;
  const roleNames = { superadmin:'Super Admin', institutionadmin:'Institution Admin', faculty:'Faculty', student:'Student' };
  const titles = {
    'sa-overview':'Overview Analytics','sa-institutions':'Institutions','sa-hardware':'Global Hardware',
    'ia-command':'Command Center','ia-academic':'Academic Directory','ia-devices':'Device Operations',
    'f-workspace':'Daily Workspace','f-classroom':'Classroom Monitor',
    'st-dashboard':'My Dashboard','st-history':'History Logs',
    'pipeline':'AI Pipeline','reports':'Reports','audit':'Audit Logs','rfid-scanner':'RFID Scanner'
  };
  if (!App.isLoggedIn || !titles[v]) return '';
  return `<nav class="flex items-center gap-2 text-xs text-slate-400 mb-4 animate-fade-in" aria-label="Breadcrumb">
    <a onclick="navigateTo('${Object.keys(titles).find(k=>k.startsWith(v.split('-')[0]))}')" class="hover:text-slate-600 cursor-pointer">${roleNames[App.currentRole] || 'Dashboard'}</a>
    <i class="fas fa-chevron-right text-[8px]"></i>
    <span class="text-slate-600 font-medium">${titles[v]}</span>
  </nav>`;
}

// ---- Auto-refresh Simulation ----
const DataRefresh = {
  interval: null,
  countdown: 30,
  start() {
    DataRefresh.countdown = 30;
    clearInterval(DataRefresh.interval);
    DataRefresh.interval = setInterval(() => {
      DataRefresh.countdown--;
      const el = document.getElementById('refresh-timer');
      if (el) el.textContent = DataRefresh.countdown + 's';
      if (DataRefresh.countdown <= 0) {
        DataRefresh.countdown = 30;
        DataRefresh.pulse();
      }
    }, 1000);
  },
  stop() { clearInterval(DataRefresh.interval); },
  pulse() {
    const el = document.getElementById('refresh-indicator');
    if (el) { el.classList.add('text-terra-500'); setTimeout(() => el.classList.remove('text-terra-500'), 1000); }
  }
};

// ---- Form Validation Helper ----
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  const inputs = form.querySelectorAll('[required]');
  let valid = true;
  inputs.forEach(inp => {
    if (!inp.value.trim()) {
      inp.classList.add('border-red-400','ring-2','ring-red-100');
      inp.addEventListener('input', () => inp.classList.remove('border-red-400','ring-2','ring-red-100'), {once:true});
      valid = false;
    }
  });
  if (!valid) showToast('Please fill in all required fields.', 'error');
  return valid;
}

// ---- Confirmation Dialog ----
function confirmAction(message, onConfirm) {
  openModal(`
    <div class="text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
        <i class="fas fa-exclamation-triangle text-amber-600 text-2xl"></i>
      </div>
      <h3 class="text-lg font-bold text-slate-800 mb-2">Are you sure?</h3>
      <p class="text-sm text-slate-500 mb-6">${message}</p>
      <div class="flex gap-3 justify-center">
        <button onclick="closeModal(event)" class="btn-secondary px-6">Cancel</button>
        <button onclick="closeModal(event);(${onConfirm.toString()})()" class="btn-danger px-6"><i class="fas fa-check mr-1"></i> Confirm</button>
      </div>
    </div>
  `);
}

// ---- Copy to Clipboard ----
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!', 'success')).catch(() => showToast('Copy failed', 'error'));
}

// ---- Number Formatting ----
function formatNum(n) {
  if (n >= 1e6) return (n/1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(1) + 'K';
  return n.toString();
}

// ---- Debounce ----
function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// ---- Export Data Simulation ----
function exportData(format, reportName = 'Scanit_Report') {
  showToast(`Generating ${format.toUpperCase()} report...`, 'info');
  setTimeout(() => {
    const blob = new Blob([`${reportName} - Generated ${new Date().toLocaleString()}\nThis is a simulated ${format} export.`], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${reportName}_${new Date().toISOString().slice(0,10)}.${format}`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast(`${format.toUpperCase()} report downloaded successfully!`, 'success');
  }, 1500);
}

// ---- Init production features ----
document.addEventListener('DOMContentLoaded', () => {
  Session.init();
  DarkMode.init();
  initKeyboardNav();
  DataRefresh.start();
});
