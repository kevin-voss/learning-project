# Sample solution · Task 02_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

From this folder (`solution/`):

```bash
sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"
```

Or from the repo root: `make test-sql TASK=02_1 STUDENT=kevin SUBJECT=sql SOLUTION=1`.

## How it works, step by step

Every query in `answer.sql` carries a comment that says what it does and why. The short version:

1. `GROUP BY city` on customers: three piles, `COUNT(*)` per pile.
2. On parcels: `COUNT(*)` and `SUM(weight_g)` side by side, one row per city.
3. `AVG(weight_g) WHERE delivered = 1` — five delivered parcels, 3640 g together, mean 728.0.

**Real output**

```text
Berlin|2
Oslo|2
Rome|1
Berlin|3|2350
Oslo|4|4790
728.0
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| A non-aggregated column not in `GROUP BY` | a random value from the pile | Every plain column goes into `GROUP BY` |
| `WHERE` after `GROUP BY` | syntax error | `WHERE` comes before `GROUP BY` |
| Expecting `728` | line mismatch | `AVG` is a decimal: `728.0` |

Back to [Task 02_1](../README.md).
