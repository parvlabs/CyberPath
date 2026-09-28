/* ══════════════════════════════════════════════
   CYBERPATH — RESOURCES.JS
   Resource Finder (tools & AI utilities only)
   Smart recommendations based on quiz weak areas
   ══════════════════════════════════════════════ */

const ALL_RESOURCES = [
  // Practice Platforms
  { id:'r1',  name:'TryHackMe',              cat:'platform',   tags:['beginner','soc','pentesting'],  price:'freemium', url:'https://tryhackme.com',              desc:'Best beginner-friendly hacking platform. Guided paths.' },
  { id:'r2',  name:'Hack The Box',           cat:'platform',   tags:['intermediate','pentesting'],    price:'freemium', url:'https://hackthebox.com',             desc:'Industry-standard CTF and lab platform.' },
  { id:'r3',  name:'PortSwigger Academy',    cat:'platform',   tags:['web','beginner'],               price:'free',     url:'https://portswigger.net/web-security',desc:'Best free web security learning platform.' },
  { id:'r4',  name:'LetsDefend',             cat:'platform',   tags:['soc','blue-team'],              price:'freemium', url:'https://letsdefend.io',              desc:'SOC analyst simulator with real alerts.' },
  { id:'r5',  name:'CyberDefenders',         cat:'platform',   tags:['dfir','soc'],                   price:'free',     url:'https://cyberdefenders.org',         desc:'Free blue team CTF challenges.' },
  { id:'r6',  name:'PicoCTF',                cat:'platform',   tags:['beginner','ctf'],               price:'free',     url:'https://picoctf.org',                desc:'Beginner CTF by Carnegie Mellon.' },
  { id:'r7',  name:'OverTheWire',            cat:'platform',   tags:['linux','beginner'],             price:'free',     url:'https://overthewire.org',            desc:'Linux wargames. Start with Bandit.' },
  { id:'r8',  name:'pwn.college',            cat:'platform',   tags:['advanced','binary'],            price:'free',     url:'https://pwn.college',                desc:'Advanced binary exploitation.' },
  { id:'r9',  name:'Blue Team Labs Online',  cat:'platform',   tags:['soc','dfir'],                   price:'freemium', url:'https://blueteamlabs.online',        desc:'Blue team investigation labs.' },
  { id:'r10', name:'VulnHub',                cat:'platform',   tags:['pentesting','vm'],              price:'free',     url:'https://vulnhub.com',                desc:'Vulnerable VMs to practice on.' },
  // Tools
  { id:'r11', name:'Burp Suite Community',   cat:'tool',       tags:['web','pentesting'],             price:'free',     url:'https://portswigger.net/burp',       desc:'Industry standard web app testing tool.' },
  { id:'r12', name:'Nmap',                   cat:'tool',       tags:['networking','recon'],           price:'free',     url:'https://nmap.org',                   desc:'Network scanner. Essential for pentesting.' },
  { id:'r13', name:'Wireshark',              cat:'tool',       tags:['networking','dfir'],            price:'free',     url:'https://wireshark.org',              desc:'Packet analyzer. Must-know tool.' },
  { id:'r14', name:'Metasploit',             cat:'tool',       tags:['pentesting','exploitation'],    price:'free',     url:'https://metasploit.com',             desc:'Penetration testing framework.' },
  { id:'r15', name:'OWASP ZAP',              cat:'tool',       tags:['web','scanning'],               price:'free',     url:'https://zaproxy.org',                desc:'Free web app security scanner.' },
  { id:'r16', name:'Volatility',             cat:'tool',       tags:['dfir','memory-forensics'],      price:'free',     url:'https://volatilityfoundation.org',   desc:'Memory forensics framework.' },
  { id:'r17', name:'Autopsy',                cat:'tool',       tags:['dfir','forensics'],             price:'free',     url:'https://sleuthkit.org/autopsy',      desc:'Digital forensics platform.' },
  { id:'r18', name:'Any.run',                cat:'tool',       tags:['malware','sandbox'],            price:'freemium', url:'https://any.run',                    desc:'Interactive malware sandbox.' },
  { id:'r19', name:'Shodan',                 cat:'tool',       tags:['osint','recon'],                price:'freemium', url:'https://shodan.io',                  desc:'Search engine for internet-connected devices.' },
  { id:'r20', name:'Splunk Free',            cat:'tool',       tags:['soc','siem'],                   price:'free',     url:'https://splunk.com/en_us/download',  desc:'Free SIEM for home lab. 500MB/day.' },
  // Documentation
  { id:'r21', name:'OWASP Top 10',           cat:'docs',       tags:['web','standards'],              price:'free',     url:'https://owasp.org/www-project-top-ten', desc:'The definitive web security vulnerability list.' },
  { id:'r22', name:'MITRE ATT&CK',           cat:'docs',       tags:['threat-intel','soc'],           price:'free',     url:'https://attack.mitre.org',           desc:'Adversary tactics and techniques knowledge base.' },
  { id:'r23', name:'CVE Database (NVD)',      cat:'docs',       tags:['vulnerabilities','research'],   price:'free',     url:'https://nvd.nist.gov',               desc:'Official vulnerability database by NIST.' },
  { id:'r24', name:'HackTricks',             cat:'docs',       tags:['pentesting','cheatsheet'],      price:'free',     url:'https://book.hacktricks.xyz',        desc:'Massive pentesting cheatsheet and guide.' },
  { id:'r25', name:'GTFOBins',               cat:'docs',       tags:['linux','privilege-escalation'], price:'free',     url:'https://gtfobins.github.io',         desc:'Unix binaries for privilege escalation.' },
  // Certifications
  { id:'r26', name:'CompTIA Security+',      cat:'cert',       tags:['beginner','certification'],     price:'paid',     url:'https://comptia.org/certifications/security',desc:'Most popular entry-level security cert.' },
  { id:'r27', name:'eJPT (eLearnSecurity)',   cat:'cert',       tags:['pentesting','beginner'],        price:'paid',     url:'https://ine.com/certifications/ejpt-certification', desc:'Best entry-level pentesting cert.' },
  { id:'r28', name:'Google Cybersecurity',   cat:'cert',       tags:['beginner','soc'],               price:'free',     url:'https://coursera.org/google-certificates/cybersecurity-certificate', desc:'Free Google-backed cert. Job-ready.' },
  { id:'r29', name:'ISC2 CC',                cat:'cert',       tags:['beginner','free-cert'],         price:'free',     url:'https://isc2.org/certifications/cc', desc:'Completely free certification from ISC2.' },
  { id:'r30', name:'OSCP',                   cat:'cert',       tags:['advanced','pentesting'],        price:'paid',     url:'https://offensive-security.com/pwk-oscp', desc:'Gold standard penetration testing cert.' },
  { id:'r31', name:'CryptoHack',              cat:'platform',   tags:['crypto','beginner'],            price:'free',     url:'https://cryptohack.org', desc:'Fun, interactive platform for learning modern cryptography through hands-on challenges.' },
];

/* ══════════════════════════════
   RECOMMENDATION ENGINE
   ══════════════════════════════ */
const QUIZ_TO_RESOURCES = {
  networking: { resources: ['r12','r13'], reason: 'Your Networking quiz score needs improvement' },
  linux:      { resources: ['r7','r25'],  reason: 'Strengthen your Linux skills' },
  web:        { resources: ['r11','r3','r15'], reason: 'Your Web Security score needs work' },
  soc:        { resources: ['r4','r5','r9','r20'], reason: 'Improve your SOC & Blue Team skills' },
  malware:    { resources: ['r16','r17','r18'], reason: 'Practice Malware & DFIR skills' },
  cloud:      { resources: ['r20'], reason: 'Build Cloud Security knowledge' },
  crypto:     { resources: ['r31'], reason: 'Strengthen your Cryptography skills' },
  concepts:   { resources: ['r21','r22'], reason: 'Strengthen Security Concepts foundation' },
};

/* ── STATE ── */
let activeToolFilter    = 'all';
let activePriceFilter   = 'all';
let toolSearchTerm      = '';

/* ══════════════════════════════
   MAIN RENDER
   ══════════════════════════════ */
window.renderResources = function() {
  const el = document.getElementById('resourcesBody') || document.getElementById('finderBody');
  if (!el) return;

  const scores    = window.getQuizScores ? getQuizScores() : {};
  const weakAreas = Object.entries(scores).filter(([,v])=>v<70).sort(([,a],[,b])=>a-b).map(([k])=>k);
  const hasUser   = !!window.CV_USER;

  el.innerHTML = `
    ${hasUser && weakAreas.length > 0 ? buildRecommendations(weakAreas, scores) : ''}

    <div class="res-controls">
      <div class="search-wrap">
        <span class="search-ico">⌕</span>
        <input class="finder-search" type="text" placeholder="Search tools & resources..."
          value="${toolSearchTerm}" oninput="toolSearchTerm=this.value;renderToolList()">
      </div>
      <div class="res-filters">
        ${['all','platform','tool','docs','cert'].map(c=>`
          <button class="price-btn ${activeToolFilter===c?'active':''}" onclick="activeToolFilter='${c}';renderToolList()">
            ${c==='all'?'All':c==='platform'?'🖥️ Platforms':c==='tool'?'🔧 Tools':c==='docs'?'📄 Docs':'🏅 Certs'}
          </button>`).join('')}
        ${['free','freemium','paid'].map(p=>`
          <button class="price-btn ${activePriceFilter===p?'active':''}" onclick="activePriceFilter='${p}';renderToolList()">
            ${p==='free'?'🟢 Free':p==='freemium'?'🟡 Freemium':'🔴 Paid'}
          </button>`).join('')}
      </div>
    </div>
    <div id="toolList"></div>`;

  renderToolList();
};

/* ══════════════════════════════
   RECOMMENDATIONS
   ══════════════════════════════ */
function buildRecommendations(weakAreas, scores) {
  const recs = [];

  weakAreas.slice(0,3).forEach(topic => {
    const mapping = QUIZ_TO_RESOURCES[topic];
    if (!mapping) return;

    mapping.resources.forEach(rid => {
      const resource = ALL_RESOURCES.find(r => r.id === rid);
      const score    = scores[topic];
      if (resource && recs.length < 4) {
        recs.push({
          type:'resource', item:resource,
          reason:`${mapping.reason} (${score}%)`,
          topic,
        });
      }
    });
  });

  if (!recs.length) return '';

  return `
    <div class="res-recommendations">
      <div class="res-rec-header">
        <div>
          <div class="res-rec-title">⚡ RECOMMENDED FOR YOU</div>
          <div class="res-rec-sub">Based on your quiz performance — focus on weak areas first</div>
        </div>
        <button class="res-rec-quiz-btn" onclick="navigate('quiz')">🧪 Improve scores →</button>
      </div>
      <div class="res-rec-cards">
        ${recs.slice(0,4).map(rec=>`
          <a href="${rec.item.url}" target="_blank" class="res-rec-card">
            <div class="res-rec-card-top">
              <span class="res-rec-type-badge">🔧 Tool</span>
              <span class="res-rec-free ${rec.item.price==='free'?'free':rec.item.price==='freemium'?'freemium':'paid'}">
                ${rec.item.price==='free'?'FREE':rec.item.price==='freemium'?'FREEMIUM':'PAID'}
              </span>
            </div>
            <div class="res-rec-name">${rec.item.name}</div>
            <div class="res-rec-platform">${rec.item.cat}</div>
            <div class="res-rec-reason">⚠️ ${rec.reason}</div>
            <div class="res-rec-open">Open →</div>
          </a>`).join('')}
      </div>
    </div>`;
}

/* ══════════════════════════════
   TOOLS & RESOURCES
   ══════════════════════════════ */
window.renderToolList = function() {
  const el = document.getElementById('toolList');
  if (!el) return;

  let filtered = ALL_RESOURCES.filter(r => {
    const matchCat    = activeToolFilter === 'all' || r.cat === activeToolFilter;
    const matchPrice  = activePriceFilter === 'all' || r.price === activePriceFilter;
    const matchSearch = !toolSearchTerm || r.name.toLowerCase().includes(toolSearchTerm.toLowerCase()) || r.desc.toLowerCase().includes(toolSearchTerm.toLowerCase());
    return matchCat && matchPrice && matchSearch;
  });

  if (!filtered.length) {
    el.innerHTML = `<div class="res-empty">🔍 No results. <button onclick="activeToolFilter='all';activePriceFilter='all';toolSearchTerm='';renderToolList()">Clear filters</button></div>`;
    return;
  }

  el.innerHTML = `
    <div class="res-meta">${filtered.length} resources found</div>
    <div class="tools-grid">
      ${filtered.map(r=>`
        <a href="${r.url}" target="_blank" class="tool-card">
          <div class="tool-card-top">
            <span class="tool-cat-badge">${r.cat}</span>
            <span class="tool-price ${r.price}">${r.price==='free'?'🟢 FREE':r.price==='freemium'?'🟡 FREEMIUM':'🔴 PAID'}</span>
          </div>
          <div class="tool-name">${r.name}</div>
          <div class="tool-desc">${r.desc}</div>
          <div class="tool-tags">
            ${r.tags.map(t=>`<span class="tool-tag">${t}</span>`).join('')}
          </div>
        </a>`).join('')}
    </div>`;
};

/* ── Quiz scores getter (compat) ── */
window.getQuizScores = window.getQuizScores || function() {
  const uid = window.CV_USER?.uid || 'guest';
  return JSON.parse(localStorage.getItem('cp_quiz_scores_' + uid) || '{}');
};

/* ── Legacy shims for old index.html handler references ── */
window.filterAI = function() {
  if (typeof renderToolList === 'function') renderToolList();
};
window.filterCourses = function() { /* Learning Hub removed */ };
window.clearSearch = function() {
  toolSearchTerm = '';
  const el = document.getElementById('aiSearch');
  if (el) el.value = '';
  if (typeof renderToolList === 'function') renderToolList();
};
window.setPriceFilter = function(btn, price) {
  activePriceFilter = price;
  document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  if (typeof renderToolList === 'function') renderToolList();
};
