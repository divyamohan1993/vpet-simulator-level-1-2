export const SECTION_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const SECTION_META = {
  A: {
    code: 'A',
    title: 'Sentence Completion',
    officialCount: 10,
    primarySkills: ['Reading', 'Writing'],
    estimatedMinutes: 5,
    directions:
      'Read the sentence and type one word that completes it logically and grammatically. You have 25 seconds for each sentence.',
    sample: {
      prompt: 'The manager asked everyone to arrive ___ so the meeting could begin at nine.',
      answer: 'early',
      explanation: '“Early” fits both the meaning and the grammar of the sentence.'
    }
  },
  B: {
    code: 'B',
    title: 'Passage Reconstruction',
    officialCount: 3,
    primarySkills: ['Reading', 'Writing'],
    estimatedMinutes: 6,
    directions:
      'Read a short passage for 30 seconds. The passage will disappear. Reconstruct its meaning in your own words within 90 seconds. Preserve the important facts; exact wording is not required.',
    sample: {
      prompt:
        'The office bicycle scheme began in May with twelve bicycles. Employees used them mainly for short trips between the two city buildings. Because demand exceeded supply, six more bicycles were added in July.',
      answer:
        'The company introduced twelve shared bicycles in May for travel between its city offices. Strong demand led it to add six more in July.',
      explanation: 'A strong reconstruction retains the launch date, purpose, demand, and expansion.'
    }
  },
  C: {
    code: 'C',
    title: 'Reading Comprehension',
    officialCount: 6,
    primarySkills: ['Reading'],
    estimatedMinutes: 9,
    directions:
      'Read each passage and answer the two multiple-choice questions shown with it. You have 3 minutes for each passage and its questions.',
    sample: {
      prompt:
        'The west entrance will close at 6 p.m. for repairs. Staff leaving later should use the reception entrance and show an identity card to security.',
      answer: 'Late staff should leave through reception and show identification.',
      explanation: 'The answer combines the stated alternative entrance and security requirement.'
    }
  },
  D: {
    code: 'D',
    title: 'E-mail Writing',
    officialCount: 2,
    primarySkills: ['Writing'],
    estimatedMinutes: 18,
    directions:
      'Write a professional e-mail that addresses every point in the situation. Write at least 100 words. You have 9 minutes for each e-mail.',
    sample: {
      prompt:
        'Write to a colleague who missed a planning meeting. Summarize the decision, explain their next action, and state the deadline.',
      answer:
        'A complete answer uses an appropriate subject, greeting, clear paragraphs, all three requested points, and a professional closing.',
      explanation: 'Content coverage and communicative clarity matter more than decorative language.'
    }
  },
  E: {
    code: 'E',
    title: 'Dictation',
    officialCount: 8,
    primarySkills: ['Listening', 'Writing'],
    estimatedMinutes: 4,
    directions:
      'Listen to one sentence. It is played once. Type the sentence exactly as you hear it. You have 25 seconds after the audio ends.',
    sample: {
      prompt: 'The revised schedule will be circulated this afternoon.',
      answer: 'The revised schedule will be circulated this afternoon.',
      explanation: 'Retain the complete meaning, word order, and grammatical endings.'
    }
  },
  F: {
    code: 'F',
    title: 'Response Selection',
    officialCount: 8,
    primarySkills: ['Listening'],
    estimatedMinutes: 3,
    directions:
      'Listen to a short prompt and three possible responses. Select the most appropriate response. The audio is played once; answer within 8 seconds.',
    sample: {
      prompt: 'Would you mind sending me the updated figures?',
      answer: 'Certainly. I will send them before lunch.',
      explanation: 'The response directly accepts the request and gives useful confirmation.'
    }
  },
  G: {
    code: 'G',
    title: 'Passage Comprehension',
    officialCount: 6,
    primarySkills: ['Listening', 'Speaking'],
    estimatedMinutes: 5,
    directions:
      'Listen to a short passage and answer three spoken questions about it. Respond with a short phrase or a very short sentence. Each passage is played once.',
    sample: {
      prompt:
        'A team moved its weekly review from Friday afternoon to Thursday morning because several members worked remotely on Fridays. Question: Why was the meeting moved?',
      answer: 'Because several team members worked remotely on Fridays.',
      explanation: 'A concise answer gives the relevant cause without retelling the whole passage.'
    }
  },
  H: {
    code: 'H',
    title: 'Repeat',
    officialCount: 10,
    primarySkills: ['Listening', 'Speaking'],
    estimatedMinutes: 4,
    directions:
      'Listen to a sentence and repeat it exactly. Begin speaking promptly after the tone. You have up to 15 seconds for each response.',
    sample: {
      prompt: 'Please confirm whether the training room is available tomorrow.',
      answer: 'Please confirm whether the training room is available tomorrow.',
      explanation: 'Repeat the words in the same order with clear rhythm and complete grammatical endings.'
    }
  },
  I: {
    code: 'I',
    title: 'Speaking Situations',
    officialCount: 2,
    primarySkills: ['Speaking'],
    estimatedMinutes: 3,
    directions:
      'Listen to a workplace situation. You have 10 seconds to prepare and 60 seconds to respond as though speaking to the person described.',
    sample: {
      prompt:
        'A delivery is late and a customer is waiting. Explain the delay, offer a practical solution, and reassure the customer.',
      answer: 'A strong response addresses the listener directly, covers all three tasks, and uses an appropriate professional tone.',
      explanation: 'Organize the response as situation, action, and reassurance.'
    }
  },
  J: {
    code: 'J',
    title: 'Story Retellings',
    officialCount: 3,
    primarySkills: ['Listening', 'Speaking'],
    estimatedMinutes: 4,
    directions:
      'Listen to a short story once. After the tone, retell it in your own words. Include the people, sequence, problem, action, and result. You have 30 seconds.',
    sample: {
      prompt:
        'Nina left her presentation cable at home. A colleague lent her a spare, so the client meeting began on time. She bought an extra cable afterward and kept it in her laptop bag.',
      answer:
        'Nina forgot her presentation cable, but a colleague lent her one and the meeting started on time. She then bought a spare to keep with her laptop.',
      explanation: 'The retelling preserves the problem, help received, successful result, and later precaution.'
    }
  }
};

const a = (id, prompt, accepted) => ({
  id,
  section: 'A',
  type: 'sentence-completion',
  duration: 25,
  prompt,
  accepted
});

const b = (id, passage, expectedKeywords) => ({
  id,
  section: 'B',
  type: 'passage-reconstruction',
  readDuration: 30,
  duration: 90,
  passage,
  expectedKeywords
});

const c = (id, passage, questions) => ({
  id,
  section: 'C',
  type: 'reading-comprehension',
  duration: 180,
  passage,
  questions
});

const d = (id, scenario, recipient, requiredPoints) => ({
  id,
  section: 'D',
  type: 'email-writing',
  duration: 540,
  minWords: 100,
  scenario,
  recipient,
  requiredPoints
});

const e = (id, audioText) => ({
  id,
  section: 'E',
  type: 'dictation',
  duration: 25,
  audioText
});

const f = (id, prompt, options, correctIndex) => ({
  id,
  section: 'F',
  type: 'response-selection',
  duration: 8,
  prompt,
  options,
  correctIndex
});

const g = (id, stimulusId, story, playStory, question, accepted, expectedKeywords) => ({
  id,
  section: 'G',
  type: 'passage-comprehension',
  duration: 15,
  stimulusId,
  story,
  playStory,
  question,
  accepted,
  expectedKeywords
});

const h = (id, audioText) => ({
  id,
  section: 'H',
  type: 'repeat',
  duration: 15,
  audioText
});

const i = (id, situation, listener, requiredPoints) => ({
  id,
  section: 'I',
  type: 'speaking-situation',
  prepD