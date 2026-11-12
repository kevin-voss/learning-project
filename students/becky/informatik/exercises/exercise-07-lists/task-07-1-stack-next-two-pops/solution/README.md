# Solution · Task 07_1

## Aim

Name the two values returned by `pop()` after pushing `7`, `8`, `3`, `1`, `6` onto an empty stack.

## Rules on the table

| Rule | Meaning |
|------|---------|
| Stack | Add and remove at the **top** only. |
| LIFO | Last in, first out — the newest value leaves first. |
| `push(x)` | Put `x` on top. |
| `pop()` | Remove the top and return it. |

## Step by step

1. **Start** empty. No values yet.
2. **push(7)** — top is `7`.
3. **push(8)** — `8` on top of `7`.
4. **push(3)** — `3` on top.
5. **push(1)** — `1` on top.
6. **push(6)** — `6` on top.

Bottom → top after all pushes:

```text
7 , 8 , 3 , 1 , 6
              ↑ top
```

7. **First `pop()`** — take the top → **`6`**. Top is now `1`.
8. **Second `pop()`** — take the top → **`1`**. Top is now `3`.

## Final answer

**First pop:** `6`  
**Second pop:** `1`

## Common mistakes

| Mistake | Why it is wrong |
|---------|-----------------|
| `7` and `8` | That is **queue** order (task 07_2), not stack order. |
| `1` then `6` | Pop order is **6 then 1**, not the reverse. |
| `3` as first pop | `3` is under `1` and `6`; the top was `6`. |

Back to [Task 07_1](../README.md).
