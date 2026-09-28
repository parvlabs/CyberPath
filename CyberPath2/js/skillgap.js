/* ══════════════════════════════════════════════
   CYBERPATH — SKILLGAP.JS
   Skill Gap Analysis — Current DNA vs Target Role
══════════════════════════════════════════════ */

// Required skills per career (0-4 scale per domain)
const ROLE_REQUIREMENTS = {
  soc: {
    title: 'SOC Analyst',
    icon: '🔍',
    requirements: {
      networking: 3, linux: 2, web: 1, crypto: 1,
      soc: 4, cloud: 1, malware: 2, concepts: 3
    }
  },
  pentester: {
    title: 'Penetration Tester',
    icon: '⚡',
    requirements: {
      networking: 3, linux: 3, web: 4, crypto: 2,
      soc: 1, cloud: 1, malware: 1, concepts: 3
    }
  },
  bugbounty: {
    title: 'Bug Bounty Hunter',
    icon: '💰',
    requirements: {
      networking: 2, linux: 2, web: 4, crypto: 2,
      soc: 1, cloud: 1, malware: 1, concepts: 2
    }
  },
  dfir: {
    title: 'DFIR / Malware Analyst',
    icon: '🦠',
    requirements: {
      networking: 2, linux: 3, web: 1, crypto: 2,
      soc: 3, cloud: 1, malware: 4, concepts: 3
    }
  },
  cloud: {
    title: 'Cloud Security Engineer',
    icon: '☁️',
    requirements: {
      networking: 3, linux: 2, web: 2, crypto: 2,
      soc: 2, cloud: 4, malware: 1, concepts: 3
    }
  },
  seceng: {
    title: 'Security Engineer',
    icon: '⚙️',
    requirements: {
      networking: 3, linux: 3, web: 3, crypto: 3,
      soc: 2, cloud: 3, malware: 2, concepts: 4
    }
  },
  grc: {
    title: 'GRC Analyst',
    icon: '📋',
    requirements: {
      networking: 2, linux: 1, web: 1, crypto: 2,
      soc: 2, cloud: 1, malware: 1, concepts: 4
    }
  },
  appsec: {
    title: 'AppSec Engineer',
    icon: '🌐',
    requirements: {
      networking: 2, linux: 2, web: 4, crypto: 3,
      soc: 1, cloud: 2, malware: 1, concepts: 3
    }
  },
  researcher: {
    title: 'Security Researcher',
    icon: '🔬',
    requirements: {
      networking: 3, linux: 4, web: 3, crypto: 4,
      soc: 2, cloud: 2, malware: 4, concepts: 4
    }
  },
};

const DOMAIN_MAP = {
  networking:'Networking', linux:'Linux & OS', web:'Web Security',
  crypto:'Cryptography', soc:'SOC & Blue Team', cloud:'Cloud Security',
  malware:'Malware & DFIR', concepts:'Security Concepts'
};
const DOMAIN_ICONS = {
  networking:'🌐', linux:'🐧', web:'🕸️', crypto:'🔐',
  soc:'🔍', cloud:'☁️', malware:'🦠', concepts:'🛡️'
};

/* ── RENDER SKILL GAP PAGE ── */
window.renderSkillGap = function() {
  const el = document.getElementById('skillgapBody');
  if (!el) return;

  el.innerHTML = `
    <div class="sg-layout">

      <!-- Role Selector -->
      <div class="sg-selector-panel">
        <div class="sg-selector-title">🎯 SELECT YOUR TARGET CAREER</div>
        <div class="sg-roles-grid">
          ${Object.entries(ROLE_REQUIREMENTS).map(([key, role]) => `
            <button class="sg-role-btn" id="sgrole-${key}" onclick="analyzeGap('${key}')">
              <span class="sg-role-icon">${role.icon}</span>
              <span class="sg-role-name">${role.title}</span>
            </button>`).join('')}
        </div>
        <div class="sg-dna-hint">
          💡 Based on your <strong>Cyber DNA</strong> profile.
          <button class="sg-dna-link" onclick="navigate('dna')">Update DNA →</button>
        </div>
      </div>

      <!-- Gap Results -->
      <div class="sg-results-panel" id="sgResults">
        <div class="sg-results-empty">
          <div class="sg-empty-icon">🎯</div>
          <div class="sg-empty-title">Select a target career role</div>
          <div class="sg-empty-sub">CyberPath will compare your current DNA with the required skills and show you exactly what to focus on.</div>
        </div>
      </div>
    </div>`;
};

/* ── ANALYZE GAP ── */
window.analyzeGap = function(roleKey) {
  const role = ROLE_REQUIREMENTS[roleKey];
  if (!role) return;

  // Highlight selected role
  document.querySelectorAll('.sg-role-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('sgrole-' + roleKey)?.classList.add('selected');

  // Get current DNA levels
  const uid     = window.CV_USER?.uid || 'guest';
  const stored  = JSON.parse(localStorage.getItem('cp_dna_' + uid) || '{}');
  const scores  = window.getQuizScores ? getQuizScores() : {};
  const quizMap = { networking:'networking', linux:'linux', web:'web', crypto:'crypto', soc:'soc', cloud:'cloud', malware:'malware', concepts:'concepts' };

  function getCurrentLevel(domain) {
    // Get best estimate from DNA or quiz
    const prefix = domain === 'malware' ? 'dfir' : domain;
    const dnaKeys = Object.keys(stored).filter(k => k.startsWith(prefix));
    if (dnaKeys.length > 0) {
      return Math.round(dnaKeys.reduce((a,k)=>a+stored[k],0) / dnaKeys.length);
    }
    const qKey = quizMap[domain] || domain;
    if (scores[qKey] !== undefined) return Math.round(scores[qKey]/100*4);
    return 0;
  }

  const gaps = Object.entries(role.requirements).map(([domain, required]) => {
    const current = getCurrentLevel(domain);
    const gap     = Math.max(0, required - current);
    return { domain, required, current, gap, icon: DOMAIN_ICONS[domain], label: DOMAIN_MAP[domain] };
  });

  const criticalGaps  = gaps.filter(g => g.gap >= 3);
  const moderateGaps  = gaps.filter(g => g.gap === 2);
  const minorGaps     = gaps.filter(g => g.gap === 1);
  const achieved      = gaps.filter(g => g.gap === 0);
  const totalGap      = gaps.reduce((a,g)=>a+g.gap,0);
  const maxPossible   = Object.values(role.requirements).reduce((a,v)=>a+v,0);
  const readiness     = Math.round(((maxPossible - totalGap) / maxPossible) * 100);

  const el = document.getElementById('sgResults');
  el.innerHTML = `
    <!-- Readiness Score -->
    <div class="sg-readiness-card reveal">
      <div class="sg-readiness-left">
        <div class="sg-readiness-role">${role.icon} ${role.title}</div>
        <div class="sg-readiness-title">Career Readiness</div>
        <div class="sg-readiness-score" style="color:${readiness>=70?'#10b981':readiness>=40?'#f59e0b':'#ef4444'}">${readiness}%</div>
        <div class="sg-readiness-label">${readiness>=70?'Almost Ready!':readiness>=40?'Good Progress':'Needs Work'}</div>
      </div>
      <div class="sg-readiness-right">
        <div class="sg-domain-bars">
          ${gaps.map(g => `
            <div class="sg-domain-bar-row">
              <span class="sg-bar-icon">${g.icon}</span>
              <span class="sg-bar-label">${g.label}</span>
              <div class="sg-bar-track">
                <div class="sg-bar-required" style="width:${(g.required/4)*100}%;opacity:0.2;background:${g.gap===0?'#10b981':'#ef4444'}"></div>
                <div class="sg-bar-current" style="width:${(g.current/4)*100}%;background:${g.gap===0?'#10b981':g.gap>=2?'#ef4444':'#f59e0b'}"></div>
              </div>
              <span class="sg-bar-vals">${g.current}/${g.required}</span>
              ${g.gap === 0 ? '<span class="sg-bar-done">✓</span>' : `<span class="sg-bar-gap" style="color:#ef4444">-${g.gap}</span>`}
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Gap Details -->
    ${criticalGaps.length > 0 ? `
      <div class="sg-section sg-critical reveal">
        <div class="sg-section-title">🚨 CRITICAL GAPS — Start Here</div>
        ${criticalGaps.map(g => renderGapItem(g, role.title)).join('')}
      </div>` : ''}

    ${moderateGaps.length > 0 ? `
      <div class="sg-section sg-moderate reveal">
        <div class="sg-section-title">⚠️ MODERATE GAPS — Work on Next</div>
        ${moderateGaps.map(g => renderGapItem(g, role.title)).join('')}
      </div>` : ''}

    ${minorGaps.length > 0 ? `
      <div class="sg-section sg-minor reveal">
        <div class="sg-section-title">📌 MINOR GAPS — Polish These</div>
        ${minorGaps.map(g => renderGapItem(g, role.title)).join('')}
      </div>` : ''}

    ${achieved.length > 0 ? `
      <div class="sg-section sg-achieved reveal">
        <div class="sg-section-title">✅ ALREADY AT REQUIRED LEVEL</div>
        <div class="sg-achieved-grid">
          ${achieved.map(g=>`<span class="sg-achieved-tag">${g.icon} ${g.label}</span>`).join('')}
        </div>
      </div>` : ''}

    <!-- CTA -->
    <div class="sg-cta-row reveal">
      <button class="sg-cta-btn sg-cta-primary" onclick="navigate('advisor');setTimeout(()=>askAdvisor('I want to become a ${role.title}. My readiness is ${readiness}%. Critical gaps: ${criticalGaps.map(g=>g.label).join(', ')||'none'}. Build me a gap-focused learning plan.'),500)">
        🤖 Get AI-Powered Gap Learning Plan
      </button>
      <button class="sg-cta-btn sg-cta-secondary" onclick="navigate('dna')">
        ✏️ Update My DNA Profile
      </button>
    </div>`;
};

function renderGapItem(g, roleTitle) {
  const RESOURCES = {
    networking: [{ name:'TryHackMe Pre-Security', url:'https://tryhackme.com/path/outline/presecurity' },{ name:'Cisco Networking Basics', url:'https://skillsforall.com' }],
    linux:      [{ name:'OverTheWire: Bandit', url:'https://overthewire.org/wargames/bandit' },{ name:'Linux Foundation Intro', url:'https://training.linuxfoundation.org/training/introduction-to-linux' }],
    web:        [{ name:'PortSwigger Web Academy', url:'https://portswigger.net/web-security' },{ name:'TryHackMe Jr PenTester', url:'https://tryhackme.com' }],
    crypto:     [{ name:'Cryptohack.org', url:'https://cryptohack.org' },{ name:'CyberPath Crypto Quiz', url:'#quiz' }],
    soc:        [{ name:'TryHackMe SOC Level 1', url:'https://tryhackme.com/path/outline/soclevel1' },{ name:'LetsDefend.io', url:'https://letsdefend.io' }],
    cloud:      [{ name:'AWS Skill Builder (Free)', url:'https://explore.skillbuilder.aws' },{ name:'Google Cloud Skills Boost', url:'https://cloudskillsboost.google' }],
    malware:    [{ name:'CyberDefenders', url:'https://cyberdefenders.org' },{ name:'Any.run Sandbox', url:'https://any.run' }],
    concepts:   [{ name:'Google Cybersecurity Certificate', url:'https://coursera.org/google-certificates/cybersecurity-certificate' },{ name:'ISC2 CC (Free Cert)', url:'https://isc2.org/certifications/cc' }],
  };

  const resources = RESOURCES[g.domain] || [];

  return `
    <div class="sg-gap-item">
      <div class="sg-gap-item-header">
        <span class="sg-gap-icon">${g.icon}</span>
        <div class="sg-gap-info">
          <div class="sg-gap-name">${g.label}</div>
          <div class="sg-gap-levels">Currently: <strong>${g.current}/4</strong> → Required: <strong>${g.required}/4</strong> (gap: ${g.gap})</div>
        </div>
      </div>
      <div class="sg-gap-resources">
        ${resources.map(r=>`<a href="${r.url}" target="_blank" class="sg-gap-resource-link">↗ ${r.name}</a>`).join('')}
      </div>
    </div>`;
}
