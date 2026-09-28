/* ══════════════════════════════════════════════
   CYBERPATH — QUIZ.JS
   Topic-wise Quiz · XP · Weak Area Detection
══════════════════════════════════════════════ */

const QUIZ_TOPICS = [
  { id:'networking',   label:'🌐 Networking',         color:'#00d4ff' },
  { id:'linux',        label:'🐧 Linux & OS',          color:'#10b981' },
  { id:'web',          label:'🕸️ Web Security',        color:'#f59e0b' },
  { id:'crypto',       label:'🔐 Cryptography',        color:'#8b5cf6' },
  { id:'malware',      label:'🦠 Malware & Threats',   color:'#ef4444' },
  { id:'cloud',        label:'☁️ Cloud Security',      color:'#3b82f6' },
  { id:'soc',          label:'🔍 SOC & Blue Team',     color:'#ec4899' },
  { id:'concepts',     label:'🛡️ Security Concepts',   color:'#06b6d4' },
];

const QUIZ_BANK = {
  networking: [
    { q:'Which layer of OSI model handles IP addressing?', opts:['Layer 2 — Data Link','Layer 3 — Network','Layer 4 — Transport','Layer 1 — Physical'], ans:1, exp:'Layer 3 (Network layer) handles logical addressing (IP) and routing between networks.' },
    { q:'What does DNS stand for?', opts:['Data Network Service','Domain Name System','Dynamic Network Setup','Digital Naming Standard'], ans:1, exp:'DNS = Domain Name System. It translates human-readable domain names (google.com) to IP addresses.' },
    { q:'Which protocol does HTTPS use for encryption?', opts:['SSH','IPSec','TLS/SSL','WPA2'], ans:2, exp:'HTTPS uses TLS (Transport Layer Security) — the modern successor to SSL — to encrypt web traffic.' },
    { q:'What is a "subnet mask" used for?', opts:['Encrypt network traffic','Divide a network into smaller networks','Identify MAC addresses','Block unauthorized access'], ans:1, exp:'Subnet masks define which portion of an IP address identifies the network vs. the host.' },
    { q:'Which port does SSH use by default?', opts:['21','22','23','25'], ans:1, exp:'SSH (Secure Shell) uses port 22 by default for encrypted remote access.' },
    { q:'What is ARP used for?', opts:['Routing packets across networks','Resolving IP addresses to MAC addresses','Encrypting network traffic','Assigning IP addresses'], ans:1, exp:'ARP (Address Resolution Protocol) maps IP addresses to physical MAC addresses on a local network.' },
    { q:'What is a "3-way handshake" in TCP?', opts:['SYN → SYN-ACK → ACK','GET → POST → DELETE','OPEN → DATA → CLOSE','REQUEST → RESPONSE → CONFIRM'], ans:0, exp:'TCP establishes connections via SYN (client) → SYN-ACK (server) → ACK (client). This ensures reliable connection.' },
    { q:'Which protocol is connectionless and faster than TCP?', opts:['FTP','UDP','SMTP','HTTP'], ans:1, exp:'UDP (User Datagram Protocol) is connectionless and faster — used for video streaming, DNS, gaming.' },
  ],
  linux: [
    { q:'Which command shows currently running processes in Linux?', opts:['ls -al','ps aux','netstat','grep'], ans:1, exp:'ps aux shows all running processes with details like PID, CPU usage, memory, and command name.' },
    { q:'What does chmod 755 do to a file?', opts:['Makes it read-only','Owner: rwx, Group: r-x, Others: r-x','Deletes the file','Encrypts the file'], ans:1, exp:'chmod 755 = Owner gets read/write/execute (7), Group gets read/execute (5), Others get read/execute (5).' },
    { q:'Which file contains user account information in Linux?', opts:['/etc/shadow','/etc/passwd','/etc/groups','/var/users'], ans:1, exp:'/etc/passwd contains user account info (username, UID, home dir). Passwords are hashed in /etc/shadow.' },
    { q:'What does the command "netstat -tulpn" show?', opts:['Disk usage','Active network connections and listening ports','Running processes','System logs'], ans:1, exp:'netstat -tulpn shows TCP/UDP listening ports and their associated processes — useful for identifying open services.' },
    { q:'Which command searches for text patterns in files?', opts:['find','grep','cat','sed'], ans:1, exp:'grep searches for text patterns in files. E.g., grep "error" /var/log/syslog finds all lines with "error".' },
    { q:'What is a cron job in Linux?', opts:['A system error log','A scheduled task that runs automatically','A type of malware','A network service'], ans:1, exp:'Cron jobs are scheduled tasks in Linux that run automatically at specified times — e.g., daily backups.' },
  ],
  web: [
    { q:'What does XSS stand for in web security?', opts:['Cross-Server Script','Cross-Site Scripting','Cross-System Service','Cross-Source Styling'], ans:1, exp:'XSS = Cross-Site Scripting. Attackers inject malicious JavaScript into web pages viewed by other users.' },
    { q:'What is SQL Injection?', opts:['A type of network attack','Injecting malicious SQL code into database queries','A method of encrypting databases','A password hashing technique'], ans:1, exp:'SQL Injection manipulates database queries by injecting malicious SQL — can steal, modify, or delete data.' },
    { q:'What does CSRF stand for?', opts:['Cross-Site Request Forgery','Cross-Server Response Failure','Client-Side Request Filter','Cross-Script Resource File'], ans:0, exp:'CSRF = Cross-Site Request Forgery. Tricks authenticated users into submitting malicious requests unknowingly.' },
    { q:'Which HTTP method is typically used to submit form data?', opts:['GET','POST','PUT','DELETE'], ans:1, exp:'POST sends data in the request body (not URL), making it suitable for form submissions and sensitive data.' },
    { q:'What is IDOR vulnerability?', opts:['Insecure Direct Object Reference','Internal Data Override Risk','Invalid Data Object Response','Indirect DNS Override Request'], ans:0, exp:'IDOR = Insecure Direct Object Reference. Attackers access objects (files, records) by modifying reference IDs.' },
    { q:'What is a "security header" in HTTP?', opts:['A type of malware','HTTP response headers that improve web security','A firewall rule','An encryption key'], ans:1, exp:'Security headers like CSP, X-Frame-Options, HSTS tell browsers how to behave securely when handling web content.' },
    { q:'What does OWASP stand for?', opts:['Open Web Application Security Project','Online Web Attack Standard Protocol','Official Web Access Security Policy','Open Worldwide Application Security Platform'], ans:3, exp:'OWASP = Open Worldwide Application Security Platform. They publish the famous OWASP Top 10 web vulnerabilities list.' },
  ],
  crypto: [
    { q:'What is the difference between symmetric and asymmetric encryption?', opts:['Speed only','Symmetric uses one key, asymmetric uses two (public/private)','Asymmetric is older','Symmetric is less secure'], ans:1, exp:'Symmetric (AES): same key for encrypt/decrypt. Asymmetric (RSA): public key encrypts, private key decrypts.' },
    { q:'What does AES stand for?', opts:['Advanced Encryption Standard','Automated Encoding System','Applied Encryption Service','Advanced Entry Security'], ans:0, exp:'AES = Advanced Encryption Standard. The most widely used symmetric encryption algorithm, with 128/192/256-bit keys.' },
    { q:'What is a "hash function" used for?', opts:['Encrypting data for transmission','Creating a fixed-size fingerprint of data','Generating encryption keys','Compressing files'], ans:1, exp:'Hash functions (SHA-256, MD5) create a fixed-length fingerprint of data. Used for password storage, file integrity.' },
    { q:'What is a "digital certificate" used for?', opts:['Storing passwords','Verifying the identity of websites/entities','Encrypting emails only','Blocking malware'], ans:1, exp:'Digital certificates (X.509) verify identity — SSL/TLS certificates prove you are talking to the real website.' },
    { q:'What is "salting" in password security?', opts:['Encrypting passwords with AES','Adding random data to passwords before hashing','Compressing password databases','A type of network attack'], ans:1, exp:'Salting adds random data to passwords before hashing, preventing rainbow table attacks and duplicate hash detection.' },
  ],
  malware: [
    { q:'What is ransomware?', opts:['A network scanner','Malware that encrypts files and demands payment','A type of phishing email','A vulnerability scanner'], ans:1, exp:'Ransomware encrypts victims\' files and demands payment (usually crypto) for the decryption key.' },
    { q:'What is a "trojan" in cybersecurity?', opts:['A network firewall','Malware disguised as legitimate software','A type of encryption','A denial of service attack'], ans:1, exp:'Trojan horses are malware disguised as legitimate programs. Once installed, they create backdoors or steal data.' },
    { q:'What does C2 (Command & Control) mean in malware context?', opts:['A security certification','Server used by attackers to control infected machines','A type of encryption','A firewall rule'], ans:1, exp:'C2/C&C servers are attacker-controlled servers that send commands to malware on compromised systems.' },
    { q:'What is a "zero-day" vulnerability?', opts:['A very old security bug','A vulnerability unknown to the vendor with no patch available','A bug fixed in zero days','A type of DDoS attack'], ans:1, exp:'Zero-day = unknown vulnerability with no patch. "Zero days" for vendor to fix before attackers exploit it.' },
    { q:'What is the purpose of YARA rules?', opts:['Network traffic analysis','Identifying and classifying malware based on patterns','Encrypting malware samples','Blocking network attacks'], ans:1, exp:'YARA rules describe patterns to identify malware families — used by security tools to detect malicious files.' },
    { q:'What is a botnet?', opts:['A network security tool','A network of compromised computers controlled by an attacker','A type of firewall','A VPN service'], ans:1, exp:'Botnets are networks of malware-infected computers (bots) controlled remotely by attackers for spam, DDoS, etc.' },
  ],
  cloud: [
    { q:'What does IAM stand for in cloud security?', opts:['Internet Access Management','Identity and Access Management','Internal Application Monitor','Infrastructure Asset Management'], ans:1, exp:'IAM = Identity and Access Management. Controls who can access what resources in cloud environments.' },
    { q:'What is a "misconfigured S3 bucket" vulnerability?', opts:['An encrypted storage issue','Publicly accessible cloud storage containing sensitive data','A type of cloud malware','A network routing error'], ans:1, exp:'Misconfigured S3 buckets (AWS) left publicly accessible have leaked millions of records — a very common cloud vulnerability.' },
    { q:'What is the "shared responsibility model" in cloud?', opts:['Sharing cloud costs between teams','Division of security duties between cloud provider and customer','A backup strategy','A type of cloud architecture'], ans:1, exp:'Cloud providers secure the infrastructure; customers secure their data, apps, and configurations. Both share responsibility.' },
    { q:'What is a "security group" in AWS?', opts:['A team of security engineers','A virtual firewall controlling inbound/outbound traffic','A type of encryption','An IAM policy'], ans:1, exp:'Security groups in AWS act as virtual firewalls — they control inbound and outbound traffic at the instance level.' },
  ],
  soc: [
    { q:'What does SIEM stand for?', opts:['Security Intelligence & Event Management','Security Information and Event Management','System Intrusion and Event Monitor','Security Integration Engine Module'], ans:1, exp:'SIEM = Security Information and Event Management. Collects and correlates security logs from across the organization.' },
    { q:'What is the PICERL incident response process?', opts:['Plan, Investigate, Contain, Eradicate, Recover, Learn','Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned','Prevent, Identify, Control, Eliminate, Restore, Log','Protect, Investigate, Capture, Eliminate, Report, Learn'], ans:1, exp:'PICERL = Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned. Standard IR lifecycle.' },
    { q:'What is threat intelligence?', opts:['A type of malware scanner','Evidence-based knowledge about existing or emerging threats','A SIEM tool','A network monitoring system'], ans:1, exp:'Threat intelligence is evidence-based information about threats — helps SOC teams proactively defend against attacks.' },
    { q:'What is a "false positive" in security monitoring?', opts:['A confirmed attack','An alert triggered when no real threat exists','A missed attack','A critical vulnerability'], ans:1, exp:'False positives are alerts generated when no actual threat exists — tuning SIEM rules to reduce them is key SOC work.' },
    { q:'What does IOC stand for in threat hunting?', opts:['Internet Operations Center','Indicator of Compromise','Internal Operations Control','Intrusion Operations Console'], ans:1, exp:'IOC = Indicator of Compromise. Evidence that a system may have been breached — e.g., malicious IP, file hash, domain.' },
  ],
  concepts: [
    { q:'What is the CIA Triad in cybersecurity?', opts:['Confidentiality, Integrity, Availability','Central Intelligence Agency tools','Cyber Incident Analysis','Control, Identify, Assess'], ans:0, exp:'CIA Triad = Confidentiality (data private), Integrity (data accurate), Availability (systems accessible). Foundation of security.' },
    { q:'What is "principle of least privilege"?', opts:['Users get maximum access for efficiency','Users get only the minimum access needed to do their job','Admins share all passwords','All users have equal access'], ans:1, exp:'Least privilege = give users only the permissions they need. Reduces attack surface if an account is compromised.' },
    { q:'What is social engineering?', opts:['Building secure software','Manipulating people psychologically to gain unauthorized access','Network monitoring','Password cracking'], ans:1, exp:'Social engineering exploits human psychology rather than technical vulnerabilities — phishing is the most common example.' },
    { q:'What is a VPN primarily used for?', opts:['Speed up internet','Create encrypted tunnel and hide IP address','Block advertisements','Scan for malware'], ans:1, exp:'VPN (Virtual Private Network) encrypts traffic and masks your IP — useful for privacy and bypassing restrictions.' },
    { q:'What is multi-factor authentication (MFA)?', opts:['Using multiple passwords','Requiring 2+ verification factors to login','A type of encryption','An antivirus method'], ans:1, exp:'MFA requires 2+ factors: something you know (password) + something you have (phone) + something you are (fingerprint).' },
    { q:'What is penetration testing?', opts:['Testing network speed','Authorized simulation of attacks to find vulnerabilities','Monitoring system logs','Encrypting sensitive data'], ans:1, exp:'Penetration testing = authorized, simulated cyber attack to identify security weaknesses before real attackers do.' },
  ],
};

/* ── QUIZ STATE ── */
let quizState = {
  topic: null,
  questions: [],
  currentIdx: 0,
  score: 0,
  answers: [],
  completed: false,
};

/* ── RENDER QUIZ PAGE ── */
window.renderQuiz = function() {
  const el = document.getElementById('quizBody');
  if (!el) return;

  el.innerHTML = `
    <!-- Topic Selection -->
    <div class="quiz-topic-section" id="quizTopicSection">
      <div class="quiz-section-title">📚 SELECT A TOPIC TO PRACTICE</div>
      <div class="quiz-topics-grid">
        ${QUIZ_TOPICS.map(t => {
          const scores = getQuizScores();
          const topicScore = scores[t.id];
          const badge = topicScore !== undefined
            ? `<span class="quiz-topic-score" style="color:${topicScore>=80?'#10b981':topicScore>=50?'#f59e0b':'#ef4444'}">${topicScore}%</span>`
            : '<span class="quiz-topic-new">NEW</span>';
          return `
            <div class="quiz-topic-card" onclick="startQuiz('${t.id}')" style="--topic-color:${t.color}">
              <div class="quiz-topic-icon">${t.label.split(' ')[0]}</div>
              <div class="quiz-topic-name">${t.label.split(' ').slice(1).join(' ')}</div>
              <div class="quiz-topic-count">${QUIZ_BANK[t.id]?.length || 0} questions</div>
              ${badge}
            </div>`;
        }).join('')}
      </div>

      <!-- AI Quiz Generator -->
      <div class="quiz-ai-gen-card">
        <div class="quiz-ai-gen-title">⚡ <span data-i18n="quiz.gen_title">AI QUIZ GENERATOR</span></div>
        <div class="quiz-ai-gen-sub" data-i18n="quiz.gen_sub">Paste any cybersecurity article / notes / URL — AI generates MCQs</div>
        <textarea id="aiQuizInput" class="quiz-ai-gen-input"
          data-i18n-placeholder="quiz.gen_placeholder"
          placeholder="Paste your text here (min 200 chars) or enter a URL..."
          rows="4"></textarea>
        <div class="quiz-ai-gen-controls">
          <div class="quiz-ai-gen-meta">
            <label class="quiz-ai-gen-toggle">
              <input type="checkbox" id="aiQuizAdaptive" checked>
              <span data-i18n="quiz.adaptive">Adaptive difficulty (next Q harder if you ace it)</span>
            </label>
            <div class="quiz-ai-gen-diff">
              <span>Start:</span>
              <button class="quiz-diff-btn active" data-diff="easy">Easy</button>
              <button class="quiz-diff-btn" data-diff="medium">Medium</button>
              <button class="quiz-diff-btn" data-diff="hard">Hard</button>
            </div>
          </div>
          <button class="quiz-ai-gen-btn" id="aiQuizBtn" onclick="startAIQuiz()">
            <span data-i18n="quiz.gen_btn">⚡ Generate Quiz</span>
          </button>
        </div>
        <div id="aiQuizStatus" class="quiz-ai-gen-status" style="display:none"></div>
      </div>

      <!-- Weak Areas -->
      <div id="weakAreasSection"></div>

      <!-- Overall Progress -->
      <div class="quiz-overall-progress" id="quizOverallProgress"></div>
    </div>

    <!-- Quiz Area -->
    <div class="quiz-area" id="quizArea" style="display:none"></div>

    <!-- Results Area -->
    <div class="quiz-results" id="quizResults" style="display:none"></div>
  `;

  // Wire difficulty buttons
  document.querySelectorAll('.quiz-diff-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.quiz-diff-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });

  renderWeakAreas();
  renderQuizProgress();
};

/* ── AI QUIZ GENERATOR ── */
window.startAIQuiz = async function() {
  const input    = document.getElementById('aiQuizInput')?.value?.trim();
  const btn      = document.getElementById('aiQuizBtn');
  const status   = document.getElementById('aiQuizStatus');
  const adaptive = document.getElementById('aiQuizAdaptive')?.checked;
  const diff     = document.querySelector('.quiz-diff-btn.active')?.dataset.diff || 'medium';

  if (!input) {
    showToast(I18N?.t('err.no_text', 'Please paste some text or enter a URL first'));
    return;
  }
  if (input.length < 50 && !/^https?:\/\//i.test(input)) {
    showToast(I18N?.t('err.short_text', 'Text too short — minimum 200 characters'));
    return;
  }

  if (btn) btn.disabled = true;
  if (status) {
    status.style.display = 'block';
    status.innerHTML = '⚡ ' + (I18N?.current === 'hi' ? 'एआई आपके लिए प्रश्न बना रहा है...' : 'AI is generating questions...');
  }

  try {
    await AI_QUIZ.generate({ input, numQuestions: 8, startDifficulty: diff, adaptive });

    // Hide topic selection, show quiz area
    document.getElementById('quizTopicSection').style.display = 'none';
    document.getElementById('quizResults').style.display      = 'none';
    document.getElementById('quizArea').style.display         = 'block';

    // Copy AI state into local quizState for render compatibility
    quizState = {
      topic:       AI_QUIZ.state.topic,
      questions:   AI_QUIZ.state.questions,
      currentIdx:  0,
      score:       0,
      answers:     [],
      completed:   false,
      isAI:        true,
      isFallback:  !!AI_QUIZ.state.isFallback,
      difficulty:  diff
    };

    if (status) status.style.display = 'none';
    renderQuizQuestion();
  } catch(e) {
    if (status) {
      status.style.display = 'block';
      status.innerHTML = (window.getAIErrorMessage && e.message !== 'SHORT_TEXT')
        ? getAIErrorMessage(e.message)
        : '❌ ' + (e.message || 'Generation failed');
    }
    showToast('❌ Quiz generation failed');
  }
  if (btn) btn.disabled = false;
};

/* ── START QUIZ ── */
window.startQuiz = function(topicId) {
  const questions = QUIZ_BANK[topicId] || [];
  const shuffled  = [...questions].sort(() => Math.random() - 0.5).slice(0, Math.min(8, questions.length));

  quizState = { topic: topicId, questions: shuffled, currentIdx: 0, score: 0, answers: [], completed: false };

  document.getElementById('quizTopicSection').style.display = 'none';
  document.getElementById('quizResults').style.display      = 'none';
  document.getElementById('quizArea').style.display         = 'block';

  renderQuizQuestion();
};

function renderQuizQuestion() {
  const area = document.getElementById('quizArea');
  const { questions, currentIdx, score } = quizState;
  const q = questions[currentIdx];
  if (!q || !area) return;

  const isAI      = !!quizState.isAI;
  const topic     = isAI ? null : QUIZ_TOPICS.find(t => t.id === quizState.topic);
  const progress  = Math.round((currentIdx / questions.length) * 100);
  const streak    = AI_QUIZ?.state?.streak || 0;
  const diffColor = q.difficulty === 'easy' ? '#10b981' : q.difficulty === 'hard' ? '#ef4444' : '#f59e0b';
  const diffLabel = (q.difficulty || 'medium').toUpperCase();

  area.innerHTML = `
    <div class="quiz-q-card">
      <!-- Header -->
      <div class="quiz-q-header">
        <span class="quiz-q-topic" style="color:${topic?.color || '#00d4ff'}">
          ${isAI ? `🤖 ${quizState.topic}` : topic?.label}
          ${isAI ? `<span class="quiz-q-diff" style="background:${diffColor}20;color:${diffColor};border:1px solid ${diffColor}50">${diffLabel}</span>` : ''}
          ${streak >= 2 ? `<span class="quiz-q-streak">🔥 ${streak} streak</span>` : ''}
        </span>
        <span class="quiz-q-counter">${currentIdx + 1} / ${questions.length}</span>
      </div>

      ${quizState.isFallback ? `
        <div class="quiz-fallback-banner" style="margin:8px 0;padding:8px 12px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);border-radius:6px;font-size:0.75rem;color:#f59e0b">
          ⚠️ Offline Reference Sample (Gemini API key not configured). Add free key in Settings for live generative MCQs.
        </div>` : ''}

      <!-- Progress bar -->
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${progress}%;background:${topic?.color || '#00d4ff'}"></div>
      </div>

      <!-- Score -->
      <div class="quiz-current-score">Score: ${score} / ${currentIdx} correct</div>

      <!-- Question -->
      <div class="quiz-question">${q.q}</div>

      <!-- Options -->
      <div class="quiz-options" id="quizOptions">
        ${q.opts.map((opt, i) => `
          <button class="quiz-opt-btn" id="qopt-${i}" onclick="answerQuestion(${i})">
            <span class="quiz-opt-letter">${String.fromCharCode(65+i)}</span>
            <span>${opt}</span>
          </button>`).join('')}
      </div>

      <!-- Explanation (hidden) -->
      <div class="quiz-explanation" id="quizExp" style="display:none"></div>

      <!-- Next btn (hidden) -->
      <div class="quiz-next-wrap" id="quizNextWrap" style="display:none">
        <button class="quiz-next-btn" onclick="nextQuestion()">
          ${currentIdx + 1 < questions.length ? (I18N?.t('quiz.next_q', 'Next Question →')) : (I18N?.t('quiz.results', 'See Results 🏆'))}
        </button>
      </div>
    </div>`;
}

/* ── ANSWER QUESTION ── */
window.answerQuestion = function(selectedIdx) {
  const q = quizState.questions[quizState.currentIdx];
  if (!q) return;

  const isCorrect = selectedIdx === q.ans;
  quizState.answers.push({ q: q.q, selected: selectedIdx, correct: q.ans, isCorrect, difficulty: q.difficulty });
  if (isCorrect) quizState.score++;

  // Sync AI state if AI quiz
  if (quizState.isAI && window.AI_QUIZ) {
    AI_QUIZ.answer(selectedIdx);
  }

  // Disable all options
  document.querySelectorAll('.quiz-opt-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans)        btn.classList.add('quiz-opt-correct');
    if (i === selectedIdx && !isCorrect) btn.classList.add('quiz-opt-wrong');
  });

  // Show explanation
  const expEl = document.getElementById('quizExp');
  if (expEl) {
    expEl.style.display = 'block';
    expEl.innerHTML = `
      <div class="quiz-exp-result ${isCorrect ? 'correct' : 'wrong'}">
        ${isCorrect ? '✅ ' + (I18N?.t('quiz.correct', 'Correct!')) : `❌ ${I18N?.t('quiz.wrong', 'Wrong!')} ${I18N?.t('quiz.explanation', 'Correct')}: <strong>${q.opts[q.ans]}</strong>`}
      </div>
      <div class="quiz-exp-text">${q.exp}</div>`;
  }

  // Show next
  const nextWrap = document.getElementById('quizNextWrap');
  if (nextWrap) nextWrap.style.display = 'block';

  // Award XP for correct answers
  if (isCorrect && typeof awardXP === 'function') {
    awardXP('quiz_correct_answer');
  }
};

/* ── NEXT QUESTION ── */
window.nextQuestion = function() {
  quizState.currentIdx++;
  if (quizState.currentIdx >= quizState.questions.length) {
    showQuizResults();
  } else {
    renderQuizQuestion();
  }
};

/* ── SHOW RESULTS ── */
function showQuizResults() {
  document.getElementById('quizArea').style.display    = 'none';
  document.getElementById('quizResults').style.display = 'block';

  const { score, questions, topic, answers } = quizState;
  const total   = questions.length;
  const pct     = Math.round((score / total) * 100);
  const topicObj= QUIZ_TOPICS.find(t => t.id === topic);

  // Save score
  saveQuizScore(topic, pct);

  // Award XP for completing a quiz + perfect-score bonus
  if (typeof awardXP === 'function') {
    awardXP('quiz_complete', { topic });
    if (pct === 100) awardXP('quiz_perfect');
  }

  // Identify weak questions
  const weakItems = answers.filter(a => !a.isCorrect);

  const el = document.getElementById('quizResults');
  el.innerHTML = `
    <div class="quiz-results-card">
      <div class="quiz-results-header">
        <div class="quiz-results-score-circle" style="--score-color:${pct>=80?'#10b981':pct>=50?'#f59e0b':'#ef4444'}">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
            <circle cx="60" cy="60" r="50" fill="none"
              stroke="${pct>=80?'#10b981':pct>=50?'#f59e0b':'#ef4444'}"
              stroke-width="10"
              stroke-dasharray="${pct*3.14} 314"
              stroke-dashoffset="78.5"
              stroke-linecap="round"/>
            <text x="60" y="55" text-anchor="middle" fill="${pct>=80?'#10b981':pct>=50?'#f59e0b':'#ef4444'}" font-family="Orbitron,monospace" font-size="22" font-weight="700">${pct}%</text>
            <text x="60" y="72" text-anchor="middle" fill="#64748b" font-family="Share Tech Mono,monospace" font-size="10">${score}/${total}</text>
          </svg>
        </div>
        <div class="quiz-results-info">
          <div class="quiz-results-topic">${topicObj?.label}</div>
          <div class="quiz-results-verdict" style="color:${pct>=80?'#10b981':pct>=50?'#f59e0b':'#ef4444'}">
            ${pct>=80?'🏆 Excellent!':pct>=60?'👍 Good job!':pct>=40?'📚 Keep practicing!':'🔄 Review needed'}
          </div>
          <div class="quiz-results-xp">+${score * 20} XP earned!</div>
        </div>
      </div>

      ${weakItems.length > 0 ? `
        <div class="quiz-weak-section">
          <div class="quiz-weak-title">📌 REVIEW THESE CONCEPTS</div>
          ${weakItems.map(w => `
            <div class="quiz-weak-item">
              <div class="quiz-weak-q">❌ ${w.q}</div>
              <div class="quiz-weak-a">✓ ${quizState.questions.find(q=>q.q===w.q)?.opts[w.correct] || ''}</div>
            </div>`).join('')}
        </div>` : '<div class="quiz-perfect">🎯 Perfect score! No weak areas.</div>'}

      ${pct < 70 ? `
        <div class="quiz-recommendation">
          <div class="quiz-rec-title">📚 RECOMMENDED NEXT STEP</div>
          <div class="quiz-rec-text">
            Your ${topicObj?.label} score is ${pct}%. Consider reviewing fundamentals before moving forward.
          </div>
          <button class="quiz-rec-btn" onclick="navigate('resources')">
            📖 Browse Recommended Resources →
          </button>
        </div>` : ''}

      <div class="quiz-results-actions">
        <button class="quiz-retry-btn" onclick="startQuiz('${topic}')">🔄 Retry Topic</button>
        <button class="quiz-other-btn" onclick="showTopicSelection()">📚 Other Topics</button>
        <button class="quiz-advisor-btn" onclick="navigate('advisor');setTimeout(()=>askAdvisor('My ${topicObj?.label} quiz score is ${pct}%. What should I focus on to improve?'),500)">🤖 Ask AI Advisor</button>
      </div>
    </div>`;
}

/* ── TOPIC SELECTION BACK ── */
window.showTopicSelection = function() {
  document.getElementById('quizTopicSection').style.display = 'block';
  document.getElementById('quizArea').style.display         = 'none';
  document.getElementById('quizResults').style.display      = 'none';
  renderWeakAreas();
  renderQuizProgress();
};

/* ── SCORES STORAGE ── */
function getQuizScores() {
  const uid = window.CV_USER?.uid || 'guest';
  return JSON.parse(localStorage.getItem('cp_quiz_scores_' + uid) || '{}');
}

function saveQuizScore(topic, pct) {
  const uid    = window.CV_USER?.uid || 'guest';
  const scores = getQuizScores();
  scores[topic] = pct;
  localStorage.setItem('cp_quiz_scores_' + uid, JSON.stringify(scores));
}

/* ── WEAK AREAS ── */
function renderWeakAreas() {
  const el     = document.getElementById('weakAreasSection');
  if (!el) return;
  const scores = getQuizScores();
  const weak   = Object.entries(scores).filter(([,v]) => v < 60);
  if (!weak.length) { el.innerHTML = ''; return; }

  el.innerHTML = `
    <div class="quiz-weak-alert">
      <div class="quiz-weak-alert-title">⚠️ WEAK AREAS — NEEDS ATTENTION</div>
      <div class="quiz-weak-alert-list">
        ${weak.map(([id, score]) => {
          const t = QUIZ_TOPICS.find(t => t.id === id);
          return `<div class="quiz-weak-alert-item" onclick="startQuiz('${id}')">
            <span>${t?.label}</span>
            <span style="color:${score<40?'#ef4444':'#f59e0b'}">${score}% — Practice Again →</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

/* ── OVERALL PROGRESS ── */
function renderQuizProgress() {
  const el     = document.getElementById('quizOverallProgress');
  if (!el) return;
  const scores = getQuizScores();
  const done   = Object.keys(scores).length;
  if (!done) { el.innerHTML = ''; return; }

  const avg = Math.round(Object.values(scores).reduce((a,b)=>a+b,0) / done);

  el.innerHTML = `
    <div class="quiz-overall-card">
      <div class="quiz-overall-title">📊 YOUR QUIZ PROGRESS</div>
      <div class="quiz-overall-stats">
        <div class="quiz-os"><div class="quiz-os-val">${done}/${QUIZ_TOPICS.length}</div><div class="quiz-os-lbl">Topics Attempted</div></div>
        <div class="quiz-os"><div class="quiz-os-val" style="color:${avg>=70?'#10b981':avg>=50?'#f59e0b':'#ef4444'}">${avg}%</div><div class="quiz-os-lbl">Average Score</div></div>
        <div class="quiz-os"><div class="quiz-os-val">${Object.values(scores).filter(s=>s>=80).length}</div><div class="quiz-os-lbl">Topics Mastered</div></div>
      </div>
      <div class="quiz-topic-bars">
        ${QUIZ_TOPICS.map(t => {
          const s = scores[t.id];
          if (s === undefined) return '';
          return `<div class="quiz-topic-bar-row">
            <span class="quiz-tb-label">${t.label}</span>
            <div class="quiz-tb-wrap">
              <div class="quiz-tb-fill" style="width:${s}%;background:${s>=80?'#10b981':s>=50?'#f59e0b':'#ef4444'}"></div>
            </div>
            <span class="quiz-tb-pct">${s}%</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

/* ── EXPOSE SCORES FOR DASHBOARD ── */
window.getQuizScores = getQuizScores;
window.QUIZ_BANK = QUIZ_BANK;

