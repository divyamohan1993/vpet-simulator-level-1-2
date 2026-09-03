import test from 'node:test';
import assert from 'node:assert/strict';

import {
  QUESTION_BANK_INFO,
  SECTION_META,
  SECTION_ORDER,
  TEST_FORMS,
  countSectionUnits,
  countTotalUnits,
  verifyFormStructure
} from '../public/data.js';

const ORIGINAL_FORMS = new Set(['A', 'B']);
const ADDED_FORM_IDS = Object.keys(TEST_FORMS).filter((formId) => !ORIGINAL_FORMS.has(formId));

test('expanded bank contains 22 complete forms and 1,276 scored units', () => {
  assert.equal(QUESTION_BANK_INFO.addedForms, 20);
  assert.equal(QUESTION_BANK_INFO.totalForms, 22);
  assert.equal(QUESTION_BANK_INFO.scoredUnitsPerForm, 58);
  assert.equal(QUESTION_BANK_INFO.totalScoredUnits, 1276);
  assert.equal(ADDED_FORM_IDS.length, 20);

  const independentlyCountedTotal = Object.values(TEST_FORMS)
    .reduce((sum, form) => sum + countTotalUnits(form.items), 0);
  assert.equal(independentlyCountedTotal, QUESTION_BANK_INFO.totalScoredUnits);
});

test('every added form preserves the official Level 2 section distribution', () => {
  for (const formId of ADDED_FORM_IDS) {
    const form = TEST_FORMS[formId];
    const verification = verifyFormStructure(form);

    assert.equal(verification.valid, true, `${formId}: ${verification.errors.join('; ')}`);
    assert.equal(form.items.length, 55, `${formId} should contain 55 item objects`);

    for (const section of SECTION_ORDER) {
      assert.equal(
        countSectionUnits(form.items, section),
        SECTION_META[section].officialCount,
        `${formId}-${section} has the wrong scored-unit count`
      );
    }
  }
});

test('all identifiers remain unique across the complete bank', () => {
  const identifiers = Object.values(TEST_FORMS)
    .flatMap((form) => form.items.map((item) => item.id));

  assert.equal(new Set(identifiers).size, identifiers.length);
});

test('added reading screens and response-selection choices are structurally valid', () => {
  for (const formId of ADDED_FORM_IDS) {
    const form = TEST_FORMS[formId];

    for (const item of form.items.filter((candidate) => candidate.section === 'C')) {
      assert.equal(item.questions.length, 2);
      for (const question of item.questions) {
        assert.equal(question.options.length, 4);
        assert.ok(question.correctIndex >= 0 && question.correctIndex < 4);
        assert.ok(question.explanation.length > 15);
      }
    }

    for (const item of form.items.filter((candidate) => candidate.section === 'F')) {
      assert.equal(item.options.length, 3);
      assert.ok(item.correctIndex >= 0 && item.correctIndex < 3);
      assert.equal(new Set(item.options).size, 3);
    }
  }
});

test('each added passage-comprehension set plays two stories once and asks three questions per story', () => {
  for (const formId of ADDED_FORM_IDS) {
    const listeningItems = TEST_FORMS[formId].items
      .filter((item) => item.section === 'G');

    const grouped = new Map();
    for (const item of listeningItems) {
      if (!grouped.has(item.stimulusId)) grouped.set(item.stimulusId, []);
      grouped.get(item.stimulusId).push(item);
    }

    assert.equal(grouped.size, 2, `${formId} should use two Part G passages`);
    for (const [stimulusId, questions] of grouped) {
      assert.equal(questions.length, 3, `${stimulusId} should have three questions`);
      assert.equal(questions.filter((question) => question.playStory).length, 1);
      assert.equal(questions[0].playStory, true);
      assert.ok(questions.every((question) => question.accepted.length >= 2));
    }
  }
});

test('added content contains no obvious duplicated-article or doubled-punctuation defects', () => {
  const serialized = JSON.stringify(
    ADDED_FORM_IDS.map((formId) => TEST_FORMS[formId])
  );

  assert.doesNotMatch(serialized, /\bthe (?:a|an)\b/i);
  assert.doesNotMatch(serialized, /\b(?:a an|an a|the the)\b/i);
  assert.doesNotMatch(serialized, /\.\./);
});
