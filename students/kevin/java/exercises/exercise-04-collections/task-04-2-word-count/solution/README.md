# Sample solution · Task 04_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac WordCount.java
java WordCount
```

## How it works, step by step

1. `counts` is a `HashMap<String,Integer>`: each word is a ticket name, its count is the coat behind it. `total` adds every word seen, on the side.
2. `while (in.hasNextLine())` reads until the input ends; the line that `equals("END")` breaks the loop, and that line is never counted as a word.
3. `split(" ")` turns a line into words; an empty piece (two spaces in a row) is skipped, because it is not a word. `containsKey` decides between "one more" (`get + 1`) and "first time" (`1`) — the counting version of the coat check.
4. After `END`: `total` is printed, and `counts.size()` is the number of distinct words — the map already holds each word exactly once.
5. A `HashMap` keeps no order, so the print loop walks `new TreeSet<String>(counts.keySet())`: the same words, sorted A to Z. Uppercase sorts before lowercase, so `Java` is printed before `java`.

**Test run**

```text
post parcel post
mail post
END
```

```text
words: 5
unique: 3
mail: 1
parcel: 1
post: 3
```

| Input | Output |
|-------|--------|
| `parcel parcel parcel` / `END` | `words: 3`, `unique: 1`, `parcel: 3` |
| `Java java Java` / `END` | `words: 3`, `unique: 2`, `Java: 2`, `java: 1` |
| `END` | `words: 0`, `unique: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `line == "END"` | the loop never stops | Compare strings with `.equals("END")` |
| Lowercasing every word | `Java` and `java` merge into one | Words count exactly as typed |
| Printing straight from the `HashMap` | word lines in a wild order | Loop over a `TreeSet<String>` of the keys |
| `counts.get(word)` for a new word | red text: NullPointerException | `containsKey` first, then `get` |

Back to [Task 04_2](../README.md).
