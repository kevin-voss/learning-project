# Sample solution · Task 08_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac ParcelEvents.java
```

```bash
java ParcelEvents
```

## How it works, step by step

1. `Event` is **sealed**: only `Created`, `Shipped`, `Delivered`, `Returned` may implement it.
2. Each shape is a **record** — just the fields that belong on that stamp.
3. `parse` turns one input line into the right record with a `switch` on the first word.
4. `label` uses a **pattern-matching** `switch` on the sealed type. Each `case` names the fields. No `default` is needed: the list is complete.
5. `main` reads `n`, then loops: parse → label → print.

**Test run**

```text
3
CREATED a
SHIPPED a van-9
DELIVERED a
```

```text
new parcel a
a left on van-9
a arrived
```

| Input | Output |
|-------|--------|
| `1` / `CREATED mail-1` | `new parcel mail-1` |
| `1` / `SHIPPED mail-1 bike-3` | `mail-1 left on bike-3` |
| `1` / `DELIVERED mail-1` | `mail-1 arrived` |
| `1` / `RETURNED mail-2 wet` | `mail-2 came back: wet` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Missing `permits` child | compile error on `implements Event` | List every record in `permits` |
| Incomplete `switch` | "not exhaustive" | Add a `case` for every permitted type |
| `void main()` only | tests say no main | Keep `public static void main(String[] args)` |

Back to [Task 08_1](../README.md).
