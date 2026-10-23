# Sample solution · Task 07_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac SavingsTable.java
java SavingsTable
```

## How it works, step by step

1. The CSV text is built in memory like a stack of cards: the header `name,cents` first, then one `name,cents` card per input line, in input order.
2. `Files.writeString` saves the whole table in one call. A second run replaces the first file, so nothing doubles.
3. `Files.readAllLines` reads the table back. The loop starts at `1`: row `0` is the header, not a saver.
4. Each row is split at the comma. A `HashMap<String, Integer>` adds the cents per name — repeated names land in the same box. `grand` adds every row, so repeated names count there too.
5. A `HashMap` has no order, so the names go into an `ArrayList` and `Collections.sort` puts them alphabetically. Then one line per name, then the grand total.

**Test run**

```text
3
ana 100
ben 50
ana 25
```

```text
ana: 125
ben: 50
grand total: 175
```

| Input | Output |
|-------|--------|
| `2` / `ana 120` / `ben 80` | `ana: 120` / `ben: 80` / `grand total: 200` |
| `3` / `zoe 10` / `ben 20` / `ana 30` | `ana: 30` / `ben: 20` / `zoe: 10` / `grand total: 60` |
| `1` / `dee 40` | `dee: 40` / `grand total: 40` |
| `0` | `grand total: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Summing the header row too | crash: `NumberFormatException` on the text `cents` | start the read-back loop at index `1` |
| Printing straight from the `HashMap` | names in a mixed order | copy the keys into a list, `Collections.sort`, then print |
| Writing `name cents` with a space | the file is not CSV | rows are `name,cents`: a comma, no space |
| `split(" ")` on a file row | crash: array index out of bounds | rows come from the file: `split(",")` |
| Appending instead of writing | running twice doubles the totals | `writeString` with no extra options replaces the file |

Back to [Task 07_2](../README.md).
