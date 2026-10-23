# Sample solution · Task 04_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

From this folder (`solution/`):

```bash
sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"
```

Or from the repo root: `make test-sql TASK=04_1 STUDENT=kevin SUBJECT=sql SOLUTION=1`.

## How it works, step by step

Every query in `answer.sql` carries a comment that says what it does and why. The short version:

1. `INSERT INTO customers VALUES (6, 'fay', 'Berlin')` — values in column order.
2. `INSERT INTO parcels VALUES (8, 6, 'Berlin', 500, 0)` — `customer_id` 6 is the link to fay.
3. `UPDATE … WHERE city = 'Oslo'` marks parcels 3, 5, 7 delivered — nothing else.
4. `DELETE … WHERE weight_g < 100` removes parcel 6 only.
5. The two proofs show the new customer and the new parcel table.

**Real output**

```text
1|ana|Berlin
2|ben|Oslo
3|cy|Berlin
4|dee|Rome
5|eli|Oslo
6|fay|Berlin
1|1|1
2|1|1
3|2|1
4|3|1
5|5|1
7|2|1
8|6|0
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `UPDATE parcels SET delivered = 1` | every row changed | Never without `WHERE` |
| `DELETE FROM parcels` | empty table | Never without `WHERE` |
| Wrong value order in `INSERT` | `datatype mismatch` or swapped columns | Follow the column order of `CREATE TABLE` |

Back to [Task 04_1](../README.md).
