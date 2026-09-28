/* ══════════════════════════════════════════════
   CYBERPATH — LEARNING-PLAN.JS v2.0
   P1: Weak area auto-integration
   P2: Interactive progress tracking
   P3: Resource links clickable
   P4: Plan versions (save 3)
══════════════════════════════════════════════ */

/* ── CONSTANTS ── */
const MAX_PLAN_VERSIONS = 3;

const TOPIC_LABELS = {
  networking:'Networking', linux:'Linux & OS', web:'Web Security',
  crypto:'Cryptography', malware:'Malware & Threats', cloud:'Cloud Security',
  soc:'SOC & Blue Team', concepts:'Security Concepts'
};

const RESOURCE_LINKS = {
  'TryHackMe':            'https://tryhackme.com',
  'Hack The Box':         'https://hackthebox.com',
  'PortSwigger':          'https://portswigger.net/web-security',
  'OverTheWire':          'https://overthewire.org/wargames/bandit',
  'Cisco NetAcad':        'https://netacad.com',
  'Google Cybersecurity': 'https://coursera.org/google-certificates/cybersecurity-certificate',
  'ISC2 CC':              'https://isc2.org/certifications/cc',
  'freeCodeCamp':         'https://freecodecamp.org',
  'CyberDefenders':       'https://cyberdefenders.org',
  'LetsDefend':           'https://letsdefend.io',
  'Cybrary':              'https://cybrary.it',
  'Professor Messer':     'https://professormesser.com',
  'SANS':                 'https://sans.org',
  'Blue Team Labs':       'https://blueteamlabs.online',
  'PicoCTF':              'https://picoctf.org',
  'pwn.college':          'https://pwn.college',
  'Cryptohack':           'https://cryptohack.org',
  'OWASP WebGoat':        'https://owasp.org/www-project-webgoat',
  'VulnHub':              'https://vulnhub.com',
  'AWS Skill Builder':    'https://explore.skillbuilder.aws',
  'Google Cloud Skills':  'https://cloudskillsboost.google',
  'Microsoft Learn':      'https://learn.microsoft.com',
  'Linux Foundation':     'https://training.linuxfoundation.org',
  'Subnetting Practice':  'https://subnettingpractice.com',
};

/* ── SYSTEM PROMPT ── */
function buildLearningPlanPrompt(userData) {
  const { level, goal, time, existing, context, weakAreas, strongAreas, quizScores, xpLevel } = userData;

  return `You are CyberPath AI Learning Planner — an expert cybersecurity educator who creates structured, personalized learning plans.

USER CONTEXT (CRITICAL — use this to personalize the plan):
- Skill Level: ${level}
- Career Goal: ${goal}
- Daily Time Available: ${time}
- Existing Knowledge: ${existing.length ? existing.join(', ') : 'None mentioned'}
- Platform Level: ${xpLevel}
${weakAreas.length > 0 ? `- WEAK AREAS (prioritize these): ${weakAreas.join(', ')}` : ''}
${strongAreas.length > 0 ? `- STRONG AREAS (can go faster): ${strongAreas.join(', ')}` : ''}
${context ? `- Additional context: ${context}` : ''}

IMPORTANT RULES:
1. If weak areas exist, Week 1 MUST address the weakest topic first
2. Strong areas can be covered faster (fewer days)
3. All resources must be real and free unless user asks for paid
4. Each task must be specific and completable in the stated duration
5. Include the exact resource name (platform name) for every task

RESPOND IN THIS EXACT JSON FORMAT ONLY (no markdown, no extra text):
{
  "title": "Personalized plan title mentioning goal",
  "summary": "2 sentences describing this plan and why it's personalized for this user",
  "total_duration": "X months",
  "daily_commitment": "${time}",
  "skill_level_end": "What level they reach by end",
  "personalization_note": "One sentence explaining how weak/strong areas shaped this plan",
  "weekly_plan": [
    {
      "week": 1,
      "theme": "Week theme — mention the topic",
      "focus_reason": "Why this week focuses on this (e.g. 'Your Networking score needs work')",
      "daily_tasks": [
        {"day": "Mon", "task": "Specific actionable task", "duration": "1h", "resource": "Exact resource name", "resource_url": "https://..."},
        {"day": "Tue", "task": "Specific actionable task", "duration": "1h", "resource": "Exact resource name", "resource_url": "https://..."},
        {"day": "Wed", "task": "Specific actionable task", "duration": "1h", "resource": "Exact resource name", "resource_url": "https://..."},
        {"day": "Thu", "task": "Specific actionable task", "duration": "1h", "resource": "Exact resource name", "resource_url": "https://..."},
        {"day": "Fri", "task": "Specific actionable task", "duration": "1h", "resource": "Exact resource name", "resource_url": "https://..."},
        {"day": "Sat", "task": "Hands-on lab or practice", "duration": "2h", "resource": "Exact resource name", "resource_url": "https://..."},
        {"day": "Sun", "task": "Review + self-quiz", "duration": "45min", "resource": "CyberPath Quiz", "resource_url": "quiz"}
      ]
    },
    {"week": 2, "theme": "...", "focus_reason": "...", "daily_tasks": [...]},
    {"week": 3, "theme": "...", "focus_reason": "...", "daily_tasks": [...]},
    {"week": 4, "theme": "...", "focus_reason": "...", "daily_tasks": [...]}
  ],
  "monthly_milestones": [
    {"month": 1, "milestone": "Specific achievement", "skills": ["skill1", "skill2"], "checkpoint": "How to verify you reached this milestone"},
    {"month": 2, "milestone": "Specific achievement", "skills": ["skill1", "skill2"], "checkpoint": "How to verify"},
    {"month": 3, "milestone": "Specific achievement", "skills": ["skill1", "skill2"], "checkpoint": "How to verify"}
  ],
  "practice_activities": [
    {"activity": "Activity description", "platform": "Platform name", "url": "https://..."},
    {"activity": "Activity description", "platform": "Platform name", "url": "https://..."},
    {"activity": "Activity description", "platform": "Platform name", "url": "https://..."},
    {"activity": "Activity description", "platform": "Platform name", "url": "https://..."}
  ],
  "recommended_resources": [
    {"name": "Resource name", "type": "course/lab/docs/video", "free": true, "url": "https://...", "why": "One sentence why this resource for this user"},
    {"name": "Resource name", "type": "course/lab/docs/video", "free": true, "url": "https://...", "why": "One sentence why"},
    {"name": "Resource name", "type": "course/lab/docs/video", "free": false, "url": "https://...", "why": "One sentence why"}
  ],
  "first_project": {"title": "Project name", "description": "What to build", "skills": ["skill1","skill2"]},
  "final_project": {"title": "Project name", "description": "What to build", "skills": ["skill1","skill2"]},
  "next_step_after_plan": "Specific next step with resource name"
}`;
}

/* ── PLAN STORAGE ── */
function getPlanVersions() {
  const uid = window.CV_USER?.uid || 'guest';
  return JSON.parse(localStorage.getItem('cp_plan_versions_' + uid) || '[]');
}

function savePlanVersion(plan) {
  const uid      = window.CV_USER?.uid || 'guest';
  let versions   = getPlanVersions();
  const version  = {
    ...plan,
    versionId:   Date.now(),
    savedAt:     new Date().toISOString(),
    versionLabel: `Plan ${versions.length + 1} — ${plan.goal || 'Custom'}`,
  };
  versions.unshift(version);
  if (versions.length > MAX_PLAN_VERSIONS) versions = versions.slice(0, MAX_PLAN_VERSIONS);
  localStorage.setItem('cp_plan_versions_' + uid, JSON.stringify(versions));
  // Also save as active
  localStorage.setItem('cp_learning_plan_' + uid, JSON.stringify(version));
  return version;
}

function getActivePlan() {
  const uid = window.CV_USER?.uid || 'guest';
  const d   = localStorage.getItem('cp_learning_plan_' + uid);
  return d ? JSON.parse(d) : null;
}

/* ── PROGRESS STORAGE ── */
function getPlanProgress(versionId) {
  const uid = window.CV_USER?.uid || 'guest';
  return JSON.parse(localStorage.getItem(`cp_plan_progress_${uid}_${versionId}`) || '{}');
}

function savePlanProgress(versionId, progress) {
  const uid = window.CV_USER?.uid || 'guest';
  localStorage.setItem(`cp_plan_progress_${uid}_${versionId}`, JSON.stringify(progress));
}

/* ── STATE ── */
let lpSelections = { time: null };
let currentPlan  = null;
let activePlanId = null;

/* ══════════════════════════════════════════════
   RENDER MAIN PAGE
══════════════════════════════════════════════ */
window.renderLearningPlan = function() {
  const el = document.getElementById('learningPlanBody');
  if (!el) return;

  // Gather quiz data for auto-integration (P1)
  const scores     = window.getQuizScores ? getQuizScores() : {};
  const weakAreas  = Object.entries(scores).filter(([,v])=>v<60).map(([k])=>TOPIC_LABELS[k]||k);
  const strongAreas= Object.entries(scores).filter(([,v])=>v>=80).map(([k])=>TOPIC_LABELS[k]||k);
  const versions   = getPlanVersions();
  const activePlan = getActivePlan();

  el.innerHTML = `
    <div class="lp-layout">

      <!-- ─── FORM PANEL ─── -->
      <div class="lp-form-panel">
        <div class="lp-form-title">📅 Build Your Learning Plan</div>
        <div class="lp-form-sub">Gemini AI creates a personalized daily/weekly plan</div>

        <!-- P1: Weak area auto-integration banner -->
        ${weakAreas.length > 0 ? `
          <div class="lp-weak-banner">
            <div class="lp-weak-banner-title">⚡ AUTO-DETECTED FROM YOUR QUIZZES</div>
            <div class="lp-weak-banner-body">
              Your plan will prioritize:
              ${weakAreas.map(w=>`<span class="lp-weak-tag">${w}</span>`).join('')}
            </div>
            ${strongAreas.length > 0 ? `<div class="lp-strong-body">Moving faster through: ${strongAreas.map(s=>`<span class="lp-strong-tag">${s}</span>`).join('')}</div>` : ''}
          </div>` : `
          <div class="lp-quiz-prompt">
            <span>🧪</span>
            <div>
              <div style="font-family:var(--font-m);font-size:0.72rem;color:var(--text2)">Take quizzes for auto-personalization</div>
              <button class="lp-quiz-link" onclick="navigate('quiz')">Take Quiz Now →</button>
            </div>
          </div>`}

        <!-- Skill Level -->
        <div class="lp-form-group">
          <label class="lp-label">CURRENT SKILL LEVEL</label>
          <div class="lp-radio-group">
            ${[
              {val:'complete-beginner', label:'🌱 Complete Beginner', sub:'No IT/security background'},
              {val:'it-background',     label:'💻 IT Background',     sub:'Know networking/Linux basics'},
              {val:'intermediate',      label:'⚡ Intermediate',       sub:'Some security knowledge'},
              {val:'advanced',          label:'🔥 Advanced',           sub:'Working in tech/security'},
            ].map(o=>`
              <label class="lp-radio-card">
                <input type="radio" name="lp_level" value="${o.val}">
                <div class="lp-radio-content">
                  <div class="lp-radio-label">${o.label}</div>
                  <div class="lp-radio-sub">${o.sub}</div>
                </div>
              </label>`).join('')}
          </div>
        </div>

        <!-- Career Goal -->
        <div class="lp-form-group">
          <label class="lp-label">CAREER GOAL</label>
          <select class="lp-select" id="lp_goal">
            <option value="">Select your target role...</option>
            <option value="SOC Analyst">🔍 SOC Analyst</option>
            <option value="Penetration Tester">⚡ Penetration Tester</option>
            <option value="Bug Bounty Hunter">💰 Bug Bounty Hunter</option>
            <option value="Malware Analyst / DFIR">🦠 Malware Analyst / DFIR</option>
            <option value="Cloud Security Engineer">☁️ Cloud Security Engineer</option>
            <option value="Security Engineer">⚙️ Security Engineer</option>
            <option value="GRC Analyst">📋 GRC Analyst</option>
            <option value="Web / AppSec Engineer">🌐 Web / AppSec Engineer</option>
            <option value="Security Researcher">🔬 Security Researcher</option>
            <option value="General Cybersecurity">🛡️ General Cybersecurity</option>
          </select>
        </div>

        <!-- Time -->
        <div class="lp-form-group">
          <label class="lp-label">TIME AVAILABLE PER DAY</label>
          <div class="lp-options-row">
            ${['30 min','1 hour','2 hours','3+ hours'].map(t=>`
              <button class="lp-opt-btn" data-group="time" data-val="${t}" onclick="selectLPOpt(this,'time')">${t}</button>`).join('')}
          </div>
        </div>

        <!-- Existing Knowledge -->
        <div class="lp-form-group">
          <label class="lp-label">EXISTING KNOWLEDGE</label>
          <div class="lp-check-grid">
            ${['Basic networking','Linux basics','Python/programming','Windows admin','Web technologies','Cloud basics','None of the above'].map(k=>`
              <label class="lp-check-item">
                <input type="checkbox" value="${k}" class="lp-checkbox"> ${k}
              </label>`).join('')}
          </div>
        </div>

        <!-- Context -->
        <div class="lp-form-group">
          <label class="lp-label">EXTRA CONTEXT <span style="color:var(--text3)">(optional)</span></label>
          <textarea class="lp-textarea" id="lp_context" rows="2"
            placeholder="e.g. I have an interview in 3 months, I'm a CS student..."></textarea>
        </div>

        <button class="lp-generate-btn" id="lpGenBtn" onclick="generateLearningPlan()">
          <span id="lpBtnText">⚡ GENERATE MY PLAN</span>
          <span id="lpBtnLoader" style="display:none">⟳ Building your plan...</span>
        </button>

        <!-- P4: Saved plan versions -->
        ${versions.length > 0 ? `
          <div class="lp-versions-section">
            <div class="lp-versions-title">📌 SAVED PLANS (${versions.length}/${MAX_PLAN_VERSIONS})</div>
            ${versions.map((v,i) => `
              <div class="lp-version-item ${activePlan?.versionId === v.versionId ? 'active' : ''}">
                <div class="lp-version-info">
                  <div class="lp-version-label">${v.versionLabel || 'Plan '+(i+1)}</div>
                  <div class="lp-version-date">${new Date(v.savedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</div>
                </div>
                <div class="lp-version-actions">
                  <button class="lp-version-load" onclick="loadPlanVersion(${v.versionId})">Load</button>
                  <button class="lp-version-del"  onclick="deletePlanVersion(${v.versionId})">✕</button>
                </div>
              </div>`).join('')}
            ${versions.length >= MAX_PLAN_VERSIONS ? `<div class="lp-versions-max">Max ${MAX_PLAN_VERSIONS} plans. Delete one to save new.</div>` : ''}
          </div>` : ''}
      </div>

      <!-- ─── RESULT PANEL ─── -->
      <div class="lp-result-panel" id="lpResult">
        ${activePlan
          ? buildPlanHTML(activePlan, getPlanProgress(activePlan.versionId))
          : `<div class="lp-result-empty">
              <div class="lp-empty-icon">📅</div>
              <div class="lp-empty-title">Your Learning Plan Will Appear Here</div>
              <div class="lp-empty-desc">Fill the form and click Generate. Gemini AI creates a personalized daily/weekly plan with your weak areas prioritized automatically.</div>
            </div>`}
      </div>
    </div>`;
};

/* ══════════════════════════════════════════════
   GENERATE PLAN
══════════════════════════════════════════════ */
window.generateLearningPlan = async function() {
  const level   = document.querySelector('input[name="lp_level"]:checked')?.value;
  const goal    = document.getElementById('lp_goal')?.value;
  const time    = lpSelections.time;
  const context = document.getElementById('lp_context')?.value?.trim();
  const existing= [...document.querySelectorAll('.lp-checkbox:checked')].map(c=>c.value);

  if (!level) { showToast('⚠️ Select your skill level'); return; }
  if (!goal)  { showToast('⚠️ Select your career goal'); return; }
  if (!time)  { showToast('⚠️ Select time available');   return; }

  // Check version limit (P4)
  const versions = getPlanVersions();
  if (versions.length >= MAX_PLAN_VERSIONS) {
    showToast(`⚠️ Max ${MAX_PLAN_VERSIONS} plans saved. Delete one first.`);
    return;
  }

  const btn    = document.getElementById('lpGenBtn');
  const btnTxt = document.getElementById('lpBtnText');
  const loader = document.getElementById('lpBtnLoader');
  const result = document.getElementById('lpResult');

  if (btn) btn.disabled = true;
  if (btnTxt) btnTxt.style.display = 'none';
  if (loader) loader.style.display = 'inline';

  result.innerHTML = `
    <div class="lp-loading">
      <div class="lp-loading-icon">📅</div>
      <div class="lp-loading-text">Building your personalized plan...</div>
      <div class="lp-loading-sub">Analyzing your quiz scores and weak areas</div>
      <div class="lp-loading-dots"><span></span><span></span><span></span></div>
    </div>`;

  // P1: Gather quiz data for personalization
  const scores      = window.getQuizScores ? getQuizScores() : {};
  const weakAreas   = Object.entries(scores).filter(([,v])=>v<60).map(([k])=>TOPIC_LABELS[k]||k);
  const strongAreas = Object.entries(scores).filter(([,v])=>v>=80).map(([k])=>TOPIC_LABELS[k]||k);
  const gs          = (typeof getGS === 'function')   ? getGS()   : { xp:0 };
  const lvlObj      = (typeof getLevel === 'function') ? getLevel(gs.xp) : { title:'Beginner' };

  const userData = { level, goal, time, existing, context, weakAreas, strongAreas, quizScores: scores, xpLevel: lvlObj.title };

  try {
    let raw = await callAI(
      buildLearningPlanPrompt(userData),
      `Create my learning plan. Goal: ${goal}, Level: ${level}, Time: ${time}${weakAreas.length?', Weak: '+weakAreas.join(', '):''}${context?', Context: '+context:''}`,
      1000
    );
    raw = raw.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim();
    const plan   = JSON.parse(raw);
    plan.goal    = goal;
    plan.level   = level;
    plan.time    = time;
    const saved  = savePlanVersion(plan);
    currentPlan  = saved;
    activePlanId = saved.versionId;
    result.innerHTML = buildPlanHTML(saved, {});
    renderLearningPlanSidebar();
  } catch(e) {
    const errMsg = window.getAIErrorMessage ? getAIErrorMessage(e.message) : e.message;
    if (e.message === 'NO_API_KEY' || e.message === 'INVALID_KEY') {
      showFallbackPlan(level, goal, time, weakAreas, result);
    } else {
      showFallbackPlan(level, goal, time, weakAreas, result);
    }
  }

  if (btn) btn.disabled = false;
  if (btnTxt) btnTxt.style.display = 'inline';
  if (loader) loader.style.display = 'none';
};

/* ══════════════════════════════════════════════
   BUILD PLAN HTML (P2: progress tracking, P3: clickable links)
══════════════════════════════════════════════ */
function buildPlanHTML(plan, progress) {
  const vid       = plan.versionId || 'legacy';
  const allDays   = [];
  (plan.weekly_plan||[]).forEach((w,wi)=>(w.daily_tasks||[]).forEach((_,di)=>allDays.push(`${wi}-${di}`)));
  const doneDays  = Object.keys(progress).filter(k=>progress[k]).length;
  const totalDays = allDays.length;
  const pct       = totalDays > 0 ? Math.round((doneDays/totalDays)*100) : 0;

  return `
    <div class="lp-plan-card">

      <!-- Header -->
      <div class="lp-plan-header">
        <div>
          <div class="lp-plan-title">${plan.title || 'Your Learning Plan'}</div>
          <div class="lp-plan-summary">${plan.summary || ''}</div>
          ${plan.personalization_note ? `<div class="lp-personalization-note">⚡ ${plan.personalization_note}</div>` : ''}
        </div>
        <button class="lp-regen-btn" onclick="generateLearningPlan()" title="Generate new plan">🔄</button>
      </div>

      <!-- Meta -->
      <div class="lp-plan-meta">
        <div class="lp-meta-card">⏱<strong>${plan.total_duration||'3 months'}</strong><small>Duration</small></div>
        <div class="lp-meta-card">📅<strong>${plan.daily_commitment||plan.time||'1h'}</strong><small>Per Day</small></div>
        <div class="lp-meta-card">🎯<strong>${plan.skill_level_end||'Intermediate'}</strong><small>End Level</small></div>
      </div>

      <!-- P2: Progress Tracker -->
      <div class="lp-progress-section">
        <div class="lp-progress-header">
          <span class="lp-progress-title">📊 PLAN PROGRESS</span>
          <span class="lp-progress-nums">${doneDays} / ${totalDays} days complete</span>
        </div>
        <div class="lp-progress-bar-wrap">
          <div class="lp-progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="lp-progress-pct">${pct}% complete ${pct===100?'🏆 Plan Complete!':''}</div>
      </div>

      <!-- Week-by-Week -->
      <div class="lp-section-title">📅 WEEK-BY-WEEK PLAN</div>
      <div class="lp-weeks">
        ${(plan.weekly_plan||[]).map((w,wi)=>`
          <div class="lp-week">
            <div class="lp-week-header">
              <span class="lp-week-num">Week ${w.week||wi+1}</span>
              <span class="lp-week-theme">${w.theme||''}</span>
            </div>
            ${w.focus_reason ? `<div class="lp-focus-reason">💡 ${w.focus_reason}</div>` : ''}
            <div class="lp-days">
              ${(w.daily_tasks||[]).map((d,di)=>{
                const key   = `${wi}-${di}`;
                const done  = progress[key] || false;
                const url   = d.resource_url || findResourceUrl(d.resource);
                return `
                  <div class="lp-day ${done?'lp-day-done':''}">
                    <!-- P2: Checkbox -->
                    <label class="lp-day-check">
                      <input type="checkbox" ${done?'checked':''} onchange="toggleDayDone('${vid}','${key}',this.checked)">
                      <span class="lp-check-box">${done?'✓':''}</span>
                    </label>
                    <span class="lp-day-label">${d.day}</span>
                    <div class="lp-day-content">
                      <div class="lp-day-task ${done?'lp-task-done':''}">${d.task}</div>
                      <div class="lp-day-meta">
                        <span class="lp-day-time">⏱ ${d.duration||'1h'}</span>
                        <!-- P3: Clickable resource link -->
                        ${url && url !== 'quiz'
                          ? `<a href="${url}" target="_blank" class="lp-day-resource-link">📖 ${d.resource} ↗</a>`
                          : url === 'quiz'
                          ? `<button class="lp-day-resource-btn" onclick="navigate('quiz')">📖 ${d.resource} →</button>`
                          : `<span class="lp-day-resource">📖 ${d.resource}</span>`}
                      </div>
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </div>`).join('')}
      </div>

      <!-- Monthly Milestones -->
      ${(plan.monthly_milestones||[]).length > 0 ? `
        <div class="lp-section-title">🏆 MONTHLY MILESTONES</div>
        <div class="lp-milestones">
          ${(plan.monthly_milestones||[]).map(m=>`
            <div class="lp-milestone">
              <div class="lp-milestone-month">Month ${m.month}</div>
              <div class="lp-milestone-text">${m.milestone}</div>
              ${m.checkpoint ? `<div class="lp-checkpoint">✅ Checkpoint: ${m.checkpoint}</div>` : ''}
              <div class="lp-milestone-skills">
                ${(m.skills||[]).map(s=>`<span class="lp-skill-tag">${s}</span>`).join('')}
              </div>
            </div>`).join('')}
        </div>` : ''}

      <!-- 2col: Practice + Resources (P3: all links clickable) -->
      <div class="lp-2col">
        <div>
          <div class="lp-section-title">🧪 PRACTICE ACTIVITIES</div>
          ${(plan.practice_activities||[]).map(a=>{
            const isObj = typeof a === 'object';
            const url   = isObj ? a.url : findResourceUrl(a);
            const text  = isObj ? a.activity : a;
            const plat  = isObj ? a.platform : '';
            return `<div class="lp-practice-item">
              <span class="lp-practice-dot">→</span>
              <div>
                <div class="lp-practice-text">${text}</div>
                ${url ? `<a href="${url}" target="_blank" class="lp-practice-link">${plat||'Open'} ↗</a>` : ''}
              </div>
            </div>`;
          }).join('')}
        </div>
        <div>
          <div class="lp-section-title">📚 KEY RESOURCES</div>
          ${(plan.recommended_resources||[]).map(r=>`
            <div class="lp-resource-item">
              <div class="lp-resource-top">
                ${r.url
                  ? `<a href="${r.url}" target="_blank" class="lp-resource-name-link">${r.name} ↗</a>`
                  : `<span class="lp-resource-name">${r.name}</span>`}
                <span class="lp-resource-free ${r.free?'free':'paid'}">${r.free?'FREE':'PAID'}</span>
              </div>
              ${r.why ? `<div class="lp-resource-why">${r.why}</div>` : ''}
              <span class="lp-resource-type">${r.type||'resource'}</span>
            </div>`).join('')}
        </div>
      </div>

      <!-- Projects -->
      <div class="lp-2col">
        ${plan.first_project ? `
          <div class="lp-project-box">
            <div class="lp-section-title">💡 MONTH 1 PROJECT</div>
            <div class="lp-project-name">${typeof plan.first_project==='object'?plan.first_project.title:plan.first_project}</div>
            ${typeof plan.first_project==='object'&&plan.first_project.description ? `<div class="lp-project-text">${plan.first_project.description}</div>` : ''}
            <button class="lp-project-gen-btn" onclick="navigate('projects')">💡 Generate Full Project →</button>
          </div>` : ''}
        ${plan.final_project ? `
          <div class="lp-project-box lp-project-final">
            <div class="lp-section-title">🚀 FINAL PROJECT</div>
            <div class="lp-project-name">${typeof plan.final_project==='object'?plan.final_project.title:plan.final_project}</div>
            ${typeof plan.final_project==='object'&&plan.final_project.description ? `<div class="lp-project-text">${plan.final_project.description}</div>` : ''}
          </div>` : ''}
      </div>

      <!-- Next Step -->
      ${plan.next_step_after_plan ? `
        <div class="lp-next-box">
          <div class="lp-section-title">🎯 AFTER THIS PLAN</div>
          <div class="lp-next-text">${plan.next_step_after_plan}</div>
        </div>` : ''}

      <!-- Actions -->
      <div class="lp-actions">
        <button class="lp-act-btn lp-act-primary" onclick="navigate('advisor');setTimeout(()=>askAdvisor('I have a learning plan for ${plan.goal||'cybersecurity'}. What should I focus on first this week?'),500)">🤖 Ask AI Advisor</button>
        <button class="lp-act-btn lp-act-secondary" onclick="navigate('quiz')">🧪 Take a Quiz</button>
        <button class="lp-act-btn lp-act-secondary" onclick="generateLearningPlan()">🔄 Generate New Plan</button>
      </div>

    </div>`;
}

/* ── P2: Toggle Day Done ── */
window.toggleDayDone = function(versionId, key, done) {
  const progress    = getPlanProgress(versionId);
  const wasDone     = !!progress[key];
  progress[key]     = done;
  savePlanProgress(versionId, progress);

  // Award XP for completing a day (only on newly-completed)
  if (done && !wasDone && typeof awardXP === 'function') {
    awardXP('plan_day_completed');
  }

  // Re-render only the progress section
  const plan = getActivePlan();
  if (!plan) return;
  const allDays  = [];
  (plan.weekly_plan||[]).forEach((w,wi)=>(w.daily_tasks||[]).forEach((_,di)=>allDays.push(`${wi}-${di}`)));
  const doneDays = Object.keys(progress).filter(k=>progress[k]).length;
  const totalDays= allDays.length;
  const pct      = Math.round((doneDays/totalDays)*100);

  const progBar = document.querySelector('.lp-progress-bar-fill');
  const progNums= document.querySelector('.lp-progress-nums');
  const progPct = document.querySelector('.lp-progress-pct');
  if (progBar)  progBar.style.width  = pct + '%';
  if (progNums) progNums.textContent = `${doneDays} / ${totalDays} days complete`;
  if (progPct)  progPct.textContent  = `${pct}% complete ${pct===100?'🏆 Plan Complete!':''}`;

  // Style the day row
  const dayEl = document.querySelector(`[data-daykey="${key}"]`);
  if (dayEl) dayEl.classList.toggle('lp-day-done', done);
};

/* ── P4: Load / Delete plan version ── */
window.loadPlanVersion = function(versionId) {
  const versions = getPlanVersions();
  const plan     = versions.find(v=>v.versionId===versionId);
  if (!plan) return;
  const uid = window.CV_USER?.uid || 'guest';
  localStorage.setItem('cp_learning_plan_' + uid, JSON.stringify(plan));
  const result = document.getElementById('lpResult');
  if (result) result.innerHTML = buildPlanHTML(plan, getPlanProgress(versionId));
  showToast('📅 Plan loaded!');
};

window.deletePlanVersion = function(versionId) {
  if (!confirm('Delete this plan?')) return;
  const uid      = window.CV_USER?.uid || 'guest';
  let versions   = getPlanVersions();
  versions       = versions.filter(v=>v.versionId!==versionId);
  localStorage.setItem('cp_plan_versions_' + uid, JSON.stringify(versions));
  localStorage.removeItem(`cp_plan_progress_${uid}_${versionId}`);
  renderLearningPlan();
  showToast('🗑️ Plan deleted');
};

function renderLearningPlanSidebar() {
  // Soft re-render only sidebar version list — avoid full re-render
  renderLearningPlan();
}

/* ── RESOURCE URL FINDER (P3) ── */
function findResourceUrl(resourceName) {
  if (!resourceName) return null;
  for (const [key, url] of Object.entries(RESOURCE_LINKS)) {
    if (resourceName.toLowerCase().includes(key.toLowerCase())) return url;
  }
  return null;
}

/* ── FALLBACK PLAN ── */
function showFallbackPlan(level, goal, time, weakAreas, result) {
  const fallback = {
    title: `Getting Started: ${goal}`,
    summary: `A foundational plan for ${level} level learners targeting ${goal}. ${weakAreas.length > 0 ? 'Prioritizing your weak areas: ' + weakAreas.join(', ') + '.' : ''}`,
    personalization_note: weakAreas.length > 0 ? `Plan starts with ${weakAreas[0]} based on your quiz performance` : null,
    total_duration: '3 months',
    daily_commitment: time,
    skill_level_end: 'Security Intermediate',
    weekly_plan: [
      {
        week:1, theme:'Networking & OS Fundamentals',
        focus_reason: weakAreas.includes('Networking') ? 'Your Networking quiz score needs improvement — starting here' : 'Core foundation for all cybersecurity roles',
        daily_tasks: [
          {day:'Mon',task:'OSI Model & TCP/IP — watch Professor Messer video',duration:'1h',resource:'Professor Messer',resource_url:'https://professormesser.com'},
          {day:'Tue',task:'IP addressing & subnetting practice exercises',duration:'1h',resource:'Subnetting Practice',resource_url:'https://subnettingpractice.com'},
          {day:'Wed',task:'Linux CLI basics — complete Bandit Level 0-5',duration:'1h',resource:'OverTheWire',resource_url:'https://overthewire.org/wargames/bandit'},
          {day:'Thu',task:'Common protocols: HTTP, DNS, SMTP deep dive',duration:'1h',resource:'TryHackMe',resource_url:'https://tryhackme.com'},
          {day:'Fri',task:'Windows security fundamentals module',duration:'1h',resource:'Microsoft Learn',resource_url:'https://learn.microsoft.com'},
          {day:'Sat',task:'TryHackMe Pre-Security path — 2 hour session',duration:'2h',resource:'TryHackMe',resource_url:'https://tryhackme.com/path/outline/presecurity'},
          {day:'Sun',task:'Week 1 review + CyberPath Networking Quiz',duration:'45min',resource:'CyberPath Quiz',resource_url:'quiz'},
        ]
      }
    ],
    monthly_milestones: [
      {month:1,milestone:'Understand networking fundamentals and Linux basics',skills:['Networking','Linux'],checkpoint:'Score 70%+ on CyberPath Networking and Linux quizzes'},
      {month:2,milestone:'Complete first security certification path',skills:['Security Concepts','Web Security'],checkpoint:'Finish TryHackMe SOC Level 1 or Jr Pentester path'},
      {month:3,milestone:'Build first portfolio project',skills:['Practical Skills'],checkpoint:'Have a GitHub repo with documented security project'},
    ],
    practice_activities: [
      {activity:'TryHackMe daily challenges (30 min/day)',platform:'TryHackMe',url:'https://tryhackme.com'},
      {activity:'CyberPath quizzes for all 8 topics',platform:'CyberPath',url:'quiz'},
      {activity:'OverTheWire Bandit wargame (complete levels 0-20)',platform:'OverTheWire',url:'https://overthewire.org/wargames/bandit'},
    ],
    recommended_resources: [
      {name:'Google Cybersecurity Certificate',type:'course',free:true,url:'https://coursera.org/google-certificates/cybersecurity-certificate',why:'Best structured free course for beginners targeting security roles'},
      {name:'TryHackMe Pre-Security',type:'lab',free:true,url:'https://tryhackme.com/path/outline/presecurity',why:'Hands-on labs that directly build skills for your goal'},
      {name:'ISC2 Certified in Cybersecurity (CC)',type:'certification',free:true,url:'https://isc2.org/certifications/cc',why:'Free certification that proves foundational security knowledge to employers'},
    ],
    first_project:{title:'Home Lab SIEM Setup',description:'Set up Splunk free on a VM and collect/analyze logs from your own system'},
    final_project:{title:'Security Monitoring Dashboard',description:'Build a full monitoring solution with alerting for your target role'},
    next_step_after_plan:'Apply for entry-level positions or internships. Your portfolio + ISC2 CC certification makes you competitive.',
    goal, level, time,
    versionId: Date.now(),
    savedAt: new Date().toISOString(),
    versionLabel: `Plan 1 — ${goal} (Template)`,
    isFallback: true,
  };

  const saved = savePlanVersion(fallback);
  result.innerHTML = `
    <div class="lp-api-notice">
      ⚠️ Gemini API key not configured — showing curriculum template.
      <a href="https://aistudio.google.com" target="_blank" style="color:var(--accent)">Get free key ↗</a> (or configure in Settings)
    </div>
    ${buildPlanHTML(saved, {})}`;

  renderLearningPlanSidebar();
}

/* ── FORM HELPERS ── */
window.selectLPOpt = function(btn, group) {
  document.querySelectorAll(`.lp-opt-btn[data-group="${group}"]`).forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  lpSelections[group] = btn.dataset.val;
};

/* ── WHAT NEXT ENGINE (used by dashboard) ── */
window.renderWhatNext = function() {
  const el = document.getElementById('whatNextBody');
  if (!el) return;
  const uid    = window.CV_USER?.uid || 'guest';
  const gs     = (typeof getGS === 'function') ? getGS() : { xp:0, streak:0 };
  const scores = window.getQuizScores ? getQuizScores() : {};
  const stats  = window.FS ? FS.getStats(uid) : {};
  const plan   = getActivePlan();
  const recs   = buildNextRecommendations(scores, gs, stats, plan);

  el.innerHTML = `
    <div class="wn-layout">
      <div class="wn-score-card reveal" style="display:block;">
        <div class="wn-score-right" style="width:100%;">
          <div class="wn-score-breakdown-title">📊 SKILL BREAKDOWN</div>
          ${Object.keys(scores).length > 0
            ? Object.entries(scores).map(([id,pct])=>`
              <div class="wn-skill-row">
                <span class="wn-skill-label">${TOPIC_LABELS[id]||id}</span>
                <div class="wn-skill-bar-wrap"><div class="wn-skill-bar" style="width:${pct}%;background:${pct>=80?'#10b981':pct>=50?'#f59e0b':'#ef4444'}"></div></div>
                <span class="wn-skill-pct" style="color:${pct>=80?'#10b981':pct>=50?'#f59e0b':'#ef4444'}">${pct}%</span>
              </div>`).join('')
            : '<div style="color:var(--text3);font-size:0.8rem;padding:1rem 0">Take quizzes to see skill breakdown →</div>'}
        </div>
      </div>
      <div class="wn-recs-title">🤖 WHAT YOU SHOULD DO NEXT</div>
      <div class="wn-recs-grid">
        ${recs.map((rec,i)=>`
          <div class="wn-rec-card ${i===0?'wn-rec-primary':''} reveal" onclick="${rec.action}">
            <div class="wn-rec-header">
              <span class="wn-rec-icon">${rec.icon}</span>
              <span class="wn-rec-type">${rec.type}</span>
            </div>
            <div class="wn-rec-title">${rec.title}</div>
            <div class="wn-rec-why">${rec.why}</div>
            <div class="wn-rec-resource">📖 ${rec.resource}</div>
            <div class="wn-rec-xp">+${rec.xp} XP</div>
          </div>`).join('')}
      </div>
      <div class="wn-ai-btn-wrap reveal">
        <button class="wn-ai-btn" onclick="navigate('advisor');setTimeout(()=>askAdvisor('Based on my progress, what should I focus on next?'),500)">
          🤖 Ask AI Advisor for Personalized Recommendation
        </button>
      </div>
    </div>`;
};

function buildNextRecommendations(scores, gs, stats, plan) {
  const recs = [];
  const weak = Object.entries(scores).filter(([,v])=>v<60).sort(([,a],[,b])=>a-b).map(([k])=>k);
  const untried = ['networking','linux','web','crypto','malware','cloud','soc','concepts'].filter(t=>!(t in scores));

  if (weak.length>0)       recs.push({icon:'⚠️',type:'WEAK AREA',title:`Improve ${TOPIC_LABELS[weak[0]]||weak[0]}`,why:'Your quiz score is low here. Fix this to unlock faster progress.',resource:'CyberPath Quiz',xp:20,action:`navigate('quiz')`});
  if (untried.length>0)    recs.push({icon:'🧪',type:'ASSESSMENT',title:`Test ${TOPIC_LABELS[untried[0]]||untried[0]} knowledge`,why:"You haven't attempted this topic yet.",resource:'CyberPath Quiz',xp:20,action:`navigate('quiz')`});
  if (!plan)               recs.push({icon:'📅',type:'LEARNING PLAN',title:'Create your learning plan',why:'A structured daily plan makes you 3x more consistent.',resource:'CyberPath AI Plan',xp:25,action:`navigate('learningPlan')`});
  if (!stats.project_gen)  recs.push({icon:'💡',type:'PROJECT',title:'Build your first project',why:'Projects are what employers care about most.',resource:'Project Generator',xp:30,action:`navigate('projects')`});
  recs.push({icon:'🤖',type:'AI GUIDANCE',title:'Get career roadmap',why:'Tell AI your goal — get a complete personalized plan.',resource:'CyberPath AI Advisor',xp:5,action:`navigate('advisor')`});
  recs.push({icon:'💼',type:'CAREERS',title:'Explore career tracks',why:'Understanding career paths focuses your learning.',resource:'Career Hub',xp:5,action:`navigate('careers')`});
  return recs.slice(0,6);
}

// CyberPath Score removed per specification
function renderCyberPathScore() {
  return '';
}
