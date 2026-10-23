# Exercise 03 · Tables together

| | |
|---|---|
| Student | Kevin |
| Subject | SQL |
| Language | SQL (SQLite) |
| Created | 2026-10-23 |

## The story in one sentence

Two lists lie on the desk — parcels and customers — and a number on each parcel card says which customer card it belongs to; the `JOIN` draws that line for every row at once.

## Before you code

Deep home: [Databases and SQL](../../../../../tracks/computer-science/index.html#database-sql-fundamentals) — the primary key / foreign key and JOIN parts. You know `GROUP BY` from [exercise 02](../exercise-02-group-and-summarize/README.md).

## Tasks

Same tables. Now every answer needs both lists.

## How to work

1. Read the questions, write the queries into `my-solution/answer.sql`.
2. Try by hand, then `make test-sql TASK=03_1 STUDENT=kevin SUBJECT=sql`.
3. Peek at `solution/` only when you are done.

---

## What you will learn

### 1. The keys behind the join

`customers.id` is the **primary key**: the number every customer card carries. `parcels.customer_id` is a **foreign key**: a customer number stored in a parcel row. That pair is the line the join draws.

### 2. JOIN … ON — glue the matching rows

```sql
SELECT p.id, c.name
FROM parcels p
JOIN customers c ON p.customer_id = c.id;
```

`p` and `c` are short names (aliases). `ON` is the matching rule. After the join you have one big table and use `WHERE`, `GROUP BY`, `ORDER BY` on it as usual. **In task 03_1** you list parcels with names, filter by the customer's city, and sum weight per customer.

### 3. LEFT JOIN — keep the whole left list

An **inner** join keeps only rows with a partner on both sides: dee (no parcels) disappears. `LEFT JOIN` keeps every left row and fills the right side with NULL when there is no partner. **In task 03_2** you count both joins and see the difference.

### 4. IS NULL — the empty side is the answer

`p.id IS NULL` is true exactly for left rows without a partner — that is how you find customers without parcels. NULL is never compared with `=`. And count carefully: `COUNT(*)` counts the glued row even when its right side is empty; `COUNT(p.id)` counts only real parcels. **In task 03_2** that difference is the whole trick.

---

## Words to know

| Word | Means |
|------|-------|
| **primary key** | the unique number of a row in its own table |
| **foreign key** | another table's primary key stored in a row |
| **JOIN … ON** | glues rows whose keys match; rows without a partner are dropped |
| **alias** | the short name for a table in the query (`p`, `c`) |
| **LEFT JOIN** | keeps every row of the left table, NULL on the empty side |
| **IS NULL** | true when the value is the empty placeholder |

## Source

Written for Kevin: practice for the [Databases and SQL](../../../../../tracks/computer-science/index.html#database-sql-fundamentals) lesson of the CS track.
<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 03_1 | [Two tables one answer](task-03-1-two-tables-one-answer/README.md) | todo |
| 03_2 | [The missing left side](task-03-2-the-missing-left-side/README.md) | todo |
<!-- index:end -->

Back to [all exercises](../README.md).
