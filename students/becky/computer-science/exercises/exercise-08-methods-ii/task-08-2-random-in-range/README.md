# Task 08_2 · Random in range

Part of [Exercise 08 · Methods II](../README.md). New ideas you need: `Math.random()`, an **inclusive** whole-number range. They are explained on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `RandomInRange.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a method that returns a **random integer** between two given **positive integers** **a** (inclusive) and **b** (inclusive). Use `Math.random()`.

Test it in `main` by generating **100** random numbers between **5** and **10**, printing them, and checking that **every** value lies in that interval.

## The task, simply said

1. Write a method with two `int` parameters `a` and `b` (`a` ≤ `b`, both positive on the sheet).
2. Use `Math.random()` so each integer from `a` through `b` is possible, including both ends.
3. In `main`, call your method **100 times** with `a = 5` and `b = 10`.
4. Print each result (one per line is fine).
5. After the loop, convince yourself none are below 5 or above 10 (a short summary line in `main` is enough).

## Test examples

Your program is right when:

| Check | What you should see |
|-------|---------------------|
| `a` and `b` both 5 | Every call prints **5** |
| `a` and `b` both 10 | Every call prints **10** |
| 100 calls with 5 … 10 | **100** lines, only digits **5, 6, 7, 8, 9, 10** |
| After the batch | A line that says all 100 were in range (e.g. `all in range: true`) |

The 100 numbers change every run — that is normal. The **border** checks (5-only and 10-only) must always work.

## Little helpers

<details>
<summary>Why `(b - a + 1)`?</summary>

From 5 to 10 there are **6** choices: 5, 6, 7, 8, 9, 10. That is `b - a + 1`, not `b - a`.

</details>

<details>
<summary>My random never returns 10</summary>

You probably used `(int)(Math.random() * (b - a)) + a`, which stops at **b − 1**. Add **+ 1** inside the multiply part.

</details>

## Done when

- [ ] Border tests (5-only, 10-only) always pass.
- [ ] The 100-value loop only prints numbers from 5 through 10.
- [ ] You can explain the formula without looking at the notes.

Next: [Task 08_3 · Triangle angles](../task-08-3-triangle-angles/README.md).
