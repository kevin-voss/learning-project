# Task 04_1 · 3-to-8 decoder

Part of [Exercise 04 · Switching circuits](../README.md). New ideas you need: decoder, truth table. They are explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write the truth table there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Give the truth table for the **3-to-8 decoder**.

## The task, simply said

1. Three inputs: `A2`, `A1`, `A0` (most significant bit first).
2. Eight outputs: `Y0` … `Y7`.
3. For every input combination, exactly **one** `Yi` is 1; all others are 0.
4. The index `i` equals the binary number `A2 A1 A0`.

## Check examples

| You look at | You should see |
|-------------|----------------|
| `A2 A1 A0 = 0 0 0` | only `Y0 = 1` |
| `A2 A1 A0 = 0 1 0` | only `Y2 = 1` |
| `A2 A1 A0 = 1 1 1` | only `Y7 = 1` |
| Any row | exactly one `1` among `Y0`…`Y7` |

## Little helpers

<details>
<summary>How many rows does the table need?</summary>

Three bits → `2³ = 8` rows. List them in binary order from `000` to `111`.

</details>

<details>
<summary>Which output is 1 for input 101?</summary>

`101` binary is 5, so `Y5 = 1`.

</details>

## Done when

- [ ] The table has all 8 input rows.
- [ ] Every row has exactly one output equal to 1.
- [ ] You can explain out loud why `011` lights `Y3`.

Next: [Task 04_2](../task-04-2-2-demultiplexer/README.md)
