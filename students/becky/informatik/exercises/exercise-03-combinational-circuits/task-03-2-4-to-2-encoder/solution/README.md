# Sample solution · Task 03_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written table — no compile step. Follow the tiny steps, then match the matrix.

## How it works, step by step

### Step 1 — What an encoder is for

Picture four doorbells (`I0` … `I3`). Only **one** rings at a time. You want a short code that answers: “which doorbell?”

```text
  I0..I3 ──► [4-to-2 encoder] ──► A1 A0
```

Four wires in → two bits out. That short code is binary.

### Step 2 — One-hot inputs only

A basic 4-to-2 truth matrix lists only the **valid** cases: exactly one `Ii` is 1, the others are 0.

You do **not** need all 16 possible input combinations for this sheet.

### Step 3 — How to turn an index into `A1 A0`

`A1` is the **high** bit (worth 2). `A0` is the **low** bit (worth 1).

| Active input | Index | Split into 2 + 1 | A1 | A0 |
|--------------|-------|------------------|----|----|
| `I0` | 0 | 0+0 | 0 | 0 |
| `I1` | 1 | 0+1 | 0 | 1 |
| `I2` | 2 | 2+0 | 1 | 0 |
| `I3` | 3 | 2+1 | 1 | 1 |

### Step 4 — Write the matrix row by row

For each row: put a single `1` under the active `Ii`, zeros elsewhere, then copy `A1 A0` from the table above.

| I3 | I2 | I1 | I0 | A1 | A0 | Tiny story |
|----|----|----|----|----|----|------------|
| 0  | 0  | 0  | 1  | 0  | 0  | doorbell 0 → code `00` |
| 0  | 0  | 1  | 0  | 0  | 1  | doorbell 1 → code `01` |
| 0  | 1  | 0  | 0  | 1  | 0  | doorbell 2 → code `10` |
| 1  | 0  | 0  | 0  | 1  | 1  | doorbell 3 → code `11` |

### Step 5 — Sense-check one row out loud

“`I2` is on → that is number 2 → binary of 2 is `10` → `A1=1`, `A0=0`.”

If that sentence feels natural, the matrix is right.

### Step 6 — Encoder vs decoder (so you do not mix them up)

| | Encoder (this task) | Decoder (later / other sheet) |
|--|---------------------|-------------------------------|
| Inputs | many, one-hot | few bits (a code) |
| Outputs | few bits (a code) | many, one-hot |
| Picture | “which doorbell?” → number | number → “which lamp?” |

### Final answer

The four-row matrix in Step 4 (`I0→00`, `I1→01`, `I2→10`, `I3→11`).

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Swapping `A1` and `A0` | `I2` becomes `01` | High bit is `A1` (the 2s place) |
| Filling all 16 input rows | Huge unused table | Basic matrix = four one-hot rows |
| Treating it like a decoder | Many 1s on the **outputs** | Here the single 1 sits on an **input** |

Back to [Task 03_2](../README.md).
