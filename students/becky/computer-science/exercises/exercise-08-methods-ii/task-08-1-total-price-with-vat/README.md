# Task 08_1 · Total price with VAT

Part of [Exercise 08 · Methods II](../README.md). New ideas you need: **overloading**, gross price with VAT, commercial rounding to 2 decimals. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `TotalPriceWithVat.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

**a)** Write a method that takes a **unit price in EUR**, a **quantity**, and a **VAT rate in percent**. It must **calculate the total gross price**, round it **commercially**, and **return** it.

**b)** **Overload** the method with a version that only takes **unit price** and **quantity**, and assumes **19 %** VAT.

**c)** **Overload** again with a version that only takes **unit price**, assumes **quantity 1**, and **19 %** VAT.

**d)** Test all versions in a suitable `main`.

## The task, simply said

1. Gross = unit price × quantity × (1 + VAT / 100).
2. Round the result to **2** decimal places (commercial rounding) before you return it.
3. Write the **three-parameter** method first.
4. The two-parameter method calls it with VAT **19**.
5. The one-parameter method calls it with quantity **1** and VAT **19**.
6. In `main`, call each version at least once and print the returned values so you can check them.

## Test examples

Your program is right when it prints **at least** these lines (same numbers; your labels may differ):

| Call (idea) | Printed total (EUR) |
|-------------|---------------------|
| 2.50 EUR, 4 pieces, 19 % VAT | 11.9 |
| 10.00 EUR, 5 pieces (19 % assumed) | 59.5 |
| 8.00 EUR only (qty 1, 19 % assumed) | 9.52 |
| 1.11 EUR, 3 pieces, 7 % VAT (rounding check) | 3.56 |

How the last row is built: 1.11 × 3 = 3.33; with 7 % → 3.5631… → rounds to **3.56**.

## Little helpers

<details>
<summary>Where do I put the rounding?</summary>

Round **once** on the final gross amount you return, not on every tiny step in the middle.

</details>

<details>
<summary>Do all three methods repeat the formula?</summary>

No. Let the short versions **call** the long one with the missing numbers filled in (19 and 1).

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You have **three** overloads of the same method name.
- [ ] `main` only prints what the methods return (no hidden globals).

Next: [Task 08_2 · Random in range](../task-08-2-random-in-range/README.md).
