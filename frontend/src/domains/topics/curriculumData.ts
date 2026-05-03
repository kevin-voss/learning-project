import legacyPack from './examples/_topics_raw.json' with { type: 'json' }
import type { RawTopic } from './rawTopicTypes'

import {
  variablesTopic,
  operatorsTopic,
  functionsTopic,
  objectsTopic,
  domTopic,
  eventsTopic,
  modernJsTopic,
  asyncTopic,
  errorsTopic,
  modulesTopic,
  classesTopic,
} from './syntheticTopics'
import { customerLoyaltyExample } from './content/customerLoyaltyExample'

const legacy = legacyPack as RawTopic[]

function takeLegacy(id: string): RawTopic {
  const t = legacy.find((x) => x.id === id)
  if (!t) throw new Error(`Legacy curriculum topic "${id}" is missing`)
  return t
}

const LEG_FOR = takeLegacy('for-loop')
const LEG_WHILE = takeLegacy('while-loop')
const LEG_IF = takeLegacy('if-else')

/** Full topic order matches `overview.md`: variables → operators → … → modules → classes */
export const CODSTEP_RAW_TOPICS: RawTopic[] = [
  variablesTopic,
  operatorsTopic,
  {
    ...LEG_IF,
    id: 'conditionals',
    name: 'Conditionals',
    desc: 'Run one chunk of code only when a yes-or-no test passes—and choose between alternate chunks when it does not.',
    intro: {
      buildsOn: [
        {
          topicId: 'variables',
          note: 'Tests read the values you already stored under names.',
        },
        {
          topicId: 'operators',
          note: 'Comparisons and logical words build the yes-or-no questions `if` needs.',
        },
      ],
      whatItIs:
        'Sometimes you only want code to run when something is true—high enough score, form filled, switch flipped. An `if` block runs only when the test in parentheses works out true. Optional `else if` lines try the next test when earlier ones failed. A final `else` catches “everything else.” You can also pick between two short expressions with the ternary form `test ? valueIfTrue : valueIfFalse` once that feels comfortable.',
      whyItMatters:
        'Shipping rules, safety checks, and simple feature toggles all boil down to “under these conditions, do this; otherwise do that.”',
      realWorldExamples: [
        'Waive expedited freight when a delivery risk flag is on',
        'Apply the tax rules that match the customer’s region',
        'Block checkout when a fraud score is too high',
      ],
      syntaxPattern: `if (score >= 90) {
  tier = 'gold';
} else if (score >= 70) {
  tier = 'silver';
} else {
  tier = 'bronze';
}`,
      syntaxParts: [
        '`if ( ... ) { ... }` — the block runs only when the test is true.',
        '`else if` — try another test when the ones above did not run.',
        '`else` — optional final branch when no test matched.',
      ],
      technicalExample: `const label = qty > cap ? 'bulk' : 'std';`,
      everydayExample:
        'Apartment elevator: rooftop floor only if you have a badge and it is business hours; otherwise the panel sends you to the lobby.',
    },
  },
  functionsTopic,
  {
    ...takeLegacy('arrays'),
    desc: 'Keep an ordered list of values under one name—first slot numbered zero—and walk it with indexes or simple helpers.',
    intro: {
      buildsOn: [
        { topicId: 'variables', note: 'The whole list is one named value; each slot is read with a numeric index.' },
        { topicId: 'operators', note: 'You often combine or compare slot values with familiar math or tests.' },
        { topicId: 'functions', note: 'Later helpers like `map` pass each slot into a small function you write.' },
      ],
      whatItIs:
        'An array is an ordered row of slots kept under a single name. Slots are numbered starting at zero. You read or replace a slot with square brackets (`scores[0]`, `scores[1]`). The name `length` tells you how many slots are in use. When you need to reshape every entry, methods such as `map` (covered in the examples) ask a function what to do with each slot—after you are comfortable writing functions.',
      whyItMatters:
        'Shopping lines, sensor readings, and search results all arrive as lists you walk, filter, or total before showing them on screen.',
      realWorldExamples: ['Shopping cart lines', 'Sensor samples on a timeline', 'Search result titles'],
      syntaxPattern: `let scores = [10, 20, 30];
scores[1] = scores[0] + 8;`,
      syntaxParts: [
        '`[ ... ]` — builds the list literal in left-to-right order.',
        '`scores[1]` — reaches the second slot because counting starts at zero.',
        '`scores.length` — how many slots exist (shown in later examples when length matters).',
      ],
      technicalExample: `function bumpEach(levels, delta) {\n  return levels.map(function (n) {\n    return n + delta;\n  });\n}`,
      everydayExample:
        'Baggage carousel: bags come out in order; you scan until yours appears—it is the same idea as stepping through numbered slots.',
    },
  },
  objectsTopic,
  {
    id: 'loops',
    name: 'Loops',
    icon: LEG_FOR.icon,
    desc: 'Repeat a block of code while a test stays true—or march a counter across a numbered range.',
    intro: {
      buildsOn: [
        { topicId: 'variables', note: 'Loop counters are ordinary variables you update each pass.' },
        { topicId: 'operators', note: 'The loop test is built from comparisons you already practiced.' },
        { topicId: 'conditionals', note: 'You sometimes skip an entire pass with an inner `if` (introduced in the examples).' },
        { topicId: 'arrays', note: 'Many loops walk list indexes or values you stored in arrays.' },
        { topicId: 'objects', note: 'When list entries are grouped records, you read fields inside the loop body.' },
      ],
      whatItIs:
        'A loop runs the same block more than once. A `while` loop keeps going while a test stays true. A `for` loop bundles “set up a counter, check it, bump it” into one line so walking a numbered range reads neatly. Optional `break` stops early; `continue` skips to the next pass. Later snippets show `for...of` when you want each value from a list without manual indexes.',
      whyItMatters:
        'Totals, batch checks, queues, and animations all mean “do this again until a condition flips.”',
      realWorldExamples: [
        'Add up loyalty points for every subscriber',
        'Work through a waiting line of jobs',
        'Visit each row in a local table of numbers',
      ],
      syntaxPattern: `for (let i = 0; i < items.length; i++) {
  sum = sum + items[i].amount;
}`,
      syntaxParts: [
        '`for (start; test; step)` — run `start` once, then repeat: if `test` is true run the body, then run `step`, and check `test` again.',
        '`while (test)` — repeat the body as long as `test` stays true.',
      ],
      technicalExample: `let n = 0;\nwhile (n < 3) {\n  n = n + 1;\n}`,
      everydayExample:
        'Assembly check: inspect each bolt in the bin until the bin is empty or you hit a defect cap.',
    },
    examples: [...LEG_FOR.examples, ...LEG_WHILE.examples, customerLoyaltyExample],
  },
  domTopic,
  eventsTopic,
  modernJsTopic,
  asyncTopic,
  errorsTopic,
  modulesTopic,
  classesTopic,
]
