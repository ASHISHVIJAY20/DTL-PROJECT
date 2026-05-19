// ============================================
// SCANIT - RFID Functions Module
// ============================================

let rfidScanLog = [];
let rfidScannerActive = false;
let rfidScanInterval = null;

// ---- RFID SCANNER SIMULATOR ----
function renderRFIDScanner(container) {
  container.innerHTML = `<div class="p-6 space-y-6">
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Scanner Visual -->
      <div class="dash-widget animate-fade-in">
        <h3 class="font-semibold text-slate-800 mb-4"><i class="fas fa-wifi text-terra-500 mr-2"></i>RFID Scanner Station</h3>
        <div class="flex flex-col items-center py-6">
          <div class="relative mb-6">
            <div id="rfid-scanner-ring" class="w-44 h-44 rounded-full border-4 border-slate-200 flex items-center justify-center transition-all duration-500" style="background:linear-gradient(135deg,#FBF7F0,#F5EDE0)">
              <div class="w-32 h-32 rounded-full border-2 border-slate-200 flex items-center justify-center bg-white">
                <div id="rfid-scanner-icon" class="text-center">
                  <i class="fas fa-id-card text-4xl text-slate-300 transition-all"></i>
                  <p class="text-xs text-slate-400 mt-2">Waiting for tap...</p>
                </div>
              </div>
            </div>
            <div id="rfid-pulse-1" class="absolute inset-0 rounded-full border-2 border-terra-300 opacity-0"></div>
            <div id="rfid-pulse-2" class="absolute inset-0 rounded-full border-2 border-terra-300 opacity-0" style="animation-delay:0.5s"></div>
          </div>
          <div id="rfid-scan-status" class="text-center mb-4 min-h-[80px]">
            <p class="text-sm text-slate-500">Press the button to simulate an RFID card tap</p>
          </div>
          <div class="flex gap-3">
            <button onclick="simulateRFIDTap()" id="rfid-tap-btn" class="btn-primary px-6 py-3"><i class="fas fa-hand-pointer"></i> Simulate Card Tap</button>
            <button onclick="toggleContinuousScan()" id="rfid-continuous-btn" class="btn-secondary px-4 py-3"><i class="fas fa-rotate"></i> Auto Scan</button>
          </div>
        </div>
      </div>

      <!-- Live Scan Feed -->
      <div class="dash-widget animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-slate-800"><i class="fas fa-list-timeline text-navy-500 mr-2"></i>Live Scan Feed</h3>
          <div class="flex items-center gap-2"><span id="rfid-feed-indicator" class="status-dot online"></span><span class="text-xs text-slate-500">Listening</span></div>
        </div>
        <div id="rfid-scan-feed" class="space-y-2 max-h-[400px] overflow-y-auto">
          <div class="text-center py-8 text-slate-400"><i class="fas fa-inbox text-3xl mb-2"></i><p class="text-sm">No scans yet. Tap a card to begin.</p></div>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
          <span>Total scans: <strong id="rfid-total-count">0</strong></span>
          <button onclick="rfidScanLog=[];renderRFIDScanFeed()" class="text-red-500 hover:text-red-700 font-medium">Clear Log</button>
        </div>
      </div>
    </div>

    <!-- RFID Card Management -->
    <div class="dash-widget animate-fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-slate-800"><i class="fas fa-credit-card text-terra-500 mr-2"></i>RFID Card Registry</h3>
        <div class="flex gap-2">
          <button onclick="openRFIDRegisterModal()" class="btn-primary btn-sm"><i class="fas fa-plus"></i> Register Card</button>
          <button onclick="showToast('Bulk card import ready','info')" class="btn-secondary btn-sm"><i class="fas fa-file-import"></i> Bulk Import</button>
        </div>
      </div>
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>Card UID</th><th>Assigned To</th><th>Enrollment</th><th>Dept</th><th>Card Status</th><th>Last Scanned</th><th>Total Taps</th><th>Actions</th>
      </tr></thead><tbody>
        ${MockData.students.map(s => {
          const st = s.faceStatus === 'Failed' ? 'Blocked' : s.attendance < 60 ? 'Flagged' : 'Active';
          const stClass = st === 'Active' ? 'badge-success' : st === 'Blocked' ? 'badge-danger' : 'badge-warning';
          return `<tr>
            <td class="font-mono font-semibold text-terra-700">${s.rfidUid}</td>
            <td class="font-medium">${s.name}</td>
            <td class="font-mono text-xs">${s.enrollment}</td>
            <td><span class="badge badge-info">${s.dept}</span></td>
            <td><span class="badge ${stClass}">${st}</span></td>
            <td class="text-xs text-slate-500">${Math.floor(Math.random()*50)+1} min ago</td>
            <td class="font-semibold">${Math.floor(Math.random()*500)+100}</td>
            <td class="flex gap-1">
              <button onclick="showToast('Card ${s.rfidUid} details opened','info')" class="btn-secondary btn-sm text-xs"><i class="fas fa-eye"></i></button>
              <button onclick="showToast('Card ${s.rfidUid} blocked','warning')" class="btn-secondary btn-sm text-xs text-red-500"><i class="fas fa-ban"></i></button>
              <button onclick="openReplaceCardModal('${s.name}','${s.rfidUid}')" class="btn-secondary btn-sm text-xs"><i class="fas fa-arrows-rotate"></i></button>
            </td>
          </tr>`}).join('')}
      </tbody></table></div>
    </div>

    <!-- Device Configuration -->
    <div class="dash-widget animate-fade-in">
      <h3 class="font-semibold text-slate-800 mb-4"><i class="fas fa-cog text-navy-500 mr-2"></i>RFID Reader Configuration</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${MockData.devices.slice(0,4).map(d => {
          const isOn = d.status === 'Online';
          return `<div class="p-4 rounded-xl border ${isOn ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'} transition-all hover:shadow-md">
            <div class="flex items-center justify-between mb-3">
              <span class="font-mono font-bold text-sm text-slate-800">${d.id}</span>
              <span class="status-dot ${d.status.toLowerCase()}"></span>
            </div>
            <p class="text-xs text-slate-600 mb-1"><i class="fas fa-location-dot mr-1"></i>${d.location}</p>
            <p class="text-xs text-slate-500 mb-1"><i class="fas fa-network-wired mr-1"></i>${d.ip}</p>
            <p class="text-xs text-slate-500 mb-3"><i class="fas fa-code-branch mr-1"></i>Firmware ${d.firmware}</p>
            <div class="flex gap-1">
              <select class="form-input text-xs py-1 flex-1"><option>Attendance</option><option>Entry Gate</option><option>Exit Gate</option><option>Library</option></select>
              <button onclick="showToast('Pinging ${d.id}...','info')" class="btn-secondary btn-sm text-xs"><i class="fas fa-satellite-dish"></i></button>
            </div>
            <div class="mt-2 text-xs text-slate-500">Signal: <span class="font-semibold ${isOn?'text-emerald-600':'text-red-500'}">${isOn ? (85+Math.floor(Math.random()*15))+'%' : '0%'}</span></div>
          </div>`}).join('')}
      </div>
    </div>

    <!-- RFID Analytics -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${widget('fa-id-card','terra','Cards Registered',MockData.students.length,'Active in system')}
      ${widget('fa-wifi','navy','Readers Online',MockData.devices.filter(d=>d.status==='Online').length,'of '+MockData.devices.length+' total')}
      ${widget('fa-bolt','amber','Avg Scan Time','0.8s','Below 2s target')}
      ${widget('fa-ban','red','Blocked Cards','2','Security holds')}
    </div>
  </div>`;
}

// ---- Simulate RFID Tap ----
function simulateRFIDTap() {
  const btn = document.getElementById('rfid-tap-btn');
  if (btn.disabled) return;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';

  const ring = document.getElementById('rfid-scanner-ring');
  const icon = document.getElementById('rfid-scanner-icon');
  const status = document.getElementById('rfid-scan-status');
  const p1 = document.getElementById('rfid-pulse-1');
  const p2 = document.getElementById('rfid-pulse-2');

  // Phase 1: Card detected
  ring.style.borderColor = '#C4652A';
  ring.style.background = 'linear-gradient(135deg,#FDF5EF,#F9E6D6)';
  p1.style.animation = 'pulse-ring 1s ease-out infinite';
  p1.style.opacity = '1';
  p2.style.animation = 'pulse-ring 1s ease-out infinite 0.5s';
  p2.style.opacity = '1';
  icon.innerHTML = '<i class="fas fa-id-card text-4xl text-terra-500 animate-bounce"></i><p class="text-xs text-terra-600 mt-2 font-semibold">Card Detected!</p>';

  const student = MockData.students[Math.floor(Math.random() * MockData.students.length)];
  const confidence = (85 + Math.random() * 15).toFixed(1);
  const isSuccess = Math.random() > 0.2;
  const scanTime = (0.5 + Math.random() * 1.2).toFixed(1);

  status.innerHTML = `<div class="bg-terra-50 border border-terra-200 rounded-lg p-3 animate-fade-in">
    <p class="text-sm font-semibold text-terra-800"><i class="fas fa-id-card mr-1"></i> Card UID: ${student.rfidUid}</p>
    <p class="text-xs text-terra-600 mt-1">Looking up student profile...</p></div>`;

  // Phase 2: Student identified
  setTimeout(() => {
    status.innerHTML = `<div class="bg-navy-50 border border-navy-200 rounded-lg p-3 animate-fade-in">
      <p class="text-sm font-semibold text-navy-800"><i class="fas fa-user mr-1"></i> ${student.name}</p>
      <p class="text-xs text-navy-600">${student.enrollment} · ${student.dept} · Sem ${student.semester}</p>
      <p class="text-xs text-amber-600 mt-1"><i class="fas fa-camera mr-1"></i> Initiating face verification...</p></div>`;
    icon.innerHTML = '<i class="fas fa-face-smile text-4xl text-navy-500"></i><p class="text-xs text-navy-600 mt-2 font-semibold">Verifying Face...</p>';
    ring.style.borderColor = '#1B2A4A';
  }, 1000);

  // Phase 3: Result
  setTimeout(() => {
    p1.style.animation = 'none'; p1.style.opacity = '0';
    p2.style.animation = 'none'; p2.style.opacity = '0';

    if (isSuccess) {
      ring.style.borderColor = '#10b981';
      ring.style.background = 'linear-gradient(135deg,#ecfdf5,#d1fae5)';
      icon.innerHTML = '<i class="fas fa-check-circle text-5xl text-emerald-500"></i><p class="text-xs text-emerald-700 mt-2 font-bold">VERIFIED</p>';
      status.innerHTML = `<div class="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-3 animate-fade-in">
        <div class="flex items-center gap-2 mb-1"><i class="fas fa-check-circle text-emerald-600"></i><span class="font-bold text-emerald-800">Attendance Marked</span></div>
        <p class="text-xs text-emerald-700">${student.name} · Confidence: ${confidence}% · Time: ${scanTime}s</p></div>`;
      showToast(`✅ ${student.name} verified (${confidence}%)`, 'success');
    } else {
      ring.style.borderColor = '#ef4444';
      ring.style.background = 'linear-gradient(135deg,#fef2f2,#fee2e2)';
      icon.innerHTML = '<i class="fas fa-exclamation-triangle text-5xl text-red-500"></i><p class="text-xs text-red-700 mt-2 font-bold">FAILED</p>';
      status.innerHTML = `<div class="bg-red-50 border-2 border-red-200 rounded-lg p-3 animate-fade-in">
        <div class="flex items-center gap-2 mb-1"><i class="fas fa-exclamation-triangle text-red-600"></i><span class="font-bold text-red-800">Verification Failed</span></div>
        <p class="text-xs text-red-700">${student.name} · Confidence: ${(30+Math.random()*20).toFixed(1)}% · Flagged for review</p></div>`;
      showToast(`⚠️ ${student.name} verification failed - flagged`, 'warning');
    }

    // Add to log
    rfidScanLog.unshift({
      time: new Date().toLocaleTimeString(),
      uid: student.rfidUid,
      student: student.name,
      enrollment: student.enrollment,
      dept: student.dept,
      confidence: isSuccess ? confidence : (30+Math.random()*20).toFixed(1),
      status: isSuccess ? 'Verified' : 'Failed',
      scanTime: scanTime
    });
    renderRFIDScanFeed();

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-hand-pointer"></i> Simulate Card Tap';

    // Reset visual after 3s
    setTimeout(() => {
      ring.style.borderColor = '#E8DFD2';
      ring.style.background = 'linear-gradient(135deg,#FBF7F0,#F5EDE0)';
      icon.innerHTML = '<i class="fas fa-id-card text-4xl text-slate-300"></i><p class="text-xs text-slate-400 mt-2">Waiting for tap...</p>';
    }, 3000);
  }, 2200);
}

function renderRFIDScanFeed() {
  const feed = document.getElementById('rfid-scan-feed');
  const count = document.getElementById('rfid-total-count');
  if (!feed) return;
  count.textContent = rfidScanLog.length;
  if (rfidScanLog.length === 0) {
    feed.innerHTML = '<div class="text-center py-8 text-slate-400"><i class="fas fa-inbox text-3xl mb-2"></i><p class="text-sm">No scans yet.</p></div>';
    return;
  }
  feed.innerHTML = rfidScanLog.slice(0, 20).map(s => `
    <div class="flex items-center gap-3 p-2.5 rounded-lg ${s.status==='Verified'?'bg-emerald-50 border border-emerald-100':'bg-red-50 border border-red-100'} animate-fade-in">
      <div class="w-8 h-8 rounded-full ${s.status==='Verified'?'bg-emerald-200':'bg-red-200'} flex items-center justify-center">
        <i class="fas ${s.status==='Verified'?'fa-check':'fa-times'} text-xs ${s.status==='Verified'?'text-emerald-700':'text-red-700'}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium text-slate-800 truncate">${s.student}</div>
        <div class="text-xs text-slate-500">${s.uid} · ${s.dept} · ${s.confidence}%</div>
      </div>
      <div class="text-right">
        ${statusBadge(s.status)}
        <div class="text-[10px] text-slate-400 mt-0.5">${s.time}</div>
      </div>
    </div>
  `).join('');
}

function toggleContinuousScan() {
  const btn = document.getElementById('rfid-continuous-btn');
  if (rfidScanInterval) {
    clearInterval(rfidScanInterval);
    rfidScanInterval = null;
    btn.innerHTML = '<i class="fas fa-rotate"></i> Auto Scan';
    btn.classList.remove('bg-red-50','border-red-200','text-red-700');
    showToast('Auto scan stopped', 'info');
  } else {
    rfidScanInterval = setInterval(() => simulateRFIDTap(), 4000);
    btn.innerHTML = '<i class="fas fa-stop"></i> Stop';
    btn.classList.add('bg-red-50','border-red-200','text-red-700');
    showToast('Auto scan started - scanning every 4s', 'success');
    simulateRFIDTap();
  }
}

// ---- RFID Card Registration Modal ----
function openRFIDRegisterModal() {
  const newUid = 'RF-' + Math.random().toString(36).substr(2,8).toUpperCase();
  openModal(`
    <h3 class="text-lg font-bold text-slate-800 mb-4"><i class="fas fa-id-card text-terra-500 mr-2"></i>Register New RFID Card</h3>
    <form onsubmit="event.preventDefault();closeModal(event);showToast('RFID card registered successfully!','success')" class="space-y-4">
      <div class="bg-terra-50 border border-terra-200 rounded-lg p-4 text-center">
        <p class="text-xs text-terra-600 mb-1">Generated Card UID</p>
        <p class="text-2xl font-mono font-bold text-terra-800">${newUid}</p>
        <p class="text-xs text-slate-500 mt-1">Place card on reader to auto-detect UID</p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Student Name *</label><input class="form-input" required placeholder="Enter name"></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Enrollment *</label><input class="form-input" required placeholder="2K22/CSE/101"></div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Department</label><select class="form-input">${MockData.departments.map(d=>'<option>'+d.code+'</option>').join('')}</select></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Card Type</label><select class="form-input"><option>Student</option><option>Faculty</option><option>Staff</option><option>Visitor</option></select></div>
      </div>
      <div><label class="block text-sm font-medium text-slate-700 mb-1">Face Enrollment</label>
        <div class="drop-zone py-4"><i class="fas fa-camera text-xl text-slate-400 mb-1"></i><p class="text-xs text-slate-500">Click to capture face photo for enrollment</p></div>
      </div>
      <div class="flex gap-3 justify-end"><button type="button" onclick="closeModal(event)" class="btn-secondary">Cancel</button><button type="submit" class="btn-primary"><i class="fas fa-check"></i> Register Card</button></div>
    </form>`);
}

function openReplaceCardModal(name, oldUid) {
  const newUid = 'RF-' + Math.random().toString(36).substr(2,8).toUpperCase();
  openModal(`
    <h3 class="text-lg font-bold text-slate-800 mb-4"><i class="fas fa-arrows-rotate text-amber-500 mr-2"></i>Replace RFID Card</h3>
    <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
      <strong>Student:</strong> ${name}<br><strong>Current Card:</strong> <span class="font-mono">${oldUid}</span> — will be deactivated
    </div>
    <form onsubmit="event.preventDefault();closeModal(event);showToast('Card replaced! Old card ${oldUid} deactivated.','success')" class="space-y-4">
      <div class="bg-terra-50 border border-terra-200 rounded-lg p-4 text-center">
        <p class="text-xs text-terra-600 mb-1">New Card UID</p>
        <p class="text-xl font-mono font-bold text-terra-800">${newUid}</p>
      </div>
      <div><label class="block text-sm font-medium text-slate-700 mb-1">Reason for Replacement *</label>
        <select class="form-input"><option>Card Lost</option><option>Card Damaged</option><option>Card Expired</option><option>Security Concern</option><option>Student Request</option></select></div>
      <div class="flex gap-3 justify-end"><button type="button" onclick="closeModal(event)" class="btn-secondary">Cancel</button><button type="submit" class="btn-primary"><i class="fas fa-arrows-rotate"></i> Replace Card</button></div>
    </form>`);
}
