/* ══════════════════════════════════════════════
   CYBERPATH v1.0 — MAIN.JS
   Navigation · UI · Cursor · Particles
══════════════════════════════════════════════ */

/* ─── CURSOR ─── */
const $cur  = document.getElementById('cursor');
const $ring = document.getElementById('cursorRing');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let rx = mx, ry = my;

function initCursor() {
  if (!$cur || !$ring) return;
  // Initial center position so cursor is visible immediately
  $cur.style.left  = mx + 'px';
  $cur.style.top   = my + 'px';
  $ring.style.left = mx + 'px';
  $ring.style.top  = my + 'px';

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if ($cur) {
      $cur.style.left = mx + 'px';
      $cur.style.top  = my + 'px';
    }
  }, { passive: true });

  // Smooth ring follow
  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    if ($ring) {
      $ring.style.left = rx + 'px';
      $ring.style.top  = ry + 'px';
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Hide custom cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    if ($cur)  $cur.style.opacity  = '0';
    if ($ring) $ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if ($cur)  $cur.style.opacity  = '1';
    if ($ring) $ring.style.opacity = '1';
  });

  // Hover effect for interactive elements
  document.addEventListener('mouseover', e => {
    const t = e.target;
    if (t && (t.closest('button, a, input, select, textarea, .career-card, .quiz-topic-card, .pgen-option-btn, .advisor-goal-btn, .advisor-quick-btn, .nav-link-item'))) {
      $cur?.classList.add('hover');
      $ring?.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    const t = e.target;
    if (t && (t.closest('button, a, input, select, textarea, .career-card, .quiz-topic-card, .pgen-option-btn, .advisor-goal-btn, .advisor-quick-btn, .nav-link-item'))) {
      $cur?.classList.remove('hover');
      $ring?.classList.remove('hover');
    }
  });
}
initCursor();

// Touch devices: hide custom cursor and show native
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  if ($cur)  $cur.style.display  = 'none';
  if ($ring) $ring.style.display = 'none';
  document.body.style.cursor = 'auto';
}

/* ─── NAV SCROLL ─── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.style.background = window.scrollY > 20 ? 'rgba(5,10,25,0.98)' : 'rgba(5,10,25,0.92)';
});

/* ─── MOBILE MENU ─── */
window.toggleMobileMenu = function() {
  document.getElementById('appSidebar')?.classList.toggle('open');
  document.getElementById('sidebarOverlay')?.classList.toggle('open');
};

/* ─── SIDEBAR COLLAPSE (desktop) ─── */
window.toggleSidebar = function() {
  const sidebar = document.getElementById('appSidebar');
  const layout  = document.getElementById('appLayout');
  if (!sidebar || !layout) return;
  sidebar.classList.toggle('collapsed');
  layout.classList.toggle('collapsed');
  // Persist preference
  try { localStorage.setItem('cp_sidebar_collapsed', sidebar.classList.contains('collapsed') ? '1' : '0'); } catch(e) {}
};

// Restore collapse preference
(function() {
  try {
    if (localStorage.getItem('cp_sidebar_collapsed') === '1') {
      const sidebar = document.getElementById('appSidebar');
      const layout  = document.getElementById('appLayout');
      sidebar?.classList.add('collapsed');
      layout?.classList.add('collapsed');
    }
  } catch(e) {}
})();

/* ─── PARTICLES ─── */
(function() {
  const p = document.getElementById('particles');
  if (!p) return;
  const colors = ['#00d4ff','#7c3aed','#10b981','#f59e0b'];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `left:${Math.random()*100}%;width:2px;height:2px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${12+Math.random()*15}s;animation-delay:${Math.random()*10}s;`;
    p.appendChild(el);
  }
})();

/* ─── NAVIGATION ─── */
window.navigate = function(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Update nav links
  document.querySelectorAll('.nav-link-item').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  // Show target page
  const pageEl = document.getElementById('page-' + page);
  if (pageEl) pageEl.classList.add('active');

  // Close mobile menu
  document.getElementById('appSidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Lazy load page content
  const loaders = {
    'advisor':      () => typeof renderAIAdvisor     === 'function' && renderAIAdvisor(),
    'careers':      () => typeof renderCareerHub     === 'function' && renderCareerHub(),
    'resources':    () => typeof renderResources      === 'function' && renderResources(),
    'projects':     () => typeof renderProjectGen    === 'function' && renderProjectGen(),
    'quiz':         () => typeof renderQuiz          === 'function' && renderQuiz(),
    'news':         () => typeof renderNews          === 'function' && renderNews(),
    'dashboard':    () => typeof renderDashboard     === 'function' && renderDashboard(),
    'analytics':    () => typeof renderAnalytics     === 'function' && renderAnalytics(),

    'admin':        () => typeof renderAdmin         === 'function' && renderAdmin(),
    // NEW PAGES
    'learningPlan': () => typeof renderLearningPlan  === 'function' && renderLearningPlan(),
    'dna':          () => typeof renderDNA           === 'function' && renderDNA(),
    'skillgap':     () => typeof renderSkillGap      === 'function' && renderSkillGap(),
    'profile':      () => typeof renderProfile       === 'function' && renderProfile(),
    'settings':     () => typeof renderSettings      === 'function' && renderSettings(),
  };
  if (loaders[page]) loaders[page]();

  setTimeout(initReveal, 80);
};

/* ─── NAV LINKS ─── */
document.querySelectorAll('.nav-link-item').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); navigate(a.dataset.page); });
});

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback: just show everything
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    return;
  }
  document.querySelectorAll('.reveal').forEach((el, i) => {
    if (el.classList.contains('in')) return;
    el.style.transitionDelay = (i * 0.06) + 's';
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
  });
}
initReveal();

/* ─── COUNTERS ─── */
window.animateCounter = function(el, target, suffix='') {
  let v = 0; const step = Math.ceil(target / 60);
  const t = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = v + suffix;
    if (v >= target) clearInterval(t);
  }, 25);
};

/* ─── TOAST ─── */
window.showToast = function(msg, type='info') {
  if (window.pushNotif) { pushNotif(msg, type, false); return; }
  const t = document.getElementById('cpToast') || document.getElementById('cvToast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
};

/* ─── KEYBOARD SHORTCUTS ─── */
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || ['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
  const map = {
    '1':'dashboard', '2':'dna', '3':'advisor', '4':'learningPlan',
    '5':'projects', '6':'quiz', '7':'news', '8':'careers',
  };
  if (map[e.key]) navigate(map[e.key]);
});

/* ─── LOGOUT SHIM (open-access local mode) ─── */
window.handleLogout = async function() {
  try { if (window.firebase && firebase.auth) await firebase.auth().signOut(); } catch(e) {}
  localStorage.removeItem('cv_current_user');
  // Re-create a fresh guest user so app stays usable
  const guest = {
    uid: 'guest_' + Date.now(), email: 'guest@cyberpath.local',
    displayName: 'Guest User', role: 'user',
    createdAt: new Date().toISOString(), provider: 'local'
  };
  localStorage.setItem('cv_current_user', JSON.stringify(guest));
  window.CV_USER = guest;
  if (typeof updateNavUser === 'function') updateNavUser();
  if (typeof updateUserDropdown === 'function') updateUserDropdown();
  showToast('Logged out — continued as guest');
};

window.updateNavUser = function() {
  if (!window.CV_USER) return;
  const n = document.getElementById('navUserName'); if (n) n.textContent = CV_USER.displayName.split(' ')[0];
  const r = document.getElementById('navUserRole'); if (r) r.textContent = (CV_USER.role && CV_USER.role !== 'user') ? CV_USER.role : 'Member';
  const a = document.getElementById('navUserAva');
  if (a) { if (CV_USER.photoURL) { a.innerHTML = `<img src="${CV_USER.photoURL}" style="width:28px;height:28px;border-radius:50%;object-fit:cover">`; } else { a.textContent = CV_USER.displayName.charAt(0).toUpperCase(); } }
};
 
/* ─── GAMIFICATION SYSTEM ─── */
window.getGS = function() {
  const uid = window.CV_USER?.uid || 'guest';
  try {
    const raw = localStorage.getItem('cp_gamification_' + uid);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return { xp: 120, streak: 1, badges: ['cadet'], lastActive: new Date().toISOString() };
};

window.getLevel = function(xp = 0) {
  if (xp >= 2000) return { title: 'Elite Defender', icon: '🛡️', level: 5, min: 2000, max: 5000 };
  if (xp >= 1000) return { title: 'Cyber Sentinel', icon: '⚔️', level: 4, min: 1000, max: 2000 };
  if (xp >= 500)  return { title: 'Security Analyst', icon: '🔍', level: 3, min: 500, max: 1000 };
  if (xp >= 200)  return { title: 'Apprentice', icon: '💻', level: 2, min: 200, max: 500 };
  return { title: 'Recruit', icon: '👶', level: 1, min: 0, max: 200 };
};

window.awardXP = function(pts, reason = '') {
  if (!pts || pts <= 0) return;
  const uid = window.CV_USER?.uid || 'guest';
  const gs = window.getGS();
  gs.xp = (gs.xp || 0) + pts;

  // Day streak calculation
  const today = new Date().toDateString();
  const lastDate = gs.lastActive ? new Date(gs.lastActive).toDateString() : '';
  if (today !== lastDate) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastDate === yesterday) {
      gs.streak = (gs.streak || 0) + 1;
    } else if (lastDate !== today) {
      gs.streak = 1;
    }
  }
  gs.lastActive = new Date().toISOString();

  // Badge unlocks
  if (!gs.badges) gs.badges = ['cadet'];
  if (gs.xp >= 500 && !gs.badges.includes('analyst')) gs.badges.push('analyst');
  if (gs.xp >= 1000 && !gs.badges.includes('sentinel')) gs.badges.push('sentinel');
  if (gs.xp >= 2000 && !gs.badges.includes('defender')) gs.badges.push('defender');

  try {
    localStorage.setItem('cp_gamification_' + uid, JSON.stringify(gs));
    if (window.FS && FS.incStat) FS.incStat(uid, 'xp_earned');
  } catch(e) {}

  if (typeof updateScorePill === 'function') updateScorePill();
  const msg = reason ? `+${pts} XP earned: ${reason}! 🌟` : `+${pts} XP earned! 🌟`;
  if (typeof showToast === 'function') showToast(msg, 'success');
};

window.updateScorePill = function() {
  const gs = window.getGS();
  const el = document.getElementById('scorePill') || document.querySelector('.score-pill-xp');
  if (el) el.textContent = `${(gs.xp || 0).toLocaleString()} XP`;
  const dashXpRow = document.querySelector('.cp-dash-xp-row');
  if (dashXpRow) {
    dashXpRow.innerHTML = `<span>${(gs.xp||0).toLocaleString()} XP</span><span>🔥 ${gs.streak||0} day streak</span>`;
  }
  const dashBar = document.querySelector('.cp-dash-xp-bar');
  if (dashBar) {
    dashBar.style.width = `${Math.min(((gs.xp||0)/500)*100, 100)}%`;
  }
};

/* ─── DASHBOARD ─── */
window.renderDashboard = function() {
  if (!window.CV_USER) return;
  const u      = CV_USER;
  const stats  = window.FS ? FS.getStats(u.uid) : {};

  const scores = window.getQuizScores ? getQuizScores() : {};
  const gs     = (typeof getGS === 'function')   ? getGS()   : { xp:0, streak:0 };
  const lvl    = (typeof getLevel === 'function') ? getLevel(gs.xp || 0) : { icon:'👶', title:'Beginner' };
  const joined = u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : 'Today';
  const el     = document.getElementById('dashboardBody');
  if (!el) return;

  const avgQuiz = Object.values(scores).length
    ? Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/Object.values(scores).length) : 0;

  el.innerHTML = `
    <!-- Profile -->
    <div class="cp-dash-profile reveal">
      <div class="cp-dash-avatar">${u.photoURL?`<img src="${u.photoURL}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:u.displayName.charAt(0).toUpperCase()}</div>
      <div class="cp-dash-info">
        <div class="cp-dash-name">${u.displayName}</div>
        <div class="cp-dash-email">${u.email}</div>
        <div class="cp-dash-level">${lvl.icon} ${lvl.title}</div>
        <div class="cp-dash-xp-bar-wrap"><div class="cp-dash-xp-bar" style="width:${Math.min(((gs.xp||0)/500)*100,100)}%"></div></div>
        <div class="cp-dash-xp-row"><span>${(gs.xp||0).toLocaleString()} XP</span><span>🔥 ${gs.streak||0} day streak</span></div>
      </div>
      <div class="cp-dash-actions">
        <button class="cp-dash-btn cp-btn-secondary" onclick="handleLogout()">🚪 Logout</button>
      </div>
    </div>

    <!-- What to learn next CTA -->
    <div class="cp-dash-cta reveal" onclick="navigate('advisor')">
      <div class="cp-dash-cta-icon">🤖</div>
      <div class="cp-dash-cta-text">
        <div class="cp-dash-cta-title">What Should I Learn Next?</div>
        <div class="cp-dash-cta-sub">Ask AI Advisor for personalized recommendation</div>
      </div>
      <div class="cp-dash-cta-arrow">→</div>
    </div>

    <!-- Quick Stats -->
    <div class="cp-dash-stats-grid reveal">
      ${[
        {icon:'🧠',val:avgQuiz+'%',lbl:'Avg Quiz Score',page:'quiz'},
        {icon:'💡',val:stats.project_gen||0,lbl:'Projects Generated',page:'projects'},
        {icon:'📚',val:stats.course_view||0,lbl:'Resources Viewed',page:'resources'},
        {icon:'📰',val:stats.news_view||0,lbl:'News Read',page:'news'},
      ].map(s=>`<div class="cp-dash-stat" onclick="navigate('${s.page}')">
        <div class="cp-dash-stat-icon">${s.icon}</div>
        <div class="cp-dash-stat-val">${s.val}</div>
        <div class="cp-dash-stat-lbl">${s.lbl}</div>
      </div>`).join('')}
    </div>

    <!-- Quick Nav -->
    <div class="cp-dash-nav-grid reveal">
      ${[
        {i:'🤖',t:'AI Advisor',   s:'Get guidance',      p:'advisor'},
        {i:'💼',t:'Career Hub',   s:'9 career tracks',   p:'careers'},
        {i:'📚',t:'Resources',     s:'Tools & library',   p:'resources'},
        {i:'💡',t:'Projects',     s:'Generate ideas',    p:'projects'},
        {i:'🧪',t:'Quizzes',     s:'Test knowledge',    p:'quiz'},
        {i:'👑',t:'Admin',       s:'Manage content',    p:'admin'},
      ].map(a=>`<div class="cp-dash-nav-card" onclick="navigate('${a.p}')">
        <span class="cp-dash-nav-icon">${a.i}</span>
        <span class="cp-dash-nav-title">${a.t}</span>
        <span class="cp-dash-nav-sub">${a.s}</span>
      </div>`).join('')}
    </div>

    <!-- Quiz Scores -->
    ${Object.keys(scores).length > 0 ? `
      <div class="cp-dash-section reveal">
        <div class="cp-dash-section-title">🧠 QUIZ PERFORMANCE</div>
        <div class="cp-dash-quiz-bars">
          ${Object.entries(scores).map(([id,pct])=>{
            const t = (window.QUIZ_TOPICS||[]).find(t=>t.id===id)||{label:id,color:'#00d4ff'};
            return `<div class="cp-dash-quiz-row">
              <span class="cp-dash-quiz-label">${t.label}</span>
              <div class="cp-dash-quiz-bar-wrap">
                <div class="cp-dash-quiz-bar" style="width:${pct}%;background:${pct>=80?'#10b981':pct>=50?'#f59e0b':'#ef4444'}"></div>
              </div>
              <span class="cp-dash-quiz-pct" style="color:${pct>=80?'#10b981':pct>=50?'#f59e0b':'#ef4444'}">${pct}%</span>
            </div>`;
          }).join('')}
        </div>
      </div>` : ''}

    <div class="cp-dash-meta reveal">
      <span>📅 Member since ${joined}</span>
      <span>🌐 Firebase: <strong style="color:${window.FIREBASE_READY?'#10b981':'#f59e0b'}">${window.FIREBASE_READY?'Connected':'Local Mode'}</strong></span>
    </div>`;
};
