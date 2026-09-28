/* ══════════════════════════════════════════════
   CYBERPATH — AI-ADVISOR.JS v2.0
   Gemini API (FREE) — Career & Learning Advisor
══════════════════════════════════════════════ */

const ADVISOR_HISTORY = [];

const QUICK_GOALS = [
  { icon:'🔍', label:'SOC Analyst',        prompt:'I want to become a SOC Analyst. Give me a complete roadmap.' },
  { icon:'⚡', label:'Ethical Hacker',      prompt:'I want to become an Ethical Hacker. Where do I start?' },
  { icon:'💰', label:'Bug Bounty Hunter',   prompt:'I want to start Bug Bounty Hunting. Give me a beginner roadmap.' },
  { icon:'🦠', label:'Malware Analyst',     prompt:'I want to become a Malware Analyst / DFIR specialist.' },
  { icon:'☁️', label:'Cloud Security',      prompt:'I want to get into Cloud Security. What should I learn?' },
  { icon:'⚙️', label:'Security Engineer',   prompt:'I want to become a Security Engineer. Give me a roadmap.' },
  { icon:'📋', label:'GRC Analyst',         prompt:'I want to become a GRC Analyst. Where do I start?' },
  { icon:'🌐', label:'Web / AppSec',        prompt:'I want to get into Web Application Security.' },
  { icon:'🔬', label:'Security Researcher', prompt:'I want to become a Security Researcher.' },
  { icon:'🌱', label:'Complete Beginner',   prompt:'I am a complete beginner. Where do I start in cybersecurity?' },
];

const QUICK_QUESTIONS = [
  'Which certification should I get first?',
  'How long to get a cybersecurity job?',
  'Best free resources to learn cybersecurity?',
  'Red team vs Blue team — which for me?',
  'What programming language for security?',
  'How to build a cybersecurity portfolio?',
];

/* ── DYNAMIC SYSTEM PROMPT ── */
function buildAdvisorSystemPrompt() {
  const user    = window.CV_USER || {};
  const gs      = (typeof getGS === 'function')   ? getGS()   : { xp:0, streak:0, badges:[] };
  const lvl     = (typeof getLevel === 'function') ? getLevel(gs.xp) : { title:'Beginner' };
  const scores  = window.getQuizScores ? getQuizScores() : {};
  const stats   = window.FS ? FS.getStats(user.uid||'guest') : {};
  const uid     = user.uid || 'guest';
  const plan    = (() => { try { const d=localStorage.getItem('cp_learning_plan_'+uid); return d?JSON.parse(d):null; } catch{return null;} })();

  const TOPIC_LABELS = { networking:'Networking',linux:'Linux & OS',web:'Web Security',crypto:'Cryptography',malware:'Malware',cloud:'Cloud Security',soc:'SOC & Blue Team',concepts:'Security Concepts' };
  const quizLines  = Object.entries(scores).map(([k,v])=>`  - ${TOPIC_LABELS[k]||k}: ${v}% ${v<50?'⚠️ WEAK':v>=80?'✅ STRONG':'📈 IMPROVING'}`).join('\n') || '  - No quizzes taken yet';
  const weakAreas  = Object.entries(scores).filter(([,v])=>v<60).map(([k])=>TOPIC_LABELS[k]||k);
  const strongAreas= Object.entries(scores).filter(([,v])=>v>=80).map(([k])=>TOPIC_LABELS[k]||k);
  const GOAL_LABELS= { soc:'SOC Analyst',pentester:'Penetration Tester',bugbounty:'Bug Bounty Hunter',dfir:'DFIR/Malware Analyst',cloud:'Cloud Security Engineer',seceng:'Security Engineer',grc:'GRC Analyst',appsec:'AppSec Engineer',researcher:'Security Researcher' };
  const careerGoal = GOAL_LABELS[user.role] || user.role || 'Not set';

  return `You are CyberPath AI Advisor — a world-class cybersecurity career mentor built into the CyberPath learning platform.

USER PROFILE (personalize EVERY response using this):
- Name: ${user.displayName || 'Learner'}
- Career Goal: ${careerGoal}
- Platform Level: ${lvl.title} (${gs.xp} XP)
- Day Streak: ${gs.streak||0} days
- Courses Viewed: ${stats.course_view||0}
- Projects Built: ${stats.project_gen||0}

QUIZ PERFORMANCE:
${quizLines}
${weakAreas.length>0 ? `WEAK AREAS (prioritize): ${weakAreas.join(', ')}` : ''}
${strongAreas.length>0 ? `STRONG AREAS: ${strongAreas.join(', ')}` : ''}

ACTIVE LEARNING PLAN: ${plan ? `Goal: ${plan.goal}, Duration: ${plan.total_duration}` : 'Not created yet'}

YOUR RULES:
1. Always use the user's name (${user.displayName?.split(' ')[0]||'friend'})
2. Reference their weak areas naturally in advice
3. Prioritize FREE resources always
4. Be honest about difficulty and timelines
5. End EVERY response with: 🎯 NEXT ACTION: [one specific thing to do TODAY]
6. Keep responses under 400 words (600 for roadmaps)

FREE RESOURCES YOU KNOW:
- TryHackMe, Hack The Box, PortSwigger Web Academy (all free)
- Google Cybersecurity Certificate (Coursera — free to audit)
- ISC2 CC certification (completely free)
- OverTheWire, PicoCTF, CyberDefenders, LetsDefend
- Cisco NetAcad, freeCodeCamp, OpenSecurityTraining2

RESPONSE FORMAT:
- Use ## for sections, bullet points for lists
- **Bold** important terms and tool names
- Emojis for visual hierarchy
- Always end with 🎯 NEXT ACTION highlighted`;
}

/* ══════════════════════════════════════════════
   RENDER AI ADVISOR PAGE
══════════════════════════════════════════════ */
window.renderAIAdvisor = function() {
  const el = document.getElementById('aiAdvisorBody');
  if (!el) return;

  el.innerHTML = `
    <div class="advisor-layout">
      <!-- Sidebar -->
      <div class="advisor-sidebar">
        <div class="advisor-sidebar-section">
          <div class="advisor-sidebar-title">🎯 CAREER GOALS</div>
          <div class="advisor-goals-list">
            ${QUICK_GOALS.map(g=>`
              <button class="advisor-goal-btn" onclick="askAdvisor('${g.prompt.replace(/'/g,"\\'")}')">
                <span>${g.icon}</span><span>${g.label}</span>
              </button>`).join('')}
          </div>
        </div>
        <div class="advisor-sidebar-section">
          <div class="advisor-sidebar-title">💡 QUICK QUESTIONS</div>
          ${QUICK_QUESTIONS.map(q=>`
            <button class="advisor-quick-btn" onclick="askAdvisor('${q.replace(/'/g,"\\'")}')">
              ${q}
            </button>`).join('')}
        </div>
        <div class="advisor-sidebar-section">
          <div class="advisor-sidebar-title">⚡ ACTIONS</div>
          <button class="advisor-action-btn" onclick="askAdvisor('Give me a complete 6-month cybersecurity learning plan for a beginner')">📅 6-Month Plan</button>
          <button class="advisor-action-btn" onclick="askAdvisor('What are the highest paying cybersecurity jobs and how to get them?')">💰 Top Paying Jobs</button>
          <button class="advisor-action-btn" onclick="askAdvisor('How to prepare for a cybersecurity job interview? Give me the top 10 questions.')">🎤 Interview Prep</button>
          <button class="advisor-action-btn" onclick="clearAdvisorChat()">🗑️ Clear Chat</button>
        </div>
        <div class="advisor-api-status" id="advisorApiStatus">
          ${(typeof window.isGeminiConfigured === 'function' ? window.isGeminiConfigured() : (window.AI_CONFIG?.GEMINI_API_KEY && window.AI_CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE'))
            ? `<div class="advisor-key-ok">✅ Gemini AI Ready · Connected</div>`
            : `<div class="advisor-no-key">⚠️ No API key set<br><a href="https://aistudio.google.com/app/apikey" target="_blank">Get FREE Gemini key →</a><br><small>Add to js/ai-config.js</small></div>`}
        </div>
      </div>

      <!-- Main Chat -->
      <div class="advisor-main">
        <div class="advisor-chat" id="advisorChat">
          <div class="advisor-msg advisor-bot-msg">
            <div class="advisor-bot-avatar">CP</div>
            <div class="advisor-bubble">
              <div class="advisor-bubble-name">CyberPath AI Advisor · Powered by Gemini</div>
              👋 <strong>Namaste ${window.CV_USER?.displayName?.split(' ')[0]||''}!</strong> Main hoon tera personal cybersecurity career guide.<br><br>
              Mujhe bata apna goal — main dunga:<br>
              • 🗺️ Complete personalized roadmap<br>
              • 📚 Best free resources<br>
              • 🛠️ Tools to learn<br>
              • 🏅 Certifications path<br>
              • 💡 Portfolio projects<br><br>
              <strong>Left side se career select karo ya seedha type karo! 🚀</strong>
            </div>
          </div>
        </div>
        <div class="advisor-input-area">
          <div class="advisor-input-wrap">
            <textarea class="advisor-input" id="advisorInput"
              placeholder="Ask anything about cybersecurity careers..."
              rows="2"
              onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendAdvisorMessage()}"></textarea>
            <button class="advisor-send-btn" id="advisorSendBtn" onclick="sendAdvisorMessage()">
              <span id="advisorSendIcon">▶</span>
            </button>
          </div>
          <div class="advisor-input-hint">Enter to send · Shift+Enter for new line · FREE — Powered by Google Gemini</div>
        </div>
      </div>
    </div>`;
};

/* ══════════════════════════════════════════════
   SEND MESSAGE
══════════════════════════════════════════════ */
window.askAdvisor = function(prompt) {
  const input = document.getElementById('advisorInput');
  if (input) input.value = prompt;
  sendAdvisorMessage();
};

window.sendAdvisorMessage = async function() {
  const input    = document.getElementById('advisorInput');
  const sendBtn  = document.getElementById('advisorSendBtn');
  const sendIcon = document.getElementById('advisorSendIcon');
  const msg      = input?.value?.trim();
  if (!msg) return;

  input.value = '';
  appendAdvisorMsg(msg, 'user');
  appendAdvisorTyping();

  if (sendBtn) sendBtn.disabled = true;
  if (sendIcon) sendIcon.textContent = '⟳';

  ADVISOR_HISTORY.push({ role:'user', content:msg });

  try {
    const freshPrompt = buildAdvisorSystemPrompt();
    const reply       = await callAIChat(freshPrompt, ADVISOR_HISTORY.slice(-12), 1000);

    removeAdvisorTyping();
    ADVISOR_HISTORY.push({ role:'assistant', content:reply });
    appendAdvisorMsg(reply, 'bot');
    appendFollowUpSuggestions(msg, reply);

  } catch(e) {
    removeAdvisorTyping();
    if (e.message === 'NO_API_KEY' || e.message === 'INVALID_KEY') {
      const user = window.CV_USER || {};
      const name = user.displayName?.split(' ')[0] || 'Friend';
      const role = user.role || 'SOC Analyst';
      const scores = window.getQuizScores ? getQuizScores() : {};
      const weak = Object.entries(scores).filter(([,v])=>v<60).map(([k])=>k);

      let guidance = `Namaste ${name}! Here is your personalized cybersecurity guidance:\n\n` +
        `### 🎯 Focus Area for ${role}\n` +
        `- Build mastery in core network analysis (TCP/IP, Wireshark) and Linux systems administration.\n` +
        (weak.length > 0 ? `- **Weak Area Priority**: Your recent quizzes identified gaps in **${weak.join(', ')}**. Dedicate 30 mins today to reviewing these fundamentals in Resource Finder.\n` : `- Keep your practice consistent by taking daily domain quizzes in the Practice Center.\n`) +
        `- **Free Hands-on Labs**: Start with TryHackMe (Pre-Security path) and PortSwigger Web Security Academy.\n` +
        `- **Certification Milestone**: Work towards the 100% free ISC2 Certified in Cybersecurity (CC) certification.\n\n` +
        `🎯 **NEXT ACTION**: Head to **Practice Center** or **Resource Finder** to complete one lab module today!\n\n` +
        `*(Note: Offline expert guidance shown — configure your free Gemini API key in Settings to unlock real-time custom AI conversations!)*`;

      appendAdvisorMsg(guidance, 'bot');
      appendFollowUpSuggestions(msg, guidance);
    } else if (e.message === 'RATE_LIMIT') {
      appendAdvisorMsg('⏳ **Rate limit reached.** Google Gemini free tier allows 15 requests/min. Please wait a moment and send again.', 'bot');
    } else if (e.message === 'OVERLOADED' || e.message === 'API_ERROR_503') {
      const user = window.CV_USER || {};
      const name = user.displayName?.split(' ')[0] || 'Friend';
      let guidance = `Namaste ${name}! Google's free Gemini servers are experiencing temporary high traffic (503 Overload), but here is immediate advice for **"${msg}"**:\n\n` +
        `### 💡 Key Recommendation\n` +
        `- For hands-on cybersecurity skill progression, prioritize practical labs in TryHackMe, PortSwigger Academy, or PicoCTF.\n` +
        `- Take a practice quiz in CyberPath's **Practice Center** to calibrate your DNA score.\n\n` +
        `*(Tip: You can re-send your message in a few seconds once Google's server load settles!)*`;
      appendAdvisorMsg(guidance, 'bot');
      appendFollowUpSuggestions(msg, guidance);
    } else {
      appendAdvisorMsg('⚠️ Temporary connection issue. Please retry in a few seconds.\n\n*(Error detail: ' + e.message + ')*', 'bot');
    }
  }

  if (sendBtn) sendBtn.disabled = false;
  if (sendIcon) sendIcon.textContent = '▶';
};

/* ── FOLLOW-UP SUGGESTIONS ── */
function appendFollowUpSuggestions(userMsg, aiReply) {
  const chat = document.getElementById('advisorChat');
  if (!chat) return;

  const lower = (userMsg + ' ' + aiReply).toLowerCase();
  const suggestions = [];

  if (lower.includes('soc')||lower.includes('blue team'))
    suggestions.push({ label:'🧪 Quiz me on SOC', action:`askAdvisor('Quiz me — ask 3 SOC analyst questions')` });
  if (lower.includes('roadmap')||lower.includes('plan')||lower.includes('learn'))
    suggestions.push({ label:'📅 Create learning plan', action:`navigate('learningPlan')` });
  if (lower.includes('project')||lower.includes('portfolio')||lower.includes('build'))
    suggestions.push({ label:'💡 Generate project idea', action:`navigate('projects')` });
  if (lower.includes('cert'))
    suggestions.push({ label:'🏅 Which cert first?', action:`askAdvisor('Which certification should I get first based on my level and goal?')` });
  if (lower.includes('resource')||lower.includes('course')||lower.includes('free'))
    suggestions.push({ label:'📚 Show free courses', action:`navigate('resources')` });
  if (lower.includes('interview')||lower.includes('job'))
    suggestions.push({ label:'🎤 Interview prep', action:`askAdvisor('Give me top 5 cybersecurity interview questions with answers')` });
  if (lower.includes('salary')||lower.includes('pay'))
    suggestions.push({ label:'💰 Salary factors', action:`askAdvisor('What skills and certs most impact cybersecurity salary?')` });

  if (suggestions.length < 2) {
    suggestions.push({ label:'🎯 What to learn next?', action:`navigate('dna')` });
    suggestions.push({ label:'💼 Explore careers', action:`navigate('careers')` });
  }

  const toShow = suggestions.slice(0, 3);
  const div    = document.createElement('div');
  div.className= 'advisor-suggestions';
  div.innerHTML= `
    <div class="advisor-sugg-label">Continue with:</div>
    <div class="advisor-sugg-btns">
      ${toShow.map(s=>`<button class="advisor-sugg-btn" onclick="${s.action}">${s.label}</button>`).join('')}
    </div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* ── CHAT HELPERS ── */
function appendAdvisorMsg(text, type) {
  const chat = document.getElementById('advisorChat');
  if (!chat) return;
  const div  = document.createElement('div');
  if (type === 'user') {
    div.className = 'advisor-msg advisor-user-msg';
    div.innerHTML = `<div class="advisor-user-bubble">${escHtml(text)}</div>`;
  } else {
    div.className = 'advisor-msg advisor-bot-msg';
    div.innerHTML = `<div class="advisor-bot-avatar">CP</div><div class="advisor-bubble"><div class="advisor-bubble-name">CyberPath AI Advisor</div>${formatAdvisorText(text)}</div>`;
  }
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function appendAdvisorTyping() {
  const chat = document.getElementById('advisorChat');
  if (!chat) return;
  const div  = document.createElement('div');
  div.className = 'advisor-msg advisor-bot-msg'; div.id = 'aiaTyping';
  div.innerHTML = `<div class="advisor-bot-avatar">CP</div><div class="advisor-bubble"><div class="advisor-typing"><span></span><span></span><span></span></div></div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
function removeAdvisorTyping() { document.getElementById('aiaTyping')?.remove(); }

window.clearAdvisorChat = function() {
  ADVISOR_HISTORY.length = 0;
  const chat = document.getElementById('advisorChat');
  if (chat) chat.innerHTML = `<div class="advisor-msg advisor-bot-msg"><div class="advisor-bot-avatar">CP</div><div class="advisor-bubble"><div class="advisor-bubble-name">CyberPath AI Advisor</div>Chat cleared! Ask me anything about cybersecurity careers 🚀</div></div>`;
};

function formatAdvisorText(text) {
  return escHtml(text)
    .replace(/^### (.*)/gm,'<div class="af-h3">$1</div>')
    .replace(/^## (.*)/gm,'<div class="af-h2">$1</div>')
    .replace(/^# (.*)/gm,'<div class="af-h1">$1</div>')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/`(.*?)`/g,'<code class="af-code">$1</code>')
    .replace(/(🎯 (?:YOUR )?NEXT ACTION:.*?)(\n|$)/g,'<div class="af-next-action">$1</div>')
    .replace(/(⚠️ .*?)(\n|$)/g,'<div class="af-warning">$1</div>')
    .replace(/(💡 .*?)(\n|$)/g,'<div class="af-tip">$1</div>')
    .replace(/^[-•→] (.*)/gm,'<div class="af-li"><span class="af-li-dot">→</span>$1</div>')
    .replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');
}
function escHtml(t) { return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
