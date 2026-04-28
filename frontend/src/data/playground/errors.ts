import type { PlaygroundTask } from '@/types/playground'

export const errorsPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-safe-divide',
    topicId: 'errors',
    title: 'Guarded division',
    description: 'Return null when division is impossible; otherwise return the quotient.',
    problemDetail: 'Implement `divide(a, b)`. If `b === 0`, return `null`, else `a / b`.',
    mode: 'function',
    functionName: 'divide',
    tests: [
      { args: [10, 2], expected: 5 },
      { args: [9, 0], expected: null },
      { args: [0, 3], expected: 0 },
    ],
    starterCode: `function divide(a, b) {
  return null;
}`,
    hints: [
      'Compare `b === 0` before dividing.',
      'Return `null` with no quotes—it is the value `null`.',
      'Solution (reference): `if (b === 0) return null; return a / b;\`.',
    ],
  },
  {
    id: 'pg-parse-fallback',
    topicId: 'errors',
    title: 'Parse fallback',
    description: 'When parsing yields `NaN`, fall back to a default number.',
    problemDetail:
      '`parseScore` turns a string input into a number via `Number()`. Return `-1` if the number is `NaN`, otherwise return the numeric value.',
    mode: 'function',
    functionName: 'parseScore',
    tests: [
      { args: ['120'], expected: 120 },
      { args: ['nope'], expected: -1 },
    ],
    starterCode: `function parseScore(text) {
  const value = Number(text);
  return value;
}`,
    hints: [
      'Use `Number.isNaN` on the numeric result.',
      'Only return `-1` on invalid parses.',
      'Solution (reference): `const value = Number(text); return Number.isNaN(value) ? -1 : value;\`.',
    ],
  },
]
