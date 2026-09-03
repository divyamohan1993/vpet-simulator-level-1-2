red all orders on schedule.'),
  e('A-E04', 'Employees who require specialist software should contact the service desk in advance.'),
  e('A-E05', 'The committee postponed its decision because two financial estimates were incomplete.'),
  e('A-E06', 'Our latest survey indicates that customers value reliable support more than frequent discounts.'),
  e('A-E07', 'Neither proposal addresses the long-term cost of maintaining the new equipment.'),
  e('A-E08', 'By the end of the workshop, each participant had produced a detailed action plan.'),

  f('A-F01', 'Could we move our review meeting to Thursday morning?', ['I reviewed it yesterday.', 'Thursday morning works for me.', 'The meeting room is upstairs.'], 1),
  f('A-F02', 'I am afraid the replacement part will not arrive until Monday.', ['Thanks for letting me know; please update the customer.', 'I ordered the blue one.', 'Monday was very busy.'], 0),
  f('A-F03', 'How did the client respond to the revised proposal?', ['We sent it by courier.', 'They asked for one minor change.', 'The proposal has twelve pages.'], 1),
  f('A-F04', 'Would you like me to reserve a seat for the seminar?', ['Yes, please, if places are still available.', 'The speaker travelled by train.', 'I sat near the window.'], 0),
  f('A-F05', 'Why has the printer been moved out of this room?', ['It is being repaired tomorrow.', 'To reduce noise during interviews.', 'The report was printed twice.'], 1),
  f('A-F06', 'I may need another day to finish checking these figures.', ['The figures are in the second column.', 'That is fine; send them by Wednesday morning.', 'Yesterday lasted all day.'], 1),
  f('A-F07', 'Who is responsible for welcoming the new starters?', ['Priya from the people team is handling it.', 'They started at half past nine.', 'The welcome pack is green.'], 0),
  f('A-F08', 'Do you know whether the cafeteria accepts contactless payment?', ['Lunch was quite good.', 'Yes, it accepts cards and mobile payments.', 'The cafeteria closes at six.'], 1),

  g(
    'A-G01',
    'A-G-STORY-1',
    'A software company planned to hold a customer workshop in its main office. Two days before the event, a water leak closed the meeting floor. The events coordinator booked a nearby library hall, arranged signs at the office entrance, and sent every attendee a map. All but one participant arrived on time, and the workshop received excellent feedback.',
    true,
    'Where was the workshop originally going to be held?',
    ['in the company main office', 'at the company office', 'in its main office'],
    [['company', 'office'], ['main', 'office']]
  ),
  g(
    'A-G02',
    'A-G-STORY-1',
    'A software company planned to hold a customer workshop in its main office. Two days before the event, a water leak closed the meeting floor. The events coordinator booked a nearby library hall, arranged signs at the office entrance, and sent every attendee a map. All but one participant arrived on time, and the workshop received excellent feedback.',
    false,
    'Why did the venue have to change?',
    ['because a water leak closed the meeting floor', 'a water leak closed the floor', 'because of a water leak'],
    [['water', 'leak'], ['closed', 'meeting', 'floor']]
  ),
  g(
    'A-G03',
    'A-G-STORY-1',
    'A software company planned to hold a customer workshop in its main office. Two days before the event, a water leak closed the meeting floor. The events coordinator booked a nearby library hall, arranged signs at the office entrance, and sent every attendee a map. All but one participant arrived on time, and the workshop received excellent feedback.',
    false,
    'What was the result of the coordinator’s arrangements?',
    ['all but one participant arrived on time and the feedback was excellent', 'almost everyone arrived on time and the workshop received excellent feedback', 'the workshop went well'],
    [['all', 'one', 'time'], ['excellent', 'feedback']]
  ),
  g(
    'A-G04',
    'A-G-STORY-2',
    'Marcos supervised a warehouse night shift. He noticed that a delivery driver had been assigned a loading bay that was too narrow for the vehicle. Instead of asking the driver to wait, Marcos moved a smaller van, opened the wider bay, and informed dispatch of the corrected bay numbers. The delivery left only five minutes late, and dispatch updated its vehicle records the next morning.',
    true,
    'What problem did Marcos notice?',
    ['the assigned loading bay was too narrow for the vehicle', 'a loading bay was too narrow', 'the vehicle had the wrong bay'],
    [['loading', 'bay'], ['too', 'narrow'], ['vehicle']]
  ),
  g(
    'A-G05',
    'A-G-STORY-2',
    'Marcos supervised a warehouse night shift. He noticed that a delivery driver had been assigned a loading bay that was too narrow for the vehicle. Instead of asking the driver to wait, Marcos moved a smaller van, opened the wider bay, and informed dispatch of the corrected bay numbers. The delivery left only five minutes late, and dispatch updated its vehicle records the next morning.',
    false,
    'What did Marcos do after opening the wider bay?',
    ['he informed dispatch of the corrected bay numbers', 'he told dispatch the correct bay numbers', 'he contacted dispatch'],
    [['inform', 'told', 'contact'], ['dispatch'], ['bay', 'numbers']]
  ),
  g(
    'A-G06',
    'A-G-STORY-2',
    'Marcos supervised a warehouse night shift. He noticed that a delivery driver had been assigned a loading bay that was too narrow for the vehicle. Instead of asking the driver to wait, Marcos moved a smaller van, opened the wider bay, and informed dispatch of the corrected bay numbers. The delivery left only five minutes late, and dispatch updated its vehicle records the next morning.',
    false,
    'How late did the delivery leave?',
    ['five minutes late', 'only five minutes late', 'five minutes'],
    [['five', '5'], ['minutes']]
  ),

  h('A-H01', 'The finance team expects the final invoice to arrive before noon.'),
  h('A-H02', 'Most applicants completed the online assessment without requesting assistance.'),
  h('A-H03', 'We should compare the long-term benefits before selecting a supplier.'),
  h('A-H04', 'Please leave enough time for questions at the end of your presentation.'),
  h('A-H05', 'The new procedure is simpler, although it still requires careful documentation.'),
  h('A-H06', 'Our regional offices have adopted the same customer complaint process.'),
  h('A-H07', 'If the weather improves, the inspection will continue tomorrow afternoon.'),
  h('A-H08', 'No confidential information should be stored on a personal device.'),
  h('A-H09', 'The research findings were more encouraging than the initial forecast suggested.'),
  h('A-H10', 'Several colleagues volunteered to mentor employees joining the graduate programme.'),

  i(
    'A-I01',
    'You are leading a project meeting. A colleague repeatedly interrupts other people and the discussion is falling behind schedule. Speak to the colleague privately after the meeting.',
    'your colleague',
    [
      'Acknowledge the colleague’s useful knowledge or enthusiasm.',
      'Explain specifically how the interruptions affected participation and timing.',
      'Ask the colleague to allow others to finish and suggest a constructive way to contribute next time.'
    ]
  ),
  i(
    'A-I02',
    'A customer ordered twenty chairs for an event, but only eighteen were delivered. The event is tomorrow morning. Call the customer with an update.',
    'the customer',
    [
      'Apologize and acknowledge that two chairs are missing.',
      'Offer to deliver the remaining chairs this evening or provide two temporary replacements.',
      'Confirm the customer’s preferred option and reassure them that the event will have enough seating.'
    ]
  ),

  j(
    'A-J01',
    'Lena was travelling to a conference when her train stopped because of a signal failure. She immediately informed the event organizer, joined the opening session from her phone, and arrived during the first break. Because she had downloaded her presentation in advance, she was ready to speak at the scheduled time.',
    [
      ['lena', 'conference', 'train'],