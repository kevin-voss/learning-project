# Exercise 02 · Group and summarize

| | |
|---|---|
| Student | Kevin |
| Subject | SQL |
| Language | SQL (SQLite) |
| Created | 2026-10-23 |

## The story in one sentence

The clerk sorts the parcels into one pile per city, then writes a single line per pile: how many, how heavy together, how heavy on average.

## Before you code

Deep home: [Databases and SQL](../../../../../tracks/computer-science/index.html#database-sql-fundamentals) — the GROUP BY, ORDER BY and LIMIT part. You know `SELECT` and `WHERE` from [exercise 01](../exercise-01-first-queries/README.md).

## Tasks

Same parcel-office tables as exercise 01, new questions.

## How to work

1. Read the questions, write the queries into `my-solution/answer.sql`.
2. Try by hand with `sqlite3`, then `make test-sql TASK=02_1 STUDENT=kevin SUBJECT=sql`.
3. Peek at `solution/` only when you are done.

---

## What you will learn

### 1. GROUP BY — one pile per value

`GROUP BY city` makes one pile of rows per city. The answer then has **one row per pile**, so every column is either the pile's name (`city`) or a summary of the pile (`COUNT`, `SUM`, `AVG`).

```sql
SELECT city, COUNT(*) FROM parcels GROUP BY city;
```

**In task 02_1** question 1 counts customers per city, question 2 counts parcels and weighs each pile.

### 2. COUNT, SUM, AVG — the pile summaries

`COUNT(*)` how many rows; `SUM(weight_g)` the pile's total; `AVG(weight_g)` the mean — a decimal like `728.0`. Without `GROUP BY` the whole table is one pile, so `AVG` prints one number.

### 3. WHERE gates the door, HAVING gates the piles

`WHERE delivered = 1` filters single parcels **before** the piles are made. `HAVING SUM(weight_g) > 3000` throws away whole piles **after**. An aggregate can never live in `WHERE` — it does not exist until the pile exists. **In task 02_2** every question is a gate on piles.

### 4. Sorting piles

`ORDER BY city` sorts by the pile name; `ORDER BY AVG(weight_g) DESC` sorts by the summary — both are allowed. **In task 02_2** question 3 combines HAVING and a sorted average.

---

## Words to know

| Word | Means |
|------|-------|
| **GROUP BY** | one pile of rows per value of the column |
| **COUNT(*)** | rows in the pile |
| **SUM(x)** | total of x in the pile |
| **AVG(x)** | mean of x in the pile (a decimal) |
| **HAVING** | a condition on the whole pile, after GROUP BY |

## Source

Written for Kevin: practice for the [Databases and SQL](../../../../../tracks/computer-science/index.html#database-sql-fundamentals) lesson of the CS track.
<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 02_1 | [Count per group](task-02-1-count-per-group/README.md) | todo |
| 02_2 | [The HAVING gate](task-02-2-the-having-gate/README.md) | todo |
<!-- index:end -->

Back to [all exercises](../README.md).
