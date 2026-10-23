# Sample solution · Task 04_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written table — no compile step.

## How it works, step by step

`S` chooses the door. `D` is the letter that goes through that door. The other door stays 0.

| D | S | Y0 | Y1 |
|---|---|----|----|
| 0 | 0 | 0  | 0  |
| 0 | 1 | 0  | 0  |
| 1 | 0 | 1  | 0  |
| 1 | 1 | 0  | 1  |

In formulas: `Y0 = D AND NOT S`, `Y1 = D AND S`.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Both outputs copy `D` | Not a demux | Only one output is active |
| Swapping `Y0` / `Y1` for `S` | Mirrored table | `S = 0` → `Y0`; `S = 1` → `Y1` |
| Treating it like a decoder (no `D`) | Missing data column | Keep `D` as an input |

Back to [Task 04_2](../README.md).
