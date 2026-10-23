# Sample solution · Task 04_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written table — no compile step. Match the finished table at the end.

## How it works, step by step

### 1. Aim

Complete the truth table for a **NOR-based RS flip-flop**.

### 2. Picture first

> [!PICTURE]
> A sticky light switch that **remembers**.  
> **Set** turns the light on and it stays on.  
> **Reset** turns the light off and it stays off.  
> If you press nothing, the light stays as it was.

The light is `Q`. The opposite lamp is `Q̄` (Q-bar).

### 3. Name the buttons

| Input | Everyday name | What it wants |
|-------|---------------|---------------|
| `S` | Set | make `Q = 1` |
| `R` | Reset | make `Q = 0` |

### 4. Four cases — one idea each

**Case 1 — both off: `S = 0`, `R = 0`**

Nobody presses a button.  
The light keeps its old value.

- Next `Q` = old `Q`
- Next `Q̄` = old `Q̄`
- Note: **hold / store**

*Why?* This is the memory. The bit stays put.

**Case 2 — reset: `S = 0`, `R = 1`**

You press Reset only.  
Light goes **off**.

- Next `Q` = `0`
- Next `Q̄` = `1`
- Note: **reset**

**Case 3 — set: `S = 1`, `R = 0`**

You press Set only.  
Light goes **on**.

- Next `Q` = `1`
- Next `Q̄` = `0`
- Note: **set**

**Case 4 — both on: `S = 1`, `R = 1`**

You press Set and Reset at the same time.  
That fights itself. The cell breaks.

- Next `Q` / `Q̄`: mark as **—** (undefined)
- Note: **forbidden / invalid**

*Why?* For a NOR RS cell, both outputs want to be 0. Then `Q` and `Q̄` are no longer clean opposites.

### 5. Final answer

| S | R | Next Q | Next Q̄ | Note |
|---|---|--------|---------|------|
| 0 | 0 | Q      | Q̄      | hold / store |
| 0 | 1 | 0      | 1       | reset |
| 1 | 0 | 1      | 0       | set |
| 1 | 1 | —      | —       | forbidden (invalid) |

### 6. One-sentence summary

An RS flip-flop stores one bit in `Q`.  
`S` turns it on, `R` turns it off, both off keeps it, both on is forbidden.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Mixing up set and reset | `S` clears the bit | `S` → 1, `R` → 0 |
| Filling `1 1` with tidy `0 0` | Hides the hazard | Mark forbidden |
| Using NAND-RS polarity here | `S = R = 0` looks “bad” | This sheet uses the NOR form |

Back to [Task 04_3](../README.md).
