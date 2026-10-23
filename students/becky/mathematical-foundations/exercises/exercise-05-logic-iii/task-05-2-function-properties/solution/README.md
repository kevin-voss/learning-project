# Sample solution · Task 05_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written formulas — no compile step. Match the shapes below (variable names may differ).

## How it works, step by step

### 1. Aim

Write three properties of a number machine `f: ℝ → ℝ` as logic formulas.

### 2. Picture first

> [!PICTURE]
> A vending machine `f`. You put in a real number `x`. It spits out a real number `f(x)`.  
> Today you write rules about that machine using “for every” (`∀`) and “there exists” (`∃`).

Domain: `x` and `y` are real numbers.

### 3. Building blocks on the table

| Block | Meaning | When you choose it |
|-------|---------|---------------------|
| `∀x ∀y ( … ⇒ … )` | “for every pair, if … then …” | Comparing two inputs (mono / strict mono) |
| `≤` vs `<` | allow flats vs forbid flats | (a) vs (b) |
| `∀x ( f(−x) = −f(x) )` | point-symmetric | Positive form of (c) |
| Flip `¬∀` → `∃¬` | negate a “for all” | When the sheet says **not** point-symmetric |

### 4. Part (a) — monotonically increasing

Everyday idea:  
“If the input does **not** get smaller, the output does **not** get smaller.”

| Thinking | |
|----------|--|
| Shape needed? | Compare two inputs → `∀x ∀y` + implication |
| `≤` or `<`? | Choose **`≤`** |
| Why not `<`? | “Monotonically” allows flat stretches; `<` is already “strict” (part b) |

```text
∀x ∀y ( x ≤ y  ⇒  f(x) ≤ f(y) )
```

### 5. Part (b) — strictly monotonically increasing

| Thinking | |
|----------|--|
| Same shape as (a)? | Yes |
| What changes? | Both comparisons become **`<`** |
| Why? | “Strictly” forbids flats |

```text
∀x ∀y ( x < y  ⇒  f(x) < f(y) )
```

### 6. Part (c) — not point-symmetric about the origin

> [!PICTURE]
> Point-symmetric about (0, 0) means: spin the graph 180° around the origin and it looks the same.  
> In numbers: for every `x`, `f(−x)` equals `−f(x)`.

First write the **positive** claim (easier to negate):

```text
∀x ( f(−x) = −f(x) )
```

| Thinking | |
|----------|--|
| Sheet wants? | **Not** that claim |
| Tool? | Put `¬` in front, then Flip-∀ → `∃ ¬` |
| Why not write `∀x (f(−x) ≠ −f(x))`? | That says it fails for **every** *x* — too strong. “Not point-symmetric” needs only **one** bad *x*. |

```text
¬ ∀x ( f(−x) = −f(x) )
≡ ∃x ¬( f(−x) = −f(x) )
≡ ∃x ( f(−x) ≠ −f(x) )
```

Final for (c):

```text
∃x ( f(−x) ≠ −f(x) )
```

### 7. Final answers

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
