import * as readline from 'node:readline'

function sum(n) {
  if (n === 0) return 0
  return n + sum(n - 1)
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
rl.once('line', (line) => {
  const n = Number.parseInt(String(line).trim(), 10)
  console.log('Recursive definition (natural numbers 1..n, with sum(0) = 0):')
  console.log('sum(0) = 0')
  console.log('For integers n >= 1: sum(n) = n + sum(n - 1)')
  console.log('')
  console.log('JavaScript:')
  console.log('function sum(n) {')
  console.log('  if (n === 0) return 0')
  console.log('  return n + sum(n - 1)')
  console.log('}')
  console.log('')
  console.log(`sum(${n}) = ${sum(n)}`)
  rl.close()
})
