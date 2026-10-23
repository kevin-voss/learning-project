# Sample solution · Task 05_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Your wording can differ a little. The **meaning** must match.

## How it works, step by step

### 1. Aim

Say each formula in everyday English. No logic symbols left in the answer.

### 2. Picture first

> [!PICTURE]
> A classroom. Every student gets sticky notes.  
> `S(x)` = “this student sleeps in the lecture”.  
> `Z(x)` = “this student listens”.  
> `A(x, y)` = “student x works well with student y”.

Keep those sticky notes next to you while you read.

### 3. Sticky-note cheat sheet

| Symbol | Means in words |
|--------|----------------|
| `S(x)` | *x* sleeps during the lecture |
| `Z(x)` | *x* listens |
| `A(x, y)` | *x* can work well together with *y* |
| `∀x` | every student *x* |
| `∃x` | at least one student *x* |
| `∨` | or (one side, or the other, or both) |
| `¬` | not |
| `⇒` | if … then … |

### 4. Reading tools on the table

| Tool | What you do | When you choose it |
|------|-------------|--------------------|
| Outside-in | Read leftmost quantifier first | **Always** when `∀` / `∃` appear |
| Swap `∨` / `⇒` (optional) | `S ∨ ¬Z` ≡ `Z ⇒ S`, or `¬S ⇒ Z` ≡ `S ∨ Z` | Only if it helps you say it clearer — not required |
| Stack of boxes | Outer quantifier = outer box | When two quantifiers sit in a row (`∃x ∀y …`) |

**Default thinking:** outside-in first. Optional rewrites only after the plain sentence is clear.

### 5. Part (a) — `∀x (S(x) ∨ ¬Z(x))`

| Thinking | |
|----------|--|
| What do I see first? | Outer `∀x` |
| Choose | Outside-in → “Every student …” |
| Why not start inside? | Starting inside loses “every” |

Tiny steps:

1. See `∀x` → “**Every** student …”
2. See `S(x) ∨ ¬Z(x)` → “sleeps **or** does not listen”
3. Remember: `∨` allows **both** to be true.

**Everyday English:**  
Every student either sleeps during the lecture or does not listen.

*Optional rewrite (same meaning):* `S ∨ ¬Z` ≡ `Z ⇒ S` →  
“Every student who listens also sleeps during the lecture.”  
*Why optional?* Only if that sentence feels clearer. The sheet accepts either.

### 6. Part (b) — `∃x ∀y ¬A(x, y)`

| Thinking | |
|----------|--|
| What do I see? | Two quantifiers stacked: `∃x` then `∀y` |
| Choose | Stack of boxes — outer `∃x` first |
| Why not “for every pair”? | That would treat `∃` and `∀` as one flat “every pair” — wrong shape |

Tiny steps:

1. Outer box `∃x` → “There is **at least one** student *x* such that …”
2. Inner box `∀y` → “for **every** student *y* …”
3. Inside claim `¬A(x, y)` → “*x* cannot work well with *y*.”

**Everyday English:**  
There is a student who cannot work well together with any student.

### 7. Part (c) — `∃x (¬S(x) ⇒ Z(x))`

| Thinking | |
|----------|--|
| Outer symbol? | `∃x` → “there is at least one student” |
| Inside connective? | `⇒` → say “if … then …” first (safest) |
| Optional tool? | Rewrite `¬S ⇒ Z` as `S ∨ Z` only if you prefer |

**Everyday English:**  
There is a student such that if they do not sleep during the lecture, then they listen.

*Optional same meaning:*  
There is a student who either sleeps during the lecture or listens (or both).

### 8. Final answers (short list)

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
