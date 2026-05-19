// ============================================
// SCANIT - Mock Data Store
// ============================================

const MockData = {
  // ---- Platform Stats ----
  platformStats: {
    totalInstitutions: 142,
    activeDevices: 3840,
    dailyScans: 284500,
    uptime: 99.97,
    avgLatency: '1.2s',
    proxyBlocked: 12480,
    reductionInMarkingTime: 80,
    accuracyRate: 99.2
  },

  // ---- Institutions ----
  institutions: [
    { id: 'INST-001', name: 'Delhi Technical University', city: 'New Delhi', plan: 'Enterprise', status: 'Active', students: 12400, devices: 86, since: '2024-01-15', contact: 'registrar@dtu.ac.in', attendance: 87.3 },
    { id: 'INST-002', name: 'Mumbai Institute of Technology', city: 'Mumbai', plan: 'Professional', status: 'Active', students: 8200, devices: 54, since: '2024-03-22', contact: 'admin@mit.ac.in', attendance: 82.1 },
    { id: 'INST-003', name: 'Bangalore Engineering College', city: 'Bangalore', plan: 'Enterprise', status: 'Active', students: 9800, devices: 72, since: '2024-02-10', contact: 'office@bec.ac.in', attendance: 89.5 },
    { id: 'INST-004', name: 'Chennai Academy of Sciences', city: 'Chennai', plan: 'Starter', status: 'Inactive', students: 3200, devices: 18, since: '2024-06-01', contact: 'info@cas.ac.in', attendance: 74.8 },
    { id: 'INST-005', name: 'Kolkata National Institute', city: 'Kolkata', plan: 'Professional', status: 'Active', students: 6500, devices: 42, since: '2024-04-18', contact: 'admin@kni.ac.in', attendance: 85.6 },
    { id: 'INST-006', name: 'Hyderabad Central University', city: 'Hyderabad', plan: 'Enterprise', status: 'Active', students: 15200, devices: 98, since: '2023-11-05', contact: 'registrar@hcu.ac.in', attendance: 91.2 },
    { id: 'INST-007', name: 'Pune College of Engineering', city: 'Pune', plan: 'Professional', status: 'Active', students: 7100, devices: 48, since: '2024-05-12', contact: 'office@pce.ac.in', attendance: 83.9 },
    { id: 'INST-008', name: 'Jaipur Technical Academy', city: 'Jaipur', plan: 'Starter', status: 'Active', students: 2800, devices: 14, since: '2024-08-20', contact: 'admin@jta.ac.in', attendance: 78.4 }
  ],

  // ---- Departments ----
  departments: [
    { id: 'DEPT-01', name: 'Computer Science & Engineering', code: 'CSE', hod: 'Dr. Rajesh Kumar', faculty: 24, students: 840, rooms: 12 },
    { id: 'DEPT-02', name: 'Electronics & Communication', code: 'ECE', hod: 'Dr. Priya Sharma', faculty: 18, students: 620, rooms: 10 },
    { id: 'DEPT-03', name: 'Mechanical Engineering', code: 'ME', hod: 'Dr. Anil Verma', faculty: 20, students: 580, rooms: 8 },
    { id: 'DEPT-04', name: 'Information Technology', code: 'IT', hod: 'Dr. Sneha Patel', faculty: 16, students: 520, rooms: 9 },
    { id: 'DEPT-05', name: 'Civil Engineering', code: 'CE', hod: 'Dr. Vikram Singh', faculty: 14, students: 380, rooms: 7 },
    { id: 'DEPT-06', name: 'Electrical Engineering', code: 'EE', hod: 'Dr. Meena Gupta', faculty: 15, students: 440, rooms: 8 }
  ],

  // ---- Faculty ----
  faculty: [
    { id: 'FAC-001', name: 'Dr. Rajesh Kumar', dept: 'CSE', designation: 'Professor & HOD', email: 'rajesh.k@dtu.ac.in', classes: 4, subjects: ['Data Structures', 'Algorithms'] },
    { id: 'FAC-002', name: 'Prof. Anita Desai', dept: 'CSE', designation: 'Associate Professor', email: 'anita.d@dtu.ac.in', classes: 5, subjects: ['Database Systems', 'Software Engineering'] },
    { id: 'FAC-003', name: 'Dr. Sanjay Mehta', dept: 'CSE', designation: 'Assistant Professor', email: 'sanjay.m@dtu.ac.in', classes: 6, subjects: ['Operating Systems', 'Computer Networks'] },
    { id: 'FAC-004', name: 'Prof. Kavita Nair', dept: 'ECE', designation: 'Professor', email: 'kavita.n@dtu.ac.in', classes: 4, subjects: ['Digital Electronics', 'VLSI Design'] },
    { id: 'FAC-005', name: 'Dr. Amit Joshi', dept: 'IT', designation: 'Associate Professor', email: 'amit.j@dtu.ac.in', classes: 5, subjects: ['Web Technologies', 'Cloud Computing'] },
    { id: 'FAC-006', name: 'Prof. Ritu Agarwal', dept: 'ME', designation: 'Assistant Professor', email: 'ritu.a@dtu.ac.in', classes: 6, subjects: ['Thermodynamics', 'Fluid Mechanics'] }
  ],

  // ---- Students ----
  students: [
    { id: 'STU-001', name: 'Aarav Sharma', enrollment: '2K22/CSE/101', dept: 'CSE', semester: 4, rfidUid: 'RF-A7F3B2C1', faceStatus: 'Enrolled', attendance: 92.4, email: 'aarav.s@student.dtu.ac.in', phone: '9876543210' },
    { id: 'STU-002', name: 'Priya Patel', enrollment: '2K22/CSE/102', dept: 'CSE', semester: 4, rfidUid: 'RF-B8E4C3D2', faceStatus: 'Enrolled', attendance: 88.7, email: 'priya.p@student.dtu.ac.in', phone: '9876543211' },
    { id: 'STU-003', name: 'Rohan Gupta', enrollment: '2K22/CSE/103', dept: 'CSE', semester: 4, rfidUid: 'RF-C9D5E4F3', faceStatus: 'Pending', attendance: 67.2, email: 'rohan.g@student.dtu.ac.in', phone: '9876543212' },
    { id: 'STU-004', name: 'Ishita Verma', enrollment: '2K22/ECE/201', dept: 'ECE', semester: 4, rfidUid: 'RF-D0E6F5G4', faceStatus: 'Enrolled', attendance: 95.1, email: 'ishita.v@student.dtu.ac.in', phone: '9876543213' },
    { id: 'STU-005', name: 'Karthik Reddy', enrollment: '2K22/IT/301', dept: 'IT', semester: 4, rfidUid: 'RF-E1F7G6H5', faceStatus: 'Enrolled', attendance: 71.8, email: 'karthik.r@student.dtu.ac.in', phone: '9876543214' },
    { id: 'STU-006', name: 'Sneha Iyer', enrollment: '2K22/CSE/104', dept: 'CSE', semester: 4, rfidUid: 'RF-F2G8H7I6', faceStatus: 'Failed', attendance: 83.5, email: 'sneha.i@student.dtu.ac.in', phone: '9876543215' },
    { id: 'STU-007', name: 'Arjun Singh', enrollment: '2K22/ME/401', dept: 'ME', semester: 4, rfidUid: 'RF-G3H9I8J7', faceStatus: 'Enrolled', attendance: 90.3, email: 'arjun.s@student.dtu.ac.in', phone: '9876543216' },
    { id: 'STU-008', name: 'Divya Nair', enrollment: '2K22/CSE/105', dept: 'CSE', semester: 4, rfidUid: 'RF-H4I0J9K8', faceStatus: 'Enrolled', attendance: 56.4, email: 'divya.n@student.dtu.ac.in', phone: '9876543217' },
    { id: 'STU-009', name: 'Vikash Kumar', enrollment: '2K22/ECE/202', dept: 'ECE', semester: 4, rfidUid: 'RF-I5J1K0L9', faceStatus: 'Enrolled', attendance: 78.9, email: 'vikash.k@student.dtu.ac.in', phone: '9876543218' },
    { id: 'STU-010', name: 'Meera Joshi', enrollment: '2K22/IT/302', dept: 'IT', semester: 4, rfidUid: 'RF-J6K2L1M0', faceStatus: 'Enrolled', attendance: 94.6, email: 'meera.j@student.dtu.ac.in', phone: '9876543219' }
  ],

  // ---- RFID Devices ----
  devices: [
    { id: 'RDR-101', location: 'CSE Block - Room 201', ip: '192.168.1.101', firmware: 'v3.2.1', status: 'Online', lastPing: '2 min ago', scansToday: 342, institution: 'INST-001' },
    { id: 'RDR-102', location: 'CSE Block - Room 202', ip: '192.168.1.102', firmware: 'v3.2.1', status: 'Online', lastPing: '1 min ago', scansToday: 298, institution: 'INST-001' },
    { id: 'RDR-103', location: 'ECE Block - Room 101', ip: '192.168.1.103', firmware: 'v3.2.0', status: 'Online', lastPing: '3 min ago', scansToday: 276, institution: 'INST-001' },
    { id: 'RDR-104', location: 'IT Block - Lab 3', ip: '192.168.1.104', firmware: 'v3.1.8', status: 'Offline', lastPing: '47 min ago', scansToday: 0, institution: 'INST-001' },
    { id: 'RDR-105', location: 'ME Block - Room 301', ip: '192.168.1.105', firmware: 'v3.2.1', status: 'Online', lastPing: '1 min ago', scansToday: 189, institution: 'INST-001' },
    { id: 'RDR-106', location: 'Library - Entry Gate', ip: '192.168.1.106', firmware: 'v3.2.1', status: 'Online', lastPing: '30 sec ago', scansToday: 1247, institution: 'INST-001' },
    { id: 'RDR-107', location: 'Main Auditorium', ip: '192.168.1.107', firmware: 'v3.2.0', status: 'Maintenance', lastPing: '2 hrs ago', scansToday: 0, institution: 'INST-001' },
    { id: 'RDR-108', location: 'CSE Block - Lab 1', ip: '192.168.1.108', firmware: 'v3.2.1', status: 'Online', lastPing: '1 min ago', scansToday: 412, institution: 'INST-001' }
  ],

  // ---- Today's Classes (Faculty View) ----
  todaysClasses: [
    { id: 'CLS-01', subject: 'Data Structures', code: 'CS-301', room: 'CSE-201', time: '09:00 - 10:00', dept: 'CSE', semester: 4, totalStudents: 62, present: 58, status: 'Completed' },
    { id: 'CLS-02', subject: 'Algorithms', code: 'CS-302', room: 'CSE-202', time: '10:15 - 11:15', dept: 'CSE', semester: 4, totalStudents: 60, present: 55, status: 'In Progress' },
    { id: 'CLS-03', subject: 'Database Systems', code: 'CS-401', room: 'CSE-201', time: '11:30 - 12:30', dept: 'CSE', semester: 6, totalStudents: 58, present: 0, status: 'Upcoming' },
    { id: 'CLS-04', subject: 'Computer Networks', code: 'CS-303', room: 'IT-Lab3', time: '14:00 - 15:00', dept: 'CSE', semester: 4, totalStudents: 55, present: 0, status: 'Upcoming' }
  ],

  // ---- Attendance Records ----
  attendanceRecords: [
    { date: '2026-05-19', student: 'Aarav Sharma', enrollment: '2K22/CSE/101', subject: 'Data Structures', rfidTime: '08:58:23', faceMatch: 98.7, status: 'Verified', method: 'RFID + Face' },
    { date: '2026-05-19', student: 'Priya Patel', enrollment: '2K22/CSE/102', subject: 'Data Structures', rfidTime: '08:59:01', faceMatch: 96.2, status: 'Verified', method: 'RFID + Face' },
    { date: '2026-05-19', student: 'Rohan Gupta', enrollment: '2K22/CSE/103', subject: 'Data Structures', rfidTime: '09:02:45', faceMatch: 42.1, status: 'Failed', method: 'RFID + Face' },
    { date: '2026-05-19', student: 'Sneha Iyer', enrollment: '2K22/CSE/104', subject: 'Data Structures', rfidTime: '09:12:18', faceMatch: 94.8, status: 'Late', method: 'RFID + Face' },
    { date: '2026-05-19', student: 'Divya Nair', enrollment: '2K22/CSE/105', subject: 'Data Structures', rfidTime: null, faceMatch: null, status: 'Absent', method: 'N/A' },
    { date: '2026-05-18', student: 'Aarav Sharma', enrollment: '2K22/CSE/101', subject: 'Algorithms', rfidTime: '10:16:02', faceMatch: 97.3, status: 'Verified', method: 'RFID + Face' },
    { date: '2026-05-18', student: 'Priya Patel', enrollment: '2K22/CSE/102', subject: 'Algorithms', rfidTime: '10:14:55', faceMatch: 95.8, status: 'Verified', method: 'RFID + Face' },
    { date: '2026-05-18', student: 'Rohan Gupta', enrollment: '2K22/CSE/103', subject: 'Algorithms', rfidTime: '10:15:30', faceMatch: 91.4, status: 'Verified', method: 'RFID + Face' },
    { date: '2026-05-17', student: 'Aarav Sharma', enrollment: '2K22/CSE/101', subject: 'Data Structures', rfidTime: '09:00:12', faceMatch: 99.1, status: 'Verified', method: 'RFID + Face' },
    { date: '2026-05-17', student: 'Divya Nair', enrollment: '2K22/CSE/105', subject: 'Data Structures', rfidTime: '09:01:33', faceMatch: 38.2, status: 'Failed', method: 'RFID + Face' }
  ],

  // ---- Audit Logs ----
  auditLogs: [
    { timestamp: '2026-05-19 15:23:01', user: 'admin@dtu.ac.in', role: 'Institution Admin', action: 'Modified attendance threshold', details: 'Changed minimum from 70% to 75%', ip: '192.168.1.45', status: 'Success' },
    { timestamp: '2026-05-19 14:58:42', user: 'system', role: 'System', action: 'Auto-flagged proxy attempt', details: 'Student RF-C9D5E4F3 face mismatch score: 42.1%', ip: 'Internal', status: 'Alert' },
    { timestamp: '2026-05-19 14:12:08', user: 'rajesh.k@dtu.ac.in', role: 'Faculty', action: 'Manual override applied', details: 'Marked STU-003 present for CS-301 with justification', ip: '192.168.1.78', status: 'Override' },
    { timestamp: '2026-05-19 13:45:33', user: 'superadmin@scanit.io', role: 'Super Admin', action: 'Firmware push initiated', details: 'v3.2.1 pushed to 12 devices at INST-001', ip: '10.0.0.1', status: 'Success' },
    { timestamp: '2026-05-19 11:20:15', user: 'system', role: 'System', action: 'Device went offline', details: 'RDR-104 at IT Block - Lab 3 lost connection', ip: 'Internal', status: 'Warning' },
    { timestamp: '2026-05-19 10:05:44', user: 'admin@dtu.ac.in', role: 'Institution Admin', action: 'New student enrolled', details: 'Added 15 students via CSV bulk upload', ip: '192.168.1.45', status: 'Success' },
    { timestamp: '2026-05-19 09:30:00', user: 'system', role: 'System', action: 'Daily backup completed', details: 'Full database backup - 2.4GB encrypted', ip: 'Internal', status: 'Success' },
    { timestamp: '2026-05-18 22:00:00', user: 'system', role: 'System', action: 'Session cleanup', details: 'Terminated 34 expired sessions', ip: 'Internal', status: 'Success' }
  ],

  // ---- Subscription Plans ----
  plans: [
    { name: 'Starter', price: '₹15,000', period: '/month', students: 'Up to 1,000', devices: 'Up to 15', features: ['Basic RFID Attendance', 'Standard Reports', 'Email Support', '5 Admin Accounts', '99.5% Uptime SLA'], popular: false },
    { name: 'Professional', price: '₹35,000', period: '/month', students: 'Up to 5,000', devices: 'Up to 50', features: ['RFID + AI Face Verification', 'Advanced Analytics', 'Priority Support', '25 Admin Accounts', '99.9% Uptime SLA', 'API Access', 'Custom Branding'], popular: true },
    { name: 'Enterprise', price: '₹75,000', period: '/month', students: 'Unlimited', devices: 'Unlimited', features: ['Full Platform Access', 'Custom AI Thresholds', 'Dedicated Account Manager', 'Unlimited Admins', '99.99% Uptime SLA', 'Full API Access', 'White-label Option', 'On-premise Deployment'], popular: false }
  ],

  // ---- Weekly Trend Data ----
  weeklyTrend: [
    { day: 'Mon', attendance: 91, scans: 4520 },
    { day: 'Tue', attendance: 88, scans: 4380 },
    { day: 'Wed', attendance: 85, scans: 4210 },
    { day: 'Thu', attendance: 89, scans: 4450 },
    { day: 'Fri', attendance: 78, scans: 3890 },
    { day: 'Sat', attendance: 42, scans: 2100 }
  ],

  // ---- Department-wise Attendance ----
  deptAttendance: [
    { dept: 'CSE', percentage: 87 },
    { dept: 'ECE', percentage: 82 },
    { dept: 'ME', percentage: 79 },
    { dept: 'IT', percentage: 85 },
    { dept: 'CE', percentage: 76 },
    { dept: 'EE', percentage: 81 }
  ],

  // ---- Student Subject-wise (for student dashboard) ----
  subjectAttendance: [
    { subject: 'Data Structures', code: 'CS-301', attended: 28, total: 32, percentage: 87.5 },
    { subject: 'Algorithms', code: 'CS-302', attended: 30, total: 32, percentage: 93.8 },
    { subject: 'Database Systems', code: 'CS-401', attended: 22, total: 30, percentage: 73.3 },
    { subject: 'Computer Networks', code: 'CS-303', attended: 26, total: 31, percentage: 83.9 },
    { subject: 'Operating Systems', code: 'CS-304', attended: 29, total: 32, percentage: 90.6 }
  ],

  // ---- Classroom Live Session ----
  classroomSession: [
    { roll: 1, name: 'Aarav Sharma', enrollment: '2K22/CSE/101', rfid: '✓ 08:58', face: '98.7%', status: 'Verified', time: '08:58:23' },
    { roll: 2, name: 'Priya Patel', enrollment: '2K22/CSE/102', rfid: '✓ 08:59', face: '96.2%', status: 'Verified', time: '08:59:01' },
    { roll: 3, name: 'Rohan Gupta', enrollment: '2K22/CSE/103', rfid: '✓ 09:02', face: '42.1%', status: 'Failed', time: '09:02:45' },
    { roll: 4, name: 'Sneha Iyer', enrollment: '2K22/CSE/104', rfid: '✓ 09:12', face: '94.8%', status: 'Late', time: '09:12:18' },
    { roll: 5, name: 'Divya Nair', enrollment: '2K22/CSE/105', rfid: '—', face: '—', status: 'Absent', time: '—' },
    { roll: 6, name: 'Arjun Singh', enrollment: '2K22/ME/401', rfid: '✓ 08:57', face: '99.1%', status: 'Verified', time: '08:57:44' },
    { roll: 7, name: 'Meera Joshi', enrollment: '2K22/IT/302', rfid: '✓ 09:00', face: '97.5%', status: 'Verified', time: '09:00:08' },
    { roll: 8, name: 'Vikash Kumar', enrollment: '2K22/ECE/202', rfid: '✓ 09:01', face: '95.3%', status: 'Verified', time: '09:01:22' }
  ],

  // ---- Defaulters List ----
  defaulters: [
    { name: 'Divya Nair', enrollment: '2K22/CSE/105', dept: 'CSE', attendance: 56.4, threshold: 75, deficit: 18.6, proxyAttempts: 0 },
    { name: 'Rohan Gupta', enrollment: '2K22/CSE/103', dept: 'CSE', attendance: 67.2, threshold: 75, deficit: 7.8, proxyAttempts: 3 },
    { name: 'Karthik Reddy', enrollment: '2K22/IT/301', dept: 'IT', attendance: 71.8, threshold: 75, deficit: 3.2, proxyAttempts: 1 }
  ]
};
