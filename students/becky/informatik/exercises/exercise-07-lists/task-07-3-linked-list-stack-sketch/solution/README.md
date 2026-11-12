# Solution · Task 07_3

## Aim

Draw (or list) the linked list after the five operations on a **linked-list stack**.

## Rules on the table

| Operation | On a linked-list stack |
|-----------|-------------------------|
| `push(v)` | New node with value `v` becomes **`first`**; its `next` is the old `first`. |
| `pop()` | Remove the node at **`first`**; `first` becomes `first.next`. |
| `first` | Points to the **top** of the stack. |

## Step by step

**1. `push(7)`**

```text
first → 7 → null
```

**2. `push(3)`** — new head is `3`.

```text
first → 3 → 7 → null
```

**3. `pop()`** — remove node `3`.

```text
first → 7 → null
```

**4. `push(5)`**

```text
first → 5 → 7 → null
```

**5. `push(9)`**

```text
first → 9 → 5 → 7 → null
```

*Why this matches LIFO:* each push adds at the front; pop removes the front — same behavior as a plate stack.

## Final answer

Values from `first` toward `null`: **`9` → `5` → `7`**

```text
first ──→ [9|•] ──→ [5|•] ──→ [7|•] ──→ null
```

## Common mistakes

| Mistake | Why it is wrong |
|---------|-----------------|
| Keeping `3` in the list | `pop()` removed the front node after `push(3)`. |
| Order `7 → 5 → 9` | `first` is the **top** (`9`), not the bottom. |
| Only two nodes | After five operations, three values remain (`7` was never popped). |

Back to [Task 07_3](../README.md).
