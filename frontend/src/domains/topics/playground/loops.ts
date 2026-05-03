import type { PlaygroundTask } from '@/types/playground'

export const loopsPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-sum-loyalty',
    topicId: 'loops',
    title: 'Sum loyalty savings',
    description:
      'Each object has a `saved` number. Implement `sumSavings` so it returns the total saved across the array.',
    problemDetail: 'Input is an array like `[{ saved: 10 }, { saved: 5 }]`. Return the numeric sum.',
    mode: 'function',
    functionName: 'sumSavings',
    tests: [
      { name: 'empty list', args: [[]], expected: 0 },
      { name: 'single item', args: [[{ saved: 12 }]], expected: 12 },
      {
        name: 'several items',
        args: [[{ saved: 10 }, { saved: 5.5 }, { saved: 2 }]],
        expected: 17.5,
      },
    ],
    starterCode: `function sumSavings(items) {
  return 0;
}`,
    hints: [
      'Loop with a `for` or `for...of`, keep an accumulator.',
      'Guard the empty array: the total should be 0.',
      'Solution (reference): `let t = 0; for (const it of items) t += it.saved; return t;\`.',
    ],
    timeoutMs: 2000,
  },
  {
    id: 'pg-countdown-log',
    topicId: 'loops',
    title: 'Countdown log',
    description: 'Loop with `while` or `for` and print each tick on its own line.',
    problemDetail: 'Log `3`, `2`, `1` in that order (three lines).',
    mode: 'console',
    expected: {
      lines: ['3', '2', '1'],
      normalizeWhitespace: false,
    },
    starterCode: `let n = 3;
while (n > 0) {
  n--;
}`,
    hints: [
      'Decrement `n` after each log so the loop reaches the exit condition.',
      'Each `console.log` call should match the expected string exactly.',
      'Solution (reference): `console.log(String(n)); n -= 1;\` inside the loop body.',
    ],
  },
]
