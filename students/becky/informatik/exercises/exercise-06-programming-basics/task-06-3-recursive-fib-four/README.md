# Task 06_3 · Recursive fib four

Part of [Exercise 06 · Programming basics](../README.md). New ideas you need: **Fibonacci**, **recursive definition**, **base cases**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Find the value of **`fib(4)`** by **recursive substitution** (German: *rekursive Ersetzung* — you unpack the definition step by step until you only have base-case values, then combine back up).

Use the usual definition on the sheet:

- `fib(0) = 0`
- `fib(1) = 1`
- `fib(n) = fib(n - 1) + fib(n - 2)` for `n ≥ 2`

Your **program** should **print** the substitution in a clear order (the block under “Test examples” shows one valid printout — match it **exactly** so the tests pass).

## The task, simply said

1. Start from **`fib(4)`** and replace it using the rule for `n ≥ 2`.
2. Keep replacing until you reach only **`fib(0)`** and **`fib(1)`**.
3. Put the numbers in from the bottom up.
4. End with **`fib(4) = 3`**.

## Test examples

Your program is right when it prints exactly this (no extra lines, same text):

| You type | The program says |
|----------|------------------|
| *(nothing)* | *(see block)* |

```text
fib(4) = fib(3) + fib(2)
fib(3) = fib(2) + fib(1)
fib(2) = fib(1) + fib(0)
fib(1) = 1
fib(0) = 0
fib(2) = 1
fib(3) = 2
fib(4) = 3
```

## Little helpers

<details>
<summary>Which number do I compute first?</summary>

Always collapse the **smaller** indices first: you need `fib(2)` before you can finish `fib(3)`, and `fib(3)` before `fib(4)`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 06](../README.md).
