# Task 01_2 · Order and limit

Part of [Exercise 01 · First queries](../README.md). New ideas you need: **ORDER BY DESC**, **LIMIT**, **DISTINCT**, **COUNT**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write every query yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |
| `setup.sql` | The tables and rows every query runs against |

## The task (from the sheet)

The tables: `customers(id, name, city)` and `parcels(id, customer_id, city, weight_g, delivered)` — open `setup.sql` to see the rows. Answer every question with one query, in this order, in `my-solution/answer.sql`. Where several rows come back, order them as the question says.

1. Every customer `name`, from A to Z.
2. The two heaviest parcels: `id` and `weight_g`, heaviest first.
3. Which cities do the customers live in? Each city once, A to Z.
4. How many parcels are there? One number.

## The task, simply said

1. Question 1: `ORDER BY name` (ascending is the default).
2. Question 2: `ORDER BY weight_g DESC` then `LIMIT 2`.
3. Question 3: `SELECT DISTINCT city` with an `ORDER BY`.
4. Question 4: `SELECT COUNT(*) FROM parcels`.

## Test examples

Your file is right when SQLite prints exactly these lines, in this order (rows print as `value|value`).

| Question | The program says |
|----------|------------------|
| 1 | `ana`, `ben`, `cy`, `dee`, `eli` |
| 2 | `3\|2000` then `5\|1500` |
| 3 | `Berlin`, `Oslo`, `Rome` |
| 4 | `7` |

<details>
<summary>The complete expected output (11 lines)</summary>

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

</details>

## Little helpers

<details>
<summary>LIMIT gives me the lightest parcels</summary>

`LIMIT` keeps the first rows of the **sorted** stack — sort with `DESC` first.

</details>

<details>
<summary>Berlin appears twice in question 3</summary>

`DISTINCT` goes right after `SELECT`: `SELECT DISTINCT city`.

</details>

<details>
<summary>COUNT prints 7 rows of something</summary>

`COUNT(*)` with no `GROUP BY` returns one row with one number. Do not add columns next to it.

</details>

## Done when

- [ ] `make test-sql TASK=01_2 STUDENT=kevin SUBJECT=sql` says All green.
- [ ] Question 2 uses `DESC` and `LIMIT`; question 3 uses `DISTINCT`.
- [ ] You can say out loud what each query does.

Back to [Exercise 01](../README.md).
