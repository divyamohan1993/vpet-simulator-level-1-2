the estimate today and the complete figure tomorrow morning.',
      'Ask whether that approach meets the client’s decision timetable.'
    ]
  ),
  i(
    'B-I02',
    'A colleague has prepared a useful report, but it contains unexplained abbreviations that senior readers may not understand. Give the colleague feedback.',
    'your colleague',
    [
      'Recognize the report’s useful analysis or structure.',
      'Explain why the abbreviations may create difficulty for the intended readers.',
      'Suggest defining each term on first use or adding a short glossary before submission.'
    ]
  ),

  j(
    'B-J01',
    'Farah arrived early to open a community clinic and discovered that the heating had stopped overnight. She moved appointments to two warmer rooms, called the building manager, and offered blankets to waiting patients. An engineer repaired the system before noon, and no appointment had to be cancelled.',
    [
      ['farah', 'community', 'clinic', 'early'],
      ['heating', 'stopped', 'overnight'],
      ['moved', 'appointments', 'warmer', 'rooms'],
      ['building', 'manager'],
      ['blankets', 'patients'],
      ['engineer', 'repaired', 'noon'],
      ['no', 'appointment', 'cancelled', 'canceled']
    ]
  ),
  j(
    'B-J02',
    'A design team sent packaging samples to a retailer, but the courier delivered them to the wrong branch. Ravi contacted both branches, arranged a same-day transfer, and e-mailed digital images to the buyer in the meantime. The buyer approved the design that afternoon, so production began without delay.',
    [
      ['design', 'team', 'packaging', 'samples'],
      ['courier', 'wrong', 'branch'],
      ['ravi', 'contacted', 'both'],
      ['same day', 'transfer'],
      ['emailed', 'digital', 'images', 'buyer'],
      ['approved', 'afternoon'],
      ['production', 'without', 'delay']
    ]
  ),
  j(
    'B-J03',
    'Jon was preparing a monthly sales report when he found that one region had submitted figures in a different currency. He confirmed the exchange rate with finance, converted the figures, and added a note explaining the method. His manager accepted the report and asked the other regions to use a standard currency template in future.',
    [
      ['jon', 'monthly', 'sales', 'report'],
      ['region', 'different', 'currency'],
      ['confirmed', 'exchange', 'rate', 'finance'],
      ['converted', 'figures'],
      ['note', 'method'],
      ['manager', 'accepted'],
      ['standard', 'currency', 'template', 'future']
    ]
  )
];

export const TEST_FORMS = {
  A: {
    id: 'A',
    name: 'Full Simulation · Form A',
    description: 'Original workplace, service, and project scenarios.',
    items: formA
  },
  B: {
    id: 'B',
    name: 'Full Simulation · Form B',
    description: 'A second complete set with distinct original questions.',
    items: formB
  }
};

export function scoreUnits(item) {
  return item.type === 'reading-comprehension' ? item.questions.length : 1;
}

export function countSectionUnits(items, sectionCode) {
  return items
    .filter((item) => item.section === sectionCode)
    .reduce((total, item) => total + scoreUnits(item), 0);
}

export function countTotalUnits(items) {
  return items.reduce((total, item) => total + scoreUnits(item), 0);
}

export function getSectionItems(formId, sectionCode) {
  const form = TEST_FORMS[formId] ?? TEST_FORMS.A;
  return form.items.filter((item) => item.section === sectionCode);
}

export function verifyFormStructure(form) {
  const sectionCounts = Object.fromEntries(
    SECTION_ORDER.map((section) => [section, countSectionUnits(form.items, section)])
  );
  const errors = [];

  for (const section of SECTION_ORDER) {
    const expected = SECTION_META[section].officialCount;
    if (sectionCounts[section] !== expected) {
      errors.push(`${section}: expected ${expected}, received ${sectionCounts[section]}`);
    }
  }

  const total = countTotalUnits(form.items);
  if (total !== 58) errors.push(`Total: expected 58, received ${total}`);

  return { valid: errors.length === 0, errors, sectionCounts, total };
}
