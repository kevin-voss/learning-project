# Sample solution · Task 05_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written formula — no compile step. Your answer should match the final line below (up to harmless spacing).

## How it works, step by step

Start from the negation of `F`:

```text
¬ ∀x ∃y ∀z P(x, y, z)
```

Push `¬` inward; each quantifier flips:

1. `¬ ∀x …` → `∃x ¬ …`  
   ```text
   ∃x ¬ ∃y ∀z P(x, y, z)
   ```

2. `¬ ∃y …` → `∀y ¬ …`  
   ```text
   ∃x ∀y ¬ ∀z P(x, y, z)
   ```

3. `¬ ∀z …` → `∃z ¬ …`  
   ```text
   ∃x ∀y ∃z ¬P(x, y, z)
   ```

**Answer:**

```text
∃x ∀y ∃z ¬P(x, y, z)
```

No quantifier has a negation immediately in front of it. The only `¬` sits on the predicate `P`.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Stopping at `¬ ∀x ∃y ∀z P(…)` | Still has `¬` before a quantifier | Keep flipping until `¬` reaches `P` |
| Flipping only some quantifiers | Wrong meaning | Flip **every** quantifier the `¬` passes |
| Writing `∃x ∃y ∃z ¬P(…)` | Lost the middle `∀` | Order after flips: `∃ ∀ ∃` |

Back to [Task 05_3](../README.md).
