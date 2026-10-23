# Sample solution · Task 05_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answers — no compile step. Read the meanings below and compare to your own wording.

## How it works, step by step

Keep the sticky notes:

- `S(x)` — *x* sleeps during the lecture  
- `Z(x)` — *x* listens  
- `A(x, y)` — *x* can work well together with *y*  
- Domain of *x* and *y*: students at Hochschule Hannover  

### a) `∀x (S(x) ∨ ¬Z(x))`

Read: for every student *x*, either *x* sleeps, or *x* does not listen (or both).

**Everyday English:** Every student either sleeps during the lecture or does not listen.

Same meaning (because `S ∨ ¬Z` is `Z ⇒ S`): Every student who listens also sleeps during the lecture.

### b) `∃x ∀y ¬A(x, y)`

Read from the outside: there is some student *x* such that **for every** student *y*, `¬A(x, y)` holds.

**Everyday English:** There is a student who cannot work well together with any student.

### c) `∃x (¬S(x) ⇒ Z(x))`

Read: there is some student *x* for whom “if *x* does not sleep, then *x* listens” is true.

**Everyday English:** There is a student such that if they do not sleep during the lecture, then they listen.

Equivalent (optional): There is a student who either sleeps during the lecture or listens (or both).

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Reading `∃x ∀y` as “for every pair” | You lose the “one special *x*” | Pick *x* first, then demand the claim for all *y* |
| Turning `∨` into exclusive “either … or …” | Drops the both-true case | Inclusive or is fine; say “or both” if unsure |
| Softening (b) to “any *other* student” | Changes the formula | The sheet did not exclude *y = x* |

Back to [Task 05_1](../README.md).
