import type { PlaygroundTask } from '@/types/playground'

export const conditionalsPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-print-sale-price',
    topicId: 'conditionals',
    title: 'Print the sale price',
    description:
      'Operators combine with `console.log` to show a labeled price string—exactly what the checker expects.',
    problemDetail:
      'Price is 20, discount is 25%. Log the line `Sale price: 15` (no extra spaces, one line).',
    mode: 'console',
    expected: {
      lines: ['Sale price: 15'],
      normalizeWhitespace: false,
    },
    starterCode: `const price = 20;
const discount = 0.25;

`,
    hints: [
      'Compute `finalAmount` before logging.',
      'Match the prefix `Sale price: ` and the number with no trailing decimals if it ends up as an integer.',
      'Solution (reference): `const finalAmount = price * (1 - discount); console.log(\'Sale price: \' + finalAmount);\`.',
    ],
  },
  {
    id: 'pg-shipping-tier',
    topicId: 'conditionals',
    title: 'Pick a shipping tier',
    description: 'Use simple comparisons to choose a string label.',
    problemDetail: 'Weight is 4.5kg. If weight > 5 log `freight`, else log `parcel`.',
    mode: 'console',
    expected: {
      lines: ['parcel'],
      normalizeWhitespace: false,
    },
    starterCode: `const weightKg = 4.5;

`,
    hints: [
      'The threshold check uses `>`, not `>=`.',
      'Only one branch should log for the given weight.',
      'Solution (reference): `if (weightKg > 5) { console.log(\'freight\'); } else { console.log(\'parcel\'); }\`.',
    ],
  },
]
