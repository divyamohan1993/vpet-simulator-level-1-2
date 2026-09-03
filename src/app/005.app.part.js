.media ? '' : 'unsupported'}">
            <div class="check-title">${icon('mic')}<div><strong>Microphone input</strong><small>${needsMic ? 'Required for speaking sections' : 'Not required for this drill'}</small></div><span id="mic-status" class="check-state ${state.setup.micOk ? 'passed' : ''}">${state.setup.micOk ? 'Passed' : support.media ? 'Not tested' : 'Unsupported'}</span></div>
            <p>Record a three-second sample, then play it back to confirm clarity.</p>
            <button class="secondary-button" id="test-mic" type="button" ${support.media ? '' : 'disabled'}>${icon('mic')} Record microphone sample</button>
            <div id="mic-test-output"></div>
          </article>
        </div>

        <div class="compatibility-strip">
          <span class="${support.speech ? 'ok' : 'bad'}">${icon(support.speech ? 'check' : 'warning')} Browser audio</span>
          <span class="${support.media ? 'ok' : 'bad'}">${icon(support.media ? 'check' : 'warning')} Recording</span>
          <span class="${support.recognition ? 'ok' : 'neutral'}">${icon(support.recognition ? 'check' : 'info')} ${support.recognition ? 'Speech transcript available' : 'Duration-only speaking estimate'}</span>
          <span class="${support.storage ? 'ok' : 'neutral'}">${icon(support.storage ? 'check' : 'info')} ${support.storage ? 'Autosave available' : 'Autosave unavailable'}</span>
        </div>

        <div class="setup-divider"></div>
        <label class="consent-row">
          <input id="consent" type="checkbox" ${state.setup.consent ? 'checked' : ''} />
          <span>I understand that this is an independent practice simulator, not an official test, score, certificate, or guarantee of a required result.</span>
        </label>
        <p id="setup-message" class="form-message" role="alert">${escapeHtml(state.setup.message)}</p>
        <button class="primary-button wide large" id="begin-test" type="button">Begin timed attempt ${icon('arrow')}</button>
      </section>
    </main>
  `;

  bindTopBar();
  document.querySelector('#setup-back')?.addEventListener('click', () => {
    stopMediaStream();
    state.view = 'home';
    render();
  });

  const rateInput = document.querySelector('#audio-rate');
  rateInput?.addEventListener('input', () => {
    state.audioRate = Number(rateInput.value);
    document.querySelector('#audio-rate-value').textContent = `${state.audioRate.toFixed(2)}×`;
  });

  document.querySelector('#test-audio')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.innerHTML = `${icon('audio')} Playing…`;
    try {
      state.audioRate = Number(document.querySelector('#audio-rate').value);
      await speak('The audio check is complete. Please confirm that every word was clear.', { rate: state.audioRate });
      state.setup.audioOk = true;
      const status = document.querySelector('#audio-status');
      status.textContent = 'Passed';
      status.classList.add('passed');
      button.innerHTML = `${icon('check')} Play again`;
    } catch (error) {
      state.setup.message = error.message;
      document.querySelector('#setup-message').textContent = error.message;
      button.innerHTML = `${icon('warning')} Try audio again`;
    } finally {
      button.disabled = false;
    }
  });

  document.querySelector('#test-mic')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const output = document.querySelector('#mic-test-output');
    button.disabled = true;
    button.innerHTML = `${icon('mic')} Recording 3…`;
    output.innerHTML = '<div class="mini-meter"><span></span></div>';
    let control;
    try {
      control = await beginRecording({
        onLevel: (level) => {
          const meter = output.querySelector('.mini-meter span');
          if (meter) meter.style.width = `${Math.max(3, level * 100)}%`;
        }
      });
      for (let remaining = 3; remaining > 0; remaining -= 1) {
        button.innerHTML = `${icon('mic')} Recording ${remaining}…`;
        await new Promise((resolve) => window.setTimeout(resolve, 1000));
      }
      const sample = await control.stop();
      state.setup.micOk = true;
      const status = document.querySelector('#mic-status');
      status.textContent = 'Passed';
      status.classList.add('passed');
      output.innerHTML = sample.audioUrl
        ? `<audio class="sample-playback" controls src="${sample.audioUrl}"></audio><small>Play the sample. A clear recording confirms the microphone path.</small>`
        : '<small>The microphone opened, but this browser did not create a playable sample.</small>';
      button.innerHTML = `${icon('check')} Record again`;
    } catch (error) {
      control?.cancel?.();
      state.setup.message = `Microphone check failed: ${error.message}`;
      document.querySelector('#setup-message').textContent = state.setup.message;
      output.innerHTML = '';
      button.innerHTML = `${icon('warning')} Try microphone again`;
    } finally {
      button.disabled = false;
    }
  });

  document.querySelector('#begin-test')?.addEventListener('click', beginConfiguredTest);
}

async function beginConfiguredTest() {
  const support = browserSupport();
  const needsAudio = speechRequired(state.currentItems);
  const needsMic = microphoneRequired(state.currentItems);
  state.candidateId = document.querySelector('#candidate-id').value.trim() || createCandidateId();
  state.strictMode = document.querySelector('#strict-mode').checked;
  state.requestFullscreen = document.querySelector('#fullscreen-mode').checked;
  state.audioRate = Number(document.querySelector('#audio-rate').value);
  state.setup.consent = document.querySelector('#consent').checked;
  const message = document.querySelector('#setup-message');

  if (!state.setup.consent) {
    message.textContent = 'Confirm the independent-practice notice before beginning.';
    return;
  }
  if (needsAudio && (!support.speech || !state.setup.audioOk)) {
    message.textContent = 'Complete the headphone audio check before beginning this attempt.';
    return;
  }
  if (needsMic && (!support.media || !state.setup.micOk)) {
    message.textContent = 'Complete the microphone check before beginning a speaking attempt.';
    return;
  }

  saveJson(STORAGE_KEYS.settings, {
    audioRate: state.audioRate,
    strictMode: state.strictMode
  });

  if (state.requestFullscreen && document.documentElement.requestFullscreen && !document.fullscreenElement) {
    await document.documentElement.requestFullscreen().catch(() => {});
  }

  state.currentIndex = 0;
  state.answers = {};
  state.showInstruction = true;
  state.startedAt = Date.now();
  state.view = 'exam';
  saveActiveAttempt();
  render();
}

function saveActiveAttempt() {
  if (!state.currentItems.length || state.view !== 'exam') return;
  const serializableAnswers = Object.fromEntries(
    Object.entries(state.answers).map(([key, value]) => {
      const { audioUrl, ...safeValue } = value;
      return [key, safeValue];
    })
  );
  saveJson(STORAGE_KEYS.active, {
    version: 1,
    mode: state.mode,
    formId: state.formId,
    sectionCode: state.sectionCode,
    strictMode: state.strictMode,
    candidateId: state.candidateId,
    audioRate: state.audioRate,
    currentIndex: state.currentIndex,
    answers: serializableAnswers,
    showInstruction: state.showInstruction,
    startedAt: state.startedAt,
    label: currentTestLabel()
  });
}

function resumeActiveAttempt() {
  const saved = loadJson(STORAGE_KEYS.active, null);
  if (!saved) {
    renderHome();
    return;
  }
  state.mode = saved.mode;
  state.formId = saved.formId ?? 'A';
  state.sectionCode = saved.sectionCode ?? null;
  state.strictMode = saved.strictMode !== false;
  state.candidateId = saved.candidateId ?? createCandidateId();
  state.audioRate = Number(saved.audioRate ?? 0.96);
  state.currentItems = state.mode === 'full'
    ? TEST_FORMS[state.formId]?.items ?? TEST_FORMS.A.items
    : getSectionItems(state.formId, state.sectionCode);
  state.currentIndex = Math.min(Number(saved.currentIndex ?? 0), state.currentItems.length - 1);
  state.answers = saved.answers ?? {};
  