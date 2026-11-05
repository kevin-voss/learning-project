# Task 07_2 · Compound interest

Part of [Exercise 07 · Methods I](../README.md). New ideas you need: methods that **return** a `double`, a loop over years. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `CompoundInterest.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a method that takes a **starting capital in EUR**, a **starting interest rate in percent**, and a **duration in years**. The method must **calculate and return** the end capital. Each year the interest rate goes up by **0.01 percentage points** (for example 5.00 % → 5.01 % → 5.02 %).

Test your implementation by calling the method from `main` with different values and printing the results.

## The task, simply said

1. Write a method with three parameters: capital, start rate (%), number of years.
2. Loop once per year: multiply capital by `(1 + rate / 100)`, then add `0.01` to the rate.
3. After the loop, `return` the capital.
4. In `main`, call the method for a few examples and print each end capital (one line per example).

## Test examples

Your program is right when it prints **at least** these end-capital lines (order may match the table):

| Start capital (EUR) | Start rate (%) | Years | End capital (EUR) |
|---------------------|----------------|-------|-------------------|
| 1000 | 5 | 1 | 1050.0 |
| 1000 | 5 | 2 | 1102.605 |
| 500 | 2.5 | 3 | 538.603 |

How the second row is built: year 1 at 5 % → 1050; year 2 at 5.01 % → 1050 × 1.0501 = 1102.605.

## Little helpers

<details>
<summary>Do I add 0.01 to the capital?</summary>

No. Add 0.01 to the **rate** (the percent number), after each year's interest is applied.

</details>

<details>
<summary>0 years</summary>

If years is 0, do not change the capital — return the start capital.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Your method **returns** a value; `main` only prints what it gets back.
- [ ] You can explain the loop out loud in your own words.

Next: [Task 07_3 · Calendar methods](../task-07-3-calendar-methods/README.md).
