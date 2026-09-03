ction':
      return `<p>${escapeHtml(item.options[item.correctIndex])}</p>`;
    case 'passage-comprehension':
      return `<p>${escapeHtml(item.accepted[0])}</p>`;
    case 'speaking-situation':
      return `<ol>${item.requiredPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ol>`;
    case 'story-retelling':
      return `<p>Key event groups: ${item.expectedKeywords.map((group) => escapeHtml(group.slice(0, 4).join(' / '))).join('; ')}.</p>`;
    default:
      return '<p>Reference unavailable.</p>';
  }
}

function promptHtml(item) {
  switch (item.type) {
    case 'sentence-completion':
      return escapeHtml(item.prompt);
    case 'passage-reconstruction':
    case 'reading-comprehension':
      return escapeHtml(item.passage);
    case 'email-writing':
      return `${escapeHtml(item.scenario)} Write to ${escapeHtml(item.recipient)}.`;
    case 'dictation':
    case 'repeat':
      return 'One spoken sentence.';
    case 'response-selection':
      return escapeHtml(item.prompt);
    case 'passage-comprehension':
      return escapeHtml(item.question);
    case 'speaking-situation':
      return escapeHtml(item.situation);
    case 'story-retelling':
      return 'One spoken story.';
    default:
      return '';
  }
}

function renderReview(result) {
  return result.items
    .map((item, index) => {
      const itemResult = result.itemResults[index];
      const percent = itemResult.max ? (itemResult.earned / itemResult.max) * 100 : 0;
      return `
        <article class="review-item">
          <header>
            <span class="section-letter tiny">${item.section}</span>
            <div><small>${escapeHtml(SECTION_META[item.section].title)}</small><strong>${promptHtml(item)}</strong></div>
            <span class="review-score ${scoreTone(percent)}">${itemResult.earned.toFixed(1)} / ${itemResult.max}</span>
          </header>
          <div class="review-columns">
            <section><small>YOUR RESPONSE</small>${userAnswerHtml(item, result.answers[item.id])}</section>
            <section><small>REFERENCE EVIDENCE</small>${referenceAnswerHtml(item)}</section>
          </div>
          <footer><span>${itemResult.confidence === 'low' ? `${icon('warning')} Low-confidence speaking estimate` : `${icon('check')} Scoring evidence available`}</span><p>${escapeHtml(itemResult.feedback)}</p></footer>
        </article>
      `;
    })
    .join('');
}

function renderResults() {
  const result = state.result;
  if (!result) {
    state.view = 'home';
    render();
    return;
  }
  const rounded = Math.round(result.percent);
  const { strongest } = strongestAndWeakest(result);
  const confidenceMessage = result.lowConfidenceCount
    ? `${result.lowConfidenceCount} spoken response${result.lowConfidenceCount === 1 ? '' : 's'} lacked a browser transcript, so speaking-related estimates are lower confidence.`
    : 'All scorable responses included sufficient response evidence for the practice model.';

  app.innerHTML = `
    ${renderTopBar('home')}
    <main class="page-shell results-page">
      <section class="result-hero ${scoreTone(result.percent)}">
        <div class="result-hero-copy">
          <span class="eyebrow">ATTEMPT COMPLETE</span>
          <h1>${escapeHtml(result.label)}</h1>
          <p>${dateLabel(result.completedAt)} · ${formatDuration(result.elapsedMs)} · Candidate ${escapeHtml(result.candidateId)}</p>
          <div class="result-actions no-print">
            <button class="primary-button" id="results-home" type="button">Return to trainer</button>
            <button class="secondary-button" id="print-report" type="button">${icon('print')} Print report</button>
            <button class="secondary-button" id="download-report" type="button">${icon('download')} Download JSON</button>
          </div>
        </div>
        <div class="overall-score-dial" style="--score-angle:${Math.round(result.percent * 3.6)}deg">
          <div><strong>${rounded}%</strong><span>${escapeHtml(result.readiness)}</span></div>
        </div>
        ${result.mode === 'full' ? `
          <div class="estimate-card">
            <small>HEURISTIC PRACTICE ESTIMATE</small>
            <strong>GSE ${result.practiceGse}</strong>
            <span>${escapeHtml(result.cefr)} band</span>
          </div>
        ` : ''}
      </section>

      <section class="result-disclaimer">
        ${icon('info')}
        <div><strong>This is not an official score or pass decision.</strong><p>The percentage is produced by transparent answer-key and coverage heuristics. The GSE-style estimate is an orientation aid only; institutions set their own requirements.</p></div>
      </section>

      <section class="result-section">
        <div class="section-heading-row compact-heading"><div><span class="eyebrow">FOUR-SKILL PROFILE</span><h2>Performance by language skill</h2></div><span class="confidence-pill ${result.confidence}">${result.confidence.toUpperCase()} ESTIMATE CONFIDENCE</span></div>
        <div class="skill-result-grid">${renderSkillCards(result)}</div>
        <p class="confidence-explanation">${escapeHtml(confidenceMessage)}</p>
      </section>

      <section class="result-columns">
        <div class="result-section">
          <div class="section-heading-row compact-heading"><div><span class="eyebrow">SECTION EVIDENCE</span><h2>Part-by-part performance</h2></div></div>
          <div class="section-results-list">${renderSectionResults(result)}</div>
        </div>
        <aside class="strength-card">
          <span class="eyebrow">CURRENT STRENGTHS</span>
          <h2>Build from what already works</h2>
          ${strongest.map(([section, value]) => `<div><span class="section-letter small">${section}</span><p><strong>${escapeHtml(SECTION_META[section].title)}</strong><small>${Math.round(value.percent)}% practice evidence</small></p></div>`).join('')}
          <p class="strength-note">Maintain these sections while shifting most deliberate practice to the lowest-scoring parts.</p>
        </aside>
      </section>

      <section class="result-section recommendations-section">
        <div class="section-heading-row compact-heading"><div><span class="eyebrow">PRIORITIZED TRAINING</span><h2>What to practise next</h2></div><p>Ordered by the weakest section evidence in this attempt.</p></div>
        <div class="recommendation-grid">${renderRecommendations(result)}</div>
      </section>

      <section class="review-section">
        <div class="review-heading">
          <div><span class="eyebrow">QUESTION-BY-QUESTION REVIEW</span><h2>Inspect response evidence</h2><p>Reference answers appear only after the timed attempt is complete.</p></div>
          <button class="secondary-button no-print" id="toggle-review" type="button">${state.reviewOpen ? 'Hide detailed review' : 'Open detailed review'}</button>
        </div>
        ${state.reviewOpen ? `<div class="review-list">${renderReview(result)}</div>` : ''}
      </section>
    </main>
  `;

  bindTopBar();
  document.querySelector('#results-home')?.addEventListener('click', () => {
    revokePlaybackUrls();
    state.result = null;
    state.view = 'home';
    render();
  });
  document.querySelector('#print-report')?.addEventListener('click', () => window.print());
  document.querySelector('#download-report')?.addEventListener('click', downloadResultReport);
  document.querySelector('#toggle-review')?.addEventListener('click', () => {
    state.reviewOpen = !state.reviewOpen;
    renderResults();
  });
  document.querySelectorAll('[data-retry-section]').forEach((button) => {
    button.addEventListener('click', () => {
      revokePlaybackUrls();
      openSetup({ mode: 'section', formId: state.formId ?? 'A', sectionCode: button.dataset.retrySection });
    });
  });
}

function downloadResultReport() {
  const result = state.result;
  if (!result) return;
  const answers = Object.fromEntries(
    Object.entries(result.answers).map(([itemId, answer]) => {
      const { audioUrl, ...serializable } = answer;
      return [itemId, serializable];
    })
  );
  const report = {
    simulator: 'VPET Level 2 independent practice simulator',
    notice: 'Not an official Pearson s