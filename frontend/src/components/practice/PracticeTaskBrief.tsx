import type {
  BindingExpectation,
  FunctionTestCase,
  PlaygroundTask,
} from '@/types/playground'
import learnStyles from '@/components/learn/LearnPanel.module.css'

import styles from '@/components/practice/PracticeTaskBrief.module.css'

function formatDisplayedValue(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (typeof value === 'bigint') return `${value}n`
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function bindingNote(exp: BindingExpectation): string {
  if (exp.type === 'number' && exp.tolerance !== undefined && exp.tolerance > 0) {
    return `(number — tiny rounding tolerance ${exp.tolerance})`
  }
  if (exp.type) return `(${exp.type})`
  return ''
}

function CaseTableHeaders() {
  return (
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Must evaluate to</th>
    </tr>
  )
}

function FunctionTestTableRows({
  tests,
  functionName,
}: {
  tests: FunctionTestCase[]
  functionName: string
}) {
  return (
    <>
      {tests.map((t, i) => (
        <tr key={`fn-${i}-${t.name ?? ''}`}>
          <td>{t.name ?? `Test ${i + 1}`}</td>
          <td className={styles.mono}>
            <code>{functionName}</code>({t.args.map(formatDisplayedValue).join(', ')})
          </td>
          <td className={styles.mono}>{formatDisplayedValue(t.expected)}</td>
        </tr>
      ))}
    </>
  )
}

function BriefBindings({
  bindings,
  expected,
}: {
  bindings: string[]
  expected: BindingExpectation[]
}) {
  return (
    <>
      <ul className={learnStyles.introSyntaxList}>
        <li>
          <strong className={styles.em}>Names declared for you</strong>
          {' — '}
          The runner inserts{' '}
          <code className={styles.inlineCode}>{bindings.map((b) => `var ${b}`).join('; ')}</code>{' '}
          before your code. Use plain assignments (<code className={styles.inlineCode}>name = …</code>
          ){', '}
          not a second{' '}
          <code className={styles.inlineCode}>let</code>/<code className={styles.inlineCode}>const</code>
          /
          <code className={styles.inlineCode}>var</code>
          {' for those identifiers.'}
        </li>
        <li>
          <strong className={styles.em}>What you may use</strong>
          {' — '}
          Normal JavaScript in strict mode (same as the guided editor), plus{' '}
          <code className={styles.inlineCode}>console.log</code>
          {' for debugging (optional; not graded).'}
        </li>
        <li>
          <strong className={styles.em}>How you pass</strong>
          {' — '}
          After your code finishes, each name below must hold the matching value when read by the
          checker.
        </li>
      </ul>
      <p className={styles.snippetLabel}>Expected values</p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <CaseTableHeaders />
          </thead>
          <tbody>
            {expected.map((exp) => {
              const note = bindingNote(exp)
              return (
                <tr key={exp.name}>
                  <td>
                    <code className={styles.mono}>{exp.name}</code>
                  </td>
                  <td>
                    <code className={styles.mono}>{formatDisplayedValue(exp.value)}</code>
                    {note ? <span className={styles.muted}> {note}</span> : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

function BriefConsole({
  lines,
  normalizeWhitespace,
}: {
  lines: string[]
  normalizeWhitespace: boolean
}) {
  return (
    <>
      <ul className={learnStyles.introSyntaxList}>
        <li>
          <strong className={styles.em}>What runs</strong>
          {' — '}
          Your editor code is executed with <code className={styles.inlineCode}>console.log</code>{' '}
          (and other <code className={styles.inlineCode}>console</code> methods) captured in order.
        </li>
        <li>
          <strong className={styles.em}>How you pass</strong>
          {' — '}
          Every captured line must match the expected list below, in the same order (first log = first
          line).
          {normalizeWhitespace
            ? ' Extra spaces at the ends of lines and runs of spaces in the middle are normalized before comparing.'
            : null}
        </li>
      </ul>
      <p className={styles.snippetLabel}>Expected console output (exact order)</p>
      <pre className={learnStyles.introSyntax} tabIndex={0}>
        {lines.join('\n')}
      </pre>
    </>
  )
}

function BriefFunction({
  functionName,
  tests,
}: {
  functionName: string
  tests: FunctionTestCase[]
}) {
  return (
    <>
      <ul className={learnStyles.introSyntaxList}>
        <li>
          <strong className={styles.em}>What to define</strong>
          {' — '}
          Expose a function named{' '}
          <code className={styles.inlineCode}>{functionName}</code>
          {' '}
          (declare it with{' '}
          <code className={styles.inlineCode}>{`function ${functionName}() { … }`}</code>
          {' or assign an arrow/expression to that name). The checker runs your code, then looks up'}{' '}
          <code className={styles.inlineCode}>{functionName}</code>
          {' and calls it.'}
        </li>
        <li>
          <strong className={styles.em}>What you may use</strong>
          {' — '}
          Strict-mode JavaScript and <code className={styles.inlineCode}>console</code> for
          debugging. Tests grade <strong className={styles.em}>return values</strong>, not printed
          text.
        </li>
        <li>
          <strong className={styles.em}>How you pass</strong>
          {' — '}
          For each test, the returned value must be deeply equal to the expected value (same nesting,
          primitives, and <code className={styles.inlineCode}>null</code>/<code className={styles.inlineCode}>undefined</code>).
        </li>
      </ul>
      <p className={styles.snippetLabel}>Calls the checker performs</p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">Call</th>
              <th scope="col">Expected return</th>
            </tr>
          </thead>
          <tbody>
            <FunctionTestTableRows tests={tests} functionName={functionName} />
          </tbody>
        </table>
      </div>
    </>
  )
}

export function PracticeTaskBrief({ task }: { task: PlaygroundTask }) {
  return (
    <aside
      className={`${learnStyles.intro} ${styles.root}`}
      aria-label="How your answers are checked"
    >
      <div className={learnStyles.introBlock}>
        <h2 className={learnStyles.introTitle}>How this practice checks your code</h2>

        {task.mode === 'bindings' ? (
          <BriefBindings bindings={task.bindings} expected={task.expected} />
        ) : null}

        {task.mode === 'console' ? (
          <BriefConsole
            lines={task.expected.lines}
            normalizeWhitespace={task.expected.normalizeWhitespace ?? false}
          />
        ) : null}

        {task.mode === 'function' ? (
          <BriefFunction functionName={task.functionName} tests={task.tests} />
        ) : null}
      </div>
    </aside>
  )
}
