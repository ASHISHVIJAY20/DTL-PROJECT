// ============================================
// SCANIT - Public Pages (Landing, Features, Pricing, Login)
// ============================================

function renderLanding(container) {
  container.innerHTML = `
  <!-- HERO -->
  <section class="hero-gradient min-h-screen flex items-center relative pt-16">
    <div class="hero-pattern"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="animate-fade-in">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span class="live-dot"></span>
            <span class="text-terra-300 text-sm font-medium">Live in 142+ Institutions</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Smart Attendance.<br>
            <span class="bg-gradient-to-r from-terra-400 to-amber-400 bg-clip-text text-transparent">Zero Proxies.</span>
          </h1>
          <p class="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
            Automate attendance using RFID + AI face verification with centralized reporting and analytics. Trusted by top universities across India.
          </p>
          <div class="flex flex-wrap gap-4 mb-10">
            <button onclick="navigateTo('pricing')" class="btn-primary text-base px-8 py-3">
              <i class="fas fa-rocket"></i> Request a Demo
            </button>
            <button onclick="navigateTo('features')" class="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-base px-8 py-3">
              <i class="fas fa-play-circle"></i> See How It Works
            </button>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="text-center"><div class="text-3xl font-bold text-white counter-value">80%</div><div class="text-xs text-slate-400 mt-1">Reduction in<br>Marking Time</div></div>
            <div class="text-center"><div class="text-3xl font-bold text-terra-400 counter-value">99.2%</div><div class="text-xs text-slate-400 mt-1">Verification<br>Accuracy</div></div>
            <div class="text-center"><div class="text-3xl font-bold text-amber-400 counter-value">12.4K</div><div class="text-xs text-slate-400 mt-1">Proxy Attempts<br>Blocked</div></div>
          </div>
        </div>
        <div class="hidden lg:flex justify-center animate-slide-right">
          <div class="relative">
            <div class="scan-visual animate-float" style="width:280px;height:280px;">
              <div class="scan-line-anim"></div>
              <div class="scan-crosshair"></div>
              <div class="scan-corner tl"></div><div class="scan-corner tr"></div>
              <div class="scan-corner bl"></div><div class="scan-corner br"></div>
              <div class="absolute inset-0 flex items-center justify-center"><i class="fas fa-face-smile text-terra-400/40 text-6xl"></i></div>
            </div>
            <div class="absolute -top-4 -right-4 glass-card-dark px-4 py-2 text-sm animate-float" style="animation-delay:0.5s">
              <i class="fas fa-wifi text-terra-400 mr-1"></i><span class="text-terra-400 font-semibold">RFID Connected</span>
            </div>
            <div class="absolute -bottom-4 -left-4 glass-card-dark px-4 py-2 text-sm animate-float" style="animation-delay:1s">
              <i class="fas fa-check-circle text-terra-400 mr-1"></i><span class="text-white font-semibold">98.7% Match</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TRUSTED BY -->
  <section class="py-12 bg-[#FFFDF9] border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <p class="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-8">Trusted by Leading Institutions</p>
      <div class="flex flex-wrap justify-center items-center gap-8 sm:gap-14 opacity-50">
        ${['Delhi Technical University','Mumbai Institute of Tech','Bangalore Engineering College','Hyderabad Central University','Pune College of Engineering'].map(n => `<span class="text-slate-600 font-semibold text-sm whitespace-nowrap">${n}</span>`).join('')}
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="py-20 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How Scanit Works</h2>
        <p class="text-slate-500 max-w-2xl mx-auto">A seamless 5-step verification process that takes under 2 seconds, ensuring accurate and proxy-free attendance.</p>
      </div>
      <div class="flex flex-wrap justify-center items-start gap-4">
        ${[
          { icon: 'fa-id-card', title: 'RFID Tap', desc: 'Student taps RFID card on reader', color: 'terra' },
          { icon: 'fa-camera', title: 'Face Capture', desc: 'Camera captures live photo', color: 'navy' },
          { icon: 'fa-brain', title: 'AI Matching', desc: 'Face matched against profile', color: 'amber' },
          { icon: 'fa-chart-simple', title: 'Score Check', desc: 'Confidence score evaluated', color: 'slate' },
          { icon: 'fa-circle-check', title: 'Status Marked', desc: 'Attendance verified or flagged', color: 'emerald' }
        ].map((s, i) => `
          <div class="feature-card text-center max-w-[180px] animate-fade-in stagger-${i+1}">
            <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-${s.color}-100 flex items-center justify-center">
              <i class="fas ${s.icon} text-${s.color}-600 text-xl"></i>
            </div>
            <div class="text-xs text-${s.color}-600 font-bold mb-1">STEP ${i+1}</div>
            <h4 class="font-semibold text-slate-800 text-sm mb-1">${s.title}</h4>
            <p class="text-xs text-slate-500">${s.desc}</p>
          </div>
          ${i < 4 ? '<div class="hidden sm:flex items-center text-slate-300 mt-10"><i class="fas fa-arrow-right text-lg"></i></div>' : ''}
        `).join('')}
      </div>
    </div>
  </section>

  <!-- KEY METRICS -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: 'fa-building-columns', value: '142+', label: 'Institutions', color: 'navy' },
          { icon: 'fa-microchip', value: '3,840', label: 'Active RFID Devices', color: 'terra' },
          { icon: 'fa-qrcode', value: '284K+', label: 'Daily Scans', color: 'amber' },
          { icon: 'fa-shield-halved', value: '99.97%', label: 'Platform Uptime', color: 'emerald' }
        ].map((m, i) => `
          <div class="feature-card text-center animate-fade-in stagger-${i+1}">
            <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-${m.color}-100 flex items-center justify-center">
              <i class="fas ${m.icon} text-${m.color}-600 text-2xl"></i>
            </div>
            <div class="text-3xl font-bold text-slate-900 mb-1">${m.value}</div>
            <div class="text-sm text-slate-500">${m.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 hero-gradient relative">
    <div class="hero-pattern"></div>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Eliminate Proxy Attendance?</h2>
      <p class="text-slate-300 mb-8 text-lg">Join 142+ institutions that trust Scanit for accurate, automated attendance management.</p>
      <div class="flex flex-wrap justify-center gap-4">
        <button onclick="navigateTo('pricing')" class="btn-primary text-base px-8 py-3"><i class="fas fa-rocket"></i> Start Free Trial</button>
        <button onclick="navigateTo('features')" class="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-base px-8 py-3"><i class="fas fa-phone"></i> Contact Sales</button>
      </div>
    </div>
  </section>`;
}

// ---- FEATURES PAGE ----
function renderFeatures(container) {
  container.innerHTML = `
  <div class="pt-16">
    <section class="hero-gradient py-20 relative">
      <div class="hero-pattern"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4 animate-fade-in">Powerful Features for Modern Campuses</h1>
        <p class="text-lg text-slate-300 max-w-2xl mx-auto animate-fade-in stagger-1">Everything you need to automate, monitor, and analyze attendance across your entire institution.</p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${[
          { icon: 'fa-id-card', title: 'RFID Device Management', desc: 'Register, monitor, and manage all RFID readers across your campus. Track firmware versions, signal strength, and real-time connectivity status from a central dashboard.', color: 'blue' },
          { icon: 'fa-brain', title: 'AI Face Verification', desc: 'Deep learning-powered face recognition engine with 99.2% accuracy. Automatic liveness detection prevents photo-based spoofing attempts and flags proxy attendance.', color: 'purple' },
          { icon: 'fa-bolt', title: 'Real-time Attendance Engine', desc: 'Sub-2-second verification pipeline from RFID tap to final status. Live session monitoring with instant status updates across all connected dashboards.', color: 'amber' },
          { icon: 'fa-chart-pie', title: 'Advanced Analytics & Reports', desc: 'Comprehensive reporting suite with daily, weekly, and departmental breakdowns. Export to PDF, Excel, or CSV. Automated defaulter tracking and warning systems.', color: 'emerald' },
          { icon: 'fa-users-gear', title: 'Role-Based Access Control', desc: 'Four-tier permission system: Super Admin, Institution Admin, Faculty, and Student. Each role gets a tailored dashboard with relevant data and controls.', color: 'indigo' },
          { icon: 'fa-shield-halved', title: 'Security & Compliance', desc: 'End-to-end data encryption, comprehensive audit trails, session timeout monitoring, and GDPR-compliant data handling. Enterprise-grade security for educational data.', color: 'red' },
          { icon: 'fa-building-columns', title: 'Multi-tenant Architecture', desc: 'Single platform serving multiple institutions with complete data isolation. Custom branding, individual configurations, and dedicated resource allocation per tenant.', color: 'teal' },
          { icon: 'fa-bell', title: 'Smart Notifications', desc: 'Automated alerts for low attendance, proxy attempts, device failures, and critical system events. Configurable thresholds and escalation policies.', color: 'orange' },
          { icon: 'fa-file-csv', title: 'Bulk Data Operations', desc: 'Import students via CSV uploads, export attendance reports in multiple formats. Bulk enrollment, RFID assignment, and face embedding management tools.', color: 'cyan' }
        ].map((f, i) => `
          <div class="feature-card animate-fade-in stagger-${(i%6)+1}">
            <div class="w-12 h-12 rounded-xl bg-${f.color}-100 flex items-center justify-center mb-4">
              <i class="fas ${f.icon} text-${f.color}-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-slate-800 mb-2">${f.title}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">${f.desc}</p>
          </div>
        `).join('')}
        </div>
      </div>
    </section>
  </div>`;
}

// ---- PRICING PAGE ----
function renderPricing(container) {
  const plans = MockData.plans;
  container.innerHTML = `
  <div class="pt-16">
    <section class="hero-gradient py-20 relative">
      <div class="hero-pattern"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4 animate-fade-in">Simple, Transparent Pricing</h1>
        <p class="text-lg text-slate-300 max-w-2xl mx-auto animate-fade-in stagger-1">Choose the plan that fits your institution. All plans include a 30-day free trial.</p>
      </div>
    </section>

    <section class="py-20 bg-slate-50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <div class="grid md:grid-cols-3 gap-8 mb-20">
          ${plans.map((p, i) => `
            <div class="pricing-card ${p.popular ? 'popular' : ''} animate-fade-in stagger-${i+1}">
              ${p.popular ? '<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-terra-600 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>' : ''}
              <h3 class="text-xl font-bold text-slate-800 mb-1">${p.name}</h3>
              <p class="text-sm text-slate-500 mb-4">${p.students} students · ${p.devices} devices</p>
              <div class="mb-6"><span class="text-4xl font-bold text-slate-900">${p.price}</span><span class="text-slate-500">${p.period}</span></div>
              <ul class="space-y-3 mb-8">${p.features.map(f => `<li class="flex items-start gap-2 text-sm text-slate-600"><i class="fas fa-check text-emerald-500 mt-0.5 text-xs"></i>${f}</li>`).join('')}</ul>
              <button onclick="showToast('Demo request submitted for ${p.name} plan!', 'success')" class="${p.popular ? 'btn-primary' : 'btn-secondary'} w-full justify-center">${p.popular ? 'Start Free Trial' : 'Contact Sales'}</button>
            </div>
          `).join('')}
        </div>

        <!-- Demo Request Form -->
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 animate-fade-in">
            <h2 class="text-2xl font-bold text-slate-800 mb-2 text-center">Request a Personalized Demo</h2>
            <p class="text-sm text-slate-500 text-center mb-8">Our team will walk you through the platform and answer your questions.</p>
            <form id="demo-form" onsubmit="handleDemoSubmit(event)" class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Full Name *</label><input type="text" class="form-input" placeholder="Dr. Sharma" required></div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Institution *</label><input type="text" class="form-input" placeholder="Delhi Technical University" required></div>
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Email *</label><input type="email" class="form-input" placeholder="admin@university.ac.in" required></div>
                <div><label class="block text-sm font-medium text-slate-700 mb-1">Phone</label><input type="tel" class="form-input" placeholder="+91 9876543210"></div>
              </div>
              <div><label class="block text-sm font-medium text-slate-700 mb-1">Student Count</label>
                <select class="form-input"><option>Under 1,000</option><option>1,000 - 5,000</option><option>5,000 - 15,000</option><option>15,000+</option></select>
              </div>
              <div><label class="block text-sm font-medium text-slate-700 mb-1">Message</label><textarea class="form-input" rows="3" placeholder="Tell us about your attendance challenges..."></textarea></div>
              <button type="submit" class="btn-primary w-full justify-center py-3 text-base"><i class="fas fa-paper-plane"></i> Submit Demo Request</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>`;
}

function handleDemoSubmit(e) {
  e.preventDefault();
  showToast('Demo request submitted successfully! Our team will contact you within 24 hours.', 'success');
  e.target.reset();
}

// ---- LOGIN PAGE ----
function renderLogin(container) {
  container.innerHTML = `
  <div class="hero-gradient min-h-screen flex items-center justify-center relative pt-16">
    <div class="hero-pattern"></div>
    <div class="w-full max-w-md mx-4 relative z-10 animate-fade-in">
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-terra-500 to-terra-300 rounded-xl flex items-center justify-center">
            <i class="fas fa-fingerprint text-2xl text-white"></i>
          </div>
          <h2 class="text-2xl font-bold text-slate-800">Sign in to Scanit</h2>
          <p class="text-sm text-slate-500 mt-1">Select a role to explore the dashboard</p>
        </div>
        <div class="space-y-3 mb-6">
          <input type="email" class="form-input" placeholder="Email address" value="admin@scanit.io">
          <input type="password" class="form-input" placeholder="Password" value="••••••••">
        </div>
        <p class="text-xs text-slate-400 text-center mb-4">Choose a role to enter the dashboard demo:</p>
        <div class="grid grid-cols-2 gap-3">
          <button onclick="switchRole('superadmin')" class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-200 hover:border-navy-500 hover:bg-navy-50 transition-all group">
            <i class="fas fa-shield-halved text-2xl text-navy-500 group-hover:scale-110 transition-transform"></i>
            <span class="text-sm font-semibold text-slate-700">Super Admin</span>
          </button>
          <button onclick="switchRole('institutionadmin')" class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-200 hover:border-terra-500 hover:bg-terra-50 transition-all group">
            <i class="fas fa-building-columns text-2xl text-terra-500 group-hover:scale-110 transition-transform"></i>
            <span class="text-sm font-semibold text-slate-700">Institution Admin</span>
          </button>
          <button onclick="switchRole('faculty')" class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50 transition-all group">
            <i class="fas fa-chalkboard-user text-2xl text-amber-500 group-hover:scale-110 transition-transform"></i>
            <span class="text-sm font-semibold text-slate-700">Faculty</span>
          </button>
          <button onclick="switchRole('student')" class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-200 hover:border-slate-500 hover:bg-slate-50 transition-all group">
            <i class="fas fa-user-graduate text-2xl text-slate-500 group-hover:scale-110 transition-transform"></i>
            <span class="text-sm font-semibold text-slate-700">Student</span>
          </button>
        </div>
      </div>
    </div>
  </div>`;
}
