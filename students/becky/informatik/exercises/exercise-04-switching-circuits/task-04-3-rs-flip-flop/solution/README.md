# Sample solution · Task 04_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written table — no compile step.

## How it works, step by step

Think of two sticky buttons: **Set** forces `Q = 1`, **Reset** forces `Q = 0`. Both off → keep the old bit. Both on → broken state.

| S | R | Next Q | Next Q̄ | Note |
|---|---|--------|---------|------|
| 0 | 0 | Q      | Q̄      | hold / store |
| 0 | 1 | 0      | 1       | reset |
| 1 | 0 | 1      | 0       | set |
| 1 | 1 | —      | —       | forbidden (invalid) |

### Short description

An RS flip-flop stores one bit in `Q`. `S = 1` sets that bit to 1; `R = 1` clears it to 0; `S = R = 0` keeps the stored bit; `S = R = 1` must not be used.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Mixing up set and reset | `S` clears the bit | `S` → 1, `R` → 0 |
| Filling `1 1` with `0 0` without a warning | Looks “tidy” but hides the hazard | Mark forbidden |
| Using NAND-RS polarity here | `S = R = 0` becomes the bad row | This sheet row uses the NOR form |

Back to [Task 04_3](../README.md).
