# Sample solution · Task 03_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answers — no compile step. Walk the tiny steps, then match the final table and L / NL boxes.

## How it works, step by step

### Step 1 — Remember the two rules

Think of `z` as a lamp on a wire between **+5 V** (high shelf) and **Masse** (floor).

| Kind | Looks like | Turns **on** (L) when gate is … | Job |
|------|------------|----------------------------------|-----|
| **PMOS** | circle on the gate | **0** | can pull `z` **up** to +5 V |
| **NMOS** | no circle | **1** | can pull `z` **down** to ground |

Off = **NL**. On = **L**.

### Step 2 — Read the wiring (what is special here?)

- **Pull-up:** two PMOS in **parallel** (side by side). One of them is enough to connect +5 V to `z`.
- **Pull-down:** two NMOS in **series** (one after the other). **Both** must be on to connect `z` to ground.

So:

- `z` becomes **0** only if the whole series chain conducts → both `x` and `y` are 1.
- Otherwise the path to ground is broken, and at least one PMOS still can pull up → `z` is **1**.

### Step 3 — Build the truth table, one row at a time

**Row `x=0`, `y=0`**

- Both PMOS gates are 0 → both PMOS = **L** → strong path to +5 V.
- Both NMOS gates are 0 → both NMOS = **NL** → no path to ground.
- **→ `z = 1`**

**Row `x=0`, `y=1`**

- PMOS on `x` (gate 0) = **L** → still a path to +5 V.
- NMOS on `y` is on, but NMOS on `x` is off → series chain **broken** → no path to ground.
- **→ `z = 1`**

**Row `x=1`, `y=0`**

- Same idea, swapped: PMOS on `y` = **L**; series NMOS still broken.
- **→ `z = 1`**

**Row `x=1`, `y=1`**

- Both PMOS gates are 1 → both PMOS = **NL** → no path to +5 V.
- Both NMOS gates are 1 → both NMOS = **L** → path to ground is open.
- **→ `z = 0`**

| x | y | z |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### Step 4 — Name the gate (part b)

Look at the table: the output is **0 only when every input is 1**. That is the definition of **NAND** (NOT-AND).

Not AND (AND would be 1 only for `1 1`). Not NOR (NOR is 1 only for `0 0`).

### Step 5 — Fill L / NL for `x = 1`, `y = 0` (part c)

Use **only** each transistor’s own gate. Do not guess from the neighbour.

```text
                         +5 V
                           |
              .------------+------------.
              |  pull-up                  |
              |  [ NL ]      [ L ]        |
              |   o           o           |
         1 ───|───┤           ├───────────|─── 0
          (x) |   +-----+-----+           |  (y)
              '---------+-----------------'
                        |
                        +------------------ z = 1
                        |
              .---------+-----------------.
              |  pull-down                |
              |       [ NL ]              |
         0 ───|─────────┤                 |  (y)
              |       [ L ]               |
         1 ───|─────────┤                 |  (x)
              '---------+-----------------'
                        |
                      Masse
```

| Transistor | Gate | L / NL | Tiny why |
|------------|------|--------|----------|
| PMOS left (`x`) | 1 | **NL** | PMOS is off at gate 1 |
| PMOS right (`y`) | 0 | **L** | PMOS is on at gate 0 → pulls `z` up |
| NMOS upper (`y`) | 0 | **NL** | NMOS is off at gate 0 → series chain broken |
| NMOS lower (`x`) | 1 | **L** | NMOS is on, but alone it cannot reach ground |

### Step 6 — Sense-check

Pull-up has an **L**, pull-down series is broken → lamp stays high → `z = 1`. That matches the truth-table row `1 0 → 1`. Good.

### Final answers

| Part | Answer |
|------|--------|
| **a** | Truth table above (`z` is 0 only for `x y = 1 1`) |
| **b** | **NAND** |
| **c** | PMOS(`x`): **NL** · PMOS(`y`): **L** · NMOS(`y`): **NL** · NMOS(`x`): **L** |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Calling it AND or NOR | Wrong name | Only NAND matches “0 only for 1 1” |
| Mixing PMOS / NMOS rules | Wrong L / NL | PMOS on at **0**; NMOS on at **1** |
| Thinking parallel NMOS | Wrong topology | Pull-down here is **series** |
| Marking both NMOS NL when one gate is 1 | Misses the on transistor | Each box follows **its** gate only |

Back to [Task 03_1](../README.md).
