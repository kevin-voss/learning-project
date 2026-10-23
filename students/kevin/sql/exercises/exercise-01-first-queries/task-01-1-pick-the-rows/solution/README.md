# Sample solution · Task 01_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

From this folder (`solution/`):

```bash
sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"
```

Or from the repo root: `make test-sql TASK=01_1 STUDENT=kevin SUBJECT=sql SOLUTION=1`.

## How it works, step by step

Every query in `answer.sql` carries a comment that says what it does and why. The short version:

1. `SELECT * FROM customers ORDER BY id` — all fields, five cards, sorted.
2. `WHERE city = 'Berlin'` keeps two cards; only `name, city` are copied out.
3. `WHERE weight_g > 1000` is a plain number comparison; `id, weight_g` are printed in that order.

**Real output**

```text
1|ana|Berlin
2|ben|Oslo
3|cy|Berlin
4|dee|Rome
5|eli|Oslo
ana|Berlin
cy|Berlin
1|1200
3|2000
5|1500
7|1200
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `SELECT name city` | `no such column` or odd output | Columns are separated by a comma |
| `WHERE city = Berlin` | `no such column: Berlin` | Quote text: `'Berlin'` |
| No `ORDER BY` in question 1 | rows in a surprising order on another engine | Always order multi-row answers |

Back to [Task 01_1](../README.md).
