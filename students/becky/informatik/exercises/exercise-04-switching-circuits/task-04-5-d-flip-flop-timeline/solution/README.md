# Sample solution · Task 04_5 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written timeline — no compile step. If your paper’s `CLK`/`D` differ, recompute with the same rule.

## How it works, step by step

Assumption: `Q = 0` just before `t = 0`. High-active level-triggered: follow `D` while `CLK = 1`.

| t | CLK | D | Q | Why |
|---|-----|---|---|-----|
| 0 | 0 | 1 | **0** | hold initial 0 |
| 1 | 1 | 0 | **0** | follow D → 0 |
| 2 | 1 | 1 | **1** | follow D → 1 |
| 3 | 0 | 1 | **1** | hold |
| 4 | 1 | 0 | **0** | follow D → 0 |
| 5 | 0 | 1 | **0** | hold |

Filled row:

| t | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Q | 0 | 0 | 1 | 1 | 0 | 0 |

Optional `Q̄`: `1 1 0 0 1 1`.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Sampling only on 0→1 edges | Misses changes while CLK stays 1 | Level = whole high phase |
| Updating Q while CLK = 0 | Q flips with D too often | Hold when clock is low |
| Forgetting the value from the previous t | Random row | Always walk left → right |

Back to [Task 04_5](../README.md).
