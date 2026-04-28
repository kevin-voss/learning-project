import type { RawExample } from '@/data/normalizeCurriculum'

const customers = [
  { name: 'Ana', savings: 15 },
  { name: 'Ben', savings: 22 },
]

/** Loyalty invoicing totals: highlights init / condition / body / increment / exit on segmented `for` header */
export const customerLoyaltyExample: RawExample = {
  name: 'Customer loyalty savings',
  code: [
    `const customers = [{ name: \"Ana\", savings: 15 }, { name: \"Ben\", savings: 22 }];`,
    ``,
    `let totalSavings = 0;`,
    ``,
    `for (let i = 0; i < customers.length; i++) {`,
    `  totalSavings += customers[i].savings;`,
    `}`,
    ``,
    `console.log(\"Total loyalty savings:\", totalSavings);`,
  ],
  steps: [
    {
      l: 0,
      vars: { customers },
      out: [],
      expl: 'Each object is one customer row with a savings amount (in dollars).',
      changed: ['customers'],
    },
    {
      l: 2,
      vars: { customers, totalSavings: 0 },
      out: [],
      expl:
        '`totalSavings` is the accumulator you will invoice—start at zero before looping.',
      changed: ['totalSavings'],
    },
    {
      l: 4,
      vars: { customers, totalSavings: 0, i: 0 },
      out: [],
      expl:
        'Initialize loop counter — i starts at index 0 before the condition is evaluated.',
      changed: ['i'],
    },
    {
      l: 4,
      vars: { customers, totalSavings: 0, i: 0 },
      out: [],
      expl:
        'Check condition: is i less than customers.length? Yes — execute the loop body.',
    },
    {
      l: 5,
      vars: { customers, totalSavings: 15, i: 0 },
      out: [],
      expl: 'Loop body — add Ana’s savings onto the running total.',
      changed: ['totalSavings'],
    },
    {
      l: 4,
      vars: { customers, totalSavings: 15, i: 1 },
      out: [],
      expl: 'i++ → i advances so the next iteration looks at Ben’s row.',
      changed: ['i'],
    },
    {
      l: 4,
      vars: { customers, totalSavings: 15, i: 1 },
      out: [],
      expl:
        'Check condition: is i less than customers.length? Yes — enter the loop again.',
    },
    {
      l: 5,
      vars: { customers, totalSavings: 37, i: 1 },
      out: [],
      expl: 'Loop body — add Ben’s savings. Running total reaches 37.',
      changed: ['totalSavings'],
    },
    {
      l: 4,
      vars: { customers, totalSavings: 37, i: 2 },
      out: [],
      expl:
        'i++ → After the loop body, bump i toward the sentinel that ends the iteration.',
      changed: ['i'],
    },
    {
      l: 4,
      vars: { customers, totalSavings: 37, i: 2 },
      out: [],
      expl:
        'Check condition: is i (2) < customers.length (2)? No — exit the loop before another body run.',
    },
    {
      l: 8,
      vars: { customers, totalSavings: 37, i: 2 },
      out: ['Total loyalty savings: 37'],
      expl: 'After exit, log the invoice-style total—Ana + Ben = 37.',
      console: true,
    },
  ],
}
