import type { PlaygroundTask } from '@/types/playground'

export const modulesPlaygroundTasks: PlaygroundTask[] = [
  {
    id: 'pg-namespace-console',
    topicId: 'modules',
    title: 'Module facade',
    description: 'Replicate how a facade object mirrors named exports.',
    problemDetail:
      '`api` exposes `prefix` `"v1"` and `path` `"billing"`. Log `v1/billing` on one line.',
    mode: 'console',
    expected: {
      lines: ['v1/billing'],
      normalizeWhitespace: false,
    },
    starterCode: `const api = {
  prefix: 'v1',
  path: 'billing',
};

`,
    hints: [
      'Use string concatenation or a template literal.',
      'No leading slash unless you include it in the pieces.',
      'Solution (reference): `console.log(api.prefix + \'/\' + api.path);\`.',
    ],
  },
  {
    id: 'pg-import-style-bindings',
    topicId: 'modules',
    title: 'Default vs named idea',
    description: 'Treat two bindings like you imported them from a module barrel.',
    problemDetail:
      '`defaultExport` should be `"app"` and `namedExport` should be `"plugin"` synchronously.',
    mode: 'bindings',
    bindings: ['defaultExport', 'namedExport'],
    expected: [
      { name: 'defaultExport', value: 'app', type: 'string' },
      { name: 'namedExport', value: 'plugin', type: 'string' },
    ],
    starterCode: '',
    hints: [
      'Assignments only—identifiers are injected like other binding tasks.',
      'Mind spellings exactly as specified.',
      'Solution (reference): `defaultExport = \'app\';\` · `namedExport = \'plugin\';\`.',
    ],
  },
]
