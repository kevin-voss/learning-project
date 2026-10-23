# Sample solution · Task 01_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Match the bits below.

## How it works, step by step

### 1. Aim

Find the **binary complement** of this 8-bit pattern:

```text
01011001b
```

Keep all **8 bits** at the end.

### 2. Picture first

> [!PICTURE]
> Eight little lamps in a row. Each lamp is **off (0)** or **on (1)**.  
> Binary complement means: flip every lamp, then turn the rightmost “+1” bump on (add one in binary).

### 3. Recipes on the table

| Recipe | Steps | When the sheet wants it |
|--------|-------|-------------------------|
| **Binary / two’s complement** | Invert all bits, then **add 1** | This task — “binary complement” |
| Ones’ complement only | Invert all bits, **stop** | Different topic — not enough here |
| Flip left↔right | Reverse the bit string | Never — that is mirroring, not complement |

### 4. Thinking — which recipe, and why

| Question | Answer |
|----------|--------|
| What does the sheet ask? | “Binary complement” of an 8-bit pattern |
| Which recipe matches? | Invert, then add 1 |
| Why not stop after invert? | That is only ones’ complement — wrong name, wrong answer |
| Why not reverse the bits? | Complement flips each lamp **where it sits** |

Say the two jobs out loud:

1. **Invert** every bit: `0` becomes `1`, `1` becomes `0`.
2. **Add 1** in binary to that new pattern.

Do job 1 first. Then job 2. Never skip job 2.

### 5. Job 1 — invert, bit by bit

Write the bits under each other. Do **not** reverse the row.

| Place | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|-------|---|---|---|---|---|---|---|---|
| Given | 0 | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| Flip  | 1 | 0 | 1 | 0 | 0 | 1 | 1 | 0 |

After invert:

```text
10100110b
```

*Why not reverse?* Flip means “change this lamp where it sits”. It does not mean “mirror the row”.

### 6. Job 2 — add one

*Why add 1 now?*  
Recipe step 2. The invert alone is not the binary complement yet.

```text
  10100110
+ 00000001
----------
  10100111
```

Look at the rightmost bit only:

- It was `0`.
- Add `1` → it becomes `1`.
- No carry to the left. Done.

### 7. Final answer

```text
10100111b
```

### 8. Mini-checks

- Still 8 bits? Yes.
- Did you only invert and stop? That would be `10100110` — **wrong**. You still need +1.
- Optional story: the sheet says `01011001b` is 89 in decimal. The complement pattern is what computers use for −89 in 8 bits.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Only invert, forget +1 | `10100110` | Binary complement needs the +1 step |
| Flip left↔right | Wrong pattern | Invert in place; do not reverse the string |
| Drop leading bits after +1 | Too few bits | Keep all 8 bits |

Back to [Task 01_1](../README.md).
