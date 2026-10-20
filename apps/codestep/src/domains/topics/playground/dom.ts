import type { PlaygroundTask } from '@/types/playground'

export const domPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-title-text',
    topicId: 'dom',
    title: 'Read text content',
    description: 'Simulate `node.textContent` with a plain object.',
    problemDetail: 'Log the `textContent` of `node` when it is `{ textContent: "Ready" }`.',
    mode: 'console',
    expected: {
      lines: ['Ready'],
      normalizeWhitespace: false,
    },
    starterCode: `const node = { textContent: 'Ready' };

`,
    hints: [
      'Access the property you would read from a real DOM node.',
      'Log exactly the inner string, not the whole object.',
      'Solution (reference): `console.log(node.textContent);\`.',
    ],
  },
  {
    id: 'pg-class-toggle-string',
    topicId: 'dom',
    title: 'Class token',
    description: 'Return the class string you would apply for an open panel.',
    problemDetail: 'If `open` is true log `is-open`, otherwise log `is-closed`.',
    mode: 'console',
    expected: {
      lines: ['is-open'],
      normalizeWhitespace: false,
    },
    starterCode: `const open = true;

`,
    hints: [
      'This mirrors toggling a class token without touching `classList` APIs yet.',
      'For the default input, the open branch runs.',
      'Solution (reference): `if (open) { console.log(\'is-open\'); } else { console.log(\'is-closed\'); }\`.',
    ],
  },
]
