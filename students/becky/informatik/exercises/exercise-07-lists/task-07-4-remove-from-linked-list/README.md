# Task 07_4 · Remove from linked list

Part of [Exercise 07 · Lists](../README.md). New ideas you need: walking a linked list, unlinking a node. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Short explanation in English |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

What does the following function `remove(L, v)` do with a linked list `L` and a given value `v`?

**JavaScript code (from the sheet):**

```javascript
function remove(L, v) {
  var x = L.first;
  while (x.next !== null && x.next.value !== v) {
    x = x.next;
  }
  if (x.next !== null) {
    x.next = x.next.next;
  }
}
```

Assume each node has `value` and `next`, and `L.first` is the head (same style as in the lecture).

## The task, simply said

1. Read what `x` is at the start.
2. Say when the `while` loop **stops**.
3. Say what happens in the `if` block — which link changes?
4. Summarize in **one or two English sentences** what the list looks like after a successful call.

## Check examples

Your summary should include these ideas (wording may differ):

| Idea | Must be true |
|------|----------------|
| Walk | The loop moves `x` along the list while the **next** node exists and its value is **not** `v`. |
| Stop | It stops when `x.next` has value `v`, or when there is **no** `x.next`. |
| Unlink | If a matching next node exists, that node is **skipped** (`x.next` jumps to the node after it). |
| First node | If `v` is only in **`L.first`**, the function **does not** remove it (the loop looks at **`x.next`**, not `x` itself). |

## Little helpers

<details>
<summary>Which node is x when we change x.next?</summary>

`x` is always the node **before** the one you might remove — the node whose `next` you rewire.

</details>

<details>
<summary>What if no node has value v?</summary>

The `while` runs until `x.next` is `null`. Then `if (x.next !== null)` is false — **nothing** is removed.

</details>

## Done when

- [ ] You explained the loop and the unlink step in your own words.
- [ ] You mentioned that the **first** node is not removed when only `L.first.value === v`.

Back to [Exercise 07](../README.md).
