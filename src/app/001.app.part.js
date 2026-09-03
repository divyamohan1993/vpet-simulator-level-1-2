import {
  SECTION_META,
  SECTION_ORDER,
  TEST_FORMS,
  countSectionUnits,
  countTotalUnits,
  getSectionItems,
  scoreUnits,
  verifyFormStructure
} from './data.js';
import { scoreAttempt, wordCount } from './scoring.js';

const app = document.querySelector('#app');
const STORAGE_KEYS = {
  settings: 'vpet-l2-settings-v1',
  history: 'vpet-l2-history-v1',
  active: 'vpet-l2-active-v1'
};
const timeScale = new URLSearchParams(window.location.search).get('fast') === '1' ? 0.025 : 1;

const SECTION_ADVICE = {
  A: 'Practise collocations and use the whole sentence to test both meaning and grammar before entering one word.',
  B: 'Read for actors, action, quantities, cause, and result. Rebuild meaning instead of trying to memorize exact wording.',
  C: 'Separate stated facts from plausible assumptions. Locate the sentence that proves each option before selecting it.',
  D: 'Spend the first minute mapping every requested point. Use direct subject lines, short paragraphs, and a clear action deadline.',
  E: 'Hold the sentence in meaningful chunks. Preserve small grammatical words, endings, numbers, and negatives.',
  F: 'Identify the speaker’s communicative purpose first: request, apology, update, invitation, location, or opinion.',
  G: 'Listen for who, what changed, why, and the measurable result. Answer only the question asked.',
  H: 'Repeat in thought groups rather than isolated words. Keep function words and endings even when the sentence is long.',
  I: 'Use a three-part response: acknowledge, explain, and propose action. Address the listener directly and finish decisively.',
  J: 'Retell in chronological order: setting, disruption, response, and outcome. Include key facts rather than commentary.'
};

const state = {
  view: 'home',
  mode: 'full',
  formId: 'A',
  sectionCode: null,
  strictMode: true,
  requestFullscreen: true,
  candidateId: createCandidateId(),
  audioRate: 0.96,
  setup: {
    audioOk: false,
    micOk: false,
    consent: false,
    message: ''
  },
  micStream: null,
  currentItems: [],
  currentIndex: 0,
  answers: {},
  showInstruction: true,
  startedAt: null,
  result: null,
  resultSaved: false,
  history: loadJson(STORAGE_KEYS.history, []),
  settings: loadJson(STORAGE_KEYS.settings, {}),
  reviewOpen: false
};

if (Number.isFinite(Number(state.settings.audioRate))) {
  state.audioRate = Number(state.settings.audioRate);
}
if (typeof state.settings.strictMode === 'boolean') {
  state.strictMode = state.settings.strictMode;
}

let activeCleanup = () => {};
let playbackUrls = [];

function loadJson(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The simulator remains usable when storage is disabled.
  }
}

function createCandidateId() {
  const stamp = Date.now().toString(36).slice(-5).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VP2-${stamp}-${random}`;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatClock(totalSeconds) {
  const safe = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatDuration(milliseconds) {
  const seconds = Math.max(0, Math.round(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes ? `${minutes}m ${remainder}s` : `${remainder}s`;
}

function dateLabel(value) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value));
  } catch {
    return String(value);
  }
}

function icon(name, className = '') {
  const icons = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    audio: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M5 19h14"/>',
    expand: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    mic: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
    play: '<path d="m8 5 11 7-11 7V5Z"/>',
    print: '<path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/>',
    shield: '<path d="M12 3 4 6v5c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="1"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/>',
    warning: '<path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/>'
  };
  return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name] ?? icons.info}</svg>`;
}

function setCleanup(cleanup) {
  activeCleanup();
  activeCleanup = typeof cleanup === 'function' ? cleanup : () => {};
}

function stopMediaStream() {
  if (state.micStream) {
    state.micStream.getTracks().forEach((track) => track.stop());
    state.micStream = null;
  }
}

function revokePlaybackUrls() {
  playbackUrls.forEach((url) => URL.revokeObjectURL(url));
  playbackUrls = [];
}

function browserSupport() {
  return {
    speech: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    media: Boolean(navigator.mediaDevices?.getUserMedia && window.MediaRecorder),
    recognition: Boolean(window.SpeechRecognition || window.webkitSpeechRecognition),
    storage: (() => {
      try {
        const key = '__vpet_check__';
        localStorage.setItem(key, '1');
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    })()
  };
}

function selectEnglishVoice() {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  const preferred = [
    (voice) => /^en-GB/i.test(voice.lang) && /natural|enhanced|premium/i.test(voice.name),
    (voice) => /^en-US/i.test(voice.lang) && /natural|enhanced|premium/i.test(voice.name),
    (voice) => /^en-GB/i.test(voice.lang),
    (voice) => /^en-US/i.test(voice.lang),
    (voice) => /^en/i.test(voice.lang)
  ];
  for (const matcher of preferred) {
    const match = voices.find(matcher);
    if (match) return match;
  }
  return voices[0] ?? null;
}

function speak(text, options = {}) {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis is not supported in this browser.'));
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.lang = options.lang ?? 'en-GB';
    utterance.rate = options.rate ?? state.audioRate;
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;
    const voice = selectEnglishVoice();
    if (voice) utterance.voice = voice;

    let settled = false;
    const finish = (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(watchdog);
      error ? reject(error) : resolve();
    };

    utterance.onend = () => finish();
    utterance.onerror = (event) => {
      if (event.error === 'canceled' || event.error === 'interrupted') finish();
      else finish(new Error(`Audio playback failed: ${event.error || 'unknown error'}`));
    };

    const watchdog = window.setTimeout(
      () => finish(),
      Math.min(45_000, Math.max(5_000, String(text).length *