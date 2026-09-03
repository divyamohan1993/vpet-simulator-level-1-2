/*
 * Expanded Level 2 question bank.
 *
 * All items in this file are original training content generated from the
 * publicly documented task formats. No confidential, recalled, scraped, or
 * official live-test questions are included.
 */

const BANK_SPECS = Object.freeze([
  {
    "id": "C",
    "title": "Customer Operations",
    "organization": "a regional customer support centre",
    "team": "service operations team",
    "leader": "Amina",
    "colleague": "Leo",
    "customer": "a hospital network",
    "manager": "Ms. Rao",
    "project": "a self-service support portal",
    "asset": "noise-cancelling headsets",
    "portableItem": "presentation adapter",
    "site": "Harbour Street office",
    "venue": "client briefing room",
    "backupVenue": "training suite",
    "supplier": "Northgate Systems",
    "event": "customer onboarding workshop",
    "issue": "an authentication outage",
    "cause": "construction work damaged a fibre cable",
    "workaround": "a verified telephone support fallback",
    "measure": "average first-response time",
    "baseline": "16 minutes",
    "improved": "9 minutes",
    "period": "six-week",
    "quantity": 1280,
    "quantity2": 24,
    "day1": "Tuesday",
    "day2": "Thursday",
    "time1": "9:00 AM",
    "time2": "2:00 PM",
    "deadline": "Friday at 4:00 PM",
    "document": "service continuity report",
    "policy": "customer data handling policy",
    "risk": "unauthorized disclosure of patient information",
    "training": "new-agent certification workshop",
    "oldProcess": "manual ticket assignment",
    "newProcess": "skills-based routing",
    "secondaryResult": "repeat contacts fell by twelve percent",
    "condition": "the privacy review is complete",
    "channel": "the secure team chat",
    "city": "Taipei",
    "caseCount": 1280,
    "escalationsBefore": 34,
    "escalationsAfter": 15,
    "delayMinutes": 11
  },
  {
    "id": "D",
    "title": "Software Release",
    "organization": "an enterprise software company",
    "team": "release engineering team",
    "leader": "Mateo",
    "colleague": "Priya",
    "customer": "a national retailer",
    "manager": "Dr. Chen",
    "project": "a mobile inventory application",
    "asset": "test devices",
    "portableItem": "security token",
    "site": "Riverside development hub",
    "venue": "release command room",
    "backupVenue": "product demonstration lab",
    "supplier": "Vector Cloud Services",
    "event": "version launch review",
    "issue": "a database migration failure",
    "cause": "an outdated script altered two index definitions",
    "workaround": "a read-only service mode",
    "measure": "deployment recovery time",
    "baseline": "42 minutes",
    "improved": "18 minutes",
    "period": "eight-week",
    "quantity": 760,
    "quantity2": 18,
    "day1": "Wednesday",
    "day2": "Friday",
    "time1": "10:00 AM",
    "time2": "3:00 PM",
    "deadline": "Monday at noon",
    "document": "release readiness report",
    "policy": "production change policy",
    "risk": "customer data becoming temporarily unavailable",
    "training": "secure deployment workshop",
    "oldProcess": "manual release approval",
    "newProcess": "automated risk-based approval",
    "secondaryResult": "rollback errors declined by twenty-one percent",
    "condition": "the independent security test is signed off",
    "channel": "the engineering incident channel",
    "city": "Singapore",
    "caseCount": 760,
    "escalationsBefore": 27,
    "escalationsAfter": 8,
    "delayMinutes": 14
  },
  {
    "id": "E",
    "title": "Logistics and Distribution",
    "organization": "a national distribution company",
    "team": "network planning team",
    "leader": "Jonas",
    "colleague": "Mei",
    "customer": "a chain of pharmacies",
    "manager": "Mr. Okafor",
    "project": "a route-optimization programme",
    "asset": "handheld barcode scanners",
    "portableItem": "charging cable",
    "site": "Eastport distribution centre",
    "venue": "dispatch planning room",
    "backupVenue": "driver training hall",
    "supplier": "TransitLogic",
    "event": "peak-season planning meeting",
    "issue": "a refrigerated vehicle breakdown",
    "cause": "a temperature sensor reported inconsistent readings",
    "workaround": "a monitored spare cold-storage unit",
    "measure": "average loading time",
    "baseline": "51 minutes",
    "improved": "32 minutes",
    "period": "nine-week",
    "quantity": 2140,
    "quantity2": 36,
    "day1": "Monday",
    "day2": "Thursday",
    "time1": "8:30 AM",
    "time2": "1:30 PM",
    "deadline": "Tuesday at 5:00 PM",
    "document": "distribution incident register",
    "policy": "temperature-controlled handling policy",
    "risk": "medicines exceeding their permitted temperature range",
    "training": "cold-chain compliance workshop",
    "oldProcess": "paper-based loading checks",
    "newProcess": "scanned three-point verification",
    "secondaryResult": "misrouted parcels fell by thirty percent",
    "condition": "the vehicle trial confirms fuel savings",
    "channel": "the dispatch coordination channel",
    "city": "Rotterdam",
    "caseCount": 2140,
    "escalationsBefore": 48,
    "escalationsAfter": 19,
    "delayMinutes": 9
  },
  {
    "id": "F",
    "title": "Healthcare Administration",
    "organization": "a city healthcare group",
    "team": "outpatient services team",
    "leader": "Sofia",
    "colleague": "Daniel",
    "customer": "a network of community clinics",
    "manager": "Dr. Mensah",
    "project": "an online appointment service",
    "asset": "patient check-in tablets",
    "portableItem": "clinic access badge",
    "site": "Central Medical Campus",
    "venue": "clinical operations room",
    "backupVenue": "staff learning centre",
    "supplier": "MediFlow Solutions",
    "event": "patient access review",
    "issue": "a scheduling system interruption",
    "cause": "a certificate expired during an overnight update",
    "workaround": "a controlled paper appointment list",
    "measure": "median check-in time",
    "baseline": "14 minutes",
    "improved": "6 minutes",
    "period": "twelve-week",
    "quantity": 1860,
    "quantity2": 30,
    "day1": "Thursday",
    "day2": "Monday",
    "time1": "8:00 AM",
    "time2": "12:30 PM",
    "deadline": "Wednesday at 3:00 PM",
    "document": "patient access improvement report",
    "policy": "clinical information access policy",
    "risk": "staff viewing records without a care-related purpose",
    "training": "patient scheduling workshop",
    "oldProcess": "separate paper referral forms",
    "newProcess": "a single verified digital form",
    "secondaryResult": "duplicate appointments declined by eighteen percent",
    "condition": "the accessibility audit is completed",
    "channel": "the clinical coordination workspace",
    "city": "Dublin",
    "caseCount": 1860,
    "escalationsBefore": 39,
    "escalationsAfter": 17,
    "delayMinutes": 7
  },
  {
    "id": "G",
    "title": "University Services",
    "organization": "an international university",
    "team": "student services team",
    "leader": "Elena",
    "colleague": "Marcus",
    "customer": "a group of exchange students",
    "manager": "Professor Iqbal",
    "project": "a digital enrolment journey",
    "asset": "document-scanning stations",
    "portableItem": "laptop charger",
    "site": "North Campus administration building",
    "venue": "international student lounge",
    "backupVenue": "career development suite",
    "supplier": "CampusBridge",
    "event": "exchange student orientation",
    "issue": "a document-verification backlog",
    "cause": "one overseas database was unavailable for maintenance",
    "workaround": "a time-limited conditional enrolment process",
    "measure": "average application turnaround time",
    "baseline": "nine days",
    "improved": "four days",
    "period": "ten-week",
    "quantity": 940,
    "quantity2": 16,
    "day1": "Friday",
    "day2": "Tuesday",
    "time1": "9:30 AM",
    "time2": "2:30 PM",
    "deadline": "Thursday at noon",
    "document": "student service performance brief",
    "policy": "student document retention policy",
    "risk": "identity documents being retained longer than necessary",
    "training": "international enrolment clinic",
    "oldProcess": "email-based document checking",
    "newProcess": "case-based digital verification",
    "secondaryResult": "incomplete applications fell by twenty-four percent",
    "condition": "the data-sharing agreement is approved",
    "channel": "the student casework portal",
    "city": "Lisbon",
    "caseCount": 940,
    "escalationsBefore": 31,
    "escalationsAfter": 12,
    "delayMinutes": 13
  },
  {
    "id": "H",
    "title": "Manufacturing Quality",
    "organization": "an industrial equipment manufacturer",
    "team": "quality assurance team",
    "leader": "Hana",
    "colleague": "Victor",
    "customer": "an offshore energy operator",
    "manager": "Ms. Becker",
    "project": "a predictive maintenance programme",
    "asset": "wireless vibration sensors",
    "portableItem": "calibration key",
    "site": "Westfield production plant",
    "venue": "quality review room",
    "backupVenue": "technical training bay",
    "supplier": "PrecisionSense",
    "event": "supplier quality conference",
    "issue": "an unexpected calibration drift",
    "cause": "a firmware setting used the wrong measurement interval",
    "workaround": "a verified manual calibration procedure",
    "measure": "first-pass inspection rate",
    "baseline": "eighty-two percent",
    "improved": "ninety-four percent",
    "period": "fourteen-week",
    "quantity": 3520,
    "quantity2": 42,
    "day1": "Tuesday",
    "day2": "Friday",
    "time1": "7:30 AM",
    "time2": "1:00 PM",
    "deadline": "Monday at 2:00 PM",
    "document": "quality corrective-action report",
    "policy": "measurement equipment control policy",
    "risk": "defective components passing final inspection",
    "training": "sensor calibration workshop",
    "oldProcess": "fixed monthly equipment checks",
    "newProcess": "risk-based condition monitoring",
    "secondaryResult": "unplanned stoppages fell by nineteen percent",
    "condition": "the customer witnesses the final validation",
    "channel": "the production quality dashboard",
    "city": "Munich",
    "caseCount": 3520,
    "escalationsBefore": 56,
    "escalationsAfter": 21,
    "delayMinutes": 12
  },
  {
    "id": "I",
    "title": "Banking Operations",
    "organization": "a cooperative bank",
    "team": "payments operations team",
    "leader": "Omar",
    "colleague": "Chloe",
    "customer": "a group of small-business customers",
    "manager": "Ms. Tan",
    "project": "a real-time payment service",
    "asset": "secure approval terminals",
    "portableItem": "hardware authentication key",
    "site": "City Square operations centre",
    "venue": "payments incident room",
    "backupVenue": "financial crime training suite",
    "supplier": "ClearRoute Payments",
    "event": "merchant services forum",
    "issue": "a duplicate payment alert",
    "cause": "a retry message arrived after the original transaction completed",
    "workaround": "a controlled transaction-hold rule",
    "measure": "average exception resolution time",
    "baseline": "73 minutes",
    "improved": "28 minutes",
    "period": "seven-week",
    "quantity": 4680,
    "quantity2": 20,
    "day1": "Saturday",
    "day2": "Wednesday",
    "time1": "8:00 AM",
    "time2": "12:00 PM",
    "deadline": "Friday at 1:00 PM",
    "document": "payments control assessment",
    "policy": "high-value payment authorization policy",
    "risk": "an unauthorized high-value transfer being released",
    "training": "payment exception simulation",
    "oldProcess": "manual exception allocation",
    "newProcess": "priority-based case routing",
    "secondaryResult": "customer status enquiries fell by twenty-seven percent",
    "condition": "the fraud team approves the monitoring rules",
    "channel": "the restricted payments workspace",
    "city": "Zurich",
    "caseCount": 4680,
    "escalationsBefore": 72,
    "escalationsAfter": 26,
    "delayMinutes": 8
  },
  {
    "id": "J",
    "title": "Renewable Energy",
    "organization": "a renewable energy developer",
    "team": "grid integration team",
    "leader": "Lina",
    "colleague": "George",
    "customer": "a regional electricity utility",
    "manager": "Dr. Silva",
    "project": "a battery storage installation",
    "asset": "power-quality meters",
    "portableItem": "weatherproof tablet",
    "site": "Coastal Energy Centre",
    "venue": "grid planning studio",
    "backupVenue": "safety training room",
    "supplier": "VoltEdge Engineering",
    "event": "grid readiness workshop",
    "issue": "an inverter communication fault",
    "cause": "two devices were configured with the same network address",
    "workaround": "a locally supervised operating mode",
    "measure": "forecast dispatch accuracy",
    "baseline": "seventy-six percent",
    "improved": "ninety-one percent",
    "period": "thirteen-week",
    "quantity": 1120,
    "quantity2": 28,
    "day1": "Monday",
    "day2": "Thursday",
    "time1": "9:00 AM",
    "time2": "2:00 PM",
    "deadline": "Tuesday at 4:00 PM",
    "document": "grid connection readiness report",
    "policy": "energization safety policy",
    "risk": "equipment being energized before protective tests finish",
    "training": "battery-site response exercise",
    "oldProcess": "spreadsheet-based dispatch planning",
    "newProcess": "automated forecast-assisted scheduling",
    "secondaryResult": "curtailment hours fell by sixteen percent",
    "condition": "the utility accepts the protection study",
    "channel": "the grid operations workspace",
    "city": "Copenhagen",
    "caseCount": 1120,
    "escalationsBefore": 29,
    "escalationsAfter": 10,
    "delayMinutes": 15
  },
  {
    "id": "K",
    "title": "Hospitality Management",
    "organization": "an international hotel group",
    "team": "guest experience team",
    "leader": "Ravi",
    "colleague": "Isabelle",
    "customer": "a conference organizer",
    "manager": "Mr. Morgan",
    "project": "a mobile guest-service application",
    "asset": "contactless check-in kiosks",
    "portableItem": "room master key",
    "site": "Grand Harbour Hotel",
    "venue": "executive conference room",
    "backupVenue": "banqueting training salon",
    "supplier": "StayConnect Technologies",
    "event": "international leadership conference",
    "issue": "a room-allocation error",
    "cause": "two group bookings used overlapping reservation codes",
    "workaround": "a supervised manual room assignment desk",
    "measure": "average guest check-in time",
    "baseline": "17 minutes",
    "improved": "7 minutes",
    "period": "six-week",
    "quantity": 1680,
    "quantity2": 22,
    "day1": "Sunday",
    "day2": "Tuesday",
    "time1": "8:30 AM",
    "time2": "1:30 PM",
    "deadline": "Thursday at 3:00 PM",
    "document": "guest experience review",
    "policy": "guest identity verification policy",
    "risk": "room access being issued to the wrong guest",
    "training": "conference-service coordination workshop",
    "oldProcess": "counter-only check-in",
    "newProcess": "assisted mobile pre-registration",
    "secondaryResult": "queue complaints declined by thirty-two percent",
    "condition": "the accessibility tests are complete",
    "channel": "the guest operations channel",
    "city": "Vienna",
    "caseCount": 1680,
    "escalationsBefore": 44,
    "escalationsAfter": 18,
    "delayMinutes": 10
  },
  {
    "id": "L",
    "title": "Retail Operations",
    "organization": "a multi-brand retail company",
    "team": "store operations team",
    "leader": "Nora",
    "colleague": "Ben",
    "customer": "a group of franchise partners",
    "manager": "Ms. Williams",
    "project": "an electronic shelf-label rollout",
    "asset": "portable stock readers",
    "portableItem": "display-port adapter",
    "site": "Central Retail Support Office",
    "venue": "merchandising laboratory",
    "backupVenue": "franchise training room",
    "supplier": "ShelfWave Digital",
    "event": "seasonal trading briefing",
    "issue": "a promotional price mismatch",
    "cause": "one product file retained an expired campaign date",
    "workaround": "a centrally approved price-correction list",
    "measure": "average shelf-update time",
    "baseline": "46 minutes",
    "improved": "19 minutes",
    "period": "eight-week",
    "quantity": 2940,
    "quantity2": 48,
    "day1": "Wednesday",
    "day2": "Monday",
    "time1": "9:00 AM",
    "time2": "1:00 PM",
    "deadline": "Friday at 5:00 PM",
    "document": "seasonal trading control report",
    "policy": "promotional price approval policy",
    "risk": "customers being charged a price different from the displayed price",
    "training": "store price-integrity workshop",
    "oldProcess": "manual paper shelf labels",
    "newProcess": "centrally synchronized electronic labels",
    "secondaryResult": "price complaints fell by thirty-five percent",
    "condition": "the franchise partners approve the support model",
    "channel": "the retail operations portal",
    "city": "Madrid",
    "caseCount": 2940,
    "escalationsBefore": 63,
    "escalationsAfter": 24,
    "delayMinutes": 16
  },
  {
    "id": "M",
    "title": "Cybersecurity Operations",
    "organization": "a managed security services provider",
    "team": "security operations team",
    "leader": "Noor",
    "colleague": "Ethan",
    "customer": "a network of public libraries",
    "manager": "Dr. Kapoor",
    "project": "a zero-trust access rollout",
    "asset": "hardware security keys",
    "portableItem": "forensic storage drive",
    "site": "Central Security Operations Centre",
    "venue": "incident response room",
    "backupVenue": "secure training laboratory",
    "supplier": "CipherGate Security",
    "event": "quarterly threat briefing",
    "issue": "a credential-stuffing attack",
    "cause": "reused passwords from an unrelated breach were tested automatically",
    "workaround": "a temporary risk-based authentication rule",
    "measure": "mean time to contain an alert",
    "baseline": "38 minutes",
    "improved": "14 minutes",
    "period": "eleven-week",
    "quantity": 3280,
    "quantity2": 40,
    "day1": "Sunday",
    "day2": "Wednesday",
    "time1": "7:00 AM",
    "time2": "12:00 PM",
    "deadline": "Friday at noon",
    "document": "incident containment review",
    "policy": "privileged access policy",
    "risk": "an attacker retaining unnecessary administrative access",
    "training": "cross-team incident exercise",
    "oldProcess": "manual alert triage",
    "newProcess": "context-aware automated prioritization",
    "secondaryResult": "false escalations fell by twenty-six percent",
    "condition": "the customer access inventory is verified",
    "channel": "the secure incident bridge",
    "city": "Bengaluru",
    "caseCount": 3280,
    "escalationsBefore": 61,
    "escalationsAfter": 20,
    "delayMinutes": 5
  },
  {
    "id": "N",
    "title": "Research Laboratory",
    "organization": "an applied materials research institute",
    "team": "laboratory operations team",
    "leader": "Yuki",
    "colleague": "Thomas",
    "customer": "a consortium of engineering companies",
    "manager": "Professor Adeyemi",
    "project": "a high-temperature coating study",
    "asset": "portable gas detectors",
    "portableItem": "sample identification reader",
    "site": "Advanced Materials Laboratory",
    "venue": "research review room",
    "backupVenue": "instrument training suite",
    "supplier": "LabMetric Instruments",
    "event": "industry research review",
    "issue": "a sample-labeling inconsistency",
    "cause": "two teams used different abbreviations for the same coating batch",
    "workaround": "a reconciled master sample register",
    "measure": "average sample preparation time",
    "baseline": "95 minutes",
    "improved": "58 minutes",
    "period": "fifteen-week",
    "quantity": 620,
    "quantity2": 14,
    "day1": "Tuesday",
    "day2": "Friday",
    "time1": "8:00 AM",
    "time2": "1:00 PM",
    "deadline": "Wednesday at 4:00 PM",
    "document": "experimental traceability report",
    "policy": "laboratory sample-control policy",
    "risk": "results being attributed to the wrong material batch",
    "training": "instrument traceability workshop",
    "oldProcess": "separate team sample logs",
    "newProcess": "a shared barcode-based register",
    "secondaryResult": "untraceable samples fell to zero",
    "condition": "the safety committee accepts the revised protocol",
    "channel": "the controlled research workspace",
    "city": "Osaka",
    "caseCount": 620,
    "escalationsBefore": 22,
    "escalationsAfter": 6,
    "delayMinutes": 17
  },
  {
    "id": "O",
    "title": "Human Resources",
    "organization": "a global professional services firm",
    "team": "people operations team",
    "leader": "Grace",
    "colleague": "Ahmed",
    "customer": "a group of newly acquired regional offices",
    "manager": "Ms. Laurent",
    "project": "a unified employee onboarding process",
    "asset": "digital identity verification tablets",
    "portableItem": "wireless presentation remote",
    "site": "Metropolitan People Centre",
    "venue": "employee experience studio",
    "backupVenue": "learning and development suite",
    "supplier": "PeoplePath Systems",
    "event": "manager onboarding forum",
    "issue": "a payroll data-transfer delay",
    "cause": "three regional files used incompatible date formats",
    "workaround": "a validated interim payment schedule",
    "measure": "average onboarding completion time",
    "baseline": "twelve days",
    "improved": "six days",
    "period": "twelve-week",
    "quantity": 1340,
    "quantity2": 26,
    "day1": "Thursday",
    "day2": "Tuesday",
    "time1": "9:30 AM",
    "time2": "3:00 PM",
    "deadline": "Monday at 10:00 AM",
    "document": "onboarding transition report",
    "policy": "employee information retention policy",
    "risk": "personal information being shared beyond the onboarding team",
    "training": "regional manager onboarding workshop",
    "oldProcess": "different regional onboarding checklists",
    "newProcess": "one role-based digital workflow",
    "secondaryResult": "missing starter documents fell by twenty-nine percent",
    "condition": "the employee representatives approve the support plan",
    "channel": "the confidential people case portal",
    "city": "Brussels",
    "caseCount": 1340,
    "escalationsBefore": 37,
    "escalationsAfter": 13,
    "delayMinutes": 12
  },
  {
    "id": "P",
    "title": "Construction Project",
    "organization": "an urban infrastructure contractor",
    "team": "project controls team",
    "leader": "Carlos",
    "colleague": "Maya",
    "customer": "a municipal transport authority",
    "manager": "Mr. Evans",
    "project": "a city-centre station redevelopment",
    "asset": "rugged site tablets",
    "portableItem": "site access radio",
    "site": "Central Station project office",
    "venue": "design coordination room",
    "backupVenue": "site safety classroom",
    "supplier": "BuildTrack Engineering",
    "event": "monthly stakeholder review",
    "issue": "an unexpected utility obstruction",
    "cause": "historic drawings omitted a live drainage connection",
    "workaround": "a protected temporary diversion route",
    "measure": "average design-query response time",
    "baseline": "eight days",
    "improved": "three days",
    "period": "sixteen-week",
    "quantity": 880,
    "quantity2": 34,
    "day1": "Monday",
    "day2": "Wednesday",
    "time1": "7:30 AM",
    "time2": "12:30 PM",
    "deadline": "Friday at 2:00 PM",
    "document": "project change-control report",
    "policy": "excavation authorization policy",
    "risk": "work beginning before underground services are confirmed",
    "training": "utility-detection refresher",
    "oldProcess": "email-based design queries",
    "newProcess": "a tracked common-data workflow",
    "secondaryResult": "overdue design queries fell by forty-one percent",
    "condition": "the authority approves the revised traffic plan",
    "channel": "the controlled project data environment",
    "city": "Melbourne",
    "caseCount": 880,
    "escalationsBefore": 43,
    "escalationsAfter": 16,
    "delayMinutes": 18
  },
  {
    "id": "Q",
    "title": "Public Transport",
    "organization": "a metropolitan bus operator",
    "team": "service control team",
    "leader": "Fatima",
    "colleague": "Henry",
    "customer": "a city accessibility advisory group",
    "manager": "Ms. Petrov",
    "project": "a real-time passenger information upgrade",
    "asset": "portable passenger-count sensors",
    "portableItem": "portable announcement microphone",
    "site": "Northside Operations Depot",
    "venue": "service control briefing room",
    "backupVenue": "driver development centre",
    "supplier": "UrbanMove Technology",
    "event": "accessible travel consultation",
    "issue": "a route display outage",
    "cause": "a mapping feed stopped publishing two newly opened stops",
    "workaround": "a verified driver announcement script",
    "measure": "average disruption response time",
    "baseline": "26 minutes",
    "improved": "11 minutes",
    "period": "nine-week",
    "quantity": 2480,
    "quantity2": 32,
    "day1": "Saturday",
    "day2": "Tuesday",
    "time1": "8:00 AM",
    "time2": "1:30 PM",
    "deadline": "Thursday at 11:00 AM",
    "document": "passenger information performance report",
    "policy": "service disruption communication policy",
    "risk": "passengers receiving incomplete accessibility information",
    "training": "disruption communication exercise",
    "oldProcess": "radio-only disruption updates",
    "newProcess": "multichannel control-room publishing",
    "secondaryResult": "information complaints fell by thirty-eight percent",
    "condition": "the accessibility group approves the revised wording",
    "channel": "the service control incident board",
    "city": "Toronto",
    "caseCount": 2480,
    "escalationsBefore": 52,
    "escalationsAfter": 18,
    "delayMinutes": 6
  },
  {
    "id": "R",
    "title": "Media Production",
    "organization": "an international media studio",
    "team": "production operations team",
    "leader": "Keiko",
    "colleague": "Sam",
    "customer": "a global documentary distributor",
    "manager": "Mr. Bernard",
    "project": "a multilingual documentary series",
    "asset": "portable audio recorders",
    "portableItem": "camera memory card",
    "site": "Harbour Media Campus",
    "venue": "production review theatre",
    "backupVenue": "audio training studio",
    "supplier": "FrameLink Media Services",
    "event": "international production review",
    "issue": "a subtitle synchronization error",
    "cause": "the final edit used a different frame rate from the translation file",
    "workaround": "a time-coded review copy",
    "measure": "average review-cycle duration",
    "baseline": "six days",
    "improved": "three days",
    "period": "eight-week",
    "quantity": 720,
    "quantity2": 18,
    "day1": "Wednesday",
    "day2": "Friday",
    "time1": "10:00 AM",
    "time2": "3:30 PM",
    "deadline": "Tuesday at noon",
    "document": "production delivery assessment",
    "policy": "media asset transfer policy",
    "risk": "unreleased footage being shared outside approved teams",
    "training": "multilingual production workflow workshop",
    "oldProcess": "separate email review threads",
    "newProcess": "a shared time-coded review platform",
    "secondaryResult": "duplicate review comments fell by forty-four percent",
    "condition": "the distributor approves the final terminology list",
    "channel": "the restricted production workspace",
    "city": "Seoul",
    "caseCount": 720,
    "escalationsBefore": 28,
    "escalationsAfter": 9,
    "delayMinutes": 13
  },
  {
    "id": "S",
    "title": "Nonprofit Programme",
    "organization": "an international education charity",
    "team": "programme delivery team",
    "leader": "Miriam",
    "colleague": "Luis",
    "customer": "a coalition of rural schools",
    "manager": "Dr. Johnson",
    "project": "a teacher-support programme",
    "asset": "solar-powered learning tablets",
    "portableItem": "mobile internet router",
    "site": "Regional Education Support Centre",
    "venue": "programme coordination room",
    "backupVenue": "teacher learning hall",
    "supplier": "BrightClass Foundation Services",
    "event": "school leadership workshop",
    "issue": "a delayed learning-material shipment",
    "cause": "flooding closed the main road to two districts",
    "workaround": "a temporary digital resource pack",
    "measure": "average support-request response time",
    "baseline": "five days",
    "improved": "two days",
    "period": "fourteen-week",
    "quantity": 1560,
    "quantity2": 50,
    "day1": "Tuesday",
    "day2": "Thursday",
    "time1": "8:30 AM",
    "time2": "2:00 PM",
    "deadline": "Monday at 4:00 PM",
    "document": "programme delivery review",
    "policy": "beneficiary information protection policy",
    "risk": "children's personal information being shared without permission",
    "training": "school data-protection workshop",
    "oldProcess": "monthly paper support requests",
    "newProcess": "offline-capable mobile case reporting",
    "secondaryResult": "unresolved requests fell by thirty-three percent",
    "condition": "the school coalition confirms local support contacts",
    "channel": "the protected programme portal",
    "city": "Nairobi",
    "caseCount": 1560,
    "escalationsBefore": 46,
    "escalationsAfter": 17,
    "delayMinutes": 19
  },
  {
    "id": "T",
    "title": "Food Distribution",
    "organization": "a regional food distribution cooperative",
    "team": "supply assurance team",
    "leader": "Peter",
    "colleague": "Anika",
    "customer": "a group of independent restaurants",
    "manager": "Ms. Costa",
    "project": "a fresh-produce traceability service",
    "asset": "wireless temperature loggers",
    "portableItem": "digital temperature probe",
    "site": "Green Market Distribution Hub",
    "venue": "supply planning office",
    "backupVenue": "food-safety training kitchen",
    "supplier": "FreshChain Analytics",
    "event": "restaurant supply forum",
    "issue": "a chilled-storage temperature alert",
    "cause": "a loading door remained open during an unusually long inspection",
    "workaround": "a verified secondary cold room",
    "measure": "average lot-tracing time",
    "baseline": "84 minutes",
    "improved": "23 minutes",
    "period": "ten-week",
    "quantity": 3860,
    "quantity2": 44,
    "day1": "Monday",
    "day2": "Wednesday",
    "time1": "6:30 AM",
    "time2": "12:00 PM",
    "deadline": "Friday at 10:00 AM",
    "document": "cold-chain assurance report",
    "policy": "perishable goods handling policy",
    "risk": "food being distributed outside its safe temperature range",
    "training": "restaurant cold-chain workshop",
    "oldProcess": "handwritten lot tracking",
    "newProcess": "scanned farm-to-customer traceability",
    "secondaryResult": "unresolved origin queries fell by forty-seven percent",
    "condition": "the food-safety audit confirms the controls",
    "channel": "the supplier assurance portal",
    "city": "Milan",
    "caseCount": 3860,
    "escalationsBefore": 67,
    "escalationsAfter": 22,
    "delayMinutes": 8
  },
  {
    "id": "U",
    "title": "Consulting Project",
    "organization": "a management consulting firm",
    "team": "client delivery team",
    "leader": "Claire",
    "colleague": "Abdul",
    "customer": "a regional manufacturing client",
    "manager": "Mr. Fischer",
    "project": "an operating-model redesign",
    "asset": "secure workshop tablets",
    "portableItem": "video-conference camera",
    "site": "Central Client Delivery Office",
    "venue": "strategy workshop room",
    "backupVenue": "project learning studio",
    "supplier": "InsightWorks Analytics",
    "event": "executive design workshop",
    "issue": "a baseline-data discrepancy",
    "cause": "two departments classified outsourced labour differently",
    "workaround": "a reconciled assumptions register",
    "measure": "average decision turnaround time",
    "baseline": "eleven days",
    "improved": "five days",
    "period": "seven-week",
    "quantity": 1040,
    "quantity2": 20,
    "day1": "Tuesday",
    "day2": "Friday",
    "time1": "9:00 AM",
    "time2": "2:30 PM",
    "deadline": "Monday at 3:00 PM",
    "document": "operating-model recommendation",
    "policy": "client confidential-information policy",
    "risk": "one client's data being visible to an unrelated project team",
    "training": "consulting quality review workshop",
    "oldProcess": "separate workstream status reports",
    "newProcess": "an integrated decision tracker",
    "secondaryResult": "overdue client decisions fell by thirty-one percent",
    "condition": "the finance director validates the baseline",
    "channel": "the restricted client collaboration site",
    "city": "Paris",
    "caseCount": 1040,
    "escalationsBefore": 35,
    "escalationsAfter": 11,
    "delayMinutes": 14
  },
  {
    "id": "V",
    "title": "Telecommunications",
    "organization": "a national telecommunications provider",
    "team": "network reliability team",
    "leader": "Min",
    "colleague": "Sarah",
    "customer": "a group of emergency service agencies",
    "manager": "Dr. Hughes",
    "project": "a resilient mobile coverage upgrade",
    "asset": "portable signal analyzers",
    "portableItem": "field modem",
    "site": "North District network centre",
    "venue": "service assurance room",
    "backupVenue": "field engineering classroom",
    "supplier": "SignalCore Networks",
    "event": "network resilience briefing",
    "issue": "a regional routing instability",
    "cause": "a software update changed a preferred path metric",
    "workaround": "a verified static routing policy",
    "measure": "average service restoration time",
    "baseline": "67 minutes",
    "improved": "29 minutes",
    "period": "ten-week",
    "quantity": 4420,
    "quantity2": 38,
    "day1": "Saturday",
    "day2": "Tuesday",
    "time1": "7:00 AM",
    "time2": "1:00 PM",
    "deadline": "Thursday at 4:00 PM",
    "document": "network reliability assessment",
    "policy": "critical service change policy",
    "risk": "loss of connectivity for emergency responders",
    "training": "major incident coordination exercise",
    "oldProcess": "device-by-device fault isolation",
    "newProcess": "topology-aware automated diagnosis",
    "secondaryResult": "repeat outages fell by twenty-two percent",
    "condition": "the emergency agencies approve the failover test",
    "channel": "the network incident bridge",
    "city": "Stockholm",
    "caseCount": 4420,
    "escalationsBefore": 68,
    "escalationsAfter": 23,
    "delayMinutes": 6
  }
]);

const BANK_COMPLETION_SETS = [
  [
    { prompt: (s) => `The ${s.team} agreed to ___ ${s.project} until ${s.condition}.`, accepted: ['defer', 'postpone'] },
    { prompt: (s) => `${s.leader}'s explanation of ${s.issue} was so ___ that non-specialists understood the problem immediately.`, accepted: ['clear', 'coherent'] },
    { prompt: (s) => `The investigation found enough evidence to ___ the claim that ${s.cause}.`, accepted: ['substantiate', 'support'] },
    { prompt: (s) => `The revised ${s.policy} will come into ___ on ${s.day2}.`, accepted: ['effect', 'force'] },
    { prompt: (s) => `Managers concluded that ${s.workaround} was a ___ short-term solution.`, accepted: ['viable', 'feasible', 'practical'] },
    { prompt: (s) => `Before releasing the ${s.document}, ${s.colleague} was asked to ___ every figure against the source records.`, accepted: ['verify', 'validate', 'check'] },
    { prompt: (s) => `${s.supplier} accepted full ___ for replacing the affected ${s.asset}.`, accepted: ['responsibility', 'liability'] },
    { prompt: (s) => `The briefing on ${s.issue} draws an important ___ between urgent incidents and routine service requests.`, accepted: ['distinction', 'difference', 'contrast'] },
    { prompt: (s) => `Details of ${s.project} must remain ___ until ${s.customer} receives the formal announcement.`, accepted: ['confidential', 'private', 'secret'] },
    { prompt: (s) => `Despite ${s.issue}, the ${s.measure} remained relatively ___ throughout the reporting period.`, accepted: ['stable', 'steady', 'constant'] }
  ],
  [
    { prompt: (s) => `The project manager must ___ sufficient time for the ${s.training} before ${s.deadline}.`, accepted: ['allocate', 'reserve'] },
    { prompt: (s) => `The board requested a ___ summary of ${s.document} that focused only on the decision and its main consequences.`, accepted: ['concise', 'succinct', 'brief'] },
    { prompt: (s) => `Every contractor working at ${s.site} must ___ with the ${s.policy}.`, accepted: ['comply', 'conform'] },
    { prompt: (s) => `The continuity plan includes a ___ in case ${s.workaround} becomes unavailable.`, accepted: ['contingency', 'fallback', 'backup'] },
    { prompt: (s) => `${s.manager} asked for an ___ assessment that did not favor either supplier.`, accepted: ['impartial', 'objective', 'neutral'] },
    { prompt: (s) => `Finance and operations must ___ their figures before the ${s.document} is submitted.`, accepted: ['reconcile', 'align'] },
    { prompt: (s) => `The selection process for ${s.supplier} should be fully ___ so that every bidder understands how the decision was made.`, accepted: ['transparent', 'open'] },
    { prompt: (s) => `The old approval form became ___ after the ${s.newProcess} was introduced.`, accepted: ['obsolete', 'outdated', 'redundant'] },
    { prompt: (s) => `Attendance at ${s.training} is ___ for employees who handle ${s.risk}.`, accepted: ['mandatory', 'compulsory', 'required'] },
    { prompt: (s) => `The additional control is intended to ___ the risk of ${s.risk}.`, accepted: ['mitigate', 'reduce', 'limit'] }
  ],
  [
    { prompt: (s) => `The planning team failed to ___ how quickly ${s.issue} would affect ${s.customer}.`, accepted: ['anticipate', 'foresee', 'predict'] },
    { prompt: (s) => `After reviewing the available staff and budget, the committee judged ${s.project} to be ___.`, accepted: ['feasible', 'viable', 'practical'] },
    { prompt: (s) => `${s.manager} would not ___ the proposal until the control weaknesses had been corrected.`, accepted: ['endorse', 'approve', 'support'] },
    { prompt: (s) => `A small ___ between figures in ${s.document} and the source file triggered a wider review.`, accepted: ['discrepancy', 'difference', 'mismatch'] },
    { prompt: (s) => `Because two inputs for ${s.document} were still missing, the team issued only a ___ estimate.`, accepted: ['provisional', 'tentative', 'preliminary'] },
    { prompt: (s) => `The organization decided to ___ ${s.oldProcess} until the replacement had passed testing.`, accepted: ['retain', 'keep', 'maintain'] },
    { prompt: (s) => `${s.leader} called the meeting to ___ which team would own the final decision.`, accepted: ['clarify', 'confirm', 'explain'] },
    { prompt: (s) => `The new recognition scheme gave staff an additional ___ to complete ${s.training}.`, accepted: ['incentive', 'motivation'] },
    { prompt: (s) => `Several managers were ___ to adopt ${s.newProcess} before seeing evidence from the pilot.`, accepted: ['reluctant', 'hesitant', 'unwilling'] },
    { prompt: (s) => `The preferred solution for ${s.project} must be financially and environmentally ___ over several years.`, accepted: ['sustainable', 'viable'] }
  ],
  [
    { prompt: (s) => `The steering group plans to ___ the separate reports into one ${s.document}.`, accepted: ['consolidate', 'combine', 'merge'] },
    { prompt: (s) => `The instruction was too ___ to determine whether contractors could use ${s.channel}.`, accepted: ['ambiguous', 'unclear', 'vague'] },
    { prompt: (s) => `${s.colleague} was asked to ___ the additional cost with evidence of long-term value.`, accepted: ['justify', 'defend', 'explain'] },
    { prompt: (s) => `The redesigned service at ${s.site} proved more ___ during periods of unusually high demand.`, accepted: ['resilient', 'robust', 'reliable'] },
    { prompt: (s) => `Demand for ${s.project} may ___ the capacity available at ${s.site}.`, accepted: ['exceed', 'surpass', 'outstrip'] },
    { prompt: (s) => `Only ${s.manager} can ___ an exception to the ${s.policy}.`, accepted: ['authorize', 'approve', 'permit'] },
    { prompt: (s) => `The revised forecast for ${s.measure} is more ___ because it uses verified figures from every department.`, accepted: ['accurate', 'precise', 'reliable'] },
    { prompt: (s) => `The replacement equipment must be ___ with the systems already used by ${s.customer}.`, accepted: ['compatible'] },
    { prompt: (s) => `During ${s.issue}, staff must ___ requests that affect safety or essential services.`, accepted: ['prioritize', 'prioritise'] },
    { prompt: (s) => `Some disruption was ___ once the ${s.venue} became unavailable at such short notice.`, accepted: ['inevitable', 'unavoidable'] }
  ],
  [
    { prompt: (s) => `The shared dashboard was introduced to ___ faster coordination between the ${s.team} and ${s.customer}.`, accepted: ['facilitate', 'enable', 'support'] },
    { prompt: (s) => `The audit of ${s.policy} produced a ___ review of controls, responsibilities, and unresolved risks.`, accepted: ['comprehensive', 'thorough', 'complete'] },
    { prompt: (s) => `Supervisors will ___ the ${s.measure} for three months before deciding whether to expand the pilot.`, accepted: ['monitor', 'track', 'observe'] },
    { prompt: (s) => `Because specialist staff for ${s.training} were ___, the organization scheduled the most urgent work first.`, accepted: ['scarce', 'limited'] },
    { prompt: (s) => `Repeated delays could be ___ to the relationship with ${s.customer}.`, accepted: ['detrimental', 'harmful', 'damaging'] },
    { prompt: (s) => `The committee reached a ___ decision on ${s.project} after every member supported the revised proposal.`, accepted: ['unanimous'] },
    { prompt: (s) => `Temporary visitors are not ___ from the security checks required at ${s.site}.`, accepted: ['exempt', 'excluded'] },
    { prompt: (s) => `Savings from ${s.newProcess} should ___ the initial cost of ${s.asset}.`, accepted: ['offset', 'counterbalance'] },
    { prompt: (s) => `Two approval steps in ${s.oldProcess} were removed because they were judged ___.`, accepted: ['redundant', 'unnecessary', 'duplicative'] },
    { prompt: (s) => `Each workstream leader on ${s.project} is ___ for reporting delays before they affect the final deadline.`, accepted: ['accountable', 'responsible'] }
  ]
];


const BANK_STOP_WORDS = new Set([
  'about', 'after', 'again', 'against', 'because', 'before', 'being', 'between', 'could',
  'every', 'from', 'have', 'into', 'more', 'other', 'should', 'their', 'there', 'these',
  'they', 'this', 'through', 'under', 'until', 'were', 'which', 'while', 'with', 'would'
]);

const bankNumber = (value) => Number(value).toLocaleString('en-US');

const bankGroup = (...values) => {
  const alternatives = [];
  for (const value of values.flat()) {
    const text = String(value ?? '').toLowerCase().trim();
    if (!text) continue;
    alternatives.push(text);
    const tokens = text.match(/[a-z]+|\d+/g) ?? [];
    alternatives.push(
      ...tokens.filter((token) => /^\d+$/.test(token) || (token.length > 3 && !BANK_STOP_WORDS.has(token)))
    );
  }
  return [...new Set(alternatives)];
};

const bankRotate = (values, shift) => {
  const amount = ((shift % values.length) + values.length) % values.length;
  return values.slice(amount).concat(values.slice(0, amount));
};

const bankChoice = (correct, distractors, seed) => {
  const options = bankRotate([correct, ...distractors], seed);
  return { options, correctIndex: options.indexOf(correct) };
};

const bankQuestion = (prompt, correct, distractors, explanation, seed) => ({
  prompt,
  ...bankChoice(correct, distractors, seed),
  explanation
});

const bankResponseItem = (id, prompt, correct, distractors, seed) => {
  const choice = bankChoice(correct, distractors, seed);
  return f(id, prompt, choice.options, choice.correctIndex);
};

function bankBuildA(spec, formIndex) {
  const templates = BANK_COMPLETION_SETS[formIndex % BANK_COMPLETION_SETS.length];
  return templates.map((entry, itemIndex) =>
    a(`${spec.id}-A${String(itemIndex + 1).padStart(2, '0')}`, entry.prompt(spec), entry.accepted)
  );
}

function bankBuildB(spec) {
  const firstPassage =
    `During the ${spec.period} pilot, ${spec.organization} replaced ${spec.oldProcess} with ${spec.newProcess}. ` +
    `${bankNumber(spec.quantity)} cases were handled during the trial. ${spec.measure[0].toUpperCase()}${spec.measure.slice(1)} improved ` +
    `from ${spec.baseline} to ${spec.improved}, and ${spec.secondaryResult}. Managers recommended a wider rollout after ${spec.condition}.`;

  const secondPassage =
    `On ${spec.day1}, ${spec.issue} disrupted work at ${spec.site}. ${spec.leader} confirmed that ${spec.cause}. ` +
    `The ${spec.team} used ${spec.workaround}, informed ${spec.customer}, and kept the ${spec.event} on schedule. ` +
    `Normal service resumed by ${spec.time2}, and the organization recorded the lessons in its ${spec.document}.`;

  const thirdPassage =
    `${spec.organization[0].toUpperCase()}${spec.organization.slice(1)} ordered ${spec.quantity2} ${spec.asset} from ${spec.supplier} for the ${spec.training}. ` +
    `A receiving check found that several units lacked the required identification labels. ${spec.colleague} isolated the affected items, ` +
    `requested replacements, and redistributed the usable equipment. The replacements arrived before ${spec.deadline}, so the training began as planned.`;

  return [
    b(`${spec.id}-B01`, firstPassage, [
      bankGroup(spec.period, 'pilot'),
      bankGroup(spec.oldProcess),
      bankGroup(spec.newProcess),
      bankGroup(spec.quantity, 'cases'),
      bankGroup(spec.measure, spec.baseline, spec.improved),
      bankGroup(spec.secondaryResult),
      bankGroup(spec.condition, 'rollout')
    ]),
    b(`${spec.id}-B02`, secondPassage, [
      bankGroup(spec.day1, spec.issue),
      bankGroup(spec.site),
      bankGroup(spec.cause),
      bankGroup(spec.workaround),
      bankGroup(spec.customer, spec.event),
      bankGroup(spec.time2, 'normal service'),
      bankGroup(spec.document, 'lessons')
    ]),
    b(`${spec.id}-B03`, thirdPassage, [
      bankGroup(spec.quantity2, spec.asset),
      bankGroup(spec.supplier),
      bankGroup('labels', 'identification'),
      bankGroup(spec.colleague, 'isolated'),
      bankGroup('replacements', 'redistributed'),
      bankGroup(spec.deadline),
      bankGroup(spec.training, 'planned')
    ])
  ];
}

function bankBuildC(spec, formIndex) {
  const noticePassage =
    `Facilities notice for ${spec.site}: From ${spec.day1}, the ${spec.venue} will be reserved for ${spec.customer} between ${spec.time1} and ${spec.time2}. ` +
    `The ${spec.team} may book it after ${spec.time2}. The ${spec.backupVenue} will be unavailable on ${spec.day2} because ${spec.cause}. ` +
    `Existing reservations will be transferred where possible. Anyone whose booking cannot be moved will receive a separate message.`;

  const reportPassage =
    `Performance bulletin: During the latest ${spec.period} review, the ${spec.team} handled ${bankNumber(spec.caseCount)} cases. ` +
    `${spec.measure[0].toUpperCase()}${spec.measure.slice(1)} changed from ${spec.baseline} to ${spec.improved}. ` +
    `Cases requiring senior escalation fell from ${spec.escalationsBefore} to ${spec.escalationsAfter}. ` +
    `However, one remote site submitted only five days of data, so the report describes the result as promising rather than conclusive.`;

  const policyPassage =
    `Under the ${spec.policy}, employees may use ${spec.channel} for routine progress updates, but decisions affecting budgets, deadlines, or customer commitments ` +
    `must be entered in the ${spec.document}. Contractors may view records relevant to their work but cannot approve changes. ` +
    `Urgent exceptions require written authorization from ${spec.manager} and must be documented within two working days.`;

  const n1 = bankQuestion(
    `When may the ${spec.team} normally use the ${spec.venue}?`,
    `After ${spec.time2}`,
    [`Before ${spec.time1} only`, `Only on ${spec.day2}`, 'At any time without a booking'],
    `The room is reserved for ${spec.customer} until ${spec.time2}.`,
    formIndex
  );
  const n2 = bankQuestion(
    `Why will the ${spec.backupVenue} be unavailable on ${spec.day2}?`,
    spec.cause[0].toUpperCase() + spec.cause.slice(1),
    ['It has been permanently closed', `It is reserved for ${spec.customer}`, 'Every booking was cancelled'],
    `The notice gives the cause directly: ${spec.cause}.`,
    formIndex + 1
  );

  const r1 = bankQuestion(
    'Which result shows that fewer cases needed senior attention?',
    `Escalations fell from ${spec.escalationsBefore} to ${spec.escalationsAfter}`,
    [
      `${spec.measure} remained unchanged`,
      `The team handled only ${spec.escalationsAfter} cases`,
      'The remote site supplied a full month of data'
    ],
    `The bulletin states that escalations declined from ${spec.escalationsBefore} to ${spec.escalationsAfter}.`,
    formIndex + 2
  );
  const r2 = bankQuestion(
    'Why does the bulletin avoid calling the result conclusive?',
    'One remote site supplied only five days of data',
    [
      'The improvement was smaller than expected',
      'No cases were measured during the review',
      'Senior managers rejected the figures'
    ],
    'The missing days reduce the completeness of the evidence.',
    formIndex + 3
  );

  const p1 = bankQuestion(
    'Where must a decision that changes a customer deadline be recorded?',
    `In the ${spec.document}`,
    [`Only in ${spec.channel}`, 'In a private notebook', 'It does not need to be recorded'],
    `Customer commitments must be recorded in the ${spec.document}.`,
    formIndex + 4
  );
  const p2 = bankQuestion(
    'What are contractors not permitted to do?',
    'Approve changes',
    ['View relevant records', 'Read routine progress updates', 'Work with employees'],
    'The policy permits relevant viewing but reserves approval authority.',
    formIndex + 5
  );

  return [
    c(`${spec.id}-C01`, noticePassage, [n1, n2]),
    c(`${spec.id}-C02`, reportPassage, [r1, r2]),
    c(`${spec.id}-C03`, policyPassage, [p1, p2])
  ];
}

function bankBuildD(spec) {
  return [
    d(
      `${spec.id}-D01`,
      `You recommended ${spec.supplier} for ${spec.project}, although another supplier offered a lower price. ` +
        `${spec.manager} asks you to explain the recommendation. Write a professional e-mail giving three reasons: ` +
        `continuity of customer service, compatibility with the existing ${spec.asset}, and the supplier's warranty and training support. ` +
        `Develop each reason with a practical consequence for ${spec.customer}.`,
      spec.manager,
      [
        `Explain how ${spec.supplier} will protect continuity of service for ${spec.customer}.`,
        `Explain why compatibility with the existing ${spec.asset} reduces implementation risk or cost.`,
        `Explain the value of the supplier's warranty and training support, then recommend the next action.`
      ]
    ),
    d(
      `${spec.id}-D02`,
      `${spec.customer[0].toUpperCase()}${spec.customer.slice(1)} expected the ${spec.document} by ${spec.deadline}, but ${spec.issue} delayed the final checks. ` +
        `Write an e-mail to the customer. Acknowledge the missed expectation, explain the cause without blaming others, offer ${spec.workaround} as an interim measure, ` +
        `and commit to a revised delivery time. Invite the customer to confirm whether the new timetable meets its needs.`,
      spec.customer,
      [
        'Acknowledge the delay and apologize for the missed expectation.',
        `Explain that ${spec.issue} affected the final checks without using defensive language.`,
        `Offer ${spec.workaround}, give a revised delivery commitment, and request confirmation.`
      ]
    )
  ];
}

function bankBuildE(spec) {
  const sentences = [
    `The revised ${spec.document} will be circulated by ${spec.deadline}.`,
    `${spec.leader} asked the ${spec.team} to verify every figure before the report is released.`,
    `Although ${spec.issue} delayed the schedule, the ${spec.event} will still begin on ${spec.day2}.`,
    `Employees who require ${spec.asset} should contact ${spec.colleague} in advance.`,
    `Neither proposal explains how the organization will manage ${spec.risk}.`,
    `By the end of the ${spec.training}, each participant had completed a practical action plan.`,
    `${spec.supplier} confirmed that ${spec.quantity2} replacement units would arrive before ${spec.time1}.`,
    `The latest survey suggests that ${spec.customer} values reliable support more than frequent discounts.`
  ];
  return sentences.map((sentence, index) =>
    e(`${spec.id}-E${String(index + 1).padStart(2, '0')}`, sentence)
  );
}

function bankBuildF(spec, formIndex) {
  return [
    bankResponseItem(
      `${spec.id}-F01`,
      `Could we move the ${spec.event} to ${spec.day2} morning?`,
      `${spec.day2} morning works for me.`,
      [`I attended it last year.`, `The ${spec.venue} is on the second floor.`],
      formIndex
    ),
    bankResponseItem(
      `${spec.id}-F02`,
      `I am afraid the ${spec.asset} will not arrive until after ${spec.deadline}.`,
      `Thank you for the warning. Please arrange a temporary alternative and update ${spec.customer}.`,
      [`I ordered the larger model.`, `${spec.deadline} was a busy day.`],
      formIndex + 1
    ),
    bankResponseItem(
      `${spec.id}-F03`,
      `How did ${spec.customer} respond to the revised proposal for ${spec.project}?`,
      `They accepted the approach but requested one timetable change.`,
      [`We sent it through ${spec.channel}.`, `The proposal contains twelve pages.`],
      formIndex + 2
    ),
    bankResponseItem(
      `${spec.id}-F04`,
      `Would you like me to reserve the ${spec.backupVenue} for the ${spec.training}?`,
      `Yes, please, provided it is available after ${spec.time2}.`,
      [`The trainer travelled by train.`, `I sat near the entrance.`],
      formIndex + 3
    ),
    bankResponseItem(
      `${spec.id}-F05`,
      `Why has the ${spec.asset} been moved out of the ${spec.venue}?`,
      `To complete a safety and compatibility inspection.`,
      [`The equipment was purchased last year.`, `The room has three windows.`],
      formIndex + 4
    ),
    bankResponseItem(
      `${spec.id}-F06`,
      `I may need another day to reconcile the figures in the ${spec.document}.`,
      `That is acceptable. Send the verified version by ${spec.deadline}.`,
      [`The figures are in the second column.`, `Yesterday was unusually quiet.`],
      formIndex + 5
    ),
    bankResponseItem(
      `${spec.id}-F07`,
      `Who is responsible for coordinating the ${spec.event}?`,
      `${spec.leader} from the ${spec.team} is coordinating it.`,
      [`It begins at ${spec.time1}.`, `The invitation has a blue heading.`],
      formIndex + 6
    ),
    bankResponseItem(
      `${spec.id}-F08`,
      `Do you know whether routine updates may be sent through ${spec.channel}?`,
      `Yes, but decisions affecting deadlines must go in the formal record.`,
      [`The channel was created last month.`, `The deadline is printed at the top.`],
      formIndex + 7
    )
  ];
}

function bankBuildG(spec) {
  const storyOneId = `${spec.id}-G-STORY-1`;
  const storyOne =
    `${spec.organization[0].toUpperCase()}${spec.organization.slice(1)} planned to hold the ${spec.event} in the ${spec.venue}. ` +
    `Two days before the event, ${spec.issue} made the room unavailable. ${spec.leader} booked the ${spec.backupVenue}, ` +
    `placed signs at ${spec.site}, and sent every participant an updated map. All but one participant arrived on time, ` +
    `and ${spec.customer} rated the event highly.`;

  const storyTwoId = `${spec.id}-G-STORY-2`;
  const storyTwo =
    `${spec.colleague} discovered that a shipment of ${spec.asset} had been sent to the ${spec.backupVenue} instead of ${spec.site}. ` +
    `${spec.colleague} contacted both locations, arranged a same-day transfer, and sent digital records to ${spec.customer} while the equipment was moving. ` +
    `The shipment reached the correct site only ${spec.delayMinutes} minutes late, and the routing record was corrected that afternoon.`;

  return [
    g(
      `${spec.id}-G01`,
      storyOneId,
      storyOne,
      true,
      `Where was the ${spec.event} originally going to be held?`,
      [`in the ${spec.venue}`, `at the ${spec.venue}`],
      [bankGroup(spec.venue)]
    ),
    g(
      `${spec.id}-G02`,
      storyOneId,
      storyOne,
      false,
      `Why did the venue for the ${spec.event} have to change?`,
      [`because ${spec.issue} made the room unavailable`, `because of ${spec.issue}`],
      [bankGroup(spec.issue), bankGroup('unavailable', 'room')]
    ),
    g(
      `${spec.id}-G03`,
      storyOneId,
      storyOne,
      false,
      `What was the result of ${spec.leader}'s arrangements?`,
      [
        `all but one participant arrived on time and ${spec.customer} rated the event highly`,
        'almost everyone arrived on time and the event was rated highly'
      ],
      [bankGroup('all but one', 'almost everyone', 'on time'), bankGroup('rated highly', 'positive feedback')]
    ),
    g(
      `${spec.id}-G04`,
      storyTwoId,
      storyTwo,
      true,
      `What problem did ${spec.colleague} discover?`,
      [
        `the ${spec.asset} had been sent to the wrong location`,
        `the shipment went to the ${spec.backupVenue} instead of ${spec.site}`
      ],
      [bankGroup(spec.asset, 'shipment'), bankGroup('wrong location', spec.backupVenue, spec.site)]
    ),
    g(
      `${spec.id}-G05`,
      storyTwoId,
      storyTwo,
      false,
      `What did ${spec.colleague} do while the shipment was being transferred?`,
      [
        `sent digital records to ${spec.customer}`,
        `provided ${spec.customer} with digital records`
      ],
      [bankGroup('digital records'), bankGroup(spec.customer)]
    ),
    g(
      `${spec.id}-G06`,
      storyTwoId,
      storyTwo,
      false,
      `How late did the ${spec.asset} shipment reach the correct site?`,
      [`${spec.delayMinutes} minutes late`, `${spec.delayMinutes} minutes`],
      [bankGroup(spec.delayMinutes), bankGroup('minutes')]
    )
  ];
}

function bankBuildH(spec) {
  const sentences = [
    `The ${spec.team} expects the final ${spec.document} to arrive before ${spec.time1}.`,
    `Most participants completed the ${spec.training} without requesting additional assistance.`,
    `We should compare the long-term benefits before selecting ${spec.supplier}.`,
    `Please leave enough time for questions at the end of the ${spec.event}.`,
    `The replacement approach, ${spec.newProcess}, is simpler, although it still requires careful documentation.`,
    `Our regional offices have adopted the same ${spec.policy}.`,
    `If ${spec.condition}, ${spec.project} will continue on ${spec.day2}.`,
    `No confidential information about ${spec.project} should be stored on a personal device.`,
    `The latest ${spec.measure} was more encouraging than the initial forecast suggested.`,
    `Several colleagues volunteered to mentor employees joining the ${spec.team}.`
  ];
  return sentences.map((sentence, index) =>
    h(`${spec.id}-H${String(index + 1).padStart(2, '0')}`, sentence)
  );
}

function bankBuildI(spec) {
  return [
    i(
      `${spec.id}-I01`,
      `${spec.colleague} has prepared a useful ${spec.document}, but it contains unexplained abbreviations that ${spec.customer} may not understand. ` +
        `Give ${spec.colleague} private feedback before the document is submitted.`,
      spec.colleague,
      [
        `Recognize the useful analysis or structure in ${spec.colleague}'s work.`,
        `Explain why unexplained abbreviations may confuse ${spec.customer}.`,
        'Suggest defining each term on first use or adding a short glossary before submission.'
      ]
    ),
    i(
      `${spec.id}-I02`,
      `${spec.customer[0].toUpperCase()}${spec.customer.slice(1)} is waiting for the ${spec.document}, but ${spec.issue} has delayed the final version. ` +
        `Call the customer with an update.`,
      spec.customer,
      [
        'Apologize and acknowledge the delayed delivery.',
        `Explain the effect of ${spec.issue} clearly without blaming another team.`,
        `Offer ${spec.workaround}, give a revised timetable, and ask whether it meets the customer's needs.`
      ]
    )
  ];
}

function bankBuildJ(spec) {
  const travelStory =
    `${spec.leader} was travelling to ${spec.city} for the ${spec.event} when a train stopped because of a signal failure. ` +
    `${spec.leader} immediately informed the organizer, joined the opening session by phone, and arrived during the first break. ` +
    `Because the ${spec.document} had been downloaded in advance, ${spec.leader} was ready to present at the scheduled time.`;

  const equipmentStory =
    `${spec.colleague} arrived early to lead the ${spec.training} and discovered that the ${spec.portableItem} had been left at home. ` +
    `A colleague lent a spare, so the session began on time. Afterwards, ${spec.colleague} bought an additional ${spec.portableItem} ` +
    `and stored it with the rest of the training equipment.`;

  const deliveryStory =
    `The ${spec.team} sent demonstration materials for ${spec.project} to ${spec.customer}, but the courier delivered them to the wrong location. ` +
    `${spec.leader} contacted both sites, arranged a same-day transfer, and e-mailed digital images in the meantime. ` +
    `${spec.customer[0].toUpperCase()}${spec.customer.slice(1)} approved the materials that afternoon, so the next stage began without delay.`;

  return [
    j(`${spec.id}-J01`, travelStory, [
      bankGroup(spec.leader, spec.city, spec.event),
      bankGroup('train', 'signal failure'),
      bankGroup('informed', 'organizer'),
      bankGroup('joined', 'phone', 'opening session'),
      bankGroup('first break', 'arrived'),
      bankGroup(spec.document, 'downloaded', 'advance'),
      bankGroup('ready', 'scheduled time')
    ]),
    j(`${spec.id}-J02`, equipmentStory, [
      bankGroup(spec.colleague, spec.training, 'early'),
      bankGroup(spec.portableItem, 'left', 'home'),
      bankGroup('colleague', 'lent', 'spare'),
      bankGroup('began', 'on time'),
      bankGroup('bought', 'additional', spec.portableItem),
      bankGroup('stored', 'training equipment')
    ]),
    j(`${spec.id}-J03`, deliveryStory, [
      bankGroup(spec.team, spec.project, 'materials'),
      bankGroup('courier', 'wrong location'),
      bankGroup(spec.leader, 'contacted', 'both sites'),
      bankGroup('same-day transfer'),
      bankGroup('emailed', 'digital images'),
      bankGroup(spec.customer, 'approved', 'afternoon'),
      bankGroup('next stage', 'without delay')
    ])
  ];
}

function bankBuildForm(spec, formIndex) {
  return [
    ...bankBuildA(spec, formIndex),
    ...bankBuildB(spec),
    ...bankBuildC(spec, formIndex),
    ...bankBuildD(spec),
    ...bankBuildE(spec),
    ...bankBuildF(spec, formIndex),
    ...bankBuildG(spec),
    ...bankBuildH(spec),
    ...bankBuildI(spec),
    ...bankBuildJ(spec)
  ];
}

for (const [formIndex, spec] of BANK_SPECS.entries()) {
  TEST_FORMS[spec.id] = {
    id: spec.id,
    name: `Full Simulation · Form ${spec.id}`,
    description: `${spec.title}: original Level 2 workplace scenarios.`,
    items: bankBuildForm(spec, formIndex)
  };
}

export const QUESTION_BANK_INFO = Object.freeze({
  version: '2026.09.03',
  basis: 'Pearson public Professional English Test guide and public product description',
  contentPolicy: 'Original practice questions only; no official, paid, leaked, or recalled test items',
  addedForms: BANK_SPECS.length,
  totalForms: Object.keys(TEST_FORMS).length,
  scoredUnitsPerForm: 58,
  totalScoredUnits: Object.values(TEST_FORMS).reduce(
    (total, form) => total + countTotalUnits(form.items),
    0
  )
});
