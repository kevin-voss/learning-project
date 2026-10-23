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

### 2. Fix the parentheses first

`⇒` is weaker than `∨`, so the sheet means:

```text
G = (A ∨ ¬(B ∨ C)) ⇒ B
```

*Why it matters:* a different parse would give a different table.

### 3. Plan the columns

Three letters → **8 rows**. Helper columns keep mistakes away:

1. `B ∨ C`
2. `¬(B ∨ C)`
3. `A ∨ ¬(B ∨ C)`  (the left side of ⇒)
4. `G` = that left side ⇒ `B`

### 4. Fill the table (one idea per column)

**How to get `¬(B ∨ C)`:** true only when both `B` and `C` are false.

**How to get `⇒`:** false only when the left side is true and `B` is false.

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

### 5. Sort the rows

- **True** (`G = T`): `TTT`, `TTF`, `FTT`, `FTF`, `FFT` → five minterms for DNF  
- **False** (`G = F`): `TFT`, `TFF`, `FFF` → three maxterms for CNF  

### 6. Build DNF — one minterm per true row

Rule: letter as-is if `T` in that row, negated if `F`. Join with `∧`. Then join all minterms with `∨`.

| True row | Minterm |
|----------|---------|
| TTT | `A ∧ B ∧ C` |
| TTF | `A ∧ B ∧ ¬C` |
| FTT | `¬A ∧ B ∧ C` |
| FTF | `¬A ∧ B ∧ ¬C` |
| FFT | `¬A ∧ ¬B ∧ C` |

**DNF:**

```text
(A ∧ B ∧ C) ∨ (A ∧ B ∧ ¬C) ∨ (¬A ∧ B ∧ C) ∨ (¬A ∧ B ∧ ¬C) ∨ (¬A ∧ ¬B ∧ C)
```

Optional shorter form (same rows — not required):

```text
B ∨ (¬A ∧ ¬B ∧ C)
```

### 7. Build CNF — one maxterm per false row

Rule (opposite of minterms): if the letter is `T` in that false row, put its **negation** in an **or**-clause; if it is `F`, put the letter itself. Join clauses with `∧`.

*Why:* that or-clause is false on exactly that one row, so the big and kills exactly the false rows.

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

### 8. Mini-check

Pick false row `TFT`: plug into the CNF — one clause becomes false → whole CNF false. Good.  
Pick true row `FFT`: every CNF clause stays true. Good.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Parsing as `A ∨ (¬(B ∨ C) ⇒ B)` | Different formula | Bind `⇒` last |
| Building maxterms like minterms | Wrong CNF | Flip polarities; use `∨` inside the clause |
| Dropping a row | Missing clause | Count: 5 DNF pieces, 3 CNF pieces |

Back to [Task 04_3](../README.md).
