# Task 05_2 · Function properties

Part of [Exercise 05 · Logic III](../README.md). New ideas you need: quantifying over real numbers, and writing properties of `f` with `∀` / `∃` and comparisons. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write your formulas there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Let `f: ℝ → ℝ` be a real function. Formulate the following properties in predicate logic:

- a) `f` is monotonically increasing
- b) `f` is strictly monotonically increasing
- c) `f` is not point-symmetric

## The task, simply said

1. Variables range over real numbers (`x, y ∈ ℝ`).
2. Write one formula for each property.
3. For (c): first recall what “point-symmetric (about the origin)” means, then negate it so no quantifier has a `¬` stuck right in front of it if you can avoid that (prefer `∃ … ≠ …`).

## Check examples

| Part | Shape your formula should have |
|------|--------------------------------|
| a) | Two universal quantifiers, then “if *x* is ≤ *y*, then `f(x)` is ≤ `f(y)`”. |
| b) | Same idea with **strict** inequalities (`<`). |
| c) | There exists some real *x* with `f(−x) ≠ −f(x)` (or an equivalent negation of point-symmetry about the origin). |

## Little helpers

<details>
<summary>What does “monotonically increasing” mean here?</summary>

Non-decreasing: when the input grows or stays the same, the output never falls. Use `≤` on both sides.

</details>

<details>
<summary>What is “point-symmetric” for a function graph?</summary>

Symmetric under a 180° turn about the origin: for every *x*, `f(−x) = −f(x)`. “Not point-symmetric” means that fails somewhere.

</details>

<details>
<summary>Do I need a named predicate like P(x, y)?</summary>

No. Writing the comparison with `f` directly is the usual and expected form.

</details>

## Done when

- [ ] Parts a), b) and c) are written as predicate-logic formulas.
- [ ] (a) uses `≤` and (b) uses `<` in the matching places.
- [ ] (c) is clearly the negation of point-symmetry about the origin.

Next: [Task 05_3](../task-05-3-negating-a-formula/README.md)
