# Solution · Task 05_2

## Aim

Write assembler that computes \(z = x^2 + 2y + c\) and explain each line.

## Memory plan

| Cell | Variable |
|------|----------|
| `[0]` | `z` (result) |
| `[1]` | `x` |
| `[2]` | `y` |
| `[3]` | `c` |

## Sample program

```text
00  INP [1]
01  INP [2]
02  INP [3]
03  LDA [1]
04  MUL [1]
05  ADD [2]
06  ADD [2]
07  ADD [3]
08  STA [0]
09  OUT [0]
10  HLT
```

## Line-by-line (what each instruction does)

| Line | Instruction | Explanation |
|------|-------------|-------------|
| 00 | `INP [1]` | Read `x` from the keyboard into memory `[1]`. |
| 01 | `INP [2]` | Read `y` into memory `[2]`. |
| 02 | `INP [3]` | Read `c` into memory `[3]`. |
| 03 | `LDA [1]` | Load `x` into the accumulator. |
| 04 | `MUL [1]` | Multiply the accumulator by `x` → accumulator holds `x²`. |
| 05 | `ADD [2]` | Add `y` once → accumulator holds `x² + y`. |
| 06 | `ADD [2]` | Add `y` again → accumulator holds `x² + 2y`. |
| 07 | `ADD [3]` | Add `c` → accumulator holds `x² + 2y + c`. |
| 08 | `STA [0]` | Store the result into `[0]` as `z`. |
| 09 | `OUT [0]` | Print `z`. |
| 10 | `HLT` | Stop. |

## Why this order works

1. **Inputs first** — All three values sit in jars before arithmetic.
2. **`x²` in the accumulator** — One load and one multiply use the same jar twice.
3. **`2y` as two adds** — There is no `MUL 2` required; two `ADD [2]` steps match the formula.
4. **`c` last** — One add finishes the expression before store/print.

## Trace the check examples

**Row 1:** `x=3`, `y=4`, `c=5`

| Step | Accumulator | Note |
|------|-------------|------|
| After `MUL [1]` | `9` | `3 × 3` |
| After second `ADD [2]` | `17` | `9 + 4 + 4` |
| After `ADD [3]` | `22` | `+ 5` |

**Row 2:** `x=2`, `y=1`, `c=0` → `4 + 2 + 0 = 6`.

**Row 3:** `x=0`, `y=5`, `c=1` → `0 + 10 + 1 = 11`.

## Final answer

Program above; for the sheet’s first check row it prints **`22`**.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Only one `ADD [2]` | You need **two** adds for `2y`. |
| `MUL 2` instead of two adds | Allowed if your course says so — but two adds match the formula literally. |
| Square after adding `y` | Do **`x²` first**, then add `y` twice. |
| Store before adding `c` | `ADD [3]` must come **before** `STA [0]`. |

Back to [Task 05_2](../README.md).
