# Task 03_2 · The missing left side

Part of [Exercise 03 · Tables together](../README.md). New ideas you need: **LEFT JOIN**, **IS NULL**, **COUNT(column)**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write every query yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |
| `setup.sql` | The tables and rows every query runs against |

## The task (from the sheet)

The tables: `customers(id, name, city)` and `parcels(id, customer_id, city, weight_g, delivered)` — open `setup.sql` to see the rows. Answer every question with one query, in this order, in `my-solution/answer.sql`. Where several rows come back, order them as the question says.

1. Every customer with the number of their parcels — **including dee, who has none**: `name`, count, ordered by name.
2. How many rows does the **inner** join of customers and parcels have? One number.
3. How many rows does the **left** join have? One number.
4. Which customers have **no parcel at all**? Their names.

## The task, simply said

1. Question 1: `LEFT JOIN parcels p ON …`, `GROUP BY c.name`, and count `p.id` — not `*`.
2. Question 2: `SELECT COUNT(*)` over the plain `JOIN`.
3. Question 3: the same with `LEFT JOIN`.
4. Question 4: `LEFT JOIN` and `WHERE p.id IS NULL`.

## Test examples

Your file is right when SQLite prints exactly these lines, in this order (rows print as `value|value`).

| Question | The program says |
|----------|------------------|
| 1 | `ana\|2`, `ben\|2`, `cy\|1`, `dee\|0`, `eli\|2` |
| 2 | `7` |
| 3 | `8` |
| 4 | `dee` |

<details>
<summary>The complete expected output (8 lines)</summary>

```text
ana|2
ben|2
cy|1
dee|0
eli|2
7
8
dee
```

</details>

## Little helpers

<details>
<summary>dee shows 1, not 0</summary>

`COUNT(*)` counts dee's glued row even though its parcel side is empty. `COUNT(p.id)` counts real parcels only.

</details>

<details>
<summary>dee does not appear at all</summary>

You used a plain `JOIN`. Rows without a partner survive only a `LEFT JOIN`.

</details>

<details>
<summary>`WHERE p.id = NULL` finds nothing</summary>

NULL is never equal to anything. Write `IS NULL`.

</details>

## Done when

- [ ] `make test-sql TASK=03_2 STUDENT=kevin SUBJECT=sql` says All green.
- [ ] Question 1 counts with `COUNT(p.id)`; question 4 uses `IS NULL`.
- [ ] You can say out loud what each query does.

Back to [Exercise 03](../README.md).
