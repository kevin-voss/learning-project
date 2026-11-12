# Solution · Task 07_2

## Aim

Name the two values returned by `get()` after enqueueing `7`, `8`, `3`, `1`, `6` in an empty queue.

## Rules on the table

| Rule | Meaning |
|------|---------|
| Queue | Add at the **back**, take from the **front**. |
| FIFO | First in, first out. |
| `get()` (on this sheet) | Take the value at the **front**. |

## Step by step

1. **Start** empty.
2. Values arrive in order `7`, `8`, `3`, `1`, `6`. Each new value joins the **back** of the line.

Front → back after all inserts:

```text
7 , 8 , 3 , 1 , 6
↑ front        ↑ back
```

3. **First `get()`** — serve the front → **`7`**. Front is now `8`.
4. **Second `get()`** — serve the front → **`8`**.

## Final answer

**First get:** `7`  
**Second get:** `8`

## Common mistakes

| Mistake | Why it is wrong |
|---------|-----------------|
| `6` and `1` | That is **stack** order from task 07_1. |
| `3` first | `3` is in the middle of the line, not at the front. |

Back to [Task 07_2](../README.md).
