# Task 05_2 · Formula x squared plus 2y plus c

Part of [Exercise 05 · Machine language and assembler](../README.md). New ideas you need: reading inputs into jars, `MUL`, and building a formula step by step in the accumulator.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Your program and line explanations |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write an assembler program that computes:

\[
z = x^2 + 2y + c
\]

Describe your program **line by line**: for each assembler instruction, write what that instruction does.

## The task, simply said

1. Decide which memory cells hold `x`, `y`, `c`, and `z` (the sample solution uses `[1]`, `[2]`, `[3]`, and `[0]` — you may choose another layout if every step is clear).
2. Read `x`, `y`, and `c` from the keyboard with `INP`.
3. Put `x²` in the accumulator, then add `2y`, then add `c`.
4. Store the result in your `z` cell and print it with `OUT`.
5. End with `HLT`.
6. Under your listing, write one short English sentence per line (like the course asks).

## Check examples

Trace **your** program with these inputs (same order you read them: `x`, then `y`, then `c`).

| You type (x, y, c) | Memory `[0]` should hold (z) | Because |
|--------------------|------------------------------|---------|
| `3`, `4`, `5` | `22` | `9 + 8 + 5` |
| `2`, `1`, `0` | `6` | `4 + 2 + 0` |
| `0`, `5`, `1` | `11` | `0 + 10 + 1` |

## Little helpers

<details>
<summary>How do I get x² if I only have MUL with a constant?</summary>

Load `x` into the accumulator, then multiply by `x` again — e.g. `LDA [1]` then `MUL [1]` if your sheet allows `MUL` with a jar, or load `x` twice using add/mul steps from the lecture. The sample solution uses `LDA [1]` and `MUL [1]`.

</details>

<details>
<summary>How do I add 2y without a “times two” instruction?</summary>

Add jar `[y]` twice: `ADD [2]` and `ADD [2]` when `[2]` holds `y`.

</details>

<details>
<summary>What must the line-by-line description look like?</summary>

One line of program, one line of plain English: “Read x into memory 1”, “Load x into the accumulator”, … — not a story, just what **that** instruction changes.

</details>

## Done when

- [ ] Your listing has every instruction from first `INP` to `HLT`.
- [ ] All three check rows give the right `z` when you trace by hand.
- [ ] Every instruction has its own explanation sentence.

Back to [Exercise 05](../README.md).
