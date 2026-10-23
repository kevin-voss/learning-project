# Task 04_2 · Make the table

Part of [Exercise 04 · Change the data](../README.md). New ideas you need: **CREATE TABLE**, **PRIMARY KEY**, **NOT NULL**, **UNIQUE**, **CHECK**, **REFERENCES**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write every query yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |
| `setup.sql` | The tables and rows every query runs against |

## The task (from the sheet)

There are no tables this time (`setup.sql` is empty on purpose). You print the forms yourself, fill them, and prove it with a join. Write every statement in `my-solution/answer.sql`, in this order.

1. Create the table `senders` with `id` (integer primary key), `name` (text, not null, unique) and `city` (text, not null).
2. Insert two senders: 1 `hana` from Oslo, 2 `ivan` from Berlin.
3. Create the table `letters` with `id` (integer primary key), `sender_id` (integer, not null, references `senders(id)`) and `words` (integer, not null, must be greater than 0 — a `CHECK`).
4. Insert two letters: id 10 from sender 2 with 90 words; id 11 from sender 1 with 240 words.
5. Proof: every letter with its sender's name — letter `id`, sender `name`, `words`, ordered by letter id.

## The task, simply said

1. `CREATE TABLE senders (…)` with the three columns and their rules.
2. One `INSERT` with two value groups.
3. `CREATE TABLE letters (…)` — `REFERENCES senders(id)` for the link, `CHECK (words > 0)` for the rule.
4. One `INSERT` with two value groups.
5. The join from exercise 03, on your own tables.

## Test examples

Your file is right when SQLite prints exactly these lines (only question 5 prints).

| Question | The program says |
|----------|------------------|
| 5 | `10\|ivan\|90` then `11\|hana\|240` |

<details>
<summary>The complete expected output (2 lines)</summary>

```text
10|ivan|90
11|hana|240
```

</details>

## Little helpers

<details>
<summary>`no such table: senders`</summary>

The `CREATE TABLE` must come before the `INSERT` into it — order matters in one file.

</details>

<details>
<summary>What does a broken rule look like?</summary>

Try it by hand: `INSERT INTO senders VALUES (3, 'hana', 'Rome');` → `UNIQUE constraint failed`. `INSERT INTO letters VALUES (12, 1, 0);` → `CHECK constraint failed`. Leave those out of `answer.sql` — the runner wants a clean run.

</details>

<details>
<summary>Where do the rules go?</summary>

Right after the column type, on the same line: `name TEXT NOT NULL UNIQUE`.

</details>

## Done when

- [ ] `make test-sql TASK=04_2 STUDENT=kevin SUBJECT=sql` says All green.
- [ ] Both tables carry every rule the questions name.
- [ ] You can say out loud what each rule forbids.

Back to [Exercise 04](../README.md).
