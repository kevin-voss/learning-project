# Sample solution · Task 03_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written values — no compile step. Follow the tiny steps, then match `s` and `ü`.

## How it works, step by step

### Step 1 — Read what the paper already gave you

Two vertical input wires. Each has a little box with **`1`**.

So both inputs are **1**. You do not choose them — they are fixed for this question.

### Step 2 — Name the two gates

| Symbol on the paper | Gate | Output label | Everyday name |
|---------------------|------|--------------|---------------|
| `=1` | XOR | **`s`** | Summe / **sum** |
| `&` | AND | **`ü`** | Übertrag / **carry** |

Together this is a **half adder**: add two bits, get a ones digit and a carry. No third “carry in” wire.

```text
      ┌───┐
      │ 1 │                    ┌─────┐
      └─┬─┘                 ┌──┤ =1  ├──► s
        ●───────────────────┤  └─────┘
        ●───────────────────┤  ┌─────┐
        │                   └──┤  &  ├──► ü
      ┌─┴─┐                    └─────┘
      │ 1 │
      └───┘
```

### Step 3 — Compute `s` (the XOR)

XOR rule in one sentence: output is **1** when the two inputs are **different**, and **0** when they are the **same**.

```text
  1  XOR  1  →  same  →  s = 0
```

Tiny table if you like:

| In1 | In2 | XOR |
|-----|-----|-----|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | **0** ← our row |

**→ `s = 0`**

### Step 4 — Compute `ü` (the AND)

AND rule: output is **1** only when **both** inputs are 1.

```text
  1  AND  1  →  ü = 1
```

**→ `ü = 1`**

### Step 5 — Why those names make sense (everyday adding)

Add in decimal: **1 + 1 = 2**.

Write **2** in binary with two columns:

```text
  carry →  1
  ones  →  0      because 2 = "10" in binary
```

So:

- ones digit = **`s = 0`**
- spill to the next column = **`ü = 1`**

Same answer, different picture.

### Final answers

| Output | Value |
|--------|-------|
| `s` | **0** |
| `ü` | **1** |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `s = 1` for 1+1 | Treated XOR like OR | XOR is 0 when inputs **match** |
| Swapping `s` and `ü` | Carry on the XOR line | Sum = XOR (`=1`), carry = AND (`&`) |
| Thinking full adder | Looking for a third input | Half adder has only two inputs |
| Using decimal 2 as the answer for `s` | Wrote `2` | Each wire is a **bit**: 0 or 1 only |

Back to [Task 03_4](../README.md).
