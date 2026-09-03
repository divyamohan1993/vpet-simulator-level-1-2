# Level 2 Question Bank

## Inventory

| Part | Task | Units per form | Forms | Total scored units |
|---|---|---:|---:|---:|
| A | Sentence Completion | 10 | 22 | 220 |
| B | Passage Reconstruction | 3 | 22 | 66 |
| C | Reading Comprehension | 6 | 22 | 132 |
| D | E-mail Writing | 2 | 22 | 44 |
| E | Dictation | 8 | 22 | 176 |
| F | Response Selection | 8 | 22 | 176 |
| G | Passage Comprehension | 6 | 22 | 132 |
| H | Repeat | 10 | 22 | 220 |
| I | Speaking Situations | 2 | 22 | 44 |
| J | Story Retellings | 3 | 22 | 66 |
| **Total** |  | **58** | **22** | **1,276** |

Reading Comprehension uses three screens per form, with two scored questions on each screen. Consequently, the repository contains 1,210 item objects/screens but 1,276 scored units.

## Added forms

| Form | Workplace domain |
|---|---|
| C | Customer Operations |
| D | Software Release |
| E | Logistics and Distribution |
| F | Healthcare Administration |
| G | University Services |
| H | Manufacturing Quality |
| I | Banking Operations |
| J | Renewable Energy |
| K | Hospitality Management |
| L | Retail Operations |
| M | Cybersecurity Operations |
| N | Research Laboratory |
| O | Human Resources |
| P | Construction Project |
| Q | Public Transport |
| R | Media Production |
| S | Nonprofit Programme |
| T | Food Distribution |
| U | Consulting Project |
| V | Telecommunications |

Forms A and B are the original handcrafted forms. Forms C through V are deterministic, reviewed combinations of domain specifications and original task templates.

## Source and authorship boundary

The public Pearson resources were used only to determine:

- the names and order of Parts A through J;
- the number of scored units in each part;
- the published response mode and timing;
- the broad everyday and workplace communication construct;
- the fact that Level 2 targets the upper test range.

No paid practice-test item, live-test item, leaked item, recalled prompt, recording, answer key, confidential scoring feature, or Pearson visual asset is included.

The added prompts, passages, answer options, scenarios, names, organizations, quantities, events, and expected-answer concepts are original practice content. The code deliberately records that boundary in `QUESTION_BANK_INFO.contentPolicy`.

## Public specification references

- [Professional English Test Official Test Guide](https://www.pearson.com/content/dam/one-dot-com/one-dot-com/pearson-languages/en-gb/pdfs/versant-resources/versant-by-pearson-professional-english-test-official-test-guide.pdf)
- [Pearson test-taker preparation page](https://www.pearson.com/languages/test-takers/versant-by-pearson/test-taker-preparation.html)
- [Pearson Professional English practice-test page](https://versantstore.pearson.com/versant-professional-english-test/p/VERSPT-PET2)

The commercial practice test is a fixed form. Buying or finding that fixed form does not grant permission to republish its questions in this repository.

## Generation design

Each added form is built from one reviewed domain specification containing:

- organization, team, people, customer, project, supplier, venue, and equipment;
- event, incident, cause, workaround, operational metric, baseline, and improved result;
- policy, document, risk, training need, process change, deadlines, and quantities.

The domain specification is passed through task-specific builders:

- `bankBuildA`: ten context-rich one-word completion items;
- `bankBuildB`: three reconstructable passages with idea-group scoring keys;
- `bankBuildC`: three passages with two keyed multiple-choice questions each;
- `bankBuildD`: two professional e-mail situations with explicit content requirements;
- `bankBuildE`: eight dictation sentences;
- `bankBuildF`: eight listening-response selections with rotated answer positions;
- `bankBuildG`: two passages, each followed by three short spoken questions;
- `bankBuildH`: ten sentence-repetition prompts;
- `bankBuildI`: two socially appropriate workplace speaking situations;
- `bankBuildJ`: three chronological story-retelling prompts.

The construction is deterministic. Reloading the application does not synthesize or alter questions. This makes test results reproducible and permits source review, version control, and automated validation.

## Quality controls

Automated tests verify:

1. Twenty additional form IDs exist.
2. The complete bank contains 22 forms and 1,276 scored units.
3. Every form contains exactly 58 scored units.
4. Each section has the declared Level 2 count.
5. Every question identifier is unique.
6. Each Reading Comprehension screen has two questions and four options per question.
7. Each Response Selection item has three distinct options and one valid key.
8. Each Passage Comprehension form contains two story groups, three questions per story, and one story playback trigger per group.
9. Obvious doubled articles and doubled punctuation are absent.
10. Existing scoring, blank-response, timer, and structural tests continue to pass.

## Adding another form

Add one complete domain object to `BANK_SPECS` and assign the next unused form ID. The builders create the complete A-to-J form automatically. Then run:

```bash
npm run check
```

A valid form must contribute:

```text
A=10, B=3, C=6, D=2, E=8, F=8, G=6, H=10, I=2, J=3
Total=58
```

Do not insert web-scraped exam dumps, paid practice questions, candidate recollections, or content represented as “actual exam questions.” Such material is unreliable as training evidence and may violate intellectual-property or test-security obligations.
