# Task 04_4 · Zweistein's exams

Part of [Exercise 04 · Logic II](../README.md). New ideas you need: turning everyday sentences into formulas. That is explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Translate, reason, and answer there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Student Zweistein, who never lies, reports on the results of his exams:

1. I passed Mathematics and Programming, or it is not the case that I passed Programming or BWL.
2. It is false that I passed Programming or failed Mathematics.

Which exams did Zweistein pass?

## The task, simply said

1. Invent letters, for example:  
   `M` = passed Mathematics, `P` = passed Programming, `B` = passed BWL.
2. Turn sentence (1) into a formula.  
3. Turn sentence (2) into a formula.  
   (“Failed Mathematics” means `¬M`.)
4. Because Zweistein never lies, **both** formulas are true. Find which combination of `M`, `P`, `B` works.
5. Answer in plain English: which exams did he pass?

## Check examples

| Piece | Meaning you must hit |
|-------|----------------------|
| Sentence (1) | `(M ∧ P) ∨ ¬(P ∨ B)` — same as `(M ∧ P) ∨ (¬P ∧ ¬B)` |
| Sentence (2) | `¬(P ∨ ¬M)` — same as `M ∧ ¬P` |
| Final answer | He passed **Mathematics** only (not Programming, not BWL) |

## Little helpers

<details>
<summary>How do I read “or it is not the case that …”?</summary>

The big shape is `X ∨ ¬Y`. Here `X` is “passed Math and Programming”, and `Y` is “passed Programming or BWL”.

</details>

<details>
<summary>Sentence (2) looks scary</summary>

“It is false that (P or failed Math)” → `¬(P ∨ ¬M)`.  
De Morgan: `¬P ∧ ¬¬M` → `¬P ∧ M`. So he **passed Math** and **did not** pass Programming.

</details>

<details>
<summary>After (2), what about BWL?</summary>

Plug `M = true` and `P = false` into formula (1). The left part `M ∧ P` dies. What remains forces `¬B`, so he did not pass BWL either.

</details>

## Done when

- [ ] Both sentences are written as formulas.
- [ ] You show why only one combination of pass/fail works.
- [ ] The plain-English answer names exactly the exams he passed.

Back to [Exercise 04](../README.md).
