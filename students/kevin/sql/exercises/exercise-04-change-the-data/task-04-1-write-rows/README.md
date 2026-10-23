# Task 04_1 · Write rows

Part of [Exercise 04 · Change the data](../README.md). New ideas you need: **INSERT**, **UPDATE … WHERE**, **DELETE … WHERE**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write every query yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |
| `setup.sql` | The tables and rows every query runs against |

## The task (from the sheet)

The tables: `customers(id, name, city)` and `parcels(id, customer_id, city, weight_g, delivered)` — open `setup.sql` to see the rows. Answer every question with one query, in this order, in `my-solution/answer.sql`. Where several rows come back, order them as the question says.

1. Add customer 6: `fay`, from Berlin.
2. Add parcel 8 for fay: city Berlin, 500 g, not delivered.
3. Every parcel in Oslo has arrived: set `delivered` to 1 for them.
4. Shred the tiny parcels: delete every parcel under 100 g.
5. Proof: `id`, `name`, `city` of every customer, ordered by id.
6. Proof: `id`, `customer_id`, `delivered` of every parcel, ordered by id.

## The task, simply said

1. Questions 1–2: `INSERT INTO … VALUES (…)` with the values in column order.
2. Question 3: `UPDATE parcels SET delivered = 1 WHERE city = 'Oslo'`.
3. Question 4: `DELETE FROM parcels WHERE weight_g < 100`.
4. Questions 5–6: plain `SELECT … ORDER BY id`. Writes print nothing; only the proofs print.

## Test examples

Your file is right when SQLite prints exactly these lines, in this order (rows print as `value|value`).

| Question | The program says |
|----------|------------------|
| 5 | six rows, the last one `6\|fay\|Berlin` |
| 6 | `1\|1\|1` … `5\|5\|1`, `7\|2\|1`, `8\|6\|0` — parcel 6 is gone, Oslo parcels are 1 |

<details>
<summary>The complete expected output (13 lines)</summary>

```text
1|ana|Berlin
2|ben|Oslo
3|cy|Berlin
4|dee|Rome
5|eli|Oslo
6|fay|Berlin
1|1|1
2|1|1
3|2|1
4|3|1
5|5|1
7|2|1
8|6|0
```

</details>

## Little helpers

<details>
<summary>Nothing prints after my INSERT</summary>

Correct: writes are silent. Only the proof `SELECT`s print.

</details>

<details>
<summary>Every parcel became delivered</summary>

You ran `UPDATE` without `WHERE`. Add `WHERE city = 'Oslo'`.

</details>

<details>
<summary>`FOREIGN KEY constraint failed`</summary>

Insert the customer (question 1) **before** the parcel that points at her.

</details>

## Done when

- [ ] `make test-sql TASK=04_1 STUDENT=kevin SUBJECT=sql` says All green.
- [ ] Questions 3 and 4 both have a `WHERE`.
- [ ] You can say out loud what each query does.

Next: [Task 04_2](../task-04-2-make-the-table/README.md)
