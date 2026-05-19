// ============================================
// SCANIT - Super Admin Dashboard Views
// ============================================

function renderSAOverview(container) {
  const s = MockData.platformStats;
  const insts = MockData.institutions;
  const devs = MockData.devices;
  container.innerHTML = `<div class="p-6 space-y-6">
    <!-- Widgets -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${widget('fa-building-columns', 'navy', 'Total Institutions', s.totalInstitutions, '+8 this quarter')}
      ${widget('fa-microchip', 'terra', 'Active Devices', s.activeDevices.toLocaleString(), '99.2% online')}
      ${widget('fa-qrcode', 'amber', 'Daily Scans', s.dailyScans.toLocaleString(), 'Avg latency: '+s.avgLatency)}
      ${widget('fa-shield-halved', 'emerald', 'Proxy Blocked', s.proxyBlocked.toLocaleString(), 'This semester')}
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Weekly Trend Chart -->
      <div class="dash-widget lg:col-span-2 animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-slate-800">Weekly Attendance Trend</h3>
          <span class="badge badge-info"><i class="fas fa-chart-line mr-1"></i> This Week</span>
        </div>
        <div class="flex items-end justify-between gap-3 h-48 px-4">
          ${MockData.weeklyTrend.map(d => `
            <div class="chart-bar-vertical flex-1">
              <span class="text-xs font-semibold text-slate-600">${d.attendance}%</span>
              <div class="chart-bar-track">
                <div class="chart-bar-fill bg-gradient-to-t from-terra-600 to-terra-400" style="height:${d.attendance}%"></div>
              </div>
              <span class="text-xs text-slate-500 font-medium">${d.day}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Subscription Breakdown -->
      <div class="dash-widget animate-fade-in">
        <h3 class="font-semibold text-slate-800 mb-4">Subscription Status</h3>
        <div class="space-y-4">
          ${[
            { label: 'Enterprise', count: insts.filter(i => i.plan === 'Enterprise').length, color: 'navy', total: insts.length },
            { label: 'Professional', count: insts.filter(i => i.plan === 'Professional').length, color: 'terra', total: insts.length },
            { label: 'Starter', count: insts.filter(i => i.plan === 'Starter').length, color: 'amber', total: insts.length }
          ].map(p => `
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="font-medium text-slate-700">${p.label}</span><span class="text-slate-500">${p.count} institutions</span></div>
              <div class="progress-bar"><div class="progress-bar-fill bg-${p.color}-500" style="width:${(p.count/p.total*100).toFixed(0)}%"></div></div>
            </div>
          `).join('')}
        </div>
        <div class="mt-4 pt-4 border-t border-slate-100">
          <div class="flex justify-between text-sm"><span class="text-slate-500">Active</span><span class="font-semibold text-emerald-600">${insts.filter(i=>i.status==='Active').length}</span></div>
          <div class="flex justify-between text-sm mt-1"><span class="text-slate-500">Inactive</span><span class="font-semibold text-red-500">${insts.filter(i=>i.status==='Inactive').length}</span></div>
        </div>
      </div>
    </div>

    <!-- Hardware Health Map -->
    <div class="dash-widget animate-fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-slate-800">Global Hardware Health</h3>
        <div class="flex gap-4 text-xs">
          <span class="flex items-center gap-1"><span class="status-dot online"></span> Online (${devs.filter(d=>d.status==='Online').length})</span>
          <span class="flex items-center gap-1"><span class="status-dot offline"></span> Offline (${devs.filter(d=>d.status==='Offline').length})</span>
          <span class="flex items-center gap-1"><span class="status-dot maintenance"></span> Maintenance (${devs.filter(d=>d.status==='Maintenance').length})</span>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        ${devs.map(d => {
          const color = d.status==='Online' ? 'emerald' : d.status==='Offline' ? 'red' : 'amber';
          return `<div class="p-3 rounded-lg bg-${color}-50 border border-${color}-200 text-center cursor-pointer hover:shadow-md transition-all" onclick="showToast('${d.id}: ${d.location} — ${d.status}', '${d.status==='Online'?'success':d.status==='Offline'?'error':'warning'}')">
            <i class="fas fa-hard-drive text-${color}-600 text-lg mb-1"></i>
            <div class="text-xs font-bold text-slate-700">${d.id}</div>
            <div class="text-[10px] text-slate-500">${d.status}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Top Institutions Table -->
    <div class="dash-widget animate-fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-slate-800">Top Institutions by Attendance</h3>
        <button onclick="navigateTo('sa-institutions')" class="btn-secondary btn-sm"><i class="fas fa-arrow-right"></i> View All</button>
      </div>
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>Institution</th><th>City</th><th>Plan</th><th>Students</th><th>Devices</th><th>Attendance</th><th>Status</th>
      </tr></thead><tbody>
        ${insts.sort((a,b)=>b.attendance-a.attendance).slice(0,5).map(i => `<tr>
          <td class="font-medium text-slate-800">${i.name}</td><td>${i.city}</td><td>${statusBadge(i.plan === 'Enterprise' ? 'Active' : i.plan)}</td>
          <td>${i.students.toLocaleString()}</td><td>${i.devices}</td>
          <td><div class="flex items-center gap-2"><div class="progress-bar w-20"><div class="progress-bar-fill bg-${i.attendance>=85?'emerald':i.attendance>=75?'amber':'red'}-500" style="width:${i.attendance}%"></div></div><span class="text-xs font-medium">${i.attendance}%</span></div></td>
          <td>${statusBadge(i.status)}</td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

// ---- INSTITUTION MANAGEMENT ----
function renderSAInstitutions(container) {
  const insts = MockData.institutions;
  container.innerHTML = `<div class="p-6 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div><h3 class="text-lg font-bold text-slate-800">All Institutions</h3><p class="text-sm text-slate-500">${insts.length} institutions registered</p></div>
      <div class="flex gap-3">
        <input type="text" class="form-input w-64" placeholder="Search institutions..." oninput="filterInstitutions(this.value)">
        <button onclick="openAddInstitutionModal()" class="btn-primary"><i class="fas fa-plus"></i> Onboard New</button>
      </div>
    </div>
    <div class="dash-widget p-0 overflow-hidden animate-fade-in">
      <div class="overflow-x-auto"><table class="data-table" id="institutions-table"><thead><tr>
        <th>ID</th><th>Institution</th><th>City</th><th>Plan</th><th>Students</th><th>Devices</th><th>Since</th><th>Attendance</th><th>Status</th><th>Actions</th>
      </tr></thead><tbody>
        ${insts.map(i => `<tr>
          <td class="font-mono text-xs text-slate-500">${i.id}</td>
          <td class="font-medium text-slate-800">${i.name}</td>
          <td>${i.city}</td><td><span class="badge badge-info">${i.plan}</span></td>
          <td>${i.students.toLocaleString()}</td><td>${i.devices}</td>
          <td class="text-xs">${i.since}</td>
          <td><span class="text-sm font-semibold ${i.attendance>=80?'text-emerald-600':i.attendance>=70?'text-amber-600':'text-red-600'}">${i.attendance}%</span></td>
          <td>${statusBadge(i.status)}</td>
          <td><button onclick="showToast('Editing ${i.name}', 'info')" class="text-blue-600 hover:text-blue-800 text-sm mr-2"><i class="fas fa-pen-to-square"></i></button>
          <button onclick="showToast('${i.status==='Active'?'Deactivated':'Activated'} ${i.name}', '${i.status==='Active'?'warning':'success'}')" class="text-slate-400 hover:text-red-500 text-sm"><i class="fas fa-power-off"></i></button></td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

function filterInstitutions(query) {
  const rows = document.querySelectorAll('#institutions-table tbody tr');
  rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(query.toLowerCase()) ? '' : 'none'; });
}

function openAddInstitutionModal() {
  openModal(`
    <h3 class="text-lg font-bold text-slate-800 mb-4"><i class="fas fa-building-columns text-blue-500 mr-2"></i>Onboard New Institution</h3>
    <form onsubmit="event.preventDefault(); closeModal(event); showToast('Institution onboarded successfully!', 'success')" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Institution Name *</label><input class="form-input" required placeholder="e.g. Delhi University"></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">City *</label><input class="form-input" required placeholder="e.g. New Delhi"></div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Contact Email *</label><input type="email" class="form-input" required placeholder="admin@university.ac.in"></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Plan</label><select class="form-input"><option>Starter</option><option>Professional</option><option>Enterprise</option></select></div>
      </div>
      <div class="flex gap-3 justify-end pt-2"><button type="button" onclick="closeModal(event)" class="btn-secondary">Cancel</button><button type="submit" class="btn-primary"><i class="fas fa-check"></i> Onboard</button></div>
    </form>
  `);
}

// ---- GLOBAL HARDWARE ----
function renderSAHardware(container) {
  const devs = MockData.devices;
  container.innerHTML = `<div class="p-6 space-y-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${widget('fa-hard-drive', 'navy', 'Total Devices', devs.length, 'Across all institutions')}
      ${widget('fa-circle-check', 'emerald', 'Online', devs.filter(d=>d.status==='Online').length, 'Operating normally')}
      ${widget('fa-circle-xmark', 'red', 'Offline', devs.filter(d=>d.status==='Offline').length, 'Needs attention')}
      ${widget('fa-wrench', 'amber', 'Maintenance', devs.filter(d=>d.status==='Maintenance').length, 'Scheduled service')}
    </div>

    <!-- AI Threshold Config -->
    <div class="dash-widget animate-fade-in">
      <h3 class="font-semibold text-slate-800 mb-4"><i class="fas fa-sliders text-terra-500 mr-2"></i>Master AI Verification Thresholds</h3>
      <div class="grid sm:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Minimum Confidence Score</label>
          <div class="flex items-center gap-3"><input type="range" min="50" max="99" value="85" class="flex-1 accent-blue-600" oninput="this.nextElementSibling.textContent=this.value+'%'"><span class="text-sm font-bold text-blue-600 w-12">85%</span></div>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Liveness Detection Threshold</label>
          <div class="flex items-center gap-3"><input type="range" min="60" max="99" value="90" class="flex-1 accent-emerald-600" oninput="this.nextElementSibling.textContent=this.value+'%'"><span class="text-sm font-bold text-emerald-600 w-12">90%</span></div>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Late Attendance Window</label>
          <div class="flex items-center gap-3"><input type="range" min="1" max="30" value="10" class="flex-1 accent-amber-600" oninput="this.nextElementSibling.textContent=this.value+' min'"><span class="text-sm font-bold text-amber-600 w-14">10 min</span></div>
        </div>
      </div>
      <div class="mt-4 flex justify-end"><button onclick="showToast('Thresholds updated globally!', 'success')" class="btn-primary btn-sm"><i class="fas fa-save"></i> Save Thresholds</button></div>
    </div>

    <!-- Device Table -->
    <div class="dash-widget p-0 overflow-hidden animate-fade-in">
      <div class="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-semibold text-slate-800">All RFID Device Mappings</h3>
        <button onclick="showToast('Firmware update pushed to all online devices', 'info')" class="btn-secondary btn-sm"><i class="fas fa-upload"></i> Push Firmware</button>
      </div>
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>Device ID</th><th>Location</th><th>IP Address</th><th>Firmware</th><th>Status</th><th>Last Ping</th><th>Scans Today</th>
      </tr></thead><tbody>
        ${devs.map(d => `<tr>
          <td class="font-mono font-semibold text-blue-700">${d.id}</td>
          <td>${d.location}</td>
          <td class="font-mono text-xs">${d.ip}</td>
          <td><span class="badge badge-neutral">${d.firmware}</span></td>
          <td><span class="flex items-center gap-1.5"><span class="status-dot ${d.status.toLowerCase()}"></span>${statusBadge(d.status)}</span></td>
          <td class="text-xs text-slate-500">${d.lastPing}</td>
          <td class="font-semibold">${d.scansToday.toLocaleString()}</td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}
