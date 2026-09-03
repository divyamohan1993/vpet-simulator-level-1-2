import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SECTION_META,
  SECTION_ORDER,
  TEST_FORMS,
  countSectionUnits,
  countTotalUnits,
  verifyFormStructure
} from '../public/data.js';
import {
  cefrFromGse,
  keywordGroupCoverage,
  normalizeText,
  practiceGseFromPercent,
  requirementCoverage,
  scoreAttempt,
  scoreItem,
  sequenceSimilarity,
  wordCount
} from '../public/scoring.js';

test('each complete form contains the documented 58 score units and section counts', () => {
  for (const form of Object.values(TEST_FORMS)) {
    const verification = verifyFormStructure(form);
    assert.equal(verification.valid, true, verification.errors.join('\n'));
    assert.equal(countTotalUnits(form.items), 58);
    for (const section of SECTION_ORDER) {
      assert.equal(countSectionUnits(form.items, section), SECTION_META[section].officialCount);
    }
  }
});

test('question identifiers are unique within and across forms', () => {
  const identifiers = Object.values(TEST_FORMS).flatMap((form) => form.items.map((item) => item.id));
  assert.equal(new Set(identifiers).size, identifiers.length);
});

test('every item has a valid section, type, and positive response duration', () => {
  for (const form of Object.values(TEST_FORMS)) {
    for (const item of form.items) {
      assert.ok(SECTION_ORDER.includes(item.section), item.id);
      assert.equal(typeof item.type, 'string', item.id);
      assert.ok(item.duration > 0, item.id);
      if (item.type === 'reading-comprehension') assert.equal(item.questions.length, 2, item.id);
    }
  }
});

test('normalization tolerates punctuation, case, accents, and common contractions', () => {
  assert.equal(normalizeText('  Résumé — CAN\'T  '), 'resume cannot');
  assert.equal(wordCount('One, two; three.'), 3);
});

test('sequence similarity rewards faithful dictation and penalizes missing content', () => {
  assert.equal(sequenceSimilarity('The report is ready.', 'The report is ready.'), 1);
  assert.ok(sequenceSimilarity('The report ready', 'The report is ready') > 0.7);
  assert.ok(sequenceSimilarity('Different words', 'The report is ready') < 0.3);
});

test('keyword and requirement coverage detect core concepts', () => {
  const keywordCoverage = keywordGroupCoverage('The trial lasted six weeks and response time fell to six minutes.', [
    ['trial'],
    ['six weeks'],
    ['response'],
    ['six minutes']
  ]);
  assert.equal(keywordCoverage, 1);

  const requirements = [
    'Apologize for two missing chairs.',
    'Offer delivery this evening.',
    'Ask the customer to confirm the preferred option.'
  ];
  const response = 'Dear Customer, I apologize that two chairs are missing. We can deliver them this evening. Please confirm which option you prefer. Regards, Sam.';
  assert.ok(requirementCoverage(response, requirements) >= 2 / 3);
});

test('objective item scoring uses the declared answer key', () => {
  const sentence = TEST_FORMS.A.items.find((item) => item.id === 'A-A04');
  assert.equal(scoreItem(sentence, { text: 'effect' }).earned, 1);
  assert.equal(scoreItem(sentence, { text: 'weather' }).earned, 0);

  const reading = TEST_FORMS.A.items.find((item) => item.id === 'A-C01');
  assert.equal(scoreItem(reading, { selections: [1, 2] }).earned, 2);
  assert.equal(scoreItem(reading, { selections: [0, 0] }).earned, 0);

  const response = TEST_FORMS.A.items.find((item) => item.id === 'A-F01');
  assert.equal(scoreItem(response, { selectedIndex: 1 }).earned, 1);
  assert.equal(scoreItem(response, { selectedIndex: 0 }).earned, 0);
});

test('a fully populated answer set produces a strong but explicitly heuristic result', () => {
  const form = TEST_FORMS.A;
  const answers = {};

  for (const item of form.items) {
    if (item.type === 'sentence-completion') answers[item.id] = { text: item.accepted[0] };
    else if (item.type === 'passage-reconstruction') answers[item.id] = { text: item.passage };
    else if (item.type === 'reading-comprehension') answers[item.id] = { selections: item.questions.map((question) => question.correctIndex) };
    else if (item.type === 'email-writing') answers[item.id] = { text: `Dear Colleague,\n\n${item.requiredPoints.join(' ')} This message provides the requested context, action, and deadline in a professional form. Please contact me if any clarification is needed.\n\nKind regards,\nPractice Candidate` };
    else if (item.type === 'dictation') answers[item.id] = { text: item.audioText };
    else if (item.type === 'response-selection') answers[item.id] = { selectedIndex: item.correctIndex };
    else if (item.type === 'passage-comprehension') answers[item.id] = { transcript: item.accepted[0], audioDuration: 5 };
    else if (item.type === 'repeat') answers[item.id] = { transcript: item.audioText, audioDuration: 8 };
    else if (item.type === 'speaking-situation') answers[item.id] = { transcript: item.requiredPoints.join(' '), audioDuration: 45 };
    else if (item.type === 'story-retelling') answers[item.id] = { transcript: item.story, audioDuration: 28 };
  }

  const result = scoreAttempt(form.items, answers);
  assert.equal(result.max, 58);
  assert.ok(result.percent > 80, `Expected >80, got ${result.percent}`);
  assert.equal(result.lowConfidenceCount, 0);
  assert.ok(result.practiceGse >= 74);
});

test('an unanswered form scores zero with no hidden positive credit', () => {
  const result = scoreAttempt(TEST_FORMS.B.items, {});
  assert.equal(result.earned, 0);
  assert.equal(result.percent, 0);
  assert.equal(result.practiceGse, 10);
});

test('practice GSE orientation remains bounded and CEFR bands are deterministic', () => {
  assert.equal(practiceGseFromPercent(-20), 10);
  assert.equal(practiceGseFromPercent(100), 90);
  assert.equal(practiceGseFromPercent(140), 90);
  assert.equal(cefrFromGse(51), 'B1');
  assert.equal(cefrFromGse(70), 'B2');
  assert.equal(cefrFromGse(88), 'C2');
});
