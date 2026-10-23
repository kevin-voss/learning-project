# Sample solution · Task 04_5 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written timeline — no compile step. If your paper’s `CLK`/`D` differ, recompute with the **same rule**.

## How it works, step by step

### 1. Aim

Fill `Q` for times `t = 0` … `t = 5` for a **level-triggered** D flip-flop.

### 2. Picture first

> [!PICTURE]
> A photocopier with a button (`CLK`) and a paper on the glass (`D`).  
> While the button is **held down** (`CLK = 1`), the copy (`Q`) keeps matching the paper.  
> When the button is **up** (`CLK = 0`), the last copy stays — even if you change the paper.

### 3. The only two rules

1. If `CLK = 1` → `Q` becomes whatever `D` is now. (**follow**)
2. If `CLK = 0` → `Q` stays what it was. (**hold**)

Walk **left to right**. Always use the `Q` from the previous time.

### 4. Starting value

Assume `Q = 0` just before `t = 0` (unless your paper prints another start).

### 5. Walk one time step at a time

Sticky note (same words as the task):

| CLK | Gate | What Q does |
|-----|------|-------------|
| `0` | closed / button up | **hold** |
| `1` | open / button down | **follow** `D` |

**t = 0** — `CLK = 0`, `D = 1`

- Clock closed → hold the start value.
- → `Q = 0`

*Why?* `D` is 1, but a closed clock does not allow copying yet.

**t = 1** — `CLK = 1`, `D = 0`

- Clock open → follow `D`.
- → `Q = 0`

**t = 2** — `CLK = 1`, `D = 1`

- Clock still open → follow the new `D`.
- → `Q = 1`

*Why?* Level-triggered means the **whole** time `CLK` is 1, not only the moment it rises.

**t = 3** — `CLK = 0`, `D = 1`

- Clock closed → hold the old `Q`.
- → `Q = 1` (even though `D` is still 1)

**t = 4** — `CLK = 1`, `D = 0`

- Clock open again → follow `D`.
- → `Q = 0`

**t = 5** — `CLK = 0`, `D = 1`

- Clock closed → hold.
- → `Q = 0` (`D` changed, but we ignore it)

### 6. Final answer

| t | CLK | D | Q | Why (short) |
|---|-----|---|---|-------------|
| 0 | 0 | 1 | **0** | hold initial 0 |
| 1 | 1 | 0 | **0** | follow D → 0 |
| 2 | 1 | 1 | **1** | follow D → 1 |
| 3 | 0 | 1 | **1** | hold |
| 4 | 1 | 0 | **0** | follow D → 0 |
| 5 | 0 | 1 | **0** | hold |

Filled `Q` row:

| t | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Q | 0 | 0 | 1 | 1 | 0 | 0 |

Optional `Q̄` (opposite each time): `1 1 0 0 1 1`.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Sampling only on 0→1 edges | Misses changes while CLK stays 1 | Level = whole high phase |
| Updating Q while CLK = 0 | Q flips with D too often | Hold when clock is low |
| Forgetting the value from the previous t | Random row | Always walk left → right |

Back to [Task 04_5](../README.md).
