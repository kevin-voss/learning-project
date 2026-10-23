# Sample solution · Task 04_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

From this folder (`solution/`):

```bash
sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"
```

Or from the repo root: `make test-sql TASK=04_2 STUDENT=kevin SUBJECT=sql SOLUTION=1`.

## How it works, step by step

Every query in `answer.sql` carries a comment that says what it does and why. The short version:

1. `CREATE TABLE senders` — `INTEGER PRIMARY KEY`, `TEXT NOT NULL UNIQUE`, `TEXT NOT NULL`.
2. Two senders in one `INSERT`.
3. `CREATE TABLE letters` — `REFERENCES senders(id)` is the foreign key, `CHECK (words > 0)` the rule.
4. Two letters that keep every rule.
5. The join proves the link: letter 10 is ivan's, letter 11 is hana's.

**Real output**

```text
10|ivan|90
11|hana|240
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `INSERT` before `CREATE TABLE` | `no such table` | Create first, then insert |
| A second `hana` | `UNIQUE constraint failed` | Names are unique by your own rule |
| `words` of 0 | `CHECK constraint failed` | The rule says `> 0` |

Back to [Task 04_2](../README.md).
