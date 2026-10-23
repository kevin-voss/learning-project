# Sample solution · Task 04_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Your DNF and CNF must be true on exactly the same rows as the original formula.

## How it works, step by step

### 1. Aim

Turn

```text
A ∨ ¬(B ∨ C) ⇒ B
```

into an equivalent **DNF** and an equivalent **CNF**, using a truth table.

### 2. Picture first

> [!PICTURE]
> A scoreboard with eight switch combos. Some rows light the lamp (`T`). Some leave it dark (`F`).  
> **DNF** copies the lit rows as a big **or** of small **and**-blocks.  
> **CNF** copies the dark rows as a big **and** of small **or**-blocks.

### 3. Recipes on the table (two tools)

| Recipe | Built from | Shape | When you choose it |
|--------|------------|-------|--------------------|
| **DNF** | rows where `G` is **true** | or of and-blocks (minterms) | Sheet asks for DNF / “disjunctive” |
| **CNF** | rows where `G` is **false** | and of or-blocks (maxterms) | Sheet asks for CNF / “conjunctive” |

This sheet asks for **both**. So we will use **both** recipes — one after the other.

*Why not simplify with algebra instead?*  
The sheet wants DNF/CNF **via truth table**. So the thinking is: fill the table → sort true/false rows → copy those rows into formulas.

### 4. Fix the parentheses first

`⇒` is weaker than `∨`, so the sheet means:

```text
G = (A ∨ ¬(B ∨ C)) ⇒ B
```

*Why this parse (not another)?*  
If you bind `⇒` earlier, you get a different formula and a different table. Match the course precedence.

### 5. Plan the columns

Three letters → **8 rows**. Helper columns keep mistakes away:

1. `B ∨ C`
2. `¬(B ∨ C)`
3. `A ∨ ¬(B ∨ C)`  (the left side of ⇒)
4. `G` = that left side ⇒ `B`

*Why helpers?*  
So each column uses **one** tiny rule (or, not, or, implication) — easier than doing everything at once.

### 6. Fill the table (one idea per column)

**Rule for `¬(B ∨ C)`:** true only when both `B` and `C` are false.

**Rule for `⇒`:** false only when the left side is true and `B` is false.

| A | B | C | B ∨ C | ¬(B ∨ C) | A ∨ ¬(B ∨ C) | G |
|---|---|---|-------|----------|--------------|---|
| T | T | T | T     | F        | T            | T |
| T | T | F | T     | F        | T            | T |
| T | F | T | T     | F        | T            | F |
| T | F | F | F     | T        | T            | F |
| F | T | T | T     | F        | F            | T |
| F | T | F | T     | F        | F            | T |
| F | F | T | T     | F        | F            | T |
| F | F | F | F     | T        | T            | F |

### 7. Sort the rows

- **True** (`G = T`): `TTT`, `TTF`, `FTT`, `FTF`, `FFT` → five minterms for DNF  
- **False** (`G = F`): `TFT`, `TFF`, `FFF` → three maxterms for CNF  

### 8. Build DNF — choose the true-row recipe

**Thinking:** sheet asks for DNF → pick lit rows only.  
**Rule for one minterm:** letter as-is if `T` in that row, negated if `F`. Join with `∧`.  
**Then:** join all minterms with `∨`.

*Why not use false rows here?*  
False rows are for CNF. Mixing them would change the meaning.

| True row | Minterm | In words |
|----------|---------|----------|
| TTT | `A ∧ B ∧ C` | A on, B on, C on |
| TTF | `A ∧ B ∧ ¬C` | A on, B on, C off |
| FTT | `¬A ∧ B ∧ C` | A off, B on, C on |
| FTF | `¬A ∧ B ∧ ¬C` | A off, B on, C off |
| FFT | `¬A ∧ ¬B ∧ C` | A off, B off, C on |

**DNF:**

```text
(A ∧ B ∧ C) ∨ (A ∧ B ∧ ¬C) ∨ (¬A ∧ B ∧ C) ∨ (¬A ∧ B ∧ ¬C) ∨ (¬A ∧ ¬B ∧ C)
```

Optional shorter form (same rows — not required):

```text
B ∨ (¬A ∧ ¬B ∧ C)
```

### 9. Build CNF — choose the false-row recipe

**Thinking:** sheet asks for CNF → pick dark rows only.  
**Rule for one maxterm (opposite of minterms):** if the letter is `T` in that false row, put its **negation** in an **or**-clause; if it is `F`, put the letter itself. Join clauses with `∧`.

*Why this polarity?*  
That or-clause is false on exactly that one row, so the big and kills exactly the false rows.

| False row | Maxterm |
|-----------|---------|
| TFT (`A=T, B=F, C=T`) | `¬A ∨ B ∨ ¬C` |
| TFF | `¬A ∨ B ∨ C` |
| FFF | `A ∨ B ∨ C` |

**CNF:**

```text
(¬A ∨ B ∨ ¬C) ∧ (¬A ∨ B ∨ C) ∧ (A ∨ B ∨ C)
```

Optional shorter form (same rows — not required):

```text
(¬A ∨ B) ∧ (B ∨ C)
```

### 10. Mini-check

Pick false row `TFT`: plug into the CNF — one clause becomes false → whole CNF false. Good.  
Pick true row `FFT`: every CNF clause stays true. Good.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Parsing as `A ∨ (¬(B ∨ C) ⇒ B)` | Different formula | Bind `⇒` last |
| Building maxterms like minterms | Wrong CNF | Flip polarities; use `∨` inside the clause |
| Dropping a row | Missing clause | Count: 5 DNF pieces, 3 CNF pieces |

Back to [Task 04_3](../README.md).
