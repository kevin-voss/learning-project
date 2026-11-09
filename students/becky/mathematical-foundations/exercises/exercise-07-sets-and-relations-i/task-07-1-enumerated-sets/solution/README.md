# Sample solution · Task 07_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

There is no program. Compare your lists to the steps below. We use **ℕ = {0, 1, 2, …}** (see the exercise page).

---

## How it works, step by step

**Aim in one sentence:** Turn each set-builder rule into an explicit list `{ … }`.

**Rules on the table:**

| Tool | What it does |
|------|----------------|
| Strict inequality | *a* < *x* < *b* means *x* is between *a* and *b*, **without** touching the ends |
| “*d* divides 30” | 30 = *d* · *k* for some *k* in ℕ (list all such *d*) |
| “30 divides *d*” | *d* = 30 · *k* for some *k* in ℕ (multiples of 30) |
| { *f*(*n*) | … } | Compute *f*(*n*) for every *n* allowed, then drop duplicates |

### Part a

1. **What we see:** *x* must be in ℕ **and** strictly between −3,3 and 2,7.
2. **Which rule:** Strict bounds — end values do not count.
3. **Why not ℤ yet?** Part (a) only allows **non-negative** integers.
4. **Apply:** Integers with −3,3 < *x* < 2,7 are …, −3, −2, −1, 0, 1, 2 — but ℕ has no negatives, so only **0, 1, 2**.
5. **Mini-check:** 2 < 2,7 ✓; 3 is too big ✗.

**Answer a:** { 0, 1, 2 }

### Part b

1. **What we see:** Same bounds, but *x* ∈ ℤ — **all** integers allowed.
2. **Which rule:** Same strict strip on the number line.
3. **Apply:** From −3,3 upward: first integer inside is **−3**; below 2,7 the last integer is **2**.
4. **List:** −3, −2, −1, 0, 1, 2.
5. **Mini-check:** Count 6 numbers; part (a) was only the non-negative tail.

**Answer b:** { −3, −2, −1, 0, 1, 2 }

### Part c

1. **Aim:** All *d* ∈ ℕ with 30 = *d* · *k*.
2. **Strategy:** Try divisors in order — or factor 30 = 2 · 3 · 5 and combine.
3. **Divisors:** 1, 2, 3, 5, 6, 10, 15, 30.
4. **Mini-check:** 30 ÷ 7 leaves remainder — 7 is not in the list ✓.

**Answer c:** { 1, 2, 3, 5, 6, 10, 15, 30 }

### Part d

1. **Translate:** “30 divides *d*” means *d* = 30 · *k* for *k* ∈ ℕ (here *k* ≥ 1 gives the usual positives).
2. **Shape:** 30, 60, 90, … — never stops.
3. **Enumerated form with dots:** { 30, 60, 90, … }

**Answer d:** { 30, 60, 90, … } (infinite)

### Part e

1. **Allowed *n*:** *n* ∈ ℕ and *n* ≤ 5 ⇒ *n* ∈ {0, 1, 2, 3, 4, 5}.
2. **Compute:**

| *n* | *n*² + 1 |
|-----|---------|
| 0 | 1 |
| 1 | 2 |
| 2 | 5 |
| 3 | 10 |
| 4 | 17 |
| 5 | 26 |

3. **As a set:** all values are different — keep them all.

**Answer e:** { 1, 2, 5, 10, 17, 26 }

---

## If your course uses ℕ = {1, 2, 3, …}

Then **a** becomes { 1, 2 } (drop 0) and **e** uses *n* ∈ {1,…,5}, giving { 2, 5, 10, 17, 26 }.

## Common mistakes

| Mistake | What you see | Fix |
|---------|----------------|-----|
| Forgetting 0 in ℕ | **a** or **e** misses 0 | Say clearly which ℕ you use; here 0 counts |
| Including endpoints | **a** or **b** has 2,7 or −3,3 | Strict **<** — ends are out |
| Missing a divisor of 30 | **c** skips 6 or 15 | Check 30 = 2·15 = 3·10 = 5·6 |
| Finite list for **d** | You stop at one number | Multiples of 30 go on forever — use … |
| Duplicates in **e** | You write 1 twice | Sets never list duplicates |

Back to [Task 07_1](../README.md)
