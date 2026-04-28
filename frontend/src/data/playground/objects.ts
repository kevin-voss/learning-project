import type { PlaygroundTask } from '@/types/playground'

export const objectsPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-product-bindings',
    topicId: 'objects',
    title: 'Product fields',
    description: 'Assign plain values to the two identifiers the checker exposes.',
    problemDetail: 'Set `title` to `Mug` and `price` to the number `12.5`.',
    mode: 'bindings',
    bindings: ['title', 'price'],
    expected: [
      { name: 'title', value: 'Mug', type: 'string' },
      { name: 'price', value: 12.5, type: 'number', tolerance: 0.0001 },
    ],
    starterCode: '',
    hints: [
      'Bindings mode expects plain assignments into the listed names.',
      'Price must be numeric, not a string.',
      'Solution (reference): `title = \'Mug\';\` · `price = 12.5;\`.',
    ],
  },
  {
    id: 'pg-invoice-total-fn',
    topicId: 'objects',
    title: 'Invoice total',
    description: 'Read properties from a plain object passed as an argument.',
    problemDetail: '`invoice` has `{ subtotal, tax }`. Return their sum.',
    mode: 'function',
    functionName: 'invoiceTotal',
    tests: [
      { args: [{ subtotal: 100, tax: 8 }], expected: 108 },
      { args: [{ subtotal: 0, tax: 0 }], expected: 0 },
    ],
    starterCode: `function invoiceTotal(invoice) {
  return 0;
}`,
    hints: [
      'Use dot access: `invoice.subtotal` and `invoice.tax`.',
      'Return a number, not a string.',
      'Solution (reference): `return invoice.subtotal + invoice.tax;\`.',
    ],
  },
]
