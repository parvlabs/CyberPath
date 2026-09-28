/* ══════════════════════════════════════════════
   CYBERPATH — PROJECT-GEN.JS v2.0
   P1: Tech stack filter
   P2: Difficulty preview
   P3: GitHub README generator
   P4: Step-by-step mode
══════════════════════════════════════════════ */

/* ── CONSTANTS ── */
const DOMAIN_OPTIONS = [
  { value:'network',     label:'🌐 Network Security' },
  { value:'web',         label:'🕸️ Web / AppSec' },
  { value:'dfir',        label:'🦠 DFIR / Malware' },
  { value:'cloud',       label:'☁️ Cloud Security' },
  { value:'soc',         label:'🔍 SOC / Blue Team' },
  { value:'osint',       label:'🕵️ OSINT / Recon' },
  { value:'crypto',      label:'🔐 Cryptography' },
  { value:'ai-security', label:'🤖 AI Security' },
  { value:'wireless',    label:'📡 Wireless Security' },
  { value:'iot',         label:'📱 IoT Security' },
];

const GOAL_OPTIONS = [
  { value:'portfolio',     label:'💼 Build Portfolio' },
  { value:'learning',      label:'📚 Learn a Skill' },
  { value:'job',           label:'💰 Get a Job' },
  { value:'competition',   label:'🏆 Hackathon / SIH' },
  { value:'research',      label:'🔬 Research Project' },
  { value:'certification', label:'🏅 Cert Preparation' },
];

// P1: Tech stack options
const TECH_STACKS = [
  { value:'python',     label:'🐍 Python' },
  { value:'javascript', label:'🌐 JavaScript' },
  { value:'bash',       label:'💻 Bash / Shell' },
  { value:'go',         label:'🔵 Go' },
  { value:'java',       label:'☕ Java' },
  { value:'any',        label:'⚡ Best fit' },
];

// P2: Difficulty preview matrix
const DIFFICULTY_MATRIX = {
  'Beginner':     { '1 week':'Beginner','2-4 weeks':'Beginner','1-2 months':'Intermediate','3+ months':'Intermediate' },
  'Intermediate': { '1 week':'Intermediate','2-4 weeks':'Intermediate','1-2 months':'Advanced','3+ months':'Advanced' },
  'Advanced':     { '1 week':'Intermediate','2-4 weeks':'Advanced','1-2 months':'Advanced','3+ months':'Expert' },
};

const GOAL_XP = {
  portfolio:'High portfolio value',
  learning:'Great for skill building',
  job:'Job-ready project',
  competition:'Competition-worthy',
  research:'Research-grade',
  certification:'Cert prep project',
};

/* ── STATE ── */
const pgenSelections = { level:null, domain:null, goal:null, time:null, stack:null };
let lastGeneratedProject = null;
let stepModeActive       = false;
let currentStep          = 0;

/* ── SYSTEM PROMPT (with tech stack + structured output) ── */
function buildProjectPrompt(inputs) {
  const { level, domain, goal, time, stack, context, weakAreas, xpLevel } = inputs;
  const stackNote = stack && stack !== 'any' ? `MUST use ${stack} as the primary language/stack.` : 'Choose the most appropriate tech stack for this domain.';

  return `You are CyberPath Project Idea Generator — an expert cybersecurity mentor creating practical, portfolio-worthy project ideas.

USER CONTEXT:
- Skill Level: ${level}
- Domain: ${domain}
- Goal: ${goal} (${GOAL_XP[goal]||''})
- Time Available: ${time}
- Tech Stack Preference: ${stack === 'any' ? 'No preference — choose best fit' : stack}
- Platform XP Level: ${xpLevel}
${weakAreas?.length > 0 ? `- Weak Areas (project should help strengthen): ${weakAreas.join(', ')}` : ''}
${context ? `- Additional context: ${context}` : ''}

TECH STACK RULE: ${stackNote}

RESPOND IN THIS EXACT JSON FORMAT ONLY (no markdown, no extra text):
{
  "name": "Creative, professional project name",
  "tagline": "One powerful sentence — what it does and why it matters",
  "difficulty": "Beginner / Intermediate / Advanced",
  "time_estimate": "Realistic time estimate",
  "domain": "${domain}",
  "stack": "${stack === 'any' ? 'auto' : stack}",
  "tech_stack_chosen": ["Primary language", "Framework/lib 1", "Framework/lib 2", "Tool 1"],
  "description": "3 sentences: what it is, what problem it solves, why employers/judges will love it",
  "skills_learned": ["specific skill 1", "specific skill 2", "specific skill 3", "specific skill 4", "specific skill 5"],
  "features_basic": ["Core feature 1 — build this first", "Core feature 2", "Core feature 3", "Core feature 4"],
  "features_advanced": ["Advanced feature 1 — add after basics work", "Advanced feature 2", "Advanced feature 3"],
  "implementation_steps": [
    {"step": 1, "title": "Setup & Environment", "desc": "Exactly what to install and configure", "time": "Day 1", "commands": "pip install xyz or npm install xyz"},
    {"step": 2, "title": "Core Logic", "desc": "What core functionality to build first", "time": "Day 2-3", "commands": ""},
    {"step": 3, "title": "Main Features", "desc": "Building the primary features", "time": "Day 4-7", "commands": ""},
    {"step": 4, "title": "Security Hardening", "desc": "Making the project actually secure", "time": "Week 2", "commands": ""},
    {"step": 5, "title": "Testing & Documentation", "desc": "Testing approach and what to document", "time": "Final days", "commands": ""}
  ],
  "learning_outcomes": ["Outcome 1 — what you can confidently say you built", "Outcome 2", "Outcome 3"],
  "resume_tip": "Exactly how to describe this on a resume/CV in 2 bullet points",
  "interview_angle": "What technical questions this project prepares you to answer in interviews",
  "advanced_version": "What the production/advanced version of this looks like",
  "similar_real_tools": ["Real tool 1 this is similar to", "Real tool 2"],
  "resources": [
    {"name": "Resource name", "url": "https://...", "why": "Why needed for this project"},
    {"name": "Resource name", "url": "https://...", "why": "Why needed"},
    {"name": "Resource name", "url": "https://...", "why": "Why needed"}
  ]
}`;
}

/* ── README PROMPT ── */
function buildReadmePrompt(project) {
  return `Generate a professional GitHub README.md for this cybersecurity project:

Project: ${project.name}
Tagline: ${project.tagline}
Description: ${project.description}
Tech Stack: ${(project.tech_stack_chosen||[]).join(', ')}
Features: ${(project.features_basic||[]).join(', ')}

Create a complete, professional README.md with:
- Badge line (Python version, License MIT, Stars placeholder)
- Overview section
- Features section  
- Prerequisites
- Installation (step by step with code blocks)
- Usage (with example commands/screenshots placeholder)
- Project Structure (folder tree)
- Contributing section
- License section
- Author section with placeholder

Use proper markdown formatting. Make it look professional and impressive for GitHub.`;
}

/* ══════════════════════════════════════════════
   RENDER PROJECT GEN PAGE
══════════════════════════════════════════════ */
window.renderProjectGen = function() {
  const el = document.getElementById('projectGenBody');
  if (!el) return;

  // Get user context for personalization
  const scores    = window.getQuizScores ? getQuizScores() : {};
  const weakAreas = Object.entries(scores).filter(([,v])=>v<60).map(([k])=>k);
  const gs        = (typeof getGS === 'function')   ? getGS()   : { xp:0 };
  const lvl       = (typeof getLevel === 'function') ? getLevel(gs.xp) : { title:'Beginner' };

  el.innerHTML = `
    <div class="pgen-layout">

      <!-- ─── FORM ─── -->
      <div class="pgen-form-panel">
        <div class="pgen-form-title">💡 Generate Your Project</div>

        <!-- Skill Level -->
        <div class="pgen-form-group">
          <label class="pgen-label">SKILL LEVEL</label>
          <div class="pgen-options-grid">
            ${['Beginner','Intermediate','Advanced'].map(l=>`
              <button class="pgen-option-btn" data-group="level" data-val="${l}" onclick="selectPgenOption(this,'level');updateDifficultyPreview()">
                ${l==='Beginner'?'🌱':l==='Intermediate'?'⚡':'🔥'} ${l}
              </button>`).join('')}
          </div>
        </div>

        <!-- Domain -->
        <div class="pgen-form-group">
          <label class="pgen-label">SECURITY DOMAIN</label>
          <div class="pgen-options-grid pgen-2col">
            ${DOMAIN_OPTIONS.map(d=>`
              <button class="pgen-option-btn ${weakAreas.some(w=>d.value.includes(w)||w.includes(d.value))?'pgen-weak-domain':''}"
                data-group="domain" data-val="${d.value}" onclick="selectPgenOption(this,'domain');updateDifficultyPreview()">
                ${d.label}
                ${weakAreas.some(w=>d.value.includes(w)||w.includes(d.value))?'<span class="pgen-weak-badge">WEAK</span>':''}
              </button>`).join('')}
          </div>
          ${weakAreas.length>0?`<div class="pgen-weak-hint">⚡ WEAK domains auto-detected from quizzes — great for skill building!</div>`:''}
        </div>

        <!-- P1: Tech Stack Filter -->
        <div class="pgen-form-group">
          <label class="pgen-label">TECH STACK <span class="pgen-label-new">NEW</span></label>
          <div class="pgen-options-grid pgen-2col">
            ${TECH_STACKS.map(t=>`
              <button class="pgen-option-btn" data-group="stack" data-val="${t.value}" onclick="selectPgenOption(this,'stack')">
                ${t.label}
              </button>`).join('')}
          </div>
        </div>

        <!-- Goal -->
        <div class="pgen-form-group">
          <label class="pgen-label">PROJECT GOAL</label>
          <div class="pgen-options-grid pgen-2col">
            ${GOAL_OPTIONS.map(g=>`
              <button class="pgen-option-btn" data-group="goal" data-val="${g.value}" onclick="selectPgenOption(this,'goal');updateDifficultyPreview()">
                ${g.label}
              </button>`).join('')}
          </div>
        </div>

        <!-- Time -->
        <div class="pgen-form-group">
          <label class="pgen-label">TIME AVAILABLE</label>
          <div class="pgen-options-grid">
            ${['1 week','2-4 weeks','1-2 months','3+ months'].map(t=>`
              <button class="pgen-option-btn" data-group="time" data-val="${t}" onclick="selectPgenOption(this,'time');updateDifficultyPreview()">
                ⏱ ${t}
              </button>`).join('')}
          </div>
        </div>

        <!-- Context -->
        <div class="pgen-form-group">
          <label class="pgen-label">EXTRA CONTEXT <span style="color:var(--text3)">(optional)</span></label>
          <textarea class="pgen-textarea" id="pgenContext" rows="2"
            placeholder="e.g. I know Python basics, preparing for SIH, want to use ML..."></textarea>
        </div>

        <!-- P2: Difficulty Preview -->
        <div class="pgen-difficulty-preview" id="difficultyPreview" style="display:none">
          <div class="pgen-preview-title">📊 ESTIMATED PROJECT</div>
          <div class="pgen-preview-body" id="difficultyPreviewBody"></div>
        </div>

        <button class="pgen-generate-btn" id="pgenBtn" onclick="generateProject()">
          <span id="pgenBtnText">⚡ GENERATE PROJECT IDEA</span>
          <span id="pgenBtnLoader" style="display:none">⟳ Generating...</span>
        </button>

        <div class="pgen-tip">
          💡 Each generation creates a unique project. Generate multiple times!
        </div>
      </div>

      <!-- ─── RESULT ─── -->
      <div class="pgen-result-panel" id="pgenResult">
        <div class="pgen-result-empty">
          <div class="pgen-empty-icon">💡</div>
          <div class="pgen-empty-title">Your Project Idea Appears Here</div>
          <div class="pgen-empty-desc">
            Select your preferences and click Generate.<br>
            Gemini AI creates a complete, personalized cybersecurity project with implementation roadmap.
          </div>
        </div>
      </div>

    </div>`;
};

/* ── OPTION SELECTION ── */
window.selectPgenOption = function(btn, group) {
  document.querySelectorAll(`.pgen-option-btn[data-group="${group}"]`).forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  pgenSelections[group] = btn.dataset.val;
};

/* ── P2: DIFFICULTY PREVIEW (instant, before generate) ── */
window.updateDifficultyPreview = function() {
  const { level, time, goal } = pgenSelections;
  const preview = document.getElementById('difficultyPreview');
  const body    = document.getElementById('difficultyPreviewBody');
  if (!preview || !body) return;

  if (!level && !time && !goal) { preview.style.display='none'; return; }
  preview.style.display = 'block';

  const difficulty = (level && time) ? (DIFFICULTY_MATRIX[level]?.[time] || 'Intermediate') : '—';
  const diffColor  = difficulty==='Beginner'?'#10b981':difficulty==='Intermediate'?'#f59e0b':difficulty==='Advanced'?'#ef4444':'#a78bfa';

  body.innerHTML = `
    <div class="pgen-preview-item">
      <span class="pgen-preview-label">Difficulty</span>
      <span class="pgen-preview-val" style="color:${diffColor}">${difficulty}</span>
    </div>
    ${goal ? `<div class="pgen-preview-item">
      <span class="pgen-preview-label">Goal Type</span>
      <span class="pgen-preview-val">${GOAL_XP[goal]||goal}</span>
    </div>` : ''}
    ${time ? `<div class="pgen-preview-item">
      <span class="pgen-preview-label">Time Needed</span>
      <span class="pgen-preview-val">${time}</span>
    </div>` : ''}
    <div class="pgen-preview-note">
      ${difficulty==='Beginner'?'✅ Great starting project — focused and achievable':
        difficulty==='Intermediate'?'⚡ Solid portfolio project — will impress recruiters':
        difficulty==='Advanced'?'🔥 Complex project — excellent for senior roles':
        '💎 Expert-level — research/competition grade'}
    </div>`;
};

/* ══════════════════════════════════════════════
   GENERATE PROJECT
══════════════════════════════════════════════ */
window.generateProject = async function() {
  const { level, domain, goal, time, stack } = pgenSelections;
  const context = document.getElementById('pgenContext')?.value?.trim();

  if (!level)  { showToast('⚠️ Select skill level');  return; }
  if (!domain) { showToast('⚠️ Select a domain');     return; }
  if (!goal)   { showToast('⚠️ Select project goal'); return; }
  if (!time)   { showToast('⚠️ Select time available');return; }

  const btn    = document.getElementById('pgenBtn');
  const btnTxt = document.getElementById('pgenBtnText');
  const loader = document.getElementById('pgenBtnLoader');
  const result = document.getElementById('pgenResult');

  if (btn) btn.disabled = true;
  if (btnTxt) btnTxt.style.display = 'none';
  if (loader) loader.style.display = 'inline';

  result.innerHTML = `
    <div class="pgen-loading">
      <div class="pgen-loading-icon">⚡</div>
      <div class="pgen-loading-text">Gemini AI is crafting your project idea...</div>
      <div class="pgen-loading-dots"><span></span><span></span><span></span></div>
    </div>`;

  // Gather context
  const scores    = window.getQuizScores ? getQuizScores() : {};
  const weakAreas = Object.entries(scores).filter(([,v])=>v<60).map(([k])=>k);
  const gs        = (typeof getGS === 'function')   ? getGS()   : { xp:0 };
  const xpLevel   = (typeof getLevel === 'function') ? getLevel(gs.xp).title : 'Beginner';

  try {
    let raw = await callAI(
      buildProjectPrompt({ level, domain, goal, time, stack:stack||'any', context, weakAreas, xpLevel }),
      `Generate a ${level} level cybersecurity project for ${domain} domain, goal: ${goal}, time: ${time}${stack&&stack!=='any'?', stack: '+stack:''}${context?', context: '+context:''}`,
      1000
    );
    raw = raw.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim();
    const project = JSON.parse(raw);
    lastGeneratedProject = project;
    stepModeActive = false;
    currentStep    = 0;
    renderProjectResult(project);
    if (typeof awardXP === 'function') awardXP('project_generated');
  } catch(e) {
    showProjectFallback(level, domain, goal, time, stack, result);
  }

  if (btn) btn.disabled = false;
  if (btnTxt) btnTxt.style.display = 'inline';
  if (loader) loader.style.display = 'none';
};

/* ══════════════════════════════════════════════
   RENDER PROJECT RESULT
══════════════════════════════════════════════ */
function renderProjectResult(p, mode) {
  const result = document.getElementById('pgenResult');
  if (!result) return;

  const isStepMode = mode === 'steps';
  const diffColor  = p.difficulty==='Beginner'?'#10b981':p.difficulty==='Intermediate'?'#f59e0b':p.difficulty==='Advanced'?'#ef4444':'#a78bfa';

  result.innerHTML = `
    <div class="pgen-project-card">

      <!-- Header -->
      <div class="pgen-project-header">
        <div>
          <div class="pgen-project-name">${p.name}</div>
          <div class="pgen-project-tagline">${p.tagline}</div>
        </div>
        <button class="pgen-regen-btn" onclick="generateProject()" title="Regenerate">🔄</button>
      </div>

      <!-- Meta badges -->
      <div class="pgen-project-meta">
        <span class="pgen-meta-badge" style="color:${diffColor};border-color:${diffColor}50;background:${diffColor}15">📊 ${p.difficulty}</span>
        <span class="pgen-meta-badge">⏱ ${p.time_estimate}</span>
        <span class="pgen-meta-badge">🎯 ${p.domain}</span>
        ${p.stack&&p.stack!=='auto'?`<span class="pgen-meta-badge pgen-stack-badge">🔧 ${p.stack}</span>`:''}
      </div>

      <!-- Tech Stack (P1 result) -->
      ${p.tech_stack_chosen?.length ? `
        <div class="pgen-tech-stack-section">
          <div class="pgen-sub-title">🔧 TECH STACK</div>
          <div class="pgen-tech-grid">
            ${p.tech_stack_chosen.map(t=>`<span class="pgen-tech-tag">${t}</span>`).join('')}
          </div>
        </div>` : ''}

      <!-- Description -->
      <div class="pgen-project-desc">${p.description}</div>

      <!-- View mode toggle (P4) -->
      <div class="pgen-mode-toggle">
        <button class="pgen-mode-btn ${!isStepMode?'active':''}" onclick="renderProjectResult(lastGeneratedProject,'full')">📋 Full Overview</button>
        <button class="pgen-mode-btn ${isStepMode?'active':''}" onclick="renderProjectResult(lastGeneratedProject,'steps')">🗺️ Step-by-Step Mode</button>
      </div>

      ${isStepMode ? renderStepMode(p) : renderFullMode(p)}

      <!-- Actions -->
      <div class="pgen-actions">
        <button class="pgen-save-btn"     onclick="saveProject()">⭐ Save Project</button>
        <button class="pgen-readme-btn"   onclick="generateReadme()">📄 GitHub README</button>
        <button class="pgen-ask-btn"      onclick="askAdvisorAboutProject()">🤖 Ask AI for Help</button>
        <button class="pgen-regen-full-btn" onclick="generateProject()">🔄 New Idea</button>
      </div>

    </div>`;
}

/* ── FULL MODE ── */
function renderFullMode(p) {
  return `
    <div class="pgen-2col">
      <div class="pgen-sub-section">
        <div class="pgen-sub-title">🧠 SKILLS YOU'LL LEARN</div>
        ${(p.skills_learned||[]).map(s=>`<div class="pgen-list-item">✓ ${s}</div>`).join('')}
      </div>
      <div class="pgen-sub-section">
        <div class="pgen-sub-title">✅ CORE FEATURES</div>
        ${(p.features_basic||[]).map(f=>`<div class="pgen-list-item">→ ${f}</div>`).join('')}
        <div class="pgen-sub-title" style="margin-top:10px">⚡ ADVANCED FEATURES</div>
        ${(p.features_advanced||[]).map(f=>`<div class="pgen-list-item pgen-adv-feature">→ ${f}</div>`).join('')}
      </div>
    </div>

    <!-- Implementation Steps -->
    <div class="pgen-sub-section">
      <div class="pgen-sub-title">🗺️ IMPLEMENTATION ROADMAP</div>
      <div class="pgen-steps">
        ${(p.implementation_steps||[]).map(s=>`
          <div class="pgen-step">
            <div class="pgen-step-num">${s.step}</div>
            <div class="pgen-step-content">
              <div class="pgen-step-header">
                <div class="pgen-step-title">${s.title}</div>
                <span class="pgen-step-time">${s.time||''}</span>
              </div>
              <div class="pgen-step-desc">${s.desc}</div>
              ${s.commands?`<div class="pgen-step-cmd"><code>${s.commands}</code></div>`:''}
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Resume + Interview -->
    <div class="pgen-2col">
      <div class="pgen-resume-tip">
        <div class="pgen-sub-title">💼 RESUME TIP</div>
        <div class="pgen-resume-text">${p.resume_tip||''}</div>
      </div>
      ${p.interview_angle?`<div class="pgen-interview-tip">
        <div class="pgen-sub-title">🎤 INTERVIEW PREP</div>
        <div class="pgen-resume-text">${p.interview_angle}</div>
      </div>`:''}
    </div>

    <!-- Learning Outcomes -->
    <div class="pgen-sub-section">
      <div class="pgen-sub-title">🎯 LEARNING OUTCOMES</div>
      ${(p.learning_outcomes||[]).map(o=>`<div class="pgen-list-item">🏆 ${o}</div>`).join('')}
    </div>

    <!-- Advanced Version -->
    ${p.advanced_version?`<div class="pgen-advanced-box">
      <div class="pgen-sub-title">🚀 ADVANCED VERSION</div>
      <div class="pgen-advanced-text">${p.advanced_version}</div>
    </div>`:''}

    <!-- Similar Real Tools -->
    ${p.similar_real_tools?.length?`<div class="pgen-similar-tools">
      <div class="pgen-sub-title">🔗 SIMILAR REAL TOOLS</div>
      <div class="pgen-tech-grid">${p.similar_real_tools.map(t=>`<span class="pgen-similar-tag">${t}</span>`).join('')}</div>
    </div>`:''}

    <!-- Resources -->
    ${p.resources?.length?`<div class="pgen-sub-section">
      <div class="pgen-sub-title">📚 RESOURCES TO START</div>
      ${p.resources.map(r=>`<div class="pgen-resource-item">
        ${r.url?`<a href="${r.url}" target="_blank" class="pgen-resource-link">↗ ${r.name}</a>`:`<span>• ${r.name}</span>`}
        ${r.why?`<span class="pgen-resource-why"> — ${r.why}</span>`:''}
      </div>`).join('')}
    </div>`:''}`;
}

/* ── P4: STEP-BY-STEP MODE ── */
function renderStepMode(p) {
  const steps   = p.implementation_steps || [];
  const step    = steps[currentStep];
  if (!step) return '<div class="pgen-error">No steps available</div>';

  return `
    <div class="pgen-step-mode">
      <!-- Step Progress -->
      <div class="pgen-step-progress">
        ${steps.map((_,i)=>`
          <div class="pgen-step-dot ${i<currentStep?'done':i===currentStep?'active':''}">
            ${i<currentStep?'✓':i+1}
          </div>`).join('')}
      </div>

      <!-- Current Step -->
      <div class="pgen-step-card">
        <div class="pgen-step-card-header">
          <div class="pgen-step-card-num">Step ${step.step} of ${steps.length}</div>
          <div class="pgen-step-card-title">${step.title}</div>
          ${step.time?`<div class="pgen-step-card-time">⏱ ${step.time}</div>`:''}
        </div>
        <div class="pgen-step-card-desc">${step.desc}</div>
        ${step.commands?`
          <div class="pgen-step-card-cmd">
            <div class="pgen-cmd-label">💻 COMMANDS</div>
            <code class="pgen-cmd-code">${step.commands}</code>
          </div>`:''}

        <!-- Relevant Skills for this step -->
        ${currentStep < (p.skills_learned||[]).length?`
          <div class="pgen-step-skill">
            🧠 Skill practiced: <strong>${p.skills_learned[currentStep]||''}</strong>
          </div>`:''}

        <!-- Step Navigation -->
        <div class="pgen-step-nav">
          ${currentStep > 0
            ? `<button class="pgen-step-prev" onclick="changeStep(-1)">← Previous</button>`
            : '<span></span>'}
          <button class="pgen-step-ai" onclick="askAboutStep(${step.step},'${step.title.replace(/'/g,"\\'")}')">🤖 Ask AI About This Step</button>
          ${currentStep < steps.length - 1
            ? `<button class="pgen-step-next" onclick="changeStep(1)">Next Step →</button>`
            : `<button class="pgen-step-next pgen-step-done" onclick="renderProjectResult(lastGeneratedProject,'full')">✅ View Full Project</button>`}
        </div>
      </div>

      <!-- Quick reference -->
      <div class="pgen-step-quick">
        <div class="pgen-sub-title">🔧 TECH STACK FOR THIS PROJECT</div>
        <div class="pgen-tech-grid">${(p.tech_stack_chosen||[]).map(t=>`<span class="pgen-tech-tag">${t}</span>`).join('')}</div>
      </div>
    </div>`;
}

window.changeStep = function(dir) {
  const steps = lastGeneratedProject?.implementation_steps || [];
  currentStep = Math.max(0, Math.min(steps.length-1, currentStep + dir));
  renderProjectResult(lastGeneratedProject, 'steps');
};

window.askAboutStep = function(stepNum, stepTitle) {
  navigate('advisor');
  setTimeout(() => {
    askAdvisor(`I'm working on step ${stepNum} of my project "${lastGeneratedProject?.name}": "${stepTitle}". Can you explain this in detail and give me specific guidance on how to implement it?`);
  }, 500);
};

/* ── P3: GITHUB README GENERATOR ── */
window.generateReadme = async function() {
  if (!lastGeneratedProject) return;
  const result = document.getElementById('pgenResult');

  // Add loading state to README button
  const readmeBtn = result.querySelector('.pgen-readme-btn');
  if (readmeBtn) { readmeBtn.textContent = '⟳ Generating README...'; readmeBtn.disabled = true; }

  try {
    const readme = await callAI(
      'You are a senior software engineer. Generate professional, complete GitHub README.md files. Use proper markdown. Make it impressive and detailed.',
      buildReadmePrompt(lastGeneratedProject),
      1000
    );
    showReadmeModal(readme, lastGeneratedProject.name);
  } catch(e) {
    const msg = window.getAIErrorMessage ? getAIErrorMessage(e.message) : '❌ README generation failed';
    showToast(msg);
  }

  if (readmeBtn) { readmeBtn.textContent = '📄 GitHub README'; readmeBtn.disabled = false; }
};

/* ── README MODAL ── */
function showReadmeModal(content, projectName) {
  const existing = document.getElementById('readmeModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id    = 'readmeModal';
  modal.className = 'readme-modal';
  modal.innerHTML = `
    <div class="readme-modal-box">
      <div class="readme-modal-header">
        <div class="readme-modal-title">📄 README.md — ${projectName}</div>
        <div class="readme-modal-actions">
          <button class="readme-copy-btn" onclick="copyReadme()">📋 Copy All</button>
          <button class="readme-close-btn" onclick="document.getElementById('readmeModal').remove()">✕</button>
        </div>
      </div>
      <div class="readme-modal-note">Copy this content → create README.md in your project root → paste</div>
      <textarea class="readme-modal-content" id="readmeContent" readonly>${content}</textarea>
    </div>`;
  document.body.appendChild(modal);
}

window.copyReadme = function() {
  const el = document.getElementById('readmeContent');
  if (!el) return;
  navigator.clipboard.writeText(el.value).then(() => showToast('📋 README copied to clipboard!'));
};

/* ── SAVE PROJECT ── */
window.saveProject = async function() {
  if (!lastGeneratedProject || !window.CV_USER) { showToast('⚠️ Login to save'); return; }
  if (window.FS) await FS.addRecord(CV_USER.uid, 'saved_projects', { ...lastGeneratedProject, savedAt:new Date().toISOString() });
  showToast('⭐ Project saved to Dashboard!');
};

window.askAdvisorAboutProject = function() {
  if (!lastGeneratedProject) return;
  navigate('advisor');
  setTimeout(() => {
    askAdvisor(`I want to build this project: "${lastGeneratedProject.name}" — ${lastGeneratedProject.tagline}. Give me detailed guidance on implementation, potential challenges and how to make it impressive for my portfolio.`);
  }, 500);
};

/* ── FALLBACK ── */
function showProjectFallback(level, domain, goal, time, stack, result) {
  const FALLBACKS = {
    network: { name:'Network Traffic Analyzer',     tagline:'Capture and visualize network packets to detect anomalies',  tech:['Python','Scapy','SQLite','Flask'] },
    web:     { name:'Web Vulnerability Scanner',    tagline:'Automated scanner for OWASP Top 10 vulnerabilities',          tech:['Python','Requests','BeautifulSoup','Click'] },
    soc:     { name:'Security Event Dashboard',     tagline:'SIEM-style log aggregator and alert system',                  tech:['Python','ELK Stack','Grafana','Linux'] },
    dfir:    { name:'Memory Forensics Toolkit',     tagline:'Automate Volatility-based memory analysis workflows',          tech:['Python','Volatility3','YARA','SQLite'] },
    cloud:   { name:'Cloud Misconfiguration Finder',tagline:'Detect AWS/GCP security misconfigurations automatically',     tech:['Python','Boto3','AWS CLI','JSON'] },
    osint:   { name:'OSINT Recon Framework',        tagline:'Automated target information gathering and reporting',         tech:['Python','Shodan API','WHOIS','Jinja2'] },
    crypto:  { name:'Password Audit Tool',          tagline:'Analyze password strength and crack common hashes',           tech:['Python','Hashlib','Argparse','Click'] },
    default: { name:'Security Monitoring Tool',     tagline:'Build a custom security monitoring solution',                  tech:['Python','SQLite','Flask','Bootstrap'] },
  };
  const fb = FALLBACKS[domain] || FALLBACKS.default;
  const stackNote = stack && stack !== 'any' ? `(adapted for ${stack})` : '';

  result.innerHTML = `
    <div class="pgen-project-card">
      <div class="pgen-api-notice">
        ⚠️ Gemini API key not configured — showing reference project template.
        <a href="https://aistudio.google.com" target="_blank" style="color:var(--accent)">Get free key ↗</a> (or configure in Settings)
      </div>
      <div class="pgen-project-name">${fb.name} ${stackNote}</div>
      <div class="pgen-project-tagline">${fb.tagline}</div>
      <div class="pgen-project-meta">
        <span class="pgen-meta-badge">📊 ${level}</span>
        <span class="pgen-meta-badge">⏱ ${time}</span>
      </div>
      <div class="pgen-tech-stack-section">
        <div class="pgen-sub-title">🔧 TECH STACK</div>
        <div class="pgen-tech-grid">${fb.tech.map(t=>`<span class="pgen-tech-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="pgen-actions">
        <button class="pgen-ask-btn" onclick="navigate('advisor');setTimeout(()=>askAdvisor('Give me a complete project idea for ${level} level in ${domain} security, goal: ${goal}, time: ${time}${stack&&stack!=='any'?', stack: '+stack:''}'),500)">
          🤖 Get Full AI Project →
        </button>
        <button class="pgen-regen-full-btn" onclick="generateProject()">🔄 Try Again</button>
      </div>
    </div>`;
}
