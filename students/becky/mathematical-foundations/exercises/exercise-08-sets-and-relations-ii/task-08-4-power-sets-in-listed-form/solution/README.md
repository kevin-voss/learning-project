# Sample solution · Task 08_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Each boxed set should list **every** subset exactly once. Count: **16**, **2**, **1**.

---

## How it works, step by step

**Aim in one sentence:** List 𝒫(**A**), 𝒫(**B**), 𝒫(**C**) in enumerated form.

**Recipe:** For each element, decide **in** or **out**. With *n* elements there are 2^*n* subsets.

---

### 𝒫(A) with A = { 0, 1, 2, 3 }

1. **|A| = 4** → expect **16** subsets.
2. **Build by size** (helps not skip one):
   - Size 0: ∅
   - Size 1: {0}, {1}, {2}, {3}
   - Size 2: {0,1}, {0,2}, {0,3}, {1,2}, {1,3}, {2,3}
   - Size 3: {0,1,2}, {0,1,3}, {0,2,3}, {1,2,3}
   - Size 4: {0,1,2,3}
3. **Mini-check:** 1 + 4 + 6 + 4 + 1 = 16 (Pascal row for *n* = 4).

$$\boxed{\mathcal{P}(A) = \left\{ \begin{array}{l} \emptyset,\ \{0\},\ \{1\},\ \{2\},\ \{3\},\\ \{0,1\},\ \{0,2\},\ \{0,3\},\ \{1,2\},\ \{1,3\},\ \{2,3\},\\ \{0,1,2\},\ \{0,1,3\},\ \{0,2,3\},\ \{1,2,3\},\ \{0,1,2,3\} \end{array} \right\}}$$

---

### 𝒫(B) with B = { {1, 2, 3} }

1. **What we see:** **B** has **one** element — the **set** {1, 2, 3}. Call that element *s* = {1, 2, 3}.
2. **Subsets of a 1-element set:** drop *s* → ∅; keep *s* → { *s* } = { {1, 2, 3} }.
3. **Do not** expand into {1}, {2}, {3} inside 𝒫(**B**) unless you are listing subsets **of that inner set** — that would be 𝒫({1,2,3}), not 𝒫(**B**).

$$\boxed{\mathcal{P}(B) = \{ \emptyset,\ \{\{1,2,3\}\} \}}$$

*(Many people write the second member as `{ {1, 2, 3} }` — a set whose single element is the set {1,2,3}.)*

---

### 𝒫(C) with C = ∅

1. **|C| = 0** → 2⁰ = **1** subset only.
2. **The only subset of the empty set** is ∅ itself (you chose nothing).
3. **Power set is not “empty”:** it is a set **containing** one object, namely ∅.

$$\boxed{\mathcal{P}(\emptyset) = \{ \emptyset \}}$$

---

## Common mistakes

| Mistake | What went wrong |
|---------|------------------|
| 𝒫(B) has 8 elements | Treated {1,2,3} as three separate members of **B** |
| 𝒫(∅) = ∅ | Confused “no elements to choose” with “no subsets exist” |
| Only 15 sets for **A** | Missed ∅ or the full set {0,1,2,3} |

Back to [Task 08_4](../README.md).
