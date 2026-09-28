/* ══════════════════════════════════════════════
   CYBERPATH — AI-QUIZ.JS
   AI-generated quizzes from user-provided text/URL
   Adaptive difficulty (next Q scales with streak)
   SIH26101: "AI-powered generation of MCQs from uploaded content"
   ══════════════════════════════════════════════ */

const AI_QUIZ = {
  state: {
    questions: [],
    currentIdx: 0,
    score: 0,
    streak: 0,           // correct in a row → drives difficulty
    difficulty: 'medium',// easy / medium / hard
    topic: 'AI Generated',
    source: '',
    adaptive: true,
    completed: false,
    answers: [],
  },

  DIFFICULTY_PROMPT: {
    easy:   'Beginner-friendly: definitions, basic concepts, simple recall. Avoid trick questions.',
    medium: 'Intermediate: applied knowledge, scenario-based, requires understanding not just memorization.',
    hard:   'Advanced/expert: edge cases, comparison, deep reasoning, real-world scenarios requiring synthesis.'
  },

  /**
   * Generate quiz from text/URL using Gemini
   */
  async generate({ input, numQuestions = 8, startDifficulty = 'medium', adaptive = true }) {
    this.reset();
    this.state.adaptive = adaptive;
    this.state.difficulty = startDifficulty;

    let sourceText = input.trim();

    // If it's a URL, try to extract content hint
    const isUrl = /^https?:\/\//i.test(sourceText);
    if (isUrl) {
      this.state.source = sourceText;
      sourceText = `[Source URL: ${sourceText}]\n\nNote: We cannot fetch the URL directly. Generate quiz questions based on the topic implied by the URL and any general cybersecurity knowledge relevant to it. If the URL looks like a known security resource, generate questions about its typical content.`;
    } else {
      this.state.source = 'User-provided text';
      if (sourceText.length < 200) throw new Error('SHORT_TEXT');
    }

    const lang = I18N?.current || 'en';
    const sysPrompt = `You are CyberPath AI Quiz Generator — an expert educator who creates high-quality multiple-choice questions on cybersecurity topics.

CRITICAL RULES:
1. Difficulty: ${this.DIFFICULTY_PROMPT[startDifficulty]}
2. Generate EXACTLY ${numQuestions} questions
3. Each question has exactly 4 options (A/B/C/D)
4. Only ONE option is correct
5. Include a brief explanation for each correct answer
6. Questions must be factually accurate
7. NO trick questions
8. Output language: ${lang === 'hi' ? 'Hindi (Devanagari)' : 'English'}
9. Topic should be inferred from the source — if unclear, default to general cybersecurity

RESPOND IN THIS EXACT JSON FORMAT ONLY (no markdown, no extra text):
{
  "topic": "Short topic name",
  "questions": [
    {
      "q": "Question text",
      "opts": ["Option A", "Option B", "Option C", "Option D"],
      "ans": 0,
      "exp": "Brief explanation of why the answer is correct",
      "difficulty": "${startDifficulty}"
    }
  ]
}`;

    const userMsg = `Generate ${numQuestions} ${startDifficulty}-level cybersecurity MCQs based on this input:\n\n${sourceText.substring(0, 3000)}`;

    try {
      const raw = await callAI(sysPrompt, userMsg, 1500);
      const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);

      if (!parsed.questions || !Array.isArray(parsed.questions)) throw new Error('PARSE_ERROR');

      // Normalize
      this.state.questions = parsed.questions.slice(0, numQuestions).map(q => ({
        q: String(q.q || '').trim(),
        opts: Array.isArray(q.opts) ? q.opts.slice(0, 4).map(o => String(o)) : [],
        ans: Number.isInteger(q.ans) && q.ans >= 0 && q.ans <= 3 ? q.ans : 0,
        exp: String(q.exp || ''),
        difficulty: q.difficulty || startDifficulty
      })).filter(q => q.q && q.opts.length === 4);

      if (this.state.questions.length === 0) throw new Error('NO_VALID_QUESTIONS');
      this.state.topic = parsed.topic || 'AI Generated';
      this.state.isFallback = false;
      return this.state;
    } catch(err) {
      if (err.message === 'NO_API_KEY' || err.message === 'INVALID_KEY') {
        // Transparent fallback: provide clearly labeled offline practice quiz
        const bank = window.QUIZ_BANK || {};
        const lower = sourceText.toLowerCase();
        let topicKey = 'concepts';
        if (lower.includes('network') || lower.includes('packet') || lower.includes('ip')) topicKey = 'networking';
        else if (lower.includes('linux') || lower.includes('bash')) topicKey = 'linux';
        else if (lower.includes('web') || lower.includes('xss') || lower.includes('sql')) topicKey = 'web';
        else if (lower.includes('crypto') || lower.includes('encrypt')) topicKey = 'crypto';
        else if (lower.includes('malware') || lower.includes('ransomware')) topicKey = 'malware';
        else if (lower.includes('cloud') || lower.includes('aws')) topicKey = 'cloud';
        else if (lower.includes('soc') || lower.includes('blue')) topicKey = 'soc';

        const pool = bank[topicKey] || bank.networking || [];
        this.state.questions = pool.slice(0, numQuestions).map(q => ({
          ...q,
          difficulty: startDifficulty
        }));
        this.state.topic = `${topicKey.toUpperCase()} (Offline Reference)`;
        this.state.isFallback = true;
        this.state.fallbackReason = err.message;
        return this.state;
      }
      throw err;
    }
  },

  /**
   * Answer current question; returns whether to escalate/de-escalate next difficulty
   */
  answer(selectedIdx) {
    const q = this.state.questions[this.state.currentIdx];
    if (!q) return null;

    const correct = selectedIdx === q.ans;
    this.state.answers.push({ q: q.q, selected: selectedIdx, correct: q.ans, isCorrect: correct, difficulty: q.difficulty });

    if (correct) {
      this.state.score++;
      this.state.streak++;
    } else {
      this.state.streak = 0;
    }

    // Adaptive: pick next question difficulty based on streak
    let nextDiff = q.difficulty;
    if (this.state.adaptive && this.state.currentIdx < this.state.questions.length - 1) {
      if (this.state.streak >= 3 && q.difficulty === 'easy')   nextDiff = 'medium';
      else if (this.state.streak >= 3 && q.difficulty === 'medium') nextDiff = 'hard';
      else if (this.state.streak === 0 && q.difficulty === 'hard') nextDiff = 'medium';
      else if (this.state.streak === 0 && q.difficulty === 'medium') nextDiff = 'easy';

      // Mark a difficulty on each remaining question
      const next = this.state.questions[this.state.currentIdx + 1];
      if (next && !next.difficulty) next.difficulty = nextDiff;
    }

    return { correct, streak: this.state.streak, nextDifficulty: nextDiff };
  },

  next() {
    this.state.currentIdx++;
    if (this.state.currentIdx >= this.state.questions.length) {
      this.state.completed = true;
    }
    return this.state;
  },

  reset() {
    this.state = {
      questions: [], currentIdx: 0, score: 0, streak: 0,
      difficulty: 'medium', topic: 'AI Generated', source: '',
      adaptive: true, completed: false, answers: []
    };
  },

  getCurrent() {
    return this.state.questions[this.state.currentIdx] || null;
  },

  getProgress() {
    return {
      current: this.state.currentIdx + 1,
      total: this.state.questions.length,
      score: this.state.score,
      streak: this.state.streak,
      pct: this.state.questions.length
        ? Math.round((this.state.score / this.state.questions.length) * 100)
        : 0
    };
  }
};

window.AI_QUIZ = AI_QUIZ;
