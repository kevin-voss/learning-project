import type { PlaygroundTask } from '@/types/playground'

export const arraysPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-cart-total',
    topicId: 'arrays',
    title: 'Cart total',
    description: 'Practice turning raw numbers into a variable the tests can read.',
    problemDetail: 'Items cost 12, 7.5, and 3.25 units. Store the sum in `cartTotal`.',
    mode: 'bindings',
    bindings: ['cartTotal'],
    expected: [{ name: 'cartTotal', value: 22.75, type: 'number', tolerance: 0.0001 }],
    starterCode: '',
    hints: [
      'Use floating-point addition; the checker allows tiny rounding tolerance.',
      'You only need one assignment into `cartTotal`.',
      'Solution (reference): `cartTotal = 12 + 7.5 + 3.25;\`.',
    ],
  },
  {
    id: 'pg-first-flight',
    topicId: 'arrays',
    title: 'Peek first arrival',
    description: 'Index into an array—the first element sits at `[0]`.',
    problemDetail: '`flights = ["OSL", "ARN", "CPH"]`. Log exactly `OSL` on one line.',
    mode: 'console',
    expected: {
      lines: ['OSL'],
      normalizeWhitespace: false,
    },
    starterCode: `const flights = ['OSL', 'ARN', 'CPH'];

`,
    hints: [
      'Indexes start at zero.',
      `Log exactly the airport code—the tests compare the console line, not a quoted string.`,
      'Solution (reference): `console.log(flights[0]);\`.',
    ],
  },
]
