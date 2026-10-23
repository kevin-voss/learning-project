# Sample solution · Task 02_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

From this folder (`solution/`):

```bash
sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"
```

Or from the repo root: `make test-sql TASK=02_2 STUDENT=kevin SUBJECT=sql SOLUTION=1`.

## How it works, step by step

Every query in `answer.sql` carries a comment that says what it does and why. The short version:

1. `HAVING COUNT(*) > 2` keeps Berlin (3) and Oslo (4).
2. `HAVING SUM(weight_g) > 3000` keeps only Oslo (4790).
3. `HAVING COUNT(*) >= 3` keeps both; `ORDER BY AVG(weight_g) DESC` puts Oslo (1197.5) before Berlin (783.33…).

**Real output**

```text
Berlin|3
Oslo|4
Oslo|4790
Oslo|4|1197.5
Berlin|3|783.333333333333
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `WHERE COUNT(*) > 2` | `misuse of aggregate` | Use `HAVING` |
| `HAVING` before `GROUP BY` | syntax error | Order: WHERE → GROUP BY → HAVING → ORDER BY |
| Rounding the average | line mismatch | Print what `AVG` returns |

Back to [Task 02_2](../README.md).
