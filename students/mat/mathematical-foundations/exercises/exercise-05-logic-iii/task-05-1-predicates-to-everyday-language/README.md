# Task 05_1 · Predicates to everyday language

Part of [Exercise 05 · Logic III](../README.md). New ideas you need: predicates, `∀` / `∃`, and the connectives `∨`, `¬`, `⇒`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write your everyday-language answers there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

The following predicates are given, where *x* is an element of the set of all students at Hochschule Hannover:

- `S(x)`: “*x* sleeps during the lecture”
- `Z(x)`: “*x* listens”
- `A(x, y)`: “*x* can work well together with *y*”

Rewrite the following statements into an everyday-language formulation:

- a) `∀x (S(x) ∨ ¬Z(x))`
- b) `∃x ∀y ¬A(x, y)`
- c) `∃x (¬S(x) ⇒ Z(x))`

## The task, simply said

1. Keep the sticky-note meanings of `S`, `Z` and `A` in mind.
2. For each formula, read the quantifiers from the outside in.
3. Say the same claim in plain English — no logic symbols left in your answer.

## Check examples

Your wording can differ a little; the **meaning** must match. Use these as a self-check.

| Part | Meaning you must hit |
|------|----------------------|
| a) | Every student either sleeps in the lecture, or does not listen (or both). Same idea: every student who listens also sleeps. |
| b) | There is at least one student who cannot work well with any student. |
| c) | There is at least one student for whom: if they do not sleep, then they listen. |

## Little helpers

<details>
<summary>How do I say ∀x without sounding robotic?</summary>

Start with “Every student …” or “For every student *x*, …”. Both are fine.

</details>

<details>
<summary>Part (a): is “or” inclusive?</summary>

Yes. In logic, `∨` allows both sides to be true. Your English may say “or both” if that helps.

</details>

<details>
<summary>Part (b): does *y* include the same person as *x*?</summary>

The formula does not exclude that. Say “any student” / “every student”, not “every *other* student”, unless the sheet had restricted the domain.

</details>

<details>
<summary>Part (c): can I rewrite the implication?</summary>

You may. `¬S(x) ⇒ Z(x)` means the same as `S(x) ∨ Z(x)`. Either form in English is fine if the meaning stays true.

</details>

## Done when

- [ ] Parts a), b) and c) are written in everyday English.
- [ ] Each answer matches the check row above (same meaning).
- [ ] You can explain out loud why (b) needs both `∃x` and `∀y`.

Next: [Task 05_2](../task-05-2-function-properties/README.md)
