 95 / utterance.rate))
    );
    window.speechSynthesis.speak(utterance);
  });
}

async function playBeep() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  try {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.21);
    await new Promise((resolve) => window.setTimeout(resolve, 240));
  } finally {
    await context.close().catch(() => {});
  }
}

async function ensureMicrophone() {
  const currentTrack = state.micStream?.getAudioTracks?.()[0];
  if (currentTrack?.readyState === 'live') return state.micStream;

  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Microphone access is not supported in this browser.');
  }

  state.micStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      channelCount: 1
    },
    video: false
  });
  return state.micStream;
}

function createSpeechRecognition(onUpdate) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return null;

  const recognition = new Recognition();
  recognition.lang = 'en-GB';
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  let finalTranscript = '';
  let interimTranscript = '';

  recognition.onresult = (event) => {
    interimTranscript = '';
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const transcript = event.results[index][0]?.transcript ?? '';
      if (event.results[index].isFinal) finalTranscript += `${transcript} `;
      else interimTranscript += transcript;
    }
    onUpdate?.(`${finalTranscript}${interimTranscript}`.trim());
  };

  recognition.onerror = () => {};
  recognition.getTranscript = () => `${finalTranscript}${interimTranscript}`.trim();
  return recognition;
}

async function beginRecording({ onLevel, onTranscript } = {}) {
  const stream = await ensureMicrophone();
  const chunks = [];
  const startedAt = performance.now();
  let stopped = false;
  let animationFrame = null;
  let audioContext = null;
  let recognition = null;
  let transcript = '';

  const mimeCandidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4;codecs=mp4a.40.2',
    'audio/mp4'
  ];
  const mimeType = mimeCandidates.find((candidate) => MediaRecorder.isTypeSupported?.(candidate));
  const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

  recorder.ondataavailable = (event) => {
    if (event.data?.size) chunks.push(event.data);
  };

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const values = new Uint8Array(analyser.frequencyBinCount);
      const updateMeter = () => {
        analyser.getByteFrequencyData(values);
        const average = values.reduce((sum, value) => sum + value, 0) / values.length;
        onLevel?.(Math.min(1, average / 85));
        animationFrame = requestAnimationFrame(updateMeter);
      };
      updateMeter();
    }
  } catch {
    // A visual level meter is optional; recording can continue without it.
  }

  recognition = createSpeechRecognition((value) => {
    transcript = value;
    onTranscript?.(value);
  });
  try {
    recognition?.start();
  } catch {
    recognition = null;
  }

  recorder.start(200);

  return {
    stop: () =>
      new Promise((resolve) => {
        if (stopped) {
          resolve({ transcript, audioDuration: (performance.now() - startedAt) / 1000 });
          return;
        }
        stopped = true;
        if (animationFrame) cancelAnimationFrame(animationFrame);
        onLevel?.(0);
        try {
          recognition?.stop();
        } catch {
          // Recognition may already have ended.
        }
        transcript = recognition?.getTranscript?.() || transcript;

        recorder.onstop = async () => {
          const duration = (performance.now() - startedAt) / 1000;
          const blob = chunks.length
            ? new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
            : null;
          const audioUrl = blob ? URL.createObjectURL(blob) : null;
          if (audioUrl) playbackUrls.push(audioUrl);
          if (audioContext) await audioContext.close().catch(() => {});
          resolve({ transcript: transcript.trim(), audioDuration: duration, audioUrl });
        };

        if (recorder.state === 'inactive') recorder.onstop();
        else recorder.stop();
      }),
    cancel: () => {
      if (stopped) return;
      stopped = true;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      try {
        recognition?.stop();
      } catch {
        // Ignore cleanup errors.
      }
      if (recorder.state !== 'inactive') recorder.stop();
      audioContext?.close?.().catch(() => {});
    }
  };
}

function startCountdown(seconds, onExpire, options = {}) {
  const clock = document.querySelector(options.clockSelector ?? '#timer-clock');
  const ring = document.querySelector(options.ringSelector ?? '#timer-ring');
  const label = document.querySelector(options.labelSelector ?? '#timer-label');
  const totalMilliseconds = Math.max(250, seconds * 1000 * timeScale);
  const endAt = performance.now() + totalMilliseconds;
  let stopped = false;
  let interval = null;

  if (label && options.label) label.textContent = options.label;
  ring?.classList.remove('timer-waiting');

  const update = () => {
    if (stopped) return;
    const remainingMs = Math.max(0, endAt - performance.now());
    const displaySeconds = timeScale < 1 ? remainingMs / 1000 / timeScale : remainingMs / 1000;
    if (clock) clock.textContent = formatClock(displaySeconds);
    if (ring) {
      const progress = remainingMs / totalMilliseconds;
      ring.style.setProperty('--timer-progress', `${Math.round(progress * 360)}deg`);
      ring.classList.toggle('timer-urgent', progress <= 0.2);
    }
    options.onTick?.(displaySeconds);

    if (remainingMs <= 0) {
      stop();
      onExpire?.();
    }
  };

  const stop = () => {
    stopped = true;
    if (interval) clearInterval(interval);
  };

  update();
  interval = window.setInterval(update, 100);
  return { stop };
}

function setTimerWaiting(labelText = 'Preparing') {
  const clock = document.querySelector('#timer-clock');
  const label = document.querySelector('#timer-label');
  const ring = document.querySelector('#timer-ring');
  if (clock) clock.textContent = '--:--';
  if (label) label.textContent = labelText;
  ring?.classList.add('timer-waiting');
  ring?.classList.remove('timer-urgent');
  ring?.style.setProperty('--timer-progress', '360deg');
}

function speechRequired(items) {
  return items.some((item) => ['dictation', 'response-selection', 'passage-comprehension', 'repeat', 'speaking-situation', 'story-retelling'].includes(item.type));
}

function microphoneRequired(items) {
  return items.some((item) => ['passage-comprehension', 'repeat', 'speaking-situation', 'story-retelling'].includes(item.type));
}

function renderTopBar(active = 'home') {
  return `
    <header class="site-header no-print">
      <button class="brand-button" id="brand-home" type="button" aria-label="Return to simulator home">
        <span class="brand-mark" aria-hidden="true">V<span>2</span></span>
        <span class="brand-copy">
          <strong>Professional English Test</strong>
          <small>Level 2 practice simulator</small>
   