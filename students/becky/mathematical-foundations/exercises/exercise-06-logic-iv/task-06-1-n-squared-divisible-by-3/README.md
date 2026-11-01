# Task 06_1 · n squared divisible by 3

Part of [Exercise 06 · Logic IV](../README.md). New ideas you need: direct proof and divisibility. They are explained on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write your proof there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Prove by a **direct proof** the statement: If *n* is divisible by 3, then *n*² is also divisible by 3.

## The task, simply said

1. Write the claim in symbols: “3 \| *n* ⇒ 3 \| *n*²”.
2. Start the proof: “Assume 3 divides *n*.”
3. Use the definition: write *n* = 3*k* for some integer *k*.
4. Square both sides and factor so you see *n*² = 3 × (an integer).
5. Conclude: therefore 3 divides *n*².

## Check examples

These are quick checks after you finish — not a substitute for the proof.

| Check | You should see |
|-------|----------------|
| Pick *n* = 9 | 9² = 81 and 81 = 3 × 27 |
| Pick *n* = −3 | (−3)² = 9 and 9 = 3 × 3 |
| Shape of your last line | *n*² = 3 · (something with no fractions) |

Your proof must work for **every** integer *n* with 3 \| *n*, not only these examples.

## Little helpers

<details>
<summary>What is a “direct proof” here?</summary>

You never assume the thing you want to prove. You only assume the **if** part (3 divides *n*) and derive the **then** part (3 divides *n*²).

</details>

<details>
<summary>Which letter is the “some integer”?</summary>

After “3 divides *n*”, the definition gives *n* = 3*k*. The letter *k* can be any integer (positive, negative, or zero). You do not need to know *k* exactly.

</details>

<details>
<summary>Do I need to expand (3*k*)² as 9*k*²?</summary>

Yes — that is the usual step. Then group as 3(3*k*²) so the “3 times integer” shape is clear.

</details>

## Done when

- [ ] You stated the assumption and the goal in words or symbols.
- [ ] You used *n* = 3*k* and showed *n*² = 3 × (an integer).
- [ ] You ended with a clear “therefore 3 divides *n*²”.

Next: [Task 06_2](../task-06-2-three-consecutive-numbers-sum/README.md)
