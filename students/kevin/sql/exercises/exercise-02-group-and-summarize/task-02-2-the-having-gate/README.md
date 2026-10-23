# Task 02_2 · The HAVING gate

Part of [Exercise 02 · Group and summarize](../README.md). New ideas you need: **HAVING**, aggregates in **ORDER BY**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write every query yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |
| `setup.sql` | The tables and rows every query runs against |

## The task (from the sheet)

The tables: `customers(id, name, city)` and `parcels(id, customer_id, city, weight_g, delivered)` — open `setup.sql` to see the rows. Answer every question with one query, in this order, in `my-solution/answer.sql`. Where several rows come back, order them as the question says.

1. The cities with **more than two** parcels: `city` and the count. Order by city.
2. The cities whose parcels weigh **more than 3000 g together**: `city` and the total. Order by city.
3. Per city: count and average weight, but only cities with **three or more** parcels, heaviest average first.

## The task, simply said

1. Question 1: `GROUP BY city HAVING COUNT(*) > 2`.
2. Question 2: `HAVING SUM(weight_g) > 3000`.
3. Question 3: `HAVING COUNT(*) >= 3` and `ORDER BY AVG(weight_g) DESC`.

## Test examples

Your file is right when SQLite prints exactly these lines, in this order (rows print as `value|value`).

| Question | The program says |
|----------|------------------|
| 1 | `Berlin\|3` then `Oslo\|4` |
| 2 | `Oslo\|4790` |
| 3 | `Oslo\|4\|1197.5` then `Berlin\|3\|783.333333333333` |

<details>
<summary>The complete expected output (5 lines)</summary>

```text
Berlin|3
Oslo|4
Oslo|4790
Oslo|4|1197.5
Berlin|3|783.333333333333
```

</details>

## Little helpers

<details>
<summary>`misuse of aggregate: COUNT()`</summary>

An aggregate cannot sit in `WHERE`. The pile does not exist yet — use `HAVING`.

</details>

<details>
<summary>Question 3 prints Berlin first</summary>

`ORDER BY AVG(weight_g) DESC` — the heavier average (Oslo) goes first.

</details>

<details>
<summary>`783.33` vs `783.333333333333`</summary>

Print the plain `AVG`; SQLite shows all digits. No rounding.

</details>

## Done when

- [ ] `make test-sql TASK=02_2 STUDENT=kevin SUBJECT=sql` says All green.
- [ ] Every question filters piles with `HAVING`, never with `WHERE`.
- [ ] You can say out loud what each query does.

Back to [Exercise 02](../README.md).
