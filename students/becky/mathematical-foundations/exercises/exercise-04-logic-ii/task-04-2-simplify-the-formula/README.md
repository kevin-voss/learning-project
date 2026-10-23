# Task 04_2 · Simplify the formula

Part of [Exercise 04 · Logic II](../README.md). New ideas you need: rewriting `⇒`, De Morgan, and absorption. They are explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write the simplification steps there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Simplify the formula

`F = (¬A ∨ B) ⇒ ¬B`.

## The task, simply said

1. Start from `F = (¬A ∨ B) ⇒ ¬B`.
2. Rewrite step by step using known equivalences (for example `X ⇒ Y ≡ ¬X ∨ Y`).
3. Stop when the formula is as small as it can get, but still equivalent.
4. (Optional but smart) Check with a tiny truth table that your result matches `F` in every row.

## Check examples

| Check | What you should see |
|-------|---------------------|
| Final simplified form | Equivalent to `¬B` |
| Row `A=T`, `B=T` | Original `F` is false — same as `¬B` |
| Row `A=T`, `B=F` | Original `F` is true — same as `¬B` |
| Row `A=F`, `B=T` | Original `F` is false — same as `¬B` |
| Row `A=F`, `B=F` | Original `F` is true — same as `¬B` |

Your steps may look different from a classmate’s; the **final** formula must mean the same as `¬B`.

## Little helpers

<details>
<summary>Where do I start?</summary>

Replace the implication first: `(¬A ∨ B) ⇒ ¬B` becomes `¬(¬A ∨ B) ∨ ¬B`.

</details>

<details>
<summary>What is De Morgan here?</summary>

`¬(¬A ∨ B)` becomes `A ∧ ¬B` (flip the connective, negate both sides, cancel `¬¬A`).

</details>

<details>
<summary>I got (A ∧ ¬B) ∨ ¬B — now what?</summary>

Absorption: anything of the shape `(X ∧ ¬B) ∨ ¬B` collapses to `¬B`.

</details>

## Done when

- [ ] You wrote clear rewrite steps from `F` to the short form.
- [ ] The short form is equivalent to `¬B`.
- [ ] You can explain why `A` disappears.

Next: [Task 04_3](../task-04-3-dnf-and-cnf-via-truth-table/README.md)
