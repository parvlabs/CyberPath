/* ══════════════════════════════════════════════
   CYBERVAULT — NEWS.JS
   Cybersecurity News · Sources · Threat Feed
   Real RSS-linked sources + curated articles
   ══════════════════════════════════════════════ */

const NEWS_CATEGORIES = ['All', 'Breaches', 'Vulnerabilities', 'Malware', 'Privacy', 'AI Security', 'Threats', 'Tools'];

const NEWS_SOURCES = [
  { name: 'The Hacker News',      url: 'https://thehackernews.com',          icon: '🗞️', desc: 'Most popular cybersecurity news site worldwide' },
  { name: 'Krebs on Security',    url: 'https://krebsonsecurity.com',         icon: '🔍', desc: 'Investigative journalism on cybercrime & security' },
  { name: 'Bleeping Computer',    url: 'https://bleepingcomputer.com',        icon: '💻', desc: 'Malware, ransomware, & tech support news' },
  { name: 'Dark Reading',         url: 'https://darkreading.com',             icon: '🌑', desc: 'Enterprise security strategy & research' },
  { name: 'SecurityWeek',         url: 'https://securityweek.com',            icon: '📅', desc: 'Cybersecurity news, insights, and events' },
  { name: 'CISA Alerts',          url: 'https://cisa.gov/news-events/cybersecurity-advisories', icon: '🏛️', desc: 'Official US government security advisories' },
  { name: 'Threat Post',          url: 'https://threatpost.com',              icon: '⚡', desc: 'Breaking infosec news and analysis' },
  { name: 'Naked Security (Sophos)',url:'https://nakedsecurity.sophos.com',   icon: '🛡️', desc: 'Plain-English security news by Sophos' },
  { name: 'SANS Internet Storm Center', url: 'https://isc.sans.edu',          icon: '🌩️', desc: 'Daily threat analysis and incident reports' },
  { name: 'CVE Details',          url: 'https://cvedetails.com',              icon: '🐛', desc: 'Track latest Common Vulnerabilities & Exposures' },
  { name: 'Recorded Future',      url: 'https://recordedfuture.com/blog',     icon: '📡', desc: 'Threat intelligence and security research' },
  { name: 'Wired Security',       url: 'https://wired.com/category/security', icon: '📰', desc: 'Long-form security journalism and analysis' },
];

const ACTIVE_THREATS = [
  { name: 'Cl0p Ransomware Gang',   level: 'critical', desc: 'MOVEit zero-day exploitation ongoing' },
  { name: 'LockBit 3.0',            level: 'critical', desc: 'Active RaaS targeting healthcare & finance' },
  { name: 'Log4Shell (CVE-2021-44228)',level:'high',   desc: 'Still exploited in unpatched systems' },
  { name: 'MOVEit SQL Injection',   level: 'critical', desc: 'Mass exploitation across enterprises' },
  { name: 'Volt Typhoon (China APT)',level: 'high',    desc: 'Critical infrastructure targeting' },
  { name: 'BlackCat / ALPHV',       level: 'high',     desc: 'Healthcare sector ransomware attacks' },
  { name: 'GoAnywhere Zero-Day',    level: 'high',     desc: 'MFT vulnerability actively exploited' },
  { name: 'AI-Powered Phishing',    level: 'medium',   desc: 'GPT-generated spear phishing surge' },
  { name: 'SIM Swapping Attacks',   level: 'medium',   desc: 'Telecom-targeted identity fraud' },
  { name: 'Supply Chain Attacks',   level: 'high',     desc: 'NPM/PyPI malicious packages detected' },
  { name: 'Scattered Spider',       level: 'high',     desc: 'Social engineering + cloud breaches' },
  { name: 'MFA Fatigue Attacks',    level: 'medium',   desc: 'Push notification bombing increasing' },
];

const NEWS_ARTICLES = [
  /* FEATURED */
  {
    featured: true,
    cat: 'Breaches',
    title: 'Major Data Breach Exposes 100M Records — What You Must Do Now',
    desc: 'A massive breach affecting multiple financial institutions has exposed personal data including SSNs, credit card numbers, and login credentials. Security experts urge immediate password changes and credit monitoring.',
    source: 'The Hacker News',
    sourceBg: 'rgba(220,38,38,0.12)', sourceColor: '#f87171', sourceBorder: 'rgba(220,38,38,0.25)',
    date: '2 hours ago',
    url: 'https://thehackernews.com',
    dotColor: '#ef4444'
  },

  /* REGULAR ARTICLES */
  { cat:'Vulnerabilities', title:'Critical RCE Vulnerability Found in Apache Web Server (CVE-2024-XXXX)', desc:'A newly discovered zero-day allows remote code execution without authentication. Patch immediately.', source:'SecurityWeek', date:'4 hours ago', url:'https://securityweek.com', dotColor:'#f59e0b' },
  { cat:'Malware', title:'New Ransomware Strain "NightHawk" Targets Healthcare Sector', desc:'Sophisticated ransomware with living-off-the-land techniques evades traditional AV solutions.', source:'Bleeping Computer', date:'6 hours ago', url:'https://bleepingcomputer.com', dotColor:'#ef4444' },
  { cat:'AI Security', title:'Researchers Demonstrate GPT-4 Can Write Undetectable Malware', desc:'Academic paper shows LLMs can generate polymorphic malware that evades signature-based detection.', source:'Dark Reading', date:'8 hours ago', url:'https://darkreading.com', dotColor:'#a78bfa' },
  { cat:'Privacy', title:'Meta Fined €1.2 Billion Over GDPR Data Transfer Violations', desc:'Largest GDPR fine in history for transferring EU user data to US servers without adequate protections.', source:'Wired Security', date:'10 hours ago', url:'https://wired.com/category/security', dotColor:'#60a5fa' },
  { cat:'Threats', title:'Volt Typhoon APT Infiltrates US Power Grid Infrastructure', desc:'Chinese state-sponsored hackers maintain persistent access to critical infrastructure for years undetected.', source:'CISA Alerts', date:'12 hours ago', url:'https://cisa.gov', dotColor:'#f59e0b' },
  { cat:'Tools', title:'CISA Releases Free Malware Analysis Tool: "Malware Next-Gen"', desc:'Free online sandbox for analyzing suspicious files and URLs. Replaces traditional manual analysis workflow.', source:'CISA Alerts', date:'1 day ago', url:'https://cisa.gov', dotColor:'#10b981' },
  { cat:'Vulnerabilities', title:'Microsoft Patch Tuesday: 147 CVEs Including 6 Zero-Days', desc:'Monthly update addresses critical flaws in Windows, Office, Exchange, and Azure Active Directory.', source:'Krebs on Security', date:'1 day ago', url:'https://krebsonsecurity.com', dotColor:'#3b82f6' },
  { cat:'Malware', title:'Emotet Botnet Returns With New Evasion Techniques', desc:'Emotet resurfaces after takedown with updated encryption and anti-analysis techniques targeting Office documents.', source:'Threat Post', date:'2 days ago', url:'https://threatpost.com', dotColor:'#ef4444' },
  { cat:'AI Security', title:'AI-Generated Deepfake CEO Scam Costs Company $25 Million', desc:'Finance employee tricked into wire transfer after video call with deepfake CFO and other executives.', source:'Naked Security', date:'2 days ago', url:'https://nakedsecurity.sophos.com', dotColor:'#a78bfa' },
  { cat:'Privacy', title:'Google to Delete Billions of Records After Incognito Lawsuit', desc:'Settlement requires Google to delete Chrome incognito browsing data collected without proper disclosure.', source:'Wired Security', date:'2 days ago', url:'https://wired.com/category/security', dotColor:'#60a5fa' },
  { cat:'Threats', title:'Supply Chain Attack Targets 35,000 Developers via Malicious NPM Packages', desc:'Trojanized packages exfiltrate environment variables, SSH keys, and secrets from CI/CD pipelines.', source:'The Hacker News', date:'3 days ago', url:'https://thehackernews.com', dotColor:'#f59e0b' },
  { cat:'Tools', title:'Wireshark 4.2 Released — New Protocol Dissectors and AI Features', desc:'Major update adds AI-assisted packet analysis, 40 new protocol dissectors, and improved threat detection.', source:'SANS Internet Storm Center', date:'3 days ago', url:'https://isc.sans.edu', dotColor:'#10b981' },
  { cat:'Vulnerabilities', title:'CVSS 4.0 Released — New Scoring System for Modern Vulnerabilities', desc:'Updated vulnerability scoring framework adds environmental and supplemental metrics for cloud and AI systems.', source:'Dark Reading', date:'4 days ago', url:'https://darkreading.com', dotColor:'#f59e0b' },
  { cat:'Breaches', title:'Ticketmaster Breach: 560M Users Data Sold on Dark Web', desc:'ShinyHunters group claims responsibility for massive breach including payment info and personal details.', source:'Krebs on Security', date:'4 days ago', url:'https://krebsonsecurity.com', dotColor:'#ef4444' },
  { cat:'AI Security', title:'NIST Releases AI Risk Management Framework 1.0', desc:'First official US government framework for managing AI security risks, bias, and governance in organizations.', source:'SecurityWeek', date:'5 days ago', url:'https://securityweek.com', dotColor:'#a78bfa' },
  { cat:'Privacy', title:'WhatsApp Adds New Privacy Protection: Advanced Chat Privacy', desc:'New feature prevents message forwarding, exports, and AI training from private chats globally.', source:'Naked Security', date:'5 days ago', url:'https://nakedsecurity.sophos.com', dotColor:'#60a5fa' },
  { cat:'Threats', title:'Lazarus Group (North Korea) Steals $3B in Cryptocurrency', desc:'North Korean state hackers use sophisticated social engineering and zero-days to target crypto exchanges.', source:'The Hacker News', date:'6 days ago', url:'https://thehackernews.com', dotColor:'#f59e0b' },
  { cat:'Tools', title:'Nuclei 3.0 — Open Source Vulnerability Scanner Major Update', desc:'ProjectDiscovery releases Nuclei 3.0 with AI-assisted template generation and cloud scanning capabilities.', source:'Bleeping Computer', date:'1 week ago', url:'https://bleepingcomputer.com', dotColor:'#10b981' },
];

let activeNewsCat = 'All';
let newsReady = false;

window.renderNews = function() {
  if (newsReady) return;
  newsReady = true;

  // Category chips
  document.getElementById('newsCatBar').innerHTML = NEWS_CATEGORIES.map(c => `
    <button class="news-chip${c === 'All' ? ' active' : ''}"
      onclick="setNewsCat(this,'${c}')" data-cat="${c}">
      ${c === 'All'           ? '🌐 All News' :
        c === 'Breaches'      ? '💥 Breaches' :
        c === 'Vulnerabilities'? '🐛 CVEs'    :
        c === 'Malware'       ? '☠️ Malware'  :
        c === 'Privacy'       ? '🔏 Privacy'  :
        c === 'AI Security'   ? '🤖 AI Sec'   :
        c === 'Threats'       ? '⚡ Threats'  : '🛠️ Tools'}
    </button>
  `).join('');

  buildNewsLayout();
};

window.setNewsCat = function(btn, cat) {
  activeNewsCat = cat;
  document.querySelectorAll('.news-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildNewsLayout();
};

function buildNewsLayout() {
  const filtered = activeNewsCat === 'All'
    ? NEWS_ARTICLES
    : NEWS_ARTICLES.filter(a => a.cat === activeNewsCat);

  const featured = filtered.find(a => a.featured);
  const regular  = filtered.filter(a => !a.featured);

  const mainHTML = `
    ${featured ? featuredCard(featured) : ''}
    ${regular.map((a, i) => regularCard(a, i)).join('')}
  `;

  const sideHTML = `
    <!-- Live Threats -->
    <div class="sidebar-widget">
      <div class="widget-title">⚡ ACTIVE THREAT FEED</div>
      ${ACTIVE_THREATS.map(t => `
        <div class="threat-item">
          <span class="threat-level tl-${t.level}">${t.level}</span>
          <span class="threat-name" title="${t.desc}">${t.name}</span>
        </div>
      `).join('')}
    </div>

    <!-- News Sources -->
    <div class="sidebar-widget">
      <div class="widget-title">📡 TOP SOURCES</div>
      ${NEWS_SOURCES.slice(0, 8).map(s => `
        <a class="source-item" href="${s.url}" target="_blank" rel="noopener">
          <span class="source-icon">${s.icon}</span>
          <div class="source-info">
            <div class="source-name">${s.name}</div>
            <div class="source-desc">${s.desc}</div>
          </div>
          <span class="source-arrow">↗</span>
        </a>
      `).join('')}
    </div>

    <!-- Quick Stats -->
    <div class="sidebar-widget">
      <div class="widget-title">📊 THREAT STATS 2024</div>
      ${[
        { label: 'Ransomware Attacks',  val: '+73%', color: '#ef4444' },
        { label: 'Avg Breach Cost',     val: '$4.88M',color: '#f59e0b' },
        { label: 'AI-Powered Attacks',  val: '+200%', color: '#a78bfa' },
        { label: 'Open CVEs',           val: '250K+', color: '#60a5fa' },
        { label: 'Phishing Emails/Day', val: '3.4B',  color: '#f87171' },
        { label: 'Cyber Jobs Unfilled', val: '3.5M',  color: '#34d399' },
      ].map(s => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">
          <span style="font-family:var(--font-m);font-size:0.7rem;color:var(--text3)">${s.label}</span>
          <span style="font-family:var(--font-d);font-size:0.8rem;font-weight:700;color:${s.color}">${s.val}</span>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('newsLayout').innerHTML = `
    <div class="news-main">${filtered.length === 0 ? '<div class="no-results"><span class="no-results-icon">📰</span>No news in this category yet.</div>' : mainHTML}</div>
    <div class="news-sidebar">${sideHTML}</div>
  `;
}

function featuredCard(a) {
  return `
    <a class="news-card-featured" href="${a.url}" target="_blank" rel="noopener">
      <div class="news-featured-label">
        <span class="news-featured-dot"></span> BREAKING · ${a.cat}
      </div>
      <div class="news-featured-title">${a.title}</div>
      <div class="news-featured-desc">${a.desc}</div>
      <div class="news-featured-footer">
        <span class="news-source-badge" style="background:${a.sourceBg};color:${a.sourceColor};border:1px solid ${a.sourceBorder}">
          ${a.source}
        </span>
        <span class="news-date">🕐 ${a.date}</span>
        <span class="news-read-more">READ FULL STORY →</span>
      </div>
    </a>`;
}

function regularCard(a, i) {
  return `
    <a class="news-card" href="${a.url}" target="_blank" rel="noopener"
       style="animation-delay:${i * 0.05}s">
      <div class="news-card-dot" style="background:${a.dotColor};box-shadow:0 0 8px ${a.dotColor}60"></div>
      <div class="news-card-content">
        <div class="news-card-cat" style="color:${a.dotColor}">${a.cat}</div>
        <div class="news-card-title">${a.title}</div>
        <div class="news-card-desc">${a.desc}</div>
        <div class="news-card-footer">
          <span class="news-card-source">${a.source}</span>
          <span class="news-date" style="font-family:var(--font-m);font-size:0.62rem;color:var(--text3)">🕐 ${a.date}</span>
        </div>
      </div>
      <span class="news-card-arrow">→</span>
    </a>`;
}

/* ══════════════════════════════════════════════
   EXPLAIN SIMPLY — Gemini AI powered
   News → Simple explanation for learners
══════════════════════════════════════════════ */

window.explainNewsSimply = async function(btn, title, desc) {
  const container = btn.closest('.news-explain-wrap') || btn.parentElement;
  const resultEl  = container.querySelector('.explain-result') || document.createElement('div');
  resultEl.className = 'explain-result';

  if (resultEl.style.display === 'block') {
    resultEl.style.display = 'none';
    btn.textContent = '🧠 Explain Simply';
    return;
  }

  btn.textContent = '⟳ Explaining...';
  btn.disabled    = true;

  const prompt = `You are CyberPath AI. Explain this cybersecurity news item simply for a learner.

NEWS: "${title}"
SUMMARY: "${desc}"

Respond in this EXACT format:
🔍 WHAT HAPPENED?
[2-3 simple sentences]

⚠️ WHY IT MATTERS?
[2-3 sentences on impact]

👥 WHO IS AFFECTED?
[Who should care about this]

📚 WHAT SHOULD I UNDERSTAND?
[Key cybersecurity concept this relates to]

🎯 WHAT SHOULD I LEARN NEXT?
[1 specific topic or resource to learn more]

Keep it beginner-friendly. Avoid jargon. Max 200 words total.`;

  try {
    const text = await callAI(
      'You are CyberPath AI — a cybersecurity educator who explains complex news simply for beginners.',
      prompt,
      1000
    );
    resultEl.innerHTML = `
      <div class="explain-content">
        ${text.replace(/\n/g,'<br>').replace(/(🔍|⚠️|👥|📚|🎯) ([^\n<]+)/g,'<strong style="color:var(--accent)">$1 $2</strong>')}
      </div>
      <button class="explain-learn-btn" onclick="navigate('advisor');setTimeout(()=>askAdvisor('Explain this cybersecurity concept for me: ${title.replace(/'/g,"\\'")}'),500)">
        🤖 Learn More with AI Advisor →
      </button>`;
    resultEl.style.display = 'block';
    if (!container.contains(resultEl)) container.appendChild(resultEl);
  } catch(e) {
    const errCode = e && e.message;
    const msg = (window.getAIErrorMessage && errCode) ? getAIErrorMessage(errCode) : (e && e.message) || 'Connection error';
    resultEl.innerHTML = `<div class="explain-no-api">⚠️ ${msg}</div>`;
    resultEl.style.display = 'block';
    if (!container.contains(resultEl)) container.appendChild(resultEl);
  }

  btn.textContent = '🧠 Explain Simply';
  btn.disabled    = false;
};

/* Override regularCard and featuredCard to add Explain Simply button */
const _origFeaturedCard = window.featuredCard;
const _origRegularCard  = window.regularCard;

// Patch news rendering to inject Explain Simply
const _origRenderNews = window.renderNews;
window.renderNews = function() {
  // Always reset guard so filter switches re-render
  newsReady = false;
  _origRenderNews();
  // Inject explain buttons after render
  setTimeout(() => {
    document.querySelectorAll('.news-card-featured, .news-card').forEach(card => {
      if (card.querySelector('.news-explain-wrap')) return; // already injected
      const title = card.querySelector('.news-featured-title, .news-card-title')?.textContent || '';
      const desc  = card.querySelector('.news-featured-desc, .news-card-desc')?.textContent || '';
      const wrap  = document.createElement('div');
      wrap.className = 'news-explain-wrap';
      wrap.innerHTML = `<button class="explain-btn" onclick="event.preventDefault();event.stopPropagation();explainNewsSimply(this,'${title.replace(/'/g,"\\'").slice(0,100)}','${desc.replace(/'/g,"\\'").slice(0,200)}')">🧠 Explain Simply</button><div class="explain-result" style="display:none"></div>`;
      const footer = card.querySelector('.news-featured-footer, .news-card-footer');
      if (footer) footer.before(wrap);
    });
  }, 100);
};
