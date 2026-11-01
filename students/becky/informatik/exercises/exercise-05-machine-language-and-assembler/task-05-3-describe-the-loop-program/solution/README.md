# Solution · Task 05_3

## Aim

Explain each line of the given program and say what it prints.

## Rules on the table

| Instruction | Role in this program |
|-------------|------------------------|
| `INP [0]` | User’s number lives in `[0]`. |
| `LDA 0` / `ADD 1` | Load **immediate** constants (`0` and `1`). |
| `LDA [0]` / `STA [0]` / `STA [1]` | Load or store **memory** cells. |
| `DIV 2` | Integer halving of the accumulator. |
| `JEZ 11` | Exit the loop when halving hits `0`. |
| `JMP 03` | Repeat from line `03`. |

## Line-by-line

| Line | Instruction | What happens |
|------|-------------|--------------|
| 00 | `INP [0]` | Read the user’s number into memory `[0]`. |
| 01 | `LDA 0` | Load the constant `0` into the accumulator. |
| 02 | `STA [1]` | Store `0` in `[1]` — start the **counter** at zero. |
| 03 | `LDA [0]` | **Loop entry:** copy the current value in `[0]` into the accumulator. |
| 04 | `DIV 2` | Integer-divide the accumulator by `2`. |
| 05 | `JEZ 11` | If the result is `0`, jump to line `11` (print and stop looping). |
| 06 | `STA [0]` | Otherwise write the halved value back into `[0]`. |
| 07 | `LDA [1]` | Load the counter. |
| 08 | `ADD 1` | Add `1` to the counter. |
| 09 | `STA [1]` | Save the updated counter. |
| 10 | `JMP 03` | Go back to line `03` for another halving step. |
| 11 | `OUT [1]` | Print the counter in `[1]`. |
| 12 | `HLT` | Stop. |

## What the whole program does (summary)

It **counts how many times you can integer-halve the input** stored in `[0]` **before the halved value becomes `0`**, and prints that count from `[1]`.

Equivalently: keep replacing `n` with `⌊n/2⌋` until `n` is `0`; the printed value is the number of replacements (for `n ≥ 1`).

## Trace input `8`

| Visit | After line | `[0]` | `[1]` | Acc after `DIV 2` | Branch |
|-------|------------|-------|-------|---------------------|--------|
| Start | 02 | `8` | `0` | — | — |
| Loop 1 | 09 | `4` | `1` | `4` | not zero → continue |
| Loop 2 | 09 | `2` | `2` | `2` | continue |
| Loop 3 | 09 | `1` | `3` | `1` | continue |
| Exit | 05 | `1` | `3` | `0` | `JEZ 11` → print **`3`** |

## Trace input `10`

`10 → 5 → 2 → 1 → 0` → three successful loop bodies → prints **`3`**.

## Trace input `1`

Line `03`–`05`: acc `1`, `DIV 2` → `0`, jump to `11` without running `06`–`09` → `[1]` still **`0`**.

## Final answer

**Example:** input `8` → output **`3`**.

**One-sentence story:** The program repeatedly halves the input in `[0]` until that halving yields zero, counting each halving step in `[1]`, then prints the counter.

## Common mistakes

| Mistake | Why it is wrong |
|---------|-----------------|
| “Prints the input” | Line `11` prints `[1]`, the counter, not `[0]`. |
| Counting line `03` as a halving | The halving is `DIV 2`; the counter bumps only when you pass `06`–`09`. |
| Using real division | `7 DIV 2` is `3`, not `3.5`. |
| Forgetting `JEZ` | When halving gives `0`, you **do not** store it — you exit to print. |

Back to [Task 05_3](../README.md).
