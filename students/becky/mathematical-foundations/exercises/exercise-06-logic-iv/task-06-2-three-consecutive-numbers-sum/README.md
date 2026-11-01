# Task 06_2 · Three consecutive numbers sum

Part of [Exercise 06 · Logic IV](../README.md). New ideas you need: direct proof and naming three neighbours *n*, *n* + 1, *n* + 2. They are on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write your proof there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Prove by a **direct proof** the statement: The sum of three consecutive natural numbers is divisible by 3.

## The task, simply said

1. Name the three numbers: *n*, *n* + 1, and *n* + 2 (with *n* a natural number).
2. Write their sum: *n* + (*n* + 1) + (*n* + 2).
3. Simplify the sum to one expression.
4. Factor out 3 so the sum equals 3 × (an integer).
5. Conclude: therefore the sum is divisible by 3.

## Check examples

| Three consecutive naturals | Sum | ÷ 3 |
|----------------------------|-----|-----|
| 4, 5, 6 | 15 | 15 = 3 × 5 |
| 0, 1, 2 | 3 | 3 = 3 × 1 |
| 10, 11, 12 | 33 | 33 = 3 × 11 |

Your proof must work for **every** natural *n*, not only these rows.

## Little helpers

<details>
<summary>Why start at *n* and not at *n* − 1?</summary>

Any three neighbours can be written as *n*, *n* + 1, *n* + 2. Picking *n* as the first is the standard trick — it keeps the algebra short.

</details>

<details>
<summary>Is “natural number” the same as “positive integer”?</summary>

On this course sheet, naturals include **0**. Your proof should still work if someone uses 1, 2, 3, … only — the algebra is the same.

</details>

<details>
<summary>Do I need induction?</summary>

No. The sheet asks for a **direct** proof. One line of algebra after naming the three numbers is enough.

</details>

## Done when

- [ ] You named the three numbers with one letter *n*.
- [ ] You simplified the sum to 3(*n* + 1) or an equally clear “3 × integer” form.
- [ ] You stated the conclusion in one sentence.

Next: [Task 06_3](../task-06-3-n-squared-plus-n-is-even/README.md)
