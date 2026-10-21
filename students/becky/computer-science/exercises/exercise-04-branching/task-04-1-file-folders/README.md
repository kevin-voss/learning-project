# Task 04_1 · File folders: shop till

Part of [Exercise 04 · Branching](../README.md). New ideas you need: `if`, `else if`, percent, rounding. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** `FolderOrder.java` is half-ready: fill in the `TODO`s |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a program to calculate and print the price for orders of file folders. The program reads the order quantity as input. The list price for one file folder is 9.99 EUR. The following discounts are given: 1% discount from a quantity of 50, 3% from 100 and 5% from 200. 19% VAT is added to the calculated net amount. In addition there are shipping costs of 99.99 EUR, unless the order value (including discount and VAT) is above 1000 EUR. The result must be rounded commercially to two decimal places.

Hint for testing: the price for an order quantity of 80 file folders, including discount, VAT and shipping costs, is 1041.52752 EUR by calculation and 1041.53 EUR when rounded commercially to two decimal places.

(The sheet writes the numbers with a decimal comma, like 9,99. Here they use a dot, like in Java.)

## The task, simply said

1. Ask: how many folders?
2. One folder costs 9.99 EUR. Multiply.
3. Take the discount off: 50 or more → 1 %, 100 or more → 3 %, 200 or more → 5 %.
4. Add 19 % tax on top.
5. Is that **more than** 1000 EUR? Then delivery is free. If not, add 99.99 EUR.
6. Round to cents and print.

## Test examples

Your program is right when it gives exactly these answers.

| Folders | Price |
|---------|-------|
| 80 | 1041.53 EUR ← the example from the sheet |
| 1 | 111.88 EUR |
| 49 | 682.51 EUR (no discount yet) |
| 50 | 688.45 EUR (1 % starts here) |
| 99 | 1165.15 EUR (over 1000 → no shipping) |
| 100 | 1153.15 EUR (3 % — cheaper than 99!) |
| 200 | 2258.74 EUR (5 %) |

## Little helpers

<details>
<summary>My price for 250 folders looks too high</summary>

Your `else if` staircase probably asks `>= 50` first. Java stops at the first true step. Start with `>= 200`.

</details>

<details>
<summary>My price for 99 folders has shipping in it</summary>

99 folders cost more than 1000 EUR **with tax**. Check the shipping rule against the price *after* VAT, not before.

</details>

<details>
<summary>My cents are gone (1041.0)</summary>

`Math.round(x * 100) / 100` divides two whole numbers. Write `100.0` at the end.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say why the discount staircase starts with 200.
- [ ] You can explain your code out loud in your own words.

Next: [Task 04_2](../task-04-2-triangle/README.md)
