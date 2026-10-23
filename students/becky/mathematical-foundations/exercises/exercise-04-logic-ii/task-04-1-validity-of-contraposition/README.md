# Task 04_1 · Validity of contraposition

Part of [Exercise 04 · Logic II](../README.md). New ideas you need: truth tables and contraposition. They are explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Draw the truth table there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Show the validity of the contraposition using a truth table.

## The task, simply said

1. Write the claim you must prove: `(A ⇒ B) ⇔ (¬B ⇒ ¬A)`.
2. Make a truth table with columns for `A`, `B`, and every piece you need (`¬A`, `¬B`, `A ⇒ B`, `¬B ⇒ ¬A`, and the `⇔`).
3. Fill all four rows (every combination of `A` and `B`).
4. Check that the last column is **true in every row**. That is the proof.

## Check examples

| What to check | What you should see |
|---------------|---------------------|
| Number of rows | 4 (two letters → 2² combinations) |
| Last column `(A ⇒ B) ⇔ (¬B ⇒ ¬A)` | `T` / `1` in **every** row |
| Conclusion | Contraposition is valid (a tautology) |

One middle column you can self-check: when `A = T` and `B = F`, both `A ⇒ B` and `¬B ⇒ ¬A` are `F`, so the `⇔` is still `T`.

## Little helpers

<details>
<summary>What does “validity of the contraposition” mean exactly?</summary>

It means: the rule “`A ⇒ B` is equivalent to `¬B ⇒ ¬A`” is always true. Prove it by showing `(A ⇒ B) ⇔ (¬B ⇒ ¬A)` is a tautology.

</details>

<details>
<summary>How do I fill A ⇒ B?</summary>

`A ⇒ B` is false **only** when `A` is true and `B` is false. In every other row it is true.

</details>

<details>
<summary>Do I need 0/1 or T/F?</summary>

Either is fine. Stay consistent in the whole table.

</details>

## Done when

- [ ] The full truth table is written (all helper columns you need).
- [ ] The equivalence column is true in every row.
- [ ] You state in one sentence: the contraposition is valid.

Next: [Task 04_2](../task-04-2-simplify-the-formula/README.md)
