import type { PlaygroundTask } from '@/types/playground'

export const modernJsPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-template-receipt',
    topicId: 'modern-js',
    title: 'Template receipt',
    description: 'Use a template literal to embed values in a sentence.',
    problemDetail: 'Log `You owe: $48.00` exactly (note the two decimal places).',
    mode: 'console',
    expected: {
      lines: ['You owe: $48.00'],
      normalizeWhitespace: false,
    },
    starterCode: `const dollars = 48;

`,
    hints: [
      '`toFixed(2)` formats currency-style strings.',
      'Template literals use backticks and `${}` for interpolation.',
      'Solution (reference): `console.log(\\`You owe: $${dollars.toFixed(2)}\\`);\`.',
    ],
  },
  {
    id: 'pg-destructure-bindings',
    topicId: 'modern-js',
    title: 'Unpack fields',
    description: 'Destructure from a record into bindings the runner checks.',
    problemDetail: 'Given `record = { city: "Oslo", zone: "NO1" }`, assign `city` and `zone` variables.',
    mode: 'bindings',
    bindings: ['city', 'zone'],
    expected: [
      { name: 'city', value: 'Oslo', type: 'string' },
      { name: 'zone', value: 'NO1', type: 'string' },
    ],
    starterCode: `const record = { city: 'Oslo', zone: 'NO1' };

`,
    hints: [
      'Wrap the destructuring pattern in parentheses when it starts the statement.',
      'Both names must match what the checker expects.',
      'Solution (reference): `({ city, zone } = record);\`.',
    ],
  },
]
