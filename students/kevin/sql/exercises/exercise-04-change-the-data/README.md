# Exercise 04 · Change the data

| | |
|---|---|
| Student | Kevin |
| Subject | SQL |
| Language | SQL (SQLite) |
| Created | 2026-10-23 |

## The story in one sentence

Until now the clerk only read the boxes; today she files new cards, corrects one with a stroke, shreds another — and at the end prints her own form so the office can file cards it never had.

## Before you code

Deep home: [Databases and SQL](../../../../../tracks/computer-science/index.html#database-sql-fundamentals) — the INSERT/UPDATE/DELETE part and "types and constraints". You know JOIN from [exercise 03](../exercise-03-tables-together/README.md).

## Tasks

Task 04_1 writes into the usual parcel-office tables. Task 04_2 builds **new** tables from scratch — there is no setup, you create the form yourself.

## How to work

1. Read the questions, write the statements into `my-solution/answer.sql` — writes and the proof `SELECT`s in order.
2. Try by hand, then `make test-sql TASK=04_1 STUDENT=kevin SUBJECT=sql`.
3. Peek at `solution/` only when you are done.

---

## What you will learn

### 1. INSERT — file a new card

`INSERT INTO customers VALUES (6, 'fay', 'Berlin');` adds one row; the values go in the order the columns were declared. Two rows? Two value groups, comma-separated. **In task 04_1** questions 1–2.

### 2. UPDATE and DELETE — the dangerous pair

`UPDATE parcels SET delivered = 1 WHERE city = 'Oslo';` — the `WHERE` is the safety catch: without it every row changes. `DELETE FROM parcels WHERE weight_g < 100;` shreds; `DELETE` without `WHERE` empties the table. **In task 04_1** you always prove the change with the `SELECT` that follows.

### 3. CREATE TABLE — print your own form

```sql
CREATE TABLE senders (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL
);
```

The form decides the columns, their types and the rules: `PRIMARY KEY` (the row's number), `NOT NULL` (a field the office insists on), `UNIQUE` (no second hana), `CHECK (words > 0)` (a rule every row must keep), `REFERENCES senders(id)` (a foreign key). **In task 04_2** you draw two forms and glue them with a join.

### 4. The same ideas, another engine

SQLite lives in one file and is already on your Mac. The real projects use **Postgres** ([Project 11](../../../../../projects/11-parcel-database/README.md)): richer date types and a server, but the SQL you write here is the same SQL.

---

## Words to know

| Word | Means |
|------|-------|
| **INSERT** | adds a row |
| **UPDATE … WHERE** | changes the rows the WHERE picks — never without WHERE |
| **DELETE … WHERE** | removes the rows the WHERE picks — never without WHERE |
| **CREATE TABLE** | defines a new table: columns, types, rules |
| **CHECK** | a rule every row must keep |
| **REFERENCES** | the column holds another table's primary key |

## Source

Written for Kevin: practice for the [Databases and SQL](../../../../../tracks/computer-science/index.html#database-sql-fundamentals) and [Database design and scaling](../../../../../tracks/computer-science/index.html#database-design-scaling) lessons of the CS track.
<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 04_1 | [Write rows](task-04-1-write-rows/README.md) | todo |
| 04_2 | [Make the table](task-04-2-make-the-table/README.md) | todo |
<!-- index:end -->

Back to [all exercises](../README.md).
