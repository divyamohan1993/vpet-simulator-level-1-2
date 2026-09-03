const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'but', 'by',
  'can', 'could', 'do', 'for', 'from', 'had', 'has', 'have', 'he', 'her', 'him', 'his',
  'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'may', 'more', 'must', 'not', 'of',
  'on', 'or', 'our', 'please', 'she', 'should', 'so', 'that', 'the', 'their', 'them',
  'they', 'this', 'to', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while',
  'who', 'why', 'will', 'with', 'would', 'you', 'your'
]);

export const SKILL_NAMES = ['Reading', 'Writing', 'Listening', 'Speaking'];

const SECTION_SKILLS = {
  A: ['Reading', 'Writing'],
  B: ['Reading', 'Writing'],
  C: ['Reading'],
  D: ['Writing'],
  E: ['Listening', 'Writing'],
  F: ['Listening'],
  G: ['Listening', 'Speaking'],
  H: ['Listening', 'Speaking'],
  I: ['Speaking'],
  J: ['Listening', 'Speaking']
};

export function normalizeText(value = '') {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\bcan't\b/g, 'cannot')
    .replace(/\bn't\b/g, ' not')
    .replace(/\b're\b/g, ' are')
    .replace(/\b've\b/g, ' have')
    .replace(/\b'll\b/g, ' will')
    .replace(/\b'd\b/g, ' would')
    .replace(/\b'm\b/g, ' am')
    .replace(/[^a-z0-9£%']+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function words(value = '') {
  const normalized = normalizeText(value);
  return normalized ? normalized.split(' ') : [];
}

export function wordCount(value = '') {
  return words(value).length;
}

export function levenshteinDistance(left = '', right = '') {
  const a = Array.isArray(left) ? left : words(left);
  const b = Array.isArray(right) ? right : words(right);
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      const substitution = previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, substitution);
    }
    previous = current;
  }
  return previous[b.length];
}

export function sequenceSimilarity(left = '', right = '') {
  const a = words(left);
  const b = words(right);
  if (!a.length && !b.length) return 1;
  if (!a.length || !b.length) return 0;
  return Math.max(0, 1 - levenshteinDistance(a, b) / Math.max(a.length, b.length));
}

export function tokenOverlap(left = '', right = '') {
  const leftTokens = new Set(words(left).filter((token) => !STOP_WORDS.has(token)));
  const rightTokens = new Set(words(right).filter((token) => !STOP_WORDS.has(token)));
  if (!leftTokens.size || !rightTokens.size) return 0;
  let intersection = 0;
  for (const token of leftTokens) {
    if (rightTokens.has(token)) intersection += 1;
  }
  return intersection / Math.max(leftTokens.size, rightTokens.size);
}

function clamp(value, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function phrasePresent(text, phrase) {
  const normalizedText = ` ${normalizeText(text)} `;
  const normalizedPhrase = normalizeText(phrase);
  return normalizedPhrase.length > 0 && normalizedText.includes(` ${normalizedPhrase} `);
}

export function keywordGroupCoverage(text, groups = []) {
  if (!groups.length) return 0;
  const normalized = normalizeText(text);
  if (!normalized) return 0;

  let covered = 0;
  for (const group of groups) {
    const alternatives = Array.isArray(group) ? group : [group];
    if (alternatives.some((term) => phrasePresent(normalized, term))) covered += 1;
  }
  return covered / groups.length;
}

function contentWords(text) {
  return words(text).filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

export function requirementCoverage(response, requirements = []) {
  if (!requirements.length) return 0;
  const responseTokens = new Set(contentWords(response));
  const normalizedResponse = normalizeText(response);
  let total = 0;

  for (const requirement of requirements) {
    const terms = [...new Set(contentWords(requirement))];
    if (!terms.length) continue;
    const hits = terms.filter((term) => responseTokens.has(term)).length;
    const ratio = hits / terms.length;
    const strongPhrase = terms
      .filter((term) => term.length >= 6)
      .some((term) => normalizedResponse.includes(term));
    if (ratio >= 0.28 || (strongPhrase && ratio >= 0.18)) total += 1;
  }

  return total / requirements.length;
}

function writingMechanics(text) {
  const trimmed = String(text ?? '').trim();
  if (!trimmed) return 0;
  const sentences = trimmed.split(/[.!?]+/).map((sentence) => sentence.trim()).filter(Boolean);
  const capitalStarts = sentences.filter((sentence) => /^[A-Z]/.test(sentence)).length;
  const sentenceScore = sentences.length ? capitalStarts / sentences.length : 0;
  const punctuationScore = /[.!?]$/.test(trimmed) ? 1 : 0.45;
  const repetitionPenalty = /(\b\w+\b)(?:\s+\1){2,}/i.test(trimmed) ? 0.25 : 0;
  return clamp(sentenceScore * 0.55 + punctuationScore * 0.45 - repetitionPenalty);
}

function emailStructure(text) {
  const normalized = normalizeText(text);
  let score = 0;
  if (/^(dear|hello|hi|good morning|good afternoon)\b/.test(normalized)) score += 0.28;
  if (/\b(regards|kind regards|best regards|sincerely|thank you|thanks)\b/.test(normalized)) score += 0.28;
  if (String(text).split(/\n\s*\n/).filter(Boolean).length >= 2) score += 0.22;
  if (/\b(subject|re|update|request|meeting|report|session|deadline)\b/.test(normalized)) score += 0.22;
  return clamp(score);
}

function bestAcceptedSimilarity(text, accepted = []) {
  if (!accepted.length) return 0;
  return Math.max(
    ...accepted.map((answer) =>
      Math.max(sequenceSimilarity(text, answer), tokenOverlap(text, answer), phrasePresent(text, answer) ? 1 : 0)
    )
  );
}

function durationEvidence(answer, targetSeconds) {
  const duration = Number(answer?.audioDuration ?? 0);
  if (!duration) return 0;
  const usefulMinimum = Math.min(8, targetSeconds * 0.22);
  if (duration < 1) return 0.1;
  if (duration < usefulMinimum) return clamp(0.2 + (duration / usefulMinimum) * 0.35);
  return clamp(0.55 + Math.min(duration / targetSeconds, 1) * 0.25);
}

export function scoreItem(item, answer = {}) {
  const response = answer.text ?? answer.transcript ?? '';
  const base = {
    itemId: item.id,
    section: item.section,
    max: item.type === 'reading-comprehension' ? item.questions.length : 1,
    earned: 0,
    confidence: 'high',
    feedback: '',
    breakdown: {}
  };

  switch (item.type) {
    case 'sentence-completion': {
      const normalized = normalizeText(response);
      const exact = item.accepted.some((accepted) => normalized === normalizeText(accepted));
      const near = Math.max(...item.accepted.map((accepted) => sequenceSimilarity(normalized, accepted)));
      base.earned = exact ? 1 : near >= 0.8 ? 0.65 : 0;
      base.feedback = exact
        ? 'The word fits the intended meaning and grammar.'
        : `Expected one of: ${item.accepted.join(', ')}.`;
      base.breakdown = { exact, near };
      break;
    }

    case 'passage-reconstruction': {
      const coverage = keywordGroupCoverage(response, item.expectedKeywords);
      const length = wordCount(response);
      const lengthScore = clamp(length / 42);
      const mechanics = writingMechanics(response);
      base.earned = clamp(coverage * 0.68 + lengthScore * 0.17 + mechanics * 0.15);
      base.feedback = `${Math.round(coverage * 100)}% of the key idea groups were represented.`;
      base.breakdown = { keyIdeaCoverage: coverage, lengthScore, mechanics, words: length };
      break;
    }

    case 'reading-comprehension': {
      const selections = Array.isArray(answer.selections) ? answer.selections : [];
      let correct = 0;
      item.questions.forEach((question, index) => {
        if (Number(selections[index]) === question.correctIndex) correct += 1;
      });
      base.earned = correct;
      base.feedback = `${correct} of ${item.questions.length} answers were correct.`;
      base.breakdown = { correct, total: item.questions.length };
      break;
    }

    case 'email-writing': {
      const coverage = requirementCoverage(response, item.requiredPoints);
      const count = wordCount(response);
      const lengthScore = clamp(count / item.minWords);
      const structure = emailStructure(response);
      const mechanics = writingMechanics(response);
      base.earned = clamp(coverage * 0.48 + lengthScore * 0.22 + structure * 0.15 + mechanics * 0.15);
      base.feedback = `${Math.round(coverage * 100)}% task coverage; ${count} words (minimum ${item.minWords}).`;
      base.breakdown = { taskCoverage: coverage, lengthScore, structure, mechanics, words: count };
      break;
    }

    case 'dictation': {
      const similarity = sequenceSimilarity(response, item.audioText);
      const overlap = tokenOverlap(response, item.audioText);
      base.earned = clamp(similarity * 0.72 + overlap * 0.28);
      base.feedback = `${Math.round(base.earned * 100)}% word-sequence fidelity.`;
      base.breakdown = { sequenceSimilarity: similarity, contentOverlap: overlap };
      break;
    }

    case 'response-selection': {
      const correct = Number(answer.selectedIndex) === item.correctIndex;
      base.earned = correct ? 1 : 0;
      base.feedback = correct
        ? 'The selected response was contextually appropriate.'
        : `Best response: ${item.options[item.correctIndex]}`;
      base.breakdown = { correct };
      break;
    }

    case 'passage-comprehension': {
      if (normalizeText(response)) {
        const accepted = bestAcceptedSimilarity(response, item.accepted);
        const coverage = keywordGroupCoverage(response, item.expectedKeywords);
        base.earned = clamp(Math.max(accepted, coverage * 0.9));
        base.feedback = `${Math.round(coverage * 100)}% of the expected answer concepts were detected.`;
        base.breakdown = { acceptedSimilarity: accepted, conceptCoverage: coverage };
      } else {
        base.earned = durationEvidence(answer, item.duration) * 0.55;
        base.confidence = 'low';
        base.feedback = 'No transcript was available; the estimate uses response duration only.';
        base.breakdown = { audioDuration: Number(answer.audioDuration ?? 0) };
      }
      break;
    }

    case 'repeat': {
      if (normalizeText(response)) {
        const similarity = sequenceSimilarity(response, item.audioText);
        const overlap = tokenOverlap(response, item.audioText);
        base.earned = clamp(similarity * 0.78 + overlap * 0.22);
        base.feedback = `${Math.round(base.earned * 100)}% sentence fidelity detected.`;
        base.breakdown = { sequenceSimilarity: similarity, contentOverlap: overlap };
      } else {
        base.earned = durationEvidence(answer, item.duration) * 0.55;
        base.confidence = 'low';
        base.feedback = 'No transcript was available; pronunciation and accuracy could not be measured.';
        base.breakdown = { audioDuration: Number(answer.audioDuration ?? 0) };
      }
      break;
    }

    case 'speaking-situation': {
      if (normalizeText(response)) {
        const coverage = requirementCoverage(response, item.requiredPoints);
        const count = wordCount(response);
        const development = clamp(count / 75);
        const mechanics = writingMechanics(response);
        base.earned = clamp(coverage * 0.58 + development * 0.27 + mechanics * 0.15);
        base.feedback = `${Math.round(coverage * 100)}% task coverage detected across ${count} transcribed words.`;
        base.breakdown = { taskCoverage: coverage, development, mechanics, words: count };
      } else {
        base.earned = durationEvidence(answer, item.duration) * 0.6;
        base.confidence = 'low';
        base.feedback = 'No transcript was available; the estimate uses speaking duration only.';
        base.breakdown = { audioDuration: Number(answer.audioDuration ?? 0) };
      }
      break;
    }

    case 'story-retelling': {
      if (normalizeText(response)) {
        const coverage = keywordGroupCoverage(response, item.expectedKeywords);
        const count = wordCount(response);
        const development = clamp(count / 55);
        base.earned = clamp(coverage * 0.72 + development * 0.2 + writingMechanics(response) * 0.08);
        base.feedback = `${Math.round(coverage * 100)}% of the story-event groups were represented.`;
        base.breakdown = { eventCoverage: coverage, development, words: count };
      } else {
        base.earned = durationEvidence(answer, item.duration) * 0.55;
        base.confidence = 'low';
        base.feedback = 'No transcript was available; content accuracy could not be measured.';
        base.breakdown = { audioDuration: Number(answer.audioDuration ?? 0) };
      }
      break;
    }

    default:
      base.feedback = 'This response type could not be scored.';
  }

  base.earned = clamp(base.earned, 0, base.max);
  return base;
}

export function practiceGseFromPercent(percent) {
  return Math.round(10 + clamp(percent / 100) * 80);
}

export function cefrFromGse(gse) {
  if (gse < 22) return 'Pre-A1';
  if (gse < 30) return 'A1';
  if (gse < 43) return 'A2';
  if (gse < 59) return 'B1';
  if (gse < 76) return 'B2';
  if (gse < 85) return 'C1';
  return 'C2';
}

export function readinessBand(percent) {
  if (percent >= 85) return 'Advanced control';
  if (percent >= 75) return 'Strong readiness';
  if (percent >= 65) return 'Operational readiness';
  if (percent >= 50) return 'Developing readiness';
  return 'Foundation work required';
}

export function scoreAttempt(items, answersById = {}) {
  const itemResults = items.map((item) => scoreItem(item, answersById[item.id] ?? {}));
  const sectionTotals = {};
  const skillTotals = Object.fromEntries(SKILL_NAMES.map((skill) => [skill, { earned: 0, max: 0 }]));

  for (const result of itemResults) {
    if (!sectionTotals[result.section]) sectionTotals[result.section] = { earned: 0, max: 0 };
    sectionTotals[result.section].earned += result.earned;
    sectionTotals[result.section].max += result.max;

    for (const skill of SECTION_SKILLS[result.section]) {
      skillTotals[skill].earned += result.earned;
      skillTotals[skill].max += result.max;
    }
  }

  const earned = itemResults.reduce((sum, result) => sum + result.earned, 0);
  const max = itemResults.reduce((sum, result) => sum + result.max, 0);
  const percent = max ? (earned / max) * 100 : 0;
  const practiceGse = practiceGseFromPercent(percent);
  const lowConfidenceCount = itemResults.filter((result) => result.confidence === 'low').length;

  const sections = Object.fromEntries(
    Object.entries(sectionTotals).map(([section, totals]) => [
      section,
      {
        ...totals,
        percent: totals.max ? (totals.earned / totals.max) * 100 : 0
      }
    ])
  );

  const skills = Object.fromEntries(
    Object.entries(skillTotals).map(([skill, totals]) => [
      skill,
      {
        ...totals,
        percent: totals.max ? (totals.earned / totals.max) * 100 : 0
      }
    ])
  );

  return {
    earned,
    max,
    percent,
    practiceGse,
    cefr: cefrFromGse(practiceGse),
    readiness: readinessBand(percent),
    lowConfidenceCount,
    confidence: lowConfidenceCount === 0 ? 'high' : lowConfidenceCount <= 4 ? 'medium' : 'low',
    sections,
    skills,
    itemResults
  };
}
