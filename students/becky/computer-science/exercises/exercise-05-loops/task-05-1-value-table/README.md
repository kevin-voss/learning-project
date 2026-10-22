# Task 05_1 · Value table

Part of [Exercise 05 · Loops](../README.md). New ideas you need: `for`, step size, `double`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `ValueTable.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a program that prints a value table for the function f(x) = x² + 3x − 1. The start value and stop value for x, as well as its step size, should be entered by the user.

Example program run:

```text
Start x: 0
Stop x: 10
Step x: 1
f(0) = -1.0
f(1) = 3.0
f(2) = 9.0
f(3) = 17.0
f(4) = 27.0
f(5) = 39.0
f(6) = 53.0
f(7) = 69.0
f(8) = 87.0
f(9) = 107.0
f(10) = 129.0
```

## The task, simply said

1. Ask: start x, stop x, step x.
2. Walk from start to stop, growing by step each time.
3. At every stop, compute f(x) = x × x + 3 × x − 1.
4. Print a line like `f(2) = 9.0`.

## Test examples

Your program is right when it gives exactly these answers.

| Start | Stop | Step | What you must see |
|-------|------|------|-------------------|
| 0 | 10 | 1 | `f(0) = -1.0` … `f(10) = 129.0` (the sheet's example) |
| 0 | 4 | 2 | `f(0) = -1.0`, `f(2) = 9.0`, `f(4) = 27.0` |
| 1 | 3 | 1 | `f(1) = 3.0`, `f(2) = 9.0`, `f(3) = 17.0` |
| −2 | 2 | 1 | `f(-2) = -3.0`, `f(0) = -1.0`, `f(2) = 9.0` |

## Little helpers

<details>
<summary>My loop never stops / never starts</summary>

Check the three parts of `for`: start, **keep going while** (`x <= stop`), and step (`x = x + step`). If step is 0, you walk forever.

</details>

<details>
<summary>f(1) prints 4 or 5 instead of 3.0</summary>

f(x) = x² + 3x − 1. For x = 1: 1 + 3 − 1 = 3. Make sure you use `x * x`, not something else, and subtract 1 at the end.

</details>

<details>
<summary>With step 2 I miss the last value</summary>

Use `x <= stop` (stop counts too). Start 0, stop 4, step 2 → 0, 2, 4.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say what the three parts of a `for` do.
- [ ] You can explain your code out loud in your own words.

Next: [Task 05_2](../task-05-2-running-stats/README.md)
