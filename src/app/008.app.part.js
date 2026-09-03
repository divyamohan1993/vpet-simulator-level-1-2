         `
              )
              .join('')}
          </div>
        </fieldset>
      `
    )
    .join('');

  const frameCleanup = renderExamFrame(
    item,
    `<div class="reading-comprehension-layout">
      <section class="passage-column">
        <div class="task-kicker">READ THE PASSAGE</div>
        <article class="reading-passage"><p>${escapeHtml(item.passage)}</p></article>
      </section>
      <section class="questions-column">
        <div class="task-kicker">SELECT ONE ANSWER FOR EACH QUESTION</div>
        ${questions}
      </section>
    </div>`,
    { status: 'Both answers are submitted together. Select the option supported by the passage.' }
  );

  let submitted = false;
  const submit = (timedOut) => {
    if (submitted) return;
    submitted = true;
    timer.stop();
    const selections = item.questions.map((_, index) => {
      const selected = document.querySelector(`input[name="question-${index}"]:checked`);
      return selected ? Number(selected.value) : -1;
    });
    completeCurrentItem({ selections, timedOut });
  };
  const timer = startCountdown(item.duration, () => submit(true), { label: 'TIME LEFT' });
  setNextButton({ enabled: true, onClick: () => submit(false) });

  document.querySelectorAll('.option-row input').forEach((input) => {
    input.addEventListener('change', () => {
      input.closest('fieldset').querySelectorAll('.option-row').forEach((row) => row.classList.remove('selected'));
      input.closest('.option-row').classList.add('selected');
    });
  });
  setCleanup(() => {
    submitted = true;
    timer.stop();
    frameCleanup();
  });
}

function renderEmailWriting(item) {
  const points = item.requiredPoints
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join('');
  const frameCleanup = renderExamFrame(
    item,
    `<div class="email-task-layout">
      <aside class="email-brief">
        <div class="task-kicker">WRITING TASK</div>
        <h2>Write to ${escapeHtml(item.recipient)}.</h2>
        <p>${escapeHtml(item.scenario)}</p>
        <h3>Your e-mail must:</h3>
        <ol>${points}</ol>
        <div class="minimum-rule"><strong>${item.minWords}+</strong><span>minimum words</span></div>
      </aside>
      <section class="email-composer">
        <div class="email-fields">
          <label>To <input value="${escapeHtml(item.recipient)}" readonly tabindex="-1" /></label>
          <label>Subject <input id="email-subject" maxlength="120" autocomplete="off" placeholder="Write a clear subject" /></label>
        </div>
        <textarea id="email-answer" class="answer-editor email-editor" spellcheck="true" aria-label="Professional e-mail response" placeholder="Write your e-mail here…"></textarea>
        <div class="editor-meta"><span id="email-words" class="below-minimum">0 / ${item.minWords} words</span><span>Ctrl/⌘ + Enter submits</span></div>
      </section>
    </div>`,
    { status: 'Address every task point and write at least 100 words.' }
  );

  const subject = document.querySelector('#email-subject');
  const editor = document.querySelector('#email-answer');
  const counter = document.querySelector('#email-words');
  let submitted = false;

  const updateCount = () => {
    const count = wordCount(editor.value);
    counter.textContent = `${count} / ${item.minWords} words`;
    counter.classList.toggle('minimum-met', count >= item.minWords);
    counter.classList.toggle('below-minimum', count < item.minWords);
  };
  editor.addEventListener('input', updateCount);
  editor.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') submit(false);
  });
  subject.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') editor.focus();
  });

  const submit = (timedOut) => {
    if (submitted) return;
    submitted = true;
    timer.stop();
    const body = editor.value.trim();
    const text = subject.value.trim() ? `Subject: ${subject.value.trim()}\n\n${body}` : body;
    completeCurrentItem({ text, subject: subject.value.trim(), body, timedOut });
  };
  const timer = startCountdown(item.duration, () => submit(true), { label: 'WRITE TIME' });
  setNextButton({ enabled: true, onClick: () => submit(false) });
  subject.focus();
  setCleanup(() => {
    submitted = true;
    timer.stop();
    frameCleanup();
  });
}

function renderDictation(item) {
  const frameCleanup = renderExamFrame(
    item,
    `<div class="task-layout centered-task listening-task">
      <div class="audio-orb" id="audio-orb">${icon('audio')}</div>
      <div class="task-kicker" id="dictation-kicker">LISTENING</div>
      <h2 class="task-title" id="dictation-title">Listen to the sentence.</h2>
      <p class="task-subtitle">It will be played once. Type every word you hear.</p>
      <label class="answer-label" for="dictation-answer">Your dictation</label>
      <textarea id="dictation-answer" class="answer-editor dictation-editor" spellcheck="true" aria-label="Dictated sentence"></textarea>
    </div>`,
    { status: 'Audio is preparing. The response timer begins when the sentence ends.' }
  );

  const editor = document.querySelector('#dictation-answer');
  const orb = document.querySelector('#audio-orb');
  let submitted = false;
  let timer = null;
  let canceled = false;

  const submit = (timedOut) => {
    if (submitted) return;
    submitted = true;
    timer?.stop();
    completeCurrentItem({ text: editor.value.trim(), timedOut });
  };

  setNextButton({ enabled: false, label: 'LISTEN' });
  setTimerWaiting('AUDIO');
  orb.classList.add('playing');
  speak(item.audioText)
    .catch((error) => {
      if (!canceled) setQuestionStatus(error.message, 'error');
    })
    .finally(() => {
      if (canceled || submitted) return;
      orb.classList.remove('playing');
      document.querySelector('#dictation-kicker').textContent = 'TYPE WHAT YOU HEARD';
      document.querySelector('#dictation-title').textContent = 'Reconstruct the complete sentence.';
      setQuestionStatus('The sentence will not be replayed. Check word order and grammatical endings.');
      setNextButton({ enabled: true, onClick: () => submit(false) });
      timer = startCountdown(item.duration, () => submit(true), { label: 'TIME LEFT' });
      editor.focus();
    });

  editor.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && timer) submit(false);
  });
  setCleanup(() => {
    canceled = true;
    submitted = true;
    timer?.stop();
    window.speechSynthesis?.cancel?.();
    frameCleanup();
  });
}

function renderResponseSelection(item) {
  const visibleOptions = state.strictMode
    ? item.options.map((_, index) => `<span class="response-choice-label">${String.fromCharCode(65 + index)}</span>`)
    : item.options.map((option, index) => `<span><b>${String.fromCharCode(65 + index)}</b>${escapeHtml(option)}</span>`);
  const frameCleanup = renderExamFrame(
    item,
    `<div class="task-layout centered-task response-task">
      <div class="audio-orb" id="audio-orb">${icon('audio')}</div>
      <div class="task-kicker">LISTEN TO THE PROMPT AND THREE RESPONSES</div>
      <h2 class="task-title" id="response-title">Choose the most appropriate response.</h2>
      <p class="task-subtitle" id="response-helper">The audio is played once. Options become active when it ends.</p>
      <div class="response-choice-grid ${state.strictMode ? 'strict-choices' : ''}" id="response-choices">
        ${visibleOptions
          .map(
            (content, index) => `<button type="button" class="response-choice" data-choice="${index}" disabled>${content}</button>`
          )
          .join('')}
      </div>
    </div>`,
    { status: 'Listen for the speaker’s purpose, then select A, B, or C.' }
  );

  let selectedIndex = -1;
  let submitted = false;
  let timer = null;
  let canceled = false;
  const orb = document.querySelector('#audio-orb');
  const choiceButtons = [...document.querySelectorAll('.response-choice')];

  const submit = (timedOut) => {
    if (submitted) return;
    submitted = true;
    timer?.stop();
    completeCurrentItem({ selectedIndex, timedOut });
  };

  setNextButton({