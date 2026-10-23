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

### 2. Picture first

> [!PICTURE]
> A door rule: “If it rains (`A`), then the ground is wet (`B`).”  
> Contraposition says the same idea flipped: “If the ground is **not** wet (`¬B`), then it did **not** rain (`¬A`).”  
> Today you prove they always match — with a truth table.

### 3. Methods on the table

| Method | Idea | When you choose it |
|--------|------|--------------------|
| **Truth table** | Check every switch combo | Sheet says “show validity” / tautology — **this task** |
| Algebra rewrite only | Rewrite until both sides look identical | Fine as extra, but the sheet wants the table proof |
| One example | Pick one rain/wet story | Not enough — validity needs **every** row |

**Choose truth table.**  
*Why?* “Valid” here means true in **all** rows. One story or a partial rewrite does not prove that.

### 4. What we need in the table

Two letters → **4 rows** (`TT`, `TF`, `FT`, `FF`).  
That is every switch combo.

Helpful columns:

| Column | Why |
|--------|-----|
| `¬A`, `¬B` | Needed for the right-hand side |
| `A ⇒ B` | Left side of the claim |
| `¬B ⇒ ¬A` | Right side (contraposition) |
| `(A ⇒ B) ⇔ (¬B ⇒ ¬A)` | The thing that must always be true |

### 5. Rule for implication (keep this sticky note)

`X ⇒ Y` is **false only** when `X` is true and `Y` is false.  
In every other case it is true.

Think: “if the left is on, the right must be on too.”

*Why this rule (not something else)?*  
Implication has only **one** false case. Memorize that case; everything else is true.

### 6. Fill one row at a time

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

### 7. Full table (all pieces together)

| A | B | ¬A | ¬B | A ⇒ B | ¬B ⇒ ¬A | (A ⇒ B) ⇔ (¬B ⇒ ¬A) |
|---|---|----|----|-------|---------|----------------------|
| T | T | F  | F  | T     | T       | T                    |
| T | F | F  | T  | F     | F       | T                    |
| F | T | T  | F  | T     | T       | T                    |
| F | F | T  | T  | T     | T       | T                    |

### 8. Conclusion

The last column is **T in every row**.  
So `(A ⇒ B) ⇔ (¬B ⇒ ¬A)` is a tautology → **contraposition is valid**.

In words: the door rule and its flipped twin always agree.

*Thinking check:* we chose the truth-table method on purpose, filled every row with the implication rule, and only then claimed validity.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Only comparing `A ⇒ B` with `B ⇒ A` | That is the *converse*, not contraposition | Flip **and** negate: `¬B ⇒ ¬A` |
| Declaring validity from one true row | One row is not enough | Need **all** four rows true |
| Thinking F ⇔ F is false | Wrong reading of `⇔` | Same value on both sides → true |

Back to [Task 04_1](../README.md).
