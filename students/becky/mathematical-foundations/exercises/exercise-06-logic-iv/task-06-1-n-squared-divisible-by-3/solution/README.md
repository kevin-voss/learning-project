# Sample solution · Task 06_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Match the steps below. Your algebra must end with *n*² = 3 × (an integer).

## How it works, step by step

### 1. Aim

Show: **if** 3 divides *n*, **then** 3 divides *n*².

In symbols: 3 \| *n* ⇒ 3 \| *n*².

### 2. Methods on the table

| Method | Idea | When you choose it |
|--------|------|--------------------|
| **Direct proof** | Assume the if-part; derive the then-part | Sheet says “direct proof” — **this task** |
| Contradiction | Assume the then-part fails; find a clash | Not asked here |
| Induction | Base + step for all *n* | Overkill for a single “if … then …” |

**Choose direct proof.**  
*Why?* The claim has one “if … then …” shape. You already know *n* is a multiple of 3; you only unpack that and square.

### 3. What we assume and what we want

- **Assume (if-part):** 3 divides *n*.
- **Want (then-part):** 3 divides *n*².

*Mini-check:* we do **not** assume 3 divides *n*² yet — that is what we must earn.

### 4. Use the definition of “divides”

**What we see:** “3 divides *n*”.  
**Rule that matches:** *a* \| *b* means *b* = *a* · *k* for some integer *k*.  
**Why this rule:** it turns “divides” into algebra we can square.

So there is an integer *k* with:

```text
n = 3k
```

*Why *k* is enough:* we never need the exact value of *k* — only that it is an integer.

### 5. Square both sides

```text
n² = (3k)² = 9k²
```

*Why expand the square:* we need to see a factor 3 in front.

### 6. Factor out 3

```text
n² = 9k² = 3 · (3k²)
```

The bracket 3*k*² is an integer (3 and *k*² are integers).

*Mini-check:* pick *k* = 2 → *n* = 6, *n*² = 36, 3*k*² = 12, and 3 · 12 = 36 ✓

### 7. Conclusion

Since *n*² = 3 · (3*k*²) and 3*k*² is an integer, **3 divides *n*²**.

That is exactly what the “then” part asked for. The direct proof is complete.

**Final answer:** If 3 \| *n*, then *n* = 3*k* for some integer *k*, so *n*² = 3(3*k*²), hence 3 \| *n*².

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Assume 3 divides *n*² at the start | You prove nothing new | Only assume 3 \| *n* |
| Stop at *n*² = 9*k*² without factoring | Reader may not see the 3 out front | Write *n*² = 3(3*k*²) |
| Use one example (*n* = 6) as the whole proof | Examples do not cover all multiples of 3 | Keep the letter *k* |

Back to [Task 06_1](../README.md).
