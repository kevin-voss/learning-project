import type { PlaygroundTask } from '@/types/playground'

export const operatorsPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-tax-console',
    topicId: 'operators',
    title: 'Add tax',
    description: 'Apply a percentage to a subtotal and log the rounded whole number.',
    problemDetail: 'Subtotal 200, tax rate 8%. Log exactly `With tax: 216`',
    mode: 'console',
    expected: {
      lines: ['With tax: 216'],
      normalizeWhitespace: false,
    },
    starterCode: `const subtotal = 200;
const rate = 0.08;

`,
    hints: [
      'Convert the rate to a multiplier: 1 + 0.08.',
      'The math should land on 216 without rounding noise if you use exact decimals.',
      'Solution (reference): `const withTax = subtotal * (1 + rate); console.log(\'With tax: \' + withTax);\`.',
    ],
  },
  {
    id: 'pg-threshold-bindings',
    topicId: 'operators',
    title: 'Free shipping flag',
    description: 'Comparison + logical operators produce booleans you store in variables.',
    problemDetail: 'Cart total is 65, free shipping starts at 60. Set `freeShip` to the correct boolean.',
    mode: 'bindings',
    bindings: ['freeShip'],
    expected: [{ name: 'freeShip', value: true, type: 'boolean' }],
    starterCode: `const cart = 65;
const minimum = 60;

`,
    hints: [
      'Use `>=` to compare numbers.',
      'You only need to assign `freeShip`—the constants are already declared for you.',
      'Solution (reference): `freeShip = cart >= minimum;\`.',
    ],
  },
]
