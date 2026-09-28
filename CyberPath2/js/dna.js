/* ══════════════════════════════════════════════
   CYBERPATH — DNA.JS
   Cyber DNA — Visual Skill Profile Map
══════════════════════════════════════════════ */

const DNA_SKILLS = [
  {
    domain: 'Networking',
    icon: '🌐',
    color: '#00d4ff',
    skills: [
      { id:'osi',       name:'OSI / TCP-IP Model',    xpKey:'networking_osi' },
      { id:'protocols', name:'Common Protocols',       xpKey:'networking_proto' },
      { id:'subnetting',name:'Subnetting',             xpKey:'networking_sub' },
      { id:'routing',   name:'Routing & Switching',    xpKey:'networking_route' },
      { id:'dns',       name:'DNS & DHCP',             xpKey:'networking_dns' },
      { id:'wireshark', name:'Packet Analysis',        xpKey:'networking_pkt' },
    ]
  },
  {
    domain: 'Linux & OS',
    icon: '🐧',
    color: '#10b981',
    skills: [
      { id:'bash',      name:'Bash / CLI',             xpKey:'linux_bash' },
      { id:'perms',     name:'File Permissions',       xpKey:'linux_perms' },
      { id:'processes', name:'Process Management',     xpKey:'linux_proc' },
      { id:'logs',      name:'Log Analysis',           xpKey:'linux_logs' },
      { id:'scripting', name:'Shell Scripting',        xpKey:'linux_script' },
      { id:'network',   name:'Network Commands',       xpKey:'linux_net' },
    ]
  },
  {
    domain: 'Web Security',
    icon: '🕸️',
    color: '#f59e0b',
    skills: [
      { id:'xss',       name:'XSS',                   xpKey:'web_xss' },
      { id:'sqli',      name:'SQL Injection',          xpKey:'web_sqli' },
      { id:'csrf',      name:'CSRF / SSRF',            xpKey:'web_csrf' },
      { id:'idor',      name:'IDOR / Access Control',  xpKey:'web_idor' },
      { id:'auth',      name:'Authentication Attacks', xpKey:'web_auth' },
      { id:'headers',   name:'Security Headers',       xpKey:'web_headers' },
    ]
  },
  {
    domain: 'Cryptography',
    icon: '🔐',
    color: '#8b5cf6',
    skills: [
      { id:'symmetric', name:'Symmetric Encryption',  xpKey:'crypto_sym' },
      { id:'asymmetric',name:'Asymmetric / PKI',      xpKey:'crypto_asym' },
      { id:'hashing',   name:'Hashing & Salting',     xpKey:'crypto_hash' },
      { id:'tls',       name:'TLS / SSL',              xpKey:'crypto_tls' },
      { id:'certs',     name:'Certificates',           xpKey:'crypto_cert' },
    ]
  },
  {
    domain: 'SOC & Blue Team',
    icon: '🔍',
    color: '#ec4899',
    skills: [
      { id:'siem',      name:'SIEM Tools',             xpKey:'soc_siem' },
      { id:'ir',        name:'Incident Response',      xpKey:'soc_ir' },
      { id:'threat',    name:'Threat Intelligence',    xpKey:'soc_threat' },
      { id:'ioc',       name:'IOC Analysis',           xpKey:'soc_ioc' },
      { id:'hunting',   name:'Threat Hunting',         xpKey:'soc_hunt' },
    ]
  },
  {
    domain: 'Cloud Security',
    icon: '☁️',
    color: '#3b82f6',
    skills: [
      { id:'iam',       name:'IAM & Access Mgmt',      xpKey:'cloud_iam' },
      { id:'vpc',       name:'Network Security Groups', xpKey:'cloud_vpc' },
      { id:'logging',   name:'Cloud Logging / SIEM',   xpKey:'cloud_log' },
      { id:'containers',name:'Container Security',     xpKey:'cloud_containers' },
      { id:'devsecops', name:'DevSecOps',              xpKey:'cloud_devsecops' },
    ]
  },
  {
    domain: 'Malware & DFIR',
    icon: '🦠',
    color: '#ef4444',
    skills: [
      { id:'static',    name:'Static Analysis',        xpKey:'dfir_static' },
      { id:'dynamic',   name:'Dynamic Analysis',       xpKey:'dfir_dynamic' },
      { id:'memory',    name:'Memory Forensics',       xpKey:'dfir_memory' },
      { id:'yara',      name:'YARA Rules',             xpKey:'dfir_yara' },
      { id:'timeline',  name:'Timeline Analysis',      xpKey:'dfir_timeline' },
    ]
  },
  {
    domain: 'Security Concepts',
    icon: '🛡️',
    color: '#06b6d4',
    skills: [
      { id:'cia',       name:'CIA Triad',              xpKey:'concepts_cia' },
      { id:'least',     name:'Least Privilege',        xpKey:'concepts_least' },
      { id:'zerotrust', name:'Zero Trust',             xpKey:'concepts_zt' },
      { id:'social',    name:'Social Engineering',     xpKey:'concepts_social' },
      { id:'mfa',       name:'MFA & Auth',             xpKey:'concepts_mfa' },
      { id:'pentest',   name:'Pentest Methodology',    xpKey:'concepts_pentest' },
    ]
  },
];

/* ── GET DNA DATA ── */
function getDNAData() {
  const uid    = window.CV_USER?.uid || 'guest';
  const stored = JSON.parse(localStorage.getItem('cp_dna_' + uid) || '{}');
  // Also factor in quiz scores
  const scores = window.getQuizScores ? getQuizScores() : {};
  // Map quiz scores to DNA
  const quizMap = { networking:'networking', linux:'linux', web:'web', crypto:'crypto', soc:'soc', cloud:'cloud', malware:'dfir', concepts:'concepts' };
  return { stored, scores, quizMap };
}

function getSkillLevel(domain, skill, data) {
  const { stored, scores } = data;
  const key = skill.xpKey;
  if (stored[key] !== undefined) return stored[key];
  // Derive from quiz if available
  const dName = (domain.domain || '').toLowerCase();
  let qKey = null;
  if (dName.includes('concept')) qKey = 'concepts';
  else if (dName.includes('malware') || dName.includes('dfir')) qKey = 'malware';
  else if (dName.includes('network')) qKey = 'networking';
  else if (dName.includes('linux')) qKey = 'linux';
  else if (dName.includes('web')) qKey = 'web';
  else if (dName.includes('crypto')) qKey = 'crypto';
  else if (dName.includes('soc') || dName.includes('blue')) qKey = 'soc';
  else if (dName.includes('cloud')) qKey = 'cloud';

  if (qKey && scores[qKey] !== undefined) return Math.round(scores[qKey] / 100 * 3);
  return 0; // 0-4 scale: 0=unknown, 1=beginner, 2=intermediate, 3=advanced, 4=expert
}

/* ── RENDER DNA PAGE ── */
window.renderDNA = function() {
  const el = document.getElementById('dnaBody');
  if (!el) return;
  const data = getDNAData();

  // Calculate domain averages
  const domainScores = DNA_SKILLS.map(domain => {
    const levels = domain.skills.map(s => getSkillLevel(domain, s, data));
    const avg    = Math.round(levels.reduce((a,b)=>a+b,0) / levels.length);
    return { ...domain, avg, levels };
  });

  const totalAvg = Math.round(domainScores.reduce((a,b)=>a+b.avg,0) / domainScores.length);

  el.innerHTML = `
    <!-- Overview -->
    <div class="dna-overview reveal">
      <div class="dna-overview-left">
        <div class="dna-overview-title">Your Cyber DNA</div>
        <div class="dna-overview-sub">Visual skill profile across ${DNA_SKILLS.reduce((a,d)=>a+d.skills.length,0)} cybersecurity competencies</div>
        <div class="dna-overall-score">
          ${renderDNARadar(domainScores)}
        </div>
      </div>
      <div class="dna-overview-right">
        <div class="dna-legend-title">PROFICIENCY LEVELS</div>
        ${[
          {level:0, label:'Unknown',      color:'rgba(255,255,255,0.1)'},
          {level:1, label:'Beginner',     color:'#ef4444'},
          {level:2, label:'Intermediate', color:'#f59e0b'},
          {level:3, label:'Advanced',     color:'#10b981'},
          {level:4, label:'Expert',       color:'#00d4ff'},
        ].map(l=>`<div class="dna-legend-item">
          <span class="dna-legend-dot" style="background:${l.color}"></span>
          <span class="dna-legend-num">${l.level}</span>
          <span class="dna-legend-label">${l.label}</span>
        </div>`).join('')}
        <div class="dna-self-assess-note">
          ⬇️ Self-assess your skills below — or take quizzes to auto-fill
        </div>
        <button class="dna-quiz-btn" onclick="navigate('quiz')">🧪 Take Quizzes to Auto-Fill →</button>
      </div>
    </div>

    <!-- Domain Skill Maps -->
    <div class="dna-domains-grid">
      ${domainScores.map(domain => `
        <div class="dna-domain-card reveal" style="--domain-color:${domain.color}">
          <div class="dna-domain-header">
            <span class="dna-domain-icon">${domain.icon}</span>
            <span class="dna-domain-name">${domain.domain}</span>
            <span class="dna-domain-avg" style="color:${domain.color}">${domain.avg}/4</span>
          </div>
          <div class="dna-skill-list">
            ${domain.skills.map(skill => {
              const level = getSkillLevel(domain, skill, data);
              const colors = ['rgba(255,255,255,0.08)','#ef4444','#f59e0b','#10b981','#00d4ff'];
              const labels = ['Unknown','Beginner','Intermediate','Advanced','Expert'];
              return `<div class="dna-skill-row">
                <span class="dna-skill-name">${skill.name}</span>
                <div class="dna-skill-dots">
                  ${[1,2,3,4].map(l=>`
                    <button class="dna-dot ${level>=l?'active':''}"
                      style="${level>=l?`background:${colors[level]};box-shadow:0 0 6px ${colors[level]}50`:''}"
                      onclick="setSkillLevel('${skill.xpKey}',${l},'${domain.domain}')"
                      title="${labels[l]}">
                    </button>`).join('')}
                </div>
                <span class="dna-skill-level" style="color:${colors[level]}">${labels[level]}</span>
              </div>`;
            }).join('')}
          </div>
          <div class="dna-domain-bar-wrap">
            <div class="dna-domain-bar" style="width:${(domain.avg/4)*100}%;background:${domain.color}"></div>
          </div>
        </div>`).join('')}
    </div>

    <!-- Actions -->
    <div class="dna-actions reveal">
      <button class="dna-act-btn dna-act-primary" onclick="navigate('skillgap')">
        🎯 Analyze Skill Gap for My Career Goal →
      </button>
      <button class="dna-act-btn dna-act-secondary" onclick="navigate('advisor');setTimeout(()=>askAdvisor('Based on my cybersecurity skill profile, what should I focus on improving next?'),500)">
        🤖 Get AI Recommendations
      </button>
      <button class="dna-act-btn dna-act-secondary" onclick="resetDNA()">
        🗑️ Reset DNA
      </button>
    </div>`;
};

/* ── SET SKILL LEVEL ── */
window.setSkillLevel = function(xpKey, level, domain) {
  const uid    = window.CV_USER?.uid || 'guest';
  const stored = JSON.parse(localStorage.getItem('cp_dna_' + uid) || '{}');
  stored[xpKey] = level;
  localStorage.setItem('cp_dna_' + uid, JSON.stringify(stored));
  renderDNA(); // Re-render
  };

window.resetDNA = function() {
  if (!confirm('Reset all skill levels?')) return;
  const uid = window.CV_USER?.uid || 'guest';
  localStorage.removeItem('cp_dna_' + uid);
  renderDNA();
};

/* ── SIMPLE RADAR CHART (SVG) ── */
function renderDNARadar(domains) {
  const cx = 120, cy = 120, r = 90;
  const n   = domains.length;
  const pts = domains.map((d,i) => {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const pct   = d.avg / 4;
    return { x: cx + r * pct * Math.cos(angle), y: cy + r * pct * Math.sin(angle), color: d.color, label: d.domain, icon: d.icon };
  });
  const gridPts = [1,2,3,4].map(level =>
    domains.map((_,i) => {
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      const pct   = level / 4;
      return `${cx + r * pct * Math.cos(angle)},${cy + r * pct * Math.sin(angle)}`;
    }).join(' ')
  );
  const outerPts = domains.map((_,i) => {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return `
    <svg width="240" height="240" viewBox="0 0 240 240">
      <!-- Grid -->
      ${gridPts.map(pts=>`<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`).join('')}
      <!-- Axes -->
      ${outerPts.map(pt=>`<line x1="${cx}" y1="${cy}" x2="${pt.x}" y2="${pt.y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`).join('')}
      <!-- Data polygon -->
      <polygon points="${pts.map(p=>`${p.x},${p.y}`).join(' ')}" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" stroke-width="2"/>
      <!-- Icons -->
      ${pts.map((p,i) => {
        const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        const lx    = cx + (r+18) * Math.cos(angle);
        const ly    = cy + (r+18) * Math.sin(angle);
        return `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="14">${domains[i].icon}</text>`;
      }).join('')}
      <!-- Center -->
      <circle cx="${cx}" cy="${cy}" r="4" fill="#00d4ff"/>
    </svg>`;
}
