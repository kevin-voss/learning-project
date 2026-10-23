# Sample solution · Task 05_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac VersionColumn.java
java VersionColumn
```

## How it works, step by step

1. `Row` is the one table row: `stock = 10`, `version = 1`. The `version` field stands for the `@Version` column — the stamp that counts every write.
2. Each `Editor` holds a local copy: the `value` they want to write and the `readVersion` they saw. `readVersion == null` means "read nothing yet" — that is why it is an `Integer` and not an `int`.
3. `READ` copies value **and** stamp into the editor's hand and prints the line. From then on the editor works on the copy; the row is untouched.
4. `SET` changes only the copy. Without a copy there is nothing to change, so it answers `fails: nothing read` — the same answer `COMMIT` gives.
5. `COMMIT` is the optimistic check. Equal stamps: nobody wrote in between, so the value lands, the row's stamp goes up by one, and the editor's copy is cleared (the next commit needs a fresh `READ`). Different stamps: the stale line — this is the `OptimisticLockException`, and in the course it becomes the `409` that tells the client "reload and retry". The copy stays, so a second blind `COMMIT` fails again.

**Test run**

```text
8
A READ
B READ
A SET 8
A COMMIT
B COMMIT
B READ
B SET 9
B COMMIT
```

```text
A reads stock=10 version=1
B reads stock=10 version=1
A commits stock=8 version=2
B fails: version 1 is stale, row is at 2
B reads stock=8 version=2
B commits stock=9 version=3
```

(B's first commit ran on the old stamp — that is the lost update being caught. After the fresh `READ` the same change lands at version 3.)

| Input | Output |
|-------|--------|
| `3` / `A READ`, `A SET 8`, `A COMMIT` | `A reads stock=10 version=1`, `A commits stock=8 version=2` |
| `2` / `A COMMIT`, `A READ` | `A fails: nothing read`, `A reads stock=10 version=1` |
| `1` / `B SET 5` | `B fails: nothing read` |
| `0` | (nothing) |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Storing the read version in an `int` | you cannot say "read nothing yet" | Use `Integer` (or a `boolean hasRead`) and check `null` first |
| `SET` writing straight into the row | the lost update is back: the last `SET` wins before anyone commits | `SET` touches only the editor's copy |
| Forgetting `version + 1` on commit | B's stale commit passes too — both stamps always match | Bump the stamp on **every** successful write |
| Clearing the copy on a stale fail | B loses their value and silently "re-reads" | The copy stays on the stale line; only a successful commit clears it |
| Printing nothing for `SET` without a read | the tests wait for `fails: nothing read` | `SET` needs a copy; without one it fails loudly |

Back to [Task 05_1](../README.md).
