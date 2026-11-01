# Task 06_3 · n squared plus n is even

Part of [Exercise 06 · Logic IV](../README.md). New ideas you need: even numbers and **complete induction**. They are on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write your proof there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Prove by **complete induction**: *n*² + *n* is even for all natural numbers *n* ≥ 0.

## The task, simply said

1. **Claim:** for every natural *n* ≥ 0, the number *n*² + *n* is even.
2. **Base case:** check *n* = 0.
3. **Inductive hypothesis:** assume *n*² + *n* is even for some fixed *n* ≥ 0.
4. **Inductive step:** prove (*n* + 1)² + (*n* + 1) is even, using the hypothesis.
5. **Conclusion:** by complete induction, the claim holds for all *n* ≥ 0.

## Check examples

| *n* | *n*² + *n* | Even? |
|-----|------------|-------|
| 0 | 0 | yes (0 = 2 × 0) |
| 1 | 2 | yes |
| 2 | 6 | yes |
| 5 | 30 | yes |

Examples help you believe the claim; **induction** is what proves it for all *n*.

## Little helpers

<details>
<summary>What must I write for the inductive hypothesis?</summary>

A clear sentence like: “Assume *n*² + *n* is even for some natural *n* ≥ 0.” You do **not** assume it for all *n* at once — only for one fixed *n* while you prove the next case.

</details>

<details>
<summary>How do I expand (*n* + 1)² + (*n* + 1)?</summary>

(*n* + 1)² = *n*² + 2*n* + 1. Add (*n* + 1) to get *n*² + 3*n* + 2. Then try to group terms so you see “even + even” or a single 2 × integer.

</details>

<details>
<summary>Can I use “*n* and *n* + 1 are consecutive so one is even”?</summary>

That is true and explains *why* the formula behaves nicely, but the sheet asks for **complete induction**. Follow the base + step layout.

</details>

## Done when

- [ ] Base case *n* = 0 is written and checked.
- [ ] Inductive hypothesis is stated before the step.
- [ ] Inductive step ends with “(*n* + 1)² + (*n* + 1) is even”.
- [ ] You close with “by complete induction … for all *n* ≥ 0”.

Back to [Exercise 06](../README.md)
