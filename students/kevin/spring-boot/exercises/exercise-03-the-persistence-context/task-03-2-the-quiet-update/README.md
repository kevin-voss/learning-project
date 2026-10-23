# Task 03_2 · The quiet update

Part of [Exercise 03 · The persistence context](../README.md). New ideas you need: **dirty checking**, **the snapshot**, **flush vs commit**, **detached**. They are all explained in the exercise page. Sheet: [The persistence context](../../../../../../sheets/hibernate/persistence-context.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task

No `save()`, no update form: real Hibernate writes an `UPDATE` at flush time because it compares every managed object with the state it had when it was loaded. Here you build that mechanism in plain Java.

Rows of the fake database (the same as in task 03_1):

| id | title |
|----|-------|
| 1 | Dune |
| 2 | Emma |
| 3 | Persuasion |

First line: an integer `n` — how many commands follow.

Then `n` lines, each one command:

| Command | What it does |
|---------|--------------|
| `LOAD <id>` | Put a managed object on the cart, with a **snapshot** of its title. Loading an id that is already on the cart does nothing new. |
| `SET <id> <new title>` | Change the title of the object with that id — it works on managed **and** detached objects (they still exist). If no object with that id was ever loaded, print `no object for <id>`. Everything after `SET <id> ` is the new title, so it may contain spaces. |
| `DETACH <id>` | Take the object off the cart. The object still exists — keep it in a second map — but it is detached now. Detaching an id that is not on the cart does nothing. |
| `FLUSH` | Dirty checking: for every **managed** object whose title differs from its snapshot, in id order, print the UPDATE line and refresh the snapshot. If nothing changed, print `nothing to flush`. |

The UPDATE line looks like this:

```text
UPDATE books SET title='<new title>' WHERE id=<id>
```

Only `FLUSH` prints SQL, and only a failed `SET` prints `no object for <id>`. Nothing else is printed. (`LOAD` is only used with ids 1–3.)

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many commands come next.
2. Keep two maps: the cart (managed) and a second map (detached). One object per id holds its title and its snapshot.
3. `LOAD`: cart first — already there? Do nothing. Otherwise read the "database" once and take the snapshot.
4. `SET`: find the object on the cart or in the detached map and change its title. Found nowhere? Print `no object for <id>`.
5. `DETACH`: move the object from the cart to the detached map.
6. `FLUSH`: walk the cart in id order, print an UPDATE for every changed title, refresh the snapshot — or print `nothing to flush`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3` then `LOAD 1` / `SET 1 Dune Messiah` / `FLUSH` | `UPDATE books SET title='Dune Messiah' WHERE id=1` |
| `2` then `LOAD 1` / `FLUSH` | `nothing to flush` |
| `4` then `LOAD 1` / `SET 1 Dune Messiah` / `DETACH 1` / `FLUSH` | `nothing to flush` — the detached change is ignored |
| `5` then `LOAD 2` / `LOAD 1` / `SET 2 Emma and the Teapot` / `SET 1 God Emperor` / `FLUSH` | the two UPDATE lines, id 1 first, then id 2 |
| `1` then `SET 3 Erewhon` | `no object for 3` |
| `3` then `LOAD 1` / `SET 1 Dune` / `FLUSH` | `nothing to flush` — set back to the old title |
| `4` then `LOAD 1` / `SET 1 God Emperor` / `FLUSH` / `FLUSH` | one UPDATE, then `nothing to flush` |

## Little helpers

<details>
<summary>Where do I keep the snapshot?</summary>

Copy the title into a second field when the book is loaded. Flush compares the two fields. Real Hibernate snapshots **all** columns, not only the title.

</details>

<details>
<summary>Why does my detached change never appear?</summary>

Because flush walks the cart only. A book in the detached map is never compared with anything — that is the lesson of this task.

</details>

<details>
<summary>How do I get the id order?</summary>

Copy the cart's keys into a `TreeMap`, or sort them. Real Hibernate also writes its UPDATEs in a stable id order.

</details>

<details>
<summary>What does LOAD after DETACH do?</summary>

A fresh load from the database: the new object on the cart gets the original title again, because the detached change never reached the database.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `SET` calls no method named `save` or `update` — the UPDATE appears only at `FLUSH`, from comparing with the snapshot.
- [ ] You can explain why a detached object's change is ignored.

Back to [Exercise 03](../README.md).
