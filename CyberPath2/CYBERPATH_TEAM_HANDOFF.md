# ⬡ CYBERPATH — MASTER SYSTEM ARCHITECTURE & AI HANDOFF
> **AI-Powered Cybersecurity Learning, Assessment & Career Guidance Platform**  
> **Target Alignment**: Smart India Hackathon 2026 (SIH 2026 / Problem Statement SIH26101)  
> **Platform Version**: v2.0 (Open-Access Local & Hybrid Firebase Cloud Edition)  
> **Architecture Type**: Client-Side Single Page Application (SPA) with Local-First Persistence  

---

## 📁 COMPLETE PROJECT STRUCTURE

```
CyberPath2/
├── index.html                   ← Main Single Page Application shell (14 views)
├── robots.txt                   ← Search crawler rules
├── sitemap.xml                  ← SEO sitemap
├── _redirects                   ← SPA redirect configuration for Netlify/Cloudflare
├── CYBERPATH_TEAM_HANDOFF.md    ← This master architecture & AI handoff guide
├── assets/                      ← Platform logos and graphic assets
│
├── css/
│   └── style.css                ← Cyber-dark design system & animation rules (3,158 lines)
│
└── js/                          ← 18 Functional JavaScript modules (5,700+ lines)
    ├── firebase-config.js       ← Dual-mode Firebase init + FS storage abstraction
    ├── i18n.js                  ← Multi-language translation engine (EN & HI)
    ├── ai-config.js             ← Gemini 1.5 Flash REST client & token manager
    ├── main.js                  ← Router (navigate), cyber cursor, particles, dashboard
    ├── notifications.js         ← Notification tray, toast dispatcher, reminders
    ├── analytics.js             ← Telemetry, scans, bookmark tracking & charts
    ├── resources.js             ← Resource Finder (30+ tools, wargames, certs)
    ├── news.js                  ← Threat intelligence feed & "Explain Simply" engine
    ├── ai-advisor.js            ← Gemini-powered interactive career mentorship chat
    ├── career-hub.js            ← 9 enterprise cybersecurity career pathways
    ├── quiz.js                  ← 8-topic assessment center & question banks
    ├── ai-quiz.js               ← Generative MCQ generator from text/URL with adaptive streaks
    ├── project-gen.js           ← Build Lab architecture & README generator
    ├── admin.js                 ← Admin CMS for tools, news, and moderation
    ├── learning-plan.js         ← AI learning plan generator & milestone tracker
    ├── dna.js                   ← Cyber DNA visual radar & 48-competency matrix
    ├── skillgap.js              ← Competency gap calculation vs 9 target roles
    └── profile-settings.js      ← Profile editor, avatar manager & data reset
```

---

## 🗺️ APP PAGES MAP (14 ACTIVE VIEWS)

| Page ID | Nav Label | JS Renderer | Purpose |
|---|---|---|---|
| `dashboard` | Dashboard | `renderDashboard()` | Personal hub, XP progress, domain scores, quick actions |
| `dna` | Cyber DNA | `renderDNA()` | Visual competency map across 8 domains (48 skills) |
| `advisor` | AI Advisor | `renderAIAdvisor()` | Multi-turn Gemini cybersecurity career mentorship chat |
| `learningPlan` | AI Learning Plan | `renderLearningPlan()` | 4-week personalized study plan & milestone tracker |
| `resources` | Resource Finder | `renderResources()` | 30+ curated tools, wargames, docs & cert recommendations |
| `projects` | Build Lab | `renderProjectGen()` | Cybersecurity project architecture & README generator |
| `quiz` | Practice / Quiz | `renderQuiz()` | Topic assessments + SIH26101 Generative AI Quiz generator |
| `careers` | Career Hub | `renderCareerHub()` | 9 enterprise cybersecurity career tracks & roadmaps |
| `skillgap` | Skill Gap Analysis | `renderSkillGap()` | Deficit calculations vs target career role prerequisites |
| `news` | Threat Intelligence | `renderNews()` | Live vulnerability disclosures & "Explain Simply" AI digest |
| `analytics` | Analytics | `renderAnalytics()` | Scans, bookmarks, activity graphs & security checks |
| `admin` | Admin CMS | `renderAdmin()` | Platform management for tools, news bulletins & users |
| `profile` | Profile | `renderProfile()` | Profile metadata, career goals & local storage reset |
| `settings` | Settings | `renderSettings()` | Language switcher (EN/HI) & notification preferences |

---

## 🗄️ FIREBASE / DATABASE SCHEMA

### Authentication
- Email/Password ✅
- Google OAuth ✅
- Protected routes via `requireAuth()` in auth.js

### Firestore Collections
```
users/{uid}
  displayName, email, role, bio, linkedin, github
  photoURL, createdAt, provider
  stats: { pw_check, url_scan, ai_view, bookmark,
           course_view, news_view, project_gen }

users/{uid}/pw_scans/{id}
  pw (masked), strength, entropy, createdAt

users/{uid}/url_scans/{id}
  url, danger, suspicious, triggers, createdAt

users/{uid}/bookmarks/{id}
  name, cat, url, createdAt

users/{uid}/saved_projects/{id}
  name, tagline, difficulty, time_estimate...
  savedAt

admin_tools/data       → { items: [...] }
admin_courses/data     → { items: [...] }
admin_news/data        → { items: [...] }
```

### Recommended Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
      match /{subcollection=**} {
        allow read, write: if request.auth != null
                           && request.auth.uid == userId;
      }
    }
    match /admin_{collection}/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### LocalStorage Keys (fallback when Firebase not configured)
```
cv_current_user          → logged in user object
cv_users                 → array of local users
cv_game_{uid}            → XP, badges, streak, quiz data
cv_stats_{uid}           → action counts
cv_notifs_{uid}          → notifications array
cv_admin_data_tools      → admin-added tools
cv_admin_data_courses    → admin-added courses
cv_admin_data_news       → admin-added news
cp_quiz_scores_{uid}     → topic quiz scores
cp_dna_{uid}             → DNA skill levels
cp_learning_plan_{uid}   → saved learning plan
cp_settings              → user preferences
cv_admin_{uid}           → admin role flag
```

---

## 🤖 AI INTEGRATION

### Claude AI (Anthropic)
- **Model**: `claude-sonnet-4-6`
- **Endpoint**: `https://api.anthropic.com/v1/messages`
- **Used in**:
  1. `ai-advisor.js` → Career advice chat
  2. `project-gen.js` → Project idea generation (JSON response)
  3. `learning-plan.js` → Weekly learning plan (JSON response)
  4. `news.js` → "Explain Simply" feature

### API Key Setup
```javascript
// js/firebase-config.js — add your key:
const ANTHROPIC_API_KEY = 'sk-ant-...';

// Then in each API call, add header:
headers: {
  'Content-Type': 'application/json',
  'x-api-key': ANTHROPIC_API_KEY,
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true'
}
```

### ⚠️ IMPORTANT: Never commit API keys to Git
Use environment variables or a backend proxy for production.

---

## 👥 TEAM DEVELOPMENT GUIDE

### PART 1 — AI + Learning Engine
**Files**: `ai-advisor.js`, `learning-plan.js`, `project-gen.js`, `quiz.js`
**Responsibilities**:
- Improve AI prompts for better responses
- Add more quiz questions (expand QUIZ_BANK)
- Build "What Should I Learn Next?" recommendation engine
- Add CyberPath Score improvements
- Integrate quiz results into learning plan recommendations

**Rules**:
- Never modify `firebase-config.js` without checking Part 3
- Keep AI prompt templates in their respective files
- All new XP actions must be added to `gamification.js → XP_ACTIONS`

---

### PART 2 — Resources + News + Admin CMS
**Files**: `resource-finder.js`, `learning-hub.js`, `news.js`, `admin.js`
**Responsibilities**:
- Expand resources database (target 500+)
- Add real news articles
- Build proper "Explain Simply" UI improvements
- Expand Admin CMS features (analytics, roadmap management)
- Add Firestore-backed content (move hardcoded data to Firestore)

**Rules**:
- Do NOT fake URLs — only real, verified resources
- News must be real — no fabricated articles
- Admin routes must be double-checked with Firestore rules
- Keep `renderFinder()` and `filterAI()` function signatures stable

---

### PART 3 — Platform + UI/UX + Firebase
**Files**: `main.js`, `auth.js`, `firebase-config.js`, `analytics.js`, `gamification.js`, `notifications.js`, `css/style.css`, `auth.html`, `app.html`
**Responsibilities**:
- Firebase security rules (production-ready)
- Performance: lazy loading, pagination
- Mobile responsiveness improvements
- Accessibility (ARIA labels, keyboard nav)
- Analytics improvements
- PWA setup (service worker, manifest)
- Deploy to Vercel/Firebase Hosting

**Rules**:
- Never break `navigate(page)` function signature
- `CV_USER` object structure must stay stable
- `FS.*` helpers must maintain their signatures
- Test auth flow after every Firebase change

---

## ✅ WHAT IS WORKING

| Feature | Status | Notes |
|---------|--------|-------|
| Email/Password Auth | ✅ | Local + Firebase |
| Google OAuth | ✅ | Requires Firebase setup |
| Protected Routes | ✅ | requireAuth() guard |
| AI Career Advisor | ✅ | Requires API key |
| Career Hub (9 tracks) | ✅ | Fully hardcoded, stable |
| AI Project Generator | ✅ | Requires API key |
| AI Learning Plan | ✅ | Requires API key |
| Quiz System (8 topics) | ✅ | 50+ questions |
| Cyber DNA | ✅ | Self-assessment + quiz sync |
| Skill Gap Analysis | ✅ | vs 9 career roles |
| Gamification (XP/badges) | ✅ | 11 levels, 20 badges |
| Notifications | ✅ | Toast + bell panel |
| Learning Hub | ✅ | 106+ courses |
| Resource Finder | ✅ | 250+ tools |
| Cyber News | ✅ | Static articles |
| Explain Simply | ✅ | Requires API key |
| Admin CMS | ✅ | Local + Firebase |
| Dashboard | ✅ | Full stats |
| Profile Management | ✅ | Edit + save |
| Settings | ✅ | Preferences |
| Analytics | ✅ | Charts + history |
| CyberPath Score | ✅ | 0-1000 metric |

---

## ⚠️ KNOWN LIMITATIONS

1. **API Key in Frontend** — Claude API key exposed in browser. Use a backend proxy in production.
2. **News is static** — Real-time news requires news API (NewsAPI, etc.)
3. **Port Scanner** — Browser-based, only works on localhost
4. **No PWA yet** — No service worker or web manifest
5. **No email verification** — Firebase email verification not implemented
6. **Admin auth** — Frontend-only check; needs Firestore rules for production
7. **No pagination** — Resource finder loads all items at once

---

## 🚀 DEPLOYMENT

### Vercel (Recommended)
```bash
# Option 1: Drag & Drop
# Go to vercel.com → New Project → drag CyberPath folder

# Option 2: CLI
npm install -g vercel
cd CyberPath
vercel
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Public directory: . (current)
firebase deploy
```

### Environment Variables Required
```
ANTHROPIC_API_KEY   → Claude AI features
FIREBASE_API_KEY    → Firebase config
```

---

## 🧪 TESTING CHECKLIST

- [ ] Auth: Signup with email → login → logout → login again
- [ ] Auth: Google login button
- [ ] AI Advisor: Type "I want to become a SOC Analyst" → get response
- [ ] Career Hub: Open SOC Analyst → see full roadmap
- [ ] Project Gen: Select options → generate → see result
- [ ] Learning Plan: Fill form → generate → see weekly plan
- [ ] Quiz: Select Networking → answer 8 questions → see results
- [ ] DNA: Set skill levels → see radar chart update
- [ ] Skill Gap: Select SOC Analyst → see gap analysis
- [ ] News: Click "Explain Simply" → see AI explanation
- [ ] Gamification: Complete quiz → see XP + badge earned
- [ ] Dashboard: All stats showing correctly
- [ ] Admin: Login as admin email → manage tools/courses
- [ ] Mobile: All pages responsive on 375px width

---

## 🔗 GIT BRANCHING RECOMMENDATION

```
main              → Production (always stable)
├── dev           → Integration branch
│   ├── feat/ai   → Part 1: AI + Learning Engine
│   ├── feat/cms  → Part 2: Resources + Admin
│   └── feat/ux   → Part 3: Platform + UI/UX
```

**Rules**:
- Never commit directly to `main`
- All PRs must be reviewed before merging to `dev`
- `feat/ai` must not modify CSS files
- `feat/cms` must not modify auth logic
- `feat/ux` must announce any breaking changes to navigate() or CV_USER

---

*CyberPath — Your Path to Cybersecurity Mastery*
