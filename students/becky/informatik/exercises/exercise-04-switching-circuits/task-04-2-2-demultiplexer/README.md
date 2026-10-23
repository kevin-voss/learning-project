# Task 04_2 · 2-demultiplexer

Part of [Exercise 04 · Switching circuits](../README.md). New ideas you need: demultiplexer. Explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write the truth table there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Give the truth table for the **2-demultiplexer**.

## The task, simply said

Here “2-demultiplexer” means a **1-to-2 demux**:

1. Inputs: data `D`, select `S`.
2. Outputs: `Y0`, `Y1`.
3. If `S = 0`, then `Y0 = D` and `Y1 = 0`.
4. If `S = 1`, then `Y1 = D` and `Y0 = 0`.

## Check examples

| D | S | Y0 | Y1 |
|---|---|----|----|
| 0 | 0 | 0  | 0  |
| 1 | 0 | 1  | 0  |
| 1 | 1 | 0  | 1  |

## Little helpers

<details>
<summary>Is a demux the same as a decoder?</summary>

Related, not the same. A decoder has no separate data wire — it only “picks a line”. A demux **copies the data** onto the chosen line.

</details>

<details>
<summary>How many rows?</summary>

Two inputs → 4 rows: every pair `(D, S)`.

</details>

## Done when

- [ ] All four rows are filled.
- [ ] Only the selected output ever carries `D`.
- [ ] You can say in one sentence what `S` does.

Next: [Task 04_3](../task-04-3-rs-flip-flop/README.md)
