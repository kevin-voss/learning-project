# Sample solution · Task 06_3

## How to run it

From `solution/`:

```bash
node fib-four.mjs
```

## Why it works

**Aim:** Show that **`fib(4) = 3`** using the usual Fibonacci rules.

**Rules on the table**

| Name | Recipe |
|------|--------|
| Base | `fib(0) = 0`, `fib(1) = 1` |
| Step | `fib(n) = fib(n - 1) + fib(n - 2)` for integers `n ≥ 2` |

**Steps (one idea each)**

1. Expand `fib(4)` with the step rule → `fib(3) + fib(2)`.
2. Expand `fib(3)` → `fib(2) + fib(1)`.
3. Expand `fib(2)` → `fib(1) + fib(0)`.
4. Replace `fib(1)` and `fib(0)` with **base** values `1` and `0`.
5. Combine: `fib(2) = 1 + 0 = 1`.
6. Combine: `fib(3) = fib(2) + fib(1) = 1 + 1 = 2`.
7. Combine: `fib(4) = fib(3) + fib(2) = 2 + 1 = 3`.

## Real test output

```text
fib(4) = fib(3) + fib(2)
fib(3) = fib(2) + fib(1)
fib(2) = fib(1) + fib(0)
fib(1) = 1
fib(0) = 0
fib(2) = 1
fib(3) = 2
fib(4) = 3
```

## Common mistakes

| Mistake | Why it bites you |
|---------|------------------|
| Wrong bases (e.g. both 1) | The whole chain of numbers shifts. |
| Adding `fib(2)` wrong | `fib(4)` needs `fib(3)` and `fib(2)` to be right first. |

Back to [task](../README.md).
