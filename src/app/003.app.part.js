     </span>
      </button>
      <nav class="site-nav" aria-label="Primary navigation">
        <button class="nav-button ${active === 'home' ? 'is-active' : ''}" id="nav-home" type="button">${icon('home')} Home</button>
        <button class="nav-button ${active === 'history' ? 'is-active' : ''}" id="nav-history" type="button">${icon('history')} Attempts</button>
      </nav>
      <span class="unofficial-pill">Independent practice tool</span>
    </header>
  `;
}

function bindTopBar() {
  document.querySelectorAll('#brand-home, #nav-home').forEach((button) => {
    button.addEventListener('click', () => {
      if (state.view === 'exam' && !window.confirm('Leave the timed test? Your progress will remain available to resume.')) return;
      if (state.view === 'exam') saveActiveAttempt();
      stopMediaStream();
      window.speechSynthesis?.cancel?.();
      state.view = 'home';
      render();
    });
  });
  document.querySelector('#nav-history')?.addEventListener('click', () => {
    if (state.view === 'exam' && !window.confirm('Leave the timed test? Your progress will remain available to resume.')) return;
    if (state.view === 'exam') saveActiveAttempt();
    stopMediaStream();
    window.speechSynthesis?.cancel?.();
    state.view = 'history';
    render();
  });
}

function renderHome() {
  const history = state.history;
  const best = history.length ? Math.max(...history.map((attempt) => attempt.percent)) : null;
  const completed = history.length;
  const activeAttempt = loadJson(STORAGE_KEYS.active, null);
  const latest = history[0] ?? null;

  const sectionCards = SECTION_ORDER.map((section) => {
    const meta = SECTION_META[section];
    return `
      <button class="section-card" data-section="${section}" type="button">
        <span class="section-letter">${section}</span>
        <span class="section-card-copy">
          <strong>${escapeHtml(meta.title)}</strong>
          <small>${meta.officialCount} questions · ${meta.primarySkills.join(' + ')}</small>
        </span>
        ${icon('arrow')}
      </button>
    `;
  }).join('');

  app.innerHTML = `
    ${renderTopBar('home')}
    <main class="page-shell home-page">
      <section class="hero-panel">
        <div class="hero-copy">
          <span class="eyebrow">FULL LEVEL 2 SIMULATION · 58 SCORED QUESTIONS</span>
          <h1>Train in the test flow.<br /><span>Learn from the evidence.</span></h1>
          <p>
            A timed, one-way professional English simulator covering sentence completion, reconstruction,
            reading, e-mail writing, dictation, listening responses, comprehension, repetition, speaking situations,
            and story retelling.
          </p>
          <div class="hero-actions">
            <button class="primary-button large" data-start-form="A" type="button">Start Form A ${icon('arrow')}</button>
            <button class="secondary-button large" data-start-form="B" type="button">Start Form B</button>
          </div>
          <div class="fidelity-note">
            ${icon('shield')}
            <span><strong>Original practice content.</strong> Structure and timing follow the public Level 2 test guide; this is not an official Pearson product or score.</span>
          </div>
        </div>
        <div class="hero-console" aria-label="Test format overview">
          <div class="console-top">
            <span class="console-dot"></span><span class="console-dot"></span><span class="console-dot"></span>
            <span>TEST SESSION</span>
          </div>
          <div class="console-display">
            <div class="console-title-row">
              <span class="console-part">A</span>
              <div><small>PART A</small><strong>Sentence Completion</strong></div>
              <span class="console-count">1 of 10</span>
            </div>
            <div class="console-question">
              <span class="audio-kicker">READ AND COMPLETE</span>
              <p>The revised procedure will come into <span class="sample-blank"></span> next month.</p>
              <div class="sample-input"></div>
            </div>
            <div class="console-footer">
              <span>No back navigation</span>
              <div class="sample-timer"><strong>00:25</strong><small>TIME LEFT</small></div>
            </div>
          </div>
        </div>
      </section>

      ${activeAttempt ? `
        <section class="resume-banner">
          <div>
            <span class="status-dot pulse"></span>
            <div>
              <strong>Unfinished attempt available</strong>
              <small>${escapeHtml(activeAttempt.label ?? 'Level 2 simulation')} · item ${Number(activeAttempt.currentIndex ?? 0) + 1}</small>
            </div>
          </div>
          <div class="resume-actions">
            <button class="text-button danger" id="discard-active" type="button">Discard</button>
            <button class="secondary-button" id="resume-active" type="button">Resume attempt ${icon('arrow')}</button>
          </div>
        </section>
      ` : ''}

      <section class="metric-row" aria-label="Simulator summary">
        <article class="metric-card"><small>OFFICIAL LEVEL 2 RANGE</small><strong>B1–C2</strong><span>Professional workplace English</span></article>
        <article class="metric-card"><small>TEST STRUCTURE</small><strong>10 parts</strong><span>All four language skills</span></article>
        <article class="metric-card"><small>TOTAL QUESTIONS</small><strong>58</strong><span>Approximately 60 minutes</span></article>
        <article class="metric-card"><small>YOUR PRACTICE</small><strong>${completed}</strong><span>${best === null ? 'No completed attempts yet' : `Best score ${Math.round(best)}%`}</span></article>
      </section>

      <section class="content-section">
        <div class="section-heading-row">
          <div>
            <span class="eyebrow">EXAM-SPECIFIC PRACTICE</span>
            <h2>Train one section at a time</h2>
          </div>
          <p>Each drill preserves that section’s question count, timing, audio behavior, and one-way progression.</p>
        </div>
        <div class="section-grid">${sectionCards}</div>
      </section>

      <section class="training-grid">
        <article class="training-card accent-blue">
          <span class="training-icon">${icon('clock')}</span>
          <h3>Strict simulation</h3>
          <p>Audio plays once, timers advance automatically, completed questions cannot be reopened, and feedback stays hidden until the end.</p>
        </article>
        <article class="training-card accent-green">
          <span class="training-icon">${icon('mic')}</span>
          <h3>Speaking capture</h3>
          <p>Record responses locally, monitor microphone level, and use browser speech recognition for a clearly labelled practice estimate when supported.</p>
        </article>
        <article class="training-card accent-gold">
          <span class="training-icon">${icon('history')}</span>
          <h3>Evidence-led review</h3>
          <p>See skill and section performance, answer evidence, task coverage, weak areas, and a prioritized practice prescription.</p>
        </article>
      </section>

      ${latest ? `
        <section class="latest-attempt">
          <div>
            <span class="eyebrow">LATEST COMPLETED ATTEMPT</span>
            <h2>${escapeHtml(latest.label)}</h2>
            <p>${dateLabel(latest.completedAt)} · ${formatDuration(latest.elapsedMs)}</p>
          </div>
          <div class="latest-score"><strong>${Math.round(latest.percent)}%</strong><span>${escapeHtml(latest.readiness)}</span></div>
          <button class="secondary-button" id="view-history" type="button">View attempt history</button>
        </section>
      ` : ''}

      <section class="legal-note">
        ${icon('info')}
        <p>
          “Versant” and related marks belong to their respective owner. This independent educational simulator uses no official questions,
          recordings, logos, scoring model, or confidential test content. A practice estimate cannot predict or replace an official result.
        </p>
      </section>
    </main>
    <footer class="site-foo