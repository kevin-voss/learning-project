# Task 07_1 · Stack next two pops

Part of [Exercise 07 · Lists](../README.md). New ideas you need: **stack**, **push**, **pop**, LIFO. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Type your two answers |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

An **empty stack** receives these values **one after another** (each step is a `push`):

`7`, `8`, `3`, `1`, `6`

Which **two numbers** are taken off next if you call `pop()` **twice**?

## The task, simply said

1. Picture a stack of plates: every new number sits on **top**.
2. Write the order of numbers from **bottom** to **top** after all five pushes.
3. The **first** `pop()` removes the top — write that number.
4. The **second** `pop()` removes the new top — write that number too.

## Check examples

Your answer is right when it matches this table.

| Question | Your answer |
|----------|-------------|
| First `pop()` | `6` |
| Second `pop()` | `1` |

## Little helpers

<details>
<summary>Does pop take from the bottom?</summary>

No. **Pop** always takes the **top** — the last value that was pushed.

</details>

<details>
<summary>What order are the numbers stored in?</summary>

Bottom to top after all pushes: `7`, `8`, `3`, `1`, `6`. The top is the **last** pushed value.

</details>

## Done when

- [ ] Both pop answers match the check table.
- [ ] You can say in one sentence why a stack is “last in, first out.”

Back to [Exercise 07](../README.md).
