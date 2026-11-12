# Task 08_1 · Simplify three set expressions

Part of [Exercise 08 · Sets and Relations II](../README.md). New ideas you need: complement, De Morgan, absorption, difference with complement. They are explained on the exercise page.

| Folder | What it is |
|--------|------------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write your simplified sets there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English.)*

Simplify the following sets (write each answer using only **A**, **B**, **C**, ∪, ∩, \, and overline — as simple as you can):

- **M1** = Ā ∩ (A ∩ B)̅
- **M2** = (A ∪ B) ∩ (B̅ ∪ A ∪ C ∪ B)
- **M3** = (A \ B̅) ∪ (A ∪ (B \ A))

## The task, simply said

1. **M1**: Inside the big bracket is *A* ∩ *B*; the bar means “not that whole piece.” Use **De Morgan** on (A ∩ B)̅ first.
2. **M2**: The right-hand side has **B̅ ∪ B** hiding inside *B*̅ ∪ *A* ∪ *C* ∪ *B*. Think what *B*̅ ∪ *B* covers.
3. **M3**: Rewrite *A* \ *B*̅, and remember *A* ∪ (*B* \ *A*) is a standard shrink to one union.
4. Each final answer should be a **short** expression (often one or two operations, not a long chain).

## Check examples

These checks help you see if you are on track (not full grading — your steps must be correct too).

| Part | Quick sanity check |
|------|-------------------|
| **M1** | The answer has **only *A*** (via complement or intersection), not a messy triple mix |
| **M2** | The whole right part can become the **universe**; then ∩ with (*A* ∪ *B*) is just … |
| **M3** | Final form is the same as a simple **union** of *A* and *B* |

## Little helpers

<details>
<summary>Which rule first when I see a bar over a bracket?</summary>

Try **De Morgan** on the **inside** expression: (A ∩ B)̅ becomes Ā ∪ B̅; (A ∪ B)̅ becomes Ā ∩ B̅. Then use union/intersection laws.

</details>

<details>
<summary>What is B̅ ∪ B?</summary>

Every element is either in **B** or outside **B**. So **B**̅ ∪ **B** is the **whole universe** (for the problem’s context).

</details>

## Done when

- [ ] **M1**, **M2**, and **M3** each have a simplified formula written clearly.
- [ ] You can name the rule you used at each main step (De Morgan, absorption, …).

Next: [Task 08_2](../task-08-2-divisible-by-2-or-5-up-to-10000/README.md)
