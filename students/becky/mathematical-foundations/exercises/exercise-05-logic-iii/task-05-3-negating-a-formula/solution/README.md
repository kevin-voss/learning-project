# Sample solution · Task 05_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written formula — no compile step. Your answer should match the final line (spacing may differ).

## How it works, step by step

### 1. Aim

Negate

```text
F = ∀x ∃y ∀z P(x, y, z)
```

so that **no** `¬` sits immediately in front of a quantifier. The only `¬` should sit on `P`.

### 2. Sticky-note flip rules

| You see | You write |
|---------|-----------|
| `¬ ∀…` | `∃ ¬ …` |
| `¬ ∃…` | `∀ ¬ …` |

The `¬` walks inward; each lock it passes flips.

### 3. Start from ¬F

```text
¬ ∀x ∃y ∀z P(x, y, z)
```

Still has `¬` in front of `∀x` — not done yet.

### 4. Flip the outer ∀

```text
∃x ¬ ∃y ∀z P(x, y, z)
```

*Why:* `¬ ∀x …` becomes `∃x ¬ …`.

### 5. Flip the next ∃

```text
∃x ∀y ¬ ∀z P(x, y, z)
```

*Why:* `¬ ∃y …` becomes `∀y ¬ …`.

### 6. Flip the last ∀

```text
∃x ∀y ∃z ¬ P(x, y, z)
```

*Why:* `¬ ∀z …` becomes `∃z ¬ …`. Now `¬` touches only the predicate.

### 7. Final answer

```text
∃x ∀y ∃z ¬P(x, y, z)
```

Quantifier order after the walk: **∃ ∀ ∃** (started as ∀ ∃ ∀; each flipped once).

### 8. Mini-check

- No `¬∀` or `¬∃` left? Yes.
- Same three variables in the same left-to-right slots? Yes.
- Meaning in words: “There is an *x* such that for every *y* there is a *z* with ¬P(x,y,z).” That is exactly “not every *x* has a *y* that works for all *z*.”

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Stopping at `¬ ∀x ∃y ∀z P(…)` | Still has `¬` before a quantifier | Keep flipping until `¬` reaches `P` |
| Flipping only some quantifiers | Wrong meaning | Flip **every** quantifier the `¬` passes |
| Writing `∃x ∃y ∃z ¬P(…)` | Lost the middle `∀` | After flips the order is `∃ ∀ ∃` |

Back to [Task 05_3](../README.md).
