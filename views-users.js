// ============================================
// SCANIT - Faculty & Student Portal Views
// ============================================

// ---- FACULTY: DAILY WORKSPACE ----
function renderFWorkspace(container) {
  const classes = MockData.todaysClasses;
  const failedRecords = MockData.attendanceRecords.filter(r => r.status === 'Failed' && r.date === '2026-05-19');

  container.innerHTML = `<div class="p-6 space-y-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${widget('fa-calendar-day', 'navy', "Today's Classes", classes.length, 'Mon, 19 May 2026')}
      ${widget('fa-check-double', 'emerald', 'Completed', classes.filter(c=>c.status==='Completed').length, 'Sessions finished')}
      ${widget('fa-spinner', 'amber', 'In Progress', classes.filter(c=>c.status==='In Progress').length, 'Currently active')}
      ${widget('fa-user-xmark', 'red', 'Pending Overrides', failedRecords.length, 'Verification failures')}
    </div>

    <!-- Today's Classes -->
    <div class="dash-widget animate-fade-in">
      <h3 class="font-semibold text-slate-800 mb-4"><i class="fas fa-chalkboard text-terra-500 mr-2"></i>Today's Assigned Classes</h3>
      <div class="grid sm:grid-cols-2 gap-4">
        ${classes.map(c => {
          const pct = c.totalStudents > 0 ? ((c.present/c.totalStudents)*100).toFixed(0) : 0;
          const color = c.status === 'Completed' ? 'emerald' : c.status === 'In Progress' ? 'blue' : 'slate';
          return `
          <div class="p-4 rounded-xl border-2 border-${color}-200 bg-${color}-50/50 transition-all hover:shadow-md">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-semibold text-slate-800">${c.subject}</h4>
                <p class="text-xs text-slate-500">${c.code} · ${c.dept} Sem ${c.semester}</p>
              </div>
              ${statusBadge(c.status)}
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-3">
              <span><i class="fas fa-clock mr-1"></i>${c.time}</span>
              <span><i class="fas fa-location-dot mr-1"></i>${c.room}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 flex-1">
                <div class="progress-bar flex-1 h-3">
                  <div class="progress-bar-fill bg-${color}-500" style="width:${c.status==='Upcoming'?'0':pct}%"></div>
                </div>
                <span class="text-xs font-bold text-${color}-700">${c.status==='Upcoming'?'—':pct+'%'}</span>
              </div>
              <span class="text-xs text-slate-500 ml-3">${c.present}/${c.totalStudents}</span>
            </div>
            ${c.status === 'In Progress' ? `<button onclick="navigateTo('f-classroom')" class="btn-primary btn-sm w-full mt-3 justify-center"><i class="fas fa-desktop"></i> Open Live Monitor</button>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Pending Verification Failures -->
    <div class="dash-widget animate-fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-slate-800"><i class="fas fa-exclamation-circle text-red-500 mr-2"></i>Pending Verification Failures</h3>
        <span class="badge badge-danger">${failedRecords.length} pending</span>
      </div>
      ${failedRecords.length > 0 ? `
      <div class="space-y-3">
        ${failedRecords.map(r => `
          <div class="flex items-center gap-4 p-3 bg-red-50 border border-red-100 rounded-lg">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><i class="fas fa-user-xmark text-red-600"></i></div>
            <div class="flex-1">
              <div class="text-sm font-semibold text-slate-800">${r.student}</div>
              <div class="text-xs text-slate-500">${r.enrollment} · Face score: <span class="text-red-600 font-semibold">${r.faceMatch}%</span> · ${r.subject}</div>
            </div>
            <div class="flex gap-2">
              <button onclick="showToast('${r.student} manually marked present', 'success')" class="btn-success btn-sm"><i class="fas fa-check"></i> Override</button>
              <button onclick="showToast('${r.student} remains marked as failed', 'warning')" class="btn-danger btn-sm"><i class="fas fa-times"></i> Reject</button>
            </div>
          </div>
        `).join('')}
      </div>` : '<p class="text-sm text-slate-500 text-center py-4">No pending verification failures.</p>'}
    </div>
  </div>`;
}

// ---- FACULTY: CLASSROOM MONITOR ----
function renderFClassroom(container) {
  const session = MockData.classroomSession;
  const cls = MockData.todaysClasses.find(c => c.status === 'In Progress') || MockData.todaysClasses[1];
  const verified = session.filter(s => s.status === 'Verified').length;
  const failed = session.filter(s => s.status === 'Failed').length;
  const late = session.filter(s => s.status === 'Late').length;
  const absent = session.filter(s => s.status === 'Absent').length;

  container.innerHTML = `<div class="p-6 space-y-6">
    <!-- Session Header -->
    <div class="dash-widget bg-gradient-to-r from-navy-600 to-navy-800 text-white border-none animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1"><span class="pulse-live w-4 h-4 rounded-full inline-block"></span><span class="text-navy-200 text-sm font-medium">Live Session</span></div>
          <h2 class="text-xl font-bold">${cls.subject} (${cls.code})</h2>
          <p class="text-navy-200 text-sm">${cls.room} · ${cls.time} · ${cls.dept} Sem ${cls.semester}</p>
        </div>
        <div class="flex gap-3">
          <div class="text-center bg-white/15 rounded-lg px-4 py-2"><div class="text-2xl font-bold">${verified}</div><div class="text-xs text-blue-200">Verified</div></div>
          <div class="text-center bg-white/15 rounded-lg px-4 py-2"><div class="text-2xl font-bold text-red-300">${failed}</div><div class="text-xs text-blue-200">Failed</div></div>
          <div class="text-center bg-white/15 rounded-lg px-4 py-2"><div class="text-2xl font-bold text-amber-300">${late}</div><div class="text-xs text-blue-200">Late</div></div>
          <div class="text-center bg-white/15 rounded-lg px-4 py-2"><div class="text-2xl font-bold text-slate-300">${absent}</div><div class="text-xs text-blue-200">Absent</div></div>
        </div>
      </div>
    </div>

    <!-- Student Status Table -->
    <div class="dash-widget p-0 overflow-hidden animate-fade-in">
      <div class="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-semibold text-slate-800">Student Attendance Status</h3>
        <div class="flex items-center gap-2 text-xs text-emerald-600"><span class="pulse-live w-3 h-3 rounded-full inline-block"></span> Auto-refreshing</div>
      </div>
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>#</th><th>Student Name</th><th>Enrollment</th><th>RFID Tap</th><th>Face Match</th><th>Time</th><th>Status</th><th>Actions</th>
      </tr></thead><tbody>
        ${session.map(s => `<tr>
          <td class="text-center font-semibold text-slate-500">${s.roll}</td>
          <td class="font-medium text-slate-800">${s.name}</td>
          <td class="font-mono text-xs">${s.enrollment}</td>
          <td>${s.rfid.includes('✓') ? '<span class="text-emerald-600">'+s.rfid+'</span>' : '<span class="text-slate-400">'+s.rfid+'</span>'}</td>
          <td class="font-semibold ${parseFloat(s.face)>=85?'text-emerald-600':parseFloat(s.face)>=50?'text-amber-600': s.face==='—'?'text-slate-400':'text-red-600'}">${s.face}</td>
          <td class="font-mono text-xs text-slate-500">${s.time}</td>
          <td>${statusBadge(s.status)}</td>
          <td>
            ${s.status === 'Failed' ? `<button onclick="showToast('Manual override applied for ${s.name}','success')" class="btn-success btn-sm"><i class="fas fa-user-check"></i> Override</button>` : 
              s.status === 'Absent' ? `<button onclick="showToast('${s.name} manually marked present','success')" class="btn-secondary btn-sm"><i class="fas fa-plus"></i> Mark Present</button>` : 
              '<span class="text-xs text-slate-400">—</span>'}
          </td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

// ---- STUDENT: PERSONAL DASHBOARD ----
function renderSTDashboard(container) {
  const student = MockData.students[0];
  const subjects = MockData.subjectAttendance;
  const overallPct = (subjects.reduce((s,x)=>s+x.percentage,0)/subjects.length).toFixed(1);
  const belowThreshold = overallPct < 75;

  container.innerHTML = `<div class="p-6 space-y-6">
    <!-- Welcome Banner -->
    <div class="dash-widget bg-gradient-to-r from-navy-600 to-navy-700 text-white border-none animate-fade-in">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">AS</div>
        <div>
          <h2 class="text-xl font-bold">Welcome back, ${student.name}!</h2>
          <p class="text-navy-200 text-sm">${student.enrollment} · ${student.dept} · Semester ${student.semester}</p>
        </div>
      </div>
    </div>

    ${belowThreshold ? `
    <div class="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
      <i class="fas fa-triangle-exclamation text-red-500 text-xl mt-0.5"></i>
      <div>
        <h4 class="font-bold text-red-800">Attendance Warning!</h4>
        <p class="text-sm text-red-700">Your overall attendance is <strong>${overallPct}%</strong>, which is below the required <strong>75%</strong>. Please attend upcoming classes to avoid being debarred from examinations.</p>
      </div>
    </div>` : ''}

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${widget('fa-chart-pie', 'navy', 'Overall Attendance', overallPct + '%', belowThreshold ? '⚠️ Below threshold' : '✅ Above threshold')}
      ${widget('fa-book-open', 'terra', 'Total Subjects', subjects.length, 'This semester')}
      ${widget('fa-id-card', 'amber', 'RFID Card', student.rfidUid, statusBadge(student.faceStatus))}
      ${widget('fa-calendar-check', 'emerald', 'Classes Attended', subjects.reduce((s,x)=>s+x.attended,0), 'of ' + subjects.reduce((s,x)=>s+x.total,0) + ' total')}
    </div>

    <!-- Subject-wise Breakdown -->
    <div class="dash-widget animate-fade-in">
      <h3 class="font-semibold text-slate-800 mb-4"><i class="fas fa-chart-bar text-terra-500 mr-2"></i>Subject-wise Attendance</h3>
      <div class="space-y-4">
        ${subjects.map(s => {
          const color = s.percentage >= 85 ? 'emerald' : s.percentage >= 75 ? 'blue' : s.percentage >= 60 ? 'amber' : 'red';
          return `
          <div>
            <div class="flex justify-between items-center mb-1.5">
              <div><span class="text-sm font-semibold text-slate-800">${s.subject}</span><span class="text-xs text-slate-400 ml-2">(${s.code})</span></div>
              <div class="text-sm"><span class="font-bold text-${color}-600">${s.percentage}%</span><span class="text-xs text-slate-400 ml-2">${s.attended}/${s.total}</span></div>
            </div>
            <div class="progress-bar h-4 rounded-lg">
              <div class="progress-bar-fill rounded-lg bg-gradient-to-r from-${color}-500 to-${color}-400" style="width:${s.percentage}%"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

// ---- STUDENT: HISTORY LOGS ----
function renderSTHistory(container) {
  const records = MockData.attendanceRecords.filter(r => r.student === 'Aarav Sharma');

  container.innerHTML = `<div class="p-6 space-y-6">
    <div class="flex flex-col sm:flex-row justify-between gap-4">
      <div><h3 class="text-lg font-bold text-slate-800">Attendance History</h3><p class="text-sm text-slate-500">${records.length} records found</p></div>
      <div class="flex gap-2">
        <input type="date" class="form-input w-auto" value="2026-05-01">
        <input type="date" class="form-input w-auto" value="2026-05-19">
        <button class="btn-secondary btn-sm"><i class="fas fa-filter"></i> Filter</button>
      </div>
    </div>

    <div class="dash-widget p-0 overflow-hidden animate-fade-in">
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>Date</th><th>Subject</th><th>RFID Tap Time</th><th>Face Match Score</th><th>Verification Method</th><th>Status</th><th>Actions</th>
      </tr></thead><tbody>
        ${records.map(r => `<tr>
          <td class="font-medium">${r.date}</td>
          <td>${r.subject}</td>
          <td class="font-mono text-xs">${r.rfidTime || '—'}</td>
          <td class="font-semibold ${r.faceMatch>=85?'text-emerald-600':r.faceMatch>=50?'text-amber-600':'text-red-600'}">${r.faceMatch ? r.faceMatch+'%' : '—'}</td>
          <td><span class="badge badge-neutral">${r.method}</span></td>
          <td>${statusBadge(r.status)}</td>
          <td>${r.status === 'Failed' || r.status === 'Absent' ? `<button onclick="openDisputeModal('${r.date}','${r.subject}')" class="btn-secondary btn-sm text-xs"><i class="fas fa-flag"></i> Raise Dispute</button>` : '<span class="text-xs text-slate-400">—</span>'}</td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

function openDisputeModal(date, subject) {
  openModal(`
    <h3 class="text-lg font-bold text-slate-800 mb-4"><i class="fas fa-flag text-amber-500 mr-2"></i>Raise Attendance Dispute</h3>
    <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
      <strong>Subject:</strong> ${subject} · <strong>Date:</strong> ${date}
    </div>
    <form onsubmit="event.preventDefault();closeModal(event);showToast('Dispute submitted. You will be notified within 48 hours.','success')" class="space-y-4">
      <div><label class="block text-sm font-medium text-slate-700 mb-1">Reason for Dispute *</label>
        <select class="form-input"><option>I was present but not marked</option><option>RFID reader malfunction</option><option>Face verification failed incorrectly</option><option>Late entry not recorded</option><option>Other</option></select>
      </div>
      <div><label class="block text-sm font-medium text-slate-700 mb-1">Details</label><textarea class="form-input" rows="3" placeholder="Provide additional context..." required></textarea></div>
      <div class="flex gap-3 justify-end pt-2"><button type="button" onclick="closeModal(event)" class="btn-secondary">Cancel</button><button type="submit" class="btn-primary"><i class="fas fa-paper-plane"></i> Submit Dispute</button></div>
    </form>
  `);
}
