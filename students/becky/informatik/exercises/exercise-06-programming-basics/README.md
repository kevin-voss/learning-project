# Exercise 06 · Programming basics

| | |
|---|---|
| Student | Becky |
| Subject | Informatik |
| Language | JavaScript |
| Created | 2026-11-06 |

## The story in one sentence

You learn how a **loop** walks through numbers, how **even and odd** change what gets added, how **recursion** means “the function calls itself until a tiny base case stops it,” and how **sum from 1 to n** can be written both as math and as code.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 06_1 | [Even-sum loop trace](task-06-1-even-sum-loop-trace/README.md) | todo |
| 06_2 | [Odd-sum code change](task-06-2-odd-sum-code-change/README.md) | todo |
| 06_3 | [Recursive fib four](task-06-3-recursive-fib-four/README.md) | todo |
| 06_4 | [Sum one to n definition and code](task-06-4-sum-one-to-n-definition-and-code/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your **JavaScript** in its `my-solution/` folder (one `.mjs` file per task, name in that folder’s README).
4. Try every test example from the task’s `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

### Loops and a running total

> [!PICTURE]
> Imagine a **shelf** with boxes numbered 1, 2, 3, 4, 5. You walk along with a **notebook**. At each box you maybe write a number into the notebook, or you skip. The notebook always shows the **sum so far**.

A `for` loop is that walk: `i` is which box you stand on. A variable like `sum` is the notebook.

```js
let sum = 0
for (let i = 1; i <= 5; i++) {
  // maybe add i to sum
}
```

In task **06_1** you trace exactly what a loop prints when it only adds **even** numbers between 1 and 5.

### Even, odd, and changing the rule

> [!PICTURE]
> **Even** numbers share fairly: 2, 4, 6 … **Odd** numbers have one left over: 1, 3, 5 … In code, `i % 2 === 0` means “even remainder when dividing by 2.”

In task **06_2** you change one small piece so the loop adds **odd** numbers instead of even ones, with the same `a`, `b`, and print shape.

### Recursion (Fibonacci)

> [!PICTURE]
> A **Matryoshka doll**: to open the biggest, you must open a smaller one inside first, until you hit the tiniest solid doll—that is the **base case**.

`fib(n)` for n ≥ 2 is “fib of the two smaller numbers, combined.” To find `fib(4)`, you expand until `fib(0)` and `fib(1)` are known, then combine back up.

In task **06_3** you show the value of **fib(4)** by recursive substitution (your program can print the steps in a clear order).

### Sum from 1 to n

> [!PICTURE]
> Stairs: step 1, then 2, then 3 … The **total height** up to step *n* is 1 + 2 + … + *n*. You can say “height up to n equals n plus height up to n−1,” with “height up to 0” as zero.

In task **06_4** you write that idea as a **math definition** and as a **recursive JavaScript function** `sum(n)`.

---

## Words to know

| Word | Means |
|------|-------|
| Loop | Do something many times while a counter moves (for example `i` from `a` to `b`). |
| Running total | A variable (like `sum`) that keeps the sum so far. |
| Even / odd | Even: divisible by 2 (`i % 2 === 0`). Odd: not even (`i % 2 !== 0` or `=== 1` for positive integers). |
| Recursion | A function that calls itself, with a base case that stops. |
| Fibonacci | Often `fib(0)=0`, `fib(1)=1`, `fib(n)=fib(n-1)+fib(n-2)` for n ≥ 2 (the sheet uses this). |
| Natural numbers (here) | 1, 2, 3, … (for the sum 1 + … + n; `sum(0)=0` is the base case in the recursive recipe). |

## Source

Sheet **Übung 5** (course *Einführung in die Informatik*, WiSe 2026/27, Prof. Dr. Jens Paßlick, Abteilung Wirtschaftsinformatik), topic *Grundlagen der Programmierung* — translated faithfully into English for these tasks.

Back to [all exercises](../README.md).
