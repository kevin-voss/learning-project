import type { PlaygroundTask } from '@/types/playground'

export const variablesPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-wallet-bindings',
    topicId: 'variables',
    title: 'Wallet snapshot',
    description: 'Bindings mode pre-declares names—assign only, no `let`/`const`.',
    problemDetail: 'Set `currency` to `USD`, `balance` to `42.5`, and `active` to `true`.',
    mode: 'bindings',
    bindings: ['currency', 'balance', 'active'],
    expected: [
      { name: 'currency', value: 'USD', type: 'string' },
      { name: 'balance', value: 42.5, type: 'number', tolerance: 0.0001 },
      { name: 'active', value: true, type: 'boolean' },
    ],
    starterCode: '',
    hints: [
      'Use straight assignments to the pre-declared identifiers.',
      'The boolean must be the literal `true`, not a string.',
      'Solution (reference): `currency = \'USD\';\` · `balance = 42.5;\` · `active = true;\`.',
    ],
    timeoutMs: 1500,
  },
  {
    id: 'pg-line-item-console',
    topicId: 'variables',
    title: 'Log a line item',
    description: 'Compute with operators, then print the exact line the checker expects.',
    problemDetail: 'Unit price 9, quantity 3. Log `Line: 27` (one line, no extra spaces).',
    mode: 'console',
    expected: {
      lines: ['Line: 27'],
      normalizeWhitespace: false,
    },
    starterCode: `const unit = 9;
const qty = 3;

`,
    hints: [
      'Multiply before logging.',
      'Match the label `Line: ` including spacing before the number.',
      'Solution (reference): `const total = unit * qty;\` then `console.log(\'Line: \' + total);\`.',
    ],
  },
]
