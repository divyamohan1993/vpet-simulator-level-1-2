state.showInstruction = Boolean(saved.showInstruction);
  state.startedAt = Number(saved.startedAt ?? Date.now());
  state.view = 'exam';
  render();
}

function sectionPosition(index) {
  const current = state.currentItems[index];
  let sectionUnitsBefore = 0;
  let overallUnitsBefore = 0;
  for (let itemIndex = 0; itemIndex < state.currentItems.length; itemIndex += 1) {
    const item = state.currentItems[itemIndex];
    if (itemIndex < index) {
      overallUnitsBefore += scoreUnits(item);
      if (item.section === current.section) sectionUnitsBefore += scoreUnits(item);
    }
  }
  const currentUnits = scoreUnits(current);
  const sectionTotal = countSectionUnits(state.currentItems, current.section);
  const overallTotal = countTotalUnits(state.currentItems);
  return {
    sectionUnitsBefore,
    currentUnits,
    sectionTotal,
    overallUnitsBefore,
    overallTotal,
    overallPercent: (overallUnitsBefore / overallTotal) * 100
  };
}

function itemCounterText(position) {
  const start = position.sectionUnitsBefore + 1;
  const end = start + position.currentUnits - 1;
  return position.currentUnits > 1
    ? `Questions ${start}–${end} of ${position.sectionTotal}`
    : `Question ${start} of ${position.sectionTotal}`;
}

function renderExamProgress(item, position) {
  const sections = state.mode === 'full' ? SECTION_ORDER : [item.section];
  return sections
    .map((section) => {
      const sectionItems = state.currentItems.filter((candidate) => candidate.section === section);
      const firstIndex = state.currentItems.indexOf(sectionItems[0]);
      const lastIndex = state.currentItems.indexOf(sectionItems.at(-1));
      let status = 'upcoming';
      if (state.currentIndex > lastIndex) status = 'complete';
      else if (state.currentIndex >= firstIndex && state.currentIndex <= lastIndex) status = 'current';
      return `<span class="exam-progress-segment ${status}" title="Part ${section}: ${escapeHtml(SECTION_META[section].title)}"><b>${section}</b></span>`;
    })
    .join('');
}

function renderExamFrame(item, bodyHtml, options = {}) {
  const meta = SECTION_META[item.section];
  const position = sectionPosition(state.currentIndex);
  const totalElapsed = state.startedAt ? Date.now() - state.startedAt : 0;

  app.innerHTML = `
    <div class="exam-page">
      <header class="exam-system-bar no-print">
        <div class="exam-system-brand"><span class="brand-mark compact">V<span>2</span></span><div><strong>Professional English Test</strong><small>Level 2 practice session</small></div></div>
        <div class="exam-session-meta">
          <span><small>CANDIDATE</small><strong>${escapeHtml(state.candidateId)}</strong></span>
          <span><small>SESSION</small><strong>${escapeHtml(state.formId || state.sectionCode)}</strong></span>
          <span><small>ELAPSED</small><strong id="elapsed-clock">${formatClock(totalElapsed / 1000)}</strong></span>
        </div>
        <button class="exam-exit" id="exam-exit" type="button">Exit &amp; save</button>
      </header>

      <main class="exam-workspace">
        <div class="exam-overall-progress no-print">
          <div class="exam-progress-track">${renderExamProgress(item, position)}</div>
          <span>${Math.round(position.overallPercent)}% complete</span>
        </div>

        <section class="exam-window" aria-label="Part ${item.section}: ${escapeHtml(meta.title)}">
          <header class="exam-part-header">
            <div class="part-badge"><small>PART</small><strong>${item.section}</strong></div>
            <div class="part-title"><small>${meta.primarySkills.join(' · ').toUpperCase()}</small><h1>${escapeHtml(meta.title)}</h1></div>
            <div class="item-counter"><small>PROGRESS</small><strong>${itemCounterText(position)}</strong></div>
          </header>

          <div class="exam-stage" id="question-stage">${bodyHtml}</div>

          <footer class="exam-footer no-print">
            <div class="exam-rule-note">
              ${icon('shield')}
              <div><strong id="question-status">${escapeHtml(options.status ?? 'Response saves when you continue.')}</strong><small>No back navigation. Unanswered timed items advance automatically.</small></div>
            </div>
            <div class="exam-controls">
              <div class="timer-ring timer-waiting" id="timer-ring" style="--timer-progress: 360deg">
                <div><strong id="timer-clock">--:--</strong><small id="timer-label">Preparing</small></div>
              </div>
              <button class="next-control" id="next-button" type="button" disabled aria-label="Continue to next question">
                <span id="next-label">NEXT</span>${icon('arrow')}
              </button>
            </div>
          </footer>
        </section>
      </main>
    </div>
  `;

  bindExamCommon();
  const elapsedInterval = window.setInterval(() => {
    const elapsed = document.querySelector('#elapsed-clock');
    if (elapsed && state.startedAt) elapsed.textContent = formatClock((Date.now() - state.startedAt) / 1000);
  }, 1000);
  return () => clearInterval(elapsedInterval);
}

function bindExamCommon() {
  document.querySelector('#exam-exit')?.addEventListener('click', () => {
    if (!window.confirm('Exit the timed attempt? Your completed responses will remain saved for resuming.')) return;
    saveActiveAttempt();
    window.speechSynthesis?.cancel?.();
    stopMediaStream();
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    state.view = 'home';
    render();
  });
}

function setNextButton({ enabled = true, label = 'NEXT', onClick } = {}) {
  const button = document.querySelector('#next-button');
  const text = document.querySelector('#next-label');
  if (!button) return;
  button.disabled = !enabled;
  if (text) text.textContent = label;
  button.onclick = enabled && onClick ? onClick : null;
}

function setQuestionStatus(message, tone = '') {
  const status = document.querySelector('#question-status');
  if (!status) return;
  status.textContent = message;
  status.className = tone;
}

function renderExamInstruction() {
  const item = state.currentItems[state.currentIndex];
  const meta = SECTION_META[item.section];
  const count = countSectionUnits(state.currentItems, item.section);
  const hasAudio = ['E', 'F', 'G', 'H', 'I', 'J'].includes(item.section);
  const hasSpeaking = ['G', 'H', 'I', 'J'].includes(item.section);
  const samplePrompt = escapeHtml(meta.sample.prompt).replaceAll('\n', '<br />');

  app.innerHTML = `
    <div class="instruction-page">
      <header class="exam-system-bar no-print">
        <div class="exam-system-brand"><span class="brand-mark compact">V<span>2</span></span><div><strong>Professional English Test</strong><small>Level 2 practice session</small></div></div>
        <div class="exam-session-meta"><span><small>CANDIDATE</small><strong>${escapeHtml(state.candidateId)}</strong></span><span><small>UP NEXT</small><strong>Part ${item.section}</strong></span></div>
        <button class="exam-exit" id="exam-exit" type="button">Exit &amp; save</button>
      </header>
      <main class="instruction-workspace">
        <section class="instruction-window">
          <header class="instruction-header">
            <div class="part-badge large"><small>PART</small><strong>${item.section}</strong></div>
            <div><span class="eyebrow">SECTION INSTRUCTIONS</span><h1>${escapeHtml(meta.title)}</h1><p>${count} scored question${count === 1 ? '' : 's'} · approximately ${meta.estimatedMinutes} minutes</p></div>
          </header>
          <div class="instruction-content">
            <article class="direction-card">
              <h2>What you will do</h2>
              <p>${escapeHtml(meta.directions)}</p>
              <div class="instruction-rules">
                <span>${icon('clock')} Each item is timed</span>
                <span>${icon('arrow')} Forward only</span>
                ${hasAudio ? `<span>${icon('audio')} Audio plays once</span>` : ''}
                ${hasSpeaking ? `<span>${icon('mic')} Speak after the tone</span>` : ''}
              </div>
            </article>
            <article class="sample-card">
          