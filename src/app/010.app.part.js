 short phrase or sentence.',
    responseSubtitle: state.strictMode ? 'Only the answer is required.' : item.question,
    responseSeconds: item.duration,
    status: item.playStory ? 'Listen for people, events, reasons, and outcomes.' : 'Recall the passage and answer only this question.',
    recordingStatus: 'Give a concise spoken answer. The next question follows automatically.'
  });
}

function renderRepeat(item) {
  renderSpokenResponse(item, {
    initialTitle: 'Listen to the sentence.',
    initialSubtitle: 'It is played once. Repeat it exactly after the tone.',
    audioText: item.audioText,
    assistText: item.audioText,
    responseTitle: 'Repeat the complete sentence.',
    responseSubtitle: 'Begin promptly and preserve the original word order.',
    responseSeconds: item.duration,
    status: 'Hold the sentence in thought groups. Do not speak over the audio.',
    recordingStatus: 'Repeat now. Aim to begin within six seconds of the tone.'
  });
}

function renderSpeakingSituation(item) {
  renderSpokenResponse(item, {
    initialTitle: 'Listen to the situation.',
    initialSubtitle: 'You will have 10 seconds to prepare, then 60 seconds to respond.',
    audioText: `${item.situation} Speak directly to ${item.listener}.`,
    assistText: item.situation,
    assistPoints: item.requiredPoints,
    prepSeconds: item.prepDuration,
    responseTitle: `Speak to ${item.listener}.`,
    responseSubtitle: 'Address the situation completely and professionally.',
    responseSeconds: item.duration,
    status: 'Listen for your role, the listener, the problem, and every requested action.',
    recordingStatus: 'Respond as though the listener is present. Cover all requested actions.'
  });
}

function renderStoryRetelling(item) {
  renderSpokenResponse(item, {
    initialTitle: 'Listen to the story.',
    initialSubtitle: 'After the tone, retell the story in your own words.',
    audioText: item.story,
    assistText: item.story,
    responseTitle: 'Retell the story now.',
    responseSubtitle: 'Include the setting, problem, response, and result.',
    responseSeconds: item.duration,
    status: 'Follow the sequence of events. The story is played once.',
    recordingStatus: 'Retell chronologically. Include key facts rather than personal commentary.'
  });
}

function finishAttempt() {
  const completedAt = Date.now();
  const elapsedMs = Math.max(0, completedAt - (state.startedAt ?? completedAt));
  const scored = scoreAttempt(state.currentItems, state.answers);
  state.result = {
    ...scored,
    mode: state.mode,
    formId: state.formId,
    sectionCode: state.sectionCode,
    candidateId: state.candidateId,
    label: currentTestLabel(),
    startedAt: state.startedAt,
    completedAt,
    elapsedMs,
    items: state.currentItems,
    answers: state.answers
  };

  const summary = {
    id: `${completedAt}-${state.formId}-${state.sectionCode ?? 'FULL'}`,
    mode: state.mode,
    formId: state.formId,
    sectionCode: state.sectionCode,
    label: currentTestLabel(),
    completedAt,
    elapsedMs,
    percent: scored.percent,
    practiceGse: scored.practiceGse,
    cefr: scored.cefr,
    readiness: scored.readiness,
    confidence: scored.confidence,
    skills: Object.fromEntries(Object.entries(scored.skills).map(([skill, value]) => [skill, Math.round(value.percent)])),
    sections: Object.fromEntries(Object.entries(scored.sections).map(([section, value]) => [section, Math.round(value.percent)]))
  };
  state.history = [summary, ...state.history].slice(0, 30);
  saveJson(STORAGE_KEYS.history, state.history);
  localStorage.removeItem(STORAGE_KEYS.active);
  state.reviewOpen = false;
  state.view = 'results';
  stopMediaStream();
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  render();
}

function scoreTone(percent) {
  if (percent >= 80) return 'excellent';
  if (percent >= 65) return 'good';
  if (percent >= 50) return 'developing';
  return 'priority';
}

function strongestAndWeakest(result) {
  const entries = Object.entries(result.sections).sort((left, right) => right[1].percent - left[1].percent);
  return {
    strongest: entries.slice(0, 2),
    weakest: [...entries].reverse().slice(0, Math.min(3, entries.length))
  };
}

function renderSkillCards(result) {
  return Object.entries(result.skills)
    .map(([skill, value]) => {
      const rounded = Math.round(value.percent);
      return `
        <article class="skill-result-card ${scoreTone(value.percent)}">
          <div><span>${escapeHtml(skill)}</span><strong>${rounded}%</strong></div>
          <div class="result-bar"><i style="width:${Math.max(2, rounded)}%"></i></div>
          <small>${value.earned.toFixed(1)} of ${value.max.toFixed(1)} weighted points</small>
        </article>
      `;
    })
    .join('');
}

function renderSectionResults(result) {
  return Object.entries(result.sections)
    .map(([section, value]) => {
      const meta = SECTION_META[section];
      const rounded = Math.round(value.percent);
      return `
        <div class="section-result-row">
          <span class="section-letter small">${section}</span>
          <div class="section-result-name"><strong>${escapeHtml(meta.title)}</strong><small>${meta.primarySkills.join(' + ')}</small></div>
          <div class="result-bar compact"><i style="width:${Math.max(2, rounded)}%"></i></div>
          <strong class="section-result-percent">${rounded}%</strong>
        </div>
      `;
    })
    .join('');
}

function renderRecommendations(result) {
  const { weakest } = strongestAndWeakest(result);
  return weakest
    .map(
      ([section, value], index) => `
        <article class="recommendation-card">
          <span class="recommendation-rank">${index + 1}</span>
          <div>
            <small>PART ${section} · ${Math.round(value.percent)}%</small>
            <h3>${escapeHtml(SECTION_META[section].title)}</h3>
            <p>${escapeHtml(SECTION_ADVICE[section])}</p>
            <button class="text-button" data-retry-section="${section}" type="button">Practise this section ${icon('arrow')}</button>
          </div>
        </article>
      `
    )
    .join('');
}

function userAnswerHtml(item, answer = {}) {
  if (item.type === 'reading-comprehension') {
    const selections = Array.isArray(answer.selections) ? answer.selections : [];
    return item.questions
      .map((question, index) => {
        const selected = selections[index];
        const text = Number.isInteger(selected) && selected >= 0 ? question.options[selected] : 'No answer';
        return `<p><strong>Q${index + 1}:</strong> ${escapeHtml(text)}</p>`;
      })
      .join('');
  }
  if (item.type === 'response-selection') {
    const selected = Number(answer.selectedIndex);
    return `<p>${selected >= 0 ? escapeHtml(item.options[selected]) : 'No answer'}</p>`;
  }
  const text = answer.text ?? answer.transcript ?? '';
  const recording = answer.audioUrl
    ? `<audio controls preload="metadata" src="${answer.audioUrl}"></audio>`
    : answer.audioDuration
      ? `<small>Recorded response: ${Number(answer.audioDuration).toFixed(1)} seconds</small>`
      : '';
  return `${text ? `<p class="response-text">${escapeHtml(text).replaceAll('\n', '<br />')}</p>` : '<p class="muted-response">No transcript or typed response available.</p>'}${recording}`;
}

function referenceAnswerHtml(item) {
  switch (item.type) {
    case 'sentence-completion':
      return `<p>${item.accepted.map(escapeHtml).join(' / ')}</p>`;
    case 'passage-reconstruction':
      return `<p>Retain these idea groups: ${item.expectedKeywords.map((group) => escapeHtml(group.slice(0, 3).join(' / '))).join('; ')}.</p>`;
    case 'reading-comprehension':
      return item.questions
        .map((question, index) => `<p><strong>Q${index + 1}:</strong> ${escapeHtml(question.options[question.correctIndex])}<br /><small>${escapeHtml(question.explanation)}</small></p>`)
        .join('');
    case 'email-writing':
      return `<ol>${item.requiredPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ol>`;
    case 'dictation':
    case 'repeat':
      return `<p>${escapeHtml(item.audioText)}</p>`;
    case 'response-sele