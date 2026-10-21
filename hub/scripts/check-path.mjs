// Checks hub/path.mjs before the site is built:
//   every stage and step id is unique, no retired id is back on the path,
//   every stage has a known level, and every href points to a file that exists
//   (pathSteps() in catalog.mjs also checks computer-science '#lesson' ids).
// Exits with 1 on the first list of problems. Run: node hub/scripts/check-path.mjs

import { LEVELS, RETIRED, STAGES } from '../path.mjs'
import { pathSteps } from './catalog.mjs'

const problems = []
const seen = new Set()
const levels = new Set(LEVELS.map((level) => level.id))
const retired = new Set(RETIRED)

if (retired.size !== RETIRED.length) problems.push('RETIRED lists an id twice')

for (const stage of STAGES) {
  if (!stage.optional && !levels.has(stage.level)) problems.push(`stage "${stage.id}": unknown level "${stage.level}"`)
  for (const id of [stage.id, ...stage.steps.map((step) => step.id)]) {
    if (seen.has(id)) problems.push(`id "${id}" is used twice`)
    if (retired.has(id)) problems.push(`id "${id}" is retired: pick a new id`)
    seen.add(id)
  }
  for (const step of stage.steps) {
    if (!['read', 'do', 'check'].includes(step.type)) problems.push(`step "${step.id}": unknown type "${step.type}"`)
    if (step.type !== 'check' && !step.href) problems.push(`step "${step.id}": needs an href`)
  }
}

try {
  pathSteps()
} catch (error) {
  problems.push(error.message)
}

for (const problem of problems) console.log(`path: ${problem}`)
console.log(`${seen.size} path ids checked, ${problems.length} problem${problems.length === 1 ? '' : 's'}`)
process.exit(problems.length ? 1 : 0)
