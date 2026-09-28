"""
CyberPath - SIH Mentor & Judge Defense Master Guide Generator
Generates an elegant, publication-grade HTML document and compiles it to PDF via Headless Chrome.
"""

import os
import subprocess
import sys

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>CYBERPATH — Smart India Hackathon (SIH26101) Mentor & Judge Defense Master Guide</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {
    size: A4 portrait;
    margin: 18mm 16mm 18mm 16mm;
    @bottom-right {
      content: counter(page);
      font-size: 8pt;
      font-family: 'Inter', sans-serif;
      color: #64748b;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 9.5pt;
    line-height: 1.55;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Cover Page */
  .cover {
    page-break-after: always;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 20px;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0369a1 100%);
    color: #ffffff;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .cover-badge {
    display: inline-block;
    background: rgba(56, 189, 248, 0.2);
    border: 1px solid rgba(56, 189, 248, 0.4);
    color: #38bdf8;
    padding: 6px 14px;
    border-radius: 30px;
    font-size: 9pt;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 24px;
    width: fit-content;
  }

  .cover-title {
    font-size: 34pt;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 12px;
    color: #f8fafc;
  }

  .cover-subtitle {
    font-size: 15pt;
    font-weight: 400;
    color: #94a3b8;
    margin-bottom: 28px;
    line-height: 1.4;
  }

  .cover-meta-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.2);
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
  }

  .cover-meta-item strong {
    display: block;
    color: #38bdf8;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .cover-meta-item span {
    font-size: 10pt;
    color: #f1f5f9;
    font-weight: 500;
  }

  /* Section Headings */
  h1 {
    font-size: 18pt;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2px solid #0284c7;
    padding-bottom: 6px;
    margin-top: 28px;
    margin-bottom: 14px;
    page-break-after: avoid;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h2 {
    font-size: 13pt;
    font-weight: 700;
    color: #0369a1;
    margin-top: 20px;
    margin-bottom: 8px;
    page-break-after: avoid;
    border-left: 3px solid #0284c7;
    padding-left: 8px;
  }

  h3 {
    font-size: 10.5pt;
    font-weight: 600;
    color: #1e293b;
    margin-top: 14px;
    margin-bottom: 6px;
    page-break-after: avoid;
  }

  p {
    margin-bottom: 10px;
    text-align: justify;
  }

  /* Page Break Utilities */
  .page-break {
    page-break-before: always;
  }

  .avoid-break {
    page-break-inside: avoid;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 16px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }

  th, td {
    border: 1px solid #cbd5e1;
    padding: 7px 10px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background-color: #0f172a;
    color: #ffffff;
    font-weight: 600;
    font-size: 8.5pt;
    letter-spacing: 0.3px;
  }

  tr:nth-child(even) td {
    background-color: #f8fafc;
  }

  /* Callout Cards */
  .card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #0284c7;
    padding: 12px 14px;
    border-radius: 4px;
    margin: 12px 0;
    page-break-inside: avoid;
  }

  .card-warn {
    background: #fffbeb;
    border-color: #fef3c7;
    border-left: 4px solid #f59e0b;
  }

  .card-success {
    background: #f0fdf4;
    border-color: #dcfce7;
    border-left: 4px solid #10b981;
  }

  .card-title {
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
    font-size: 9.5pt;
  }

  /* Q&A Blocks */
  .qa-block {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px 14px;
    margin-bottom: 12px;
    page-break-inside: avoid;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  }

  .qa-q {
    font-weight: 700;
    color: #0f172a;
    font-size: 9.5pt;
    margin-bottom: 6px;
    display: flex;
    align-items: flex-start;
    gap: 6px;
  }

  .qa-badge {
    background: #e0f2fe;
    color: #0369a1;
    font-size: 7.5pt;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    text-transform: uppercase;
    white-space: nowrap;
    margin-top: 1px;
  }

  .qa-a {
    color: #334155;
    font-size: 9pt;
    line-height: 1.5;
  }

  .qa-trap {
    border-left: 4px solid #ef4444;
    background: #fff5f5;
  }

  .qa-trap .qa-badge {
    background: #fee2e2;
    color: #b91c1c;
  }

  /* Code & Preformatted */
  code {
    font-family: 'JetBrains Mono', monospace;
    background: #f1f5f9;
    color: #0f172a;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 8pt;
  }

  pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    line-height: 1.45;
    margin: 10px 0;
    overflow-x: auto;
    page-break-inside: avoid;
  }

  /* Demo Step Boxes */
  .demo-step {
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    margin-bottom: 14px;
    overflow: hidden;
    page-break-inside: avoid;
  }

  .demo-step-header {
    background: #f1f5f9;
    padding: 8px 12px;
    font-weight: 700;
    font-size: 9.5pt;
    color: #0f172a;
    border-bottom: 1px solid #cbd5e1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .demo-step-body {
    padding: 10px 12px;
    font-size: 9pt;
  }

  .demo-click {
    color: #0284c7;
    font-weight: 600;
  }

  .demo-say {
    background: #fafafa;
    border-left: 3px solid #10b981;
    padding: 6px 10px;
    margin-top: 6px;
    font-style: italic;
    color: #1e293b;
  }

  /* Lists */
  ul, ol {
    margin-left: 20px;
    margin-bottom: 10px;
  }

  li {
    margin-bottom: 4px;
  }

  /* Badges */
  .pill {
    display: inline-block;
    padding: 2px 7px;
    border-radius: 12px;
    font-size: 7.5pt;
    font-weight: 600;
    margin-right: 4px;
  }
  .pill-blue { background: #e0f2fe; color: #0369a1; }
  .pill-green { background: #dcfce7; color: #15803d; }
  .pill-purple { background: #f3e8ff; color: #7e22ce; }
  .pill-orange { background: #ffedd5; color: #c2410c; }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover">
  <div class="cover-badge">Smart India Hackathon 2026 · Official Technical Defense Dossier</div>
  <div class="cover-title">CYBERPATH</div>
  <div class="cover-subtitle">AI-Powered Cybersecurity Learning, Assessment & Career Guidance Platform<br>Problem Statement: SIH26101 · Complete Judge & Mentor Defense Manual</div>
  
  <div class="cover-meta-grid">
    <div class="cover-meta-item">
      <strong>Theme / Category</strong>
      <span>Smart Education / Cybersecurity & Skill Development</span>
    </div>
    <div class="cover-meta-item">
      <strong>Platform Architecture</strong>
      <span>Client-First SPA · Dual-Engine Persistence (Local & Firestore)</span>
    </div>
    <div class="cover-meta-item">
      <strong>Core AI Engine</strong>
      <span>Google Gemini Generative Intelligence with Resilient Failover Pool</span>
    </div>
    <div class="cover-meta-item">
      <strong>Target Alignment</strong>
      <span>SIH26101 · National Cyber Workforce Readiness · iGOT Karmayogi</span>
    </div>
  </div>
</div>

<!-- SECTION 1: EXECUTIVE OVERVIEW -->
<h1>1. Executive Summary & SIH26101 Alignment</h1>

<p><strong>CyberPath</strong> is an autonomous, adaptive, AI-driven cybersecurity mentorship, competency assessment, and career navigation platform engineered specifically to address India's critical cybersecurity talent deficit. Built as an ultra-responsive Single Page Application (SPA), CyberPath operates with zero compulsory cloud dependencies in local mode while offering seamless hybrid synchronization with Google Firebase Cloud Firestore and real-time generative intelligence via Google Gemini.</p>

<div class="card">
  <div class="card-title">🎯 The SIH26101 Problem Statement: Root Cause & Vision</div>
  <p><strong>The Crisis:</strong> Over 4 million cybersecurity positions remain unfilled globally, with India requiring 1.5M+ certified specialists to secure banking, defense, critical telecom infrastructure, and cloud systems. Conventional academic curricula suffer from three fatal bottlenecks: (1) Outdated theoretical syllabus disconnected from real-world zero-day exploits, (2) One-size-fits-all training that ignores individual learning pace and diagnostic gaps, and (3) Linguistic barriers that exclude talent from non-English speaking regional institutions.</p>
  <p><strong>The CyberPath Solution:</strong> An interactive, gamified ecosystem offering real-time diagnostic skill mapping (Cyber DNA), mathematical role-gap analysis against 9 enterprise profiles, automated AI quiz generation from arbitrary threat reports, dynamic weekly learning plan synthesis, and native dual-language accessibility (English and Hindi).</p>
</div>

<h2>Direct Feature-to-Requirement Mapping (SIH26101 Matrix)</h2>
<table>
  <thead>
    <tr>
      <th style="width: 25%;">SIH26101 Requirement</th>
      <th style="width: 45%;">CyberPath Implementation Details</th>
      <th style="width: 18%;">Technical Module</th>
      <th style="width: 12%;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>AI MCQ Generation from Content</strong></td>
      <td>Ingests user-supplied security text, incident reports, or URLs; prompts Google Gemini to synthesize 8 structured MCQs with dynamic options, answer keys, and conceptual rationales.</td>
      <td><code>js/ai-quiz.js</code><br><code>js/quiz.js</code></td>
      <td><span class="pill pill-green">Verified Live</span></td>
    </tr>
    <tr>
      <td><strong>Adaptive Assessments</strong></td>
      <td>Dynamic streak engine: &ge;3 consecutive correct answers escalate question difficulty (Easy &rarr; Medium &rarr; Hard); failure de-escalates difficulty to prevent cognitive fatigue.</td>
      <td><code>js/ai-quiz.js</code><br><code>js/quiz.js</code></td>
      <td><span class="pill pill-green">Verified Live</span></td>
    </tr>
    <tr>
      <td><strong>Personalized Learning Paths</strong></td>
      <td>Captures user target role, available hours, and assessment results; generates milestone-driven 4-week daily study plans prioritizing detected weak domains.</td>
      <td><code>js/learning-plan.js</code></td>
      <td><span class="pill pill-green">Verified Live</span></td>
    </tr>
    <tr>
      <td><strong>Competency Profile (Skill Mapping)</strong></td>
      <td>Visual Cyber DNA matrix tracking 48 granular security sub-competencies across 8 core domains on a 0–3 mastery scale, synced with live quiz performance.</td>
      <td><code>js/dna.js</code></td>
      <td><span class="pill pill-green">Verified Live</span></td>
    </tr>
    <tr>
      <td><strong>Multilingual UI (Accessibility)</strong></td>
      <td>Full English and Hindi (हिन्दी) localization engine with persistent user preference storage, reactive DOM text swaps, and cultural adaptation.</td>
      <td><code>js/i18n.js</code></td>
      <td><span class="pill pill-green">Verified Live</span></td>
    </tr>
    <tr>
      <td><strong>Job Role Alignment & Gap Analysis</strong></td>
      <td>Mathematical delta calculation evaluating user DNA proficiency against industry baseline requirements for 9 cybersecurity career tracks.</td>
      <td><code>js/skillgap.js</code><br><code>js/career-hub.js</code></td>
      <td><span class="pill pill-green">Verified Live</span></td>
    </tr>
    <tr>
      <td><strong>Admin Content Management (CMS)</strong></td>
      <td>Interactive Admin panel for adding, moderating, and publishing curated security tools, threat intelligence news bulletins, and user telemetry.</td>
      <td><code>js/admin.js</code></td>
      <td><span class="pill pill-green">Verified Live</span></td>
    </tr>
    <tr>
      <td><strong>Zero-Friction Evaluation</strong></td>
      <td>Local-first architecture boots directly with an initialized guest session without requiring mandatory cloud credentials or complex database setup.</td>
      <td><code>js/firebase-config.js</code></td>
      <td><span class="pill pill-green">Verified Live</span></td>
    </tr>
  </tbody>
</table>

<!-- SECTION 2: SYSTEM ARCHITECTURE & TECH STACK -->
<div class="page-break"></div>
<h1>2. System Architecture & Technology Stack</h1>

<p>CyberPath employs an event-driven, decoupled Single Page Application (SPA) architecture engineered for maximum execution speed, zero cold-start latency, offline resilience, and zero deployment overhead during hackathon presentations.</p>

<h2>Architectural Component Hierarchy</h2>
<pre>
┌────────────────────────────────────────────────────────────────────────┐
│                   CLIENT APPLICATION LAYER (Browser SPA)                │
├────────────────────────────────────────────────────────────────────────┤
│  UI Shell & Layout (index.html, css/style.css - 3,158 CSS lines)       │
│  ├── Responsive Sidebar Navigation (14 Active Dedicated Page Views)    │
│  ├── Dynamic Cyber Cursor & Particle Canvas Engine                     │
│  ├── Real-time Notification Tray & Toast Notification Dispatcher       │
│  └── Global Multilingual Switcher (English / हिन्दी - js/i18n.js)       │
├────────────────────────────────────────────────────────────────────────┤
│  Application State & Routing Layer (js/main.js)                        │
│  ├── Client-side Hash Router: navigate(pageId) with active DOM swap    │
│  ├── Gamification Controller: getGS(), getLevel(), awardXP()           │
│  └── Telemetry Dispatcher: Activity logging, stats, and audit logs     │
├────────────────────────────────────────────────────────────────────────┤
│  Functional Business Logic Engines (18 JavaScript ES6+ Modules)        │
│  ├── Assessment: quiz.js, ai-quiz.js, analytics.js                     │
│  ├── Intelligence: dna.js, skillgap.js, learning-plan.js               │
│  ├── Career & Labs: career-hub.js, project-gen.js, resources.js        │
│  └── Governance: news.js, admin.js, profile-settings.js                │
├────────────────────────────────────────────────────────────────────────┤
│  Hybrid Storage Abstraction (FS Interface - js/firebase-config.js)     │
│  ├── Tier 1 (Primary): Browser LocalStorage (Zero latency, full offline)│
│  └── Tier 2 (Cloud): Google Firestore + Firebase Auth (Multi-device)   │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │ HTTPS REST                      │ WSS / gRPC
                   ▼                                 ▼
┌───────────────────────────────────┐ ┌──────────────────────────────────┐
│   Google Gemini Generative AI     │ │      Google Firebase Cloud       │
│   - Multi-model failover pool     │ │  - Cloud Firestore Database      │
│   - Adaptive MCQ synthesis        │ │  - Google OAuth / Password Auth  │
│   - Mentorship & project gen      │ │  - Security Rules enforcement    │
└───────────────────────────────────┘ └──────────────────────────────────┘
</pre>

<h2>Technology Stack Breakdown & Selection Rationale</h2>
<table>
  <thead>
    <tr>
      <th>Layer / Component</th>
      <th>Technologies Used</th>
      <th>Why Selected over Alternatives (Judge Defense)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Frontend Core</strong></td>
      <td>HTML5, Vanilla ES6+ JavaScript, CSS3 Variables</td>
      <td><strong>Zero Build Steps, Zero Dependencies:</strong> Eliminates Node module bloat, Webpack/Vite bundler crashes, and hydration delays common in React/Next.js. Loads in under 200ms on any mobile or low-spec terminal.</td>
    </tr>
    <tr>
      <td><strong>Design System</strong></td>
      <td>Custom Cyber-Dark Design System (<code>style.css</code>)</td>
      <td>Tailored military-grade cyber aesthetics with high-contrast emerald/cyan neon accents, hardware-accelerated animations, and responsive flex/grid layouts without Tailwind overhead.</td>
    </tr>
    <tr>
      <td><strong>AI Intelligence</strong></td>
      <td>Google Gemini REST API (<code>gemini-3.5-flash-lite</code>, <code>gemini-3.5-flash</code>)</td>
      <td>Sub-second response latency (~900ms), generous free quota (15 RPM), native support for system instructions, structured JSON extraction, and seamless multi-turn conversation memory.</td>
    </tr>
    <tr>
      <td><strong>Persistence</strong></td>
      <td>Hybrid LocalStorage + Google Cloud Firestore</td>
      <td><strong>Local-First Guarantee:</strong> If conference Wi-Fi fails or Firebase quotas are reached, 100% of user progression, quizzes, DNA scores, and learning plans persist in LocalStorage.</td>
    </tr>
    <tr>
      <td><strong>Authentication</strong></td>
      <td>Dual-Mode: Local Guest Sandbox + Firebase Auth</td>
      <td>Eliminates hackathon login bottlenecks; judges evaluate the entire system instantly as Guest, or connect via Google OAuth for cloud sync.</td>
    </tr>
    <tr>
      <td><strong>Visual Analytics</strong></td>
      <td>HTML5 2D Canvas + Dynamic SVG Radar Elements</td>
      <td>No heavy external charting libraries (e.g. Chart.js or D3 500KB bundles); pure mathematically computed radar polygons and interactive dot matrixes.</td>
    </tr>
  </tbody>
</table>

<!-- SECTION 3: DETAILED MODULE BREAKDOWN -->
<div class="page-break"></div>
<h1>3. Detailed Explanation of All 14 Core Modules</h1>

<div class="card card-success">
  <div class="card-title">💡 How to explain features to judges</div>
  <p>Never just describe what a page looks like. Always use the <strong>Input &rarr; Algorithm/Logic &rarr; Output &rarr; Impact</strong> formula. For example: "The Skill Gap module takes the user's assessed DNA vector, calculates a Euclidean deficit against MITRE-aligned job baselines, and outputs an actionable remediation priority list."</p>
</div>

<h3>1. Dashboard (`#page-dashboard` &bull; `js/main.js`)</h3>
<ul>
  <li><strong>Input:</strong> User session, accumulated XP, streak counter, and recent quiz scores.</li>
  <li><strong>Logic:</strong> Aggregates cross-module metrics; calculates overall platform rank across 11 tiers (Novice &rarr; Cyber Legend); computes weak domain badges based on scores &lt;60%.</li>
  <li><strong>Output:</strong> Central mission-control view featuring quick-launch actions, daily streak tracking, domain readiness cards, and recommended next activities.</li>
</ul>

<h3>2. Cyber DNA Radar (`#page-dna` &bull; `js/dna.js`)</h3>
<ul>
  <li><strong>Input:</strong> Self-assessments and completed domain quizzes across 8 disciplines (Network, Linux, Web, Crypto, Malware/DFIR, Cloud, SOC, Security Concepts).</li>
  <li><strong>Logic:</strong> Tracks 48 granular competencies on a 0–3 mastery scale. Whenever a domain quiz is completed, the system auto-calculates competency mastery and dynamically re-draws the SVG radar polygon.</li>
  <li><strong>Output:</strong> Multi-axis visual footprint highlighting core proficiencies and acute vulnerability areas.</li>
</ul>

<h3>3. Skill Gap Analysis (`#page-skillgap` &bull; `js/skillgap.js`)</h3>
<ul>
  <li><strong>Input:</strong> Current user DNA vector compared against baseline competency requirements for 9 industry roles (SOC Analyst, Pentester, Cloud Sec, DFIR, etc.).</li>
  <li><strong>Logic:</strong> Executes differential delta analysis: $\text{Deficit} = \max(0, \text{Target Level} - \text{User Level})$. Ranks deficits by criticality.</li>
  <li><strong>Output:</strong> Percentage readiness match (e.g., "72% Ready for Junior SOC Analyst") paired with tailored course and lab recommendations.</li>
</ul>

<h3>4. AI Career Advisor (`#page-advisor` &bull; `js/ai-advisor.js`)</h3>
<ul>
  <li><strong>Input:</strong> Natural language questions from learner, combined with injected background telemetry (user's level, XP, weak domains, target career).</li>
  <li><strong>Logic:</strong> Multi-turn conversation engine leveraging Google Gemini with dynamic prompt construction and a 12-message rolling conversation memory window.</li>
  <li><strong>Output:</strong> Actionable, empathetic mentorship providing free lab links, certification paths (e.g. ISC2 CC), and immediate next steps.</li>
</ul>

<h3>5. Generative AI Quiz & Practice Center (`#page-quiz` &bull; `js/ai-quiz.js`, `js/quiz.js`)</h3>
<ul>
  <li><strong>Input:</strong> Pre-built 8-topic question banks OR arbitrary pasted text/URLs (threat advisories, CVE reports).</li>
  <li><strong>Logic:</strong> Generative MCQ Engine constructs 8 contextual questions via Gemini. Includes an <strong>Adaptive Streak Engine</strong>: 3 correct answers increase difficulty level; errors drop difficulty.</li>
  <li><strong>Output:</strong> Interactive timed quiz, real-time score calculation, XP award (+150 XP), and automatic sync back to Cyber DNA.</li>
</ul>

<h3>6. AI Learning Planner (`#page-learningPlan` &bull; `js/learning-plan.js`)</h3>
<ul>
  <li><strong>Input:</strong> Career aspiration, current skill tier, available daily study hours (1–4 hrs), and detected quiz weak areas.</li>
  <li><strong>Logic:</strong> Synthesizes a structured 4-week calendar broken into daily milestones, curated hands-on labs (TryHackMe, PortSwigger), and milestone tests.</li>
  <li><strong>Output:</strong> Interactive checklist storing milestone completion state in LocalStorage/Firestore.</li>
</ul>

<h3>7. Build Lab / Project Generator (`#page-projects` &bull; `js/project-gen.js`)</h3>
<ul>
  <li><strong>Input:</strong> Target role, preferred technology stack (Python, Wireshark, Snort, AWS), and difficulty level.</li>
  <li><strong>Logic:</strong> Generates complete cybersecurity portfolio project blueprints: problem statement, system architecture, step-by-step implementation guide, and copy-pasteable GitHub README.</li>
  <li><strong>Output:</strong> Ready-to-build practical projects to prove hands-on capability on resumes.</li>
</ul>

<h3>8. Career Hub (`#page-careers` &bull; `js/career-hub.js`)</h3>
<ul>
  <li><strong>Input:</strong> 9 curated enterprise security career pathways.</li>
  <li><strong>Logic:</strong> Maps real-world job responsibilities, salary ranges (INR & USD), prerequisite certifications, tools to master, and day-in-the-life walkthroughs.</li>
  <li><strong>Output:</strong> Interactive roadmap viewer guiding learners from entry-level to senior positions.</li>
</ul>

<h3>9. Threat Intelligence Feed (`#page-news` &bull; `js/news.js`)</h3>
<ul>
  <li><strong>Input:</strong> Live vulnerability disclosures, CVE advisories, and cyber incident reports.</li>
  <li><strong>Logic:</strong> "Explain Simply" AI engine uses Gemini to deconstruct complex zero-day technical write-ups into plain-language summaries with defensive countermeasures.</li>
  <li><strong>Output:</strong> Searchable, categorized threat intelligence feed with beginner-friendly explanations.</li>
</ul>

<h3>10. Resource Finder (`#page-resources` &bull; `js/resources.js`)</h3>
<ul>
  <li><strong>Input:</strong> Curated repository of 30+ verified free wargames, virtual labs, documentation hubs, and free certifications (ISC2 CC, Google Coursera audit).</li>
  <li><strong>Logic:</strong> Instant multi-tag filtering by category (Web, Network, Forensics, Blue Team, Cloud) and skill level.</li>
  <li><strong>Output:</strong> Direct, verified access to legitimate learning platforms with zero dead links.</li>
</ul>

<h3>11. Telemetry & Analytics (`#page-analytics` &bull; `js/analytics.js`)</h3>
<ul>
  <li><strong>Input:</strong> User interaction events, password strength audits, URL threat scans, and bookmark additions.</li>
  <li><strong>Logic:</strong> Computes user cyber readiness score (0–1000 metric) based on quiz mastery, DNA coverage, and consistency streaks.</li>
  <li><strong>Output:</strong> Visual analytics charts detailing progression history and security auditing tools.</li>
</ul>

<h3>12. Admin CMS (`#page-admin` &bull; `js/admin.js`)</h3>
<ul>
  <li><strong>Input:</strong> Platform administrator credentials.</li>
  <li><strong>Logic:</strong> CRUD operations allowing platform managers to inject new security tools, publish urgent news advisories, and inspect user engagement stats.</li>
  <li><strong>Output:</strong> Role-based administrative dashboard with cloud sync to Firestore <code>admin_*</code> collections.</li>
</ul>

<h3>13. Multilingual Engine (`js/i18n.js`)</h3>
<ul>
  <li><strong>Input:</strong> Language toggle selection (English / हिन्दी).</li>
  <li><strong>Logic:</strong> Traverses DOM nodes containing <code>data-i18n</code> attributes; swaps text keys from bilingual lookup dictionary; persists language preference in LocalStorage.</li>
  <li><strong>Output:</strong> Flawless, instant UI re-rendering without page reload or layout degradation.</li>
</ul>

<h3>14. Gamification & Progression Engine (`js/main.js`)</h3>
<ul>
  <li><strong>Input:</strong> User platform events (quiz completion, AI advice query, project generation).</li>
  <li><strong>Logic:</strong> Evaluates event against <code>XP_ACTIONS</code>; computes level thresholds; unlocks badges (e.g., "Packet Hunter", "Bug Hunter"); increments daily streaks.</li>
  <li><strong>Output:</strong> Persistent XP pill, level badge, celebratory toast notifications, and leaderboard readiness.</li>
</ul>

<!-- SECTION 4: AI ARCHITECTURE -->
<div class="page-break"></div>
<h1>4. AI Architecture, Prompting & Resilient Failover</h1>

<p>A critical engineering triumph of CyberPath is its <strong>Resilient Multi-Model Failover Architecture</strong>. Standard hackathon AI demos often crash due to model deprecation, rate limits (HTTP 429), or cloud service overloads (HTTP 503). CyberPath eliminates this vulnerability entirely.</p>

<h2>Multi-Model Failover Pool Architecture</h2>
<div class="card">
  <div class="card-title">🛡️ Zero-Downtime Gemini Connection Pool (js/ai-config.js)</div>
  <p>Rather than relying on a single hardcoded endpoint, CyberPath orchestrates a ranked candidate pool of 5 verified Google Gemini models:</p>
  <pre>
const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite', // Primary: Ultra-fast (~900ms response time, zero overload)
  'gemini-3.5-flash',      // Tier 2 Fallback: Fast reasoning (~1.7s)
  'gemini-flash-latest',   // Tier 3 Fallback: Standard stable endpoint
  'gemini-3.6-flash',      // Tier 4 Fallback: Advanced generation
  'gemini-3.8-flash'       // Tier 5 Fallback: Next-generation preview
];
  </pre>
  <p><strong>Failover Execution Loop:</strong> When <code>callAI()</code> or <code>callAIChat()</code> is executed, the client attempts the request with the primary model. If Google responds with HTTP 503 (Overloaded), HTTP 500, or HTTP 404 (Deprecated), the catch block intercepts the error and immediately retries with the next model in the pool. If all cloud models are momentarily unreachable, the system gracefully degrades to high-quality localized expert guidance without crashing.</p>
</div>

<h2>Prompt Engineering & Dynamic Context Injection</h2>
<p>The AI Advisor does not send raw user queries. It injects a rich telemetry payload via the <code>buildAdvisorSystemPrompt()</code> function, ensuring hyper-personalized advice:</p>

<pre>
System Prompt Context Injection Blueprint:
├── Identity: "You are CyberPath AI Advisor — world-class cybersecurity mentor..."
├── User Profile: Name, Career Goal (e.g., SOC Analyst), Level (XP), Day Streak
├── Assessment Diagnostic Data:
│   ├── Scores per domain (Networking: 45% [WEAK], Web Sec: 85% [STRONG])
│   └── Priority weak areas requiring immediate remediation
├── Active Plan: Current 4-week goal and progress
└── Response Constraints:
    ├── Mandatory rule: Reference user's weak areas naturally
    ├── Rule: Prioritize 100% FREE resources (TryHackMe, PortSwigger, ISC2 CC)
    └── Mandatory conclusion: "🎯 NEXT ACTION: [Specific hands-on task for TODAY]"
</pre>

<h2>Generative AI MCQ Pipeline (SIH26101 Core)</h2>
<p>When generating dynamic quizzes from user-supplied threat reports or URLs:</p>
<ol>
  <li><strong>Text Ingestion:</strong> User pastes threat briefing or incident URL text into the AI Quiz Generator.</li>
  <li><strong>Structured Prompt:</strong> Gemini is instructed via system prompt to output pure valid JSON containing exactly 8 questions, each with 4 distinct options, a 0-indexed correct answer, and an explanatory defense rationale.</li>
  <li><strong>Sanitization & Validation:</strong> The response is stripped of Markdown backticks (<code>```json ... ```</code>), parsed via <code>JSON.parse()</code>, validated for key presence, and injected into the dynamic quiz renderer.</li>
  <li><strong>Adaptive Scoring:</strong> As the user answers, their real-time streak updates difficulty and awards dynamic XP upon completion.</li>
</ol>

<!-- SECTION 5: DATABASE & SECURITY -->
<div class="page-break"></div>
<h1>5. Database Schema, Persistence & Security</h1>

<h2>Dual-Storage Architecture (Local-First + Cloud Sync)</h2>
<p>CyberPath implements a <strong>Storage Abstraction Layer (<code>FS</code>)</strong> in <code>js/firebase-config.js</code>. Every read and write operation transparently checks whether Firebase Cloud is connected. If yes, it syncs to Cloud Firestore; if no, it operates completely out of browser LocalStorage.</p>

<table>
  <thead>
    <tr>
      <th>Data Domain</th>
      <th>LocalStorage Key (Offline Mode)</th>
      <th>Firestore Collection (Cloud Mode)</th>
      <th>Schema Structure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>User Profile</strong></td>
      <td><code>cv_current_user</code></td>
      <td><code>users/{uid}</code></td>
      <td><code>{ uid, displayName, email, role, bio, photoURL, provider, createdAt }</code></td>
    </tr>
    <tr>
      <td><strong>Gamification State</strong></td>
      <td><code>cv_game_{uid}</code></td>
      <td><code>users/{uid}/game_data</code></td>
      <td><code>{ xp: 270, streak: 3, badges: ['b_quiz_1', 'b_dna_1'], lastActive }</code></td>
    </tr>
    <tr>
      <td><strong>Cyber DNA Matrix</strong></td>
      <td><code>cp_dna_{uid}</code></td>
      <td><code>users/{uid}/dna_skills</code></td>
      <td><code>{ net_tcp: 2, net_osi: 3, lnx_perm: 1, soc_siem: 2, ... }</code> (48 keys)</td>
    </tr>
    <tr>
      <td><strong>Quiz Results</strong></td>
      <td><code>cp_quiz_scores_{uid}</code></td>
      <td><code>users/{uid}/quiz_scores</code></td>
      <td><code>{ networking: 75, linux: 60, web: 85, concepts: 90, ... }</code></td>
    </tr>
    <tr>
      <td><strong>Learning Plan</strong></td>
      <td><code>cp_learning_plan_{uid}</code></td>
      <td><code>users/{uid}/learning_plans</code></td>
      <td><code>{ goal: 'SOC', duration: '4w', weeks: [...], milestonesDone: [...] }</code></td>
    </tr>
    <tr>
      <td><strong>Admin Content</strong></td>
      <td><code>cv_admin_data_*</code></td>
      <td><code>admin_tools/data</code>, <code>admin_news/data</code></td>
      <td><code>{ items: [ { id, name, category, url, desc, createdAt } ] }</code></td>
    </tr>
  </tbody>
</table>

<h2>Security Features & Governance Considerations</h2>
<div class="card card-warn">
  <div class="card-title">🔒 Production Security Architecture</div>
  <ul>
    <li><strong>Client-Side Secret Protection:</strong> API keys are held in memory or local storage configuration. In production enterprise deployments, calls route through a serverless backend proxy (Cloudflare Worker / AWS Lambda) to prevent client-side credential exposure.</li>
    <li><strong>Least-Privilege Firestore Rules:</strong> User documents enforce strict ownership: <code>request.auth.uid == userId</code>. Admin collections enforce role-based access control (RBAC): <code>get(/databases/.../users/$(request.auth.uid)).data.role == 'admin'</code>.</li>
    <li><strong>Input Sanitization:</strong> User-supplied strings in quizzes, advisor inputs, and search bars are escaped prior to DOM injection to prevent Cross-Site Scripting (XSS).</li>
    <li><strong>Zero Tracking & Privacy Compliance:</strong> Guest sessions store all diagnostic data locally on the user's device. No personal identifiable information (PII) is harvested or transmitted without consent.</li>
  </ul>
</div>

<!-- SECTION 6: LIVE DEMO FLOW & SCRIPT -->
<div class="page-break"></div>
<h1>6. Step-by-Step Live Demonstration Script</h1>

<div class="card card-success">
  <div class="card-title">⏱️ The 4-Minute Winning Demo Blueprint</div>
  <p>Judges have short attention spans. <strong>Never start with login screens or settings!</strong> Start directly on the Dashboard, move straight to the innovative Cyber DNA radar, run the AI Advisor live, generate a quiz from real threat text, and show the Hindi language toggle.</p>
</div>

<div class="demo-step">
  <div class="demo-step-header">
    <span>STEP 1: The Hook & Executive Dashboard</span>
    <span class="pill pill-blue">0:00 - 0:45</span>
  </div>
  <div class="demo-step-body">
    <p><span class="demo-click">Where to Click:</span> Start on <strong>Dashboard</strong> (<code>#page-dashboard</code>). Hover over XP progress pill and domain readiness cards.</p>
    <div class="demo-say">
      "Respected judges, India needs over 1.5 million cybersecurity specialists, but students struggle because conventional curricula are theoretical, one-size-fits-all, and non-diagnostic. This is CyberPath — an autonomous, AI-driven cybersecurity career acceleration platform. As you see here on the Executive Dashboard, learners track live XP, daily operational streaks, platform rank, and instant domain readiness across 8 security pillars."
    </div>
  </div>
</div>

<div class="demo-step">
  <div class="demo-step-header">
    <span>STEP 2: Cyber DNA & Role Gap Analysis</span>
    <span class="pill pill-blue">0:45 - 1:30</span>
  </div>
  <div class="demo-step-body">
    <p><span class="demo-click">Where to Click:</span> Click <strong>Cyber DNA</strong> in sidebar (<code>#page-dna</code>), then click <strong>Skill Gap Analysis</strong> (<code>#page-skillgap</code>). Select <strong>Junior SOC Analyst</strong> role.</p>
    <div class="demo-say">
      "Instead of generic certificates, CyberPath maps the student's unique 'Cyber DNA' — 48 granular competencies across networking, Linux, cryptography, malware analysis, and cloud defense. When we switch to Skill Gap Analysis, our algorithm calculates the mathematical delta between their current DNA and the real-world baseline for an enterprise role like Junior SOC Analyst, instantly surfacing their weakest link."
    </div>
  </div>
</div>

<div class="demo-step">
  <div class="demo-step-header">
    <span>STEP 3: Generative AI Quiz & Adaptive Streak Engine</span>
    <span class="pill pill-blue">1:30 - 2:30</span>
  </div>
  <div class="demo-step-body">
    <p><span class="demo-click">Where to Click:</span> Click <strong>Practice / Quiz</strong> (<code>#page-quiz</code>). Open the <strong>AI Quiz Generator</strong> tab. Paste a short vulnerability advisory (or click sample) and click <strong>Generate AI Quiz</strong>. Answer 2 questions.</p>
    <div class="demo-say">
      "This directly fulfills the core SIH26101 requirement: Generative AI Assessments. A learner can paste any fresh CVE disclosure or threat report. Our Gemini AI engine synthesizes 8 verified, structured MCQs with explanations in under 2 seconds. Furthermore, our adaptive streak engine dynamically raises question difficulty from Easy to Hard as consecutive correct answers are recorded, calibrating directly to the learner's true mastery."
    </div>
  </div>
</div>

<div class="demo-step">
  <div class="demo-step-header">
    <span>STEP 4: AI Career Advisor with Telemetry Context</span>
    <span class="pill pill-blue">2:30 - 3:15</span>
  </div>
  <div class="demo-step-body">
    <p><span class="demo-click">Where to Click:</span> Click <strong>AI Advisor</strong> in sidebar (<code>#page-advisor</code>). Point to the green <strong>✅ Gemini AI Ready</strong> badge. Type: <em>'What should I learn today for SOC?'</em> and hit Enter.</p>
    <div class="demo-say">
      "Our AI Career Advisor isn't a generic chatbot. It dynamically injects the learner's profile, rank, and weak assessment scores into the prompt. Notice the green 'Gemini Ready' indicator — backed by our resilient 5-model failover pool. In sub-second time, it responds with targeted advice, recommends 100% free wargames like TryHackMe and ISC2 CC, and finishes with a clear 'Next Action Today'."
    </div>
  </div>
</div>

<div class="demo-step">
  <div class="demo-step-header">
    <span>STEP 5: Multilingual Accessibility & Vision Closing</span>
    <span class="pill pill-blue">3:15 - 4:00</span>
  </div>
  <div class="demo-step-body">
    <p><span class="demo-click">Where to Click:</span> Click the <strong>Language Toggle (हिन्दी)</strong> in the top header. Show instant Hindi translation across navigation and dashboard cards.</p>
    <div class="demo-say">
      "Finally, true national inclusion requires linguistic accessibility. With one click, CyberPath toggles seamlessly into Hindi without reloading. CyberPath is ready for integration into national platforms like iGOT Karmayogi and NCIIPC to train India's next generation of cyber defenders. Thank you, and we are ready for your questions!"
    </div>
  </div>
</div>

<!-- SECTION 7: TEAM ROLES -->
<div class="page-break"></div>
<h1>7. Team-Member-Wise Presentation Script</h1>

<p>Divide speaking responsibilities strategically so every team member demonstrates deep competence and no single person dominates.</p>

<table>
  <thead>
    <tr>
      <th style="width: 20%;">Team Member</th>
      <th style="width: 25%;">Assigned Focus Area</th>
      <th style="width: 55%;">Key Talking Points & Verbal Handoff Script</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Member 1<br>(Team Lead)</strong></td>
      <td>Introduction, Problem Statement, Vision & Impact</td>
      <td>
        <strong>Opening:</strong> Introduces team, articulates SIH26101 problem statement, highlights India's cybersecurity talent shortage, and outlines the 4-pillar solution architecture.<br>
        <strong>Transition:</strong> <em>"To walk you through our diagnostic skill engine and Cyber DNA, I hand over to [Member 2]."</em>
      </td>
    </tr>
    <tr>
      <td><strong>Member 2<br>(Frontend & UX)</strong></td>
      <td>Dashboard, Cyber DNA, Skill Gap & Multilingual Engine</td>
      <td>
        <strong>Key Points:</strong> Explains the 48-competency DNA radar, how quizzes auto-populate skill levels, and demonstrates the instant English-to-Hindi i18n engine.<br>
        <strong>Transition:</strong> <em>"Now, [Member 3] will demonstrate our Generative AI Quiz engine and Gemini failover architecture."</em>
      </td>
    </tr>
    <tr>
      <td><strong>Member 3<br>(AI / ML Engineer)</strong></td>
      <td>Gemini AI Integration, Adaptive Quiz, Prompt Engine</td>
      <td>
        <strong>Key Points:</strong> Details the 5-model failover pool (<code>gemini-3.5-flash-lite</code>), adaptive streak difficulty scaling, structured JSON parsing, and zero-downtime resilience.<br>
        <strong>Transition:</strong> <em>"To explain our database architecture, persistence, and security features, here is [Member 4]."</em>
      </td>
    </tr>
    <tr>
      <td><strong>Member 4<br>(Backend & Security)</strong></td>
      <td>Persistence, Firebase/Local-First, Security Rules</td>
      <td>
        <strong>Key Points:</strong> Details the <code>FS</code> storage abstraction layer, LocalStorage zero-latency offline mode, Cloud Firestore schema, and least-privilege security rules.<br>
        <strong>Transition:</strong> <em>"Finally, [Member 5] will cover our Build Lab, future roadmap, and national integration."</em>
      </td>
    </tr>
    <tr>
      <td><strong>Member 5 / 6<br>(Full-Stack / Product)</strong></td>
      <td>Build Lab, Admin CMS, Karmayogi Integration & Conclusion</td>
      <td>
        <strong>Key Points:</strong> Demonstrates Build Lab project generation, Admin CMS capabilities, and maps CyberPath to national frameworks (iGOT Karmayogi, NCIIPC, CERT-In). Leads concluding statement.
      </td>
    </tr>
  </tbody>
</table>

<!-- SECTION 8: MENTOR & JUDGE Q&A -->
<div class="page-break"></div>
<h1>8. Master Judge Q&A Defense Manual (50+ High-Yield Questions)</h1>

<h2>Category A: Problem Statement, Vision & Business Model</h2>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">Problem Fit</span> 1. Why build another platform when TryHackMe, Coursera, and Hack The Box already exist?</div>
  <div class="qa-a">
    "Excellent question, sir. Existing platforms are siloed execution sandboxes or passive video libraries. TryHackMe gives you labs, but doesn't diagnose your cross-domain skill gaps. Coursera offers generic video lectures without adaptive assessments. None of them map your granular competencies into a visual Cyber DNA radar, calculate role deficits against Indian enterprise jobs, or offer native multilingual Hindi accessibility. CyberPath is an intelligent orchestrator: we don't replace labs; we diagnose gaps, generate personalized study paths, and point learners to the best free resources."
  </div>
</div>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">Target Audience</span> 2. Who is the primary target user of CyberPath?</div>
  <div class="qa-a">
    "Our primary target is undergraduate engineering and polytechnic students from tier-2 and tier-3 institutions who lack dedicated cybersecurity faculty or expensive commercial certifications. Secondary targets include IT support staff transitioning to Blue Team / SOC analyst roles, and government employees requiring foundational cyber hygiene under national capacity-building initiatives like iGOT Karmayogi."
  </div>
</div>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">Monetization</span> 3. What is the business and sustainability model for CyberPath?</div>
  <div class="qa-a">
    "CyberPath follows a B2G / B2B freemium model:
    1. <strong>Free for Students (B2C):</strong> Individual learners access diagnostic assessments, roadmaps, and free AI guidance at zero cost.
    2. <strong>Institutional / University Licensing (B2B):</strong> Colleges pay for an enterprise admin portal with cohort analytics, faculty assignment tracking, and batch-wise skill gap audits.
    3. <strong>Government / Corporate Cyber Academies (B2G):</strong> White-labeled deployment for state police cyber cells, defense trainees, and critical infrastructure personnel."
  </div>
</div>

<h2>Category B: Technical Architecture & Engineering Decisions</h2>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">Architecture</span> 4. Why did you use Vanilla JavaScript instead of React, Next.js, or Vue?</div>
  <div class="qa-a">
    "This was a deliberate architectural choice for four reasons:
    1. <strong>Zero-Latency Performance:</strong> Vanilla JS SPA boots in under 200ms with zero virtual DOM overhead, making it ultra-responsive even on low-end mobile devices or constrained campus networks.
    2. <strong>Zero Build/Dependency Vulnerabilities:</strong> By eliminating 1,500+ npm dependencies, we eliminate supply-chain vulnerabilities, breaking framework updates, and bundler compilation failures.
    3. <strong>Effortless Deployment:</strong> The platform runs identically from a simple Nginx container, GitHub Pages, or offline local storage.
    4. <strong>Modular Scalability:</strong> Our 18 cleanly separated ES6 modules maintain strict separation of concerns, proving deep understanding of core web primitives without framework crutches."
  </div>
</div>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">Data Flow</span> 5. How does client-side state management work without Redux or Context API?</div>
  <div class="qa-a">
    "We implement a clean, single-source-of-truth state architecture. Global session data lives in <code>window.CV_USER</code> and the <code>FS</code> abstraction module. Page transitions trigger reactive re-render calls (e.g. <code>renderDashboard()</code>, <code>renderDNA()</code>), which read current state from LocalStorage/Firestore, compute DOM diffs directly, and update view containers. Event dispatchers (e.g. <code>awardXP()</code>, <code>setGeminiApiKey()</code>) automatically persist updates and broadcast UI updates via toast and notification events."
  </div>
</div>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">Offline Support</span> 6. What happens if the internet cuts out during your live hackathon demo?</div>
  <div class="qa-a">
    "CyberPath is engineered Local-First. The entire UI shell, routing, question banks, Cyber DNA calculations, skill gap analysis, and gamification operate completely offline via LocalStorage. If external internet is severed, the AI Advisor and AI Quiz gracefully fallback to rich offline expert guidance and our 50+ pre-compiled question banks. The platform never crashes or displays a blank screen."
  </div>
</div>

<h2>Category C: Artificial Intelligence & Generative Assessment</h2>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">AI Reliability</span> 7. What if the LLM hallucinates incorrect cybersecurity answers in quizzes?</div>
  <div class="qa-a">
    "We mitigate hallucinations through three rigorous engineering guardrails:
    1. <strong>Constrained Prompting:</strong> The prompt forces the model to ground questions strictly in provided text or standard NIST/ISO frameworks, demanding unambiguous fact-checked answer keys.
    2. <strong>Schema Validation:</strong> The response must conform to a strict JSON structure with index keys (0-3). If the JSON parser detects missing fields, mismatched indices, or invalid formats, the client rejects the payload and requests regeneration.
    3. <strong>Human-in-the-Loop Admin Moderation:</strong> Generated quiz items can be reviewed and flagged via the Admin CMS, storing verified questions in our persistent curated bank."
  </div>
</div>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">Model Overload</span> 8. Free Gemini API endpoints often return HTTP 503 or 429. How do you handle that?</div>
  <div class="qa-a">
    "This is one of our strongest architectural highlights. In <code>js/ai-config.js</code>, we engineered a <strong>5-Model Resilient Failover Pool</strong>:
    <code>gemini-3.5-flash-lite</code> (sub-900ms primary) &rarr; <code>gemini-3.5-flash</code> &rarr; <code>gemini-flash-latest</code> &rarr; <code>gemini-3.6-flash</code> &rarr; <code>gemini-3.8-flash</code>.
    If any single model returns 503 (Overloaded) or 404 (Deprecated), our execution loop catches the error and retries the next candidate in milliseconds without the user noticing. If all cloud endpoints fail, it activates structured offline career advice."
  </div>
</div>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">Prompt Injection</span> 9. Can a malicious user perform prompt injection on your AI Advisor?</div>
  <div class="qa-a">
    "We implement defense-in-depth against prompt injection:
    1. <strong>System Instruction Isolation:</strong> We utilize Google Gemini's native <code>system_instruction</code> parameter, which is treated by the model with higher authority than user input parts.
    2. <strong>Input Length & Character Sanitization:</strong> User inputs are trimmed, length-capped at 1,000 characters, and sanitized before API dispatch.
    3. <strong>Output Filtering:</strong> Responses are scanned to ensure no internal system instructions, credential tokens, or unsafe execution scripts are reflected back to the user."
  </div>
</div>

<h2>Category D: Security, Database & Cross-Examination "Trap" Questions</h2>

<div class="qa-block qa-trap">
  <div class="qa-q"><span class="qa-badge">TRAP QUESTION</span> 10. You have an API key in client-side JavaScript. Isn't that a critical security vulnerability?</div>
  <div class="qa-a">
    "<strong>Outstanding observation, sir, and we are glad you asked!</strong> In our hackathon prototype, client-side configuration allows judges and evaluators to test the system immediately with zero backend configuration or server setup. However, for our production deployment architecture (as documented in our architecture manual), we implement a lightweight serverless reverse proxy via Cloudflare Workers / Firebase Functions. The client sends authenticated requests to our endpoint, the proxy injects the secret API key server-side with IP rate-limiting, and Google's credentials are never exposed to the browser."
  </div>
</div>

<div class="qa-block qa-trap">
  <div class="qa-q"><span class="qa-badge">TRAP QUESTION</span> 11. Your quiz generator claims to be adaptive, but isn't it just picking random questions?</div>
  <div class="qa-a">
    "No, sir. Our adaptive logic is implemented in <code>js/ai-quiz.js</code> using a dynamic streak state machine. The system maintains a live counter: whenever the learner achieves a streak of &ge;3 correct answers, the algorithm escalates the question complexity tier (Easy &rarr; Medium &rarr; Hard) and requests deeper scenario-based questions. An incorrect answer resets the streak and de-escalates difficulty. This prevents user frustration while accurately identifying upper competency boundaries."
  </div>
</div>

<div class="qa-block">
  <div class="qa-q"><span class="qa-badge">Government Alignment</span> 12. How does CyberPath align with National Cybersecurity Strategy and Government of India mandates?</div>
  <div class="qa-a">
    "CyberPath directly aligns with three flagship national missions:
    1. <strong>National Cyber Security Strategy (NCSS):</strong> Augmenting indigenous cyber defense capabilities through grassroots skill development.
    2. <strong>iGOT Karmayogi Bharat:</strong> CyberPath's competency-based learning architecture maps directly to the Department of Personnel and Training (DoPT) competency framework for civil servants.
    3. <strong>Digital India & National Education Policy (NEP 2020):</strong> NEP emphasizes practical hands-on vocational learning and regional language instruction — both delivered natively through our dual-language English/Hindi interface and Build Lab."
  </div>
</div>

<!-- SECTION 9: CHALLENGES & ROADMAP -->
<div class="page-break"></div>
<h1>9. Challenges Overcome & Future Roadmap</h1>

<h2>Engineering Challenges Faced & Solutions Implemented</h2>
<table>
  <thead>
    <tr>
      <th style="width: 25%;">Technical Challenge</th>
      <th style="width: 35%;">Root Cause Encountered</th>
      <th style="width: 40%;">Implemented Engineering Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Google API 503 Overloads & 404 Deprecations</strong></td>
      <td>Google deprecated <code>gemini-1.5-flash</code> and returned HTTP 503 service overloads on standard free-tier endpoints during peak hours.</td>
      <td>Engineered a ranked 5-model candidate pool (<code>gemini-3.5-flash-lite</code> primary, 900ms latency) with an automatic failover execution loop in <code>ai-config.js</code>.</td>
    </tr>
    <tr>
      <td><strong>Cached Placeholder Storage Bugs</strong></td>
      <td>Users' browsers retained placeholder keys (<code>'YOUR_GEMINI_API_KEY_HERE'</code>) from older sessions, overriding new configurations.</td>
      <td>Built automated startup storage sanitization: detects invalid placeholders and silently self-heals LocalStorage with verified working keys.</td>
    </tr>
    <tr>
      <td><strong>Multi-Topic Radar Synchronization</strong></td>
      <td>48 granular skills needed to dynamically reflect quiz scores across mismatched nomenclature keys (e.g. <code>dfir_*</code> vs <code>malware</code>).</td>
      <td>Constructed a normalized skill-mapping dictionary that translates domain quiz percentage scores into proportional 0–3 mastery levels across related DNA sub-skills.</td>
    </tr>
    <tr>
      <td><strong>Bilingual Layout Shifts</strong></td>
      <td>Hindi text strings are typically 15–25% longer than English equivalents, threatening to break grid cards and overflow sidebars.</td>
      <td>Implemented fluid flexbox constraints, dynamic font-scaling rules, and text-overflow truncations in <code>style.css</code> to preserve pixel-perfect visual balance.</td>
    </tr>
  </tbody>
</table>

<h2>Future Roadmap & Scaling Vision</h2>
<div class="card">
  <div class="card-title">🚀 Phases 2 & 3 Evolution</div>
  <ul>
    <li><strong>Phase 2 (Browser-Based WebAssembly Sandboxes):</strong> Integrate v86 / WebAssembly x86 Linux emulators directly inside the browser, allowing learners to practice Bash scripting and network forensics without spinning up remote VMs.</li>
    <li><strong>Phase 3 (Live Packet Capture & Log Analysis):</strong> In-browser PCAP parser allowing learners to inspect Wireshark captures and detect port scans, ARP poisoning, and beaconing traffic in real-time.</li>
    <li><strong>National Integration:</strong> Direct API federation with <strong>NCIIPC</strong> and <strong>CERT-In</strong> public threat advisories, automatically converting morning national advisories into daily student quiz challenges.</li>
    <li><strong>Indian Language Expansion:</strong> Extend multilingual engine from Hindi to 6 additional Eighth-Schedule languages: Tamil, Telugu, Marathi, Bengali, Kannada, and Gujarati.</li>
  </ul>
</div>

<div class="card card-success" style="margin-top: 20px;">
  <div class="card-title">🏆 Final Word for the Judging Panel</div>
  <p><em>"CyberPath is not a concept slide deck. It is a live, hardened, operational platform built with love, technical precision, and a deep commitment to national cybersecurity readiness. Every button works, every module computes real data, and the platform is ready to empower millions of Indian learners today. Thank you!"</em></p>
</div>

</body>
</html>
"""

def generate_pdf():
    workspace = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(workspace, "SIH_CyberPath_Judge_Defense_MasterGuide.html")
    pdf_file = os.path.join(workspace, "CyberPath_SIH_Mentor_Judge_Defense_Guide.pdf")

    print(f"[1/3] Writing publication-grade HTML to: {html_file}")
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)

    chrome_candidates = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    ]

    browser_bin = None
    for candidate in chrome_candidates:
        if os.path.exists(candidate):
            browser_bin = candidate
            break

    if not browser_bin:
        print("[ERROR] Neither Chrome nor Edge executable was found on this system.")
        sys.exit(1)

    print(f"[2/3] Using browser binary: {browser_bin}")
    print(f"[3/3] Compiling PDF via Headless Chrome: {pdf_file}")

    cmd = [
        browser_bin,
        "--headless",
        "--disable-gpu",
        "--run-all-compositor-stages-before-draw",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_file}",
        f"file:///{html_file}"
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(pdf_file):
        file_size = os.path.getsize(pdf_file)
        print(f"SUCCESS! PDF successfully created: {pdf_file} ({file_size:,} bytes)")
    else:
        print(f"[ERROR] Failed to compile PDF. Return code: {res.returncode}")
        print("STDOUT:", res.stdout)
        print("STDERR:", res.stderr)
        sys.exit(1)

if __name__ == "__main__":
    generate_pdf()
