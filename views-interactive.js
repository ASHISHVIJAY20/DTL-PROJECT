// ============================================
// SCANIT - Interactive Components
// (AI Pipeline, Reports Engine, Audit Logs)
// ============================================

// ---- AI VERIFICATION PIPELINE ----
let pipelineState = { step: -1, running: false, result: null };

function renderPipeline(container) {
  const steps = [
    { icon: 'fa-id-card', title: 'RFID Tap Detected', desc: 'Card UID scanned by reader' },
    { icon: 'fa-camera', title: 'Camera Captures Face', desc: 'Live photo captured from webcam' },
    { icon: 'fa-brain', title: 'Match Against Profile', desc: 'AI compares with stored embedding' },
    { icon: 'fa-chart-simple', title: 'Confidence Score', desc: 'Similarity score computed' },
    { icon: 'fa-circle-check', title: 'Final Status', desc: 'Attendance marked or flagged' }
  ];

  container.innerHTML = `<div class="p-6 space-y-6">
    <div class="dash-widget text-center animate-fade-in">
      <h3 class="text-xl font-bold text-slate-800 mb-2">AI Verification Pipeline Simulator</h3>
      <p class="text-sm text-slate-500 mb-6">Watch the 5-step verification workflow in action. Click the button below to simulate a student scan.</p>
      
      <!-- Pipeline Steps -->
      <div class="flex flex-wrap items-start justify-center gap-2 sm:gap-0 mb-8" id="pipeline-visual">
        ${steps.map((s, i) => `
          <div class="pipeline-step ${pipelineState.step > i ? 'completed' : pipelineState.step === i ? 'active' : ''}" id="pipe-step-${i}">
            <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2 transition-all" id="pipe-icon-${i}">
              <i class="fas ${s.icon} text-slate-400 text-xl transition-all" id="pipe-i-${i}"></i>
            </div>
            <div class="text-xs font-bold text-slate-600 mb-0.5">STEP ${i+1}</div>
            <div class="text-xs font-semibold text-slate-800">${s.title}</div>
            <div class="text-[10px] text-slate-500 mt-1">${s.desc}</div>
          </div>
          ${i < 4 ? `<div class="pipeline-connector ${pipelineState.step > i ? 'completed' : pipelineState.step === i ? 'active' : ''}" id="pipe-conn-${i}"></div>` : ''}
        `).join('')}
      </div>

      <!-- Status Display -->
      <div id="pipeline-result" class="mb-6 min-h-[60px]">
        ${pipelineState.result ? renderPipelineResult(pipelineState.result) : '<p class="text-sm text-slate-400">Press "Simulate Scan" to begin the verification demo</p>'}
      </div>

      <!-- Controls -->
      <div class="flex justify-center gap-4">
        <button onclick="startPipelineSimulation()" class="btn-primary text-base px-8 py-3" id="sim-btn" ${pipelineState.running ? 'disabled' : ''}>
          <i class="fas ${pipelineState.running ? 'fa-spinner fa-spin' : 'fa-play'}"></i>
          ${pipelineState.running ? 'Scanning...' : 'Simulate Scan'}
        </button>
        <button onclick="resetPipeline()" class="btn-secondary text-base px-6 py-3"><i class="fas fa-rotate"></i> Reset</button>
      </div>
    </div>

    <!-- Pipeline Info -->
    <div class="grid sm:grid-cols-3 gap-4">
      <div class="dash-widget text-center animate-fade-in stagger-1">
        <i class="fas fa-bolt text-2xl text-amber-500 mb-2"></i>
        <div class="text-2xl font-bold text-slate-800">< 2s</div>
        <div class="text-sm text-slate-500">End-to-end latency</div>
      </div>
      <div class="dash-widget text-center animate-fade-in stagger-2">
        <i class="fas fa-shield-halved text-2xl text-emerald-500 mb-2"></i>
        <div class="text-2xl font-bold text-slate-800">99.2%</div>
        <div class="text-sm text-slate-500">Verification accuracy</div>
      </div>
      <div class="dash-widget text-center animate-fade-in stagger-3">
        <i class="fas fa-user-slash text-2xl text-red-500 mb-2"></i>
        <div class="text-2xl font-bold text-slate-800">0%</div>
        <div class="text-sm text-slate-500">Proxy success rate</div>
      </div>
    </div>
  </div>`;
}

function renderPipelineResult(result) {
  if (result === 'verified') {
    return `<div class="inline-flex items-center gap-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl px-6 py-3">
      <i class="fas fa-check-circle text-emerald-600 text-3xl"></i>
      <div class="text-left"><div class="font-bold text-emerald-800">Attendance Verified</div><div class="text-sm text-emerald-600">Confidence: 97.3% · Student: Aarav Sharma · RFID: RF-A7F3B2C1</div></div>
    </div>`;
  } else {
    return `<div class="inline-flex items-center gap-3 bg-red-50 border-2 border-red-200 rounded-xl px-6 py-3">
      <i class="fas fa-exclamation-triangle text-red-600 text-3xl"></i>
      <div class="text-left"><div class="font-bold text-red-800">Flagged for Review</div><div class="text-sm text-red-600">Confidence: 42.1% · Possible proxy attempt detected · Sent to faculty queue</div></div>
    </div>`;
  }
}

function startPipelineSimulation() {
  if (pipelineState.running) return;
  pipelineState = { step: -1, running: true, result: null };
  const btn = document.getElementById('sim-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
  document.getElementById('pipeline-result').innerHTML = '<p class="text-sm text-blue-500 font-medium"><i class="fas fa-spinner fa-spin mr-1"></i> Initiating scan sequence...</p>';

  let step = 0;
  const colors = ['blue', 'indigo', 'purple', 'amber', 'emerald'];
  const interval = setInterval(() => {
    if (step > 4) {
      clearInterval(interval);
      pipelineState.running = false;
      pipelineState.result = Math.random() > 0.3 ? 'verified' : 'failed';
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-play"></i> Simulate Scan';
      document.getElementById('pipeline-result').innerHTML = renderPipelineResult(pipelineState.result);
      showToast(pipelineState.result === 'verified' ? 'Attendance verified successfully!' : 'Verification failed — flagged for review', pipelineState.result === 'verified' ? 'success' : 'warning');
      return;
    }
    pipelineState.step = step;
    // Update visual
    for (let i = 0; i <= 4; i++) {
      const el = document.getElementById('pipe-step-' + i);
      const iconWrap = document.getElementById('pipe-icon-' + i);
      const icon = document.getElementById('pipe-i-' + i);
      if (!el) continue;
      el.className = 'pipeline-step' + (i < step ? ' completed' : i === step ? ' active' : '');
      if (i < step) { iconWrap.className = 'w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2 transition-all'; icon.className = 'fas fa-check text-emerald-600 text-xl transition-all'; }
      else if (i === step) { iconWrap.className = `w-12 h-12 rounded-full bg-${colors[i]}-100 flex items-center justify-center mb-2 transition-all`; icon.className = icon.className.replace(/text-slate-400/, `text-${colors[i]}-600`); }
      if (i < step) { const conn = document.getElementById('pipe-conn-' + i); if (conn) conn.className = 'pipeline-connector completed'; }
      else if (i === step && i > 0) { const conn = document.getElementById('pipe-conn-' + (i-1)); if (conn) conn.className = 'pipeline-connector active'; }
    }
    step++;
  }, 800);
}

function resetPipeline() {
  pipelineState = { step: -1, running: false, result: null };
  renderPipeline(document.getElementById('main-content'));
}

// ---- REPORTS & ANALYTICS ENGINE ----
function renderReports(container) {
  container.innerHTML = `<div class="p-6 space-y-6">
    <!-- Export Actions -->
    <div class="dash-widget animate-fade-in">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div><h3 class="text-lg font-bold text-slate-800">Data Export Center</h3><p class="text-sm text-slate-500">Generate and download comprehensive attendance reports</p></div>
        <div class="flex gap-2 flex-wrap">
          <button onclick="showToast('Generating PDF report... Download will start shortly.', 'info')" class="btn-secondary btn-sm"><i class="fas fa-file-pdf text-red-500"></i> PDF</button>
          <button onclick="showToast('Generating Excel workbook... Download will start shortly.', 'info')" class="btn-secondary btn-sm"><i class="fas fa-file-excel text-emerald-600"></i> Excel</button>
          <button onclick="showToast('Generating CSV file... Download will start shortly.', 'info')" class="btn-secondary btn-sm"><i class="fas fa-file-csv text-blue-600"></i> CSV</button>
        </div>
      </div>
      <div class="grid sm:grid-cols-3 gap-3">
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Report Type</label><select class="form-input"><option>Daily Attendance Summary</option><option>Weekly Trend Analysis</option><option>Department Comparison</option><option>Defaulter Report</option><option>Device Usage Report</option></select></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Date Range</label><div class="flex gap-2"><input type="date" class="form-input" value="2026-05-13"><input type="date" class="form-input" value="2026-05-19"></div></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Department</label><select class="form-input"><option>All Departments</option>${MockData.departments.map(d=>`<option>${d.code} - ${d.name}</option>`).join('')}</select></div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Weekly Trend -->
      <div class="dash-widget animate-fade-in">
        <h3 class="font-semibold text-slate-800 mb-4">Weekly Attendance Trend</h3>
        <div class="flex items-end justify-between gap-3 h-48 px-2">
          ${MockData.weeklyTrend.map(d => `
            <div class="chart-bar-vertical flex-1">
              <span class="text-xs font-bold ${d.attendance>=85?'text-emerald-600':d.attendance>=75?'text-blue-600':'text-amber-600'}">${d.attendance}%</span>
              <div class="chart-bar-track">
                <div class="chart-bar-fill bg-gradient-to-t ${d.attendance>=85?'from-emerald-600 to-emerald-400':d.attendance>=75?'from-blue-600 to-blue-400':'from-amber-600 to-amber-400'}" style="height:${d.attendance}%"></div>
              </div>
              <span class="text-xs text-slate-500 font-medium">${d.day}</span>
              <span class="text-[10px] text-slate-400">${d.scans}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Department Comparison -->
      <div class="dash-widget animate-fade-in">
        <h3 class="font-semibold text-slate-800 mb-4">Department Comparison</h3>
        <div class="space-y-3">
          ${MockData.deptAttendance.map(d => {
            const c = d.percentage >= 85 ? 'emerald' : d.percentage >= 75 ? 'blue' : d.percentage >= 65 ? 'amber' : 'red';
            return `<div>
              <div class="flex justify-between text-sm mb-1"><span class="font-medium text-slate-700">${d.dept}</span><span class="font-bold text-${c}-600">${d.percentage}%</span></div>
              <div class="progress-bar h-5 rounded-lg"><div class="progress-bar-fill rounded-lg bg-gradient-to-r from-${c}-500 to-${c}-400" style="width:${d.percentage}%"></div></div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Defaulter List -->
    <div class="dash-widget animate-fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-slate-800"><i class="fas fa-user-xmark text-red-500 mr-2"></i>Defaulter List — Proxy Attempt Metrics</h3>
        <button onclick="showToast('Defaulter report exported as PDF', 'info')" class="btn-secondary btn-sm"><i class="fas fa-download"></i> Export</button>
      </div>
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>Student</th><th>Enrollment</th><th>Dept</th><th>Current %</th><th>Threshold</th><th>Deficit</th><th>Proxy Attempts</th><th>Risk Level</th>
      </tr></thead><tbody>
        ${MockData.defaulters.map(d => {
          const risk = d.proxyAttempts >= 3 ? 'High' : d.proxyAttempts >= 1 ? 'Medium' : 'Low';
          const riskColor = risk === 'High' ? 'danger' : risk === 'Medium' ? 'warning' : 'neutral';
          return `<tr>
            <td class="font-medium text-slate-800">${d.name}</td>
            <td class="font-mono text-xs">${d.enrollment}</td>
            <td><span class="badge badge-info">${d.dept}</span></td>
            <td class="font-bold text-red-600">${d.attendance}%</td>
            <td class="text-slate-500">${d.threshold}%</td>
            <td class="font-semibold text-red-600">-${d.deficit}%</td>
            <td class="text-center"><span class="font-bold ${d.proxyAttempts>0?'text-red-600':'text-slate-400'}">${d.proxyAttempts}</span></td>
            <td><span class="badge badge-${riskColor}">${risk}</span></td>
          </tr>`;
        }).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

// ---- SYSTEM LOGS & AUDIT TRAIL ----
function renderAudit(container) {
  const logs = MockData.auditLogs;
  container.innerHTML = `<div class="p-6 space-y-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${widget('fa-scroll', 'blue', 'Total Log Entries', '24,891', 'Since system inception')}
      ${widget('fa-lock', 'emerald', 'Encryption Status', 'AES-256', 'All data encrypted at rest')}
      ${widget('fa-clock', 'amber', 'Session Timeout', '30 min', 'Auto-logout after inactivity')}
      ${widget('fa-shield-halved', 'purple', 'Failed Logins', '12', 'Last 24 hours')}
    </div>

    <!-- Security Status -->
    <div class="dash-widget animate-fade-in">
      <h3 class="font-semibold text-slate-800 mb-4"><i class="fas fa-shield-halved text-emerald-500 mr-2"></i>Security Status Overview</h3>
      <div class="grid sm:grid-cols-4 gap-4">
        ${[
          { label: 'SSL/TLS', value: 'TLS 1.3', status: 'Active', icon: 'fa-lock', color: 'emerald' },
          { label: 'Data Encryption', value: 'AES-256-GCM', status: 'Active', icon: 'fa-key', color: 'emerald' },
          { label: 'Session Mgmt', value: '30 min timeout', status: 'Enforced', icon: 'fa-clock', color: 'blue' },
          { label: 'Audit Logging', value: 'Full trace', status: 'Active', icon: 'fa-list-check', color: 'emerald' }
        ].map(s => `
          <div class="bg-${s.color}-50 border border-${s.color}-200 rounded-xl p-4 text-center">
            <i class="fas ${s.icon} text-${s.color}-600 text-2xl mb-2"></i>
            <div class="text-sm font-bold text-slate-800">${s.label}</div>
            <div class="text-xs text-slate-600">${s.value}</div>
            <span class="badge badge-success mt-2">${s.status}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Audit Log Table -->
    <div class="dash-widget p-0 overflow-hidden animate-fade-in">
      <div class="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-semibold text-slate-800"><i class="fas fa-list-ol text-blue-500 mr-2"></i>Chronological Audit Trail</h3>
        <span class="badge badge-neutral"><i class="fas fa-eye mr-1"></i> Read-Only View</span>
      </div>
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>Timestamp</th><th>User</th><th>Role</th><th>Action</th><th>Details</th><th>IP Address</th><th>Status</th>
      </tr></thead><tbody>
        ${logs.map(l => `<tr>
          <td class="font-mono text-xs whitespace-nowrap">${l.timestamp}</td>
          <td class="text-sm">${l.user}</td>
          <td><span class="badge ${l.role==='Super Admin'?'badge-info':l.role==='System'?'badge-neutral':l.role==='Faculty'?'badge-warning':'badge-success'}">${l.role}</span></td>
          <td class="font-medium text-sm">${l.action}</td>
          <td class="text-xs text-slate-500 max-w-[250px] truncate">${l.details}</td>
          <td class="font-mono text-xs">${l.ip}</td>
          <td>${statusBadge(l.status)}</td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}
