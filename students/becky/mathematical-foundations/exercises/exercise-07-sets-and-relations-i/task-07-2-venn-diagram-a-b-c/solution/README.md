# Sample solution · Task 07_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

There is no program. Check your lists against the steps below, then see if your diagram puts tricky numbers (like **1**, **2**, **17**) in the right zones.

---

## How it works, step by step

**Aim in one sentence:** List **A**, **B**, and **C**, then draw a three-set Venn diagram that shows every overlap.

**Rules on the table:**

| Tool | What it does |
|------|----------------|
| Prime | Integer ≥ 2 with no positive divisors except 1 and itself |
| Odd | Integer of the form 2*k* + 1 |
| Venn diagram | Circles = sets; overlap = elements in both |

### Step 1 — list A

1. **What we see:** *a* ∈ ℕ, 1 ≤ *a* ≤ 5. Use ℕ = {0,1,2,…}; only 1…5 count.
2. **List:** **A** = { 1, 2, 3, 4, 5 }.

### Step 2 — list B (primes up to 20)

1. **What we see:** primes with 1 ≤ *b* ≤ 20.
2. **Why skip 1?** 1 is **not** prime.
3. **List primes:** 2, 3, 5, 7, 11, 13, 17, 19.  
   **B** = { 2, 3, 5, 7, 11, 13, 17, 19 }.

### Step 3 — list C (odd numbers up to 15)

1. **What we see:** odd *c*, 1 ≤ *c* ≤ 15.
2. **List:** 1, 3, 5, 7, 9, 11, 13, 15.  
   **C** = { 1, 3, 5, 7, 9, 11, 13, 15 }.

### Step 4 — who overlaps whom (before drawing)

1. **A ∩ B ∩ C** — in all three: must be prime, odd, and ≤ 5 ⇒ **{ 3, 5 }**.
2. **A ∩ B only** (not in C): prime and in A but **even** ⇒ **{ 2 }**.
3. **A ∩ C only** (not in B): odd in A but **not** prime ⇒ **{ 1 }**.
4. **B ∩ C only, not in A:** odd primes in B that are **> 5** but still **≤ 15** ⇒ **{ 7, 11, 13 }**.
5. **Only A:** in A, not prime, not odd ⇒ **{ 4 }**.
6. **Only B:** in B, not in C (so *b* > 15) or not in A … primes 17, 19 are **> 15** ⇒ **{ 17, 19 }**.
7. **Only C:** odd in C, not in A (so > 5), not prime ⇒ **9** and **15** ⇒ **{ 9, 15 }**.

**Mini-check:** Union of these disjoint regions should cover **A** ∪ **B** ∪ **C** with no number missing.

### Step 5 — diagram (description you can draw)

Draw **three** circles **A**, **B**, **C** in the usual way (pairwise overlap + central triple region).

| Region (shape) | Numbers |
|----------------|---------|
| Centre (A ∩ B ∩ C) | 3, 5 |
| A ∩ B, not C | 2 |
| A ∩ C, not B | 1 |
| B ∩ C, not A | 7, 11, 13 |
| Only A | 4 |
| Only B | 17, 19 |
| Only C | 9, 15 |

That is one correct layout; your circles can look different as long as the **membership** is right.

---

## Common mistakes

| Mistake | What you see | Fix |
|---------|----------------|-----|
| Calling 1 prime | 1 sits inside B | Remove 1 from B |
| Putting 2 in C | 2 is odd? | 2 is **even** — C is only odd numbers |
| Dropping 17 and 19 | B looks like only {2,…,13} | B runs to **20**; include **17, 19** (they sit only in B) |
| Wrong “only C” | You forget 9 or 15 | They are odd, ≤ 15, but not in A and not prime |

Back to [Task 07_2](../README.md)
