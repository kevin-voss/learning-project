# Task 02_2 · Seven-segment m and l

Part of [Exercise 02 · Combinational circuits](../README.md). New ideas you need: DNF, CNF, 7-segment. They are explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write the formulas and draw the circuits there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

For the control of the **7-segment display** on slide 33 of Chapter 03, give logical expressions for **`m`** and **`l`**. Choose **DNF** or **CNF** so that the expressions become as **small** as possible. Further transformation of the expressions is **not** required. Draw the matching circuits.

The sheet also reminds you how DNF and CNF are built (see the exercise page). The truth-table columns for `m` and `l` from that slide are copied below so this folder is self-contained.

## Truth table (from the lecture slide)

Inputs `a`, `b`, `c`. Outputs `m` and `l` as used for this exercise:

| a | b | c | m | l |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 0 | 0 |

## The task, simply said

1. Count how many **0**-rows and **1**-rows each of `m` and `l` has.
2. For each output, pick **CNF** if there are fewer 0-rows, or **DNF** if there are fewer 1-rows (that keeps the formula smaller).
3. Write the formula for `m` and the formula for `l`.
4. Draw one circuit for `m` and one for `l` as **text** (IEC boxes with `&` / `≥1` and input bubbles `o` for NOT — same style as the solution sheet). No image files.

## Check examples

| You look at | You should see |
|-------------|----------------|
| Form for `m` | CNF (three 0-rows → three OR-terms ANDed) |
| Form for `l` | DNF (three 1-rows → three AND-terms ORed) |
| `m` at `a b c = 0 0 0` | formula evaluates to `0` |
| `m` at `a b c = 0 1 0` | formula evaluates to `1` |
| `l` at `a b c = 0 0 0` | formula evaluates to `1` |
| `l` at `a b c = 1 1 1` | formula evaluates to `0` |
| Drawings | gates match the formulas (inverters shown as bubbles on inputs is fine) |

## Little helpers

<details>
<summary>How many 0-rows does m have?</summary>

Three: `000`, `001`, `111`. So CNF needs three clauses — usually smaller than DNF (which would need five minterms).

</details>

<details>
<summary>How do I build one CNF clause from a 0-row?</summary>

For a row where the output is 0, write an OR that is **false only in that row**. If a bit is 0 in the row, put the **positive** variable in the OR; if the bit is 1, put the **negated** variable. Example: row `001` → `(a ∨ b ∨ ¬c)`.

</details>

<details>
<summary>How do I build one DNF term from a 1-row?</summary>

AND the literals that match the row: bit 0 → `¬variable`, bit 1 → `variable`. Example: row `010` → `(¬a ∧ b ∧ ¬c)`.

</details>

## Done when

- [ ] Formula for `m` (smallest normal form) is written.
- [ ] Formula for `l` (smallest normal form) is written.
- [ ] Both circuits are drawn and match the formulas.
- [ ] You can pick one row from the table and show that your formula agrees.

Back to [Exercise 02](../README.md)
