# Task 06_2 · Revenue statistics

Part of [Exercise 06 · Arrays](../README.md). New ideas you need: `new double[]`, filling an array in a loop, sum, min, max, average. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a program to calculate revenue figures. The program first asks how many months should be included. Then it asks for the revenue of each month in that period and stores all values in an array. After that the program prints:

- The size of the period (count),
- Total revenue (sum),
- The smallest monthly revenue (minimum),
- The largest monthly revenue (maximum),
- Average revenue per month (arithmetic mean).

## The task, simply said

1. Ask: `How many months? ` and read `n`.
2. If `n` is less than 1, say `Invalid month count.` and stop.
3. Make a `double[]` with `n` boxes. For each month from 1 to `n`, ask `Revenue for month M: ` and store the number.
4. Print these five lines (labels exactly as written):
   - `Period size: ` + count
   - `Total revenue: ` + sum
   - `Minimum monthly revenue: ` + smallest
   - `Maximum monthly revenue: ` + largest
   - `Average monthly revenue: ` + mean (a decimal is fine)

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3`, then `1000`, `1500`, `800` | `Period size: 3` · `Total revenue: 3300.0` · `Minimum monthly revenue: 800.0` · `Maximum monthly revenue: 1500.0` · `Average monthly revenue: 1100.0` |
| `1`, then `500` | `Period size: 1` · `Total revenue: 500.0` · `Minimum monthly revenue: 500.0` · `Maximum monthly revenue: 500.0` · `Average monthly revenue: 500.0` |
| `0` | `Invalid month count.` (no statistics lines) |

## Little helpers

<details>
<summary>My minimum stays 0.0 even when all revenues are positive</summary>

Start `min` at the **first** month's value (or the first box you filled), not at 0. Zero might be smaller than every real month.

</details>

<details>
<summary>My average is wrong (3300 / 3 = 1100 but I get 1100.0 wrong)</summary>

Use `(double) sum / count` or store values in `double[]` so division is not integer division.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can point to the loop that fills the array and the loop (or walk) that finds min and max.
- [ ] You can explain your code out loud in your own words.

Next: [Task 06_3](../task-06-3-month-appointments/README.md)
