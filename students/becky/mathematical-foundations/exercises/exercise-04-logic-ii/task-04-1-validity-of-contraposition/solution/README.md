# Sample solution · Task 04_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Match the steps below. Your last column must be true in every row.

## How it works, step by step

### 1. Aim

Show that **contraposition is valid**: the two formulas mean the same thing in every case.

```text
(A ⇒ B)  ⇔  (¬B ⇒ ¬A)
```

“Valid” here = this big `⇔` is a **tautology** (true in every truth-table row).

### 2. What we need in the table

Two letters → **4 rows** (`TT`, `TF`, `FT`, `FF`).

Helpful columns:

| Column | Why |
|--------|-----|
| `¬A`, `¬B` | Needed for the right-hand side |
| `A ⇒ B` | Left side of the claim |
| `¬B ⇒ ¬A` | Right side (contraposition) |
| `(A ⇒ B) ⇔ (¬B ⇒ ¬A)` | The thing that must always be true |

### 3. Rule for implication (keep this sticky note)

`X ⇒ Y` is **false only** when `X` is true and `Y` is false.  
In every other case it is true.

### 4. Fill one row at a time

**Row A=T, B=T**

1. `¬A = F`, `¬B = F`
2. `A ⇒ B`: T ⇒ T → **T** (not the bad case)
3. `¬B ⇒ ¬A`: F ⇒ F → **T** (antecedent false → implication true)
4. T ⇔ T → **T**

**Row A=T, B=F** (the interesting row)

1. `¬A = F`, `¬B = T`
2. `A ⇒ B`: T ⇒ F → **F** (this is the only false case for ⇒)
3. `¬B ⇒ ¬A`: T ⇒ F → **F** (same pattern on the flipped side)
4. F ⇔ F → **T**  
   *Why this still works:* both sides fail together, so they still “match”.

**Row A=F, B=T**

1. `¬A = T`, `¬B = F`
2. `A ⇒ B`: F ⇒ T → **T**
3. `¬B ⇒ ¬A`: F ⇒ T → **T**
4. T ⇔ T → **T**

**Row A=F, B=F**

1. `¬A = T`, `¬B = T`
2. `A ⇒ B`: F ⇒ F → **T**
3. `¬B ⇒ ¬A`: T ⇒ T → **T**
4. T ⇔ T → **T**

### 5. Full table (all pieces together)

| A | B | ¬A | ¬B | A ⇒ B | ¬B ⇒ ¬A | (A ⇒ B) ⇔ (¬B ⇒ ¬A) |
|---|---|----|----|-------|---------|----------------------|
| T | T | F  | F  | T     | T       | T                    |
| T | F | F  | T  | F     | F       | T                    |
| F | T | T  | F  | T     | T       | T                    |
| F | F | T  | T  | T     | T       | T                    |

### 6. Conclusion

The last column is **T in every row**.  
So `(A ⇒ B) ⇔ (¬B ⇒ ¬A)` is a tautology → **contraposition is valid**.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Only comparing `A ⇒ B` with `B ⇒ A` | That is the *converse*, not contraposition | Flip **and** negate: `¬B ⇒ ¬A` |
| Declaring validity from one true row | One row is not enough | Need **all** four rows true |
| Thinking F ⇔ F is false | Wrong reading of `⇔` | Same value on both sides → true |

Back to [Task 04_1](../README.md).
