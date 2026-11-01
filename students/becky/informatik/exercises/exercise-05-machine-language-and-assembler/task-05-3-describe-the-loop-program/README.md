# Task 05_3 · Describe the loop program

Part of [Exercise 05 · Machine language and assembler](../README.md). New ideas you need: `DIV`, `JEZ`, and `JMP` loops. Explained on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Line-by-line explanations |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

What does the following program do? Describe the program **line by line**, one explanation per assembler instruction.

```text
00  INP [0]
01  LDA 0
02  STA [1]
03  LDA [0]
04  DIV 2
05  JEZ 11
06  STA [0]
07  LDA [1]
08  ADD 1
09  STA [1]
10  JMP 03
11  OUT [1]
12  HLT
```

## The task, simply said

1. Read the program from line `00` to `12`.
2. For **each** line, write one short sentence: what that instruction changes (accumulator, memory, or “jump to …”).
3. After all lines, write **one** summary sentence: what the whole program prints and how the input relates to that answer.
4. Trace at least one example input by hand (see check table).

## Check examples

Assume you type one number at line `00` (it goes into memory `[0]`).

| Input at line 00 | Printed at line 11 | Idea |
|------------------|--------------------|------|
| `8` | `3` | Halve `8` → `4` → `2` → `1` → `0`; count halvings. |
| `10` | `3` | `10→5→2→1→0` (integer division drops remainders). |
| `1` | `0` | First `DIV 2` gives `0`, loop exits immediately. |

## Little helpers

<details>
<summary>Where does the loop start and end?</summary>

The loop **starts** at line `03` (`LDA [0]`). Line `10` jumps back to `03`. Line `05` jumps **out** to `11` when the accumulator is zero after `DIV 2`.

</details>

<details>
<summary>What is memory `[1]` for?</summary>

Line `01`–`02` set `[1]` to `0`. Inside the loop, lines `07`–`09` add `1` to `[1]` each time the halving step did **not** end the program. So `[1]` counts loop rounds.

</details>

<details>
<summary>What does DIV 2 do to odd numbers?</summary>

Integer division: `7 DIV 2` is `3`, not `3.5`. Remainders are dropped.

</details>

## Done when

- [ ] You have one explanation sentence per line (`00`–`12`).
- [ ] Your summary matches the check rows for `8` and `10`.
- [ ] You can point to line `05` and say when the jump to `11` happens.

Back to [Exercise 05](../README.md).
