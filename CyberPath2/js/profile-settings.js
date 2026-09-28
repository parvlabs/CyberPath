/* ══════════════════════════════════════════════
   CYBERPATH — PROFILE.JS
   User Profile Management
══════════════════════════════════════════════ */

window.renderProfile = function() {
  const el = document.getElementById('profileBody');
  if (!el || !window.CV_USER) return;
  const u  = CV_USER;
  const gs = (typeof getGS === 'function')   ? getGS()   : { xp:0, streak:0, badges:[] };
  const lvl= (typeof getLevel === 'function') ? getLevel(gs.xp) : { icon:'👶', title:'Beginner' };
  const joined = u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : 'Today';

  el.innerHTML = `
    <!-- Profile Card -->
    <div class="prof-card reveal">
      <div class="prof-avatar-wrap">
        <div class="prof-avatar" id="profAvatar">
          ${u.photoURL
            ? `<img src="${u.photoURL}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
            : `<span>${u.displayName?.charAt(0)?.toUpperCase()||'U'}</span>`}
        </div>
        <div class="prof-avatar-edit" onclick="document.getElementById('avatarInput').click()">✏️</div>
        <input type="file" id="avatarInput" accept="image/*" style="display:none" onchange="updateAvatar(this)">
      </div>
      <div class="prof-info">
        <div class="prof-name">${u.displayName}</div>
        <div class="prof-email">${u.email}</div>
        <div class="prof-level">${lvl.icon} ${lvl.title} · ${(gs.xp||0).toLocaleString()} XP</div>
        <div class="prof-since">Member since ${joined}</div>
      </div>
    </div>

    <!-- Edit Form -->
    <div class="prof-section reveal">
      <div class="prof-section-title">✏️ EDIT PROFILE</div>
      <div class="prof-form">
        <div class="prof-form-row">
          <div class="prof-form-group">
            <label class="prof-label">DISPLAY NAME</label>
            <input class="prof-input" id="profName" value="${u.displayName||''}" placeholder="Your name">
          </div>
          <div class="prof-form-group">
            <label class="prof-label">CAREER GOAL</label>
            <select class="prof-input prof-select" id="profGoal">
              <option value="">Select goal...</option>
              <option value="SOC Analyst" ${u.role==='soc'?'selected':''}>🔍 SOC Analyst</option>
              <option value="Penetration Tester" ${u.role==='pentester'?'selected':''}>⚡ Penetration Tester</option>
              <option value="Bug Bounty Hunter" ${u.role==='bugbounty'?'selected':''}>💰 Bug Bounty Hunter</option>
              <option value="Cloud Security" ${u.role==='cloud'?'selected':''}>☁️ Cloud Security</option>
              <option value="DFIR" ${u.role==='dfir'?'selected':''}>🦠 DFIR / Malware Analyst</option>
              <option value="Security Engineer" ${u.role==='seceng'?'selected':''}>⚙️ Security Engineer</option>
              <option value="GRC Analyst" ${u.role==='grc'?'selected':''}>📋 GRC Analyst</option>
              <option value="General" ${u.role==='other'?'selected':''}>🛡️ General Cybersecurity</option>
            </select>
          </div>
        </div>
        <div class="prof-form-group">
          <label class="prof-label">BIO / ABOUT <span style="color:var(--text3)">(optional)</span></label>
          <textarea class="prof-input prof-textarea" id="profBio" placeholder="Tell us about yourself, your background and goals..." rows="3">${u.bio||''}</textarea>
        </div>
        <div class="prof-form-row">
          <div class="prof-form-group">
            <label class="prof-label">LINKEDIN <span style="color:var(--text3)">(optional)</span></label>
            <input class="prof-input" id="profLinkedIn" value="${u.linkedin||''}" placeholder="linkedin.com/in/yourname">
          </div>
          <div class="prof-form-group">
            <label class="prof-label">GITHUB <span style="color:var(--text3)">(optional)</span></label>
            <input class="prof-input" id="profGitHub" value="${u.github||''}" placeholder="github.com/yourname">
          </div>
        </div>
        <div id="profSaveMsg" style="display:none"></div>
        <button class="prof-save-btn" onclick="saveProfile()">💾 Save Profile</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="prof-section reveal">
      <div class="prof-section-title">📊 YOUR CYBERPATH STATS</div>
      <div class="prof-stats-grid">
        ${[
          {icon:'⚡',val:(gs.xp||0).toLocaleString(),lbl:'Total XP'},
          {icon:'🏅',val:gs.badges?.length||0,lbl:'Badges Earned'},
          {icon:'🔥',val:gs.streak||0,lbl:'Day Streak'},
          {icon:'💡',val:window.FS?FS.getStats(u.uid).project_gen||0:0,lbl:'Projects Built'},
        ].map(s=>`<div class="prof-stat"><span class="prof-stat-icon">${s.icon}</span><div class="prof-stat-val">${s.val}</div><div class="prof-stat-lbl">${s.lbl}</div></div>`).join('')}
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="prof-section prof-danger reveal">
      <div class="prof-section-title" style="color:var(--danger)">⚠️ ACCOUNT</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="prof-danger-btn" onclick="handleLogout()">🚪 Logout</button>
        <button class="prof-danger-btn" onclick="if(confirm('This will reset ALL your local data. Continue?'))clearAllLocalData()">🗑️ Reset Local Data</button>
      </div>
    </div>`;
};

window.saveProfile = async function() {
  const name    = document.getElementById('profName')?.value?.trim();
  const goal    = document.getElementById('profGoal')?.value;
  const bio     = document.getElementById('profBio')?.value?.trim();
  const linkedin= document.getElementById('profLinkedIn')?.value?.trim();
  const github  = document.getElementById('profGitHub')?.value?.trim();
  const msg     = document.getElementById('profSaveMsg');

  if (!name) { showProfileMsg('⚠️ Display name cannot be empty', 'warn'); return; }

  const updates = { displayName:name, role:goal, bio, linkedin, github };

  // Update CV_USER
  Object.assign(window.CV_USER, updates);
  localStorage.setItem('cv_current_user', JSON.stringify(window.CV_USER));

  // Save to Firebase if available
  if (window.FS && window.CV_USER?.uid) {
    await FS.saveUser(CV_USER.uid, updates);
  }

  // Update Firebase Auth display name
  if (window.auth && window.firebase) {
    try { await firebase.auth().currentUser?.updateProfile({ displayName: name }); } catch(e) {}
  }

  // Update nav
  if (typeof updateNavUser === 'function') updateNavUser();
  showProfileMsg('✅ Profile saved successfully!', 'success');
};

function showProfileMsg(msg, type) {
  const el = document.getElementById('profSaveMsg');
  if (!el) return;
  el.textContent = msg;
  el.className   = 'prof-save-msg prof-msg-' + type;
  el.style.display = 'block';
  setTimeout(() => el.style.display='none', 3000);
}

window.clearAllLocalData = function() {
  const uid = window.CV_USER?.uid || 'guest';
  ['cp_quiz_scores_','cp_dna_','cp_learning_plan_','cp_plan_versions_','cp_gamification_','cv_game_','cv_stats_','cv_notifs_'].forEach(k => localStorage.removeItem(k + uid));
  showToast('🗑️ Local data cleared');
  renderProfile();
};

/* ══════════════════════════════════════════════
   SETTINGS.JS
   Platform Preferences
══════════════════════════════════════════════ */

function getSettings() {
  return JSON.parse(localStorage.getItem('cp_settings') || '{}');
}
function saveSettings(s) {
  localStorage.setItem('cp_settings', JSON.stringify(s));
}

window.renderSettings = function() {
  const el = document.getElementById('settingsBody');
  if (!el) return;
  const s = getSettings();

  el.innerHTML = `
    <!-- Notifications -->
    <div class="settings-section reveal">
      <div class="settings-section-title">🔔 NOTIFICATIONS</div>
      ${[
        {key:'daily_reminder',    label:'Daily learning reminder',       sub:'Remind me to study every day'},
        {key:'badge_alerts',      label:'Badge & XP notifications',     sub:'Show popup when earning XP or badges'},
        {key:'news_alerts',       label:'Critical security news alerts', sub:'Alert on high-severity vulnerabilities'},
        {key:'streak_warnings',   label:'Streak break warnings',        sub:'Alert when streak is about to break'},
      ].map(item=>`
        <div class="settings-item">
          <div class="settings-item-info">
            <div class="settings-item-label">${item.label}</div>
            <div class="settings-item-sub">${item.sub}</div>
          </div>
          <label class="settings-toggle">
            <input type="checkbox" ${s[item.key]!==false?'checked':''} onchange="toggleSetting('${item.key}',this.checked)">
            <span class="settings-toggle-slider"></span>
          </label>
        </div>`).join('')}
    </div>

    <!-- Appearance -->
    <div class="settings-section reveal">
      <div class="settings-section-title">🎨 APPEARANCE</div>
      <div class="settings-item">
        <div class="settings-item-info">
          <div class="settings-item-label">Reduce animations</div>
          <div class="settings-item-sub">Disable cursor effects and particle animations</div>
        </div>
        <label class="settings-toggle">
          <input type="checkbox" ${s.reduce_motion?'checked':''} onchange="toggleSetting('reduce_motion',this.checked)">
          <span class="settings-toggle-slider"></span>
        </label>
      </div>
      <div class="settings-item">
        <div class="settings-item-info">
          <div class="settings-item-label">Compact navigation</div>
          <div class="settings-item-sub">Show only icons in navigation bar</div>
        </div>
        <label class="settings-toggle">
          <input type="checkbox" ${s.compact_nav?'checked':''} onchange="toggleSetting('compact_nav',this.checked)">
          <span class="settings-toggle-slider"></span>
        </label>
      </div>
    </div>

    <!-- Learning Preferences -->
    <div class="settings-section reveal">
      <div class="settings-section-title">📚 LEARNING PREFERENCES</div>
      <div class="settings-item">
        <div class="settings-item-info">
          <div class="settings-item-label">Experience level</div>
          <div class="settings-item-sub">Used for content recommendations</div>
        </div>
        <select class="settings-select" onchange="saveSetting('experience',this.value)">
          <option value="beginner"     ${s.experience==='beginner'?'selected':''}>🌱 Beginner</option>
          <option value="intermediate" ${s.experience==='intermediate'?'selected':''}>⚡ Intermediate</option>
          <option value="advanced"     ${s.experience==='advanced'?'selected':''}>🔥 Advanced</option>
        </select>
      </div>
      <div class="settings-item">
        <div class="settings-item-info">
          <div class="settings-item-label">Show XP popups</div>
          <div class="settings-item-sub">Show floating XP earned animations</div>
        </div>
        <label class="settings-toggle">
          <input type="checkbox" ${s.show_xp_pop!==false?'checked':''} onchange="toggleSetting('show_xp_pop',this.checked)">
          <span class="settings-toggle-slider"></span>
        </label>
      </div>
    </div>

    <!-- Firebase / API -->
    <div class="settings-section reveal">
      <div class="settings-section-title">🔧 SYSTEM</div>
      <div class="settings-item">
        <div class="settings-item-info">
          <div class="settings-item-label">Firebase Status</div>
          <div class="settings-item-sub">Authentication and database connection</div>
        </div>
        <span class="settings-status ${window.FIREBASE_READY?'ok':'warn'}">${window.FIREBASE_READY?'✅ Connected':'⚠️ Local Mode'}</span>
      </div>
      <div class="settings-item">
        <div class="settings-item-info">
          <div class="settings-item-label">Google Gemini AI Status</div>
          <div class="settings-item-sub">Gemini Flash for AI Advisor, AI Quiz Gen & Learning Plan</div>
        </div>
        <span class="settings-status ${window.isGeminiConfigured ? (window.isGeminiConfigured() ? 'ok' : 'warn') : (window.AI_CONFIG?.GEMINI_API_KEY && window.AI_CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE' ? 'ok' : 'warn')}">
          ${window.isGeminiConfigured ? (window.isGeminiConfigured() ? '✅ Ready' : '⚠️ Key Not Set') : (window.AI_CONFIG?.GEMINI_API_KEY && window.AI_CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE' ? '✅ Ready' : '⚠️ Key Not Set')}
        </span>
      </div>
      <div class="settings-api-note" style="margin-top:10px">
        <label style="display:block;font-size:0.75rem;color:var(--text2);margin-bottom:6px">GEMINI API KEY (FREE)</label>
        <div style="display:flex;gap:8px">
          <input type="password" id="geminiApiKeyInput" class="prof-input" style="flex:1;font-size:0.8rem;padding:8px 12px" placeholder="AIzaSy..." value="${localStorage.getItem('cp_gemini_api_key') || window.AI_CONFIG?.GEMINI_API_KEY || ''}">
          <button class="prof-save-btn" style="padding:8px 14px;white-space:nowrap" onclick="setGeminiApiKey(document.getElementById('geminiApiKeyInput').value);renderSettings();">Save Key</button>
        </div>
        <div style="margin-top:6px;font-size:0.75rem;color:var(--text3)">
          Get a free Gemini API key at <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--accent)">aistudio.google.com/app/apikey ↗</a>
        </div>
      </div>
    </div>

    <!-- Keyboard Shortcuts -->
    <div class="settings-section reveal">
      <div class="settings-section-title">⌨️ KEYBOARD SHORTCUTS</div>
      <div class="settings-shortcuts-grid">
        ${[
          ['1','Dashboard'],['2','DNA'],['3','AI Advisor'],
        ].map(([k,v])=>`<div class="settings-shortcut"><kbd>${k}</kbd>${v}</div>`).join('')}
      </div>
    </div>`;
};

window.toggleSetting = function(key, val) {
  const s = getSettings(); s[key] = val; saveSettings(s);
  showToast(val ? `✅ ${key.replace(/_/g,' ')} enabled` : `🔕 ${key.replace(/_/g,' ')} disabled`, 'info');
};
window.saveSetting = function(key, val) {
  const s = getSettings(); s[key] = val; saveSettings(s);
};
