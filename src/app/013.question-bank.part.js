/*
 * Complete-form picker for the expanded Level 2 question bank.
 * This fragment runs after the core application has rendered once, then wraps
 * future renders so every home screen receives the picker and section drills
 * use the learner's selected form.
 */

const QUESTION_BANK_FORM_KEY = 'vpet-l2-question-bank-form-v1';

function availableQuestionBankForms() {
  return Object.values(TEST_FORMS).sort((left, right) =>
    left.id.localeCompare(right.id, 'en', { numeric: true })
  );
}

function storedQuestionBankForm(forms) {
  try {
    const stored = localStorage.getItem(QUESTION_BANK_FORM_KEY);
    return forms.some((form) => form.id === stored) ? stored : 'A';
  } catch {
    return 'A';
  }
}

function rememberQuestionBankForm(formId) {
  try {
    localStorage.setItem(QUESTION_BANK_FORM_KEY, formId);
  } catch {
    // Form selection remains usable when browser storage is unavailable.
  }
}

function randomQuestionBankForm(forms, currentId) {
  const alternatives = forms.filter((form) => form.id !== currentId);
  const candidates = alternatives.length ? alternatives : forms;
  let index = Math.floor(Math.random() * candidates.length);

  if (window.crypto?.getRandomValues) {
    const value = new Uint32Array(1);
    window.crypto.getRandomValues(value);
    index = value[0] % candidates.length;
  }

  return candidates[index];
}

function installQuestionBankPicker() {
  if (state.view !== 'home') return;

  const heroCopy = document.querySelector('.hero-copy');
  const heroActions = heroCopy?.querySelector('.hero-actions');
  if (!heroCopy || !heroActions || heroCopy.querySelector('[data-question-bank-picker]')) return;

  const forms = availableQuestionBankForms();
  const totalScoredUnits = forms.reduce(
    (total, form) => total + countTotalUnits(form.items),
    0
  );
  const initialFormId = storedQuestionBankForm(forms);
  const initialForm = TEST_FORMS[initialFormId] ?? forms[0];

  const picker = document.createElement('section');
  picker.className = 'question-bank-picker';
  picker.dataset.questionBankPicker = 'true';
  picker.setAttribute('aria-labelledby', 'question-bank-heading');
  picker.innerHTML = `
    <div class="question-bank-picker__heading">
      <div>
        <span class="eyebrow">EXPANDED ORIGINAL QUESTION BANK</span>
        <h2 id="question-bank-heading">Choose from ${forms.length} complete forms</h2>
      </div>
      <span class="question-bank-picker__count">${totalScoredUnits.toLocaleString('en-US')} scored units</span>
    </div>
    <label class="question-bank-picker__field" for="question-bank-form">
      <span>Practice form</span>
      <select id="question-bank-form" aria-describedby="question-bank-description">
        ${forms.map((form) => `
          <option value="${escapeHtml(form.id)}" ${form.id === initialForm.id ? 'selected' : ''}>
            Form ${escapeHtml(form.id)} · ${escapeHtml(form.description.replace(/:\s*original Level 2 workplace scenarios\.$/, ''))}
          </option>
        `).join('')}
      </select>
    </label>
    <p id="question-bank-description" class="question-bank-picker__description">
      ${escapeHtml(initialForm.description)}
    </p>
    <div class="question-bank-picker__actions">
      <button class="primary-button" id="start-selected-bank-form" type="button">
        Start selected form ${icon('arrow')}
      </button>
      <button class="secondary-button" id="start-random-bank-form" type="button">
        Choose a different form randomly
      </button>
    </div>
    <p class="question-bank-picker__notice">
      Every added item is original practice content. The public test specification controls the task type,
      item count, sequence, and timing; official or recalled live-test questions are not stored here.
    </p>
  `;

  heroActions.insertAdjacentElement('afterend', picker);

  const select = picker.querySelector('#question-bank-form');
  const description = picker.querySelector('#question-bank-description');

  const selectForm = (formId) => {
    const form = TEST_FORMS[formId] ?? forms[0];
    select.value = form.id;
    description.textContent = form.description;
    rememberQuestionBankForm(form.id);
    return form;
  };

  select.addEventListener('change', () => selectForm(select.value));

  picker.querySelector('#start-selected-bank-form').addEventListener('click', () => {
    const form = selectForm(select.value);
    openSetup({ mode: 'full', formId: form.id });
  });

  picker.querySelector('#start-random-bank-form').addEventListener('click', () => {
    const form = randomQuestionBankForm(forms, select.value);
    selectForm(form.id);
    openSetup({ mode: 'full', formId: form.id });
  });

  document.querySelectorAll('[data-section]').forEach((button) => {
    if (button.dataset.questionBankBound === 'true') return;
    button.dataset.questionBankBound = 'true';
    button.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const form = selectForm(select.value);
        openSetup({
          mode: 'section',
          formId: form.id,
          sectionCode: button.dataset.section
        });
      },
      { capture: true }
    );
  });

  const homeEyebrow = heroCopy.querySelector(':scope > .eyebrow');
  if (homeEyebrow) {
    homeEyebrow.textContent =
      `FULL LEVEL 2 SIMULATION · ${forms.length} FORMS · 58 SCORED QUESTIONS EACH`;
  }
}

const renderBeforeQuestionBankExpansion = render;
render = function renderWithQuestionBankExpansion() {
  renderBeforeQuestionBankExpansion();
  installQuestionBankPicker();
};

installQuestionBankPicker();
