# Sample solution · Task 04_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Final list of passed exams: **Mathematics only**.

## How it works, step by step

### 1. Aim

Zweistein never lies. Both of his sentences are **true**. Find which exams he passed.

### 2. Invent letters

| Letter | Means |
|--------|-------|
| `M` | passed Mathematics |
| `P` | passed Programming |
| `B` | passed BWL |

“Failed Mathematics” = `¬M`.

### 3. Translate sentence (1) — piece by piece

> I passed Mathematics and Programming, **or** it is not the case that I passed Programming or BWL.

- “Math and Programming” → `M ∧ P`
- “Programming or BWL” → `P ∨ B`
- “it is not the case that …” → put `¬` in front → `¬(P ∨ B)`
- Big “or” between the two halves →

```text
(1)   (M ∧ P) ∨ ¬(P ∨ B)
```

Optional De Morgan on the right half (same meaning):

```text
¬(P ∨ B) ≡ ¬P ∧ ¬B
```

so

```text
(1)   (M ∧ P) ∨ (¬P ∧ ¬B)
```

### 4. Translate sentence (2) — piece by piece

> It is false that I passed Programming or failed Mathematics.

- Inside the “it is false that”: `P ∨ ¬M`
- Whole thing false →

```text
(2)   ¬(P ∨ ¬M)
```

### 5. Simplify sentence (2) first (it is stricter)

De Morgan: `¬(X ∨ Y) ≡ ¬X ∧ ¬Y`.

```text
¬(P ∨ ¬M) ≡ ¬P ∧ ¬(¬M) ≡ ¬P ∧ M
```

So sentence (2) alone already forces:

- `M` is **true** (passed Math)
- `P` is **false** (did **not** pass Programming)

*Why start here:* two letters are already fixed; only `B` is still open.

### 6. Plug into sentence (1)

We know `M = T`, `P = F`. Put them into `(M ∧ P) ∨ (¬P ∧ ¬B)`:

```text
(M ∧ P)     →  T ∧ F  →  F
(¬P ∧ ¬B)   →  T ∧ ¬B →  ¬B
F ∨ ¬B      →  ¬B
```

For sentence (1) to stay true, `¬B` must be true → **`B` is false**.

### 7. Put the stamp card together

| Exam | Passed? |
|------|---------|
| Mathematics | yes (`M`) |
| Programming | no (`¬P`) |
| BWL | no (`¬B`) |

### 8. Final answer

Zweistein passed **Mathematics** only.  
He did **not** pass Programming and did **not** pass BWL.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Reading (2) as “failed Programming …” | Wrong letters | “It is false that …” wraps all of `P ∨ ¬M` |
| Leaving BWL open | Incomplete | After `M∧¬P`, sentence (1) forces `¬B` |
| Allowing `P` true | Contradicts (2) | Finish De Morgan on (2) before guessing exams |

Back to [Task 04_4](../README.md).
