# Task 05_3 · Negating a formula

Part of [Exercise 05 · Logic III](../README.md). New ideas you need: pushing `¬` through `∀` and `∃` until it sits only on the predicate. That is explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write the negated formula there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Negate the formula

`F = ∀x ∃y ∀z P(x, y, z)`

so that no quantifier has a negation sign immediately in front of it.

## The task, simply said

Picture three locked boxes in a row. A “not” sticker walks inside and flips every lock (`∀` ↔ `∃`) until it sits only on `P`.


1. Start from `¬F`, that is `¬ ∀x ∃y ∀z P(x, y, z)`.
2. Walk the `¬` inward: flip each quantifier (`∀` ↔ `∃`) and keep moving.
3. Stop when the only `¬` left is in front of `P(…)`, not in front of a quantifier.
4. Write that final formula.

## Check examples

| Step | After this rewrite |
|------|--------------------|
| Start | `¬ ∀x ∃y ∀z P(x, y, z)` |
| Flip outer `∀` | `∃x ¬ ∃y ∀z P(x, y, z)` |
| Flip next `∃` | `∃x ∀y ¬ ∀z P(x, y, z)` |
| Flip last `∀` | `∃x ∀y ∃z ¬P(x, y, z)` ← this is the target shape |

## Little helpers

<details>
<summary>I keep wanting to write ¬∀x … as the answer</summary>

That still has a negation immediately in front of a quantifier. The sheet forbids that. Keep pushing inward.

</details>

<details>
<summary>Do the variable names have to stay x, y, z?</summary>

Yes — keep the same order and names unless you are sure a rename does not change the meaning. Safest: leave `x`, `y`, `z` as they are.

</details>

<details>
<summary>Is ¬P(x, y, z) allowed at the end?</summary>

Yes. The ban is only on `¬` sitting **immediately in front of a quantifier**, not in front of the predicate.

</details>

## Done when

- [ ] Your answer is one formula, equivalent to `¬F`.
- [ ] No `¬` stands directly before `∀` or `∃`.
- [ ] You can show the three flip steps out loud.

Back to [Exercise 05](../README.md).
