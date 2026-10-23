# Exercise 01 · First queries

| | |
|---|---|
| Student | Kevin |
| Subject | SQL |
| Language | SQL (SQLite) |
| Created | 2026-10-23 |

## The story in one sentence

The parcel office answers questions from its card boxes: copy these fields, pull only these cards, stack them in this order — every answer is one `SELECT` away.

## Before you code

The deep home: [Databases and SQL](../../../../../tracks/computer-science/index.html#database-sql-fundamentals) in the CS track (read "Tables", "SELECT", "WHERE" — the rest of that lesson comes with exercises 02–04). How the tasks run: the [subject page](../../README.md).

Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md) — SQL has no sheet yet; the exercise pages here are the teaching text.

## Tasks

Do them in order. Each task gives you the parcel-office tables (`setup.sql`) and numbered questions; you write one query per question into `my-solution/answer.sql`.

## How to work

1. Read the questions in the task.
2. Write the queries in `my-solution/answer.sql`, one per question, in order, each ending with `;`.
3. Play first: `sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"` from the `my-solution/` folder.
4. `make test-sql TASK=01_1 STUDENT=kevin SUBJECT=sql` from the repo root.
5. Peek at `solution/` only when you are done.

---

## What you will learn

### 1. SELECT — copy fields off a card

Picture a customer card: name, city, id. `SELECT name, city FROM customers` copies exactly those two fields off every card. `*` means "all fields".

```sql
SELECT name, city FROM customers;
```

**In task 01_1** question 1 copies whole cards, question 2 only two fields.

### 2. WHERE — pull only the cards you mean

```sql
SELECT name, city FROM customers WHERE city = 'Berlin';
```

Text sits in single quotes. Comparisons work like in Java: `=`, `>`, `<`, `<=`. **In task 01_1** question 3 keeps only the heavy parcels.

### 3. ORDER BY and LIMIT — sort the stack, take the top

A table has **no promised row order**. Every multi-row answer in this subject ends with `ORDER BY`; `DESC` turns the sort around; `LIMIT 2` keeps the first two of the sorted stack. **In task 01_2** you print the top-heaviest parcels.

### 4. DISTINCT and a first COUNT

`SELECT DISTINCT city …` crosses out duplicates: each city once. `SELECT COUNT(*) FROM parcels` counts the cards and prints one number. **In task 01_2** you use both. Exercise 02 goes deeper.

---

## Words to know

| Word | Means |
|------|-------|
| **SELECT** | picks the columns of the answer |
| **WHERE** | keeps only the rows the condition is true for |
| **ORDER BY** | sorts the answer; `ASC` (default) or `DESC` |
| **LIMIT** | keeps the first n rows of the sorted answer |
| **DISTINCT** | drops duplicate values |
| **COUNT(*)** | counts the rows, prints one number |

## Source

Written for Kevin: practice for the [Databases and SQL](../../../../../tracks/computer-science/index.html#database-sql-fundamentals) lesson of the CS track.
<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 01_1 | [Pick the rows](task-01-1-pick-the-rows/README.md) | todo |
| 01_2 | [Order and limit](task-01-2-order-and-limit/README.md) | todo |
<!-- index:end -->

Back to [all exercises](../README.md).
