uration: 10,
  duration: 60,
  situation,
  listener,
  requiredPoints
});

const j = (id, story, expectedKeywords) => ({
  id,
  section: 'J',
  type: 'story-retelling',
  duration: 30,
  story,
  expectedKeywords
});

const formA = [
  a('A-A01', 'The board decided to ___ the proposal until independent evidence became available.', ['defer', 'postpone']),
  a('A-A02', 'Her explanation was so ___ that even colleagues without technical training understood the process.', ['clear', 'lucid']),
  a('A-A03', 'The audit found no evidence to ___ the allegation of deliberate misconduct.', ['substantiate', 'support', 'prove']),
  a('A-A04', 'The revised policy will come into ___ at the beginning of the next quarter.', ['effect', 'force']),
  a('A-A05', 'After several difficult meetings, both departments reached a mutually ___ compromise.', ['acceptable', 'satisfactory', 'beneficial']),
  a('A-A06', 'Before publishing the dashboard, the analyst was asked to ___ every figure against the source data.', ['verify', 'check', 'validate']),
  a('A-A07', 'The supplier accepted full ___ for replacing the damaged shipment.', ['responsibility', 'liability']),
  a('A-A08', 'The report draws a useful ___ between correlation and causation.', ['distinction', 'difference', 'contrast']),
  a('A-A09', 'Employees must keep the acquisition plans ___ until the public announcement.', ['confidential', 'private', 'secret']),
  a('A-A10', 'Consumer demand remained surprisingly ___ throughout the economic slowdown.', ['stable', 'steady', 'strong']),

  b(
    'A-B01',
    'A regional help desk tested a hybrid staffing model for six weeks. Two agents worked from home while four remained in the office. During the trial, the team resolved sixty-two requests and reduced the average first-response time from eleven minutes to six. Managers recommended expanding the model after completing a data-privacy review.',
    [
      ['regional', 'help desk'],
      ['hybrid', 'six weeks'],
      ['two', 'home', 'four', 'office'],
      ['sixty two', '62', 'requests'],
      ['eleven', '11', 'six', '6', 'response'],
      ['expand', 'privacy', 'review']
    ]
  ),
  b(
    'A-B02',
    'A community college replaced four long career lectures with eight short practical clinics. Each clinic focused on one skill, such as interviewing, networking, or writing a résumé. Attendance rose by forty percent, and learners rated the smaller sessions more useful. The college will keep the format and add evening clinics next term.',
    [
      ['community college', 'college'],
      ['four', 'lectures', 'eight', 'clinics'],
      ['skill', 'interview', 'network', 'resume', 'résumé'],
      ['attendance', 'forty', '40'],
      ['useful', 'smaller'],
      ['evening', 'next term', 'keep']
    ]
  ),
  b(
    'A-B03',
    'A distribution centre introduced barcode checks at three points: receiving, storage, and dispatch. In the first month, incorrectly labelled parcels fell from thirty-one to nine. Scanning added about twelve seconds to each parcel, but fewer corrections saved several hours each week. The company plans to automate the final dispatch check.',
    [
      ['distribution', 'centre', 'center'],
      ['barcode', 'receiving', 'storage', 'dispatch'],
      ['thirty one', '31', 'nine', '9'],
      ['twelve', '12', 'seconds'],
      ['correction', 'hours', 'saved'],
      ['automate', 'final', 'dispatch']
    ]
  ),

  c(
    'A-C01',
    'Facilities notice: From Monday, rooms 3A and 3B will be reserved for client meetings between 9:00 a.m. and 2:00 p.m. Internal teams may book either room after 2:00 p.m. Room 2C remains available all day, but its video-conferencing equipment will be replaced on Wednesday and cannot be used then. Existing reservations have been transferred automatically where possible. Employees whose bookings could not be moved have received a separate message.',
    [
      {
        prompt: 'When may an internal team normally use room 3A?',
        options: ['Before 9:00 a.m. only', 'After 2:00 p.m.', 'Only on Wednesday', 'At any time'],
        correctIndex: 1,
        explanation: 'Rooms 3A and 3B are reserved for clients until 2:00 p.m.'
      },
      {
        prompt: 'Why is room 2C unsuitable on Wednesday?',
        options: ['It is reserved for clients', 'The room is being painted', 'Its video equipment is being replaced', 'All bookings were cancelled'],
        correctIndex: 2,
        explanation: 'The notice explicitly states that the video-conferencing equipment will be replaced that day.'
      }
    ]
  ),
  c(
    'A-C02',
    'Project update: The mobile application passed its security review, but the release has moved from 14 June to 21 June. The delay allows the support team to finish a revised help centre and gives two pilot customers another week to test the payment workflow. Marketing should continue preparing the launch campaign but must not publish the final date until the product director confirms it on Friday.',
    [
      {
        prompt: 'What caused the release date to move?',
        options: ['A failed security review', 'More time for support material and pilot testing', 'A change in marketing strategy', 'A payment-provider outage'],
        correctIndex: 1,
        explanation: 'The extra week is for the revised help centre and pilot testing.'
      },
      {
        prompt: 'What should marketing avoid doing before Friday?',
        options: ['Preparing campaign material', 'Contacting pilot customers', 'Publishing the final launch date', 'Reviewing the payment workflow'],
        correctIndex: 2,
        explanation: 'The date must not be published before confirmation from the product director.'
      }
    ]
  ),
  c(
    'A-C03',
    'Expense policy: Train journeys under three hours should be booked in standard class unless a documented accessibility need requires another arrangement. Employees may choose a flexible ticket when the meeting end time is uncertain, provided the reason is recorded in the booking system. Taxi costs are reimbursable before 6:00 a.m., after 10:00 p.m., or when public transport is unavailable. Receipts are required for every taxi claim above twenty pounds.',
    [
      {
        prompt: 'When may an employee choose a flexible train ticket?',
        options: ['Whenever standard class is full', 'When the meeting end time is uncertain and the reason is recorded', 'Only for a journey over three hours', 'Whenever a manager is travelling'],
        correctIndex: 1,
        explanation: 'Both uncertainty and a recorded reason are required.'
      },
      {
        prompt: 'Which taxi claim definitely requires a receipt?',
        options: ['£12 at 5:30 a.m.', '£18 after 10:00 p.m.', '£24 when trains are cancelled', 'Every taxi claim, regardless of amount'],
        correctIndex: 2,
        explanation: 'A receipt is required for every taxi claim above £20.'
      }
    ]
  ),

  d(
    'A-D01',
    'You manage a small training programme. A guest speaker has cancelled tomorrow’s session because of illness. Write to the registered participants.',
    'registered participants',
    [
      'Explain that the guest speaker is ill and the session cannot proceed as planned.',
      'State that the session has been rescheduled for next Tuesday at 3:00 p.m.',
      'Offer a recording to anyone who cannot attend the new time and ask them to reply by Friday.'
    ]
  ),
  d(
    'A-D02',
    'Your department received a draft report from an external consultant. Several data tables are missing their sources, and the executive summary is longer than agreed. Write to the consultant.',
    'external consultant',
    [
      'Thank the consultant for sending the draft.',
      'Ask for source notes to be added to all data tables and explain why verification is necessary.',
      'Request a shorter executive summary and ask for the revised report by 4:00 p.m. on Thursday.'
    ]
  ),

  e('A-E01', 'The maintenance team will inspect every emergency exit before the building opens.'),
  e('A-E02', 'Please attach the signed agreement when you return the completed registration form.'),
  e('A-E03', 'Although demand increased sharply, the factory delive