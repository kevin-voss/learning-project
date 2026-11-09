# Task 06_4 · Sum one to n definition and code

Part of [Exercise 06 · Programming basics](../README.md). New ideas you need: **recursive sum** `sum(n) = 1 + … + n`, **base case** `sum(0) = 0`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Give a **recursive mathematical definition** `sum(n)` for the sum of the **natural numbers from 1 to n**. Also give an implementation of the function as **JavaScript code**.

Natural numbers here mean **1, 2, 3, …** . Use a base case **`sum(0) = 0`** so “from 1 to n” is the same as “add `n` to the sum up to `n − 1`.”

This task’s program **reads** a non-negative integer **n** from one line of input and **prints** the definition, the code, and the value **`sum(n)`** (see test examples — match the **exact** layout so the tests pass).

## The task, simply said

1. Write the math: `sum(0) = 0` and `sum(n) = n + sum(n − 1)` for `n ≥ 1` (same meaning as “1 + … + n”).
2. Write a recursive JavaScript function `sum` with the same idea.
3. For the number `n` you type, print the definition, then the code (fixed boilerplate), then **`sum(n) =`** the correct number.
4. Try **`n = 4`** (should give **10**) and **`n = 0`** (should give **0**).

## Test examples

Your program is right when it follows these prints **exactly** (same lines, same spaces).

| You type | The program says |
|----------|------------------|
| `4` | See block A below |
| `0` | See block B below |

**Block A** (`n = 4`)

```text
Recursive definition (natural numbers 1..n, with sum(0) = 0):
sum(0) = 0
For integers n >= 1: sum(n) = n + sum(n - 1)

JavaScript:
function sum(n) {
  if (n === 0) return 0
  return n + sum(n - 1)
}

sum(4) = 10
```

**Block B** (`n = 0`)

```text
Recursive definition (natural numbers 1..n, with sum(0) = 0):
sum(0) = 0
For integers n >= 1: sum(n) = n + sum(n - 1)

JavaScript:
function sum(n) {
  if (n === 0) return 0
  return n + sum(n - 1)
}

sum(0) = 0
```

## Little helpers

<details>
<summary>Why is sum(4) equal to 10?</summary>

`1 + 2 + 3 + 4 = 10`. With the recursive recipe: `sum(4) = 4 + sum(3) = …` until you hit `sum(0) = 0`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 06](../README.md).
