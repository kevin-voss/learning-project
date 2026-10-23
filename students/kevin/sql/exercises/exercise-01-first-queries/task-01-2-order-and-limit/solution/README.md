# Sample solution · Task 01_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

From this folder (`solution/`):

```bash
sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"
```

Or from the repo root: `make test-sql TASK=01_2 STUDENT=kevin SUBJECT=sql SOLUTION=1`.

## How it works, step by step

Every query in `answer.sql` carries a comment that says what it does and why. The short version:

1. `ORDER BY name` sorts text A to Z; `ASC` is the default.
2. `ORDER BY weight_g DESC LIMIT 2` — sort first, cut second.
3. `SELECT DISTINCT city … ORDER BY city` — each city once, stable order.
4. `COUNT(*)` on the whole table gives one number: 7.

**Real output**

```text
ana
ben
cy
dee
eli
3|2000
5|1500
Berlin
Oslo
Rome
7
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `LIMIT 2` without `DESC` | `4\|350` and `6\|90` (the lightest) | Sort descending before limiting |
| `SELECT city DISTINCT` | syntax error | `DISTINCT` comes right after `SELECT` |
| `SELECT id, COUNT(*) FROM parcels` | one odd row like `7\|7` | Count alone, or group — exercise 02 |

Back to [Task 01_2](../README.md).
