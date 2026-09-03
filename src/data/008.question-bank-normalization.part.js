/*
 * Normalize generated human-facing text after form construction.
 *
 * Domain phrases intentionally carry their own articles in some specifications
 * (for example, "a shared barcode-based register"). A generic template may
 * also supply "the". Remove only that impossible doubled-article boundary;
 * no question meaning, answer key, identifier, count, or timer is changed.
 */

function normalizeQuestionBankText(value) {
  if (typeof value === 'string') {
    return value.replace(/\bthe (a|an)\b/gi, '$1');
  }

  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      value[index] = normalizeQuestionBankText(value[index]);
    }
    return value;
  }

  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      value[key] = normalizeQuestionBankText(value[key]);
    }
  }

  return value;
}

for (const [formId, form] of Object.entries(TEST_FORMS)) {
  if (formId === 'A' || formId === 'B') continue;
  normalizeQuestionBankText(form);
}
