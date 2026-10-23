# Sample solution · Task 05_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Your wording can differ; the **meaning** must match each part below.

## How it works, step by step

### 1. Aim

Say each formula in everyday English. No logic symbols left in the answer.

### 2. Sticky notes (keep them visible)

| Symbol | Means |
|--------|-------|
| `S(x)` | *x* sleeps during the lecture |
| `Z(x)` | *x* listens |
| `A(x, y)` | *x* can work well together with *y* |
| Domain | students at Hochschule Hannover |

### 3. Part (a) — `∀x (S(x) ∨ ¬Z(x))`

1. Outer `∀x` → start with “**Every** student *x* …”
2. Inside: `S(x) ∨ ¬Z(x)` → “sleeps **or** does not listen” (or both — `∨` is inclusive).
3. Put together:

**Everyday English:** Every student either sleeps during the lecture or does not listen.

*Optional same meaning:* `S ∨ ¬Z` is `Z ⇒ S`, so: Every student who listens also sleeps during the lecture.

### 4. Part (b) — `∃x ∀y ¬A(x, y)`

1. Read **outside in**. Outer `∃x` → “There is **at least one** student *x* such that …”
2. Then `∀y` → “for **every** student *y* …”
3. Then `¬A(x, y)` → “*x* cannot work well with *y*.”
4. Put together:

**Everyday English:** There is a student who cannot work well together with any student.

*Why not “every pair”?* The special *x* is chosen first; then the claim must hold for all *y*.

### 5. Part (c) — `∃x (¬S(x) ⇒ Z(x))`

1. Outer `∃x` → “There is at least one student *x* for whom …”
2. Inside implication: “**if** *x* does not sleep, **then** *x* listens.”
3. Put together:

**Everyday English:** There is a student such that if they do not sleep during the lecture, then they listen.

*Optional rewrite:* `¬S ⇒ Z` ≡ `S ∨ Z`, so: There is a student who either sleeps during the lecture or listens (or both).

### 6. Final answers (short list)

| Part | Everyday English |
|------|------------------|
| a) | Every student either sleeps during the lecture or does not listen. |
| b) | There is a student who cannot work well together with any student. |
| c) | There is a student such that if they do not sleep, then they listen. |

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Reading `∃x ∀y` as “for every pair” | Loses the one special *x* | Pick *x* first, then all *y* |
| Exclusive “either … or …” | Drops the both-true case | Inclusive or; say “or both” if unsure |
| Softening (b) to “any *other* student” | Changes the formula | Sheet did not exclude `y = x` |

Back to [Task 05_1](../README.md).
