let a = 1
let b = 5
let sum = 0
for (let i = a; i <= b; i++) {
  if (i % 2 === 0) {
    sum = sum + i
  }
  console.log(`${i} | Sum: ${sum}`)
}
console.log(`Total sum: ${sum}`)
