# Sample solution · Task 08_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

One integer: how many VIF students live outside Hannover.

---

## How it works, step by step

**Aim in one sentence:** Find |VIF ∩ (not Hannover)|.

**Labels:**

| Symbol | Meaning | Given |
|--------|---------|-------|
| BIS | Business Informatics students | \|BIS\| = 38 |
| VIF | Administrative Informatics students | (find) |
| H | Live in Hannover | \|H\| = 35 |
| Universe | All students in the course | 64 |

**Fact:** BIS ∩ VIF = ∅ and BIS ∪ VIF = all 64 students.

---

### Step 1 — How many VIF students in total?

1. **What we see:** Everyone is **only** BIS or **only** VIF.
2. **Apply:** |VIF| = 64 − 38 = **26**.

---

### Step 2 — Who in Hannover is not BIS?

1. **In Hannover:** 35 students total; **30** of them are BIS.
2. **Subtract:** 35 − 30 = **5** Hannover residents are **not** BIS.
3. **Why they must be VIF:** No student does both programs, so “not BIS” means **VIF** here.
4. **So:** |VIF ∩ H| = **5**.

---

### Step 3 — VIF outside Hannover

1. **Region wanted:** VIF minus those 5 in Hannover.
2. **Apply:** 26 − 5 = **21**.

$$\boxed{21}$$

**Venn words:** In the **VIF** circle, the part **outside** the **Hannover** blob has **21** students.

---

## Common mistakes

| Mistake | Result |
|---------|--------|
| Answering 5 | That is **VIF in Hannover**, not VIF **outside** |
| Using 35 − 38 | Mixing “live in Hannover” with “study BIS” without the 30 in the middle |
| Forgetting disjoint programs | Treating someone as both BIS and VIF |

Back to [Task 08_3](../README.md).
