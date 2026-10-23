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

Push the “not” all the way in. At the end, `¬` may sit **only** on `P`. No `¬∀` or `¬∃` left.

### 2. Picture first

> [!PICTURE]
> Three locked boxes in a row: ∀ , ∃ , ∀.  
> A “not” sticker starts on the outside.  
> Each time the sticker walks into a box, that lock **flips**:  
> “for all” becomes “there exists”, and “there exists” becomes “for all”.

### 3. Rules on the table (only two)

| Rule | You see | You write | In words |
|------|---------|-----------|----------|
| Flip-∀ | `¬ ∀…` | `∃ ¬ …` | “not every” → “there is one where not” |
| Flip-∃ | `¬ ∃…` | `∀ ¬ …` | “not (there is one)” → “for every, not” |

That is the whole menu. Nothing else.

### 4. How you choose (always the same thinking)

At every step:

1. Look at the symbol **right after** the `¬`.
2. If it is `∀` → choose **Flip-∀**. If it is `∃` → choose **Flip-∃**.
3. Why that one? Because the other rule’s pattern does not match what you see.
4. Do **not** flip a lock further to the right — the sticker has not reached it yet.

### 5. Start

Write the not in front:

```text
¬ ∀x ∃y ∀z P(x, y, z)
```

Still not done — `¬` sits in front of a quantifier.

### 6. First flip

| Thinking | |
|----------|--|
| What sits after `¬`? | `∀x` |
| Rules that match? | Only **Flip-∀** |
| Why not Flip-∃? | We see `∀`, not `∃` |

```text
∃x ¬ ∃y ∀z P(x, y, z)
```

### 7. Second flip

| Thinking | |
|----------|--|
| What sits after `¬` now? | `∃y` |
| Choose | **Flip-∃** |
| Why not Flip-∀? | We see `∃`, not `∀` |

```text
∃x ∀y ¬ ∀z P(x, y, z)
```

### 8. Third flip

| Thinking | |
|----------|--|
| What sits after `¬` now? | `∀z` |
| Choose | **Flip-∀** |
| Why stop after this? | Next the `¬` will touch `P` — that is the goal |

```text
∃x ∀y ∃z ¬ P(x, y, z)
```

### 9. Final answer

```text
∃x ∀y ∃z ¬P(x, y, z)
```

Memory trick: start was `∀ ∃ ∀`. After three flips: `∃ ∀ ∃`.

### 10. Meaning in words (optional check)

“There is an *x* such that for every *y* there is a *z* with ¬P(x, y, z).”

That is exactly: it is **not** true that every *x* has a *y* that works for all *z*.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Stopping at `¬ ∀x ∃y ∀z P(…)` | Still has `¬` before a quantifier | Keep flipping until `¬` reaches `P` |
| Flipping all three locks in one go “by memory” | Easy to mistype the middle | One lock at a time; match the rule to what you see |
| Writing `∃x ∃y ∃z ¬P(…)` | Lost the middle `∀` | After flips the order is `∃ ∀ ∃` |

Back to [Task 05_3](../README.md).
