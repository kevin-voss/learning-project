# Sample solution · Task 05_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written formulas — no compile step. Match the shapes below (variable names may differ).

## How it works, step by step

Domain: `x, y ∈ ℝ`. Function: `f: ℝ → ℝ`.

### a) Monotonically increasing

“If the input does not get smaller, the output does not get smaller.”

```text
∀x ∀y ( x ≤ y  ⇒  f(x) ≤ f(y) )
```

### b) Strictly monotonically increasing

“A strictly larger input gives a strictly larger output.”

```text
∀x ∀y ( x < y  ⇒  f(x) < f(y) )
```

### c) Not point-symmetric

Point-symmetric about the origin means `∀x ( f(−x) = −f(x) )`.  
Negate: it fails for at least one real number.

```text
∃x ( f(−x) ≠ −f(x) )
```

Equivalent start form (then push `¬` inward if required): `¬ ∀x ( f(−x) = −f(x) )`.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Using `<` in (a) | Too strong — that is already “strict” | (a) uses `≤`, (b) uses `<` |
| Writing only `f(x) ≤ f(y)` without the premise | Misses “when *x* ≤ *y*” | Keep the implication |
| Negating point-symmetry as `∀x (f(−x) ≠ −f(x))` | Far too strong | One counterexample (`∃x`) is enough |

Back to [Task 05_2](../README.md).
