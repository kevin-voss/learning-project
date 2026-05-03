import type { PlaygroundTask } from '@/types/playground'

export const functionsPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-multiply-fn',
    topicId: 'functions',
    title: 'Multiply',
    description: 'Define a pure helper that returns the product of two numbers.',
    problemDetail: 'Implement `mul(a, b)` returning `a * b`.',
    mode: 'function',
    functionName: 'mul',
    tests: [
      { args: [2, 3], expected: 6 },
      { args: [0, 9], expected: 0 },
      { args: [-2, 5], expected: -10 },
    ],
    starterCode: `function mul(a, b) {
  return 0;
}`,
    hints: [
      'Return the product—no logging required.',
      'Cover negative numbers; tests include a negative case.',
      'Solution (reference): `return a * b;\`.',
    ],
    timeoutMs: 1500,
  },
  {
    id: 'pg-label-fn',
    topicId: 'functions',
    title: 'Label builder',
    description: 'Concatenate parameters into a label string returned to callers.',
    problemDetail: '`label(sku, qty)` should return `sku: xqty` with a lowercase `x` before the quantity.',
    mode: 'function',
    functionName: 'label',
    tests: [
      { args: ['ABC', 2], expected: 'ABC: x2' },
      { args: ['Z', 10], expected: 'Z: x10' },
    ],
    starterCode: `function label(sku, qty) {
  return '';
}`,
    hints: [
      'Build the string with `+` or a template literal.',
      'The middle separator is `": x"` between sku and the number.',
      'Solution (reference): ``return `${sku}: x${qty}`;``',
    ],
  },
]
