# Sample solution · Task 03_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac ParcelStatus.java
java ParcelStatus
```

## How it works, step by step

1. `Status` is an **enum**: four constants, nothing else. A variable of type `Status` is always one of them — a typo like `IN_TRANZIT` cannot even compile.
2. `canGoTo` lives **inside** the enum. Its switch on `this` reads exactly like the four journey rules, so the rules have one home.
3. `current` starts as `null`: no event has happened yet. While it is `null`, only `CREATED` is legal.
4. `main` only asks. Legal step: print `ok:` and move the parcel. Illegal step: print `error:` and change nothing — the loop runs on to the next event.
5. `Status.valueOf(word)` turns the typed word into the constant, and `"ok: " + next` prints the constant's name (`ok: IN_TRANSIT`).

**Test run**

```text
4
CREATED
CREATED
IN_TRANSIT
DELIVERED
```

```text
ok: CREATED
error: CREATED
ok: IN_TRANSIT
ok: DELIVERED
```

| Input | Output |
|-------|--------|
| `3` / `CREATED` `IN_TRANSIT` `DELIVERED` | `ok: CREATED`, `ok: IN_TRANSIT`, `ok: DELIVERED` |
| `3` / `CREATED` `IN_TRANSIT` `LOST` | `ok: CREATED`, `ok: IN_TRANSIT`, `ok: LOST` |
| `1` / `IN_TRANSIT` | `error: IN_TRANSIT` |
| `4` / `CREATED` `IN_TRANSIT` `DELIVERED` `IN_TRANSIT` | three `ok:` lines, then `error: IN_TRANSIT` |
| `0` | (nothing) |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Chain rules written with `if`s in `main` | works, but the rules have no home | Move them into `canGoTo` inside the enum |
| Status moves after an error | the wrong jump is recorded too | Assign `current = next` only on the `ok:` path |
| Comparing the typed word with `==` to a constant | always feels random | `valueOf` the word first, then compare `Status` with `Status` |
| First event `IN_TRANSIT` accepted | the journey never really starts | With `current == null`, only `CREATED` is legal |
| `break` after the first `error:` | later events print nothing | An error is just a line; the loop carries on |

Back to [Task 03_1](../README.md).
