# Sample solution · Task 04_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written fill-in — no compile step. Prefer **your paper’s** printed bits if they differ from the OCR rebuild.

## How it works, step by step

Given `S = 0`, `R = 0` (hold). The cell keeps whatever bit it already had.

### Case A — stored 1 (common on teaching sketches)

```text
S=0 ──┐
      NOR ── Q = 1
Q̄=0 ─┘

R=0 ──┐
      NOR ── Q̄ = 0
Q=1 ──┘
```

| Wire | Value |
|------|-------|
| S | 0 |
| R | 0 |
| Q | 1 |
| Q̄ | 0 |

Check: top NOR(`0`,`0`) → `1`. Bottom NOR(`0`,`1`) → `0`.

### Case B — stored 0

| Wire | Value |
|------|-------|
| S | 0 |
| R | 0 |
| Q | 0 |
| Q̄ | 1 |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Setting `Q = Q̄ = 0` under hold | Not a normal hold | Hold keeps opposites |
| Using NAND rules on a NOR sketch | Wrong outputs | NOR is 1 only for 0,0 |
| Ignoring the paper’s printed bit | “My” state ≠ sketch | Start from the non-gray numbers |

Back to [Task 04_4](../README.md).
