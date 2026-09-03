
      ['signal', 'failure', 'stopped'],
      ['informed', 'organizer'],
      ['joined', 'phone', 'opening'],
      ['arrived', 'break'],
      ['downloaded', 'presentation', 'ready', 'scheduled']
    ]
  ),
  j(
    'A-J02',
    'Owen noticed that new employees often asked the same questions about ordering equipment. He created a one-page guide with screenshots and asked two recent starters to test it. Their comments helped him simplify three steps. After the guide was published, equipment-ordering questions to the support team fell by half.',
    [
      ['owen', 'new employees', 'questions'],
      ['equipment', 'ordering'],
      ['guide', 'screenshots'],
      ['two', 'starters', 'test'],
      ['simplify', 'three', 'steps'],
      ['questions', 'fell', 'half']
    ]
  ),
  j(
    'A-J03',
    'A café owner expected a busy Saturday, but the card-payment terminal failed shortly after opening. She placed a clear notice at the entrance, accepted cash and bank transfers, and gave waiting customers free coffee. A technician repaired the terminal by lunchtime, and several customers praised the staff for handling the problem calmly.',
    [
      ['cafe', 'owner', 'busy', 'saturday'],
      ['card', 'terminal', 'failed'],
      ['notice', 'entrance'],
      ['cash', 'bank', 'transfer'],
      ['free', 'coffee'],
      ['technician', 'repaired', 'lunchtime'],
      ['customers', 'praised', 'calm']
    ]
  )
];

const formB = [
  a('B-A01', 'The chairperson asked the group to ___ from discussing confidential salaries in the open meeting.', ['refrain', 'abstain']),
  a('B-A02', 'Because the instructions were ___, three teams interpreted the final step differently.', ['ambiguous', 'unclear', 'vague']),
  a('B-A03', 'The company introduced a temporary discount to ___ the fall in winter demand.', ['offset', 'counter', 'reduce']),
  a('B-A04', 'Any change to the approved budget requires written ___ from the programme director.', ['authorization', 'authorisation', 'approval', 'permission']),
  a('B-A05', 'The technician identified the fault and restored the network with minimal ___.', ['disruption', 'delay', 'interruption']),
  a('B-A06', 'Applicants are advised to ___ copies of all documents submitted through the portal.', ['retain', 'keep', 'save']),
  a('B-A07', 'The evidence was not sufficiently ___ to justify changing the established procedure.', ['compelling', 'strong', 'convincing']),
  a('B-A08', 'Managers should ___ reasonable adjustments when an employee has an accessibility need.', ['provide', 'make', 'offer']),
  a('B-A09', 'The two estimates are broadly ___, although they use different assumptions.', ['comparable', 'similar', 'consistent']),
  a('B-A10', 'A short pilot will help us ___ whether the proposed workflow is practical.', ['determine', 'assess', 'establish', 'evaluate']),

  b(
    'B-B01',
    'A local council tested solar lighting on a riverside path that previously closed after sunset. Twenty lamps were installed for a three-month trial. Evening use of the path doubled, while reported safety incidents did not increase. Residents supported keeping the lights, but asked the council to reduce brightness near nesting birds.',
    [
      ['local council', 'council'],
      ['solar', 'lighting', 'riverside', 'path'],
      ['twenty', '20', 'three month'],
      ['evening', 'doubled'],
      ['safety', 'incidents', 'not increase'],
      ['residents', 'keep', 'brightness', 'birds']
    ]
  ),
  b(
    'B-B02',
    'An accounting firm introduced fifteen-minute morning briefings during its busiest month. Team leaders used the time to identify urgent work and reassign tasks before delays developed. Overtime fell by eighteen percent compared with the previous year, although total client work increased. The firm will repeat the briefings during the next reporting season.',
    [
      ['accounting', 'firm'],
      ['fifteen', '15', 'morning', 'briefings'],
      ['urgent', 'reassign', 'delays'],
      ['overtime', 'eighteen', '18'],
      ['client', 'work', 'increased'],
      ['repeat', 'next', 'reporting season']
    ]
  ),
  b(
    'B-B03',
    'A museum offered visitors a choice between a printed map and a mobile audio guide. Forty-six percent selected the audio guide, and these visitors spent an average of twenty minutes longer inside. Older visitors were less likely to choose it, mainly because staff did not explain how to adjust the volume. The museum will add a brief demonstration at the entrance.',
    [
      ['museum', 'visitors'],
      ['printed', 'map', 'mobile', 'audio', 'guide'],
      ['forty six', '46', 'selected'],
      ['twenty', '20', 'minutes', 'longer'],
      ['older', 'volume', 'explain'],
      ['demonstration', 'entrance']
    ]
  ),

  c(
    'B-C01',
    'Library update: The ground-floor study area will reopen on 8 September with forty additional desks and six bookable group rooms. The silent room on the second floor will remain closed until October while ventilation work continues. During this period, students may use the east reading room as a quiet area from 8:00 a.m. to noon. Group rooms can be reserved up to seven days in advance and bookings are limited to two hours.',
    [
      {
        prompt: 'What becomes available on 8 September?',
        options: ['The second-floor silent room', 'More desks and six group rooms', 'Twenty-four-hour east reading-room access', 'A new café'],
        correctIndex: 1,
        explanation: 'The reopened ground floor adds forty desks and six group rooms.'
      },
      {
        prompt: 'What is the maximum length of a group-room booking?',
        options: ['One hour', 'Two hours', 'Seven hours', 'One day'],
        correctIndex: 1,
        explanation: 'Bookings are expressly limited to two hours.'
      }
    ]
  ),
  c(
    'B-C02',
    'Recruitment note: Candidates for the operations role will complete a twenty-minute telephone interview followed, if successful, by a practical scheduling exercise. The exercise is not timed, but most candidates finish in about forty-five minutes. Applicants may use a calculator and blank paper, but they must not use spreadsheet software. Final interviews will be conducted in person unless an applicant requests a remote arrangement at least three working days beforehand.',
    [
      {
        prompt: 'Who completes the practical scheduling exercise?',
        options: ['Every applicant', 'Only candidates who pass the telephone interview', 'Only remote applicants', 'Candidates who request extra time'],
        correctIndex: 1,
        explanation: 'The practical exercise follows a successful telephone interview.'
      },
      {
        prompt: 'What is prohibited during the exercise?',
        options: ['A calculator', 'Blank paper', 'Spreadsheet software', 'Taking more than forty-five minutes'],
        correctIndex: 2,
        explanation: 'The exercise is untimed, but spreadsheet software may not be used.'
      }
    ]
  ),
  c(
    'B-C03',
    'Supplier bulletin: Orders placed before 2:00 p.m. are normally dispatched the same working day. From 1 to 12 December, same-day dispatch will apply only to orders received before noon because of warehouse maintenance. Refrigerated products are unaffected and will continue to leave at 3:30 p.m. Customers needing Saturday delivery must select that service during checkout; adding a note to a standard order does not arrange it.',
    [
      {
        prompt: 'During the maintenance period, when must a normal order arrive for same-day dispatch?',
        options: ['Before noon', 'Before 2:00 p.m.', 'Before 3:30 p.m.', 'The previous day'],
        correctIndex: 0,
        explanation: 'The temporary cutoff for normal orders is noon.'
      },
      {
        prompt: 'How should a customer request Saturday delivery?',
        options: ['Add a note after checkout', 'Telephone the warehouse', 'Select the service during checkout', 'Order refrigerated goods'],
        correctIndex: 2,
        explanation: 'A note on a standard order is not sufficient; the service must be selected.'
      }
    ]
  ),

  d(
    'B-D01',
    'You have booked a meeting room for an important supplier presentatio