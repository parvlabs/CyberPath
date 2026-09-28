/* ══════════════════════════════════════════════
   CYBERPATH — AI-CONFIG.JS
   Gemini API Configuration (FREE)
   Get your key: aistudio.google.com
══════════════════════════════════════════════ */

const DEFAULT_GEMINI_KEY = 'YOUR_GEMINI_API_KEY_HERE';

let _activeGeminiKey = DEFAULT_GEMINI_KEY;
try {
  const _stored = localStorage.getItem('cp_gemini_api_key');
  if (_stored && _stored !== 'YOUR_GEMINI_API_KEY_HERE' && !_stored.includes('YOUR_GEMINI') && _stored.trim().length > 10) {
    _activeGeminiKey = _stored.trim();
  } else {
    _activeGeminiKey = DEFAULT_GEMINI_KEY;
  }
} catch (e) {
  _activeGeminiKey = DEFAULT_GEMINI_KEY;
}

const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3.6-flash',
  'gemini-3.8-flash'
];

const AI_CONFIG = {
  GEMINI_API_KEY: _activeGeminiKey,
  MODEL: CANDIDATE_MODELS[0],
  MODELS: CANDIDATE_MODELS,
  ENDPOINT: `https://generativelanguage.googleapis.com/v1beta/models/${CANDIDATE_MODELS[0]}:generateContent`,
};
window.AI_CONFIG = AI_CONFIG;

window.isGeminiConfigured = function() {
  const k = window.AI_CONFIG?.GEMINI_API_KEY || localStorage.getItem('cp_gemini_api_key');
  return !!(k && k !== 'YOUR_GEMINI_API_KEY_HERE' && !k.includes('YOUR_GEMINI') && k.trim().length > 10);
};

window.setGeminiApiKey = function(key) {
  const k = (key || '').trim();
  if (k && k !== 'YOUR_GEMINI_API_KEY_HERE') {
    localStorage.setItem('cp_gemini_api_key', k);
    AI_CONFIG.GEMINI_API_KEY = k;
    if (typeof showToast === 'function') showToast('✅ Gemini API Key saved successfully!', 'success');
    localStorage.removeItem('cp_gemini_api_key');
    AI_CONFIG.GEMINI_API_KEY = DEFAULT_GEMINI_KEY;
    if (typeof showToast === 'function') showToast('Gemini API Key removed', 'info');
  }
  const statusElem = document.getElementById('advisorApiStatus');
  if (statusElem) {
    if (window.isGeminiConfigured()) {
      statusElem.innerHTML = `<div class="advisor-key-ok">✅ Gemini AI Ready · Connected</div>`;
    } else {
      statusElem.innerHTML = `<div class="advisor-no-key">⚠️ No API key set<br><a href="https://aistudio.google.com/app/apikey" target="_blank">Get FREE Gemini key →</a><br><small>Add in Settings</small></div>`;
    }
  }
};

/* ── UNIFIED AI CALL (replaces all Anthropic calls) ── */
window.callAI = async function(systemPrompt, userMessage, maxTokens = 1000) {
  if (!window.isGeminiConfigured()) {
    throw new Error('NO_API_KEY');
  }

  const payload = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature: 0.7,
    },
  };

  const key = AI_CONFIG.GEMINI_API_KEY;
  let lastError = null;

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }

      if (response.status === 400) throw new Error('INVALID_KEY');
      if (response.status === 429) {
        lastError = new Error('RATE_LIMIT');
        continue;
      }
      if (response.status === 503 || response.status === 500 || response.status === 404) {
        lastError = new Error('OVERLOADED');
        continue;
      }
      lastError = new Error('API_ERROR_' + response.status);
    } catch (err) {
      if (err.message === 'INVALID_KEY') throw err;
      lastError = err;
    }
  }

  throw lastError || new Error('API_ERROR_503');
};

/* ── MULTI-TURN CHAT (for AI Advisor) ── */
window.callAIChat = async function(systemPrompt, history, maxTokens = 1000) {
  if (!window.isGeminiConfigured()) {
    throw new Error('NO_API_KEY');
  }

  // Convert history to Gemini format
  const contents = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  const payload = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature: 0.8,
    },
  };

  const key = AI_CONFIG.GEMINI_API_KEY;
  let lastError = null;

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }

      if (response.status === 400) throw new Error('INVALID_KEY');
      if (response.status === 429) {
        lastError = new Error('RATE_LIMIT');
        continue;
      }
      if (response.status === 503 || response.status === 500 || response.status === 404) {
        lastError = new Error('OVERLOADED');
        continue;
      }
      lastError = new Error('API_ERROR_' + response.status);
    } catch (err) {
      if (err.message === 'INVALID_KEY') throw err;
      lastError = err;
    }
  }

  throw lastError || new Error('API_ERROR_503');
};

/* ── ERROR MESSAGE HELPER ── */
window.getAIErrorMessage = function(errorCode) {
  const messages = {
    'NO_API_KEY':    '⚠️ Gemini API key not set. Add your free key in js/ai-config.js\n\nGet free key at: aistudio.google.com/app/apikey',
    'INVALID_KEY':   '❌ Invalid API key. Check your key at aistudio.google.com',
    'RATE_LIMIT':    '⏳ Rate limit reached. Wait a moment and try again. (Gemini free tier: 15 requests/min)',
    'OVERLOADED':    '⏳ Google Gemini servers are temporarily busy. Retrying...',
    'EMPTY_RESPONSE':'⚠️ AI returned empty response. Please try again.',
  };
  return messages[errorCode] || '❌ AI error. Please try again.';
};
