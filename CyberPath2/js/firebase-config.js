/* ══════════════════════════════════════════════
   CYBERVAULT PRO — FIREBASE CONFIG
   ══════════════════════════════════════════════
   SETUP STEPS:
   1. Go to https://console.firebase.google.com
   2. Create project → "CyberVault"
   3. Add Web App → copy config below
   4. Enable Auth → Email/Password + Google
   5. Enable Firestore → test mode → asia-south1
   6. Replace the values below with your own
   ══════════════════════════════════════════════ */

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY_HERE",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

const FIREBASE_CONFIG_VALID = !firebaseConfig.apiKey.startsWith('YOUR_');

/* ── INIT ── */
let db = null, auth = null;
let FIREBASE_READY = false;

if (FIREBASE_CONFIG_VALID) {
  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      db   = firebase.firestore();
      auth = firebase.auth();
      FIREBASE_READY = true;
      db.enablePersistence().catch(() => {});
      console.log('%c⬡ CyberVault Firebase Connected', 'color:#00d4ff;font-weight:bold');
    }
  } catch(e) {
    console.warn('Firebase init failed — running in local mode:', e.message);
    db = null; auth = null; FIREBASE_READY = false;
  }
} else {
  console.info('%c⬡ CyberPath running in local mode (Firebase not configured). Set keys in js/firebase-config.js to enable cloud sync.', 'color:#f59e0b;font-weight:bold');
}

/* ── Google Provider ── */
let googleProvider = null;
if (FIREBASE_READY) {
  googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
}

/* ══════════════════════════════════════════════
   FIRESTORE / LOCALSTORAGE HELPERS
   All reads/writes go through FS.*
   Falls back to localStorage if Firebase not set up
   ══════════════════════════════════════════════ */
const FS = {

  async saveUser(uid, data) {
    const key = 'cv_user_' + uid;
    const merged = { ...JSON.parse(localStorage.getItem(key) || '{}'), ...data };
    localStorage.setItem(key, JSON.stringify(merged));
    if (!db) return;
    try { await db.collection('users').doc(uid).set(data, { merge: true }); } catch(e) {}
  },

  async getUser(uid) {
    if (db) {
      try {
        const doc = await db.collection('users').doc(uid).get();
        if (doc.exists) return doc.data();
      } catch(e) {}
    }
    const d = localStorage.getItem('cv_user_' + uid);
    return d ? JSON.parse(d) : null;
  },

  async addRecord(uid, col, data) {
    const key = `cv_${col}_${uid}`;
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    const record = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
    arr.unshift(record);
    localStorage.setItem(key, JSON.stringify(arr.slice(0, 300)));
    if (!db) return;
    try { await db.collection('users').doc(uid).collection(col).add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() }); } catch(e) {}
  },

  async getRecords(uid, col, limit = 50) {
    if (db) {
      try {
        const snap = await db.collection('users').doc(uid).collection(col).orderBy('createdAt','desc').limit(limit).get();
        if (!snap.empty) return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch(e) {}
    }
    const key = `cv_${col}_${uid}`;
    return JSON.parse(localStorage.getItem(key) || '[]').slice(0, limit);
  },

  async deleteRecord(uid, col, id) {
    const key = `cv_${col}_${uid}`;
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify(arr.filter(r => r.id != id)));
    if (!db) return;
    try { await db.collection('users').doc(uid).collection(col).doc(id).delete(); } catch(e) {}
  },

  async incStat(uid, stat) {
    const key = `cv_stats_${uid}`;
    const stats = JSON.parse(localStorage.getItem(key) || '{}');
    stats[stat] = (stats[stat] || 0) + 1;
    stats.total = (stats.total || 0) + 1;
    const today = new Date().toISOString().split('T')[0];
    if (!stats.daily) stats.daily = {};
    stats.daily[today] = (stats.daily[today] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(stats));
    if (db) { try { await db.collection('users').doc(uid).set({ stats: { [stat]: firebase.firestore.FieldValue.increment(1) } }, { merge: true }); } catch(e) {} }
  },

  getStats(uid) {
    return JSON.parse(localStorage.getItem(`cv_stats_${uid}`) || '{}');
  }
};

window.FS = FS;
window.FIREBASE_READY = FIREBASE_READY;
