# Task 02_1 · Count per group

Part of [Exercise 02 · Group and summarize](../README.md). New ideas you need: **GROUP BY**, **COUNT**, **SUM**, **AVG**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write every query yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |
| `setup.sql` | The tables and rows every query runs against |

## The task (from the sheet)

The tables: `customers(id, name, city)` and `parcels(id, customer_id, city, weight_g, delivered)` — open `setup.sql` to see the rows. Answer every question with one query, in this order, in `my-solution/answer.sql`. Where several rows come back, order them as the question says.

1. How many customers live in each city? Columns: `city`, count. Order by city.
2. Per city of the **parcels**: how many parcels and their total weight. Columns: `city`, count, sum. Order by city.
3. The average weight of the delivered parcels (`delivered = 1`). One number.

## The task, simply said

1. Question 1: `GROUP BY city` on `customers`, `COUNT(*)` next to `city`.
2. Question 2: same shape on `parcels`, with `SUM(weight_g)` as a third column.
3. Question 3: no `GROUP BY` — one pile; `WHERE` filters before the average.

## Test examples

Your file is right when SQLite prints exactly these lines, in this order (rows print as `value|value`).

| Question | The program says |
|----------|------------------|
| 1 | `Berlin\|2`, `Oslo\|2`, `Rome\|1` |
| 2 | `Berlin\|3\|2350` then `Oslo\|4\|4790` |
| 3 | `728.0` |

<details>
<summary>The complete expected output (6 lines)</summary>

```text
Berlin|2
Oslo|2
Rome|1
Berlin|3|2350
Oslo|4|4790
728.0
```

</details>

## Little helpers

<details>
<summary>`city` prints but the count is wrong</summary>

Group on the right table: question 1 counts **customers**, question 2 counts **parcels**.

</details>

<details>
<summary>728 vs 728.0</summary>

`AVG` returns a decimal; SQLite prints `728.0`. Do not round it.

</details>

<details>
<summary>I get one row per parcel</summary>

You forgot `GROUP BY city` — without it every row stays separate.

</details>

## Done when

- [ ] `make test-sql TASK=02_1 STUDENT=kevin SUBJECT=sql` says All green.
- [ ] Question 2 has two aggregates in one query; question 3 uses `WHERE`, not `HAVING`.
- [ ] You can say out loud what each query does.

Next: [Task 02_2](../task-02-2-the-having-gate/README.md)
