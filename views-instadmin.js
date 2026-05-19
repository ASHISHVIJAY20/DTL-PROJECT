// ============================================
// SCANIT - Institution Admin Dashboard Views
// ============================================

function renderIACommand(container) {
  const devs = MockData.devices;
  const onlineDevs = devs.filter(d => d.status === 'Online').length;
  const totalScans = devs.reduce((s, d) => s + d.scansToday, 0);
  const lowAttStudents = MockData.students.filter(s => s.attendance < 75);

  container.innerHTML = `<div class="p-6 space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${widget('fa-users', 'navy', "Today's Attendance", '87.3%', '3,240 of 3,712 students present')}
      ${widget('fa-hard-drive', 'emerald', 'Active Hardware', onlineDevs + '/' + devs.length, totalScans.toLocaleString() + ' scans today')}
      ${widget('fa-triangle-exclamation', 'amber', 'Low Attendance Alerts', lowAttStudents.length, 'Below 75% threshold')}
      ${widget('fa-user-xmark', 'red', 'Proxy Attempts', '7', 'Blocked today')}
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Department-wise Chart -->
      <div class="dash-widget lg:col-span-2 animate-fade-in">
        <h3 class="font-semibold text-slate-800 mb-4">Department-wise Attendance Today</h3>
        <div class="space-y-3">
          ${MockData.deptAttendance.map(d => `
            <div class="flex items-center gap-4">
              <span class="text-sm font-semibold text-slate-700 w-12">${d.dept}</span>
              <div class="flex-1 progress-bar h-6 rounded-lg">
                <div class="progress-bar-fill rounded-lg bg-gradient-to-r ${d.percentage >= 85 ? 'from-emerald-500 to-emerald-400' : d.percentage >= 75 ? 'from-amber-500 to-amber-400' : 'from-red-500 to-red-400'} flex items-center justify-end pr-2" style="width:${d.percentage}%">
                  <span class="text-xs font-bold text-white">${d.percentage}%</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Low Attendance Warnings -->
      <div class="dash-widget animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-slate-800">⚠️ Low Attendance Warnings</h3>
          <span class="badge badge-danger">${lowAttStudents.length} students</span>
        </div>
        <div class="space-y-3">
          ${lowAttStudents.map(s => `
            <div class="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
              <div class="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">${s.name.split(' ').map(n=>n[0]).join('')}</div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-semibold text-slate-800 truncate">${s.name}</div>
                <div class="text-xs text-slate-500">${s.enrollment} · ${s.dept}</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-red-600">${s.attendance}%</div>
                <div class="text-[10px] text-red-500">Below 75%</div>
              </div>
            </div>
          `).join('')}
          ${lowAttStudents.length === 0 ? '<p class="text-sm text-slate-500 text-center py-4">No warnings</p>' : ''}
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="dash-widget animate-fade-in">
      <h3 class="font-semibold text-slate-800 mb-4">Recent Attendance Activity</h3>
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>Time</th><th>Student</th><th>Subject</th><th>RFID</th><th>Face Match</th><th>Status</th>
      </tr></thead><tbody>
        ${MockData.attendanceRecords.filter(r => r.date === '2026-05-19').map(r => `<tr>
          <td class="font-mono text-xs">${r.rfidTime || '—'}</td>
          <td class="font-medium">${r.student}</td>
          <td>${r.subject}</td>
          <td>${r.rfidTime ? '<i class="fas fa-check-circle text-emerald-500"></i>' : '<i class="fas fa-times-circle text-red-400"></i>'}</td>
          <td>${r.faceMatch ? `<span class="${r.faceMatch >= 85 ? 'text-emerald-600' : 'text-red-600'} font-semibold">${r.faceMatch}%</span>` : '—'}</td>
          <td>${statusBadge(r.status)}</td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

// ---- ACADEMIC DIRECTORY ----
let academicTab = 'departments';

function renderIAAcademic(container) {
  container.innerHTML = `<div class="p-6 space-y-6">
    <!-- Tabs -->
    <div class="tab-nav">
      <button class="tab-btn ${academicTab==='departments'?'active':''}" onclick="academicTab='departments';renderIAAcademic(document.getElementById('main-content'))">
        <i class="fas fa-building mr-1"></i> Departments & Faculty
      </button>
      <button class="tab-btn ${academicTab==='students'?'active':''}" onclick="academicTab='students';renderIAAcademic(document.getElementById('main-content'))">
        <i class="fas fa-user-graduate mr-1"></i> Student Profiles
      </button>
    </div>
    <div id="academic-content"></div>
  </div>`;

  const content = document.getElementById('academic-content');
  if (academicTab === 'departments') renderDeptTab(content);
  else renderStudentTab(content);
}

function renderDeptTab(el) {
  el.innerHTML = `
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      ${MockData.departments.map(d => `
        <div class="dash-widget animate-fade-in">
          <div class="flex items-center justify-between mb-3">
            <span class="badge badge-info">${d.code}</span>
            <span class="text-xs text-slate-500">${d.rooms} rooms</span>
          </div>
          <h4 class="font-semibold text-slate-800 text-sm mb-2">${d.name}</h4>
          <div class="text-xs text-slate-500 mb-3">HOD: ${d.hod}</div>
          <div class="grid grid-cols-2 gap-2 text-center">
              <div class="bg-navy-50 rounded-lg p-2"><div class="text-lg font-bold text-navy-700">${d.faculty}</div><div class="text-[10px] text-navy-500">Faculty</div></div>
            <div class="bg-terra-50 rounded-lg p-2"><div class="text-lg font-bold text-terra-700">${d.students}</div><div class="text-[10px] text-terra-500">Students</div></div>
          </div>
        </div>
      `).join('')}
    </div>
    <!-- Faculty Table -->
    <div class="dash-widget p-0 overflow-hidden animate-fade-in">
      <div class="p-4 border-b border-slate-100"><h3 class="font-semibold text-slate-800">Faculty Directory</h3></div>
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>ID</th><th>Name</th><th>Department</th><th>Designation</th><th>Email</th><th>Classes/Day</th><th>Subjects</th>
      </tr></thead><tbody>
        ${MockData.faculty.map(f => `<tr>
          <td class="font-mono text-xs text-slate-500">${f.id}</td>
          <td class="font-medium">${f.name}</td>
          <td><span class="badge badge-info">${f.dept}</span></td>
          <td class="text-xs">${f.designation}</td>
          <td class="text-xs text-blue-600">${f.email}</td>
          <td class="text-center font-semibold">${f.classes}</td>
          <td class="text-xs">${f.subjects.join(', ')}</td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>`;
}

function renderStudentTab(el) {
  el.innerHTML = `
    <div class="flex flex-col sm:flex-row justify-between gap-4 mb-4">
      <div class="flex gap-2">
        <input type="text" class="form-input w-64" placeholder="Search students..." oninput="filterStudents(this.value)">
        <select class="form-input w-auto"><option>All Departments</option>${MockData.departments.map(d=>`<option>${d.code}</option>`).join('')}</select>
      </div>
      <div class="flex gap-2">
        <button onclick="openAddStudentModal()" class="btn-primary btn-sm"><i class="fas fa-plus"></i> Add Student</button>
        <button onclick="showToast('CSV upload interface ready', 'info')" class="btn-secondary btn-sm"><i class="fas fa-file-csv"></i> Bulk Upload</button>
      </div>
    </div>

    <!-- Drag & Drop CSV Zone -->
    <div class="drop-zone mb-6 animate-fade-in" id="csv-drop-zone"
      ondragover="event.preventDefault(); this.classList.add('drag-over')"
      ondragleave="this.classList.remove('drag-over')"
      ondrop="event.preventDefault(); this.classList.remove('drag-over'); showToast('CSV file received! Processing 150 student records...', 'success')">
      <i class="fas fa-cloud-arrow-up text-3xl text-slate-400 mb-2"></i>
      <p class="text-sm font-medium text-slate-600">Drag & drop CSV file here for bulk student upload</p>
      <p class="text-xs text-slate-400 mt-1">Required fields: Enrollment Number, Name, Department, RFID UID, Face Embedding Status</p>
    </div>

    <!-- Students Table -->
    <div class="dash-widget p-0 overflow-hidden animate-fade-in">
      <div class="overflow-x-auto"><table class="data-table" id="students-table"><thead><tr>
        <th>Enrollment</th><th>Name</th><th>Department</th><th>Sem</th><th>RFID UID</th><th>Face Status</th><th>Attendance</th><th>Actions</th>
      </tr></thead><tbody>
        ${MockData.students.map(s => `<tr>
          <td class="font-mono text-xs">${s.enrollment}</td>
          <td class="font-medium">${s.name}</td>
          <td><span class="badge badge-info">${s.dept}</span></td>
          <td class="text-center">${s.semester}</td>
          <td class="font-mono text-xs text-blue-600">${s.rfidUid}</td>
          <td>${statusBadge(s.faceStatus)}</td>
          <td><span class="font-semibold ${s.attendance>=75?'text-emerald-600':s.attendance>=60?'text-amber-600':'text-red-600'}">${s.attendance}%</span></td>
          <td><button onclick="showToast('Editing ${s.name}', 'info')" class="text-blue-600 hover:text-blue-800 text-xs mr-2"><i class="fas fa-pen"></i></button>
          <button onclick="showToast('${s.name} profile opened', 'info')" class="text-slate-400 hover:text-slate-600 text-xs"><i class="fas fa-eye"></i></button></td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>`;
}

function filterStudents(q) {
  document.querySelectorAll('#students-table tbody tr').forEach(r => {
    r.style.display = r.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none';
  });
}

function openAddStudentModal() {
  openModal(`
    <h3 class="text-lg font-bold text-slate-800 mb-4"><i class="fas fa-user-plus text-blue-500 mr-2"></i>Add New Student</h3>
    <form onsubmit="event.preventDefault();closeModal(event);showToast('Student added successfully!','success')" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Full Name *</label><input class="form-input" required placeholder="Aarav Sharma"></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Enrollment No. *</label><input class="form-input" required placeholder="2K22/CSE/101"></div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Department</label><select class="form-input">${MockData.departments.map(d=>`<option>${d.code}</option>`).join('')}</select></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Semester</label><select class="form-input">${[1,2,3,4,5,6,7,8].map(s=>`<option>${s}</option>`).join('')}</select></div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Assigned RFID UID *</label><input class="form-input" required placeholder="RF-XXXXXXXX"></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Face Embedding</label><select class="form-input"><option>Pending</option><option>Enrolled</option></select></div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Email</label><input type="email" class="form-input" placeholder="student@dtu.ac.in"></div>
        <div><label class="block text-sm font-medium text-slate-700 mb-1">Phone</label><input type="tel" class="form-input" placeholder="+91 9876543210"></div>
      </div>
      <div class="flex gap-3 justify-end pt-2"><button type="button" onclick="closeModal(event)" class="btn-secondary">Cancel</button><button type="submit" class="btn-primary"><i class="fas fa-check"></i> Add Student</button></div>
    </form>
  `);
}

// ---- DEVICE OPERATIONS ----
function renderIADevices(container) {
  const devs = MockData.devices;
  container.innerHTML = `<div class="p-6 space-y-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${widget('fa-server', 'navy', 'Total Readers', devs.length, 'Registered on campus')}
      ${widget('fa-signal', 'terra', 'Online Now', devs.filter(d=>d.status==='Online').length, 'Last checked: just now')}
      ${widget('fa-triangle-exclamation', 'red', 'Offline', devs.filter(d=>d.status==='Offline').length, 'Requires attention')}
      ${widget('fa-wrench', 'amber', 'Under Maintenance', devs.filter(d=>d.status==='Maintenance').length, 'Scheduled service')}
    </div>

    <div class="dash-widget p-0 overflow-hidden animate-fade-in">
      <div class="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-semibold text-slate-800"><i class="fas fa-satellite-dish text-terra-500 mr-2"></i>Live Device Status Monitor</h3>
        <div class="flex items-center gap-2 text-xs text-emerald-600 font-medium"><span class="pulse-live w-4 h-4 rounded-full inline-block"></span> Live Updating</div>
      </div>
      <div class="overflow-x-auto"><table class="data-table"><thead><tr>
        <th>Reader UID</th><th>Classroom / Location</th><th>IP Address</th><th>Firmware</th><th>Status</th><th>Last Ping</th><th>Scans Today</th><th>Actions</th>
      </tr></thead><tbody>
        ${devs.map(d => `<tr>
          <td class="font-mono font-semibold text-blue-700">${d.id}</td>
          <td><i class="fas fa-location-dot text-slate-400 mr-1"></i>${d.location}</td>
          <td class="font-mono text-xs">${d.ip}</td>
          <td><span class="badge badge-neutral">${d.firmware}</span></td>
          <td><span class="flex items-center gap-1.5"><span class="status-dot ${d.status.toLowerCase()}"></span>${statusBadge(d.status)}</span></td>
          <td class="text-xs text-slate-500">${d.lastPing}</td>
          <td class="font-semibold">${d.scansToday.toLocaleString()}</td>
          <td><button onclick="showToast('Pinging ${d.id}...', 'info')" class="btn-secondary btn-sm"><i class="fas fa-satellite-dish"></i></button></td>
        </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}
