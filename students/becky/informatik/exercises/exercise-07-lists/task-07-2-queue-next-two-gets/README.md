# Task 07_2 · Queue next two gets

Part of [Exercise 07 · Lists](../README.md). New ideas you need: **queue**, FIFO, **`get()`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Type your two answers |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

An **empty queue** receives these values **one after another**:

`7`, `8`, `3`, `1`, `6`

Which **two numbers** are taken off next if you call `get()` **twice**?

(The sheet uses the name `get()` for “take from the front.”)

## The task, simply said

1. Picture a bakery line: the **first** value in stays at the **front**.
2. After all five values are in, list them from **front** to **back**.
3. The **first** `get()` serves the front person — write that number.
4. The **second** `get()` serves the new front — write that number.

## Check examples

| Question | Your answer |
|----------|-------------|
| First `get()` | `7` |
| Second `get()` | `8` |

## Little helpers

<details>
<summary>Is a queue the same as a stack?</summary>

No. A **queue** takes from the **front** (first in, first out). A **stack** takes from the **top** (last in, first out). Task 07_1 used the same numbers but different rules.

</details>

## Done when

- [ ] Both `get()` answers match the check table.
- [ ] You can explain why the first `get()` is `7`, not `6`.

Back to [Exercise 07](../README.md).
