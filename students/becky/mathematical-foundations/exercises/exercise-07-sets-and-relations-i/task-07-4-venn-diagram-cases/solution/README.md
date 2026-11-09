# Sample solution · Task 07_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

There is no program. Compare your four cases to the **recipe** below: for each case, the four results ∩, ∪, \, / must match the words.

---

## How it works, step by step

**Aim in one sentence:** For **two** sets **A** and **B**, say what ∩, ∪, *A* \ *B*, and *B* \ *A* look like in four different **shapes** of the world.

**Rules on the table (always):**

| Symbol | Region in words |
|--------|-----------------|
| *A* ∩ *B* | Lens where the two circles overlap |
| *A* ∪ *B* | Everything inside **either** circle |
| *A* \ *B* | Inside **A** only (not the overlap) |
| *B* \ *A* | Inside **B** only (not the overlap) |

For each **case** below: read the shape → name ∩ and the two differences first (they are the fastest checks) → then ∪.

---

### Case 1 — *A* and *B* **not disjoint**

**What you see:** Two circles cross; the middle lens has **at least one** point (maybe more).

**Why this case (not disjoint):** “Not disjoint” **only** means *A* ∩ *B* ≠ ∅. Neither set must sit inside the other.

| Operation | Region | Typical picture |
|-----------|--------|----------------|
| *A* ∩ *B* | The **overlap** | Non-empty lens |
| *A* ∪ *B* | **Both** ovals | Football shape |
| *A* \ *B* | **Crescent** on the **A** side only | No **B**-only points inside it |
| *B* \ *A* | **Crescent** on the **B** side only | Mirror of the row above |

**Mini-check:** All four regions can be **non-empty** at the same time — draw one dot in each zone to prove it.

---

### Case 2 — *A* and *B* **disjoint**

**What you see:** Two separate blobs — **no** intersection.

**Which rule:** Disjoint ⇒ *A* ∩ *B* = ∅.

| Operation | Result |
|-----------|--------|
| *A* ∩ *B* | **Empty** (no shading / no dots) |
| *A* ∪ *B* | **Two separate** islands (draw with a light bracket “universe” if you like) |
| *A* \ *B* | **All of A** (nothing to remove) |
| *B* \ *A* | **All of B** |

**Mini-check:** *A* \ *B* = *A* and *B* \ *A* = *B* — the differences are as **large** as they can be.

---

### Case 3 — *A* is a **proper subset** of *B* (*A* ⊂ *B*)

**What you see:** Small circle **A** **entirely inside** bigger circle **B**; **B** has points **outside** *A* (proper!).

**Why this shape:** Every element of *A* sits in *B*, and **some** element of *B* is **not** in *A*.

| Operation | Region / result |
|-----------|-------------------|
| *A* ∩ *B* | **Exactly A** (the inner disc) |
| *A* ∪ *B* | **Exactly B** (the outer disc) |
| *A* \ *B* | **Empty** (there is no “A without B” inside the picture) |
| *B* \ *A* | **The ring** between the two circles (only-in-B part) |

**Mini-check:** *A* ∩ *B* = *A* whenever *A* ⊆ *B*; “proper” guarantees *B* \ *A* ≠ ∅.

---

### Case 4 — *B* is a **proper subset** of *A* (*B* ⊂ *A*)

**What you see:** Same as Case 3 with **names swapped** — **B** sits **inside** **A**; **A** has **extra** points outside **B**.

| Operation | Region / result |
|-----------|-------------------|
| *A* ∩ *B* | **Exactly B** |
| *A* ∪ *B* | **Exactly A** |
| *A* \ *B* | **The ring** outside **B** but inside **A** |
| *B* \ *A* | **Empty** |

**Mini-check:** Swapping labels turns Case 3 into Case 4 — if your Case 3 picture is right, **reflect the words**.

---

## Common mistakes

| Mistake | What you see | Fix |
|---------|----------------|-----|
| “Not disjoint” drawn as nested | No crossing | Need **overlap**, not containment |
| Disjoint but you shade ∩ | A dot in both circles | Disjoint ⇒ ∩ is **empty** |
| Proper subset drawn equal | Two identical circles | **Smaller** set must be **strictly** inside **or** strict superset |
| *A* \ *B* when *A* ⊂ *B* | You shade a crescent | That difference is **empty** — only **B** \ **A** shows |

Back to [Task 07_4](../README.md)
