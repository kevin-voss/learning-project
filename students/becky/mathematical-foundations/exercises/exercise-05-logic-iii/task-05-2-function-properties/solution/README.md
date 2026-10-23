# Sample solution · Task 05_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written formulas — no compile step. Match the shapes below (variable names may differ).

## How it works, step by step

### 1. Aim

Write three properties of `f: ℝ → ℝ` as logic formulas.

Domain: `x, y ∈ ℝ`.

### 2. Part (a) — monotonically increasing

1. Everyday idea: “If the input does **not** get smaller, the output does **not** get smaller.”
2. Compare two inputs: pick any `x` and any `y`.
3. Premise: `x ≤ y` (input does not get smaller).
4. Conclusion: `f(x) ≤ f(y)` (output does not get smaller).
5. That must hold for **every** pair → two `∀`:

```text
∀x ∀y ( x ≤ y  ⇒  f(x) ≤ f(y) )
```

*Why `≤` not `<`?* “Monotonically” allows flat stretches; “strictly” is the next part.

### 3. Part (b) — strictly monotonically increasing

1. Same shape as (a).
2. Change both comparisons to **strict**: `x < y` and `f(x) < f(y)`.

```text
∀x ∀y ( x < y  ⇒  f(x) < f(y) )
```

*Check:* a strictly larger input must give a strictly larger output — no flats.

### 4. Part (c) — not point-symmetric about the origin

1. First write what point-symmetric **would** say:

```text
∀x ( f(−x) = −f(x) )
```

(“For every real *x*, the value at `−x` is the opposite of the value at *x*.”)

2. We need the **negation** of that: “it is **not** the case that every *x* works.”
3. Negating a `∀` gives an `∃`:

```text
¬ ∀x ( f(−x) = −f(x) )  ≡  ∃x ¬( f(−x) = −f(x) )  ≡  ∃x ( f(−x) ≠ −f(x) )
```

4. So one counterexample is enough:

```text
∃x ( f(−x) ≠ −f(x) )
```

*Why not `∀x (f(−x) ≠ −f(x))`?* That would say it fails for **every** *x* — much stronger than “not point-symmetric.”

### 5. Final answers

| Part | Formula |
|------|---------|
| a) | `∀x ∀y ( x ≤ y ⇒ f(x) ≤ f(y) )` |
| b) | `∀x ∀y ( x < y ⇒ f(x) < f(y) )` |
| c) | `∃x ( f(−x) ≠ −f(x) )` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Using `<` in (a) | Too strong — that is already “strict” | (a) uses `≤`, (b) uses `<` |
| Writing only `f(x) ≤ f(y)` without the premise | Misses “when *x* ≤ *y*” | Keep the implication |
| Negating (c) with `∀x (… ≠ …)` | Far too strong | One counterexample (`∃x`) is enough |

Back to [Task 05_2](../README.md).
