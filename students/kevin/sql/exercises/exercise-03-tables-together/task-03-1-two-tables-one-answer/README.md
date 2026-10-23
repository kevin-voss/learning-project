# Task 03_1 · Two tables, one answer

Part of [Exercise 03 · Tables together](../README.md). New ideas you need: **JOIN … ON**, **aliases**, **GROUP BY after a join**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write every query yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |
| `setup.sql` | The tables and rows every query runs against |

## The task (from the sheet)

The tables: `customers(id, name, city)` and `parcels(id, customer_id, city, weight_g, delivered)` — open `setup.sql` to see the rows. Answer every question with one query, in this order, in `my-solution/answer.sql`. Where several rows come back, order them as the question says.

1. Every parcel with the **name** of its customer: parcel `id`, customer `name`, ordered by parcel id.
2. The parcels of customers who **live in Oslo**: parcel `id`, parcel `city`, `weight_g`, ordered by parcel id.
3. Per customer: `name` and the total weight of their parcels, heaviest total first.

## The task, simply said

1. Question 1: `FROM parcels p JOIN customers c ON p.customer_id = c.id`.
2. Question 2: same join, `WHERE c.city = 'Oslo'` — the **customer's** city.
3. Question 3: join, then `GROUP BY c.name` with `SUM(p.weight_g)`, `ORDER BY` that sum `DESC`.

## Test examples

Your file is right when SQLite prints exactly these lines, in this order (rows print as `value|value`).

| Question | The program says |
|----------|------------------|
| 1 | `1\|ana`, `2\|ana`, `3\|ben`, … seven rows |
| 2 | `3\|Oslo\|2000`, `5\|Oslo\|1500`, `6\|Oslo\|90`, `7\|Oslo\|1200` |
| 3 | `ben\|3200`, `ana\|2000`, `eli\|1590`, `cy\|350` |

<details>
<summary>The complete expected output (15 lines)</summary>

```text
1|ana
2|ana
3|ben
4|cy
5|eli
6|eli
7|ben
3|Oslo|2000
5|Oslo|1500
6|Oslo|90
7|Oslo|1200
ben|3200
ana|2000
eli|1590
cy|350
```

</details>

## Little helpers

<details>
<summary>`ambiguous column name: id`</summary>

Both tables have `id`. Say which one: `p.id` or `c.id`.

</details>

<details>
<summary>Question 2 gives the wrong parcels</summary>

Filter on the customer's city `c.city`, not the parcel's `p.city` — here they happen to agree, but read the question.

</details>

<details>
<summary>Question 3 lists dee with 0</summary>

An inner join drops customers without parcels. That is task 03_2's job.

</details>

## Done when

- [ ] `make test-sql TASK=03_1 STUDENT=kevin SUBJECT=sql` says All green.
- [ ] Every query uses `JOIN … ON` with aliases `p` and `c`.
- [ ] You can say out loud what each query does.

Next: [Task 03_2](../task-03-2-the-missing-left-side/README.md)
