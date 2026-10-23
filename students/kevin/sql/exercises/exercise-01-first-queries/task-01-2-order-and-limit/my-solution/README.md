# My solution · Task 01_2 ✏️

This is your desk. It is empty on purpose: you write every query yourself.

Create the file `answer.sql` **in this folder**. Put one query per question, in the order of the task, each ending with `;`. Comments start with `--`. The tables are already there: `../setup.sql` creates and fills them before your file runs. Ideas: [exercise page](../../README.md).

## Try it by hand

From this folder:

```bash
sqlite3 :memory: ".read ../setup.sql" ".read answer.sql"
```

Rows print as `value|value`. Nothing printed for a question? Its query returned no rows — check the `WHERE`.

## Test it

The task has an expected output: the runner feeds `setup.sql` and your `answer.sql` into SQLite and compares every printed line. Run it from the main folder of the repo (where the `Makefile` is):

```bash
make test-sql TASK=01_2 STUDENT=kevin SUBJECT=sql
```

A wrong line shows `want:` and `got:` so you see which question is off.

## Rules for this desk

- Change anything you like here.
- Do not copy from [`../solution/`](../solution/README.md). Look there only when you are done.
- Stuck? Read the [exercise page](../../README.md) again, then the helpers in the [task](../README.md). In Cursor: `/stuck`, then `/check`.
