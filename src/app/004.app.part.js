ter"><span>VPET Level 2 Practice Simulator</span><span>Original-content training · Local-first privacy</span></footer>
  `;

  bindTopBar();
  document.querySelectorAll('[data-start-form]').forEach((button) => {
    button.addEventListener('click', () => openSetup({ mode: 'full', formId: button.dataset.startForm }));
  });
  document.querySelectorAll('[data-section]').forEach((button) => {
    button.addEventListener('click', () => openSetup({ mode: 'section', formId: 'A', sectionCode: button.dataset.section }));
  });
  document.querySelector('#view-history')?.addEventListener('click', () => {
    state.view = 'history';
    render();
  });
  document.querySelector('#discard-active')?.addEventListener('click', () => {
    if (!window.confirm('Discard the unfinished attempt and its locally saved answers?')) return;
    localStorage.removeItem(STORAGE_KEYS.active);
    renderHome();
  });
  document.querySelector('#resume-active')?.addEventListener('click', resumeActiveAttempt);
}

function renderHistory() {
  const rows = state.history.length
    ? state.history
        .map(
          (attempt) => `
            <article class="history-row">
              <div class="history-main">
                <span class="history-form">${escapeHtml(attempt.formId || attempt.sectionCode || 'L2')}</span>
                <div><strong>${escapeHtml(attempt.label)}</strong><small>${dateLabel(attempt.completedAt)} · ${formatDuration(attempt.elapsedMs)}</small></div>
              </div>
              <div class="history-stat"><small>SCORE</small><strong>${Math.round(attempt.percent)}%</strong></div>
              <div class="history-stat"><small>PRACTICE GSE</small><strong>${attempt.practiceGse}</strong></div>
              <div class="history-stat"><small>BAND</small><strong>${escapeHtml(attempt.cefr)}</strong></div>
            </article>
          `
        )
        .join('')
    : `<div class="empty-state">${icon('history')}<h2>No completed attempts</h2><p>Complete a full simulation or section drill to build your practice history.</p><button class="primary-button" id="history-start" type="button">Start Form A</button></div>`;

  app.innerHTML = `
    ${renderTopBar('history')}
    <main class="page-shell history-page">
      <div class="page-title-row">
        <div><span class="eyebrow">LOCAL PRACTICE RECORD</span><h1>Attempt history</h1><p>Only summary results are retained. Recordings and full response text are not uploaded.</p></div>
        ${state.history.length ? `<button class="text-button danger" id="clear-history" type="button">${icon('trash')} Clear history</button>` : ''}
      </div>
      <section class="history-list">${rows}</section>
      <section class="privacy-card">${icon('shield')}<div><strong>Local-first storage</strong><p>Attempt summaries stay in this browser. Clearing site data removes them.</p></div></section>
    </main>
  `;
  bindTopBar();
  document.querySelector('#history-start')?.addEventListener('click', () => openSetup({ mode: 'full', formId: 'A' }));
  document.querySelector('#clear-history')?.addEventListener('click', () => {
    if (!window.confirm('Delete all locally stored attempt summaries?')) return;
    state.history = [];
    saveJson(STORAGE_KEYS.history, []);
    renderHistory();
  });
}

function openSetup({ mode, formId = 'A', sectionCode = null }) {
  state.mode = mode;
  state.formId = formId;
  state.sectionCode = sectionCode;
  state.currentItems = mode === 'full' ? TEST_FORMS[formId].items : getSectionItems(formId, sectionCode);
  state.currentIndex = 0;
  state.answers = {};
  state.showInstruction = true;
  state.startedAt = null;
  state.result = null;
  state.resultSaved = false;
  state.candidateId = createCandidateId();
  state.setup = { audioOk: false, micOk: false, consent: false, message: '' };
  state.view = 'setup';
  render();
}

function currentTestLabel() {
  if (state.mode === 'full') return TEST_FORMS[state.formId]?.name ?? 'Full Simulation';
  const meta = SECTION_META[state.sectionCode];
  return `Section ${state.sectionCode} · ${meta.title}`;
}

function renderSetup() {
  const support = browserSupport();
  const needsAudio = speechRequired(state.currentItems);
  const needsMic = microphoneRequired(state.currentItems);
  const structure = state.mode === 'full'
    ? verifyFormStructure(TEST_FORMS[state.formId])
    : { valid: true, total: countTotalUnits(state.currentItems) };
  const expectedMinutes = state.mode === 'full'
    ? SECTION_ORDER.reduce((sum, section) => sum + SECTION_META[section].estimatedMinutes, 0)
    : SECTION_META[state.sectionCode].estimatedMinutes;

  app.innerHTML = `
    ${renderTopBar('home')}
    <main class="setup-shell">
      <section class="setup-summary">
        <button class="back-link" id="setup-back" type="button">← Back to preparation</button>
        <span class="eyebrow">SESSION CONFIGURATION</span>
        <h1>${escapeHtml(currentTestLabel())}</h1>
        <p>${state.mode === 'full' ? 'A complete Level 2 simulation with all ten sections.' : SECTION_META[state.sectionCode].directions}</p>
        <div class="setup-facts">
          <div><small>SCORED QUESTIONS</small><strong>${structure.total}</strong></div>
          <div><small>PLANNED DURATION</small><strong>~${expectedMinutes} min</strong></div>
          <div><small>NAVIGATION</small><strong>One way</strong></div>
        </div>
        <div class="setup-flow">
          ${(state.mode === 'full' ? SECTION_ORDER : [state.sectionCode])
            .map((section) => `<span><b>${section}</b>${escapeHtml(SECTION_META[section].title)}</span>`)
            .join('')}
        </div>
        <div class="setup-warning">${icon('warning')}<p>Once a timed question is submitted or expires, it cannot be reopened. Use headphones and a quiet room.</p></div>
      </section>

      <section class="setup-panel">
        <div class="setup-panel-heading"><span>1</span><div><h2>Candidate and test mode</h2><p>These settings apply to this attempt.</p></div></div>
        <label class="field-label" for="candidate-id">Practice candidate ID</label>
        <input class="text-field" id="candidate-id" value="${escapeHtml(state.candidateId)}" maxlength="32" autocomplete="off" />

        <div class="choice-row">
          <label class="toggle-card">
            <input id="strict-mode" type="checkbox" ${state.strictMode ? 'checked' : ''} />
            <span class="toggle-control"></span>
            <span><strong>Strict simulation</strong><small>Hide listening transcripts and delay feedback until completion.</small></span>
          </label>
          <label class="toggle-card">
            <input id="fullscreen-mode" type="checkbox" ${state.requestFullscreen ? 'checked' : ''} />
            <span class="toggle-control"></span>
            <span><strong>Request full screen</strong><small>Reduce distractions when the attempt starts.</small></span>
          </label>
        </div>

        <label class="field-label" for="audio-rate">Spoken-audio rate <span id="audio-rate-value">${state.audioRate.toFixed(2)}×</span></label>
        <input id="audio-rate" class="range-field" type="range" min="0.85" max="1.10" step="0.01" value="${state.audioRate}" />

        <div class="setup-divider"></div>
        <div class="setup-panel-heading"><span>2</span><div><h2>Equipment check</h2><p>Audio is generated by your browser. Speaking recordings remain in this session.</p></div></div>
        <div class="check-grid">
          <article class="check-card ${support.speech ? '' : 'unsupported'}">
            <div class="check-title">${icon('audio')}<div><strong>Headphone output</strong><small>${needsAudio ? 'Required for this attempt' : 'Recommended'}</small></div><span id="audio-status" class="check-state ${state.setup.audioOk ? 'passed' : ''}">${state.setup.audioOk ? 'Passed' : support.speech ? 'Not tested' : 'Unsupported'}</span></div>
            <p>Play a sentence and confirm that it is clear at a comfortable volume.</p>
            <button class="secondary-button" id="test-audio" type="button" ${support.speech ? '' : 'disabled'}>${icon('play')} Play test sentence</button>
          </article>
          <article class="check-card ${support