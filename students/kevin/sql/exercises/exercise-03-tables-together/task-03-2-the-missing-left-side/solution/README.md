# Sample solution · Task 03_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

From this folder (`solution/`):

```bash
sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"
```

Or from the repo root: `make test-sql TASK=03_2 STUDENT=kevin SUBJECT=sql SOLUTION=1`.

## How it works, step by step

Every query in `answer.sql` carries a comment that says what it does and why. The short version:

1. `LEFT JOIN` keeps dee; `COUNT(p.id)` counts only real parcels, so dee gets 0.
2. Inner join: 7 rows, one per parcel.
3. Left join: 8 rows — the 7 parcels plus dee's empty line.
4. `WHERE p.id IS NULL` keeps exactly the empty lines: dee.

**Real output**

```text
ana|2
ben|2
cy|1
dee|0
eli|2
7
8
dee
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `COUNT(*)` in question 1 | `dee\|1` | Count the right-side key: `COUNT(p.id)` |
| `= NULL` | no rows | `IS NULL` |
| `RIGHT JOIN` | not in SQLite (older versions) | Put the complete list on the left |

Back to [Task 03_2](../README.md).
