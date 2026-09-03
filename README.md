# VPET Level 2 Professional English Test Simulator

A complete, original-content training simulator modeled on the publicly documented **Versant by Pearson Professional English Test Level 2** flow.

> **Independent educational tool.** This repository is not affiliated with, approved by, or endorsed by Pearson. It contains no official questions, recordings, logos, confidential prompts, recalled live-test content, or proprietary scoring algorithm. “Versant” and related marks belong to their respective owner.

## Question bank

The simulator now contains:

- **22 complete original forms**
- **58 scored units per form**
- **1,276 scored units across the bank**
- **1,210 item screens/objects**, because each Reading Comprehension screen contains two scored questions
- 20 workplace domains in the expanded bank, including customer operations, software release, logistics, healthcare, university services, manufacturing, banking, renewable energy, hospitality, retail, cybersecurity, research, human resources, construction, transport, media, nonprofit work, food distribution, consulting, and telecommunications
- A complete-form selector, random-form launcher, and form-aware section practice

The two original forms remain available as Forms A and B. Forms C through V are generated deterministically from reviewed domain specifications and original item templates. They are committed source content, not runtime AI output.

See [docs/QUESTION-BANK.md](docs/QUESTION-BANK.md) for the inventory, authorship boundary, validation rules, and maintenance process.

## What is implemented

- Strict, one-way exam progression with no back navigation.
- Per-item countdowns and automatic submission on expiry.
- Instruction and unscored sample screens before every part.
- Browser-generated spoken prompts that play once in strict mode.
- Local microphone recording, live input level, and optional browser speech transcription.
- Full-test and section-practice modes.
- Local autosave and resume after accidental closure.
- Post-test section, skill, and question-level review.
- Transparent heuristic scoring with confidence labels.
- Printable and downloadable practice reports.
- Responsive interface optimized for a desktop testing station.
- Zero runtime dependencies and a small production container.

## Level 2 structure represented

| Part | Section | Scored units per form | Simulator timing |
|---|---|---:|---:|
| A | Sentence Completion | 10 | 25 seconds each |
| B | Passage Reconstruction | 3 | 30 seconds reading + 90 seconds writing |
| C | Reading Comprehension | 6 | 3 minutes per passage and two-question screen |
| D | E-mail Writing | 2 | 9 minutes each; minimum 100 words |
| E | Dictation | 8 | One playback + 25 seconds each |
| F | Response Selection | 8 | One playback + 8 seconds each |
| G | Passage Comprehension | 6 | One passage per three questions; 15-second practice response window |
| H | Repeat | 10 | One playback + 15 seconds each |
| I | Speaking Situations | 2 | 10 seconds preparation + 60 seconds response |
| J | Story Retellings | 3 | One playback + 30 seconds response |

The public guide specifies the ten parts, question counts, approximate 60-minute duration, one-way progression, and published timers shown above. It does not publish a numeric response timer for Part G; the simulator uses a documented 15-second practice window to encourage concise spoken answers.

Public format references:

- [Official Professional English Test guide](https://www.pearson.com/content/dam/one-dot-com/one-dot-com/pearson-languages/en-gb/pdfs/versant-resources/versant-by-pearson-professional-english-test-official-test-guide.pdf)
- [Pearson test-taker preparation page](https://www.pearson.com/languages/test-takers/versant-by-pearson/test-taker-preparation.html)
- [Official Pearson Professional English practice-test page](https://versantstore.pearson.com/versant-professional-english-test/p/VERSPT-PET2)

See [docs/TEST-FIDELITY.md](docs/TEST-FIDELITY.md) for the exact fidelity boundary.

## Run locally

Node.js 22 or later is required. No package download is necessary.

```bash
npm test
npm start
```

Open `http://localhost:8080`.

Health endpoint:

```bash
curl http://localhost:8080/healthz
```

## Repository layout

```text
.
├── .github/workflows/deploy-cloud-run.yml
├── docs/
│   ├── DEPLOYMENT.md
│   ├── QUESTION-BANK.md
│   └── TEST-FIDELITY.md
├── scripts/build.mjs
├── src/
│   ├── app/             # Application and question-bank picker fragments
│   ├── data/            # 22 complete original practice forms
│   └── styles/          # Trainer and exam-workstation CSS
├── public/
│   ├── scoring.js       # Transparent practice-scoring functions
│   └── index.html       # Loads generated app.js, data.js, and styles.css
├── test/
│   ├── question-bank.test.mjs
│   └── scoring.test.mjs
├── Dockerfile
├── package.json
└── server.mjs
```

`npm run build` deterministically concatenates the ordered source fragments into browser assets. Generated `public/app.js`, `public/data.js`, and `public/styles.css` are rebuilt before tests, local startup, and container startup.

## Automated production deployment

Every push to `main` runs structural tests, syntax checks, a production-container build, a container health check, and then deploys the latest source to:

- **Cloud Run service:** `vpet-simulator-level-1-2`
- **Region:** `asia-east1`
- **Traffic:** 100% to the new revision after successful deployment
- **Access:** public, unauthenticated

The deployment job supports Workload Identity Federation, with a service-account JSON secret only as a fallback. Configure the repository and Google Cloud resources once by following [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Required GitHub repository variables:

```text
GCP_PROJECT_ID
GCP_WORKLOAD_IDENTITY_PROVIDER
GCP_SERVICE_ACCOUNT
```

Alternative fallback secret:

```text
GCP_CREDENTIALS_JSON
```

## Test guarantees

`npm test` asserts:

- every complete form totals exactly 58 scored units;
- every section matches its declared question count;
- all identifiers are unique across the complete bank;
- Reading Comprehension and Response Selection keys are valid;
- Passage Comprehension stories are grouped and played correctly;
- every item has a valid type, section, and positive timer;
- objective answer keys score deterministically;
- blank attempts receive no hidden positive credit;
- the practice-score orientation remains bounded;
- generated text contains no obvious doubled-article or doubled-punctuation defects.

## Privacy behavior

- The server receives no candidate response, recording, transcript, or result.
- In-progress text responses and summary history are stored only in browser storage.
- Audio recordings exist as temporary browser object URLs for the current result-review session.
- Browser speech recognition, when available, may be processed according to the browser vendor’s own service and privacy terms.
- Clearing site data removes locally stored attempt history.

## Scoring boundary

Objective parts use answer keys and normalized text comparison. Open writing and speaking parts use visible content-coverage, sequence-similarity, response-development, structure, and mechanics heuristics. When a spoken transcript is unavailable, duration evidence is used conservatively and the result is marked low confidence.

The displayed GSE-style value is a linear **practice orientation**, not Pearson’s proprietary score. It must not be represented as an official result, admission decision, recruitment outcome, certificate, or guaranteed pass prediction.
