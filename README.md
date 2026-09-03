# VPET Level 2 Professional English Test Simulator

A complete, original-content training simulator modeled on the publicly documented **Versant by Pearson Professional English Test — Level 2** flow.

> **Independent educational tool.** This repository is not affiliated with, approved by, or endorsed by Pearson. It contains no official questions, recordings, logos, confidential prompts, or official scoring algorithm. “Versant” and related marks belong to their respective owner.

## What is implemented

- Two complete original practice forms.
- Exactly **58 scored questions per form** across all ten Level 2 parts.
- Strict, one-way exam progression with no back navigation.
- Per-item countdowns and automatic submission on expiry.
- Instruction and unscored sample screens before every part.
- Browser-generated spoken prompts that play once in strict mode.
- Local microphone recording, live input level, and optional browser speech transcription.
- Full-test and section-practice modes.
- Local autosave and resume after accidental closure.
- Post-test section, skill, and question-level review.
- Transparent heuristic scoring with confidence labels.
- Printable and downloadable practice report.
- Responsive interface optimized for a desktop testing station.
- Zero runtime dependencies and a small production container.

## Level 2 structure represented

| Part | Section | Scored questions | Simulator timing |
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

The public guide specifies the ten parts, question counts, approximate 60-minute duration, one-way progression, and the published timers shown above. The guide does not publish a numeric response timer for Part G; this simulator uses a clearly documented 15-second transition window to enforce concise answers consistently.

Public format references:

- [Official Professional English Test guide](https://www.pearson.com/content/dam/one-dot-com/one-dot-com/pearson-languages/en-gb/pdfs/versant-resources/versant-by-pearson-professional-english-test-official-test-guide.pdf)
- [Official Pearson practice-test page](https://shop.mondly.com/products/versant-professional-english-test-practice-test)

See [docs/TEST-FIDELITY.md](docs/TEST-FIDELITY.md) for the exact fidelity boundary.

## Run locally

Node.js 22 or later is required. No package download is necessary.
`npm start`, `npm test`, and the production image rebuild generated browser assets from `src/` before use.

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
├── .gcloudignore
├── docs/
│   ├── DEPLOYMENT.md
│   └── TEST-FIDELITY.md
├── scripts/build.mjs    # Deterministically assembles browser assets
├── src/
│   ├── app/             # Readable application source fragments
│   ├── data/            # Two complete original question forms
│   └── styles/          # Trainer and exam-workstation CSS
├── public/
│   ├── scoring.js       # Transparent practice-scoring functions
│   └── index.html       # Loads generated app.js, data.js, and styles.css
├── test/scoring.test.mjs
├── Dockerfile
├── package.json
└── server.mjs
```

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

- each form totals exactly 58 scored units;
- every section matches its declared question count;
- all question identifiers are unique;
- every item has a valid type, section, and positive timer;
- objective answer keys score deterministically;
- blank attempts receive no hidden positive credit;
- the practice-score orientation remains bounded.

## Privacy behavior

- The server receives no candidate response, recording, transcript, or result.
- In-progress text responses and summary history are stored only in browser storage.
- Audio recordings exist as temporary browser object URLs for the current result-review session.
- Browser speech recognition, when available, may be processed according to the browser vendor’s own service and privacy terms.
- Clearing site data removes the locally stored attempt history.

## Scoring boundary

Objective parts use answer keys and normalized text comparison. Open writing and speaking parts use visible content-coverage, sequence-similarity, response-development, structure, and mechanics heuristics. When a spoken transcript is unavailable, duration evidence is used conservatively and the result is marked low confidence.

The displayed GSE-style value is a linear **practice orientation**, not Pearson’s proprietary score. It must not be represented as an official result, admission decision, recruitment outcome, certificate, or guaranteed pass prediction.
