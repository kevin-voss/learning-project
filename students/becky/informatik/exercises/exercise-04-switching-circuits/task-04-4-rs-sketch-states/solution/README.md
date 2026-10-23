# Sample solution · Task 04_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written fill-in — no compile step. Prefer **your paper’s** printed bits if they differ from this rebuild.

## How it works, step by step

### 1. Aim

Fill the 0/1 boxes on an RS flip-flop sketch when `S = 0` and `R = 0` (hold).

### 2. Picture first

> [!PICTURE]
> Two NOR gates that talk to each other. Each gate’s output feeds the other gate. That loop is the “sticky” memory. When both buttons are off (`S = 0`, `R = 0`), the loop keeps the old bit.

### 3. Recall NOR (one line)

A NOR gate outputs **1** only when **both** inputs are **0**.  
Any input that is 1 forces the NOR output to 0.

### 4. What “hold” means here

`S = 0`, `R = 0` → nobody presses Set or Reset.  
So `Q` and `Q̄` stay as they already were — and they stay **opposites**.

Two normal hold states exist:

- stored **1**: `Q = 1`, `Q̄ = 0`
- stored **0**: `Q = 0`, `Q̄ = 1`

### 5. Case A — stored 1 (common on teaching sketches)

Start from: we already have `Q = 1` and `Q̄ = 0`.  
Filled sketch (matches the task’s “aim for” table):

```text
        S = 0
          |
          v
     +----[NOR]----+----> Q  = 1
     |      ^      |
     |      |      |
     |   from Q̄=0  |
     |             |
     |   from Q=1  |
     |      |      |
     |      v      |
     +----[NOR]----+----> Q̄ = 0
          ^
          |
        R = 0
```

Proof that this is stable (each NOR checked once):

| Gate | Inputs | NOR rule | Output |
|------|--------|----------|--------|
| Top → `Q` | `S=0`, `Q̄=0` | both 0 → 1 | `Q = 1` |
| Bottom → `Q̄` | `R=0`, `Q=1` | any 1 → 0 | `Q̄ = 0` |

Outputs match the inputs fed back into the other gate → the loop does not flip. Hold of **1** is proven.

| Wire | Value |
|------|-------|
| S | 0 |
| R | 0 |
| Q | 1 |
| Q̄ | 0 |

### 6. Case B — stored 0

Same hold inputs, opposite memory. Proof table:

| Gate | Inputs | NOR rule | Output |
|------|--------|----------|--------|
| Top → `Q` | `S=0`, `Q̄=1` | any 1 → 0 | `Q = 0` |
| Bottom → `Q̄` | `R=0`, `Q=0` | both 0 → 1 | `Q̄ = 1` |

Stable again — feedback matches.

| Wire | Value |
|------|-------|
| S | 0 |
| R | 0 |
| Q | 0 |
| Q̄ | 1 |

### 7. Final tip for the paper sketch

1. Copy every **printed** 0/1 from the sheet first.
2. Fill only the empty boxes.
3. Use NOR: both inputs 0 → output 1; otherwise output 0.
4. In a normal state, `Q` and `Q̄` are opposites.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Setting `Q = Q̄ = 0` under hold | Not a normal hold | Hold keeps opposites |
| Using NAND rules on a NOR sketch | Wrong outputs | NOR is 1 only for 0,0 |
| Ignoring the paper’s printed bit | “My” state ≠ sketch | Start from the non-gray numbers |

Back to [Task 04_4](../README.md).
