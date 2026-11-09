# Sample solution · Task 07_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

There is no program. Recompute each part using the definitions; the **final answers** are boxed at the end of each subsection.

---

## How it works, step by step

**Aim in one sentence:** Compute each union, intersection, and difference from **A** = { 3, 4, 16, −7 }, **B** = { 3, 16 }, **C** = { −7, 4, 5, 1 }, then sketch a Venn picture.

**Rules on the table:**

| Operation | Meaning |
|-----------|---------|
| *X* ∪ *Y* | *x* is in *X* **or** *Y* (or both) |
| *X* ∩ *Y* | *x* is in **both** |
| *X* \ *Y* | In *X*, **not** in *Y* |

**Warm-up:** Notice **B** ⊆ **A** — every element of **B** appears in **A**. That makes **B** \ **A** empty and suggests a **nested** drawing.

### Part a — A ∪ B

1. **What we see:** OR — gather all distinct labels from **A** and **B**.
2. **Which rule:** Union — no double listing.
3. **Apply:** **B**’s elements {3, 16} are already in **A**. Nothing new is added.
4. **Mini-check:** |*A* ∪ *B*| = |*A*| = 4.

$$\boxed{A \cup B = \{ 3, 4, 16, -7 \}}$$

### Part b — A ∩ B

1. **What we see:** AND — only **shared** members.
2. **Apply:** Shared are **3** and **16**.

$$\boxed{A \cap B = \{ 3, 16 \}}$$

### Part c — (A ∩ B) ∪ C

1. **Inside first:** *A* ∩ *B* = { 3, 16 } from part **b**.
2. **Union with C:** add everything from **C**.
3. **List:** { 3, 16, −7, 4, 5, 1 } — sorted for reading: **{ −7, 1, 3, 4, 5, 16 }**.

$$\boxed{(A \cap B) \cup C = \{ -7, 1, 3, 4, 5, 16 \}}$$

### Part d — A \ B

1. **Meaning:** Start with **A**, delete **3** and **16**.
2. **Left:** **4** and **−7**.

$$\boxed{A \setminus B = \{ 4, -7 \}}$$

### Part e — B \ A

1. **Meaning:** Start with **B**, delete anything that is also in **A**.
2. **But:** every element of **B** **is** in **A** (**B** ⊆ **A**). Nothing survives.
3. **Empty set:** use **{ }** or **∅**.

$$\boxed{B \setminus A = \{\}}$$

### Part f — (C \ A) ∪ B

1. **C \ A:** keep members of **C** not in **A**.
   - **C** = { −7, 4, 5, 1 }; **A** = { 3, 4, 16, −7 }.
   - Remove −7 and 4 (they are in **A**). Left: **{ 5, 1 }**.
2. **Union with B:** add { 3, 16 }.
3. **Result:** { 1, 3, 5, 16 }.

$$\boxed{(C \setminus A) \cup B = \{ 1, 3, 5, 16 \}}$$

### Venn diagram (how to draw)

1. **Shape:** Draw **A** as a big blob. Put **B** **entirely inside** **A** (a smaller loop), because **B** ⊆ **A**.
2. **C:** overlaps **A** on **−7** and **4** (both in *A* ∩ *C*).
3. **Only C:** **1** and **5** sit in **C** but outside **A** (they come from *C* \ *A*).
4. **Only A (not B, not C):** **no** element — every element of **A** is either in **B** or shares with **C** or both. (Check: 3,16 ∈ B; 4,−7 ∈ C.)
5. **Only B:** empty — **B** ⊆ *A*∩*C*? 3,16: 3 ∉ C, 16 ∉ C. So **3** and **16** sit in *A*∩*B* but **not** in *C* — a **lens** between **A** and **B** only.

A tidy mental picture: **B** nested in **A**; **C** cuts through **A**, sharing −7 and 4; **C** sticks out with 1 and 5 outside **A**; **3** and **16** stay in the **B** ring inside **A** but outside **C**.

---

## Common mistakes

| Mistake | What you see | Fix |
|---------|----------------|-----|
| *B* \ *A* “has 3 and 16” | You forgot *B* ⊆ *A* | Removing *A* from *B* leaves **nothing** |
| Wrong *C* \ *A* | You drop **5** and **1** | They are **not** in **A** — they **stay** |
| Diagram: *B* crosses outside *A* | Circles wrong | **B** must lie **inside** **A** |
| Union duplicates | You write 3 twice | Sets list each element once |

Back to [Task 07_3](../README.md)
