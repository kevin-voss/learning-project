# Task 11_2 · Exact money

Part of [Exercise 11 · Dates and money](../README.md). New ideas you need: **`new BigDecimal(String)`**, **`multiply` and `add`**, **`setScale(2, RoundingMode.HALF_UP)`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

The counter's cash register must add money without losing a cent. Write a Java program that reads a shopping note and totals it exactly.

First line: an integer `n` — how many lines follow.

Then `n` lines, each: `item price qty`.

- `item` is one word.
- `price` is money as text with two decimals, like `2.99`.
- `qty` (the quantity) is a whole number, `0` or more.

Print exactly one line per item, in input order:

```text
<item>: <price × qty with two decimals>
```

After all item lines, print two more lines:

```text
total: <sum of the lines with two decimals>
with vat: <total × 1.19, rounded HALF_UP to two decimals>
```

HALF_UP is school rounding: `1.4875` becomes `1.49`. With `n = 0` the program prints only `total: 0.00` and `with vat: 0.00`.

Build every amount with `new BigDecimal(String)` — never `new BigDecimal(double)` — and round with `setScale(2, RoundingMode.HALF_UP)`, so every printed amount shows exactly two decimals.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read how many lines come next.
2. For each line, build the price with `new BigDecimal(text)` and multiply by the quantity.
3. Print the line rounded to two decimals; add it to one total.
4. After all lines, print `total: <total>`.
5. Multiply the total by `1.19`, round HALF_UP to two decimals, print `with vat: <amount>`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `pen 2.99 3` | `pen: 8.97`, `total: 8.97` and `with vat: 10.67` |
| `2` then `stamp 0.10 1` / `coin 0.20 1` | `stamp: 0.10`, `coin: 0.20`, `total: 0.30` and `with vat: 0.36` |
| `1` then `toy 0.25 5` | `toy: 1.25`, `total: 1.25` and `with vat: 1.49` |
| `1` then `bag 4.50 0` | `bag: 0.00`, `total: 0.00` and `with vat: 0.00` |
| `0` | `total: 0.00` and `with vat: 0.00` |
| `3` then `pen 2.99 3` / `book 12.50 1` / `ink 3.20 2` | `pen: 8.97`, `book: 12.50`, `ink: 6.40`, `total: 27.87` and `with vat: 33.17` |

The `toy` row is the vat check: `1.25 × 1.19 = 1.4875`, and HALF_UP must carry it to `1.49` — never `1.48`.

## Little helpers

<details>
<summary><code>new BigDecimal(2.99)</code> also compiles — why not use it?</summary>

The `double` 2.99 is already a tiny bit wrong, and the constructor copies the whole error. From text only: `new BigDecimal("2.99")` is exact.

</details>

<details>
<summary>Why does my total print <code>0</code> instead of <code>0.00</code> when there are no items?</summary>

`BigDecimal.ZERO` carries no decimal places. Start the total at `new BigDecimal("0.00")`, or `setScale(2, ...)` before printing.

</details>

<details>
<summary><code>0.30 × 1.19</code> shows <code>0.3570</code> — where do the extra zeros come from?</summary>

Multiplying adds the scales: 2 + 2 = 4 decimal places. `setScale(2, RoundingMode.HALF_UP)` trims the amount back to cents.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Every amount is a `BigDecimal` built from text, and every printed amount has exactly two decimals.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 11](../README.md).
