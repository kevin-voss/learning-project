# Task 04_5 · D flip-flop timeline

Part of [Exercise 04 · Switching circuits](../README.md). New ideas you need: level-triggered D flip-flop. Explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Fill `Q` for each time step |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Complete the following table for the state of a **level-triggered D flip-flop** at the times `t = 0` to `t = 5`.

The paper shows rows for `CLK`, `D` and `Q` (and sometimes `Q̄`). The exact `CLK`/`D` waveform was not fully readable in the OCR paste, so the table below is a **standard teaching waveform of the same shape**. If your paper’s `CLK`/`D` numbers differ, keep **those** and apply the same rule.

## The task, simply said

Rule for a **high-active level-triggered** D flip-flop:

1. While `CLK = 1`, `Q` follows `D` (`Q ← D`).
2. While `CLK = 0`, `Q` keeps the value from the previous time step.
3. Fill `Q` for `t = 0, 1, 2, 3, 4, 5`.
4. At `t = 0`, if the paper gives an initial `Q`, use it; otherwise assume `Q = 0` before anything happens, then apply the rule at `t = 0`.

## Table to complete

| t | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| CLK | 0 | 1 | 1 | 0 | 1 | 0 |
| D | 1 | 0 | 1 | 1 | 0 | 1 |
| Q | ? | ? | ? | ? | ? | ? |

## Check examples

Walk left to right:

| t | CLK | D | What happens to Q |
|---|-----|---|-------------------|
| 0 | 0 | 1 | clock closed → Q stays initial (here 0) |
| 1 | 1 | 0 | clock open → Q becomes 0 |
| 2 | 1 | 1 | clock still open → Q becomes 1 |
| 3 | 0 | 1 | clock closed → Q stays 1 |

## Little helpers

<details>
<summary>Level-triggered vs edge-triggered?</summary>

Level: the whole time `CLK` is 1, `Q` can keep changing with `D`. Edge: `Q` samples `D` only on the rising (or falling) moment.

</details>

<details>
<summary>Do I need Q̄?</summary>

Only if your paper has a `Q̄` row. Then `Q̄` is the opposite of `Q` each time.

</details>

## Done when

- [ ] `Q` is filled for every `t` from 0 to 5.
- [ ] Every step follows “follow D if CLK=1, else hold”.
- [ ] You can explain one hold step and one follow step out loud.

Back to [Exercise 04](../README.md).
