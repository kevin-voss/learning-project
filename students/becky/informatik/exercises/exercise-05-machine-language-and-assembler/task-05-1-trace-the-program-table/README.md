# Task 05_1 · Trace the program table

Part of [Exercise 05 · Machine language and assembler](../README.md). New ideas you need: memory cells, accumulator, and the instruction table on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Fill the trace table there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Analyze the assembler program (column 1 in the table below) by **completing the table**. After **each** instruction, write the values of the **accumulator** and **memory `[0]`**, **`[1]`**, **`[2]`**.

| Line | Instruction | Accumulator | Memory `[0]` | Memory `[1]` | Memory `[2]` |
|------|-------------|-------------|--------------|--------------|--------------|
| 00 | `INP [2]` | `-` | `-` | `-` | `5` |
| 01 | `INP [1]` | `-` | `-` | `18` | `5` |
| 02 | `LDA 2` | | | | |
| 03 | `ADD [1]` | | | | |
| 04 | `MUL 3` | | | | |
| 05 | `ADD [2]` | | | | |
| 06 | `STA [0]` | | | | |
| 07 | `OUT [0]` | | | | |
| 08 | `HLT` | | | | |

The two filled rows are **given**: someone typed `5` into `[2]`, then `18` into `[1]`.

## The task, simply said

1. Start at line `02`. Do **one** instruction at a time.
2. After each line, write four values: accumulator, `[0]`, `[1]`, `[2]`.
3. Use `-` when the sheet shows the accumulator is not used (only on input lines — after `LDA` you always write a number).
4. Memory cells keep their old value until `INP` or `STA` changes them.
5. Line `07` prints `[0]` but does not change the table columns (values stay as after line `06`).

## Check examples

Use these to catch slips **after** you finish the whole table.

| After line | Accumulator | `[0]` | `[1]` | `[2]` |
|------------|-------------|-------|-------|-------|
| 04 `MUL 3` | `69` | `-` | `18` | `5` |
| 06 `STA [0]` | `74` | `74` | `18` | `5` |
| 08 `HLT` (same as after 07) | `74` | `74` | `18` | `5` |

The program should **print** `74` at line `07`.

## Little helpers

<details>
<summary>What does `LDA 2` load — the number 2 or jar `[2]`?</summary>

On this sheet, `LDA 2` loads **memory cell `[2]`**, which already holds `5`. The accumulator becomes `5`.

</details>

<details>
<summary>Does `MUL 3` change memory?</summary>

No. It only multiplies the **accumulator** by the constant `3`. Jars stay the same until `STA` or `INP`.

</details>

<details>
<summary>What does `OUT [0]` do to the table?</summary>

It sends `[0]` to the screen. For tracing, the accumulator and all memory cells stay as they were after `STA [0]`.

</details>

## Done when

- [ ] Every row from `02` through `08` is filled.
- [ ] Your last row matches the check example for line `06`.
- [ ] You can say in one sentence what number the program prints and why.

Back to [Exercise 05](../README.md).
