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

to the shortest formula with the **same meaning**.

### 2. Picture first

> [!PICTURE]
> A messy drawer of Lego. You do not throw pieces away. You only snap them into a smaller shape that still builds the same thing. That is simplifying a formula.

### 3. Rules on the table

Keep this menu visible. At each step you **pick from here** — you do not invent a new move.

| Rule name | Pattern | Becomes | When it matches |
|-----------|---------|---------|-----------------|
| Implication | `X ⇒ Y` | `¬X ∨ Y` | You still see `⇒` |
| De Morgan (or) | `¬(X ∨ Y)` | `¬X ∧ ¬Y` | `¬` outside an `∨` |
| Double not | `¬¬X` | `X` | Two `¬` on the same piece |
| Absorption | `¬Y ∨ (X ∧ ¬Y)` | `¬Y` | One or-piece already contains the other |

### 4. Thinking before the first rewrite

Look at `F = (¬A ∨ B) ⇒ ¬B`.

| Question | Answer |
|----------|--------|
| What do I see? | An arrow `⇒` in the middle |
| Which rules match? | Only **Implication** (the others need a `¬(` or a repeated piece) |
| Which do I choose? | **Implication** |
| Why this one, not De Morgan? | There is no outer `¬(` yet. De Morgan has nothing to grab. |
| Why not Absorption yet? | Absorption needs an `∨` of a lonely piece and a bigger piece that already contains it. We do not have that shape yet. |

### 5. Apply Implication

Let `X = (¬A ∨ B)` and `Y = ¬B`.

```text
F ≡ ¬(¬A ∨ B) ∨ ¬B
```

*Check:* arrow gone. Same meaning.

### 6. Thinking before the second rewrite

Look at `¬(¬A ∨ B) ∨ ¬B`.

| Question | Answer |
|----------|--------|
| What do I see? | A `¬` sitting **outside** `(¬A ∨ B)` — an or inside |
| Which rules match? | **De Morgan (or)** matches that piece. Double-not is not ready yet (we still have only one outer `¬`). Absorption does not match the whole formula yet. |
| Which do I choose? | **De Morgan (or)** on `¬(¬A ∨ B)` |
| Why now? | Pushing the `¬` inside opens the door for double-not and for seeing a repeated `¬B`. |

### 7. Apply De Morgan (+ double not)

Tiny sub-steps inside `¬(¬A ∨ B)`:

1. Flip `∨` → `∧`.
2. Put `¬` on each side → `¬¬A` and `¬B`.
3. **Choose Double not** on `¬¬A` → `A`  
   *Why?* Two flips on `A` cancel. Leaving `¬¬A` would be messier for no reason.

```text
¬(¬A ∨ B) ≡ A ∧ ¬B
```

So:

```text
F ≡ (A ∧ ¬B) ∨ ¬B
```

### 8. Thinking before the last rewrite

Look at `(A ∧ ¬B) ∨ ¬B`.

| Question | Answer |
|----------|--------|
| What do I see? | An `∨`. One side is `¬B`. The other side is `(A ∧ ¬B)`, which **already contains** `¬B`. |
| Which rules match? | **Absorption** (`¬Y ∨ (X ∧ ¬Y)` with `Y = B` and `X = A`) |
| Which do I choose? | **Absorption** |
| Why not De Morgan? | There is no outer `¬(` around an or/and here. |
| Why not Implication? | No arrow left. |

Swap order so the lonely piece is first (same meaning):

```text
¬B ∨ (A ∧ ¬B)
```

In words:

- If `¬B` is already true, the whole or is true.
- If `¬B` is false, then `(A ∧ ¬B)` is false too.

So the extra piece never helps. Drop it.

```text
F ≡ ¬B
```

### 9. Spot-check with a truth table

| A | B | (¬A ∨ B) ⇒ ¬B | simplified `¬B` | Same? |
|---|---|---------------|-----------------|-------|
| T | T | F | F | yes |
| T | F | T | T | yes |
| F | T | F | F | yes |
| F | F | T | T | yes |

Same in every row → equivalent. Letter `A` disappeared. Only **`¬B`** remains.

### 10. Final answer

```text
F ≡ ¬B
```

### 11. Thinking recap (the path we chose)

```text
⇒ seen     → Implication
¬(… ∨ …)   → De Morgan
¬¬A        → Double not
¬B ∨ (A∧¬B)→ Absorption
```

Each pick matched the **shape on the paper**, not a guess.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Stopping at `(A ∧ ¬B) ∨ ¬B` | Not fully simplified | See absorption shape → drop to `¬B` |
| Turning `⇒` into `∧` | Wrong meaning | Implication rule is `¬X ∨ Y`, never `∧` |
| Using Absorption before killing `⇒` | Shape does not match yet | Clear the arrow first |
| Claiming `F ≡ ¬A` or `F ≡ B` | Fails the table | Compare every row to `¬B` |

Back to [Task 04_2](../README.md).
