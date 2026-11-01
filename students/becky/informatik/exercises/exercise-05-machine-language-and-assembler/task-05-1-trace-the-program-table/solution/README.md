# Solution · Task 05_1

## Aim

Fill the trace table: after each instruction, write the accumulator and memory `[0]`, `[1]`, `[2]`.

## Rules on the table

| Tool | When to use it |
|------|----------------|
| `INP [n]` | Keyboard → memory only; accumulator stays `-`. |
| `LDA n` | Load memory `[n]` → accumulator. |
| `ADD [n]` | Add memory `[n]` to accumulator. |
| `MUL n` | Multiply accumulator by constant `n`. |
| `STA [n]` | Copy accumulator → memory `[n]`. |
| `OUT [n]` | Print memory `[n]`; table values unchanged. |

## Step by step

**Given after line 01:** `[1]=18`, `[2]=5`, accumulator `-`, `[0]` empty (`-`).

1. **Line 02 `LDA 2`** — Load jar `[2]` → accumulator `5`. Memory unchanged.

   | Acc | `[0]` | `[1]` | `[2]` |
   |-----|-------|-------|-------|
   | `5` | `-` | `18` | `5` |

2. **Line 03 `ADD [1]`** — `5 + 18 = 23` in the accumulator.

   | Acc | `[0]` | `[1]` | `[2]` |
   |-----|-------|-------|-------|
   | `23` | `-` | `18` | `5` |

3. **Line 04 `MUL 3`** — `23 × 3 = 69`.

   | Acc | `[0]` | `[1]` | `[2]` |
   |-----|-------|-------|-------|
   | `69` | `-` | `18` | `5` |

4. **Line 05 `ADD [2]`** — `69 + 5 = 74`.

   | Acc | `[0]` | `[1]` | `[2]` |
   |-----|-------|-------|-------|
   | `74` | `-` | `18` | `5` |

5. **Line 06 `STA [0]`** — Store `74` into `[0]`. Accumulator still `74`.

   | Acc | `[0]` | `[1]` | `[2]` |
   |-----|-------|-------|-------|
   | `74` | `74` | `18` | `5` |

6. **Line 07 `OUT [0]`** — Prints `74`. Table unchanged.

7. **Line 08 `HLT`** — Stop. Same row as after line 07.

## Final answer

**Printed output:** `74`.

**Why in one breath:** The program computes `(5 + 18) × 3 + 5 = 74` using jars `[1]` and `[2]`, saves the result in `[0]`, and prints it.

## Common mistakes

| Mistake | What went wrong |
|---------|-----------------|
| Accumulator `-` after `LDA` | After `LDA`, the accumulator always holds a number. |
| `[0]` changes on `ADD` | Only `INP` and `STA` write memory. |
| `MUL 3` adds 3 | `MUL` multiplies; `ADD 3` would add. |
| Forgot `ADD [2]` | Stopping at `69` misses the last jar. |

Back to [Task 05_1](../README.md).
