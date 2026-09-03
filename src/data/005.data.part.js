n, but the room’s projector is not working. Write to the facilities manager.',
    'facilities manager',
    [
      'Explain that the projector in the booked room is not working and state that the presentation is tomorrow at 11:00 a.m.',
      'Ask whether the projector can be repaired before the meeting.',
      'Request an alternative room with working presentation equipment if repair is not possible, and ask for confirmation today.'
    ]
  ),
  d(
    'B-D02',
    'A new employee has completed their first month in your team. Their analytical work is accurate, but they often submit updates after the agreed deadline. Write to the employee.',
    'new employee',
    [
      'Recognize the accuracy and value of their analytical work.',
      'Explain the effect that late updates have on colleagues and project decisions.',
      'Ask them to flag risks earlier and propose a short weekly planning check-in.'
    ]
  ),

  e('B-E01', 'Visitors must wear the badge provided at reception throughout the factory tour.'),
  e('B-E02', 'The revised estimate includes delivery charges but excludes local installation costs.'),
  e('B-E03', 'We will approve the request once the legal team has reviewed the final wording.'),
  e('B-E04', 'Several customers reported that the new instructions were easier to follow.'),
  e('B-E05', 'Unless the weather deteriorates, the outdoor demonstration will begin at ten.'),
  e('B-E06', 'Managers received a confidential summary before the results were announced publicly.'),
  e('B-E07', 'The supplier has offered to replace any components damaged during transportation.'),
  e('B-E08', 'A detailed agenda should prevent the discussion from moving beyond its original purpose.'),

  f('B-F01', 'Have you finished preparing the figures for this afternoon?', ['Almost; I only need to check the final total.', 'The afternoon was sunny.', 'They are printed in colour.'], 0),
  f('B-F02', 'I cannot access the shared folder from my laptop.', ['The folder contains six documents.', 'Try reconnecting to the company network first.', 'My laptop is lighter than yours.'], 1),
  f('B-F03', 'Where should I leave these signed delivery notes?', ['Please put them in the tray beside the scanner.', 'The delivery arrived early.', 'I signed the note in blue ink.'], 0),
  f('B-F04', 'Would it be possible to extend the application deadline?', ['Applications are reviewed monthly.', 'I applied through the website.', 'Possibly; I will check with the programme manager.'], 2),
  f('B-F05', 'What did you think of the candidate’s presentation?', ['It starts at eleven.', 'It was clear, although the conclusion was rushed.', 'The candidate travelled by bus.'], 1),
  f('B-F06', 'The courier says our parcel was delivered yesterday.', ['I will check who signed for it.', 'Yesterday was the deadline.', 'The parcel weighs three kilograms.'], 0),
  f('B-F07', 'Could you cover the reception desk while I speak to a visitor?', ['The desk was delivered last week.', 'Of course. How long will you be away?', 'The visitor signed the book.'], 1),
  f('B-F08', 'Why are we collecting feedback before the pilot has ended?', ['So we can correct urgent problems during the trial.', 'The feedback form has ten questions.', 'The pilot works in the north region.'], 0),

  g(
    'B-G01',
    'B-G-STORY-1',
    'A charity scheduled an online fundraising event for Friday evening. On Friday morning, its payment page began rejecting some bank cards. The digital manager added a second payment provider, tested it with three small donations, and sent donors a fresh link. The event exceeded its target, and the charity kept both providers to reduce future risk.',
    true,
    'When was the fundraising event scheduled?',
    ['friday evening', 'on friday evening'],
    [['friday'], ['evening']]
  ),
  g(
    'B-G02',
    'B-G-STORY-1',
    'A charity scheduled an online fundraising event for Friday evening. On Friday morning, its payment page began rejecting some bank cards. The digital manager added a second payment provider, tested it with three small donations, and sent donors a fresh link. The event exceeded its target, and the charity kept both providers to reduce future risk.',
    false,
    'How did the manager test the second provider?',
    ['with three small donations', 'by making three small donations', 'three test donations'],
    [['three', '3'], ['small'], ['donations']]
  ),
  g(
    'B-G03',
    'B-G-STORY-1',
    'A charity scheduled an online fundraising event for Friday evening. On Friday morning, its payment page began rejecting some bank cards. The digital manager added a second payment provider, tested it with three small donations, and sent donors a fresh link. The event exceeded its target, and the charity kept both providers to reduce future risk.',
    false,
    'Why did the charity keep both payment providers?',
    ['to reduce future risk', 'to reduce the risk of future payment problems', 'for resilience'],
    [['reduce'], ['future'], ['risk']]
  ),
  g(
    'B-G04',
    'B-G-STORY-2',
    'Mei organized monthly safety inspections for a small laboratory. One checklist required staff to inspect a storage cabinet that had been removed six months earlier. Mei checked the equipment register, confirmed that the cabinet had been replaced by locked shelves, and updated the checklist. The next inspection took ten minutes less and still covered every current storage area.',
    true,
    'What was wrong with the old checklist?',
    ['it included a storage cabinet that had been removed', 'it required inspection of a removed cabinet', 'it referred to an old cabinet'],
    [['checklist'], ['cabinet'], ['removed']]
  ),
  g(
    'B-G05',
    'B-G-STORY-2',
    'Mei organized monthly safety inspections for a small laboratory. One checklist required staff to inspect a storage cabinet that had been removed six months earlier. Mei checked the equipment register, confirmed that the cabinet had been replaced by locked shelves, and updated the checklist. The next inspection took ten minutes less and still covered every current storage area.',
    false,
    'What had replaced the cabinet?',
    ['locked shelves', 'the cabinet was replaced by locked shelves'],
    [['locked'], ['shelves']]
  ),
  g(
    'B-G06',
    'B-G-STORY-2',
    'Mei organized monthly safety inspections for a small laboratory. One checklist required staff to inspect a storage cabinet that had been removed six months earlier. Mei checked the equipment register, confirmed that the cabinet had been replaced by locked shelves, and updated the checklist. The next inspection took ten minutes less and still covered every current storage area.',
    false,
    'What improved during the next inspection?',
    ['it took ten minutes less while still covering every current storage area', 'the inspection was ten minutes faster', 'it took less time'],
    [['ten', '10'], ['minutes'], ['less', 'faster']]
  ),

  h('B-H01', 'The revised contract protects both parties from unexpected price increases.'),
  h('B-H02', 'Please notify the reception team whenever an external visitor is expected.'),
  h('B-H03', 'Few people anticipated how quickly demand for the service would grow.'),
  h('B-H04', 'The final decision depends on evidence collected during the trial period.'),
  h('B-H05', 'We have arranged additional training for staff who joined after January.'),
  h('B-H06', 'Although the repair was temporary, it allowed production to continue safely.'),
  h('B-H07', 'Every regional manager will receive a copy of the updated guidance.'),
  h('B-H08', 'Customers can change their delivery preference until the order is dispatched.'),
  h('B-H09', 'The workshop encouraged participants to question several familiar assumptions.'),
  h('B-H10', 'Our proposal includes measurable targets as well as a realistic implementation schedule.'),

  i(
    'B-I01',
    'You promised to send a client a cost estimate today, but one supplier has not provided a price. Call the client before the deadline.',
    'the client',
    [
      'Explain that one supplier price is still outstanding without blaming the supplier.',
      'Offer to send the confirmed part of 