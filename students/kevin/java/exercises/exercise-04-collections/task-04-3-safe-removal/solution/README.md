# Sample solution · Task 04_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac SafeRemoval.java
java SafeRemoval
```

## How it works, step by step

1. The `n` words go into an `ArrayList<String>` in input order; then the last line hands over the forbidden letter.
2. `words.removeIf(word -> word.contains(letter))` does the whole job. `word -> word.contains(letter)` is a **lambda** — a tiny method without a name: for each word, is this true? `removeIf` throws out every word where it is true and keeps the order of the rest. Picture pulling books off a shelf while you count it: you lose your place. `removeIf` takes the removing out of your hands.
3. The trap it avoids: `words.remove(word)` inside a for-each loop changes the list while the loop walks it — Java stops that with a `ConcurrentModificationException`.
4. The older, equally safe way stands below `main` in `removeAllWithLetter`: an `Iterator` is the loop's own finger; only that finger may remove (`it.remove()`), and the walk stays valid. `removeIf` is the same walk, written in one line.
5. Empty list → `kept: (none)`; otherwise `String.join(" ", words)` glues the survivors. Removed count: every word is kept or removed, so `n - words.size()` is exactly how many left — even when the same word was removed twice.

**Test run**

```text
4
cat
dog
cattle
bird
a
```

```text
kept: dog bird
removed: 2
```

| Input | Output |
|-------|--------|
| `3` / `sun` `moon` `sky` / `x` | `kept: sun moon sky`, `removed: 0` |
| `3` / `ape` `ant` `cobra` / `a` | `kept: (none)`, `removed: 3` |
| `3` / `ha` `hi` `ha` / `a` | `kept: hi`, `removed: 2` |
| `3` / `ARM` `arm` `andy` / `a` | `kept: ARM`, `removed: 2` |
| `0` / `a` | `kept: (none)`, `removed: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `words.remove(word)` inside `for (String word : words)` | red text: `ConcurrentModificationException` | Let `removeIf` (or an `Iterator` with `it.remove()`) do the removing |
| A second list you copy the keepers into | works, but the task asks to remove from the one list | One `ArrayList` plus `removeIf` is enough |
| `word.contains(letter.toUpperCase())` "to be safe" | `ARM` disappears, but case matters | Compare exactly as typed: `word.contains(letter)` |
| Counting removals in a counter you forget to fill | `removed:` is always 0 | No counter needed: `n - words.size()` |
| `kept:` printed even when the list is empty | a bare `kept:` line with nothing after it | `isEmpty()` first, then print `(none)` |

Back to [Task 04_3](../README.md).
