# Sample solution · Task 04_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written table — no compile step. Match the table below.

## How it works, step by step

The binary value of `A2 A1 A0` is the index of the output that becomes 1.

| A2 | A1 | A0 | Y0 | Y1 | Y2 | Y3 | Y4 | Y5 | Y6 | Y7 |
|----|----|----|----|----|----|----|----|----|----|----|
| 0  | 0  | 0  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  |
| 0  | 0  | 1  | 0  | 1  | 0  | 0  | 0  | 0  | 0  | 0  |
| 0  | 1  | 0  | 0  | 0  | 1  | 0  | 0  | 0  | 0  | 0  |
| 0  | 1  | 1  | 0  | 0  | 0  | 1  | 0  | 0  | 0  | 0  |
| 1  | 0  | 0  | 0  | 0  | 0  | 0  | 1  | 0  | 0  | 0  |
| 1  | 0  | 1  | 0  | 0  | 0  | 0  | 0  | 1  | 0  | 0  |
| 1  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 1  | 0  |
| 1  | 1  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 1  |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Several `1`s in one row | Not a decoder | Exactly one output is hot |
| `A0` treated as the high bit | Wrong `Yi` lit | `A2` is the 4s place |
| Missing a row | Incomplete table | Always 8 rows for 3 inputs |

Back to [Task 04_1](../README.md).
