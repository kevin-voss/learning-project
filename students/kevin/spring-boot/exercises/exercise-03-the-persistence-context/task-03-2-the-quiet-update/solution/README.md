# Sample solution · Task 03_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac QuietUpdate.java
java QuietUpdate
```

## How it works, step by step

1. `Book` holds **two** titles: `title` (what you see and change) and `snapshot` (what the database had at load time). Both start equal — that is the snapshot, taken in the constructor.
2. Two maps: `managed` is the cart, `detached` is the shelf next to the door. An object moved there still exists — flush just never looks at it.
3. `load` is a no-op when the id is already on the cart (the first snapshot must survive). Otherwise it reads the "database" once and puts a fresh `Book` on the cart — that is the SELECT.
4. `set` finds the object on the cart or in the detached map and changes `title`. A plain field change: no `save()`, no `update()`. Found nowhere → `no object for <id>`.
5. `detach` moves the object from the cart to the detached map. Nothing is deleted.
6. `flush` is the dirty checking: it walks the cart in id order, and for every book whose `title` differs from `snapshot` it prints the UPDATE line and copies `title` into `snapshot`. No difference anywhere → `nothing to flush`. Because the snapshot is refreshed, a second flush prints `nothing to flush` again.

**Test run**

```text
5
LOAD 2
LOAD 1
SET 2 Emma and the Teapot
SET 1 God Emperor
FLUSH
```

```text
UPDATE books SET title='God Emperor' WHERE id=1
UPDATE books SET title='Emma and the Teapot' WHERE id=2
```

(Book 1 was loaded second but printed first: flush walks the cart in id order.)

| Input | Output |
|-------|--------|
| `3` / `LOAD 1`, `SET 1 Dune Messiah`, `FLUSH` | `UPDATE books SET title='Dune Messiah' WHERE id=1` |
| `2` / `LOAD 1`, `FLUSH` | `nothing to flush` |
| `4` / `LOAD 1`, `SET 1 Dune Messiah`, `DETACH 1`, `FLUSH` | `nothing to flush` — the detached change is ignored |
| `1` / `SET 3 Erewhon` | `no object for 3` |
| `3` / `LOAD 1`, `SET 1 Dune`, `FLUSH` | `nothing to flush` — the title is back to the snapshot |
| `4` / `LOAD 1`, `SET 1 God Emperor`, `FLUSH`, `FLUSH` | one UPDATE, then `nothing to flush` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `SET` stores titles in a plain map, no object | flush cannot compare with a snapshot | Keep title and snapshot together in one small class |
| `DETACH` deletes the object | `SET 1 ...` after `DETACH 1` prints `no object for 1` | The detached map keeps the object; only the cart forgets it |
| A second `LOAD` overwrites the snapshot | `LOAD 1, SET 1 X, LOAD 1, FLUSH` prints nothing | Loading an id that is on the cart changes nothing |
| Flush compares with the "database" | `SET` back to the old title still prints an UPDATE | Compare with the snapshot taken at load time |
| UPDATEs in load order | book 2 prints before book 1 | Walk the cart in sorted id order (`TreeMap` or sort) |
| `nothing to flush` only when the cart is empty | an unchanged managed book also prints it | It means: no managed object differs from its snapshot |

Back to [Task 03_2](../README.md).
