/* ══════════════════════════════════════════════
   CYBERVAULT PRO — NOTIFICATIONS.JS
   Toast · Bell · Push · Daily reminders
══════════════════════════════════════════════ */

const NOTIF_TYPES = {
  info:    { icon:'ℹ️', color:'var(--accent)' },
  success: { icon:'✅', color:'var(--accent3)' },
  warning: { icon:'⚠️', color:'var(--accent4)' },
  danger:  { icon:'🚨', color:'var(--danger)' },
  badge:   { icon:'🏅', color:'#f59e0b' },
  xp:      { icon:'⚡', color:'var(--accent)' },
  news:    { icon:'📰', color:'var(--accent2)' },
  course:  { icon:'🎓', color:'#60a5fa' },
};

function getNotifsStore() {
  const uid = window.CV_USER?.uid || 'guest';
  return JSON.parse(localStorage.getItem('cv_notifs_' + uid) || '[]');
}

function saveNotifs(arr) {
  const uid = window.CV_USER?.uid || 'guest';
  localStorage.setItem('cv_notifs_' + uid, JSON.stringify(arr.slice(0, 50)));
}

/* ── PUSH A NOTIFICATION ── */
window.pushNotif = function(msg, type = 'info', persist = true) {
  const t = NOTIF_TYPES[type] || NOTIF_TYPES.info;

  // Toast popup
  showToastNotif(msg, t);

  // Save to bell store
  if (persist) {
    const notifs = getNotifsStore();
    notifs.unshift({ id: Date.now(), msg, type, icon: t.icon, time: new Date().toISOString(), read: false });
    saveNotifs(notifs);
    updateBellCount();
  }
};

/* ── TOAST NOTIFICATION ── */
function showToastNotif(msg, t) {
  // Remove any existing notif toasts
  document.querySelectorAll('.notif-toast').forEach(el => el.remove());

  const el = document.createElement('div');
  el.className = 'notif-toast';
  el.innerHTML = `<span class="notif-toast-icon">${t.icon}</span><span class="notif-toast-msg">${msg}</span><button class="notif-toast-close" onclick="this.parentElement.remove()">✕</button>`;
  el.style.borderLeftColor = t.color;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add('notif-show'), 10);
  setTimeout(() => { el.classList.remove('notif-show'); setTimeout(() => el.remove(), 400); }, 5000);
}

/* ── UPDATE BELL BADGE ── */
function updateBellCount() {
  const notifs  = getNotifsStore();
  const unread  = notifs.filter(n => !n.read).length;
  const bell    = document.getElementById('notifBell');
  const badge   = document.getElementById('notifBadge');
  if (!bell) return;
  if (badge) { badge.textContent = unread > 9 ? '9+' : unread; badge.style.display = unread > 0 ? 'flex' : 'none'; }
}

/* ── TOGGLE NOTIFICATION PANEL ── */
window.toggleNotifPanel = function() {
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  const isOpen = panel.classList.contains('open');
  if (isOpen) { panel.classList.remove('open'); return; }
  renderNotifPanel();
  panel.classList.add('open');

  // Mark all as read
  const notifs = getNotifsStore().map(n => ({ ...n, read: true }));
  saveNotifs(notifs);
  updateBellCount();
};

/* ── RENDER PANEL ── */
function renderNotifPanel() {
  const panel  = document.getElementById('notifPanel');
  const notifs = getNotifsStore();
  if (!panel) return;

  panel.innerHTML = `
    <div class="np-header">
      <span class="np-title">🔔 NOTIFICATIONS</span>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="np-clear" onclick="clearAllNotifs()">Clear all</button>
        <button class="np-close" onclick="toggleNotifPanel()">✕</button>
      </div>
    </div>
    <div class="np-list">
      ${notifs.length === 0
        ? '<div class="np-empty">No notifications yet</div>'
        : notifs.map(n => `
            <div class="np-item ${n.read ? 'read' : 'unread'}">
              <span class="np-item-icon">${n.icon}</span>
              <div class="np-item-content">
                <div class="np-item-msg">${n.msg}</div>
                <div class="np-item-time">${timeAgo(n.time)}</div>
              </div>
            </div>`).join('')}
    </div>`;
}

window.clearAllNotifs = function() {
  saveNotifs([]);
  renderNotifPanel();
  updateBellCount();
};

/* ── SEED DEFAULT NOTIFICATIONS ── */
window.seedDefaultNotifs = function() {
  const existing = getNotifsStore();
  if (existing.length > 0) { updateBellCount(); return; }

  const defaults = [
    { msg:'🎉 Welcome to CyberPath Pro! Start by checking out the AI Finder.', type:'success' },
    { msg:'🚨 Critical: Apache RCE vulnerability (CVE-2024-XXXX) — patch now!', type:'danger' },
    { msg:'🎓 New Course Added: Certified in Cybersecurity (CC) by ISC2 — 100% Free!', type:'course' },
    { msg:'⚡ Tip: Use the keyboard shortcut "4" to quickly open Advanced Tools', type:'info' },
    { msg:'🤖 AI Assistant is ready — ask it "I want to become a SOC analyst"', type:'info' },
    { msg:'📰 Threat Alert: LockBit 3.0 actively targeting healthcare systems', type:'danger' },
  ];

  const notifs = defaults.map((n, i) => ({
    id: Date.now() + i,
    msg: n.msg,
    type: n.type,
    icon: NOTIF_TYPES[n.type]?.icon || 'ℹ️',
    time: new Date(Date.now() - i * 3600000).toISOString(),
    read: false,
  }));
  saveNotifs(notifs);
  updateBellCount();
};

/* ── SCHEDULED NOTIFICATIONS ── */
window.checkScheduledNotifs = function() {
  const gs    = (typeof getGS === 'function') ? getGS() : {};
  const today = new Date().toISOString().split('T')[0];

  // Daily learning reminder
  if (gs.lastQuizDate !== today) {
    setTimeout(() => pushNotif('📚 Daily Reminder: Take today\'s cyber quiz and earn XP!', 'info', false), 3000);
  }

  // Streak reminder
  if ((gs.streak || 0) >= 3) {
    setTimeout(() => pushNotif(`🔥 ${gs.streak} day streak! Keep it going — login tomorrow too!`, 'xp', false), 5000);
  }
};

/* ── UTILS ── */
function timeAgo(iso) {
  if (!iso) return 'just now';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hrs  < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

/* ── CLOSE PANEL ON OUTSIDE CLICK ── */
document.addEventListener('click', e => {
  const panel = document.getElementById('notifPanel');
  const bell  = document.getElementById('notifBell');
  if (panel?.classList.contains('open') && !panel.contains(e.target) && !bell?.contains(e.target)) {
    panel.classList.remove('open');
  }
});
