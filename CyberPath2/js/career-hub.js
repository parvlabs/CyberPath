/* ══════════════════════════════════════════════
   CYBERPATH — CAREER-HUB.JS
   9 Complete Cybersecurity Career Tracks
══════════════════════════════════════════════ */

const CAREERS = [
  {
    id: 'soc',
    icon: '🔍',
    title: 'SOC Analyst',
    color: '#00d4ff',
    level: 'Beginner Friendly',
    duration: '6–12 months',
    salary: '₹4–12 LPA · $55–90K',
    demand: 'Very High',
    desc: 'Monitor, detect and respond to security incidents in real-time. The backbone of every organization\'s security team.',
    skills: ['SIEM tools (Splunk, QRadar)','Log analysis & correlation','Incident response basics','Network traffic analysis','Threat intelligence','Linux & Windows security','Malware identification','Ticketing systems'],
    roadmap: [
      { phase:'Phase 1 — Foundations', time:'Month 1–2', items:['CompTIA Network+ concepts','Linux command line basics','Windows security fundamentals','Networking: TCP/IP, DNS, HTTP','CIA Triad & security concepts'] },
      { phase:'Phase 2 — Core Skills', time:'Month 2–4', items:['SIEM basics (start with Splunk free)','Log analysis and event correlation','Incident response lifecycle (PICERL)','Email security & phishing analysis','Basic malware identification'] },
      { phase:'Phase 3 — Hands-on Labs', time:'Month 4–8', items:['TryHackMe SOC Level 1 path','Blue Team Labs Online challenges','Splunk BOTS (Boss of the SOC)','LetsDefend platform','Build home lab with SIEM'] },
      { phase:'Phase 4 — Job Ready', time:'Month 8–12', items:['CompTIA Security+ exam','ISC2 CC certification (free)','Document all projects on GitHub','Apply for Tier 1 SOC positions','Practice interview questions'] },
    ],
    courses: [
      { name:'Google Cybersecurity Certificate', platform:'Coursera', free:true, url:'https://coursera.org/google-certificates/cybersecurity-certificate' },
      { name:'TryHackMe SOC Level 1', platform:'TryHackMe', free:true, url:'https://tryhackme.com/path/outline/soclevel1' },
      { name:'Splunk Fundamentals 1', platform:'Splunk', free:true, url:'https://education.splunk.com' },
      { name:'IBM Cybersecurity Analyst', platform:'Coursera', free:true, url:'https://coursera.org/professional-certificates/ibm-cybersecurity-analyst' },
      { name:'ISC2 Certified in Cybersecurity', platform:'ISC2', free:true, url:'https://isc2.org/certifications/cc' },
    ],
    tools: ['Splunk','IBM QRadar','Microsoft Sentinel','Wireshark','Nmap','Volatility','TheHive','MISP'],
    certs: ['CompTIA Security+','ISC2 CC (Free)','Splunk Core Certified','BTL1 — Blue Team Level 1','CySA+ (advanced)'],
    labs: ['TryHackMe','Blue Team Labs Online','LetsDefend','CyberDefenders','Splunk BOTS'],
    projects: ['Build home SIEM lab with Splunk','Create incident response playbook','Analyze real pcap files with Wireshark','Build threat intel dashboard','Document a CVE investigation'],
  },
  {
    id: 'pentester',
    icon: '⚡',
    title: 'Penetration Tester',
    color: '#ef4444',
    level: 'Intermediate',
    duration: '12–18 months',
    salary: '₹6–20 LPA · $70–130K',
    demand: 'High',
    desc: 'Legally hack into systems to find vulnerabilities before the bad guys do. The most exciting and well-paid role in cybersecurity.',
    skills: ['Network penetration testing','Web app testing (OWASP Top 10)','Social engineering','Scripting (Python/Bash)','Report writing','Active Directory attacks','Wireless security','Post-exploitation'],
    roadmap: [
      { phase:'Phase 1 — Fundamentals', time:'Month 1–3', items:['Linux mastery (Kali Linux)','Networking deep dive','Python scripting basics','Web tech (HTTP, HTML, JS, SQL)','CompTIA Security+ concepts'] },
      { phase:'Phase 2 — Attack Techniques', time:'Month 3–6', items:['OWASP Top 10 vulnerabilities','Network attacks (MitM, ARP, DNS)','Web app testing methodology','Burp Suite mastery','Metasploit framework basics'] },
      { phase:'Phase 3 — Practice Labs', time:'Month 6–12', items:['Hack The Box (Starting Point)','TryHackMe Jr Penetration Tester','PortSwigger Web Security Academy','VulnHub vulnerable machines','CTF competitions'] },
      { phase:'Phase 4 — Professional', time:'Month 12–18', items:['OSCP certification (gold standard)','Bug bounty programs (HackerOne)','Write professional pentest reports','Build methodology documentation','Specialize: web/network/mobile'] },
    ],
    courses: [
      { name:'PortSwigger Web Security Academy', platform:'PortSwigger', free:true, url:'https://portswigger.net/web-security' },
      { name:'Practical Ethical Hacking', platform:'TCM Security', free:true, url:'https://academy.tcm-sec.com' },
      { name:'Jr Penetration Tester Path', platform:'TryHackMe', free:true, url:'https://tryhackme.com' },
      { name:'Hack The Box Academy', platform:'HackTheBox', free:true, url:'https://academy.hackthebox.com' },
      { name:'Hacker101 (Bug Bounty)', platform:'HackerOne', free:true, url:'https://hacker101.com' },
    ],
    tools: ['Nmap','Burp Suite','Metasploit','Sqlmap','Gobuster','John the Ripper','Hashcat','BloodHound','Impacket'],
    certs: ['OSCP (gold standard)','eJPT (beginner friendly)','CompTIA PenTest+','CEH','BSCP (Burp Suite)'],
    labs: ['Hack The Box','TryHackMe','VulnHub','PortSwigger Labs','PentesterLab'],
    projects: ['Complete 20+ HTB machines','Find real bug bounty vulnerability','Build custom recon automation tool','Write professional pentest report','Create vulnerable lab for practice'],
  },
  {
    id: 'bugbounty',
    icon: '💰',
    title: 'Bug Bounty Hunter',
    color: '#f59e0b',
    level: 'Intermediate',
    duration: '6–18 months',
    salary: '$100 – $100,000+ per bug',
    demand: 'High',
    desc: 'Find vulnerabilities in real companies and get paid for it. Build income while learning — completely legal and legitimate.',
    skills: ['Web vulnerability research','Recon & information gathering','Burp Suite advanced','API security testing','Source code review','Report writing','Automation scripting','Business logic testing'],
    roadmap: [
      { phase:'Phase 1 — Web Fundamentals', time:'Month 1–3', items:['HTTP/HTTPS deep dive','JavaScript & browser security','Burp Suite basics','Browser developer tools','OWASP Top 10 theory'] },
      { phase:'Phase 2 — Vulnerability Classes', time:'Month 3–6', items:['XSS (reflected/stored/DOM)','SQL Injection & NoSQL','CSRF & SSRF','IDOR & access control','Authentication bypasses','API security testing'] },
      { phase:'Phase 3 — First Bugs', time:'Month 6–12', items:['PortSwigger all labs (free)','HackerOne CTF programs','VDP (free programs first)','Write quality bug reports','Build recon methodology'] },
      { phase:'Phase 4 — Scale Up', time:'Month 12–18', items:['Private program invitations','P1/P2 critical vulnerabilities','Automate recon pipeline','Build public profile','HackerOne/Bugcrowd top-rated'] },
    ],
    courses: [
      { name:'Web Security Academy (All Free)', platform:'PortSwigger', free:true, url:'https://portswigger.net/web-security' },
      { name:'Hacker101 Video Course', platform:'HackerOne', free:true, url:'https://hacker101.com' },
      { name:'Bug Bounty Hunting Methodology', platform:'NahamSec (YouTube)', free:true, url:'https://youtube.com/@NahamSec' },
      { name:'Bug Bounty Bootcamp', platform:'TCM Security', free:false, url:'https://academy.tcm-sec.com' },
    ],
    tools: ['Burp Suite','ffuf','Subfinder','httpx','Nuclei','Amass','waybackurls','gau','ParamSpider'],
    certs: ['BSCP (Burp Suite Certified)','OSCP','eWPT','HackerOne reputation'],
    labs: ['PortSwigger Web Academy','HackerOne CTFs','Bugcrowd University','DVWA','Juice Shop'],
    projects: ['Submit first HackerOne report','Automate subdomain enumeration','Build personal recon tool','Create vulnerability report template','Document full bug bounty methodology'],
  },
  {
    id: 'dfir',
    icon: '🦠',
    title: 'DFIR / Malware Analyst',
    color: '#8b5cf6',
    level: 'Intermediate–Advanced',
    duration: '12–24 months',
    salary: '₹6–18 LPA · $80–140K',
    demand: 'High',
    desc: 'Digital Forensics & Incident Response — investigate cyber attacks, analyze malware, and reverse engineer threats.',
    skills: ['Memory forensics','Disk forensics','Malware analysis (static/dynamic)','Reverse engineering basics','Incident response','Log analysis','Network forensics','YARA rules'],
    roadmap: [
      { phase:'Phase 1 — Foundations', time:'Month 1–4', items:['Python & Bash scripting','Windows internals & registry','Linux forensics basics','File systems (NTFS, ext4)','Network protocol analysis'] },
      { phase:'Phase 2 — Forensics Skills', time:'Month 4–9', items:['Memory analysis with Volatility','Disk imaging and analysis','Timeline analysis','Browser forensics','Email header analysis'] },
      { phase:'Phase 3 — Malware Analysis', time:'Month 9–18', items:['Static analysis (Ghidra - free)','Dynamic analysis (sandboxing)','YARA rule writing','Malware family classification','APT campaign analysis'] },
      { phase:'Phase 4 — Expert Level', time:'Month 18–24', items:['Assembly language basics','Advanced RE techniques','Threat intelligence reporting','GREM/eCMAP certification','Contribute to open source tools'] },
    ],
    courses: [
      { name:'OpenSecurityTraining2', platform:'OST2', free:true, url:'https://opensecuritytraining2.info' },
      { name:'Ghidra (NSA) Training', platform:'NSA', free:true, url:'https://ghidra-sre.org' },
      { name:'DFIR.training Resources', platform:'DFIR.training', free:true, url:'https://dfir.training' },
      { name:'TryHackMe DFIR Path', platform:'TryHackMe', free:true, url:'https://tryhackme.com' },
    ],
    tools: ['Autopsy','FTK Imager','Volatility','Ghidra','x64dbg','Wireshark','REMnux','FLARE-VM','Any.run'],
    certs: ['GREM (GIAC)','eCMAP','GCFE','GCFA','GCIH'],
    labs: ['CyberDefenders','Any.run (free)','Hybrid Analysis','Blue Team Labs Online','MalwareBazaar'],
    projects: ['Analyze 10 real malware samples','Write YARA detection rules','Build memory forensics report','Create IR playbook template','Reverse engineer CTF challenge'],
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud Security Engineer',
    color: '#3b82f6',
    level: 'Intermediate',
    duration: '10–18 months',
    salary: '₹8–25 LPA · $90–160K',
    demand: 'Very High',
    desc: 'Secure cloud infrastructure on AWS, Azure, and GCP. One of the fastest growing and highest paying security roles.',
    skills: ['AWS/Azure/GCP security','IAM & access management','Cloud networking','Container security (Docker/K8s)','Infrastructure as Code','DevSecOps','Compliance frameworks','Cloud threat detection'],
    roadmap: [
      { phase:'Phase 1 — Cloud Basics', time:'Month 1–3', items:['AWS/Azure fundamentals (free tier)','Networking in cloud (VPC, subnets)','IAM concepts and best practices','Linux administration','Python & Terraform basics'] },
      { phase:'Phase 2 — Security Skills', time:'Month 3–7', items:['Cloud security architecture','Security groups & NACLs','Secrets management (Vault)','CloudTrail & monitoring','Container security basics'] },
      { phase:'Phase 3 — DevSecOps', time:'Month 7–13', items:['CI/CD pipeline security','SAST/DAST tools integration','Kubernetes security','Serverless security','Cloud threat hunting'] },
      { phase:'Phase 4 — Expert', time:'Month 13–18', items:['AWS Security Specialty exam','CCSP certification','Multi-cloud security strategy','Compliance (SOC2, ISO27001)','Lead cloud security architecture'] },
    ],
    courses: [
      { name:'AWS Cloud Practitioner', platform:'AWS Skill Builder', free:true, url:'https://explore.skillbuilder.aws' },
      { name:'Google Cloud Security', platform:'Google Cloud Skills Boost', free:true, url:'https://cloudskillsboost.google' },
      { name:'Azure Security Fundamentals', platform:'Microsoft Learn', free:true, url:'https://learn.microsoft.com' },
      { name:'CloudGoat (Vulnerable AWS)', platform:'Rhino Security', free:true, url:'https://github.com/RhinoSecurityLabs/cloudgoat' },
    ],
    tools: ['AWS Security Hub','Azure Defender','Prisma Cloud','Terraform','Checkov','Prowler','ScoutSuite','Trivy'],
    certs: ['AWS Security Specialty','CCSP (Cloud Security)','Azure Security Engineer','GCP Professional Cloud Security'],
    labs: ['AWS Free Tier','Azure Free Account','CloudGoat','TryHackMe Cloud rooms','SANS Cloud Security'],
    projects: ['Secure a full AWS architecture','Build cloud security dashboard','Implement DevSecOps pipeline','Create IaC security scanner','CloudGoat walkthrough documentation'],
  },
  {
    id: 'seceng',
    icon: '⚙️',
    title: 'Security Engineer',
    color: '#10b981',
    level: 'Intermediate–Advanced',
    duration: '12–24 months',
    salary: '₹10–30 LPA · $100–180K',
    demand: 'Very High',
    desc: 'Build and maintain security systems, tools, and infrastructure. The architects of organizational security.',
    skills: ['Security architecture','Python/Go programming','Zero Trust implementation','SIEM & SOAR development','Vulnerability management','API security','Automation & orchestration','Security metrics'],
    roadmap: [
      { phase:'Phase 1 — Engineering Base', time:'Month 1–4', items:['Strong Python programming','System design concepts','API development & security','CI/CD and DevOps basics','Network security fundamentals'] },
      { phase:'Phase 2 — Security Engineering', time:'Month 4–10', items:['Security architecture patterns','Authentication (OAuth, SAML, JWT)','SIEM customization & tuning','Security automation with Python','Vulnerability management programs'] },
      { phase:'Phase 3 — Advanced', time:'Month 10–18', items:['Zero Trust architecture','Custom security tool development','Threat modeling (STRIDE, PASTA)','Security metrics & KPIs','Compliance automation'] },
      { phase:'Phase 4 — Leadership', time:'Month 18–24', items:['CISSP certification','Security architecture reviews','Present to stakeholders','Mentor junior engineers','Define security standards'] },
    ],
    courses: [
      { name:'CS50 Computer Science', platform:'Harvard (Free)', free:true, url:'https://cs50.harvard.edu/x' },
      { name:'Python for Security', platform:'freeCodeCamp', free:true, url:'https://freecodecamp.org' },
      { name:'SANS Security Engineering', platform:'SANS', free:false, url:'https://sans.org' },
    ],
    tools: ['Python','Go','Terraform','Ansible','ELK Stack','SOAR platforms','Vault by HashiCorp','Falco'],
    certs: ['CISSP','CISM','CSSLP (Secure Software)','AWS Security Specialty','GWAPT'],
    labs: ['Build custom SIEM','Develop security automation scripts','Create vulnerability scanner','Design Zero Trust lab'],
    projects: ['Build custom log aggregation system','Develop automated threat hunting tool','Create security metrics dashboard','Design and document security architecture','Build internal security training platform'],
  },
  {
    id: 'grc',
    icon: '📋',
    title: 'GRC Analyst',
    color: '#ec4899',
    level: 'Beginner Friendly',
    duration: '6–12 months',
    salary: '₹5–15 LPA · $60–110K',
    demand: 'High',
    desc: 'Governance, Risk & Compliance — ensure organizations follow security standards and regulations. Great entry-level option.',
    skills: ['Risk assessment','Compliance frameworks (ISO27001, NIST, SOC2)','Policy writing','Audit skills','Vendor risk management','Business continuity','Security awareness','Regulatory knowledge (GDPR, HIPAA)'],
    roadmap: [
      { phase:'Phase 1 — Framework Knowledge', time:'Month 1–3', items:['NIST Cybersecurity Framework','ISO 27001 basics','SOC 2 fundamentals','Risk assessment methodology','Compliance concepts'] },
      { phase:'Phase 2 — GRC Skills', time:'Month 3–6', items:['Policy & procedure writing','Risk register management','Third-party risk assessment','Security awareness programs','Audit preparation'] },
      { phase:'Phase 3 — Tools & Practice', time:'Month 6–9', items:['GRC tools (ServiceNow, Archer)','Privacy regulations (GDPR, HIPAA)','Business continuity planning','Vendor risk management','Incident reporting'] },
      { phase:'Phase 4 — Certifications', time:'Month 9–12', items:['CISA (Certified IS Auditor)','CRISC (Risk and Control)','ISO 27001 Lead Auditor','CompTIA Security+','Build compliance portfolio'] },
    ],
    courses: [
      { name:'NIST Framework Training', platform:'NIST (Free)', free:true, url:'https://nist.gov/cyberframework' },
      { name:'ISO 27001 Basics', platform:'YouTube/Free resources', free:true, url:'https://youtube.com' },
      { name:'Cybersecurity Risk Management', platform:'Coursera', free:true, url:'https://coursera.org' },
    ],
    tools: ['ServiceNow GRC','RSA Archer','MetricStream','OneTrust','LogicGate','Jira (risk tracking)'],
    certs: ['CISA','CRISC','CISM','ISO 27001 Lead Auditor','CompTIA Security+'],
    labs: ['Case study analysis','Mock audit exercises','Risk assessment practice','Policy writing workshops'],
    projects: ['Write company security policy','Create risk assessment report','Build compliance checklist (ISO27001)','Design security awareness program','Document BCP/DRP plan'],
  },
  {
    id: 'appsec',
    icon: '🌐',
    title: 'Web / AppSec Engineer',
    color: '#06b6d4',
    level: 'Intermediate',
    duration: '10–18 months',
    salary: '₹8–22 LPA · $85–150K',
    demand: 'Very High',
    desc: 'Secure web applications and APIs. Work with dev teams to build security into software from the start.',
    skills: ['Web vulnerability assessment','Secure code review','Threat modeling','API security','SAST/DAST tools','DevSecOps integration','OWASP expertise','Security architecture for apps'],
    roadmap: [
      { phase:'Phase 1 — Web Tech Mastery', time:'Month 1–3', items:['HTML, CSS, JavaScript basics','HTTP/HTTPS deep understanding','REST API concepts','Browser security model','Web frameworks (Django/Node)'] },
      { phase:'Phase 2 — Web Security', time:'Month 3–7', items:['OWASP Top 10 (all 10)','Authentication & authorization','Session management','Input validation & output encoding','CSP, CORS, security headers'] },
      { phase:'Phase 3 — AppSec Engineering', time:'Month 7–13', items:['Secure SDLC implementation','SAST tools (SonarQube, Semgrep)','DAST tools (OWASP ZAP)','Threat modeling (STRIDE)','Security code review'] },
      { phase:'Phase 4 — Expert', time:'Month 13–18', items:['BSCP certification','Bug bounty for portfolio','Security champion programs','Shift-left security advocacy','API security gateway implementation'] },
    ],
    courses: [
      { name:'Web Security Academy (100% Free)', platform:'PortSwigger', free:true, url:'https://portswigger.net/web-security' },
      { name:'OWASP WebGoat', platform:'OWASP', free:true, url:'https://owasp.org/www-project-webgoat' },
      { name:'Secure Coding Practices', platform:'SANS (Free resources)', free:true, url:'https://sans.org' },
    ],
    tools: ['Burp Suite','OWASP ZAP','SonarQube','Semgrep','Nikto','Nessus','Checkmarx','Snyk'],
    certs: ['BSCP (Burp Suite)','GWEB (GIAC)','CSSLP','eWPT','OSWE (advanced)'],
    labs: ['PortSwigger Web Academy','OWASP WebGoat','DVWA','Juice Shop','HackTheBox Web challenges'],
    projects: ['Build vulnerable web app for practice','Implement secure SDLC for a project','Write security code review guide','Create OWASP Top 10 demo app','Develop security testing checklist'],
  },
  {
    id: 'researcher',
    icon: '🔬',
    title: 'Security Researcher',
    color: '#a78bfa',
    level: 'Advanced',
    duration: '18–36 months',
    salary: '₹12–40 LPA · $100–200K+',
    demand: 'Medium (High skill)',
    desc: 'Push the boundaries of security knowledge. Discover new vulnerabilities, publish research, and shape the future of cybersecurity.',
    skills: ['Advanced reverse engineering','Vulnerability research','Exploit development','Fuzzing techniques','Academic writing','CVE reporting','Assembly language','Kernel/firmware security'],
    roadmap: [
      { phase:'Phase 1 — Strong Base', time:'Month 1–6', items:['Master one domain (web/binary/cloud)','Python & C programming','OS internals (Linux/Windows kernel)','Networking protocols deep dive','CTF competitions regularly'] },
      { phase:'Phase 2 — Research Skills', time:'Month 6–12', items:['Fuzzing with AFL++/libFuzzer','Vulnerability class deep research','Academic paper reading/writing','CVE discovery methodology','Open source security tool contribution'] },
      { phase:'Phase 3 — Specialization', time:'Month 12–24', items:['Pick a niche (IoT/browser/cloud/AI security)','Submit bug bounties for research','Publish blog posts & research','Conference talk submissions (DEF CON, Black Hat)','Develop novel attack techniques'] },
      { phase:'Phase 4 — Recognition', time:'Month 24–36', items:['CVE credits','Published research papers','Conference presentations','Security advisory credits','Lead research team or start lab'] },
    ],
    courses: [
      { name:'OpenSecurityTraining2 (Advanced)', platform:'OST2', free:true, url:'https://opensecuritytraining2.info' },
      { name:'CTF Resources (ctftime.org)', platform:'CTFtime', free:true, url:'https://ctftime.org' },
      { name:'pwn.college (Binary Exploitation)', platform:'pwn.college', free:true, url:'https://pwn.college' },
    ],
    tools: ['Ghidra','IDA Pro','Binary Ninja','AFL++','LibFuzzer','GDB/pwndbg','Frida','radare2'],
    certs: ['OSED (Offensive Security)','GREM','PhD/MS in CS (optional but helpful)','CVE credits','Bug bounty hall of fame'],
    labs: ['pwn.college','CTF competitions','Your own research lab','Bug bounty programs','Open source projects'],
    projects: ['Discover and report a CVE','Build a fuzzer for a target','Publish security research blog','Present at local security meetup','Contribute to security tool (GitHub)'],
  },
];

let selectedCareer = null;

/* ── RENDER CAREER HUB ── */
window.renderCareerHub = function() {
  const el = document.getElementById('careerHubBody');
  if (!el) return;

  if (selectedCareer) {
    renderCareerDetail(selectedCareer);
    return;
  }

  el.innerHTML = `
    <div class="career-intro">
      <p class="career-intro-text">
        Choose your cybersecurity career path. Each track includes a complete roadmap,
        courses, tools, certifications and projects tailored to that role.
      </p>
    </div>

    <div class="careers-grid">
      ${CAREERS.map(c => `
        <div class="career-card" onclick="openCareer('${c.id}')" style="--career-color:${c.color}">
          <div class="career-card-top">
            <span class="career-icon">${c.icon}</span>
            <div class="career-demand demand-${c.demand.toLowerCase().replace(' ','-')}">${c.demand} Demand</div>
          </div>
          <div class="career-title">${c.title}</div>
          <div class="career-desc">${c.desc}</div>
          <div class="career-meta">
            <span class="career-meta-item">⏱ ${c.duration}</span>
            <span class="career-meta-item">💰 ${c.salary.split('·')[0].trim()}</span>
            <span class="career-meta-item">📊 ${c.level}</span>
          </div>
          <div class="career-card-footer">
            <span class="career-skills-preview">
              ${c.skills.slice(0,3).map(s=>`<span class="career-skill-tag">${s}</span>`).join('')}
            </span>
            <span class="career-arrow">→</span>
          </div>
        </div>
      `).join('')}
    </div>`;
};

window.openCareer = function(id) {
  selectedCareer = CAREERS.find(c => c.id === id);
  if (!selectedCareer) return;
  renderCareerDetail(selectedCareer);
};

window.backToCareers = function() {
  selectedCareer = null;
  renderCareerHub();
};

function renderCareerDetail(career) {
  const el = document.getElementById('careerHubBody');
  if (!el) return;

  el.innerHTML = `
    <div class="career-detail">

      <!-- Back + Header -->
      <button class="career-back-btn" onclick="backToCareers()">← All Careers</button>

      <div class="career-detail-header" style="border-left: 4px solid ${career.color}">
        <div class="career-detail-icon">${career.icon}</div>
        <div class="career-detail-info">
          <div class="career-detail-title">${career.title}</div>
          <div class="career-detail-meta">
            <span>⏱ ${career.duration}</span>
            <span>💰 ${career.salary}</span>
            <span>📊 ${career.level}</span>
            <span class="career-demand demand-${career.demand.toLowerCase().replace(' ','-')}">${career.demand} Demand</span>
          </div>
          <div class="career-detail-desc">${career.desc}</div>
        </div>
        <button class="career-ai-btn" onclick="askAdvisorAboutCareer('${career.title}')">
          🤖 Ask AI About This Career
        </button>
      </div>

      <!-- Skills -->
      <div class="career-section">
        <div class="career-section-title">🛠️ KEY SKILLS TO LEARN</div>
        <div class="career-skills-grid">
          ${career.skills.map(s=>`<div class="career-skill-item">✓ ${s}</div>`).join('')}
        </div>
      </div>

      <!-- Roadmap -->
      <div class="career-section">
        <div class="career-section-title">🗺️ PHASE-WISE ROADMAP</div>
        <div class="career-roadmap">
          ${career.roadmap.map((phase, i) => `
            <div class="roadmap-phase">
              <div class="roadmap-phase-header">
                <div class="roadmap-phase-num">${i+1}</div>
                <div>
                  <div class="roadmap-phase-title">${phase.phase}</div>
                  <div class="roadmap-phase-time">⏱ ${phase.time}</div>
                </div>
              </div>
              <div class="roadmap-phase-items">
                ${phase.items.map(item=>`<div class="roadmap-item">→ ${item}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 2 column: Courses + Tools -->
      <div class="career-2col">
        <div class="career-section">
          <div class="career-section-title">📚 RECOMMENDED COURSES</div>
          ${career.courses.map(c=>`
            <a href="${c.url}" target="_blank" class="career-course-item">
              <div>
                <div class="career-course-name">${c.name}</div>
                <div class="career-course-platform">${c.platform}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span class="career-free-tag ${c.free?'free':'paid'}">${c.free?'FREE':'PAID'}</span>
                <span style="color:var(--text3);font-size:0.8rem">↗</span>
              </div>
            </a>
          `).join('')}
        </div>
        <div class="career-section">
          <div class="career-section-title">🔧 TOOLS TO MASTER</div>
          <div class="career-tools-grid">
            ${career.tools.map(t=>`<div class="career-tool-tag">${t}</div>`).join('')}
          </div>
          <div class="career-section-title" style="margin-top:20px">🏅 CERTIFICATIONS</div>
          ${career.certs.map((c,i)=>`<div class="career-cert-item"><span class="career-cert-num">${i+1}</span>${c}</div>`).join('')}
        </div>
      </div>

      <!-- Labs + Projects -->
      <div class="career-2col">
        <div class="career-section">
          <div class="career-section-title">🧪 PRACTICE LABS</div>
          ${career.labs.map(l=>`<div class="career-lab-item">🔬 ${l}</div>`).join('')}
        </div>
        <div class="career-section">
          <div class="career-section-title">💡 PORTFOLIO PROJECTS</div>
          ${career.projects.map((p,i)=>`<div class="career-project-item"><span class="career-proj-num">${i+1}</span>${p}</div>`).join('')}
        </div>
      </div>

      <!-- AI Button -->
      <div class="career-ai-section">
        <button class="career-ai-big-btn" onclick="askAdvisorAboutCareer('${career.title}')">
          🤖 Get My Personalized ${career.title} Roadmap from AI Advisor
        </button>
      </div>

    </div>`;
}

window.askAdvisorAboutCareer = function(title) {
  navigate('advisor');
  setTimeout(() => {
    askAdvisor(`I want to become a ${title}. Give me a detailed personalized roadmap based on my goal.`);
  }, 500);
};
