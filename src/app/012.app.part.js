core, certificate, question set, or prediction.',
    candidateId: result.candidateId,
    label: result.label,
    completedAt: new Date(result.completedAt).toISOString(),
    elapsedMs: result.elapsedMs,
    percent: Number(result.percent.toFixed(2)),
    practiceGse: result.mode === 'full' ? result.practiceGse : null,
    cefrOrientation: result.mode === 'full' ? result.cefr : null,
    readiness: result.readiness,
    confidence: result.confidence,
    skills: result.skills,
    sections: result.sections,
    itemResults: result.itemResults,
    answers
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `vpet-level-2-${result.formId || result.sectionCode}-${new Date(result.completedAt).toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function renderFatalStructureError(errors) {
  app.innerHTML = `
    <main class="fatal-error">
      ${icon('warning')}
      <h1>Test-bank validation failed</h1>
      <p>The simulator refused to start because the local question bank does not match the declared Level 2 structure.</p>
      <pre>${escapeHtml(errors.join('\n'))}</pre>
    </main>
  `;
}

function render() {
  activeCleanup();
  activeCleanup = () => {};

  if (state.view === 'home') renderHome();
  else if (state.view === 'history') renderHistory();
  else if (state.view === 'setup') renderSetup();
  else if (state.view === 'exam') {
    if (state.showInstruction) renderExamInstruction();
    else renderCurrentQuestion();
  } else if (state.view === 'results') renderResults();
  else renderHome();
}

window.addEventListener('beforeunload', (event) => {
  if (state.view !== 'exam') return;
  saveActiveAttempt();
  event.preventDefault();
  event.returnValue = '';
});

window.addEventListener('visibilitychange', () => {
  if (document.hidden && state.view === 'exam') saveActiveAttempt();
});

window.speechSynthesis?.addEventListener?.('voiceschanged', () => selectEnglishVoice());

const structuralErrors = Object.values(TEST_FORMS)
  .flatMap((form) => {
    const verification = verifyFormStructure(form);
    return verification.valid ? [] : verification.errors.map((error) => `${form.name}: ${error}`);
  });

if (structuralErrors.length) renderFatalStructureError(structuralErrors);
else render();
