# Test-fidelity specification

## Fidelity target

The simulator reproduces the publicly observable **interaction contract** of the Professional English Test Level 2:

1. ten ordered parts, A through J;
2. the published scored-question count for each part;
3. a section-instruction screen and an unscored example before each part;
4. timed questions that advance automatically;
5. forward-only navigation;
6. one-play audio behavior in scored listening items;
7. automatic microphone capture in spoken-response windows;
8. delayed feedback until the attempt is complete;
9. a desktop test-station layout with part identity, item progress, content area, timer, and next control;
10. approximately one hour for a complete form under normal response behavior.

## Deliberate non-equivalence

An “exact official clone” would require proprietary material that is neither public nor licensed to this project. This implementation therefore does **not** reproduce:

- official Pearson test questions;
- official audio recordings or voices;
- Pearson logos, trademarks as branding, fonts, or protected visual assets;
- undisclosed item-selection logic;
- undisclosed speech-recognition, psychometric, calibration, or GSE scoring models;
- secure-test delivery controls, identity verification, remote proctoring, or official score reports.

Every scored prompt in `src/data/` was written for this repository and uses fictional workplace situations. The build step assembles those fragments into `public/data.js`.

## Published structure mapping

| Public behavior | Simulator implementation |
|---|---|
| Test ID / candidate entry | Locally generated editable practice candidate ID |
| Equipment preparation | Audio and microphone checks before the attempt |
| Section instruction and sample | Dedicated untimed screen before every part |
| No return to earlier items | No Back control; submitted index increases monotonically |
| Automatic item transition | Countdown expiry calls the same immutable submission path as Next |
| Audio once | Replay control is absent from scored audio screens |
| Speaking preparation and response windows | Phase-controlled audio, preparation, tone, capture, and expiry |
| Saved work | Current state is serialized locally after every completed item |
| Result after completion | Feedback and answer evidence remain inaccessible during the attempt |

## Timing notes

The simulator uses the timers stated in the official public guide wherever a timer is published. Part G asks for a short phrase or very short sentence, but the public guide does not state a numerical response timer. The simulator uses 15 seconds to keep the response short and the transition deterministic. That value is a practice implementation choice, not a claim about confidential production behavior.

## Audio fidelity

Spoken content uses the operating system or browser’s English text-to-speech voice. Voice identity, pronunciation model, speed, and prosody therefore vary by device. The setup screen lets the learner verify output and make a narrow speed adjustment before the attempt.

## Score interpretation

The simulator’s score is diagnostic, not psychometric. It is intended to answer:

- Which parts are currently weakest?
- Which task requirements were omitted?
- How accurately was a heard sentence reconstructed?
- Was the selected response contextually appropriate?
- Was a retelling sufficiently complete and ordered?

It is not intended to estimate measurement error, equate item difficulty, detect memorized prompts, or reproduce the official automated scoring system.
