 enabled: false, label: 'LISTEN' });
  setTimerWaiting('AUDIO');
  orb.classList.add('playing');
  const spokenOptions = item.options
    .map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`)
    .join(' ');
  speak(`${item.prompt} Possible responses. ${spokenOptions}`)
    .catch((error) => {
      if (!canceled) setQuestionStatus(error.message, 'error');
    })
    .finally(() => {
      if (canceled || submitted) return;
      orb.classList.remove('playing');
      document.querySelector('#response-helper').textContent = 'Select the response now.';
      choiceButtons.forEach((button) => { button.disabled = false; });
      setNextButton({ enabled: true, onClick: () => submit(false) });
      timer = startCountdown(item.duration, () => submit(true), { label: 'ANSWER' });
    });

  choiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedIndex = Number(button.dataset.choice);
      choiceButtons.forEach((candidate) => candidate.classList.toggle('selected', candidate === button));
    });
  });
  document.addEventListener('keydown', handleNumberKey);
  function handleNumberKey(event) {
    if (!timer || !['1', '2', '3'].includes(event.key)) return;
    const index = Number(event.key) - 1;
    choiceButtons[index]?.click();
  }
  setCleanup(() => {
    canceled = true;
    submitted = true;
    timer?.stop();
    document.removeEventListener('keydown', handleNumberKey);
    window.speechSynthesis?.cancel?.();
    frameCleanup();
  });
}

function renderSpokenResponse(item, config) {
  const assist = state.strictMode
    ? ''
    : `<aside class="assist-transcript"><small>TRAINING ASSIST</small><p>${escapeHtml(config.assistText)}</p>${config.assistPoints?.length ? `<ul>${config.assistPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>` : ''}</aside>`;
  const frameCleanup = renderExamFrame(
    item,
    `<div class="spoken-task-layout">
      <section class="spoken-main">
        <div class="audio-orb large" id="spoken-orb">${icon('audio')}</div>
        <div class="task-kicker" id="spoken-kicker">LISTEN CAREFULLY</div>
        <h2 class="task-title" id="spoken-title">${escapeHtml(config.initialTitle)}</h2>
        <p class="task-subtitle" id="spoken-subtitle">${escapeHtml(config.initialSubtitle)}</p>
        <div class="speech-capture" id="speech-capture" hidden>
          <div class="live-mic">${icon('mic')}<span><i id="mic-level"></i></span><strong id="recording-state">RECORDING</strong></div>
          <p id="live-transcript" class="live-transcript ${state.strictMode ? 'visually-hidden' : ''}">${state.strictMode ? '' : 'Your browser transcript will appear here when supported.'}</p>
        </div>
        <div id="speech-fallback"></div>
      </section>
      ${assist}
    </div>`,
    { status: config.status }
  );

  const orb = document.querySelector('#spoken-orb');
  const title = document.querySelector('#spoken-title');
  const subtitle = document.querySelector('#spoken-subtitle');
  const kicker = document.querySelector('#spoken-kicker');
  const capturePanel = document.querySelector('#speech-capture');
  const transcriptOutput = document.querySelector('#live-transcript');
  const fallback = document.querySelector('#speech-fallback');
  let timer = null;
  let recorderControl = null;
  let canceled = false;
  let submitted = false;
  let phase = 'audio';
  let prepResolve = null;

  setNextButton({ enabled: false, label: 'LISTEN' });
  setTimerWaiting('AUDIO');
  orb.classList.add('playing');

  const finishResponse = async (timedOut = false) => {
    if (submitted) return;
    submitted = true;
    timer?.stop();
    setNextButton({ enabled: false, label: 'SAVING' });
    setQuestionStatus('Saving this response and advancing…');

    let response = {};
    if (recorderControl) {
      response = await recorderControl.stop().catch(() => ({}));
    } else {
      const typed = document.querySelector('#speech-fallback-answer');
      response = { text: typed?.value?.trim() ?? '', transcript: typed?.value?.trim() ?? '', audioDuration: 0 };
    }
    completeCurrentItem({ ...response, timedOut, capturePhase: phase });
  };

  const beginResponseWindow = async () => {
    if (canceled || submitted) return;
    phase = 'recording';
    await playBeep();
    if (canceled || submitted) return;
    orb.classList.remove('playing');
    orb.classList.add('recording');
    orb.innerHTML = icon('mic');
    kicker.textContent = 'SPEAK NOW';
    title.textContent = config.responseTitle;
    subtitle.textContent = config.responseSubtitle;
    capturePanel.hidden = false;
    setQuestionStatus(config.recordingStatus ?? 'Speak clearly until you finish or the timer ends.');

    try {
      recorderControl = await beginRecording({
        onLevel: (level) => {
          const meter = document.querySelector('#mic-level');
          if (meter) meter.style.width = `${Math.max(2, Math.round(level * 100))}%`;
        },
        onTranscript: (transcript) => {
          if (!state.strictMode && transcriptOutput) transcriptOutput.textContent = transcript || 'Listening…';
        }
      });
      setNextButton({ enabled: true, label: 'FINISH', onClick: () => finishResponse(false) });
      timer = startCountdown(config.responseSeconds, () => finishResponse(true), { label: 'RESPONSE' });
    } catch (error) {
      orb.classList.remove('recording');
      capturePanel.hidden = true;
      fallback.innerHTML = `
        <div class="fallback-response">
          ${icon('warning')}
          <div><strong>Microphone capture became unavailable.</strong><p>${escapeHtml(error.message)} Type what you would have said so the practice attempt can continue.</p></div>
        </div>
        <textarea id="speech-fallback-answer" class="answer-editor fallback-editor" aria-label="Typed speaking response"></textarea>
      `;
      setQuestionStatus('Typed fallback active. This item will have lower speaking-score confidence.', 'error');
      setNextButton({ enabled: true, label: 'FINISH', onClick: () => finishResponse(false) });
      timer = startCountdown(config.responseSeconds, () => finishResponse(true), { label: 'RESPONSE' });
      document.querySelector('#speech-fallback-answer')?.focus();
    }
  };

  const beginPreparation = async () => {
    if (canceled || submitted) return;
    if (!config.prepSeconds) {
      await beginResponseWindow();
      return;
    }
    phase = 'preparation';
    orb.classList.remove('playing');
    orb.classList.add('preparing');
    orb.innerHTML = icon('clock');
    kicker.textContent = 'PREPARE YOUR RESPONSE';
    title.textContent = 'Organize your main points.';
    subtitle.textContent = `Speaking begins automatically after ${config.prepSeconds} seconds.`;
    setQuestionStatus('Preparation time only. Do not begin speaking until the tone.');
    setNextButton({ enabled: false, label: 'PREPARE' });
    await new Promise((resolve) => {
      prepResolve = resolve;
      timer = startCountdown(config.prepSeconds, resolve, { label: 'PREP TIME' });
    });
    prepResolve = null;
    timer?.stop();
    await beginResponseWindow();
  };

  speak(config.audioText)
    .catch((error) => {
      if (!canceled) setQuestionStatus(error.message, 'error');
    })
    .finally(async () => {
      if (canceled || submitted) return;
      await beginPreparation();
    });

  setCleanup(() => {
    canceled = true;
    submitted = true;
    prepResolve?.();
    timer?.stop();
    recorderControl?.cancel?.();
    window.speechSynthesis?.cancel?.();
    frameCleanup();
  });
}

function renderPassageComprehension(item) {
  const audioText = item.playStory
    ? `${item.story} The passage is complete. Question. ${item.question}`
    : `Question. ${item.question}`;
  renderSpokenResponse(item, {
    initialTitle: item.playStory ? 'Listen to the passage and the first question.' : 'Listen to the next question.',
    initialSubtitle: item.playStory ? 'The passage is played once. Three questions follow.' : 'The passage will not be replayed.',
    audioText,
    assistText: item.playStory ? `${item.story}\n\nQuestion: ${item.question}` : item.question,
    responseTitle: 'Answer in a