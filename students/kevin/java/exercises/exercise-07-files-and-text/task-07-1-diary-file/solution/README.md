# Sample solution · Task 07_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac DiaryFile.java
java DiaryFile
```

## How it works, step by step

1. The loop reads `n` whole lines with `nextLine()` and joins them into one `String`: the whole file content is built **in memory** before anything touches the disk.
2. `"\n"` after every entry puts each entry on its own line. With `n = 0` the text stays empty.
3. `Files.writeString(Path.of("diary.txt"), text)` writes the whole file in one call. It creates the file — also when the text is empty — and replaces old content, so running the program twice works.
4. `Files.readAllLines` reads the file back into a `List<String>`. The count and the printed lines come from that list: the program believes the file, not the input.
5. An empty file gives an empty list, so `wrote 0 lines` prints and nothing else.

**Test run**

```text
3
morning: sorted the mail
noon: tea break
evening: locked the door
```

```text
wrote 3 lines
morning: sorted the mail
noon: tea break
evening: locked the door
```

| Input | Output |
|-------|--------|
| `1` / `quiet day at the desk` | `wrote 1 lines` / `quiet day at the desk` |
| `2` / `12` / `34` | `wrote 2 lines` / `12` / `34` |
| `0` | `wrote 0 lines` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `in.next()` instead of `in.nextLine()` | only the first word of each entry survives | `nextLine()` reads the whole line, spaces included |
| `readString(...).split("\n")` for the count | `0` prints `wrote 1 lines` (the empty text splits into one empty piece) | use `readAllLines`: an empty file gives a list of size 0 |
| Printing the input instead of the file | right answers today, but the round trip never runs | count and print from `Files.readAllLines(...)` |
| Building the text without `"\n"` | three entries become one long line, `wrote 1 lines` | append `"\n"` after every entry |

Back to [Task 07_1](../README.md).
