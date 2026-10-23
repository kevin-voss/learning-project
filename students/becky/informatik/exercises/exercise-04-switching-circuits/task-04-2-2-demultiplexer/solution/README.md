# Sample solution · Task 04_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written table — no compile step. Match the finished table at the end.

## How it works, step by step

### 1. Aim

Fill the truth table for a **2-demultiplexer** (1-to-2 demux).

### 2. Picture first

> [!PICTURE]
> One letter (`D`) and two mailboxes (`Y0`, `Y1`). A lever (`S`) chooses the mailbox. The letter goes into **that** mailbox. The other mailbox stays empty (`0`).

### 3. Name the wires

| Wire | Job |
|------|-----|
| `D` | the letter (data: 0 or 1) |
| `S` | the lever (select) |
| `Y0` | left mailbox |
| `Y1` | right mailbox |

### 4. The two rules (say them out loud)

1. If `S = 0` → letter goes to `Y0`. So `Y0 = D`, and `Y1 = 0`.
2. If `S = 1` → letter goes to `Y1`. So `Y1 = D`, and `Y0 = 0`.

*Why?* A demux steers **one** data wire to **one** chosen output.

### 5. Build every row (four rows — two inputs)

**Row `D=0`, `S=0`**

- Lever points left (`Y0`).
- Letter is empty (`0`).
- → `Y0 = 0`, `Y1 = 0`

**Row `D=0`, `S=1`**

- Lever points right (`Y1`).
- Letter is still empty.
- → `Y0 = 0`, `Y1 = 0`

**Row `D=1`, `S=0`**

- Lever points left.
- Letter is full (`1`).
- → `Y0 = 1`, `Y1 = 0`

**Row `D=1`, `S=1`**

- Lever points right.
- Letter is full.
- → `Y0 = 0`, `Y1 = 1`

### 6. Final answer

| D | S | Y0 | Y1 |
|---|---|----|----|
| 0 | 0 | 0  | 0  |
| 0 | 1 | 0  | 0  |
| 1 | 0 | 1  | 0  |
| 1 | 1 | 0  | 1  |

Optional formulas (same meaning):

```text
Y0 = D AND NOT S
Y1 = D AND S
```

### 7. Spot-check

- When `D = 1` and `S = 0`, is only `Y0` on? Yes.
- Can both `Y0` and `Y1` be 1 at once? No — that would be wrong for a demux.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Both outputs copy `D` | Not a demux | Only one output is active |
| Swapping `Y0` / `Y1` for `S` | Mirrored table | `S = 0` → `Y0`; `S = 1` → `Y1` |
| Treating it like a decoder (no `D`) | Missing data column | Keep `D` as an input |

Back to [Task 04_2](../README.md).
