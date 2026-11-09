# Sample solution · Task 06_1

## How to run it

From `solution/`:

```bash
node even-sum.mjs
```

## Why it works

- `i` runs from `a` (1) to `b` (5) inclusive.
- **Even** check: `i % 2 === 0` is true for 2 and 4, so only those values are added to `sum`.
- After each iteration we print the current `i` and `sum`, then after the loop we print the total.

## Real test output

```text
1 | Sum: 0
2 | Sum: 2
3 | Sum: 2
4 | Sum: 6
5 | Sum: 6
Total sum: 6
```

## Common mistakes

| Mistake | What goes wrong |
|---------|-----------------|
| Adding every `i` | You drop the `if` and `sum` becomes 1+2+3+4+5 = 15. |
| Printing only at the end | You lose the per-line trace the sheet asks for. |
| Wrong parity test | Typo in `% 2` so odd numbers get added instead of even. |

Back to [task](../README.md).
