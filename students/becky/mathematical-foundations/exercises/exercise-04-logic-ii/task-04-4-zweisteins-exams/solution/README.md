# Sample solution · Task 04_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Final list of passed exams: **Mathematics only**.

## How it works, step by step

### 1. Aim

Zweistein never lies. Both of his sentences are **true**. Find which exams he passed.

### 2. Picture first

> [!PICTURE]
> Three exam stamps on a desk: Math, Programming, BWL. Each stamp is either **passed** or **not**. Zweistein tells two true sentences. You turn the sentences into formulas, then find the only stamp combo that fits.

### 3. Tools on the table

| Tool | What it does | When you choose it |
|------|--------------|--------------------|
| Invent letters | Name each exam stamp | Always first — you need handles |
| Translate word → symbol | `and`→`∧`, `or`→`∨`, `not`→`¬` | While reading each sentence |
| De Morgan | `¬(X ∨ Y) ≡ ¬X ∧ ¬Y` | When a `¬` wraps an `or` and you want simpler pieces |
| Plug-in | Replace letters with T/F you already know | After one sentence has fixed some letters |

### 4. Strategy (why this order)

1. Translate **both** sentences into formulas (so nothing is fuzzy).
2. Simplify the **stricter** sentence first (the one that forces letters).
3. Plug those forced letters into the other sentence.
4. Read off the stamp card.

*Why not guess exams first?*  
Guessing skips the rules. The formulas force the answer.

### 5. Invent letters (sticky notes)

| Letter | Means |
|--------|-------|
| `M` | passed Mathematics |
| `P` | passed Programming |
| `B` | passed BWL |

“Failed Mathematics” = `¬M`.

### 6. Translate sentence (1) — piece by piece

> I passed Mathematics and Programming, **or** it is not the case that I passed Programming or BWL.

Tiny steps:

1. “Math and Programming” → `M ∧ P`
2. “Programming or BWL” → `P ∨ B`
3. “it is not the case that …” → put `¬` in front → `¬(P ∨ B)`
4. Big “or” between the two halves →

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

### 7. Translate sentence (2) — piece by piece

> It is false that I passed Programming or failed Mathematics.

Tiny steps:

1. Inside the “it is false that”: `P ∨ ¬M`
2. Whole thing false → wrap with `¬`

```text
(2)   ¬(P ∨ ¬M)
```

### 8. Choose De Morgan on sentence (2)

| Thinking | |
|----------|--|
| What do I see? | `¬(P ∨ ¬M)` — a not outside an or |
| Which tool matches? | **De Morgan** |
| Why this sentence first? | After De Morgan it forces two letters at once. Sentence (1) alone leaves more open cases. |

```text
¬(P ∨ ¬M) ≡ ¬P ∧ ¬(¬M) ≡ ¬P ∧ M
```

So sentence (2) alone already forces:

- `M` is **true** (passed Math)
- `P` is **false** (did **not** pass Programming)

Only `B` is still open.

### 9. Choose plug-in on sentence (1)

| Thinking | |
|----------|--|
| What do I know? | `M = T`, `P = F` |
| Which tool? | **Plug-in** into `(M ∧ P) ∨ (¬P ∧ ¬B)` |
| Why not invent new rules? | Truth of `∧` / `∨` is enough |

```text
(M ∧ P)     →  T ∧ F  →  F
(¬P ∧ ¬B)   →  T ∧ ¬B →  ¬B
F ∨ ¬B      →  ¬B
```

For sentence (1) to stay true, `¬B` must be true → **`B` is false**.

*Why?* The left half is already false. So the right half must carry the truth.

### 10. Put the stamp card together

| Exam | Passed? |
|------|---------|
| Mathematics | yes (`M`) |
| Programming | no (`¬P`) |
| BWL | no (`¬B`) |

### 11. Final answer

Zweistein passed **Mathematics** only.  
He did **not** pass Programming and did **not** pass BWL.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Reading (2) as “failed Programming …” | Wrong letters | “It is false that …” wraps all of `P ∨ ¬M` |
| Leaving BWL open | Incomplete | After `M∧¬P`, sentence (1) forces `¬B` |
| Allowing `P` true | Contradicts (2) | Finish De Morgan on (2) before guessing exams |

Back to [Task 04_4](../README.md).
