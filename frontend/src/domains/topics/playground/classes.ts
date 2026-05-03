import type { PlaygroundTask } from '@/types/playground'

/** Playground teaches OOP semantics; runners still execute plain functions safely. */
export const classesPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-rect-area',
    topicId: 'classes',
    title: 'Rectangle area',
    description: 'Pure function version of what a class method often wraps.',
    problemDetail:
      '`rectArea(width, height)` multiplies sides. Guard invalid inputs by returning `0` if either dimension is negative.',
    mode: 'function',
    functionName: 'rectArea',
    tests: [
      { args: [3, 4], expected: 12 },
      { args: [2, -1], expected: 0 },
    ],
    starterCode: `function rectArea(width, height) {
  return 0;
}`,
    hints: [
      'Check each parameter before multiplying.',
      'Return numeric `0`, not string `"0"`.',
      'Solution (reference): `if (width < 0 || height < 0) return 0; return width * height;\`.',
    ],
  },
  {
    id: 'pg-account-label-fn',
    topicId: 'classes',
    title: 'Account label string',
    description: 'Combine structured fields exactly like `toString` helpers on instances.',
    problemDetail:
      '`describe(account)` accepts `{ tier, credits }`. Return `[tier]-creds:credits` verbatim.',
    mode: 'function',
    functionName: 'describe',
    tests: [{ args: [{ tier: 'gold', credits: 5 }], expected: '[gold]-creds:5' }],
    starterCode: `function describe(account) {
  return '';
}`,
    hints: [
      'Build the brackets with template literals or concatenation.',
      'Embed `account.tier` and `account.credits` without extra spaces.',
      'Solution (reference): ``return `[${account.tier}]-creds:${account.credits}`;``',
    ],
  },
]
