# Task 03_2 · Coffee sizes

Part of [Exercise 03 · Enums](../README.md). New ideas you need: **enum with fields and methods**, **`values()`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program for the café at the post office. It reads the orders and prints the bill.

First line: an integer `n` — how many order lines follow.

Then `n` lines: `code count`. The `count` is an integer `0` or more. The `code` is one token like `S`.

The sizes and their prices:

| Code | Volume | Price |
|------|--------|-------|
| `S` | 200 ml | 150 cents |
| `M` | 300 ml | 200 cents |
| `L` | 400 ml | 250 cents |

Print exactly one line per order, in input order:

- known code: `order: <count> x <code> = <count*price> cents`
- unknown code: `unknown size: <code>` (and the program continues with the next line)

After all lines print one final line:

```text
total: <sum of all order amounts> cents
```

Model the sizes as an **enum** `Size(String code, int ml, int priceCents)`. Find the size for a typed code by looping over `Size.values()` — no exception needed, an unknown code is just a line of output.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read how many order lines come next.
2. For each line: find the size with that code.
3. Found: print the order line and add the amount to the total.
4. Not found: print the unknown line and add nothing.
5. At the end print the total line — always, even after zero lines.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `S 1` | `order: 1 x S = 150 cents` and `total: 150 cents` |
| `1` then `M 2` | `order: 2 x M = 400 cents` and `total: 400 cents` |
| `2` then `S 1` / `XL 1` | `order: 1 x S = 150 cents`, `unknown size: XL`, `total: 150 cents` |
| `1` then `L 0` | `order: 0 x L = 0 cents` and `total: 0 cents` |
| `3` then `S 2` / `M 1` / `L 1` | `order: 2 x S = 300 cents`, `order: 1 x M = 200 cents`, `order: 1 x L = 250 cents`, `total: 750 cents` |
| `0` | `total: 0 cents` |

## Little helpers

<details>
<summary>How do I turn the token S into Size.S?</summary>

Loop over `Size.values()`. When `s.code` equals the token, you found the constant. When the loop ends without a match, the code is unknown — print the line and go on.

</details>

<details>
<summary>Why does the enum have a constructor?</summary>

Each constant carries its own code, volume and price. `S("S", 200, 150)` runs the constructor once and fills the fields of `S`. The numbers travel with the size.

</details>

<details>
<summary>What counts into the total?</summary>

Only the amounts of known codes. An unknown code adds nothing, and a count of `0` adds `0` — the order line still prints.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] The prices `150` / `200` / `250` appear only in the enum; the loop uses `size.priceCents`.
- [ ] You can explain your code out loud in your own words.

Next: [Task 03_3](../task-03-3-signal-tower/README.md)
