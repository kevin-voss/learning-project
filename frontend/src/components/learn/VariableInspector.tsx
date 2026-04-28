import type { VariableSnapshot, VariableValue } from '@/types/curriculum'

import styles from './VariableInspector.module.css'

type Props = {
  variables: VariableSnapshot | null
  changed?: string[]
  arrIdx?: number
  stepHint?: string
}

export function VariableInspector({ variables, changed, arrIdx, stepHint }: Props) {
  const changedSet = new Set(changed ?? [])
  const entries = variables ? Object.entries(variables) : []

  if (!variables || entries.length === 0) {
    return (
      <div className={styles.root}>
        <p className={styles.eyebrow}>Variables</p>
        {stepHint ? <p className={styles.stepHint}>{stepHint}</p> : null}
        <p className={styles.empty}>Run steps to see live values.</p>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <p className={styles.eyebrow}>Variables</p>
      {stepHint ? <p className={styles.stepHint}>{stepHint}</p> : null}
      <ul className={styles.list}>
        {entries.map(([name, val]) => (
          <li key={name}>
            <VariableCard
              name={name}
              value={val}
              isChanged={changedSet.has(name)}
              arrIdx={arrIdx}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function VariableCard({
  name,
  value,
  isChanged,
  arrIdx,
}: {
  name: string
  value: VariableValue
  isChanged: boolean
  arrIdx?: number
}) {
  const isArr = Array.isArray(value)
  const typeLabel = isArr ? `array [${value.length}]` : typeof value

  return (
    <div
      className={`${styles.card} ${isChanged ? styles.changed : ''}`}
    >
      <div className={styles.varName}>{name}</div>
      {isArr ? (
        <div className={styles.arrWrap}>
          {value.map((item, idx) => (
            <span
              key={`${name}-${idx}`}
              className={`${styles.arrChip} ${idx === arrIdx ? styles.idxHighlight : ''} ${isChanged ? styles.changedChip : ''}`}
            >
              <span className={styles.arrIdx}>{idx}</span>
              <span>{formatScalar(item)}</span>
            </span>
          ))}
        </div>
      ) : (
        <div className={styles.scalar}>{formatScalar(value)}</div>
      )}
      <div className={styles.typeMeta}>{typeLabel}</div>
    </div>
  )
}

function formatScalar(v: VariableValue): string {
  if (Array.isArray(v)) return '[…]'
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return v
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  if (typeof v === 'object' && v !== null) {
    try {
      return JSON.stringify(v)
    } catch {
      return '[object]'
    }
  }
  return String(v)
}
