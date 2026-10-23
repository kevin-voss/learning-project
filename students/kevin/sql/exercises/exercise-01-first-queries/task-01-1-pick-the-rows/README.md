# Task 01_1 · Pick the rows

Part of [Exercise 01 · First queries](../README.md). New ideas you need: **SELECT**, **WHERE**, **ORDER BY**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write every query yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |
| `setup.sql` | The tables and rows every query runs against |

## The task (from the sheet)

The tables: `customers(id, name, city)` and `parcels(id, customer_id, city, weight_g, delivered)` — open `setup.sql` to see the rows. Answer every question with one query, in this order, in `my-solution/answer.sql`. Where several rows come back, order them as the question says.

1. Every column of every customer, ordered by `id`.
2. The `name` and `city` of the customers who live in Berlin.
3. The `id` and `weight_g` of every parcel heavier than 1000 g (ids in the order they are stored — one `WHERE` is enough here).

## The task, simply said

1. Question 1: `SELECT *` and `ORDER BY id`.
2. Question 2: two column names, a `WHERE` on the city — text in single quotes.
3. Question 3: a number comparison in the `WHERE`.

## Test examples

Your file is right when SQLite prints exactly these lines, in this order (rows print as `value|value`).

| Question | The program says |
|----------|------------------|
| 1 | `1\|ana\|Berlin` … five rows, one per customer |
| 2 | `ana\|Berlin` then `cy\|Berlin` |
| 3 | `1\|1200`, `3\|2000`, `5\|1500`, `7\|1200` |

<details>
<summary>The complete expected output (11 lines)</summary>

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

</details>

## Little helpers

<details>
<summary>The runner says 0 lines but my query looks right</summary>

Every statement ends with `;`. Without it SQLite waits for more and prints nothing.

</details>

<details>
<summary>`no such column: Berlin`</summary>

Text needs single quotes: `'Berlin'`. Double quotes mean a column name in SQL.

</details>

<details>
<summary>Rows come out in another order</summary>

Add `ORDER BY id` — a table promises no order.

</details>

## Done when

- [ ] `make test-sql TASK=01_1 STUDENT=kevin SUBJECT=sql` says All green.
- [ ] Question 1 uses `*` and `ORDER BY`; question 2 names its two columns.
- [ ] You can say out loud what each query does.

Next: [Task 01_2](../task-01-2-order-and-limit/README.md)
