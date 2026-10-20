import type { PlaygroundTask } from '@/types/playground'

export const asyncPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-status-bindings',
    topicId: 'async',
    title: 'Lifecycle status',
    description:
      'Model a two-step flow synchronously—real async code would `await` similar checkpoints.',
    problemDetail: 'Set `status` to `loading`, then reassign to `ready`.',
    mode: 'bindings',
    bindings: ['status'],
    expected: [{ name: 'status', value: 'ready', type: 'string' }],
    starterCode: '',
    hints: [
      'Bindings declarations are hoisted for you—assign in order.',
      'The final assignment is what the checker reads.',
      'Solution (reference): `status = \'loading\';\` then `status = \'ready\';\`.',
    ],
  },
  {
    id: 'pg-pipeline-console',
    topicId: 'async',
    title: 'Sequential logs',
    description: 'Chains of async work often mirror ordered console checkpoints.',
    problemDetail: 'Log `fetch`, then `parse`, then `render`—three lines.',
    mode: 'console',
    expected: {
      lines: ['fetch', 'parse', 'render'],
      normalizeWhitespace: false,
    },
    starterCode: '',
    hints: [
      'One `console.log` per step; order must match exactly.',
      'No extra chatter before or after.',
      'Solution (reference): three lines `console.log(\'fetch\');`, `console.log(\'parse\');`, `console.log(\'render\');`.',
    ],
  },
]
