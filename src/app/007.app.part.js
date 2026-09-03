    <div class="sample-card-head"><span>UNSCORED EXAMPLE</span>${hasAudio ? `<button class="sample-audio-button" id="play-instruction-sample" type="button">${icon('play')} Play sample</button>` : ''}</div>
              <div class="sample-prompt"><small>PROMPT</small><p>${samplePrompt}</p></div>
              <div class="sample-answer"><small>STRONG RESPONSE</small><p>${escapeHtml(meta.sample.answer)}</p></div>
              <p class="sample-explanation">${icon('info')} ${escapeHtml(meta.sample.explanation)}</p>
            </article>
          </div>
          <footer class="instruction-footer">
            <div>${icon('warning')} <span>The first timer starts after you select <strong>Begin Part ${item.section}</strong>.</span></div>
            <button class="primary-button large" id="begin-section" type="button">Begin Part ${item.section} ${icon('arrow')}</button>
          </footer>
        </section>
      </main>
    </div>
  `;

  bindExamCommon();
  document.querySelector('#play-instruction-sample')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.innerHTML = `${icon('audio')} Playing…`;
    try {
      await speak(meta.sample.prompt);
    } finally {
      button.disabled = false;
      button.innerHTML = `${icon('play')} Replay sample`;
    }
  });
  document.querySelector('#begin-section')?.addEventListener('click', () => {
    state.showInstruction = false;
    saveActiveAttempt();
    render();
  });
  setCleanup(() => window.speechSynthesis?.cancel?.());
}

function completeCurrentItem(answer) {
  const item = state.currentItems[state.currentIndex];
  state.answers[item.id] = {
    ...answer,
    itemId: item.id,
    completedAt: Date.now()
  };
  const currentSection = item.section;
  state.currentIndex += 1;

  if (state.currentIndex >= state.currentItems.length) {
    finishAttempt();
    return;
  }

  const nextItem = state.currentItems[state.currentIndex];
  state.showInstruction = nextItem.section !== currentSection;
  saveActiveAttempt();
  render();
}

function renderCurrentQuestion() {
  const item = state.currentItems[state.currentIndex];
  switch (item.type) {
    case 'sentence-completion':
      renderSentenceCompletion(item);
      break;
    case 'passage-reconstruction':
      renderPassageReconstruction(item);
      break;
    case 'reading-comprehension':
      renderReadingComprehension(item);
      break;
    case 'email-writing':
      renderEmailWriting(item);
      break;
    case 'dictation':
      renderDictation(item);
      break;
    case 'response-selection':
      renderResponseSelection(item);
      break;
    case 'passage-comprehension':
      renderPassageComprehension(item);
      break;
    case 'repeat':
      renderRepeat(item);
      break;
    case 'speaking-situation':
      renderSpeakingSituation(item);
      break;
    case 'story-retelling':
      renderStoryRetelling(item);
      break;
    default:
      completeCurrentItem({ text: '', timedOut: true });
  }
}

function renderSentenceCompletion(item) {
  const prompt = escapeHtml(item.prompt).replace('___', '<span class="sentence-gap" aria-hidden="true">________</span>');
  const frameCleanup = renderExamFrame(
    item,
    `<div class="task-layout centered-task">
      <div class="task-kicker">TYPE ONE WORD</div>
      <h2 class="task-title">Complete the sentence.</h2>
      <div class="sentence-card"><p>${prompt}</p></div>
      <label class="answer-label" for="sentence-answer">Your answer</label>
      <input id="sentence-answer" class="answer-input one-word" type="text" maxlength="40" autocomplete="off" spellcheck="false" aria-label="One-word answer" />
      <p class="input-hint">One word only. The item advances when the timer reaches zero.</p>
    </div>`,
    { status: 'Enter the word that best completes both meaning and grammar.' }
  );

  const input = document.querySelector('#sentence-answer');
  let submitted = false;
  const submit = (timedOut = false) => {
    if (submitted) return;
    submitted = true;
    timer.stop();
    completeCurrentItem({ text: input.value.trim(), timedOut });
  };
  const timer = startCountdown(item.duration, () => submit(true), { label: 'TIME LEFT' });
  setNextButton({ enabled: true, onClick: () => submit(false) });
  input.focus();
  input.addEventListener('input', () => {
    const firstWord = input.value.trim().split(/\s+/)[0] ?? '';
    if (input.value.trim().includes(' ')) input.value = firstWord;
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') submit(false);
  });
  setCleanup(() => {
    submitted = true;
    timer.stop();
    frameCleanup();
  });
}

function renderPassageReconstruction(item) {
  const frameCleanup = renderExamFrame(
    item,
    `<div class="task-layout reconstruction-task" id="reconstruction-stage">
      <div class="task-kicker">READ AND REMEMBER</div>
      <h2 class="task-title">Read the passage carefully.</h2>
      <p class="task-subtitle">The passage will disappear after 30 seconds. You will then reconstruct its meaning.</p>
      <article class="reading-passage prominent"><p>${escapeHtml(item.passage)}</p></article>
      <div class="memory-cues"><span>WHO / WHAT</span><span>ACTION</span><span>NUMBERS</span><span>CAUSE</span><span>RESULT</span></div>
    </div>`,
    { status: 'Read only. You cannot type until the passage disappears.' }
  );

  let timer;
  let phase = 'read';
  let submitted = false;
  const stage = document.querySelector('#reconstruction-stage');

  const beginWriting = () => {
    if (submitted || phase !== 'read') return;
    timer?.stop();
    phase = 'write';
    stage.innerHTML = `
      <div class="task-kicker">RECONSTRUCT FROM MEMORY</div>
      <h2 class="task-title">Write the passage in your own words.</h2>
      <p class="task-subtitle">Preserve the important facts and relationships. Exact wording is not required.</p>
      <textarea id="reconstruction-answer" class="answer-editor reconstruction-editor" spellcheck="true" aria-label="Reconstructed passage"></textarea>
      <div class="editor-meta"><span id="reconstruction-words">0 words</span><span>Meaning matters more than exact wording</span></div>
    `;
    setQuestionStatus('The source passage is no longer available. Reconstruct its meaning now.');
    const editor = document.querySelector('#reconstruction-answer');
    const wordsOutput = document.querySelector('#reconstruction-words');
    editor.addEventListener('input', () => {
      wordsOutput.textContent = `${wordCount(editor.value)} words`;
    });
    editor.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') submit(false);
    });
    editor.focus();
    setNextButton({ enabled: true, onClick: () => submit(false) });
    timer = startCountdown(item.duration, () => submit(true), { label: 'WRITE TIME' });
  };

  const submit = (timedOut) => {
    if (submitted) return;
    submitted = true;
    timer?.stop();
    const editor = document.querySelector('#reconstruction-answer');
    completeCurrentItem({ text: editor?.value?.trim() ?? '', timedOut, phaseCompleted: phase });
  };

  setNextButton({ enabled: false, label: 'READING' });
  timer = startCountdown(item.readDuration, beginWriting, { label: 'READ TIME' });
  setCleanup(() => {
    submitted = true;
    timer?.stop();
    frameCleanup();
  });
}

function renderReadingComprehension(item) {
  const questions = item.questions
    .map(
      (question, questionIndex) => `
        <fieldset class="reading-question" data-question-index="${questionIndex}">
          <legend><span>${questionIndex + 1}</span>${escapeHtml(question.prompt)}</legend>
          <div class="option-list">
            ${question.options
              .map(
                (option, optionIndex) => `
                  <label class="option-row">
                    <input type="radio" name="question-${questionIndex}" value="${optionIndex}" />
                    <span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span>
                    <span>${escapeHtml(option)}</span>
                  </label>
       