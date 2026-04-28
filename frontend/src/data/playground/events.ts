import type { PlaygroundTask } from '@/types/playground'

export const eventsPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-event-order',
    topicId: 'events',
    title: 'Log event order',
    description: 'Emit log lines in the order a handler would run them.',
    problemDetail: 'Log `start` then `done` on two lines.',
    mode: 'console',
    expected: {
      lines: ['start', 'done'],
      normalizeWhitespace: false,
    },
    starterCode: `function run() {
}

run();`,
    hints: [
      'Call the wrapper once; order of logs must match exactly.',
      'No extra logging between the two lines.',
      'Solution (reference): inside `run`, `console.log(\'start\');` then `console.log(\'done\');`.',
    ],
  },
  {
    id: 'pg-click-count',
    topicId: 'events',
    title: 'Click counter',
    description: 'Increment a counter each time a stub handler runs.',
    problemDetail: 'After two synthetic invocations, log `clicks 2` on one line.',
    mode: 'console',
    expected: {
      lines: ['clicks 2'],
      normalizeWhitespace: false,
    },
    starterCode: `let clicks = 0;
function onClick() {
  clicks = clicks + 1;
}

`,
    hints: [
      'Invoke the handler twice before logging.',
      'Build the string with `clicks ` plus the final number.',
      'Solution (reference): `onClick(); onClick(); console.log(\'clicks \' + clicks);\`.',
    ],
  },
]
