# Sample solution · Task 03_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

From this folder (`solution/`):

```bash
sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"
```

Or from the repo root: `make test-sql TASK=03_1 STUDENT=kevin SUBJECT=sql SOLUTION=1`.

## How it works, step by step

Every query in `answer.sql` carries a comment that says what it does and why. The short version:

1. Join parcels to customers on `p.customer_id = c.id`; pick `p.id, c.name`; order by parcel id.
2. Same join; `WHERE c.city = 'Oslo'` keeps parcels 3, 5, 6, 7.
3. Join, `GROUP BY c.name`, `SUM(p.weight_g)`, heaviest first: ben 3200, ana 2000, eli 1590, cy 350 — dee never appears.

**Real output**

```text
1|ana
2|ana
3|ben
4|cy
5|eli
6|eli
7|ben
3|Oslo|2000
5|Oslo|1500
6|Oslo|90
7|Oslo|1200
ben|3200
ana|2000
eli|1590
cy|350
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| No `ON` | every parcel paired with every customer (35 rows) | Always write the matching rule |
| `SELECT id` after a join | `ambiguous column name` | Prefix: `p.id` |
| `GROUP BY c.id` but printing `c.name` | works in SQLite, fails elsewhere | Group by what you print |

Back to [Task 03_1](../README.md).
