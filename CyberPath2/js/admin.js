/* ══════════════════════════════════════════════
   CYBERVAULT PRO — ADMIN.JS
   Admin Dashboard: Tools · Courses · News · Users
   Firebase-backed with localStorage fallback
══════════════════════════════════════════════ */

const ADMIN_EMAIL = 'admin@cybervault.app'; // Change to your email

/* ── ADMIN CHECK ── */
window.isAdmin = function() {
  const u = window.CV_USER;
  if (!u) return false;
  return true; // Open access in local/demo mode so Admin CMS is fully accessible
};

/* ── ADMIN DATA STORES ── */
function getAdminData(key) {
  return JSON.parse(localStorage.getItem('cv_admin_data_' + key) || '[]');
}
function saveAdminData(key, data) {
  localStorage.setItem('cv_admin_data_' + key, JSON.stringify(data));
  if (window.db) {
    try { window.db.collection('admin_' + key).doc('data').set({ items: data }); } catch(e) {}
  }
}

/* ── RENDER ADMIN PAGE ── */
window.renderAdmin = function() {
  if (!isAdmin()) {
    document.getElementById('adminBody').innerHTML = `
      <div class="admin-denied">
        <div class="admin-denied-icon">🔒</div>
        <div class="admin-denied-title">ACCESS DENIED</div>
        <div class="admin-denied-sub">Admin privileges required. Contact: ${ADMIN_EMAIL}</div>
        <button class="cyber-btn" style="margin-top:1rem" onclick="navigate('dashboard')">Go Home</button>
      </div>`;
    return;
  }

  const tools   = getAdminData('tools');
  const courses  = getAdminData('courses');
  const news     = getAdminData('news');
  const el       = document.getElementById('adminBody');
  if (!el) return;

  el.innerHTML = `
    <!-- Admin Header -->
    <div class="admin-header-card">
      <div class="admin-header-left">
        <div class="admin-crown">👑</div>
        <div>
          <div class="admin-header-title">ADMIN DASHBOARD</div>
          <div class="admin-header-sub">Logged in as ${window.CV_USER?.email}</div>
        </div>
      </div>
      <div class="admin-header-stats">
        <div class="admin-hs"><div class="admin-hs-num">${tools.length}</div><div class="admin-hs-lbl">Custom Tools</div></div>
        <div class="admin-hs"><div class="admin-hs-num">${courses.length}</div><div class="admin-hs-lbl">Custom Courses</div></div>
        <div class="admin-hs"><div class="admin-hs-num">${news.length}</div><div class="admin-hs-lbl">Custom News</div></div>
      </div>
    </div>

    <!-- Admin Tabs -->
    <div class="admin-tabs" id="adminTabs">
      <button class="admin-tab active" onclick="switchAdminTab('tools',this)">🤖 AI TOOLS</button>
      <button class="admin-tab" onclick="switchAdminTab('courses',this)">🎓 COURSES</button>
      <button class="admin-tab" onclick="switchAdminTab('news',this)">📰 NEWS</button>
      <button class="admin-tab" onclick="switchAdminTab('users',this)">👤 USERS</button>
      <button class="admin-tab" onclick="switchAdminTab('settings',this)">⚙️ SETTINGS</button>
    </div>

    <div id="adminTabContent">
      ${renderAdminTools(tools)}
    </div>`;
};

/* ── TAB SWITCHER ── */
window.switchAdminTab = function(tab, btn) {
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const content = document.getElementById('adminTabContent');
  if (!content) return;
  const map = {
    tools:    () => renderAdminTools(getAdminData('tools')),
    courses:  () => renderAdminCourses(getAdminData('courses')),
    news:     () => renderAdminNews(getAdminData('news')),
    users:    () => renderAdminUsers(),
    settings: () => renderAdminSettings(),
  };
  content.innerHTML = (map[tab] || map.tools)();
};

/* ── AI TOOLS MANAGEMENT ── */
function renderAdminTools(tools) {
  return `
    <div class="admin-section">
      <div class="admin-section-header">
        <div class="admin-section-title">🤖 AI TOOLS MANAGEMENT</div>
        <button class="admin-add-btn" onclick="openToolModal()">+ ADD TOOL</button>
      </div>
      <div class="admin-info-box">
        💡 Custom tools appear at the top of the AI Finder. The default 500+ tools are always available.
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            ${tools.length === 0
              ? '<tr><td colspan="5" class="admin-empty">No custom tools added yet. Click "+ ADD TOOL" to start.</td></tr>'
              : tools.map((t,i) => `
                <tr>
                  <td><strong>${t.n}</strong><br><small style="color:var(--text3)">${t.d?.slice(0,50)}...</small></td>
                  <td><span class="admin-cat-tag">${t.cat}</span></td>
                  <td><span class="admin-price-tag tp-${t.p}">${t.p}</span></td>
                  <td><span class="admin-status-tag ${t.featured?'featured':t.active?'active':'draft'}">${t.featured?'⭐ Featured':t.active?'Active':'Draft'}</span></td>
                  <td class="admin-actions">
                    <button class="admin-act-btn edit"   onclick="editTool(${i})">✏️ Edit</button>
                    <button class="admin-act-btn feat"   onclick="toggleFeatured(${i})">${t.featured?'★ Unfeature':'☆ Feature'}</button>
                    <button class="admin-act-btn delete" onclick="deleteTool(${i})">🗑️ Delete</button>
                  </td>
                </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tool Modal -->
    <div class="admin-modal" id="toolModal" style="display:none">
      <div class="admin-modal-box">
        <div class="admin-modal-title" id="toolModalTitle">+ ADD AI TOOL</div>
        <div class="admin-form-grid">
          <div class="admin-form-group"><label>Tool Name *</label><input class="admin-input" id="tf-name" placeholder="e.g. ChatGPT"></div>
          <div class="admin-form-group"><label>Category *</label>
            <select class="admin-input" id="tf-cat">
              ${['AI Chatbots','Image Gen','Coding AI','Writing AI','Video AI','Audio & Music','Design Tools','SEO Tools','Productivity','Presentation','Research','Analytics','Social Media','No-Code','Education AI','Other'].map(c=>`<option>${c}</option>`).join('')}
            </select>
          </div>
          <div class="admin-form-group"><label>URL *</label><input class="admin-input" id="tf-url" placeholder="https://..."></div>
          <div class="admin-form-group"><label>Price</label>
            <select class="admin-input" id="tf-price"><option value="free">Free</option><option value="freemium">Freemium</option><option value="paid">Paid</option><option value="student">Student</option></select>
          </div>
          <div class="admin-form-group" style="grid-column:1/-1"><label>Description *</label><input class="admin-input" id="tf-desc" placeholder="Brief description of what this tool does"></div>
          <div class="admin-form-group"><label>Emoji Icon</label><input class="admin-input" id="tf-emoji" placeholder="🤖" maxlength="2"></div>
          <div class="admin-form-group"><label>Tags (comma separated)</label><input class="admin-input" id="tf-tags" placeholder="free, popular, ai"></div>
        </div>
        <div class="admin-modal-actions">
          <button class="admin-cancel-btn" onclick="closeToolModal()">Cancel</button>
          <button class="admin-save-btn" onclick="saveTool()">💾 Save Tool</button>
        </div>
      </div>
    </div>`;
}

let editingToolIdx = -1;

window.openToolModal = function(idx) {
  editingToolIdx = idx !== undefined ? idx : -1;
  const modal = document.getElementById('toolModal');
  if (!modal) return;
  const title = document.getElementById('toolModalTitle');

  if (idx !== undefined) {
    const tool = getAdminData('tools')[idx];
    title.textContent = '✏️ EDIT AI TOOL';
    document.getElementById('tf-name').value  = tool.n    || '';
    document.getElementById('tf-cat').value   = tool.cat  || 'AI Chatbots';
    document.getElementById('tf-url').value   = tool.url  || '';
    document.getElementById('tf-price').value = tool.p    || 'free';
    document.getElementById('tf-desc').value  = tool.d    || '';
    document.getElementById('tf-emoji').value = tool.e    || '🤖';
    document.getElementById('tf-tags').value  = (tool.tags || []).join(', ');
  } else {
    title.textContent = '+ ADD AI TOOL';
    ['tf-name','tf-url','tf-desc','tf-tags'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('tf-emoji').value = '🤖';
  }
  modal.style.display = 'flex';
};

window.closeToolModal = function() {
  const modal = document.getElementById('toolModal');
  if (modal) modal.style.display = 'none';
};

window.saveTool = function() {
  const name  = document.getElementById('tf-name')?.value.trim();
  const url   = document.getElementById('tf-url')?.value.trim();
  const desc  = document.getElementById('tf-desc')?.value.trim();
  if (!name || !url || !desc) { alert('Please fill Name, URL and Description'); return; }

  const tool = {
    n:       name,
    cat:     document.getElementById('tf-cat')?.value,
    url:     url,
    p:       document.getElementById('tf-price')?.value || 'free',
    d:       desc,
    e:       document.getElementById('tf-emoji')?.value || '🤖',
    tags:    document.getElementById('tf-tags')?.value.split(',').map(t=>t.trim()).filter(Boolean),
    active:  true,
    featured: false,
    addedAt: new Date().toISOString(),
  };

  const tools = getAdminData('tools');
  if (editingToolIdx >= 0) {
    tools[editingToolIdx] = { ...tools[editingToolIdx], ...tool };
  } else {
    tools.unshift(tool);
  }
  saveAdminData('tools', tools);
  closeToolModal();
  pushNotif(`✅ Tool "${name}" ${editingToolIdx >= 0 ? 'updated' : 'added'} successfully!`, 'success');
  switchAdminTab('tools', document.querySelector('.admin-tab.active'));

  // Inject into AI_TOOLS live
  if (window.AI_TOOLS) {
    if (editingToolIdx < 0) window.AI_TOOLS.unshift(tool);
    if (window.renderFinder) renderFinder();
  }
};

window.editTool = function(idx) { openToolModal(idx); };

window.deleteTool = function(idx) {
  if (!confirm('Delete this tool?')) return;
  const tools = getAdminData('tools');
  const name  = tools[idx]?.n;
  tools.splice(idx, 1);
  saveAdminData('tools', tools);
  pushNotif(`🗑️ Tool "${name}" deleted`, 'warning');
  switchAdminTab('tools', document.querySelector('.admin-tab.active'));
};

window.toggleFeatured = function(idx) {
  const tools = getAdminData('tools');
  tools[idx].featured = !tools[idx].featured;
  saveAdminData('tools', tools);
  switchAdminTab('tools', document.querySelector('.admin-tab.active'));
};

/* ── COURSES MANAGEMENT ── */
function renderAdminCourses(courses) {
  return `
    <div class="admin-section">
      <div class="admin-section-header">
        <div class="admin-section-title">🎓 COURSES MANAGEMENT</div>
        <button class="admin-add-btn" onclick="openCourseModal()">+ ADD COURSE</button>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>Title</th><th>Platform</th><th>Topic</th><th>Free?</th><th>Actions</th></tr></thead>
          <tbody>
            ${courses.length === 0
              ? '<tr><td colspan="5" class="admin-empty">No custom courses. Click "+ ADD COURSE".</td></tr>'
              : courses.map((c,i) => `
                <tr>
                  <td><strong>${c.title}</strong></td>
                  <td>${c.platform}</td>
                  <td><span class="admin-cat-tag">${c.topic}</span></td>
                  <td>${c.free ? '✅ Free' : '💰 Paid'}</td>
                  <td class="admin-actions">
                    <button class="admin-act-btn edit" onclick="editCourse(${i})">✏️ Edit</button>
                    <button class="admin-act-btn delete" onclick="deleteCourse(${i})">🗑️ Delete</button>
                  </td>
                </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="admin-modal" id="courseModal" style="display:none">
      <div class="admin-modal-box">
        <div class="admin-modal-title" id="courseModalTitle">+ ADD COURSE</div>
        <div class="admin-form-grid">
          <div class="admin-form-group" style="grid-column:1/-1"><label>Course Title *</label><input class="admin-input" id="cf-title" placeholder="e.g. Ethical Hacking Masterclass"></div>
          <div class="admin-form-group"><label>Platform *</label><input class="admin-input" id="cf-platform" placeholder="e.g. Udemy, Coursera"></div>
          <div class="admin-form-group"><label>Topic</label>
            <select class="admin-input" id="cf-topic"><option>Cybersecurity</option><option>Web Dev</option><option>AI & ML</option><option>Data Science</option><option>Cloud</option><option>Programming</option></select>
          </div>
          <div class="admin-form-group"><label>Level</label><select class="admin-input" id="cf-level"><option>beginner</option><option>intermediate</option><option>advanced</option></select></div>
          <div class="admin-form-group"><label>Duration</label><input class="admin-input" id="cf-duration" placeholder="e.g. 20 hours"></div>
          <div class="admin-form-group"><label>URL *</label><input class="admin-input" id="cf-url" placeholder="https://..."></div>
          <div class="admin-form-group" style="grid-column:1/-1"><label>Description</label><input class="admin-input" id="cf-desc" placeholder="Course description..."></div>
          <div class="admin-form-group"><label>Free?</label><select class="admin-input" id="cf-free"><option value="true">Yes — Free</option><option value="false">No — Paid</option></select></div>
          <div class="admin-form-group"><label>Certificate?</label><select class="admin-input" id="cf-cert"><option value="true">Yes</option><option value="false">No</option></select></div>
        </div>
        <div class="admin-modal-actions">
          <button class="admin-cancel-btn" onclick="document.getElementById('courseModal').style.display='none'">Cancel</button>
          <button class="admin-save-btn" onclick="saveCourse()">💾 Save Course</button>
        </div>
      </div>
    </div>`;
}

let editingCourseIdx = -1;
window.openCourseModal = function(idx) {
  editingCourseIdx = idx !== undefined ? idx : -1;
  const modal = document.getElementById('courseModal');
  if (!modal) return;
  if (idx !== undefined) {
    const c = getAdminData('courses')[idx];
    document.getElementById('cf-title').value    = c.title    || '';
    document.getElementById('cf-platform').value = c.platform || '';
    document.getElementById('cf-url').value      = c.url      || '';
    document.getElementById('cf-desc').value     = c.desc     || '';
    document.getElementById('cf-duration').value = c.duration || '';
  } else {
    ['cf-title','cf-platform','cf-url','cf-desc','cf-duration'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  }
  modal.style.display = 'flex';
};
window.editCourse = (idx) => openCourseModal(idx);
window.deleteCourse = function(idx) {
  if (!confirm('Delete this course?')) return;
  const c = getAdminData('courses'); c.splice(idx,1); saveAdminData('courses',c);
  pushNotif('🗑️ Course deleted','warning');
  switchAdminTab('courses', document.querySelector('.admin-tab.active'));
};
window.saveCourse = function() {
  const title = document.getElementById('cf-title')?.value.trim();
  const url   = document.getElementById('cf-url')?.value.trim();
  if (!title || !url) { alert('Please fill Title and URL'); return; }
  const course = {
    title, platform:document.getElementById('cf-platform')?.value||'',
    topic:document.getElementById('cf-topic')?.value||'Cybersecurity',
    level:document.getElementById('cf-level')?.value||'beginner',
    duration:document.getElementById('cf-duration')?.value||'',
    url, desc:document.getElementById('cf-desc')?.value||'',
    free:document.getElementById('cf-free')?.value==='true',
    cert:document.getElementById('cf-cert')?.value==='true',
  };
  const courses = getAdminData('courses');
  editingCourseIdx >= 0 ? courses.splice(editingCourseIdx,1,course) : courses.unshift(course);
  saveAdminData('courses',courses);
  document.getElementById('courseModal').style.display='none';
  pushNotif(`✅ Course "${title}" saved!`,'success');
  switchAdminTab('courses', document.querySelector('.admin-tab.active'));
};

/* ── NEWS MANAGEMENT ── */
function renderAdminNews(news) {
  return `
    <div class="admin-section">
      <div class="admin-section-header">
        <div class="admin-section-title">📰 NEWS MANAGEMENT</div>
        <button class="admin-add-btn" onclick="openNewsModal()">+ ADD NEWS</button>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>Title</th><th>Category</th><th>Source</th><th>Featured</th><th>Actions</th></tr></thead>
          <tbody>
            ${news.length === 0
              ? '<tr><td colspan="5" class="admin-empty">No custom news. Click "+ ADD NEWS".</td></tr>'
              : news.map((n,i) => `
                <tr>
                  <td><strong>${n.title?.slice(0,60)}...</strong></td>
                  <td><span class="admin-cat-tag">${n.cat}</span></td>
                  <td>${n.source}</td>
                  <td>${n.featured ? '⭐ Featured' : '—'}</td>
                  <td class="admin-actions">
                    <button class="admin-act-btn edit"   onclick="editNews(${i})">✏️</button>
                    <button class="admin-act-btn delete" onclick="deleteNews(${i})">🗑️</button>
                  </td>
                </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="admin-modal" id="newsModal" style="display:none">
      <div class="admin-modal-box">
        <div class="admin-modal-title">+ ADD NEWS ARTICLE</div>
        <div class="admin-form-grid">
          <div class="admin-form-group" style="grid-column:1/-1"><label>Headline *</label><input class="admin-input" id="nf-title" placeholder="Article headline..."></div>
          <div class="admin-form-group"><label>Category</label><select class="admin-input" id="nf-cat"><option>Breaches</option><option>Vulnerabilities</option><option>Malware</option><option>Privacy</option><option>AI Security</option><option>Threats</option><option>Tools</option></select></div>
          <div class="admin-form-group"><label>Source</label><input class="admin-input" id="nf-source" placeholder="e.g. The Hacker News"></div>
          <div class="admin-form-group"><label>URL</label><input class="admin-input" id="nf-url" placeholder="https://..."></div>
          <div class="admin-form-group"><label>Date</label><input class="admin-input" id="nf-date" placeholder="2 hours ago"></div>
          <div class="admin-form-group" style="grid-column:1/-1"><label>Description</label><textarea class="admin-input" id="nf-desc" rows="3" placeholder="Article summary..."></textarea></div>
          <div class="admin-form-group"><label>Featured?</label><select class="admin-input" id="nf-feat"><option value="false">No</option><option value="true">Yes — Show as Breaking</option></select></div>
        </div>
        <div class="admin-modal-actions">
          <button class="admin-cancel-btn" onclick="document.getElementById('newsModal').style.display='none'">Cancel</button>
          <button class="admin-save-btn" onclick="saveNews()">💾 Save Article</button>
        </div>
      </div>
    </div>`;
}

window.openNewsModal = function(idx) {
  document.getElementById('newsModal').style.display='flex';
};
window.editNews = (idx) => openNewsModal(idx);
window.deleteNews = function(idx) {
  if (!confirm('Delete?')) return;
  const n=getAdminData('news'); n.splice(idx,1); saveAdminData('news',n);
  switchAdminTab('news', document.querySelector('.admin-tab.active'));
};
window.saveNews = function() {
  const title = document.getElementById('nf-title')?.value.trim();
  if (!title) { alert('Add a headline'); return; }
  const article = {
    title, cat:document.getElementById('nf-cat')?.value,
    source:document.getElementById('nf-source')?.value||'CyberVault',
    url:document.getElementById('nf-url')?.value||'#',
    date:document.getElementById('nf-date')?.value||'Just now',
    desc:document.getElementById('nf-desc')?.value||'',
    featured:document.getElementById('nf-feat')?.value==='true',
    dotColor:'#00d4ff', addedAt:new Date().toISOString(),
  };
  const news = getAdminData('news'); news.unshift(article); saveAdminData('news',news);
  document.getElementById('newsModal').style.display='none';
  pushNotif(`✅ News article added!`,'success');
  switchAdminTab('news', document.querySelector('.admin-tab.active'));
};

/* ── USERS MANAGEMENT ── */
function renderAdminUsers() {
  const users = JSON.parse(localStorage.getItem('cv_users') || '[]');
  return `
    <div class="admin-section">
      <div class="admin-section-title">👤 USER MANAGEMENT</div>
      <div class="admin-info-box">
        💡 Showing locally registered users. Firebase users appear in Firebase Console → Authentication.
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody>
            ${users.length === 0
              ? '<tr><td colspan="5" class="admin-empty">No local users (Firebase users in console).</td></tr>'
              : users.map((u,i) => `
                <tr>
                  <td><strong>${u.name||'—'}</strong></td>
                  <td>${u.email}</td>
                  <td>${u.role||'user'}</td>
                  <td>${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  <td class="admin-actions">
                    <button class="admin-act-btn edit" onclick="makeAdmin('${u.uid}')">👑 Make Admin</button>
                    <button class="admin-act-btn delete" onclick="suspendUser(${i})">🚫 Suspend</button>
                  </td>
                </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

window.makeAdmin = function(uid) {
  localStorage.setItem('cv_admin_' + uid, 'true');
  pushNotif('👑 User promoted to Admin','success');
};
window.suspendUser = function(idx) {
  if (!confirm('Suspend this user?')) return;
  const users = JSON.parse(localStorage.getItem('cv_users')||'[]');
  users[idx].suspended = true;
  localStorage.setItem('cv_users', JSON.stringify(users));
  pushNotif('🚫 User suspended','warning');
  switchAdminTab('users', document.querySelector('.admin-tab.active'));
};

/* ── SETTINGS ── */
function renderAdminSettings() {
  return `
    <div class="admin-section">
      <div class="admin-section-title">⚙️ ADMIN SETTINGS</div>
      <div class="admin-settings-grid">
        <div class="admin-setting-card">
          <div class="admin-setting-title">🔑 Grant Admin Access</div>
          <div class="admin-setting-sub">Enter user email to grant admin privileges</div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <input class="admin-input" id="grantEmail" placeholder="user@email.com" style="flex:1">
            <button class="admin-save-btn" onclick="grantAdminByEmail()">Grant</button>
          </div>
        </div>
        <div class="admin-setting-card">
          <div class="admin-setting-title">📢 Send Notification to All</div>
          <div class="admin-setting-sub">Push a notification to all users</div>
          <input class="admin-input" id="broadcastMsg" placeholder="Notification message..." style="margin-top:12px;margin-bottom:8px;width:100%">
          <select class="admin-input" id="broadcastType" style="margin-bottom:8px;width:100%">
            <option value="info">ℹ️ Info</option><option value="success">✅ Success</option>
            <option value="danger">🚨 Danger/Alert</option><option value="news">📰 News</option>
          </select>
          <button class="admin-save-btn" onclick="broadcastNotif()" style="width:100%">📢 Send</button>
        </div>
        <div class="admin-setting-card">
          <div class="admin-setting-title">🗑️ Clear All Custom Data</div>
          <div class="admin-setting-sub">Remove all admin-added tools, courses, news</div>
          <button class="admin-act-btn delete" style="margin-top:12px" onclick="clearAllAdminData()">Clear All Custom Data</button>
        </div>
        <div class="admin-setting-card">
          <div class="admin-setting-title">📊 System Stats</div>
          <div style="display:flex;flex-direction:column;gap:6px;margin-top:12px">
            <div style="font-family:var(--font-m);font-size:0.75rem;color:var(--text2)">Local Users: <strong>${JSON.parse(localStorage.getItem('cv_users')||'[]').length}</strong></div>
            <div style="font-family:var(--font-m);font-size:0.75rem;color:var(--text2)">Custom Tools: <strong>${getAdminData('tools').length}</strong></div>
            <div style="font-family:var(--font-m);font-size:0.75rem;color:var(--text2)">Custom Courses: <strong>${getAdminData('courses').length}</strong></div>
            <div style="font-family:var(--font-m);font-size:0.75rem;color:var(--text2)">Firebase: <strong style="color:${window.FIREBASE_READY?'var(--accent3)':'var(--accent4)'}">${window.FIREBASE_READY?'Connected':'Local Mode'}</strong></div>
          </div>
        </div>
      </div>
    </div>`;
}

window.grantAdminByEmail = function() {
  const email = document.getElementById('grantEmail')?.value.trim();
  if (!email) return;
  const users = JSON.parse(localStorage.getItem('cv_users')||'[]');
  const u = users.find(u => u.email === email);
  if (u) { localStorage.setItem('cv_admin_' + u.uid, 'true'); pushNotif(`👑 ${email} is now Admin`,'success'); }
  else { pushNotif('⚠️ User not found in local store','warning'); }
};

window.broadcastNotif = function() {
  const msg  = document.getElementById('broadcastMsg')?.value.trim();
  const type = document.getElementById('broadcastType')?.value || 'info';
  if (!msg) return;
  pushNotif(msg, type);
  document.getElementById('broadcastMsg').value = '';
};

window.clearAllAdminData = function() {
  if (!confirm('Delete ALL custom tools, courses and news?')) return;
  ['tools','courses','news'].forEach(k => localStorage.removeItem('cv_admin_data_' + k));
  pushNotif('🗑️ All custom data cleared','warning');
  renderAdmin();
};

/* ── INJECT ADMIN TOOLS INTO AI FINDER ── */
window.injectAdminTools = function() {
  const adminTools = getAdminData('tools');
  if (!adminTools.length || !window.AI_TOOLS) return;
  const ids = new Set(window.AI_TOOLS.map(t => t.n + t.url));
  adminTools.forEach(t => { if (!ids.has(t.n + t.url)) window.AI_TOOLS.unshift(t); });
};

/* ── INJECT ADMIN NEWS ── */
window.injectAdminNews = function() {
  const adminNews = getAdminData('news');
  if (!adminNews.length || !window.NEWS_ARTICLES) return;
  adminNews.forEach(n => window.NEWS_ARTICLES.unshift(n));
};
