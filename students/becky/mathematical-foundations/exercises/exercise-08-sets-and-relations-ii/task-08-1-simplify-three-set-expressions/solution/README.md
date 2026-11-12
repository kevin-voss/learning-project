# Sample solution · Task 08_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

There is no program. Follow the steps below; compare your algebra to the boxed answers.

---

## How it works, step by step

**Aim in one sentence:** Rewrite **M1**, **M2**, and **M3** as short expressions in **A**, **B**, **C**.

**Rules on the table:**

| Rule | When to use it |
|------|----------------|
| De Morgan: (A ∩ B)̅ = Ā ∪ B̅; (A ∪ B)̅ = Ā ∩ B̅ | A bar sits over a bracket |
| Absorption: X ∩ (X ∪ Y) = X; X ∪ (X ∩ Y) = X | Same set appears twice, once inside ∪ |
| A \ B̅ = A ∩ B | Difference with a complement |
| B̅ ∪ B = U (universe) | Complement ∪ original set |

---

### M1 = Ā ∩ (A ∩ B)̅

1. **What we see:** Bar over (A ∩ B) — use **De Morgan** on the bracket.
2. **Apply:** (A ∩ B)̅ = Ā ∪ B̅, so  
   M1 = Ā ∩ (Ā ∪ B̅).
3. **What we see next:** Ā appears on both sides of ∩ and ∪ — **absorption** (X ∩ (X ∪ Y) = X).
4. **Pick absorption** (not another distribute step) because the left factor **is** Ā.
5. **Mini-check:** Every result of M1 must lie in Ā; absorption to Ā fits.

$$\boxed{M_1 = \overline{A}}$$

---

### M2 = (A ∪ B) ∩ (B̅ ∪ A ∪ C ∪ B)

1. **Look at the right-hand side:** group **B**̅ ∪ **B** inside the long union.
2. **Why B**̅ ∪ **B:** Every element is in **B** or not in **B**, so **B**̅ ∪ **B** = **U**.
3. **Apply:** B̅ ∪ A ∪ C ∪ B = (B̅ ∪ B) ∪ A ∪ C = U ∪ A ∪ C = U.
4. **Whole expression:** M2 = (A ∪ B) ∩ U.
5. **∩ with universe:** X ∩ U = X.

$$\boxed{M_2 = A \cup B}$$

---

### M3 = (A \ B̅) ∪ (A ∪ (B \ A))

**Left part**

1. **A \ B**̅ means: in **A**, not in the complement of **B** — that is “in **A** and in **B**.”
2. **Rule:** A \ B̅ = A ∩ B.

**Right part**

1. **B \ A** = elements in **B** but not in **A**.
2. **A ∪ (B \ A):** Start with all of **A**, add everything in **B** that was missing from **A**.
3. **Why that is A ∪ B:** Nothing outside **A ∪ B** is added; every element of **B** is either already in **A** or exactly in **B \ A**.

$$\text{So } A \cup (B \setminus A) = A \cup B$$

**Put together**

1. M3 = (A ∩ B) ∪ (A ∪ B).
2. **Subset fact:** A ∩ B ⊆ A ∪ B, so the smaller set adds nothing new to the union.
3. **Pick union swallowing** (not recomputing elements) because one side contains the other.

$$\boxed{M_3 = A \cup B}$$

---

## Common mistakes

| Mistake | Why it is wrong |
|---------|------------------|
| Leaving M1 as Ā ∩ (Ā ∪ B̅) | One more **absorption** step is still required |
| Forgetting B̅ ∪ B = U in M2 | Then you never simplify the big right-hand union |
| Writing M3 = A ∩ B only | You dropped the **(A ∪ (B \ A))** branch, which is bigger |

Back to [Task 08_1](../README.md).
