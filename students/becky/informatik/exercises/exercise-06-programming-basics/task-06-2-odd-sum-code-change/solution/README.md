# Sample solution · Task 06_2

## How to run it

From `solution/`:

```bash
node odd-sum.mjs
```

## Why it works

- Same loop as task **06_1**, but the `if` now selects **odd** numbers with `i % 2 !== 0` (for 1…5 you can also use `=== 1`).
- Odd values in range 1…5 are 1, 3, and 5; they add to `1 + 3 + 5 = 9`.

## Real test output

```text
1 | Sum: 1
2 | Sum: 1
3 | Sum: 4
4 | Sum: 4
5 | Sum: 9
Total sum: 9
```

## Common mistakes

| Mistake | What goes wrong |
|---------|-----------------|
| Leaving `i % 2 === 0` | You still sum evens (total 6), not 9. |
| Wrong inequality | Using `==` or mixing up `!==` and `!=` carelessly — stick to `!== 0` for clarity. |

Back to [task](../README.md).
