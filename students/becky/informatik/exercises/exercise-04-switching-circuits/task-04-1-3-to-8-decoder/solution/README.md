# Sample solution · Task 04_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written table — no compile step. Match the finished table at the end.

## How it works, step by step

### 1. Aim

Fill the truth table for a **3-to-8 decoder**.

### 2. Picture first

> [!PICTURE]
> A hotel with 8 rooms. You type a room number with three switches (`A2 A1 A0`). Exactly **one** door lamp turns on. That lamp’s number is the room number you typed.

### 3. Count the rows

Three switches → `2³ = 8` rows.  
List them from `000` to `111`. One idea: go like counting.

### 4. The one rule (say it out loud)

Read `A2 A1 A0` as a binary number.  
That number is the index `i`.  
Only `Yi` is **1**. Every other `Y` is **0**.

*Why?* A decoder picks **one** door. Never two. Never zero.

### 5. Walk row by row (tiny checks)

| Inputs `A2 A1 A0` | Binary value | Which lamp? |
|-------------------|--------------|-------------|
| `0 0 0` | 0 | only `Y0 = 1` |
| `0 0 1` | 1 | only `Y1 = 1` |
| `0 1 0` | 2 | only `Y2 = 1` |
| `0 1 1` | 3 | only `Y3 = 1` |
| `1 0 0` | 4 | only `Y4 = 1` |
| `1 0 1` | 5 | only `Y5 = 1` |
| `1 1 0` | 6 | only `Y6 = 1` |
| `1 1 1` | 7 | only `Y7 = 1` |

*Mini-check:* `A2` is the “4s” place (left). `A0` is the “1s” place (right).

### 6. Final answer — full table

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

### 7. Spot-check

- Row `0 1 0`: only `Y2` is 1? Yes.
- Every row has exactly one `1` among the Y columns? Yes.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Several `1`s in one row | Not a decoder | Exactly one output is hot |
| `A0` treated as the high bit | Wrong `Yi` lit | `A2` is the 4s place |
| Missing a row | Incomplete table | Always 8 rows for 3 inputs |

Back to [Task 04_1](../README.md).
