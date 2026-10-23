# Task 05_2 · Vending machine

Part of [Exercise 05 · Exceptions](../README.md). New ideas you need: **`throw`**, **`IllegalArgumentException`**, **catching in main**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program for the post office vending machine. The machine sells three snacks (prices in cents):

| Slot | Price |
|------|-------|
| `A1` | `150` |
| `A2` | `200` |
| `A3` | `250` |

Define the slots and prices in your code (a method or a map).

First line: an integer `n` — how many buy attempts follow.

Then `n` lines: `slot paid`. The `paid` is one token: it should be a number of cents, but it can be negative or nonsense. When it is not a number at all, that line's error is `error: paid is not a number` (parse it with the try/catch idea from Task 05_1).

Check each line in this order and print exactly one line:

1. Unknown slot → `error: unknown slot <slot>`
2. Paid is negative → `error: paid cannot be negative`
3. Paid is less than the price → `error: need <price-paid> more cents`
4. Otherwise → `bought <slot>, change <paid-price>` (change `0` is fine)

Build it this way: the three error cases are `throw new IllegalArgumentException("<message>")` inside a buying method. `main` calls that method inside a `try`, catches the alarm and prints `error: <message>`. After an error the run continues with the next line.

After all lines print exactly:

```text
sales: <number of successful buys>
```

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many buy attempts come next.
2. Split each line into slot and paid.
3. Call your buying method inside a `try`.
4. Impossible buy → the method throws; main catches and prints `error: <message>`.
5. Good buy → print the `bought` line and count one sale.
6. At the end print `sales:`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `A1 200` | `bought A1, change 50`, then `sales: 1` |
| `1` then `A2 200` | `bought A2, change 0`, then `sales: 1` |
| `1` then `A1 100` | `error: need 50 more cents`, then `sales: 0` |
| `1` then `B9 300` | `error: unknown slot B9`, then `sales: 0` |

## Little helpers

<details>
<summary>Where exactly do the three errors come from?</summary>

From inside the buying method: `throw new IllegalArgumentException("unknown slot " + slot)` — and the same shape for the other two cases. A method that throws hands the alarm up to its caller; main catches it there.

</details>

<details>
<summary>Why must catch (NumberFormatException) come first?</summary>

A `NumberFormatException` is also an `IllegalArgumentException` — a special case of it. Java checks the catches top to bottom, so the special one must stand above the general one.

</details>

<details>
<summary>How does sales stay correct after an error?</summary>

Put the count (`sales++`) inside the `try`, right after the buying call. When the method throws, Java jumps over it to the `catch` — errors never count.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] The three error cases throw `IllegalArgumentException` from the buying method; main catches and prints `error: <message>`.
- [ ] Every line is served, also after an error, and `sales:` counts only the buys.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 05](../README.md).
