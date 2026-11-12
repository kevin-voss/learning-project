# Task 07_3 · Linked-list stack sketch

Part of [Exercise 07 · Lists](../README.md). New ideas you need: **linked list**, stack as list, **`first`**, `next`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Draw the list and type the three values |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

A **stack implemented as a linked list** starts **empty**. These operations run **in order**:

1. `push(7)`
2. `push(3)`
3. `pop()`
4. `push(5)`
5. `push(9)`

**Draw** the resulting linked list.

(On paper you sketch boxes and arrows. Here, type the values from **`first`** toward the end, and optionally sketch in your notebook.)

## The task, simply said

1. **Empty** list: no nodes (or `first` is `null`).
2. Each **push** puts a new node at the **front** (the stack top).
3. **Pop** removes the front node.
4. After all five steps, write the **value in each node** from head to tail.

## Convention for your drawing

- **`first`** points to the **top** of the stack (left or top on paper).
- Each node: `value` and arrow `next` → following node.
- Last node: `next` is `null`.

Example shape (not the answer):

```text
first → [ value | next ] → [ value | next ] → null
```

## Check examples

After all operations, walking from `first`:

| Position | Value |
|----------|-------|
| 1st node (top) | `9` |
| 2nd node | `5` |
| 3rd node (bottom) | `7` |

ASCII sketch that matches:

```text
first ──→ 9 ──→ 5 ──→ 7 ──→ null
```

## Little helpers

<details>
<summary>What does pop remove on a linked-list stack?</summary>

It removes the node at **`first`** — the same place where push adds.

</details>

<details>
<summary>After push(7) then push(3), where is 7?</summary>

`3` is at `first`. `7` is the **second** node (`first.next`).

</details>

## Done when

- [ ] Your three values in order are `9`, `5`, `7`.
- [ ] Your sketch shows `first` at node `9` and `null` after `7`.

Back to [Exercise 07](../README.md).
