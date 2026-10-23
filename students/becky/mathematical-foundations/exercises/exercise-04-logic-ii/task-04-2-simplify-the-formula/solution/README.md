# Sample solution · Task 04_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Your final formula must mean the same as `¬B`. Steps may look different; the end must match.

## How it works, step by step

### 1. Aim

Simplify

```text
F = (¬A ∨ B) ⇒ ¬B
```

to the shortest equivalent formula.

### 2. Sticky-note rules we will use

| Rule | Pattern | Becomes |
|------|---------|---------|
| Implication | `X ⇒ Y` | `¬X ∨ Y` |
| De Morgan | `¬(X ∨ Y)` | `¬X ∧ ¬Y` |
| Double negation | `¬¬X` | `X` |
| Absorption | `¬Y ∨ (X ∧ ¬Y)` | `¬Y` |

### 3. Step — remove the implication

Let `X = (¬A ∨ B)` and `Y = ¬B`.

```text
F ≡ ¬(¬A ∨ B) ∨ ¬B
```

*Why:* every `⇒` can be rewritten this way without changing the meaning.

### 4. Step — push the outer ¬ inside (De Morgan)

```text
¬(¬A ∨ B) ≡ (¬¬A) ∧ (¬B) ≡ A ∧ ¬B
```

So

```text
F ≡ (A ∧ ¬B) ∨ ¬B
```

*Check:* we flipped `∨` to `∧` and negated both sides; `¬¬A` became `A`.

### 5. Step — absorb the extra piece

Look at `(A ∧ ¬B) ∨ ¬B`.

Rewrite order: `¬B ∨ (A ∧ ¬B)`.

Anything of the shape `¬B ∨ (something ∧ ¬B)` collapses to **`¬B`** (absorption): if `¬B` is already true, the or is true; if `¬B` is false, the `(A ∧ ¬B)` part is false too.

```text
F ≡ ¬B
```

### 6. Spot-check with a truth table

| A | B | ¬A ∨ B | ¬B | F = (¬A ∨ B) ⇒ ¬B | simplified `¬B` |
|---|---|--------|----|-------------------|-----------------|
| T | T | T      | F  | F                 | F               |
| T | F | F      | T  | T                 | T               |
| F | T | T      | F  | F                 | F               |
| F | F | T      | T  | T                 | T               |

Same values in the last two columns → equivalent.  
Letter `A` disappeared; only **`¬B`** remains.

### 7. Final answer

```text
F ≡ ¬B
```

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Stopping at `(A ∧ ¬B) ∨ ¬B` | Not fully simplified | Apply absorption → `¬B` |
| Turning `⇒` into `∧` | Wrong meaning | Always `X ⇒ Y ≡ ¬X ∨ Y` |
| Claiming `F ≡ ¬A` or `F ≡ B` | Fails the table | Compare every row to `¬B` |

Back to [Task 04_2](../README.md).
