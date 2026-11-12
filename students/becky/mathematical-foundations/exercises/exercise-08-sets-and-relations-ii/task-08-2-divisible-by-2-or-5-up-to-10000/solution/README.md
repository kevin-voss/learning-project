# Sample solution · Task 08_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

One number at the end. Steps must show inclusion–exclusion.

---

## How it works, step by step

**Aim in one sentence:** Count *n* ∈ ℕ with 0 ≤ *n* ≤ 10000 such that 2 | *n* or 5 | *n* (“|” means “divides”).

**Rules on the table:**

| Set | Meaning |
|-----|---------|
| *A* = { *n* ∈ ℕ \| *n* ≤ 10000 ∧ 2 \| *n* } | Multiples of 2 |
| *B* = { *n* ∈ ℕ \| *n* ≤ 10000 ∧ 5 \| *n* } | Multiples of 5 |
| *A* ∩ *B* | Multiples of **10** |

**Count formula:** |*A* ∪ *B*| = |*A*| + |*B*| − |*A* ∩ *B*|

---

### Step 1 — Count |A| (multiples of 2)

1. **What we see:** 0, 2, 4, …, 10000 — an arithmetic sequence with step 2.
2. **Apply:** Largest term 10000 = 2 · 5000, and **0** is included, so there are **5000 + 1** terms.

|*A*| = 5001

---

### Step 2 — Count |B| (multiples of 5)

1. **List ends:** 0, 5, …, 10000 (since 10000 = 5 · 2000).
2. **Apply:** 2000 steps of size 5 from 0, plus the start 0 → **2000 + 1** terms.

|*B*| = 2001

---

### Step 3 — Count |A ∩ B| (multiples of 10)

1. **Why 10:** Divisible by 2 and by 5 ⇔ divisible by lcm(2, 5) = 10.
2. **Apply:** 0, 10, …, 10000 gives 10000/10 = 1000 steps plus **0** → **1000 + 1** terms.

|*A* ∩ *B*| = 1001

---

### Step 4 — Inclusion–exclusion

1. **Add** both counts: 5001 + 2001 = 7002 — but multiples of 10 were counted **twice**.
2. **Subtract** |*A* ∩ *B*| once: 7002 − 1001 = 6001.
3. **Mini-check:** 6001 is between 5001 (only 2’s) and 7002 (raw sum without fix) — sensible for “or.”

$$\boxed{6001}$$

---

## If your course uses ℕ = {1, 2, …} without 0

Drop **0** from each set: |*A*| = 5000, |*B*| = 2000, |*A* ∩ *B*| = 1000 → answer **6000**. On **this sheet** we include **0**, so **6001** is the official answer.

---

## Common mistakes

| Mistake | What goes wrong |
|---------|------------------|
| Using “and” instead of “or” | Counting only multiples of 10 (1001) |
| Forgetting to subtract overlap | Answer 7002 — doubles every multiple of 10 |
| Excluding 0 from ℕ here | Off by 1 compared to the exercise convention |

Back to [Task 08_2](../README.md).
