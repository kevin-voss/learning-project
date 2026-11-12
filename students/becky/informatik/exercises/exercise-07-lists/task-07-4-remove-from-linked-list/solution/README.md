# Solution · Task 07_4

## Aim

Explain what `remove(L, v)` does to linked list `L`.

## The code (sheet)

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

## Rules on the table

| Piece | Role |
|-------|------|
| `x = L.first` | Start at the head, but the loop watches **`x.next`**, not `x`. |
| `while` condition | Keep walking while there **is** a next node **and** that next node’s value is **not** `v`. |
| `x.next = x.next.next` | **Unlink** the node after `x` by pointing past it. |

## Step by step (how to read it)

1. Put pointer `x` on the **first** node.
2. **Loop:** as long as `x` has a next node and that next node’s value ≠ `v`, move `x` forward.
   - When the loop stops, either
     - `x.next` has value `v` (found a victim **after** `x`), or
     - `x.next` is `null` (no next node — `v` was not found after `x`).
3. **If** `x.next` exists, set `x.next` to `x.next.next`.
   - The node that held `v` is no longer reachable from `x`.
4. If `x.next` was already `null`, do nothing.

## Tiny example

List: `4 → 7 → 7 → 2`, call `remove(L, 7)`.

| Step | `x` at | `x.next.value` | Action |
|------|--------|----------------|--------|
| Start | node `4` | `7` | Loop does **not** run (next already equals `v`). |
| `if` | node `4` | `7` | `x.next` becomes the node with `2` → list `4 → 7 → 2` |

Only the **first** `7` **after** the head is removed (the one directly after `4`).

## Special case: `v` only in the first node

List: `7 → 4 → 2`, `remove(L, 7)`.

- `x` is node `7`. Loop checks `x.next` (value `4`) ≠ `7` → walk to node `4`.
- Eventually `x.next` is `null` → `if` does nothing.  
**The head `7` stays.** The function never compares `x.value` with `v` in the loop.

## Final answer (one sentence)

**`remove(L, v)` walks from `first` and removes the first node whose value is `v` among the nodes **after** the current position — that is, it unlinks the first match found as `x.next`, and it does **not** remove `v` when `v` is only stored in `L.first`.**

Longer wording is fine if it mentions:

- walking with `x`,
- stopping when `x.next.value === v`,
- linking `x.next` past that node,
- no change when `v` is missing or only at the head.

## Common mistakes

| Mistake | Why it is wrong |
|---------|-----------------|
| “Removes every `v`” | Only **one** `x.next` unlink per call. |
| “Removes `v` at the head” | The `while` only tests **`x.next.value`**, not `x.value`. |
| “Deletes `x`” | The code changes **`x.next`**, not `x` itself. |

Back to [Task 07_4](../README.md).
