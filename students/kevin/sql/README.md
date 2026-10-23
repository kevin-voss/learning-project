# Kevin · SQL

You finished the Java subject. Before Spring and Hibernate you need the language they hide under the hood: **SQL**. This subject goes from the first `SELECT` to the queries every backend job expects, on a real database engine (SQLite, already on your Mac), with the same parcel office in every task.

| Folder | What is inside |
|--------|----------------|
| [`exercises/`](exercises/README.md) | Four exercises, numbered in the order to do them |

## How this subject works

Every task gives you tables (`setup.sql`) and numbered questions. You answer them in **one file**, `my-solution/answer.sql`, one query per question, in order. The runner feeds the tables and your answers into SQLite and compares what it prints, line by line:

```bash
make test-sql TASK=01_1 STUDENT=kevin SUBJECT=sql
```

To play by hand: `sqlite3 :memory:` then `.read setup.sql`, and type queries. Rows print as `value|value`.

## The order

Read the home first (the CS lesson is the deep home; the exercise page repeats each idea with a picture and the real SQL), then do the exercise.

| # | Exercise | You learn | Read first |
|---|----------|-----------|------------|
| 01 | [First queries](exercises/exercise-01-first-queries/README.md) | `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `DISTINCT`, a first `COUNT` | [Databases and SQL](../../../tracks/computer-science/index.html#database-sql-fundamentals): tables, SELECT, WHERE |
| 02 | [Group and summarize](exercises/exercise-02-group-and-summarize/README.md) | `COUNT`, `SUM`, `AVG`, `GROUP BY`, `HAVING` vs `WHERE` | the same lesson: GROUP BY, ORDER BY, LIMIT |
| 03 | [Tables together](exercises/exercise-03-tables-together/README.md) | `JOIN … ON`, aliases, `LEFT JOIN`, `IS NULL`, primary and foreign keys in practice | the same lesson: keys, JOIN |
| 04 | [Change the data](exercises/exercise-04-change-the-data/README.md) | `INSERT`, `UPDATE`, `DELETE` with `WHERE`, `CREATE TABLE` with `PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `CHECK`, `REFERENCES` | the same lesson: INSERT/UPDATE/DELETE, types and constraints |

Then put it to work: [Project 11 · Parcel database](../../../projects/11-parcel-database/README.md) (Postgres in Docker, JDBC) and the [Spring Boot subject](../spring-boot/README.md), where Hibernate writes this SQL for you.

## Important SQL topics beyond the exercises (read only)

| Topic | Where | Why it matters |
|-------|-------|----------------|
| Indexes and `EXPLAIN`: why a lookup is fast or slow | lesson demo "Lookup without an index / with an index / query plan" in [Databases and SQL](../../../tracks/computer-science/index.html#database-sql-fundamentals) | the N+1 and slow-endpoint stories in Hibernate start here |
| Transactions: `BEGIN`, `COMMIT`, `ROLLBACK`, all-or-nothing | the same demo, "All-or-nothing writes"; the [persistence context](../../../sheets/hibernate/persistence-context.md) sheet for `@Transactional` | every Hibernate flush runs inside one |
| SQL injection and parameterized queries | the same demo, "String concatenation is dangerous / Safe parameterized query" | the #1 security bug in backend code |
| Subqueries (`WHERE id IN (SELECT …)`) and `EXISTS` | course step 10 and the parcel project use them; try one on the exercise-03 tables | the step after JOIN |
| Normalization, one-to-many and many-to-many design, scaling | [Database design and scaling](../../../tracks/computer-science/index.html#database-design-scaling) | the shape of every Hibernate mapping |
| NULL rules: `IS NULL`, `COALESCE`, NULL in aggregates | exercise 03 (task 03_2) shows the first rule; `COUNT(column)` skips NULL, `COUNT(*)` does not | the classic wrong-count bug |
| Dates, `LIKE`, `CASE` | SQLite docs when you need them; Postgres has richer date types | everyday query polish |

## Pitfalls, and where you meet them

| Pitfall | Where it is taught |
|---------|--------------------|
| No `ORDER BY` — rows come back in any order | every task: every multi-row answer ends with `ORDER BY` |
| `WHERE` with an aggregate (`WHERE COUNT(*) > 2`) | Exercise 02 (task 02_2): that is `HAVING` |
| `= NULL` never matches | Exercise 03 (task 03_2): `IS NULL` |
| `COUNT(*)` after a `LEFT JOIN` counts the empty line as 1 | Exercise 03 (task 03_2): `COUNT(p.id)` |
| `UPDATE` / `DELETE` without `WHERE` | Exercise 04 (task 04_1) |
| Reordering an enum stored as a number, `ddl-auto=update` in prod | Hibernate: [Mapping rules](../../../sheets/hibernate/mapping-rules.md) |

Back to [Kevin](../README.md).
