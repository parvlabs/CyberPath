/* ══════════════════════════════════════════════
   CYBERPATH — I18N.JS
   Multi-language support (English + Hindi + auto-detect)
   Static translations + Gemini-powered dynamic translation
   ══════════════════════════════════════════════ */

const I18N = {
  current: 'en',
  supported: ['en', 'hi'],
  static: {
    en: {
      // Navigation
      'nav.dashboard':      'Dashboard',
      'nav.dna':            'Cyber DNA',
      'nav.advisor':        'AI Advisor',
      'nav.plan':           'AI Learning Plan',
      'nav.resources':      'Resource Finder',
      'nav.quiz':           'Practice / Quiz',
      'nav.projects':       'Projects / Build Lab',
      'nav.careers':        'Career Hub',
      'nav.skillgap':       'Skill Gap Analysis',
      'nav.news':           'Threat Intelligence',
      'nav.analytics':      'Analytics',
      'nav.admin':          'Admin CMS',
      'nav.profile':        'Profile',
      'nav.settings':       'Settings',
      'nav.logout':         'Sign Out',

      // Page titles
      'page.dashboard':     'Dashboard',
      'page.advisor':       'AI Advisor',
      'page.plan':          'AI Learning Plan',
      'page.dna':           'Cyber DNA',
      'page.careers':       'Cybersecurity Career Tracks',
      'page.skillgap':      'Skill Gap Analysis',
      'page.resources':     'Security & AI Resource Library',
      'page.projects':      'Build Lab',
      'page.quiz':          'Practice Center',
      'page.news':          'Threat Intelligence',
      'page.analytics':     'Activity Stats & Security Telemetry',
      'page.admin':         'Admin Dashboard',
      'page.profile':       'Profile',
      'page.settings':      'Settings',

      // Common
      'common.search':      'Search',
      'common.loading':     'Loading...',
      'common.save':        'Save',
      'common.cancel':      'Cancel',
      'common.delete':      'Delete',
      'common.edit':        'Edit',
      'common.add':         'Add',
      'common.next':        'Next',
      'common.back':        'Back',
      'common.submit':      'Submit',
      'common.generate':    'Generate',
      'common.regenerate':  'Regenerate',
      'common.retry':       'Retry',
      'common.score':       'Score',
      'common.streak':      'Streak',
      'common.level':       'Level',
      'common.xp':          'XP',
      'common.badges':      'Badges',
      'common.days':        'days',
      'common.complete':    'Complete',
      'common.in_progress': 'In Progress',
      'common.locked':      'Locked',

      // Quiz
      'quiz.select_topic':  'Select a Topic to Practice',
      'quiz.start':         'Start Quiz',
      'quiz.correct':       'Correct!',
      'quiz.wrong':         'Wrong!',
      'quiz.explanation':   'Explanation',
      'quiz.next_q':        'Next Question',
      'quiz.results':       'See Results',
      'quiz.perfect':       'Perfect score! No weak areas.',
      'quiz.weak_areas':    'Weak Areas — Needs Attention',
      'quiz.retry':         'Retry Topic',
      'quiz.other_topics':  'Other Topics',
      'quiz.gen_title':     'AI Quiz Generator',
      'quiz.gen_sub':       'Paste any cybersecurity article / notes / URL — AI generates MCQs',
      'quiz.gen_placeholder':'Paste your text here (min 200 chars) or enter a URL...',
      'quiz.gen_btn':       '⚡ Generate Quiz',
      'quiz.adaptive':      'Adaptive difficulty (next Q harder if you ace it)',

      // Advisor
      'adv.welcome':        'Namaste! I am your personal cybersecurity career guide.',
      'adv.placeholder':    'Ask anything about cybersecurity careers...',

      // Settings
      'set.title':          'Settings',
      'set.language':       'Language',
      'set.lang.en':        'English',
      'set.lang.hi':        'हिन्दी (Hindi)',

      // Errors
      'err.no_api_key':     'API key not set. Add it in js/ai-config.js to enable AI features.',
      'err.no_text':        'Please paste some text or enter a URL first',
      'err.short_text':     'Text too short — minimum 200 characters',
      'err.network':        'Connection error. Check internet and try again.',
    },

    hi: {
      // Navigation
      'nav.dashboard':      'डैशबोर्ड',
      'nav.dna':            'साइबर डीएनए',
      'nav.advisor':        'एआई सलाहकार',
      'nav.plan':           'एआई लर्निंग प्लान',
      'nav.resources':      'संसाधन खोजक',
      'nav.quiz':           'अभ्यास / क्विज़',
      'nav.projects':       'प्रोजेक्ट / बिल्ड लैब',
      'nav.careers':        'करियर हब',
      'nav.skillgap':       'स्किल गैप विश्लेषण',
      'nav.news':           'थ्रेट इंटेलिजेंस',
      'nav.analytics':      'एनालिटिक्स',
      'nav.admin':          'एडमिन',
      'nav.profile':        'प्रोफ़ाइल',
      'nav.settings':       'सेटिंग्स',
      'nav.logout':         'साइन आउट',

      // Page titles
      'page.dashboard':     'डैशबोर्ड',
      'page.advisor':       'एआई सलाहकार',
      'page.plan':          'एआई लर्निंग प्लान',
      'page.dna':           'साइबर डीएनए',
      'page.careers':       'साइबर सुरक्षा करियर ट्रैक',
      'page.skillgap':      'स्किल गैप विश्लेषण',
      'page.resources':     'सुरक्षा और एआई संसाधन',
      'page.projects':      'बिल्ड लैब',
      'page.quiz':          'अभ्यास केंद्र',
      'page.news':          'थ्रेट इंटेलिजेंस',
      'page.analytics':     'गतिविधि सांख्यिकी',
      'page.admin':         'एडमिन डैशबोर्ड',
      'page.profile':       'प्रोफ़ाइल',
      'page.settings':      'सेटिंग्स',

      // Common
      'common.search':      'खोजें',
      'common.loading':     'लोड हो रहा है...',
      'common.save':        'सेव करें',
      'common.cancel':      'रद्द करें',
      'common.delete':      'हटाएं',
      'common.edit':        'संपादित करें',
      'common.add':         'जोड़ें',
      'common.next':        'अगला',
      'common.back':        'वापस',
      'common.submit':      'जमा करें',
      'common.generate':    'बनाएं',
      'common.regenerate':  'फिर से बनाएं',
      'common.retry':       'पुनः प्रयास',
      'common.score':       'स्कोर',
      'common.streak':      'स्ट्रीक',
      'common.level':       'स्तर',
      'common.xp':          'एक्सपी',
      'common.badges':      'बैज',
      'common.days':        'दिन',
      'common.complete':    'पूर्ण',
      'common.in_progress': 'जारी',
      'common.locked':      'बंद',

      // Quiz
      'quiz.select_topic':  'अभ्यास के लिए विषय चुनें',
      'quiz.start':         'क्विज़ शुरू करें',
      'quiz.correct':       'सही!',
      'quiz.wrong':         'गलत!',
      'quiz.explanation':   'व्याख्या',
      'quiz.next_q':        'अगला प्रश्न',
      'quiz.results':       'परिणाम देखें',
      'quiz.perfect':       'बेहतरीन स्कोर! कोई कमज़ोर क्षेत्र नहीं।',
      'quiz.weak_areas':    'कमज़ोर क्षेत्र — ध्यान देने योग्य',
      'quiz.retry':         'पुनः प्रयास',
      'quiz.other_topics':  'अन्य विषय',
      'quiz.gen_title':     'एआई क्विज़ जेनरेटर',
      'quiz.gen_sub':       'कोई भी साइबर सुरक्षा लेख / नोट्स चिपकाएं — एआई प्रश्न बनाएगा',
      'quiz.gen_placeholder':'अपना टेक्स्ट यहां पेस्ट करें (न्यूनतम 200 अक्षर) या URL दर्ज करें...',
      'quiz.gen_btn':       '⚡ क्विज़ बनाएं',
      'quiz.adaptive':      'अनुकूली कठिनाई (सही जवाब पर अगला प्रश्न कठिन)',

      // Gamification
      // Advisor
      'adv.welcome':        'नमस्ते! मैं आपका साइबर सुरक्षा करियर गाइड हूं।',
      'adv.placeholder':    'साइबर सुरक्षा करियर के बारे में कुछ भी पूछें...',

      // Settings
      'set.title':          'सेटिंग्स',
      'set.language':       'भाषा',
      'set.lang.en':        'English',
      'set.lang.hi':        'हिन्दी',

      // Errors
      'err.no_api_key':     'एपीआई कुंजी सेट नहीं है। एआई सुविधाओं के लिए js/ai-config.js में जोड़ें।',
      'err.no_text':        'कृपया पहले कोई टेक्स्ट या URL दर्ज करें',
      'err.short_text':     'टेक्स्ट बहुत छोटा है — न्यूनतम 200 अक्षर',
      'err.network':        'कनेक्शन त्रुटि। इंटरनेट जांचें और पुनः प्रयास करें।',
    }
  },

  init() {
    const saved = localStorage.getItem('cp_language');
    if (saved && this.supported.includes(saved)) {
      this.current = saved;
    } else {
      // Auto-detect from browser
      const browserLang = (navigator.language || 'en').split('-')[0];
      if (this.supported.includes(browserLang)) this.current = browserLang;
    }
    return this.current;
  },

  set(lang) {
    if (!this.supported.includes(lang)) return;
    this.current = lang;
    localStorage.setItem('cp_language', lang);
    this.applyToDOM();
    document.documentElement.lang = lang;
  },

  t(key, fallback) {
    return this.static[this.current]?.[key] ?? fallback ?? key;
  },

  applyToDOM() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const txt = this.t(key, el.textContent);
      if (txt) el.textContent = txt;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      el.placeholder = this.t(key, el.placeholder);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      el.title = this.t(key, el.title);
    });

    // Auto-translate sidebar navigation items
    document.querySelectorAll('.nav-link-item[data-page]').forEach(link => {
      const page = link.dataset.page;
      const label = link.querySelector('.nav-item-label');
      if (label) {
        const key = 'nav.' + (page === 'learningPlan' ? 'plan' : page);
        const txt = this.t(key);
        if (txt) label.textContent = txt;
      }
    });

    // Auto-translate sidebar navigation group titles
    const groupTitles = {
      'Overview': { en: 'Overview', hi: 'अवलोकन' },
      'Learning': { en: 'Learning', hi: 'सीखें' },
      'Resources': { en: 'Resources', hi: 'संसाधन' },
      'Practice': { en: 'Practice', hi: 'अभ्यास' },
      'Career': { en: 'Career', hi: 'करियर' },
      'Intelligence': { en: 'Intelligence', hi: 'इंटेलिजेंस' },
      'Platform': { en: 'Platform', hi: 'प्लेटफ़ॉर्म' },
    };
    document.querySelectorAll('.nav-group-title').forEach(el => {
      const orig = el.dataset.origTitle || el.textContent.trim();
      el.dataset.origTitle = orig;
      if (groupTitles[orig]) {
        el.textContent = groupTitles[orig][this.current] || orig;
      }
    });
  },

  /**
   * Use Gemini to translate arbitrary text (fallback when no static key exists)
   */
  async translateText(text, targetLang) {
    if (targetLang === 'en' || !text) return text;
    try {
      return await callAI(
        `You are a professional translator. Translate the following UI strings to ${targetLang === 'hi' ? 'Hindi (Devanagari script)' : targetLang}. Keep technical terms (HTML, CSS, JS, API) in English. Return ONLY the translated strings, preserving JSON structure if present.`,
        text,
        500
      );
    } catch(e) {
      return text; // graceful fallback
    }
  }
};

window.I18N = I18N;
