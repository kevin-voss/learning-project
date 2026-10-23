# Task 04_3 · DNF and CNF via truth table

Part of [Exercise 04 · Logic II](../README.md). New ideas you need: truth tables, DNF, and CNF. They are explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Build the table and both normal forms there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Transform the formula

`A ∨ ¬(B ∨ C) ⇒ B`

into an equivalent DNF and an equivalent CNF using a truth table.

## The task, simply said

1. Read the formula as `(A ∨ ¬(B ∨ C)) ⇒ B` (`⇒` is weaker than `∨`).
2. Build a truth table for `A`, `B`, `C` (8 rows) and evaluate the formula.
3. **DNF:** for every row where the formula is **true**, write one and-clause (minterm). Join those clauses with **or**.
4. **CNF:** for every row where the formula is **false**, write one or-clause (maxterm). Join those clauses with **and**.

## Check examples

| Check | What you should see |
|-------|---------------------|
| True rows (for DNF) | `TTT`, `TTF`, `FTT`, `FTF`, `FFT` (writing `A B C`) |
| False rows (for CNF) | `TFT`, `TFF`, `FFF` |
| Sample true minterm `TTF` | `A ∧ B ∧ ¬C` |
| Sample false maxterm `TFT` | `¬A ∨ B ∨ ¬C` |

You may also simplify further afterwards; the sheet asks for forms obtained **via the truth table**, so the canonical DNF/CNF from the rows is enough.

## Little helpers

<details>
<summary>How do I build a minterm from a row?</summary>

For each letter: if it is `T` in that row, keep the letter; if it is `F`, write its negation. Join with `∧`.  
Example `A=T`, `B=F`, `C=T` → `A ∧ ¬B ∧ C`.

</details>

<details>
<summary>How do I build a maxterm from a false row?</summary>

Opposite of the minterm idea: if the letter is `T`, put its negation in the or-clause; if it is `F`, put the letter itself. Join with `∨`.  
Example `A=T`, `B=F`, `C=T` → `¬A ∨ B ∨ ¬C`.

Why? That clause is false exactly on that one row, so the big `∧` of such clauses kills exactly the false rows.

</details>

<details>
<summary>Do I need a column for ¬(B ∨ C)?</summary>

Yes, helper columns keep mistakes away. Suggested columns: `B ∨ C`, `¬(B ∨ C)`, `A ∨ ¬(B ∨ C)`, then the implication `… ⇒ B`.

</details>

## Done when

- [ ] The 8-row truth table is complete.
- [ ] DNF is the or of the five true minterms (or an equivalent shorter DNF you justify).
- [ ] CNF is the and of the three false maxterms (or an equivalent shorter CNF you justify).

Next: [Task 04_4](../task-04-4-zweisteins-exams/README.md)
